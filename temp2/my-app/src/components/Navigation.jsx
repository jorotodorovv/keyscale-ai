// src/components/Navigation.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../state/store'

const Navigation: React.FC = () => {
  const location = useLocation()
  const { settings } = useStore()

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
            <span className="font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-400">
            AI Touch Typing
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/" label="Play" isActive={location.pathname === '/' || location.pathname === '/play'} />
          <NavLink to="/drills" label="Drills" isActive={location.pathname === '/drills'} />
          <NavLink to="/analytics" label="Analytics" isActive={location.pathname === '/analytics'} />
          <NavLink to="/settings" label="Settings" isActive={location.pathname === '/settings'} />
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors text-sm font-medium">
            Start Session
          </button>
        </div>
      </div>
    </nav>
  )
}

interface NavLinkProps {
  to: string
  label: string
  isActive: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
        isActive 
          ? 'bg-teal-500/20 text-teal-400' 
          : 'hover:bg-white/10'
      }`}
    >
      {label}
    </Link>
  )
}

export default Navigation