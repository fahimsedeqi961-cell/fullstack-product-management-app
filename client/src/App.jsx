import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Home from "./Home";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}