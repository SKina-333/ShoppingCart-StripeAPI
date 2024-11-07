import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import App from './App.jsx'
import ProductPage from './pages/Products Page/productsPage.jsx'

import AllProductsPage from './pages/Products Page/All Products/allProductsPage.jsx'
import AddProductPage from './pages/Products Page/Add Product/addProductPage.jsx'

import { CartProvider } from './contexts/cartContext.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "product",
    element: <ProductPage />,
    children: [
      {
        index: true, 
        element: <AllProductsPage />
      },
      {
        path:"show-all",
        element: <AllProductsPage />
      },
      {
        path:"add",
        element: <AddProductPage />
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
