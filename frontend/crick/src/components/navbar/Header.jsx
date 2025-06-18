import { useState, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import CrickLogo from "../../assets/CrickLogo.png"
import { Context } from "../../store/Context"
import { Menu, X, Play, Star, Info, Heart, LogOut, Trophy, Settings, Home, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  { to: "/zone", label: "Dashboard", icon: Home },
  { to: "/currentnews", label: "Trending news", icon: Newspaper },
  { to: "/features", label: "Features", icon: Star },
  { to: "/about", label: "About", icon: Info },
  { to: "/reviews", label: "Reviews", icon: Heart },
  { to: "/usermatches", label: "My Matches", icon: Trophy },
]

const NavItem = ({ to, label, icon: Icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-700"
      }`
    }
  >
    <Icon className="w-4 h-4" />
    {label}
  </NavLink>
)

function Header() {
  const [showSidebar, setShowSidebar] = useState(false)
  const { user, setTimeToShowHeader } = useContext(Context)
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, { withCredentials: true })
      if (data.msg === "Logout Successfull") setTimeToShowHeader(false), navigate("/zone/login")
    } catch {
      navigate("/zone/login")
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
          <NavLink to="/zone" className="flex items-center gap-3">
            <img src={CrickLogo} className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-semibold text-white">
              Crick<span className="text-blue-400">Zone</span>
            </span>
          </NavLink>
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.slice(0, 6).map((item) => <NavItem key={item.to} {...item}/>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-900">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-zinc-700 text-white text-xs">
                    {user?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-zinc-300">{user || "User"}</span>
              </div>
              <Button onClick={logout} variant="ghost" size="sm" className="text-zinc-400 hover:text-red-400 hover:bg-zinc-700">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={() => setShowSidebar(true)} variant="ghost" className="lg:hidden text-zinc-400 hover:text-white hover:bg-zinc-700">
              <Menu className="w-12 h-12" />
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          showSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowSidebar(false)}
      />

      {/* Sidebar (always rendered with transition) */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-black border-l border-zinc-800 transform transition-transform duration-300 lg:hidden ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <img src={CrickLogo} className="w-6 h-6 rounded" />
            <span className="font-semibold text-white">CrickZone</span>
          </div>
          <Button onClick={() => setShowSidebar(false)} variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4 border-b border-zinc-800">
          <NavLink to="/usermatches" onClick={() => setShowSidebar(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-700">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-zinc-700 text-white">{user?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{user || "User"}</p>
              <p className="text-sm text-zinc-400">View profile</p>
            </div>
          </NavLink>
        </div>
        <div className="p-4 space-y-1">
          {menuItems.map((item) => <NavItem key={item.to} {...item} onClick={() => setShowSidebar(false)} />)}
          <Separator className="my-4 bg-zinc-800" />
          <NavItem to="/settings" label="Settings" icon={Settings} onClick={() => setShowSidebar(false)} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={() => { logout(); setShowSidebar(false) }}
            variant="ghost"
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}

export default Header;