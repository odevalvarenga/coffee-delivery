import styled from 'styled-components'
import { tokens } from '../../styles/tokens'

export const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, .85fr);
  align-items: start;
  gap: 2rem;
  width: min(100%, ${tokens.layout.content});
  margin: 0 auto;
  padding: 2.5rem ${tokens.layout.gutter} 5rem;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
  @media (max-width: 520px) { gap: 2.5rem; padding-top: 1.5rem; }
`

export const CheckoutMain = styled.main`
  display: grid;
  min-width: 0;
  gap: 1rem;
  > form { display: grid; gap: .75rem; }
  .continue-button { min-height: 3rem; border: 0; border-radius: .4rem; color: ${({ theme }) => theme.colors.onYellow}; background: ${({ theme }) => theme.colors.yellow}; font-size: .82rem; font-weight: 800; text-transform: uppercase; cursor: pointer; }
  .continue-button:hover { filter: brightness(.95); }
  .continue-button:disabled { opacity: .6; cursor: wait; }
  .form-message { margin: 0; color: ${({ theme }) => theme.colors.purpleDark}; font-weight: 600; }
  .form-message[role='alert'] { color: ${({ theme }) => theme.colors.danger}; }
`

export const CheckoutTitle = styled.h1`
  margin: 0 0 .25rem;
  color: ${({ theme }) => theme.colors.ink};
  font: 700 1.35rem/1.25 ${tokens.typography.display};
`

export const CheckoutPanel = styled.section`
  min-width: 0;
  padding: 1.5rem;
  border-radius: .4rem;
  background: ${({ theme }) => theme.colors.surfaceWarm};
  h2 { display: flex; align-items: center; gap: .6rem; margin: 0; color: ${({ theme }) => theme.colors.ink}; font: 600 1rem/1.3 ${tokens.typography.body}; }
  h2 svg { flex: 0 0 auto; color: ${({ theme }) => theme.colors.yellowDark}; }
  > p { margin: .5rem 0 1.25rem; color: ${({ theme }) => theme.colors.muted}; font-size: .85rem; line-height: 1.5; }
  .payment-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .6rem; margin: 1.25rem 0 0; padding: 0; border: 0; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
  .field-error { color: ${({ theme }) => theme.colors.danger}; font-size: .78rem; }
  @media (max-width: 520px) { padding: 1rem; .payment-options { grid-template-columns: 1fr; } }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: .75rem;
  @media (max-width: 520px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`

export const Field = styled.div<{ $wide?: boolean }>`
  display: grid;
  min-width: 0;
  grid-column: ${({ $wide }) => $wide ? '1 / -1' : 'span 3'};
  gap: .35rem;
  label { color: ${({ theme }) => theme.colors.ink}; font-size: .78rem; font-weight: 600; }
  label span { color: ${({ theme }) => theme.colors.muted}; font-weight: 400; }
  input { width: 100%; min-width: 0; min-height: 2.75rem; padding: .65rem .75rem; border: 1px solid ${({ theme }) => theme.colors.line}; border-radius: .3rem; color: ${({ theme }) => theme.colors.ink}; background: ${({ theme }) => theme.colors.surface}; font: inherit; font-size: .85rem; }
  input[aria-invalid='true'] { border-color: ${({ theme }) => theme.colors.danger}; }
  input:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.purple}; outline-offset: 2px; }
  .field-error { color: ${({ theme }) => theme.colors.danger}; font-size: .78rem; }
  .postal-code-row { display: flex; align-items: stretch; gap: .5rem; }
  .postal-code-row button { flex: 0 0 auto; padding: 0 .8rem; border: 1px solid ${({ theme }) => theme.colors.purpleSoft}; border-radius: .3rem; color: ${({ theme }) => theme.colors.purpleDark}; background: ${({ theme }) => theme.colors.surface}; font-size: .8rem; font-weight: 700; cursor: pointer; }
  .postal-code-row button:disabled { opacity: .65; cursor: wait; }
  @media (max-width: 520px) { grid-column: span 2; }
`

export const ViaCepMessage = styled.p<{ $kind: 'idle' | 'loading' | 'success' | 'error' }>`
  min-height: 1rem;
  margin: 0;
  color: ${({ $kind, theme }) => $kind === 'error' ? theme.colors.danger : $kind === 'success' ? theme.colors.purpleDark : theme.colors.muted};
  font-size: .78rem;
`

export const PaymentOption = styled.label`
  position: relative;
  display: flex;
  min-height: 3rem;
  align-items: center;
  gap: .5rem;
  padding: .6rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: .35rem;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  font-size: .68rem;
  font-weight: 700;
  text-transform: uppercase;
  input { width: 1rem; height: 1rem; accent-color: ${({ theme }) => theme.colors.purple}; }
  input:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.purple}; outline-offset: 2px; }
  &:has(input:checked) { border-color: ${({ theme }) => theme.colors.purple}; background: ${({ theme }) => theme.colors.purpleSoft}; }
  span { display: flex; align-items: center; gap: .4rem; }
  svg { flex: 0 0 auto; color: ${({ theme }) => theme.colors.purple}; }
`

export const ItemsList = styled.div`
  display: grid;
`

export const OrderLine = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: .5rem .75rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  &:first-child { padding-top: 0; }
  .item-copy { display: grid; gap: .2rem; }
  .item-copy strong, .line-total { color: ${({ theme }) => theme.colors.ink}; font-size: .85rem; }
  .item-copy span { color: ${({ theme }) => theme.colors.muted}; font-size: .75rem; }
  .line-actions { display: flex; grid-column: 1 / -1; align-items: center; gap: .2rem; }
  .line-actions button { display: flex; min-width: 2rem; min-height: 2rem; align-items: center; justify-content: center; gap: .25rem; padding: .25rem; border: 0; border-radius: .3rem; color: ${({ theme }) => theme.colors.purple}; background: ${({ theme }) => theme.colors.surface}; cursor: pointer; }
  .line-actions output { min-width: 1.4rem; color: ${({ theme }) => theme.colors.ink}; text-align: center; font-size: .8rem; }
  .line-actions .remove { margin-left: .4rem; padding: .25rem .5rem; color: ${({ theme }) => theme.colors.muted}; font-size: .7rem; text-transform: uppercase; }
`

export const Summary = styled.div`
  display: grid;
  gap: .75rem;
  padding-top: 1.5rem;
  > div { display: flex; justify-content: space-between; gap: 1rem; color: ${({ theme }) => theme.colors.muted}; font-size: .82rem; }
  strong { color: ${({ theme }) => theme.colors.ink}; font-weight: 500; }
  .grand-total { color: ${({ theme }) => theme.colors.ink}; font-size: 1rem; font-weight: 700; }
  .grand-total strong { font-weight: 800; }
`

export const EmptyCart = styled.main`
  display: grid;
  min-height: 65vh;
  align-content: center;
  justify-items: center;
  gap: .75rem;
  padding: 2rem;
  text-align: center;
  h1 { margin: 0; color: ${({ theme }) => theme.colors.ink}; font: 700 1.7rem ${tokens.typography.display}; }
  p { margin: 0; color: ${({ theme }) => theme.colors.muted}; }
  a { display: inline-flex; align-items: center; gap: .5rem; margin-top: .5rem; color: ${({ theme }) => theme.colors.purpleDark}; font-weight: 700; }
`
