import { describe, expect, it, vi } from 'vitest'
import { getViaCepAddress, normalizePostalCode, ViaCepError } from './viaCep'

describe('ViaCEP client', () => {
  it('normalizes CEP and maps available address fields', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({
      cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP', complemento: '',
    }), { status: 200 }))

    expect(normalizePostalCode('01001-000')).toBe('01001000')
    await expect(getViaCepAddress('01001-000', fetcher)).resolves.toEqual({
      postalCode: '01001-000', street: 'Praça da Sé', neighborhood: 'Sé', city: 'São Paulo', state: 'SP', complement: '',
    })
    expect(fetcher).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/', expect.objectContaining({ headers: { Accept: 'application/json' } }))
  })

  it('rejects invalid input before a network request', async () => {
    const fetcher = vi.fn<typeof fetch>()
    await expect(getViaCepAddress('123', fetcher)).rejects.toMatchObject({ kind: 'invalid' })
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('distinguishes not-found, HTTP and network failures', async () => {
    const notFound = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ erro: true }), { status: 200 }))
    const httpFailure = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }))
    const networkFailure = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('network unavailable'))

    await expect(getViaCepAddress('01001000', notFound)).rejects.toMatchObject({ kind: 'not-found' })
    await expect(getViaCepAddress('01001000', httpFailure)).rejects.toMatchObject({ kind: 'http' })
    await expect(getViaCepAddress('01001000', networkFailure)).rejects.toMatchObject({ kind: 'network' })
    expect(new ViaCepError('response', 'invalid').kind).toBe('response')
  })
})
