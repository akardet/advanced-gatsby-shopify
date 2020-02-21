import React, { createContext } from "react"
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
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const addProductToCart = async variantId => {
    try {
      const newCheckout = await client.checkout.create()
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const addItems = await client.checkout.addLineItems(
        newCheckout.id,
        lineItems
      )

      // Simulate a 'Buy Now' button
      // window.open(addItems.webUrl, '_blank')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <StoreContext.Provider value={{ ...defaultValues, addProductToCart }}>
      {children}
    </StoreContext.Provider>
  )
}
