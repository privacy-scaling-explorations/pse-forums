"use client"

import type React from "react"

import { useEffect, useState, useRef, ReactNode } from "react"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

export interface ModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  title?: string
  className?: string
  forceView?: "mobile" | "desktop"
}

export const Modal = ({ isOpen, setIsOpen, onOpenChange, children, title, className = "", forceView }: ModalProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onOpenChange?.(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onOpenChange])

  // Handle escape key to close
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange?.(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onOpenChange])

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!isOpen) {
    return null
  }

  // Determine which view to show based on screen size or forced view
  const showMobileView = forceView === "mobile" || (isMobile && forceView !== "desktop")

  const mobileDrawer = (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        className="fixed inset-x-0 bottom-0 z-50 mt-auto flex h-auto flex-col rounded-t-[10px] bg-white"
        style={{ transform: isOpen ? "translateY(0)" : "translateY(100%)" }}
      >
        <div className="mx-auto my-1 h-1.5 w-12 rounded-full bg-gray-300" />
        <div ref={modalRef} className={`p-4 ${className}`}>
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{title}</h2>
              <button
                onClick={() => onOpenChange?.(false)}
                className="rounded-full p-1 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )

  const desktopModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto ${className}`}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">{title}</h2>
            <button
              onClick={() => onOpenChange?.(false)}
              className="rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )

  return createPortal(showMobileView ? mobileDrawer : desktopModal, document.body)
}

