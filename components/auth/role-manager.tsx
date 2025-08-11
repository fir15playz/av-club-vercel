"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useAuth, UserRole } from "@/contexts/auth-context"

interface RoleManagerProps {
  isOpen: boolean
  onClose: () => void
}

export default function RoleManager({ isOpen, onClose }: RoleManagerProps) {
  const { users, currentUser, updateUserRole } = useAuth()
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isOpen || !currentUser || currentUser.role < UserRole.President) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!selectedUser || selectedRole === "") {
      setError("Please select a user and role")
      return
    }

    setIsLoading(true)

    try {
      const success = await updateUserRole(selectedUser, selectedRole as UserRole)
      if (success) {
        setSuccess("Role updated successfully!")
        setSelectedUser("")
        setSelectedRole("")
      } else {
        setError("Failed to update role")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage User Roles</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-md mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Select User
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="">Select a user</option>
              {users
                .filter((user) => user.id !== currentUser.id) // Can't change own role
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.firstName} ${user.lastName} (${user.email}) - ${getRoleName(user.role)}`}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Assign Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(Number(e.target.value) as UserRole)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="">Select a role</option>
              <option value={UserRole.Member}>Member</option>
              <option value={UserRole.EventCoordinator}>Events Coordinator</option>
              <option value={UserRole.TechnicalOfficer}>Technical Officer</option>
              <option value={UserRole.Treasurer}>Treasurer</option>
              <option value={UserRole.CommunicationsDirector}>Communications Director</option>
              <option value={UserRole.CoPresident}>Co-President</option>
              {currentUser.role === UserRole.Admin && <option value={UserRole.President}>President</option>}
              {currentUser.role === UserRole.Admin && <option value={UserRole.Admin}>Admin</option>}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Update Role"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
