import { PostSchema } from "../schemas/post.schema"
import { generateLoremIpsum } from "../utils/lorem"
import { badgesMocks } from "./badges.mocks"
import { usersMocks } from "./users.mocks"
import { communityMocks } from "./community.mocks"
const LOREM_REPLIES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,

  `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,

  `Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,

  `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,

  `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`,
]

export const postMocks: PostSchema[] = [
  {
    id: 1,
    title: generateLoremIpsum(1, 20),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    createdAt: "2024-03-10T10:00:00Z",
    totalViews: 1205,
    replies: [
      {
        id: 101,
        author: {
          id: String(badgesMocks[2].id),
          username: `Badge_${badgesMocks[2].name}`,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[0],
        createdAt: "2024-03-10T11:30:00Z",
        replies: [
          {
            author: {
              id: String(badgesMocks[2].id),
              username: `Badge_${badgesMocks[2].name}`,
              isAnon: false,
              badges: []
            },
            id: 1011,
            content: LOREM_REPLIES[0],
          },
        ],
      },
      {
        id: 102,
        author: {
          id: String(badgesMocks[1].id),
          username: `Badge_${badgesMocks[1].name}`,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[1],
        createdAt: "2024-03-10T12:30:00Z",
      },
      {
        id: 103,
        author: {
          id: String(badgesMocks[0].id),
          username: `Badge_${badgesMocks[0].name}`,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[2],
        createdAt: "2024-03-10T13:30:00Z",
      },
    ],
    isAnon: false,
    reactions: {},
    community: communityMocks[0].id,
  },
  {
    id: 2,
    title: generateLoremIpsum(1, 15),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    createdAt: "2024-03-09T15:00:00Z",
    totalViews: 892,
    replies: [
      {
        id: 104,
        author: {
          id: String(usersMocks[2].id),
          username: usersMocks[2].username,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[3],
        createdAt: "2024-03-09T16:00:00Z",
      },
    ],
    isAnon: false,
    community: communityMocks[0].id,
  },
  {
    id: 3,
    title: generateLoremIpsum(1, 15),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(badgesMocks[2].id),
      username: `Badge_${badgesMocks[2].name}`,
      isAnon: false,
      badges: []
    },
    replies: [
      {
        id: 105,
        author: {
          id: String(badgesMocks[1].id),
          username: `Badge_${badgesMocks[1].name}`,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[4],
        createdAt: "2024-03-08T10:15:00Z",
      },
      {
        id: 106,
        author: {
          id: String(badgesMocks[0].id),
          username: `Badge_${badgesMocks[0].name}`,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[0],
        createdAt: "2024-03-08T11:30:00Z",
      },
    ],
    totalViews: 1567,
    createdAt: "2024-03-08T09:15:00Z",
    isAnon: false,
    community: communityMocks[2].id,
  },
  {
    id: 4,
    title: generateLoremIpsum(20, 50),
    content: generateLoremIpsum(50, 200),
    author: {
      id: null,
      username: null,
      isAnon: true,
      badges: []
    },
    replies: [],
    totalViews: 445,
    createdAt: "2024-03-07T14:20:00Z",
    isAnon: true,
    community: communityMocks[0].id,
  },
  {
    id: 5,
    title: generateLoremIpsum(20, 50),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[2].id),
      username: usersMocks[2].username,
      isAnon: false,
      badges: []
    },
    replies: [
      {
        id: 107,
        author: {
          id: String(usersMocks[2].id),
          username: usersMocks[2].username,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[1],
        createdAt: "2024-03-06T12:30:00Z",
        postMention: null,
      },
      {
        id: 108,
        author: {
          id: String(usersMocks[1].id),
          username: usersMocks[1].username,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[2],
        createdAt: "2024-03-06T13:45:00Z",
        postMention: null,
      },
      {
        id: 109,
        author: {
          id: String(usersMocks[0].id),
          username: usersMocks[0].username,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[3],
        createdAt: "2024-03-06T14:30:00Z",
      },
      {
        id: 110,
        author: {
          id: String(usersMocks[4]?.id),
          username: usersMocks[4]?.username,
          isAnon: false,
          badges: []
        },
        content: LOREM_REPLIES[4],
        createdAt: "2024-03-06T15:15:00Z",
      },
    ],
    totalViews: 789,
    createdAt: "2024-03-06T11:30:00Z",
    isAnon: false,
    community: communityMocks[3].id,
  },
  {
    id: 6,
    title: generateLoremIpsum(20, 50),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    replies: [],
    totalViews: 2341,
    createdAt: "2024-03-05T16:45:00Z",
    isAnon: false,
    community: communityMocks[0].id,
  },
  {
    id: 7,
    title: generateLoremIpsum(20, 50),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    replies: [
      {
        id: 102,
        author: {
          id: String(usersMocks[4].id),
          username: usersMocks[4]?.username,
          isAnon: false,
          badges: []
        },
        content: "Great analysis on recent exploits...",
        createdAt: "2024-03-04T14:20:00Z",
      },
    ],
    totalViews: 1123,
    createdAt: "2024-03-04T13:20:00Z",
    isAnon: false,
    community: communityMocks[0].id,
  },
  {
    id: 8,
    title: generateLoremIpsum(20, 50),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    replies: [],
    totalViews: 567,
    createdAt: "2024-03-03T10:10:00Z",
    isAnon: false,
    community: communityMocks[0].id,
  },
  {
    id: 9,
    title: generateLoremIpsum(20, 50),
    content: generateLoremIpsum(50, 200),
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    replies: [],
    totalViews: 890,
    createdAt: "2024-03-02T09:30:00Z",
    isAnon: false,
    community: communityMocks[0].id,
  },
  {
    id: 10,
    title: "Account Abstraction Implementation",
    content: `Step-by-step guide to implementing account abstraction...`,
    author: {
      id: String(usersMocks[0].id),
      username: usersMocks[0].username,
      isAnon: false,
      badges: []
    },
    replies: [],
    totalViews: 1432,
    createdAt: "2024-03-01T15:45:00Z",
    isAnon: false,
    community: communityMocks[0].id,
  },
]
