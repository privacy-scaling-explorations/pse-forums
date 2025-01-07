import { ActiveUsersList } from "components/ActiveUsersList"
import { Header } from "components/Header"
import { InnsList } from "components/InnsList"
import { PostCard } from "components/PostCard"
import { SearchBar } from "components/SearchBar"
import { Route } from "routes/inn/$iid"
import type { PageInn } from "./types"

export function Inn() {
  const inn: PageInn = Route.useLoaderData()

  if (!inn) {
    return <p>No Inn found.</p>
  }

  const activeFilter = inn.filter || "all"

  const tabs = [
    {
      name: "All",
      url: `/inn/${inn.iid}`,
      isActive: activeFilter === "all",
    },
    {
      name: "Joined",
      url: `/inn/${inn.iid}?filter=joined`,
      isActive: activeFilter === "joined",
    },
    {
      name: "Following",
      url: `/inn/${inn.iid}?filter=following`,
      isActive: activeFilter === "following",
    },
  ]

  // If filtering by a specific user (username), add a tab for that user
  if (
    activeFilter
    && !["all", "joined", "following"].includes(activeFilter)
    && inn.username
  ) {
    tabs.push({
      name: `👤 ${inn.username}`,
      url: `/inn/${inn.iid}?filter=${encodeURIComponent(inn.username)}`,
      isActive: activeFilter === inn.username,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Main Content */}
        <div className="flex-grow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">All</h2>
            <button type="button" className="btn-primary">
              + New Post
            </button>
          </div>
          <div className="space-y-2">
            {inn.posts.map(({ created_at, inn_name, pid, title, username }) => (
              <PostCard
                key={pid}
                created_at={created_at}
                inn_name={inn_name}
                title={title}
                username={username}
              />
            ))}
          </div>
        </div>

        <div className="w-64 p-4 border-l">
          <SearchBar />

          {
            /*
         <div className="mb-4">
            <h3 className="font-medium mb-2">Tor-Friendly, RSS-Accessible</h3>
            <ul className="text-sm space-y-1">
              <li>— Privacy Always.</li>
              <li>Redlib</li>
              <li>Nitters</li>
              <li>Nitter</li>
              <li>BiblioReads</li>
              <li>AnonymousOverflow</li>
              <li>IT-Tools</li>
            </ul>
          </div>
           */
          }

          <InnsList
            inns={inn.inns.map(([iid, inn_name, joined]) => ({
              iid,
              inn_name,
              joined,
            }))}
          />
          <ActiveUsersList users={inn.recommend_users} />
        </div>
      </div>
    </div>
  )
}
