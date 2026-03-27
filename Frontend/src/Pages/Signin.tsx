import { Link, useNavigate } from "react-router"
import { girlImage } from "../assets/image"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSignin = async () => {
        try {
            setError("")
            await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                email,
                password
            }, { withCredentials: true } )
            setEmail("")
            setPassword("")
            navigate("/dashboard")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const serverMessage = error?.response?.data?.message
                if (serverMessage) {
                    setError(serverMessage)
                } else {
                    setError("Something went wrong. Please try again.")
                }
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return (
        <>
            <div className="relative top-30 left-50 w-275 h-125 border border-slate-400 py-12.5 px-12.5 rounded-sm overflow-hidden">
                <img src={girlImage} alt="img" className="absolute h-130 left-162.5 bottom-1.25 bg-transparent" />
                <div className="text-2xl font-semibold mb-5">
                    Welcome back! <br />
                    Sign in to your account.
                </div>

                <div className="text-[15px] mb-5">
                    Sign in to continue accessing <br />
                    your second brain.
                </div>

                <div className="flex flex-col gap-5 w-82.5">
                    <div className="flex flex-col group">
                        <label htmlFor="Email" className="text-[14px] group-focus-within:text-blue-500">Email</label>
                        <input placeholder="Enter your email" name="Email" className="placeholder:text-[13px] text-[14px] py-0.5 px-0.5 outline-none border-b-2 border-slate-300 group-focus-within:text-blue-500 group-focus-within:border-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col group">
                        <label htmlFor="Password" className="text-[14px] group-focus-within:text-blue-500">Password</label>
                        <input type="password" placeholder="Enter your password" name="Password" className="placeholder:text-[13px] text-[14px] py-0.5 px-0.5 outline-none border-b-2 border-slate-300 group-focus-within:text-blue-500 group-focus-within:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                {error && (
                    <p className="mt-3 text-[13px] text-red-500">{error}</p>
                )}

                <button className="mt-6 w-35 bg-black text-white py-2 rounded-full transition-all duration-300 hover:bg-blue-500 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                    onClick={handleSignin}>
                    Sign in
                </button>


                <p className="mt-4 text-[13px] text-slate-500">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-500 hover:underline cursor-pointer">
                        Sign up
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Signin