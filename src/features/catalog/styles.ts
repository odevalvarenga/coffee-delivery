import styled from 'styled-components'
import { tokens } from '../../styles/tokens'

export const Section = styled.section`
  max-width: ${tokens.layout.content};
  margin: 0 auto;
  padding: 1rem ${tokens.layout.gutter} 5.5rem;
  scroll-margin-top: 6rem;
`

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.2rem;
  h2 { margin: 0; color: ${tokens.colors.ink}; font: 700 1.65rem/1.2 ${tokens.typography.display}; }
  > span { display: inline-flex; align-items: center; gap: .45rem; color: ${tokens.colors.purple}; font-size: .82rem; font-weight: 700; }
`

export const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.5rem 1.5rem;
  @media (max-width: 960px) { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem 1rem; }
  @media (max-width: 720px) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.75rem .85rem; }
  @media (max-width: 380px) { grid-template-columns: 1fr; }
`

export const ProductCard = styled.article`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 1.25rem;
  border-radius: .4rem 2.25rem .4rem 2.25rem;
  background: ${tokens.colors.surfaceWarm};
  text-align: center;
`

export const DrinkArt = styled.div`
  display: grid;
  width: 7.25rem;
  height: 6.25rem;
  margin-top: -1.2rem;
  place-items: center;
  svg { width: 100%; height: 100%; filter: drop-shadow(0 4px 3px rgba(39, 34, 33, .12)); }
`

export const ProductCategories = styled.ul`
  display: flex;
  min-height: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  gap: .25rem;
  margin: .35rem 0 .55rem;
  padding: 0;
  li { padding: .2rem .5rem; border-radius: 999px; color: ${tokens.colors.yellowDark}; background: ${tokens.colors.yellowSoft}; font-size: .6rem; font-weight: 700; line-height: 1; list-style: none; text-transform: uppercase; }
`

export const ProductInfo = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

export const ProductName = styled.h3`
  margin: .2rem 0 .45rem;
  color: ${tokens.colors.ink};
  font: 700 1.2rem/1.3 ${tokens.typography.display};
`

export const ProductDescription = styled.p`
  min-height: 3.2rem;
  margin: 0;
  color: ${tokens.colors.muted};
  font-size: .78rem;
  line-height: 1.55;
`

export const ProductPrice = styled.p`
  display: flex;
  align-items: baseline;
  gap: .25rem;
  margin: auto 0 0;
  padding-top: 1rem;
  color: ${tokens.colors.ink};
  span { font-size: .82rem; }
  strong { font-size: 1.35rem; font-weight: 700; }
`
