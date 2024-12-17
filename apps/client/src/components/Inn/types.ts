export interface Claim {
  uid: number
  username: string
  last_write: number
  session_id: string
  role: number
  lang?: string
}
export interface PageData {
  title: string
  site_name: string
  site_description: string
  claim?: Claim
  has_unread: boolean
  lang: string
}

export interface OutPostList {
  pid: number
  iid: number
  inn_name: string
  uid: number
  username: string
  title: string
  created_at: string // ISO 8601 format
  comment_count: number
  last_reply?: [number, string]
  is_pinned: boolean
}

export interface LastReply {
  uid: number
  username: string
}

export interface InnListItem {
  iid: number
  inn_name: string
  joined: boolean
}

export interface RecommendUser {
  uid: number
  username: string
}

export interface PageInn {
  page_data: PageData
  posts: OutPostList[]
  iid: number
  inn_name: string
  about: string
  description: string
  anchor: number
  n: number
  is_desc: boolean
  inn_role: number
  filter?: string
  username?: string
  inn_users_count: number
  is_mod: boolean
  inns: InnListItem[]
  recommend_users: RecommendUser[]
  counts: number
}
