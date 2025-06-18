import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useFormik } from "formik"
import { signUpSchema } from "../../schema/FormSchema"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      setLoading(true)
      
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`,
          values, { withCredentials: true })
        
        if (data.msg === "SignUp successful, check your mail for verification") {
          action.resetForm()
          toast.success("Account created! Check your email.")
          setTimeout(() => navigate("/zone/login"), 1500)
        } else {
          toast.error(data.msg === "User with this credentials already exist" ? "User already exists" : "Signup failed")
        }
      } catch (error) {
        toast.error("Signup failed")
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-2xl mb-4 border border-zinc-800">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
        <p className="text-zinc-400">Join CrickZone and start tracking matches</p>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-200">Username</Label>
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Choose a username"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-200">Email</Label>
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-200">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e)
                    errors.password && touched.password && toast.error(errors.password)
                  }}
                  placeholder="Create a password"
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-zinc-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="px-6 pb-6">
          <p className="text-sm text-zinc-400 text-center w-full">
            Already have an account? <NavLink to="/zone/login" className="text-white hover:text-zinc-300">Sign in</NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp