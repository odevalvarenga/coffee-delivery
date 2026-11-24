import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { tokens } from '../../styles/tokens'

export const HeaderBar = styled.header`
  position: sticky;
  z-index: 5;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.canvas};
  backdrop-filter: blur(16px);
`

export const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
  width: min(100%, ${tokens.layout.content});
  min-height: 5.25rem;
  margin: 0 auto;
  padding: 0 ${tokens.layout.gutter};
  @media (max-width: 620px) { display: flex; justify-content: space-between; min-height: 4.5rem; gap: .75rem; }
`

export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  width: fit-content;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1rem;
  letter-spacing: -.035em;
  img { width: 2.6rem; height: 2.6rem; object-fit: contain; }
  strong { font-weight: 700; }
`

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  a { color: ${({ theme }) => theme.colors.muted}; font-size: .88rem; transition: color .2s ease; }
  a:hover { color: ${({ theme }) => theme.colors.purpleDark}; }
  @media (max-width: 620px) { display: none; }
`

export const HeaderAction = styled.a`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  padding: .72rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.purpleSoft};
  border-radius: ${tokens.radius.pill};
  color: ${({ theme }) => theme.colors.purpleDark};
  background: ${({ theme }) => theme.colors.yellowSoft};
  font-size: .82rem;
  font-weight: 700;
  transition: border-color .2s ease, transform .2s ease;
  &:hover { border-color: ${({ theme }) => theme.colors.purple}; transform: translateY(-1px); }
  @media (max-width: 620px) { width: 2.75rem; height: 2.75rem; justify-content: center; padding: 0; font-size: 0; flex: 0 0 2.75rem; }
  @media (max-width: 360px) { display: none; }
`

export const HeaderActions = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: .55rem;
`

export const ThemeButton = styled.button`
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 2.75rem;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.purpleDark};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.colors.purpleSoft}; }
`

export const CartLink = styled(NavLink)`
  position: relative;
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 2.75rem;
  place-items: center;
  border-radius: .6rem;
  color: ${({ theme }) => theme.colors.yellowDark};
  background: ${({ theme }) => theme.colors.yellowSoft};
  span {
    position: absolute;
    top: -.35rem;
    right: -.35rem;
    display: grid;
    min-width: 1.15rem;
    height: 1.15rem;
    padding: 0 .2rem;
    place-items: center;
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.onAccent};
    background: ${({ theme }) => theme.colors.yellowDark};
    font-size: .65rem;
    font-weight: 700;
  }
`
