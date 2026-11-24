export type ViaCepAddress = Readonly<{
  postalCode: string
  street: string
  neighborhood: string
  city: string
  state: string
  complement: string
}>

export type ViaCepErrorKind = 'invalid' | 'not-found' | 'http' | 'network' | 'response'

export class ViaCepError extends Error {
  constructor(readonly kind: ViaCepErrorKind, message: string) {
    super(message)
    this.name = 'ViaCepError'
  }
}

export function normalizePostalCode(value: string): string {
  return value.replace(/\D/g, '')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function stringField(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function getViaCepAddress(
  postalCode: string,
  fetcher: typeof fetch = fetch,
): Promise<ViaCepAddress> {
  const normalized = normalizePostalCode(postalCode)
  if (!/^\d{8}$/.test(normalized)) {
    throw new ViaCepError('invalid', 'Informe um CEP válido com 8 dígitos.')
  }

  let response: Response
  try {
    response = await fetcher(`https://viacep.com.br/ws/${normalized}/json/`, {
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new ViaCepError('network', 'Não foi possível conectar ao ViaCEP. Verifique sua conexão e tente novamente.')
  }

  if (!response.ok) {
    throw new ViaCepError('http', 'O ViaCEP está indisponível no momento. Tente novamente.')
  }

  let payload: unknown
  try {
    payload = await response.json() as unknown
  } catch {
    throw new ViaCepError('response', 'O ViaCEP retornou uma resposta inválida. Tente novamente.')
  }

  if (!isRecord(payload)) {
    throw new ViaCepError('response', 'O ViaCEP retornou uma resposta inválida. Tente novamente.')
  }
  if (payload.erro === true) {
    throw new ViaCepError('not-found', 'CEP não encontrado. Confira o número informado.')
  }

  const responsePostalCode = normalizePostalCode(stringField(payload.cep))
  const state = stringField(payload.uf)
  if (responsePostalCode !== normalized || !/^[A-Za-z]{2}$/.test(state)) {
    throw new ViaCepError('response', 'O ViaCEP retornou dados incompletos ou incompatíveis para este CEP.')
  }

  return {
    postalCode: stringField(payload.cep),
    street: stringField(payload.logradouro),
    neighborhood: stringField(payload.bairro),
    city: stringField(payload.localidade),
    state: state.toUpperCase(),
    complement: stringField(payload.complemento),
  }
}
