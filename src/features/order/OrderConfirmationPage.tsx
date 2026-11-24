import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, MapPin, PackageCheck, ReceiptText } from 'lucide-react'
import { Header } from '../../components/Header/Header'
import { formatBRL } from '../cart/money'
import { paymentMethodLabels } from '../checkout/checkoutSchema'
import { loadOrder } from './orderPersistence'
import { ConfirmationLayout, ConfirmationCard, ConfirmationHero, OrderItems, OrderSummary, InvalidOrder } from './styles'

export function OrderConfirmationPage() {
  const { orderId } = useParams()
  const storedOrder = loadOrder()
  const order = storedOrder?.id === orderId ? storedOrder : null

  if (!order) {
    return (
      <>
        <Header />
        <InvalidOrder>
          <h1>Não encontramos essa confirmação</h1>
          <p>O link pode estar incorreto ou o pedido mais recente não está disponível neste navegador.</p>
          <Link to="/">Voltar ao catálogo</Link>
        </InvalidOrder>
      </>
    )
  }

  return (
    <>
      <Header />
      <ConfirmationLayout>
        <main>
          <ConfirmationHero role="status" aria-live="polite">
            <CheckCircle2 aria-hidden="true" size={38} />
            <div>
              <p>Pedido confirmado</p>
              <h1>Uhu! Seu café está a caminho</h1>
              <span>Pagamento na entrega • {paymentMethodLabels[order.paymentMethod]}</span>
            </div>
          </ConfirmationHero>

          <ConfirmationCard aria-labelledby="order-details-title">
            <h2 id="order-details-title"><PackageCheck size={20} aria-hidden="true" /> Pedido {order.id}</h2>
            <p className="order-date">Confirmado em {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.createdAt))}</p>
            <OrderItems>
              {order.lines.map((line) => (
                <li key={line.productId}>
                  <div><strong>{line.productName}</strong><span>{line.quantity} {line.quantity === 1 ? 'unidade' : 'unidades'} × {formatBRL(line.unitPriceCents)}</span></div>
                  <strong>{formatBRL(line.lineTotalCents)}</strong>
                </li>
              ))}
            </OrderItems>
            <OrderSummary aria-label="Resumo financeiro">
              <div><span>Subtotal</span><strong>{formatBRL(order.subtotalCents)}</strong></div>
              <div><span>Entrega</span><strong>{formatBRL(order.deliveryFeeCents)}</strong></div>
              <div className="total"><span>Total</span><strong>{formatBRL(order.totalCents)}</strong></div>
            </OrderSummary>
            <section className="delivery-details" aria-label="Entrega e pagamento">
              <h3><MapPin size={18} aria-hidden="true" /> Endereço de entrega</h3>
              <p>{order.address.street}, {order.address.number}{order.address.complement ? `, ${order.address.complement}` : ''}</p>
              <p>{order.address.neighborhood} — {order.address.city}, {order.address.state}</p>
              <p>CEP {order.address.postalCode}</p>
              <h3><ReceiptText size={18} aria-hidden="true" /> Forma de pagamento</h3>
              <p>{paymentMethodLabels[order.paymentMethod]} — pagamento realizado na entrega.</p>
            </section>
          </ConfirmationCard>
          <Link className="back-link" to="/">Voltar ao catálogo</Link>
        </main>
      </ConfirmationLayout>
    </>
  )
}
