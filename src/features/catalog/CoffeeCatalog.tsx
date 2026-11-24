import { Coffee, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../cart/CartContext'
import type { CoffeeProduct } from './types'
import { CatalogGrid, DrinkArt, ProductCard, ProductCategories, ProductDescription, ProductInfo, ProductName, ProductPrice, QuantityControls, Section, SectionHeading } from './styles'

type CoffeeCatalogProps = {
  products: readonly CoffeeProduct[]
}

const coffeeTones = ['#3b241d', '#4a2b20', '#6b3825', '#8e4e2e', '#b56d37', '#a46d42']

function CoffeeCupArt({ index }: { index: number }) {
  const tone = coffeeTones[index % coffeeTones.length]
  return (
    <DrinkArt aria-hidden="true">
      <svg viewBox="0 0 120 120" focusable="false">
        <circle cx="60" cy="60" r="48" fill="#e6e5e5" />
        <circle cx="60" cy="60" r="41" fill="#fff" />
        <circle cx="60" cy="60" r="33" fill="#f3f2f2" />
        <circle cx="60" cy="60" r="27" fill={tone} />
        <path d="M42 61c8-8 21-9 36-4 2 1 2 3 0 4-12 6-24 6-36 1-2-1-2-1 0-1Z" fill="#f0d9a8" opacity=".88" />
        <path d="M46 69c7 4 17 5 27 2" fill="none" stroke="#f0d9a8" strokeLinecap="round" strokeWidth="2" opacity=".78" />
      </svg>
    </DrinkArt>
  )
}

export function CoffeeCard({ product, index }: { product: CoffeeProduct; index: number }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  return (
    <ProductCard>
      <CoffeeCupArt index={index} />
      <ProductCategories aria-label="Categorias">
        {product.categories.map((category) => <li key={category}>{category}</li>)}
      </ProductCategories>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>
          <span aria-label="Preço">R$</span>
          <strong>{new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.priceCents / 100)}</strong>
        </ProductPrice>
        <QuantityControls role="group" aria-label={`Quantidade de ${product.name}`}>
          <button type="button" aria-label={`Diminuir quantidade de ${product.name}`} onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
            <Minus size={14} aria-hidden="true" />
          </button>
          <output aria-live="polite">{quantity}</output>
          <button type="button" aria-label={`Aumentar quantidade de ${product.name}`} onClick={() => setQuantity((current) => current + 1)}>
            <Plus size={14} aria-hidden="true" />
          </button>
          <button className="add-to-cart" type="button" aria-label={`Adicionar ${quantity} ${product.name} ao carrinho`} onClick={() => addItem(product.id, quantity)}>
            <ShoppingCart size={18} aria-hidden="true" />
          </button>
        </QuantityControls>
      </ProductInfo>
    </ProductCard>
  )
}

export function CoffeeCatalog({ products }: CoffeeCatalogProps) {
  return (
    <Section id="catalogo" aria-labelledby="catalog-title">
      <SectionHeading>
        <h2 id="catalog-title">Nossos cafés</h2>
        <span><Coffee size={18} aria-hidden="true" /> {products.length} opções</span>
      </SectionHeading>
      <CatalogGrid>
        {products.map((product, index) => <CoffeeCard key={product.id} product={product} index={index} />)}
      </CatalogGrid>
    </Section>
  )
}
