import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { Context } from "../../store/Context"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Zap, Loader2 } from "lucide-react"
import { toast } from "sonner"

function Login() {
  const { setUser } = useContext(Context)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { email, password }, { withCredentials: true })
      if (data.msg?.includes("Incorrect") || data.msg === "You are not verified!") {
        toast.error(data.msg)
      } else {
        toast.success("Login successful!")
        setTimeout(() => navigate("/zone", { replace: true }), 1000)
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed.")
    } finally {
      setLoading(false)
      setEmail("")
      setPassword("")
    }
  }

  const handleGoogleLogin = async (cred) => {
    try {
      const decode = jwtDecode(cred.credential)
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api2/google/login`, {
        username: decode.name,
        googleEmail: decode.email,
      }, { withCredentials: true })

      if (data.msg?.includes("missing")) toast.error("Google login failed")
      else {
        toast.success("Login successful!")
        setTimeout(() => navigate("/zone", { replace: true }), 1000)
      }
    } catch {
      toast.error("Google login failed.")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-2xl mb-4 border border-zinc-800">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-zinc-400">Sign in to your CrickZone account</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-200">Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500" required />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-200">Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 pr-10" required />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-zinc-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : "Sign in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google login failed")} />
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <p className="text-sm text-zinc-400 text-center w-full">
            Don't have an account? <NavLink to="/zone/signup" className="text-white hover:text-zinc-300">Sign up</NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
