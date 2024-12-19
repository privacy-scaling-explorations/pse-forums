export const Header = () => (
  <header className="flex justify-between items-center mb-4">
    <div>
      <h1 className="text-2xl font-bold">Freedit</h1>
      <div className="mt-2">
        <button type="button" className="mr-2 font-medium">
          Inn
        </button>
        <button type="button" className="mr-2 font-medium">
          Solo
        </button>
      </div>
    </div>
    <div>
      <button type="button" className="mr-2">
        Sign In
      </button>
      <button type="button" className="btn-primary">
        Sign Up
      </button>
    </div>
  </header>
)
