"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define user roles with hierarchy
export enum UserRole {
  Member = 0,
  EventCoordinator = 1,
  TechnicalOfficer = 2,
  CommunicationsDirector = 3,
  Treasurer = 4,
  CoPresident = 5,
  President = 6,
  Admin = 7,
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  joinDate: Date
}

interface AuthContextType {
  currentUser: User | null
  users: User[]
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  register: (userData: Omit<User, "id" | "joinDate"> & { password: string }) => Promise<boolean>
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: "1",
    firstName: "Pranav",
    lastName: "A",
    email: "pranav@avclublnhs.edu",
    role: UserRole.President,
    joinDate: new Date("2023-09-01"),
  },
  {
    id: "2",
    firstName: "Kevin",
    lastName: "M",
    email: "madanukevin@gmail.com",
    role: UserRole.President,
    joinDate: new Date("2023-09-05"),
  },
  {
    id: "3",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@lnhs.edu",
    role: UserRole.EventCoordinator,
    joinDate: new Date("2023-10-15"),
  },
  {
    id: "4",
    firstName: "Sam",
    lastName: "Rodriguez",
    email: "sam@lnhs.edu",
    role: UserRole.TechnicalOfficer,
    joinDate: new Date("2023-10-20"),
  },
  {
    id: "5",
    firstName: "Taylor",
    lastName: "Kim",
    email: "taylor@lnhs.edu",
    role: UserRole.CommunicationsDirector,
    joinDate: new Date("2023-11-01"),
  },
  {
    id: "6",
    firstName: "Jordan",
    lastName: "Patel",
    email: "jordan@lnhs.edu",
    role: UserRole.Treasurer,
    joinDate: new Date("2023-11-10"),
  },
  {
    id: "7",
    firstName: "Guest",
    lastName: "User",
    email: "guest@lnhs.edu",
    role: UserRole.Member,
    joinDate: new Date("2024-01-15"),
  },
]

// Mock passwords (in a real app, these would be hashed and stored securely)
const MOCK_PASSWORDS: Record<string, string> = {
  // Presidents
  "pranav@lnhs.edu": "pranav123",
  "madanukevin@gmail.com": "Kevdev@0810",

  "alex@lnhs.edu": "password123",
  "sam@lnhs.edu": "password123",
  "taylor@lnhs.edu": "password123",
  "jordan@lnhs.edu": "password123",
  "guest@lnhs.edu": "guest123",
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Convert string date back to Date object
        parsedUser.joinDate = new Date(parsedUser.joinDate)
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("currentUser")
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (user && MOCK_PASSWORDS[email] === password) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const signOut = () => {
    setCurrentUser(null)
  }

  const register = async (userData: Omit<User, "id" | "joinDate"> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return false
    }

    const newUser: User = {
      id: String(users.length + 1),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role || UserRole.Member, // Default to Member
      joinDate: new Date(),
    }

    // Add user to mock database
    setUsers((prev) => [...prev, newUser])

    // Add password to mock passwords
    MOCK_PASSWORDS[userData.email] = userData.password

    // Auto sign in the new user
    setCurrentUser(newUser)
    return true
  }

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if current user has permission (only President or higher can change roles)
    if (!currentUser || currentUser.role < UserRole.President) {
      return false
    }

    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))

    // If updating the current user, update currentUser state too
    if (currentUser.id === userId) {
      setCurrentUser({ ...currentUser, role: newRole })
    }

    return true
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isLoading,
        signIn,
        signOut,
        register,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
