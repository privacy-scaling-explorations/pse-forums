"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  className?: string;
  forceView?: "mobile" | "desktop";
}

export function Modal({
  isOpen,
  setIsOpen,
  children,
  title,
  className = "",
  forceView,
}: ModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !forceView
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen, forceView]);

  // Handle escape key to close
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !forceView) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, setIsOpen, forceView]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  const showMobileView =
    forceView === "mobile" || (isMobile && forceView !== "desktop");

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
                onClick={() => setIsOpen(false)}
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
  );

  const desktopModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className={`flex flex-col gap-6 bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto p-6 ${className}`}
      >
        {title && (
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-base-foreground">{title}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="">{children}</div>
      </div>
    </div>
  );

  return createPortal(
    showMobileView ? mobileDrawer : desktopModal,
    document.body,
  );
}
