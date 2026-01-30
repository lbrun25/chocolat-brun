'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Cart, CartItem, Product } from '@/types/product'

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, packaging: '40', quantity?: number) => void
  removeFromCart: (productId: string, packaging: '40') => void
  updateQuantity: (productId: string, packaging: '40', quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const TVA_RATE = 0.055 // 5.5%

function calculateCartTotal(items: CartItem[]): { totalHT: number; totalTTC: number; totalWeight: number } {
  const totalHT = items.reduce((sum, item) => {
    // Pour les produits particuliers : 40 pièces = 200g
    return sum + item.product.priceHT * item.quantity
  }, 0)
  
  const totalTTC = totalHT * (1 + TVA_RATE)
  const totalWeight = items.reduce((sum, item) => {
    // 40 pièces * 5g = 200g par conditionnement
    const pieces = 40
    return sum + pieces * item.product.weight * item.quantity
  }, 0)
  
  return { totalHT, totalTTC, totalWeight }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    if (typeof window === 'undefined') {
      return { items: [], totalHT: 0, totalTTC: 0, totalWeight: 0 }
    }
    
    const savedCart = localStorage.getItem('chocolat-brun-cart')
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        const totals = calculateCartTotal(parsed.items || [])
        return {
          items: parsed.items || [],
          ...totals,
        }
      } catch {
        return { items: [], totalHT: 0, totalTTC: 0, totalWeight: 0 }
      }
    }
    return { items: [], totalHT: 0, totalTTC: 0, totalWeight: 0 }
  })

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chocolat-brun-cart', JSON.stringify({ items: cart.items }))
    }
  }, [cart.items])

  const addToCart = useCallback((product: Product, packaging: '40', quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id && item.packaging === packaging
      )

      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        newItems = prevCart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...prevCart.items, { product, packaging, quantity }]
      }

      const totals = calculateCartTotal(newItems)
      return {
        items: newItems,
        ...totals,
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string, packaging: '40') => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => !(item.product.id === productId && item.packaging === packaging)
      )
      const totals = calculateCartTotal(newItems)
      return {
        items: newItems,
        ...totals,
      }
    })
  }, [])

  const updateQuantity = useCallback((productId: string, packaging: '40', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, packaging)
      return
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId && item.packaging === packaging
          ? { ...item, quantity }
          : item
      )
      const totals = calculateCartTotal(newItems)
      return {
        items: newItems,
        ...totals,
      }
    })
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart({ items: [], totalHT: 0, totalTTC: 0, totalWeight: 0 })
  }, [])

  const getItemCount = useCallback(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart.items])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
