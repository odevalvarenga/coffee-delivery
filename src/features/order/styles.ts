import styled from 'styled-components'
import { tokens } from '../../styles/tokens'

export const ConfirmationLayout = styled.div`
  width: min(100%, 900px);
  margin: 0 auto;
  padding: 3rem ${tokens.layout.gutter} 5rem;
  main { display: grid; gap: 1.25rem; }
  .back-link { justify-self: start; color: ${({ theme }) => theme.colors.purpleDark}; font-weight: 700; }
  .back-link:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.purple}; outline-offset: 4px; border-radius: .2rem; }
  @media (max-width: 520px) { padding-top: 1.5rem; }
`

export const ConfirmationHero = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.yellowDark};
  > svg { flex: 0 0 auto; }
  p { margin: 0 0 .25rem; color: ${({ theme }) => theme.colors.purpleDark}; font-weight: 700; }
  h1 { margin: 0; color: ${({ theme }) => theme.colors.ink}; font: 700 clamp(1.4rem, 4vw, 2rem)/1.2 ${tokens.typography.display}; }
  span { display: block; margin-top: .4rem; color: ${({ theme }) => theme.colors.muted}; }
`

export const ConfirmationCard = styled.section`
  padding: clamp(1rem, 4vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: .75rem;
  background: ${({ theme }) => theme.colors.surface};
  overflow-wrap: anywhere;
  h2 { display: flex; align-items: center; gap: .6rem; margin: 0; color: ${({ theme }) => theme.colors.ink}; font-size: 1.05rem; }
  h2 svg { color: ${({ theme }) => theme.colors.purpleDark}; flex: 0 0 auto; }
  .order-date { margin: .5rem 0 1rem; color: ${({ theme }) => theme.colors.muted}; font-size: .85rem; }
  .delivery-details { display: grid; gap: .35rem; padding-top: 1.25rem; border-top: 1px solid ${({ theme }) => theme.colors.line}; }
  .delivery-details h3 { display: flex; align-items: center; gap: .5rem; margin: .5rem 0 0; color: ${({ theme }) => theme.colors.ink}; font-size: .95rem; }
  .delivery-details h3 svg { color: ${({ theme }) => theme.colors.yellowDark}; }
  .delivery-details p { margin: 0; color: ${({ theme }) => theme.colors.muted}; line-height: 1.5; }
  @media (max-width: 520px) { border-radius: .5rem; }
`

export const OrderItems = styled.ul`
  display: grid;
  gap: .75rem;
  margin: 0;
  padding: 0 0 1rem;
  list-style: none;
  li { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: .75rem; border-bottom: 1px solid ${({ theme }) => theme.colors.line}; color: ${({ theme }) => theme.colors.ink}; }
  li > div { display: grid; gap: .2rem; }
  li span { color: ${({ theme }) => theme.colors.muted}; font-size: .85rem; }
  li > strong { white-space: nowrap; }
`

export const OrderSummary = styled.div`
  display: grid;
  gap: .65rem;
  padding-bottom: 1.25rem;
  > div { display: flex; justify-content: space-between; gap: .75rem; color: ${({ theme }) => theme.colors.muted}; }
  strong { color: ${({ theme }) => theme.colors.ink}; }
  .total { padding-top: .65rem; border-top: 1px solid ${({ theme }) => theme.colors.line}; color: ${({ theme }) => theme.colors.ink}; font-size: 1.05rem; font-weight: 700; }
`

export const InvalidOrder = styled.main`
  display: grid;
  min-height: 60vh;
  align-content: center;
  justify-items: center;
  gap: .75rem;
  padding: 2rem;
  text-align: center;
  h1 { margin: 0; color: ${({ theme }) => theme.colors.ink}; font: 700 1.7rem ${tokens.typography.display}; }
  p { max-width: 34rem; color: ${({ theme }) => theme.colors.muted}; line-height: 1.5; }
  a { color: ${({ theme }) => theme.colors.purpleDark}; font-weight: 700; }
  a:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.purple}; outline-offset: 4px; }
`
