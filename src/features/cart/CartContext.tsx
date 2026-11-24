import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { PropsWithChildren } from 'react'
import { cartReducer, sumCartUnits } from './cartReducer'
import { loadCart, saveCart } from './cartPersistence'
import type { CartState } from './types'

type CartContextValue = {
  state: CartState
  itemCount: number
  addItem: (productId: string, quantity?: number) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const value = useMemo<CartContextValue>(() => ({
    state,
    itemCount: sumCartUnits(state.lines),
    addItem: (productId, quantity = 1) => dispatch({ type: 'add', productId, quantity }),
    increment: (productId) => dispatch({ type: 'increment', productId }),
    decrement: (productId) => dispatch({ type: 'decrement', productId }),
    removeItem: (productId) => dispatch({ type: 'remove', productId }),
    clearCart: () => dispatch({ type: 'clear' }),
  }), [state])

  useEffect(() => {
    saveCart(state)
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart precisa estar dentro de CartProvider')
  return context
}
