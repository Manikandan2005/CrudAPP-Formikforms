import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
export const AuthorURL = "https://65e61110d7f0758a76e80d9a.mockapi.io/library/authors"
export const BooksURL = "https://65e61110d7f0758a76e80d9a.mockapi.io/library/books"
import AppRoutes from './utils/AppRoutes'

function App() {
  const router = createBrowserRouter(AppRoutes)
  return <>
      <RouterProvider router={router}/>
  </>
}

export default App