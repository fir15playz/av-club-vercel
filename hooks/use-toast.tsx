"use client"

import { useState, useCallback } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastProps {
  id: string
}

interface ToastContextType {
  toasts: Toast[]
  toast: (props: ToastProps) => void
  dismiss: (id: string) => void
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      title: props.title,
      description: props.description,
      variant: props.variant || "default",
      duration: props.duration || 5000,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto dismiss
    setTimeout(() => {
      dismiss(id)
    }, newToast.duration)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}
