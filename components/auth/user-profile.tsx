"use client"

import { useState } from "react"
import { LogOut, User, Settings } from "lucide-react"
import { useAuth, UserRole } from "@/contexts/auth-context"

export default function UserProfile() {
  const { currentUser, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!currentUser) return null

  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case UserRole.President:
        return "President"
      case UserRole.CoPresident:
        return "Co-President"
      case UserRole.CommunicationsDirector:
        return "Communications Director"
      case UserRole.TechnicalOfficer:
        return "Technical Officer"
      case UserRole.EventCoordinator:
        return "Events Coordinator"
      case UserRole.Treasurer:
        return "Treasurer"
      case UserRole.Member:
        return "Member"
      case UserRole.Admin:
        return "Admin"
      default:
        return "Member"
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
        aria-label="User profile"
      >
        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
          <User className="h-4 w-4 text-sky-500" />
        </div>
        <span className="sr-only">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <p className="font-medium">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser.email}</p>
            <div className="mt-1 inline-block px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs rounded-full">
              {getRoleName(currentUser.role)}
            </div>
          </div>
          <div className="p-2">
            <button
              onClick={() => {
                setIsMenuOpen(false)
                // Add profile settings functionality here
              }}
              className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center"
            >
              <Settings size={16} className="mr-2" />
              <span>Profile Settings</span>
            </button>
            <button
              onClick={() => {
                signOut()
                setIsMenuOpen(false)
              }}
              className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center text-red-500"
            >
              <LogOut size={16} className="mr-2" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
