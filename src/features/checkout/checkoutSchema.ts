import { z } from 'zod'

export const paymentMethods = ['credit-card', 'debit-card', 'cash'] as const
export type PaymentMethod = (typeof paymentMethods)[number]

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  'credit-card': 'Cartão de crédito',
  'debit-card': 'Cartão de débito',
  cash: 'Dinheiro',
}

export const checkoutSchema = z.object({
  postalCode: z.string().trim().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido com 8 dígitos.'),
  street: z.string().trim().min(1, 'Informe a rua.'),
  number: z.string().trim().min(1, 'Informe o número.'),
  complement: z.string(),
  neighborhood: z.string().trim().min(1, 'Informe o bairro.'),
  city: z.string().trim().min(1, 'Informe a cidade.'),
  state: z.string().trim().regex(/^[A-Za-z]{2}$/, 'Informe a UF com 2 letras.'),
  paymentMethod: z.string().refine(
    (value): value is PaymentMethod => paymentMethods.some((method) => method === value),
    'Selecione uma forma de pagamento.',
  ),
})

export type CheckoutFormInput = z.input<typeof checkoutSchema>
export type CheckoutFormValues = z.output<typeof checkoutSchema>
