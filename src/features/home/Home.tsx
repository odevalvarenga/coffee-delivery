import { Coffee, PackageCheck, ShieldCheck, Timer } from 'lucide-react'
import { Header } from '../../components/Header/Header'
import { CoffeeCatalog } from '../catalog/CoffeeCatalog'
import { coffeeProducts } from '../catalog/catalog-data'
import { Feature, FeatureList, Hero, HeroArt, HeroContent, HeroLinks, HomeShell } from './styles'

const benefits = [
  { icon: ShieldCheck, title: 'Compra simples e segura' },
  { icon: PackageCheck, title: 'Embalagem mantém o café intacto' },
  { icon: Timer, title: 'Entrega rápida e rastreada' },
  { icon: Coffee, title: 'O café chega fresquinho até você' },
]

export function Home() {
  return (
    <HomeShell>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero id="inicio">
          <HeroContent>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora.</p>
            <HeroLinks>
              <a href="#catalogo">Conheça nossos cafés <span aria-hidden="true">→</span></a>
            </HeroLinks>
            <FeatureList aria-label="Benefícios do Coffee Delivery">
              {benefits.map(({ icon: Icon, title }) => (
                <Feature key={title}>
                  <span><Icon size={15} aria-hidden="true" /></span>
                  <strong>{title}</strong>
                </Feature>
              ))}
            </FeatureList>
          </HeroContent>
          <HeroArt>
            <span className="hero-disc" aria-hidden="true" />
            <span className="hero-orbit hero-orbit--one" aria-hidden="true" />
            <span className="hero-orbit hero-orbit--two" aria-hidden="true" />
            <img src="/coffee-hero.png" alt="Copo de café para viagem com grãos e folhas de café" />
          </HeroArt>
        </Hero>
        <CoffeeCatalog products={coffeeProducts} />
      </main>
      <footer><span>Coffee Delivery</span><span>Encontre o café perfeito para qualquer hora do dia.</span></footer>
    </HomeShell>
  )
}
