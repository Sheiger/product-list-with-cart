import { Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import Desserts from "./components/pages/desserts"
import NotFound from "./components/pages/notFound"
import ProductDetail from "./components/pages/productDetail"

function App() {

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<Desserts/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
