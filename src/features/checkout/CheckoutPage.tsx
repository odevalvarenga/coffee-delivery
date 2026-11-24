import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, CreditCard, Landmark, MapPin, Minus, Plus, Trash2 } from 'lucide-react'
import { Header } from '../../components/Header/Header'
import { useCart } from '../cart/CartContext'
import { calculateSubtotalCents, formatBRL } from '../cart/money'
import { coffeeProducts } from '../catalog/catalog-data'
import { getViaCepAddress, normalizePostalCode, ViaCepError } from '../../services/viaCep'
import { checkoutSchema, paymentMethodLabels, paymentMethods } from './checkoutSchema'
import type { CheckoutFormInput, CheckoutFormValues } from './checkoutSchema'
import { calculateOrderTotalCents, DELIVERY_FEE_CENTS } from './pricing'
import { CheckoutLayout, CheckoutMain, CheckoutPanel, CheckoutTitle, EmptyCart, Field, FormGrid, ItemsList, OrderLine, PaymentOption, Summary, ViaCepMessage } from './styles'
import { createOrderSnapshot } from '../order/createOrderSnapshot'
import { saveOrder } from '../order/orderPersistence'

export function CheckoutPage() {
  const { state, increment, decrement, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const [postalCodeStatus, setPostalCodeStatus] = useState<{ kind: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ kind: 'idle', message: '' })
  const [verifiedPostalCode, setVerifiedPostalCode] = useState<string | null>(null)
  const [confirmationError, setConfirmationError] = useState('')
  const subtotalCents = calculateSubtotalCents(state.lines)
  const totalCents = calculateOrderTotalCents(state.lines)
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormInput, unknown, CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onSubmit',
    defaultValues: { postalCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', paymentMethod: '' },
  })

  async function lookupPostalCode() {
    const postalCode = getValues('postalCode')
    const normalized = normalizePostalCode(postalCode)
    if (!/^\d{8}$/.test(normalized)) {
      setVerifiedPostalCode(null)
      setPostalCodeStatus({ kind: 'error', message: 'Informe um CEP válido com 8 dígitos antes da consulta.' })
      setError('postalCode', { type: 'manual', message: 'Informe um CEP válido com 8 dígitos.' })
      return
    }

    clearErrors('postalCode')
    setPostalCodeStatus({ kind: 'loading', message: 'Consultando o ViaCEP…' })
    setVerifiedPostalCode(null)
    try {
      const address = await getViaCepAddress(postalCode)
      if (normalizePostalCode(getValues('postalCode')) !== normalized) return
      setValue('postalCode', address.postalCode, { shouldValidate: true, shouldDirty: true })
      if (address.street) setValue('street', address.street, { shouldValidate: true, shouldDirty: true })
      if (address.neighborhood) setValue('neighborhood', address.neighborhood, { shouldValidate: true, shouldDirty: true })
      if (address.city) setValue('city', address.city, { shouldValidate: true, shouldDirty: true })
      if (address.state) setValue('state', address.state, { shouldValidate: true, shouldDirty: true })
      if (address.complement) setValue('complement', address.complement, { shouldDirty: true })
      setVerifiedPostalCode(normalized)
      setPostalCodeStatus({ kind: 'success', message: 'Endereço encontrado pelo ViaCEP. Confira os campos e informe o número.' })
    } catch (error: unknown) {
      if (normalizePostalCode(getValues('postalCode')) !== normalized) return
      const message = error instanceof ViaCepError ? error.message : 'Não foi possível consultar o CEP. Tente novamente.'
      setPostalCodeStatus({ kind: 'error', message })
    }
  }

  function onSubmit(values: CheckoutFormValues) {
    if (!verifiedPostalCode || normalizePostalCode(values.postalCode) !== verifiedPostalCode) {
      setError('postalCode', { type: 'manual', message: 'Consulte este CEP no ViaCEP antes de continuar.' })
      setPostalCodeStatus({ kind: 'error', message: 'A consulta ViaCEP é necessária para validar o endereço.' })
      return
    }
    setConfirmationError('')
    try {
      const order = createOrderSnapshot(state.lines, values)
      saveOrder(order)
      clearCart()
      navigate(`/order/${encodeURIComponent(order.id)}`, { replace: true })
    } catch {
      setConfirmationError('Não foi possível confirmar e salvar seu pedido. Seus produtos continuam no carrinho; tente novamente.')
    }
  }

  if (state.lines.length === 0) {
    return (
      <>
        <Header />
        <EmptyCart>
          <h1>Seu carrinho está vazio</h1>
          <p>Escolha seus cafés para continuar com o pedido.</p>
          <Link to="/#catalogo"><ArrowLeft size={16} aria-hidden="true" /> Voltar ao catálogo</Link>
        </EmptyCart>
      </>
    )
  }

  return (
    <>
      <Header />
      <CheckoutLayout>
        <CheckoutMain>
          <CheckoutTitle>Complete seu pedido</CheckoutTitle>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CheckoutPanel>
            <h2><MapPin size={18} aria-hidden="true" /> Endereço de entrega</h2>
            <p>Informe o CEP para consultar e preencher os dados disponíveis.</p>
            <FormGrid>
              <Field $wide>
                <label htmlFor="postalCode">CEP</label>
                <div className="postal-code-row">
                  <input id="postalCode" autoComplete="postal-code" inputMode="numeric" aria-invalid={Boolean(errors.postalCode)} aria-describedby={errors.postalCode ? 'postalCode-error' : 'postalCode-status'} {...register('postalCode', { onChange: () => {
                    clearErrors('postalCode')
                    if (verifiedPostalCode) {
                      for (const field of ['street', 'number', 'neighborhood', 'city', 'state', 'complement'] as const) {
                        setValue(field, '', { shouldValidate: false, shouldDirty: true })
                      }
                    }
                    setVerifiedPostalCode(null)
                    setPostalCodeStatus({ kind: 'idle', message: '' })
                  } })} />
                  <button type="button" onClick={lookupPostalCode} disabled={postalCodeStatus.kind === 'loading'}>{postalCodeStatus.kind === 'loading' ? 'Consultando…' : 'Buscar CEP'}</button>
                </div>
                {errors.postalCode && <span id="postalCode-error" className="field-error">{errors.postalCode.message}</span>}
                <ViaCepMessage id="postalCode-status" role="status" aria-live="polite" $kind={postalCodeStatus.kind}>{postalCodeStatus.message}</ViaCepMessage>
              </Field>
              <Field $wide>
                <label htmlFor="street">Rua</label>
                <input id="street" autoComplete="address-line1" aria-invalid={Boolean(errors.street)} aria-describedby={errors.street ? 'street-error' : undefined} {...register('street')} />
                {errors.street && <span id="street-error" className="field-error">{errors.street.message}</span>}
              </Field>
              <Field>
                <label htmlFor="number">Número</label>
                <input id="number" autoComplete="address-line2" aria-invalid={Boolean(errors.number)} aria-describedby={errors.number ? 'number-error' : undefined} {...register('number')} />
                {errors.number && <span id="number-error" className="field-error">{errors.number.message}</span>}
              </Field>
              <Field>
                <label htmlFor="complement">Complemento <span>(opcional)</span></label>
                <input id="complement" autoComplete="address-line3" {...register('complement')} />
              </Field>
              <Field>
                <label htmlFor="neighborhood">Bairro</label>
                <input id="neighborhood" autoComplete="address-level3" aria-invalid={Boolean(errors.neighborhood)} aria-describedby={errors.neighborhood ? 'neighborhood-error' : undefined} {...register('neighborhood')} />
                {errors.neighborhood && <span id="neighborhood-error" className="field-error">{errors.neighborhood.message}</span>}
              </Field>
              <Field>
                <label htmlFor="city">Cidade</label>
                <input id="city" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} {...register('city')} />
                {errors.city && <span id="city-error" className="field-error">{errors.city.message}</span>}
              </Field>
              <Field>
                <label htmlFor="state">UF</label>
                <input id="state" autoComplete="address-level1" maxLength={2} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? 'state-error' : undefined} {...register('state')} />
                {errors.state && <span id="state-error" className="field-error">{errors.state.message}</span>}
              </Field>
            </FormGrid>
          </CheckoutPanel>

          <CheckoutPanel>
            <h2><CreditCard size={18} aria-hidden="true" /> Pagamento</h2>
            <p>O pagamento é feito na entrega. Escolha a forma de pagamento.</p>
            <fieldset className="payment-options">
              <legend className="visually-hidden">Forma de pagamento</legend>
              {paymentMethods.map((method) => (
                <PaymentOption key={method}>
                  <input type="radio" value={method} aria-invalid={Boolean(errors.paymentMethod)} aria-describedby={errors.paymentMethod ? 'payment-error' : undefined} {...register('paymentMethod')} />
                  <span>{method === 'cash' ? <Landmark size={17} aria-hidden="true" /> : <CreditCard size={17} aria-hidden="true" />}{paymentMethodLabels[method]}</span>
                </PaymentOption>
              ))}
            </fieldset>
            {errors.paymentMethod && <p id="payment-error" className="field-error" role="alert">{errors.paymentMethod.message}</p>}
          </CheckoutPanel>

            <button className="continue-button" type="submit" disabled={isSubmitting}>Confirmar pedido</button>
            {confirmationError && <p className="form-message" role="alert">{confirmationError}</p>}
          </form>
        </CheckoutMain>

        <aside aria-labelledby="selected-coffees-title">
          <CheckoutTitle as="h2" id="selected-coffees-title">Cafés selecionados</CheckoutTitle>
          <CheckoutPanel>
            <ItemsList>
              {state.lines.map((line) => {
                const product = coffeeProducts.find((item) => item.id === line.productId)
                if (!product) return null
                return (
                  <OrderLine key={line.productId}>
                    <div className="item-copy"><strong>{product.name}</strong><span>{formatBRL(product.priceCents)} cada</span></div>
                    <strong className="line-total">{formatBRL(product.priceCents * line.quantity)}</strong>
                    <div className="line-actions" aria-label={`Quantidade de ${product.name}`}>
                      <button type="button" aria-label={`Diminuir ${product.name}`} onClick={() => decrement(product.id)}><Minus size={14} aria-hidden="true" /></button>
                      <output aria-live="polite">{line.quantity}</output>
                      <button type="button" aria-label={`Aumentar ${product.name}`} onClick={() => increment(product.id)}><Plus size={14} aria-hidden="true" /></button>
                      <button type="button" className="remove" aria-label={`Remover ${product.name}`} onClick={() => removeItem(product.id)}><Trash2 size={14} aria-hidden="true" /> Remover</button>
                    </div>
                  </OrderLine>
                )
              })}
            </ItemsList>
            <Summary>
              <div><span>Total de itens</span><strong>{formatBRL(subtotalCents)}</strong></div>
              <div><span>Entrega</span><strong>{formatBRL(DELIVERY_FEE_CENTS)}</strong></div>
              <div className="grand-total"><span>Total</span><strong>{formatBRL(totalCents)}</strong></div>
            </Summary>
          </CheckoutPanel>
        </aside>
      </CheckoutLayout>
    </>
  )
}
