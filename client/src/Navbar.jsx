import { Link } from "react-router-dom"
export default function Navbar({ onAdd }) {
  return (
    <>
      <header className="sticky top-0 right-0 left-0 z-40 p-6 h-20 bg-slate-100 shadow-sm">
        <nav className="flex items-center justify-center gap-8">
          <ul className="flex flex-1 items-center justify-center gap-12">
            <li className="text-sm font-black uppercase text-slate-800 "><Link to="/">Home</Link></li>
            <li className="text-sm font-black uppercase text-slate-800 "><Link to="/login">Login</Link></li>
            <li className="text-sm font-black uppercase text-slate-800 "><Link to="/login">Sign up</Link></li>
          </ul>
          <button
            onClick={onAdd}
            className="bg-blue-400 text-white font-bold px-4 py-2 rounded-md border-slate-100 cursor-pointer">
            Add Product
          </button>
        </nav>
      </header >
    </>
  );
}