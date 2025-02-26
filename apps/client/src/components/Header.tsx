import { Link } from "@tanstack/react-router"
import { Input } from "ui/input"
import { Profile } from "./Profile"
import { Search } from "lucide-react"

export function Header() {
  return (
    <nav className="bg-white border-b-[1px] border-b-gray sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/">
          <h1 className="text-xl font-bold">
            <span className="font-space-grotesk font-bold text-black text-[26px] leading-[25px]">PSE</span>
            <span className="font-space-grotesk text-black font-normal text-[26px] leading-[25px] tracking-[-1px]">forum</span>
          </h1>
        </Link>

        <div className="flex flex-col items-start gap-2 w-[486px]">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#71717A]" />
            <Input 
              placeholder="Search..." 
              className="w-full pl-8 h-9 bg-[#FAFAFA] border-[#E4E4E7]" 
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Profile />
        </div>
      </div>
    </nav>
  )
}
