import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: `${process.env.SHOPIFY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)

  useEffect(() => {
    initializeCheckout()
  }, [])

  const initializeCheckout = async () => {
    try {
      // Check if Browser
      const isBrowser = typeof window !== "undefined"

      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null
      if (currentCheckoutId) {
        // If ID exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        // If ID does not, create new checkout
        newCheckout = await client.checkout.create()
        if (isBrowser) {
          localStorage.setItem("checkout_id", newCheckout.id)
        }
      }

      setCheckout(newCheckout)
    } catch (e) {
      console.error(e)
    }
  }

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )

      // Simulate a 'Buy Now' button
      // window.open(addItems.webUrl, '_blank')
      // console.log(addItems.webUrl)
      setCheckout(newCheckout)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <StoreContext.Provider
      value={{ ...defaultValues, checkout, addProductToCart }}
    >
      {children}
    </StoreContext.Provider>
  )
}
