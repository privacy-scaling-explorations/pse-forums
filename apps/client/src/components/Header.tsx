import { ModeToggle } from "components/ModeToggle"
import { Button } from "components/ui/button"

export const Header = () => (
  <header className="flex justify-between items-center mb-4">
    <div>
      <h1 className="text-2xl font-bold">Freedit</h1>
      <div className="mt-2">
        <Button>Inn</Button>
        <Button type="button" className="mr-2 font-medium">
          Solo
        </Button>
      </div>
    </div>
    <div>
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
      <ModeToggle />
    </div>
  </header>
)
