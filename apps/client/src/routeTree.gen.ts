/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as LogoutImport } from './routes/logout'
import { Route as LoginImport } from './routes/login'
import { Route as GroupsImport } from './routes/groups'
import { Route as UserUsernameImport } from './routes/user.$username'
import { Route as PostPidImport } from './routes/post/$pid'
import { Route as GroupIidImport } from './routes/group/$iid'

// Create Virtual Routes

const SoloLazyImport = createFileRoute('/solo')()
const RssLazyImport = createFileRoute('/rss')()
const NotificationsLazyImport = createFileRoute('/notifications')()
const IndexLazyImport = createFileRoute('/')()
const PostIndexLazyImport = createFileRoute('/post/')()
const GroupIndexLazyImport = createFileRoute('/group/')()

// Create/Update Routes

const SoloLazyRoute = SoloLazyImport.update({
  id: '/solo',
  path: '/solo',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/solo.lazy').then((d) => d.Route))

const RssLazyRoute = RssLazyImport.update({
  id: '/rss',
  path: '/rss',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/rss.lazy').then((d) => d.Route))

const NotificationsLazyRoute = NotificationsLazyImport.update({
  id: '/notifications',
  path: '/notifications',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notifications.lazy').then((d) => d.Route))

const SettingsRoute = SettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRoute = LogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const GroupsRoute = GroupsImport.update({
  id: '/groups',
  path: '/groups',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PostIndexLazyRoute = PostIndexLazyImport.update({
  id: '/post/',
  path: '/post/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/post/index.lazy').then((d) => d.Route))

const GroupIndexLazyRoute = GroupIndexLazyImport.update({
  id: '/group/',
  path: '/group/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/group/index.lazy').then((d) => d.Route))

const UserUsernameRoute = UserUsernameImport.update({
  id: '/user/$username',
  path: '/user/$username',
  getParentRoute: () => rootRoute,
} as any)

const PostPidRoute = PostPidImport.update({
  id: '/post/$pid',
  path: '/post/$pid',
  getParentRoute: () => rootRoute,
} as any)

const GroupIidRoute = GroupIidImport.update({
  id: '/group/$iid',
  path: '/group/$iid',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/groups': {
      id: '/groups'
      path: '/groups'
      fullPath: '/groups'
      preLoaderRoute: typeof GroupsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/notifications': {
      id: '/notifications'
      path: '/notifications'
      fullPath: '/notifications'
      preLoaderRoute: typeof NotificationsLazyImport
      parentRoute: typeof rootRoute
    }
    '/rss': {
      id: '/rss'
      path: '/rss'
      fullPath: '/rss'
      preLoaderRoute: typeof RssLazyImport
      parentRoute: typeof rootRoute
    }
    '/solo': {
      id: '/solo'
      path: '/solo'
      fullPath: '/solo'
      preLoaderRoute: typeof SoloLazyImport
      parentRoute: typeof rootRoute
    }
    '/group/$iid': {
      id: '/group/$iid'
      path: '/group/$iid'
      fullPath: '/group/$iid'
      preLoaderRoute: typeof GroupIidImport
      parentRoute: typeof rootRoute
    }
    '/post/$pid': {
      id: '/post/$pid'
      path: '/post/$pid'
      fullPath: '/post/$pid'
      preLoaderRoute: typeof PostPidImport
      parentRoute: typeof rootRoute
    }
    '/user/$username': {
      id: '/user/$username'
      path: '/user/$username'
      fullPath: '/user/$username'
      preLoaderRoute: typeof UserUsernameImport
      parentRoute: typeof rootRoute
    }
    '/group/': {
      id: '/group/'
      path: '/group'
      fullPath: '/group'
      preLoaderRoute: typeof GroupIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/post/': {
      id: '/post/'
      path: '/post'
      fullPath: '/post'
      preLoaderRoute: typeof PostIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/groups': typeof GroupsRoute
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/settings': typeof SettingsRoute
  '/notifications': typeof NotificationsLazyRoute
  '/rss': typeof RssLazyRoute
  '/solo': typeof SoloLazyRoute
  '/group/$iid': typeof GroupIidRoute
  '/post/$pid': typeof PostPidRoute
  '/user/$username': typeof UserUsernameRoute
  '/group': typeof GroupIndexLazyRoute
  '/post': typeof PostIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/groups': typeof GroupsRoute
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/settings': typeof SettingsRoute
  '/notifications': typeof NotificationsLazyRoute
  '/rss': typeof RssLazyRoute
  '/solo': typeof SoloLazyRoute
  '/group/$iid': typeof GroupIidRoute
  '/post/$pid': typeof PostPidRoute
  '/user/$username': typeof UserUsernameRoute
  '/group': typeof GroupIndexLazyRoute
  '/post': typeof PostIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/groups': typeof GroupsRoute
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/settings': typeof SettingsRoute
  '/notifications': typeof NotificationsLazyRoute
  '/rss': typeof RssLazyRoute
  '/solo': typeof SoloLazyRoute
  '/group/$iid': typeof GroupIidRoute
  '/post/$pid': typeof PostPidRoute
  '/user/$username': typeof UserUsernameRoute
  '/group/': typeof GroupIndexLazyRoute
  '/post/': typeof PostIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/groups'
    | '/login'
    | '/logout'
    | '/settings'
    | '/notifications'
    | '/rss'
    | '/solo'
    | '/group/$iid'
    | '/post/$pid'
    | '/user/$username'
    | '/group'
    | '/post'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/groups'
    | '/login'
    | '/logout'
    | '/settings'
    | '/notifications'
    | '/rss'
    | '/solo'
    | '/group/$iid'
    | '/post/$pid'
    | '/user/$username'
    | '/group'
    | '/post'
  id:
    | '__root__'
    | '/'
    | '/groups'
    | '/login'
    | '/logout'
    | '/settings'
    | '/notifications'
    | '/rss'
    | '/solo'
    | '/group/$iid'
    | '/post/$pid'
    | '/user/$username'
    | '/group/'
    | '/post/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  GroupsRoute: typeof GroupsRoute
  LoginRoute: typeof LoginRoute
  LogoutRoute: typeof LogoutRoute
  SettingsRoute: typeof SettingsRoute
  NotificationsLazyRoute: typeof NotificationsLazyRoute
  RssLazyRoute: typeof RssLazyRoute
  SoloLazyRoute: typeof SoloLazyRoute
  GroupIidRoute: typeof GroupIidRoute
  PostPidRoute: typeof PostPidRoute
  UserUsernameRoute: typeof UserUsernameRoute
  GroupIndexLazyRoute: typeof GroupIndexLazyRoute
  PostIndexLazyRoute: typeof PostIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  GroupsRoute: GroupsRoute,
  LoginRoute: LoginRoute,
  LogoutRoute: LogoutRoute,
  SettingsRoute: SettingsRoute,
  NotificationsLazyRoute: NotificationsLazyRoute,
  RssLazyRoute: RssLazyRoute,
  SoloLazyRoute: SoloLazyRoute,
  GroupIidRoute: GroupIidRoute,
  PostPidRoute: PostPidRoute,
  UserUsernameRoute: UserUsernameRoute,
  GroupIndexLazyRoute: GroupIndexLazyRoute,
  PostIndexLazyRoute: PostIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/groups",
        "/login",
        "/logout",
        "/settings",
        "/notifications",
        "/rss",
        "/solo",
        "/group/$iid",
        "/post/$pid",
        "/user/$username",
        "/group/",
        "/post/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/groups": {
      "filePath": "groups.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/logout": {
      "filePath": "logout.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    },
    "/notifications": {
      "filePath": "notifications.lazy.tsx"
    },
    "/rss": {
      "filePath": "rss.lazy.tsx"
    },
    "/solo": {
      "filePath": "solo.lazy.tsx"
    },
    "/group/$iid": {
      "filePath": "group/$iid.tsx"
    },
    "/post/$pid": {
      "filePath": "post/$pid.tsx"
    },
    "/user/$username": {
      "filePath": "user.$username.tsx"
    },
    "/group/": {
      "filePath": "group/index.lazy.tsx"
    },
    "/post/": {
      "filePath": "post/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
