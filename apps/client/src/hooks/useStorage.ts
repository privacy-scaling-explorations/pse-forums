import { LOCAL_STORAGE_KEYS } from "@/lib/config"

export const useStorage = <T>(key: string) => {
  const STORAGE_KEY = `${LOCAL_STORAGE_KEYS.APP_ID}-${key}`
  const setItem = (value: T) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  const getItem = (): T | null => {
    try {
      const item = localStorage.getItem(STORAGE_KEY)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  }

  const removeItem = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error("Error removing from localStorage:", error)
      return false
    }
  }

  return {
    setItem,
    getItem,
    removeItem,
  }
}
