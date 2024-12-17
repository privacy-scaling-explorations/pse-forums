import { Route } from "routes/inn/$iid"
import type { InnListItem, PageInn, RecommendUser } from "./types"

export function Inn() {
  const inn: PageInn = Route.useLoaderData()
  console.log(inn)

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

  // Generate pagination URLs
  const prevUrl = inn.anchor >= inn.n
    ? `/inn/${inn.iid}?anchor=${inn.anchor - inn.n}&is_desc=${inn.is_desc}${
      inn.filter ? `&filter=${encodeURIComponent(inn.filter)}` : ""
    }`
    : null
  const nextUrl = inn.posts.length === inn.n
    ? `/inn/${inn.iid}?anchor=${inn.anchor + inn.n}&is_desc=${inn.is_desc}${
      inn.filter ? `&filter=${encodeURIComponent(inn.filter)}` : ""
    }`
    : null

  return (
    <div className="p-4">
      {/* Title and About Section */}
      <h2 className="text-3xl font-bold mb-2">{inn.inn_name}</h2>
      <p className="text-gray-700 mb-2">
        <strong>About:</strong> {inn.about}
      </p>
      <div className="text-gray-600 mb-4">{inn.description}</div>

      {/* Tabs Navigation */}
      <div className="tabs is-toggle is-toggle-rounded mb-4">
        <ul className="flex space-x-2">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`p-2 rounded ${tab.isActive ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <a href={tab.url}>{tab.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls for Posts */}
      <div className="flex justify-end mb-4">
        {inn.inn_role >= 4 && (
          <a href={`/post/edit/0?iid=${inn.iid}`}>
            <button
              className="button bg-green-500 text-white rounded px-4 py-1"
              type="button"
            >
              New Post
            </button>
          </a>
        )}
      </div>

      {/* List of Posts */}
      <div className="list bg-white shadow-md rounded p-4 mb-4">
        {inn.posts.length > 0
          ? (
            inn.posts.map((post) => (
              <div key={post.pid} className="list-item border-b pb-2 mb-2">
                <h3 className="font-semibold">
                  <a
                    href={`/post/${post.iid}/${post.pid}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.is_pinned && "📌 "} {post.title}
                  </a>
                </h3>
                <div className="text-sm text-gray-500">
                  <span>By: {post.username}</span> | <span>Created: {post.created_at}</span>
                </div>
                {post.comment_count > 0 && (
                  <div className="text-right mt-1">
                    <a
                      href={`/post/${post.iid}/${post.pid}#${post.comment_count}`}
                      className="text-blue-600 hover:underline"
                    >
                      {post.comment_count} Comments
                    </a>
                  </div>
                )}
              </div>
            ))
          )
          : <p>No posts available.</p>}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-between">
        <a
          href={prevUrl || "#"}
          className={`button ${
            prevUrl ? "bg-blue-500" : "bg-gray-200 cursor-not-allowed"
          } text-white px-4 py-1 rounded`}
          aria-disabled={!prevUrl}
        >
          Previous
        </a>
        <a
          href={nextUrl || "#"}
          className={`button ${
            nextUrl ? "bg-blue-500" : "bg-gray-200 cursor-not-allowed"
          } text-white px-4 py-1 rounded`}
          aria-disabled={!nextUrl}
        >
          Next
        </a>
      </div>

      {/* Recommended Users */}
      {inn.recommend_users.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Recommended Users</h3>
          <div className="flex flex-wrap gap-2">
            {inn.recommend_users.map((user: RecommendUser) => (
              <a
                key={user.uid}
                href={`/user/${user.uid}`}
                title={user.username}
                className="block"
              >
                <img
                  src={`/static/avatars/${user.uid}.png`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Footer: Explore Inns */}
      {inn.inns.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">
            Explore more{" "}
            <a href="/inn/list" className="text-blue-600">
              Inns
            </a>
          </h3>
          {inn.inns.map((otherInn: InnListItem) => (
            <div key={otherInn.iid} className="flex items-center mb-2">
              <img
                src={`/static/inn_icons/${otherInn.iid}.png`}
                alt={otherInn.inn_name}
                className="w-10 h-10 rounded mr-2"
              />
              <a href={`/inn/${otherInn.iid}`} className="text-blue-600">
                {otherInn.inn_name}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Active Users Section: Recommend Users */}
      {inn.recommend_users.length > 0 && (
        <div className="box">
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-title">
                Active <a href="/user/list">👤 Users</a>
              </div>
            </div>
          </div>
          <div className="is-flex is-flex-wrap-wrap m-2">
            {inn.recommend_users.map((user: RecommendUser) => (
              <figure
                key={user.uid}
                className="image is-32x32 m-1 is-1by1 pt-0"
              >
                <a href={`/user/${user.uid}`}>
                  <img
                    alt="avatar"
                    className="is-rounded"
                    src={`/static/avatars/${user.uid}.png`}
                    title={user.username}
                  />
                </a>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* If not part of any inn, show site description */}
      {!inn.iid && (
        <div className="box">
          <div className="content">{inn.page_data.site_description}</div>
        </div>
      )}
    </div>
  )
}
