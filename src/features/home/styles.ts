import styled from 'styled-components'
import { tokens } from '../../styles/tokens'

export const HomeShell = styled.div`
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  background: ${tokens.colors.canvas};
  .skip-link { position: fixed; z-index: 10; top: .75rem; left: .75rem; padding: .75rem 1rem; transform: translateY(-180%); border-radius: .35rem; color: ${tokens.colors.white}; background: ${tokens.colors.purpleDark}; }
  .skip-link:focus { transform: translateY(0); }
  footer { display: flex; justify-content: space-between; gap: 1rem; max-width: ${tokens.layout.content}; margin: 0 auto; padding: 1.5rem ${tokens.layout.gutter} 2rem; border-top: 1px solid ${tokens.colors.line}; color: ${tokens.colors.muted}; font-size: .78rem; }
  footer span:first-child { color: ${tokens.colors.purpleDark}; font-weight: 700; }
  @media (max-width: 520px) { footer { flex-direction: column; } }
`

export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr);
  align-items: center;
  gap: 2.5rem;
  width: min(100%, ${tokens.layout.content});
  min-height: 570px;
  margin: 0 auto;
  padding: 4.75rem ${tokens.layout.gutter} 4.25rem;
  overflow: hidden;
  @media (max-width: 850px) { grid-template-columns: minmax(0, 1fr); gap: .5rem; padding-top: 3.5rem; }
  @media (max-width: 520px) { min-height: unset; padding-top: 2.5rem; padding-bottom: 3rem; }
`

export const HeroContent = styled.div`
  min-width: 0;
  h1 { max-width: 36rem; margin: 0; color: ${tokens.colors.ink}; font: 800 clamp(2.65rem, 4.5vw, 3.8rem)/1.08 ${tokens.typography.display}; letter-spacing: -.035em; }
  > p { max-width: 32rem; margin: 1.1rem 0 0; color: ${tokens.colors.muted}; font-size: 1rem; line-height: 1.65; }
`

export const HeroLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.35rem;
  a { display: inline-flex; align-items: center; gap: .6rem; min-height: 2.75rem; padding: 0 1rem; border-radius: .4rem; color: ${tokens.colors.white}; background: ${tokens.colors.purple}; font-size: .86rem; font-weight: 700; transition: background .2s ease, transform .2s ease; }
  a:hover { transform: translateY(-1px); background: ${tokens.colors.purpleDark}; }
  a span { font-size: 1.15rem; line-height: 1; }
`

export const FeatureList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .95rem 1.2rem;
  max-width: 36rem;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
  @media (max-width: 520px) { grid-template-columns: minmax(0, 1fr); gap: .8rem; margin-top: 1.5rem; }
`

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: .55rem;
  min-width: 0;
  > span { display: grid; flex: 0 0 1.55rem; width: 1.55rem; height: 1.55rem; place-items: center; border-radius: 50%; color: ${tokens.colors.white}; background: ${tokens.colors.yellowDark}; }
  &:nth-child(2) > span { background: ${tokens.colors.coffee}; }
  &:nth-child(3) > span { color: ${tokens.colors.coffeeDark}; background: ${tokens.colors.yellow}; }
  &:nth-child(4) > span { background: ${tokens.colors.purple}; }
  strong { color: ${tokens.colors.muted}; font-size: .77rem; font-weight: 500; line-height: 1.35; }
`

export const HeroArt = styled.div`
  position: relative;
  display: grid;
  width: min(100%, 440px);
  aspect-ratio: 1;
  justify-self: end;
  place-items: center;
  .hero-disc { position: absolute; inset: 12%; border-radius: 50%; background: ${tokens.colors.yellow}; }
  .hero-orbit { position: absolute; inset: 5%; border: 2px solid ${tokens.colors.purple}; border-radius: 50%; opacity: .75; }
  .hero-orbit--two { inset: 1%; border-width: 1px; transform: rotate(-18deg) scaleX(.88); opacity: .45; }
  img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 1rem 1.25rem rgba(39, 34, 33, .12)); }
  @media (max-width: 850px) { width: min(100%, 390px); justify-self: center; }
  @media (max-width: 520px) { width: min(100%, 330px); }
`
