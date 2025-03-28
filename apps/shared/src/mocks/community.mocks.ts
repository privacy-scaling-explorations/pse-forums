import { CommunitySchema } from "../schemas/community.schema"
import { usersMocks } from "./users.mocks"
import { postMocks } from "./posts.mocks"

export const communityMocks: CommunitySchema[] = [
  {
    id: "1",
    name: "Privacy + Scaling Explorations",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    members: usersMocks.map((user) => user.id),
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    banner: "https://pse.dev/logos/pse-logo-bg.svg",
    requiredBadges: [1, 2, 3, 4],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    isPrivate: false,
  },
  {
    id: "2",
    name: "Test 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    members: usersMocks.map((user) => user.id),
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    banner: "https://pse.dev/logos/pse-logo-bg.svg",
    requiredBadges: [1],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    isPrivate: true,
  },
  {
    id: "3",
    name: "Test 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    members: usersMocks.map((user) => user.id),
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    banner: "https://pse.dev/logos/pse-logo-bg.svg",
    requiredBadges: [1, 2],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "4",
    name: "Test 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    members: usersMocks.map((user) => user.id),

    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    banner: "https://pse.dev/logos/pse-logo-bg.svg",
    requiredBadges: [1, 2],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
]
