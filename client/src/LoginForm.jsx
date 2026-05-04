import { useState } from "react"

export default function LoginForm() {
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const url = mode === "login"
    ? "http://localhost:2000/login"
    : "http://localhost:2000/signup"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })

      const data = res.json();
      console.log("Status", res.status);
      console.log(data);

      if (res.ok) {
        alert("Signed up successfully");
        setFormData({
          username: "",
          email: "",
          password: ""
        })
      } else {
        alert("Server error", data.message);
      }

    } catch (err) {
      console.log(err.message);

    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <form
          method="post"
          action="submit"
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white shadow-sm  hover:shadow-lg border-slate-100 rounded-3xl"
        >
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="text-center text-2xl text-slate-800 font-bold mb-12 cursor-pointer">
            Login / Sign up
          </button>

          <div className="flex flex-col items-center space-y-6 mb-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Username"
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Email"
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-700"
            />
            <button
              type="submit"
              className="px-6 py-3 w-full bg-blue-600 text-white rounded-full font-bold cursor-pointer hover:bg-blue-500 transition-colors duration-300 ">
              Submit
            </button>
          </div>
          <div className="flex flex-col gap-6 items-center mb-8">
            <p className="text-lg text-slate-700">Or</p>

            <button className="w-full px-4 py-2 text-lg text-slate-700 border border-slate-400 rounded-full hover:border-blue-600 cursor-pointer">
              Continue with google
            </button>
          </div>

        </form>
      </div>
    </>
  )
}