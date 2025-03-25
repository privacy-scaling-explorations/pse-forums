import { CommunitySchema } from "../schemas/community.schema";
import { usersMocks } from "./users.mocks";
import { postMocks } from "./posts.mocks";

export const communityMocks: CommunitySchema[] = [
  {
    id: "1",
    name: "Group 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    members: usersMocks.map((user) => user.id),
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    banner: "https://pse.dev/logos/pse-logo-bg.svg",
    requiredBadges: [1, 2, 3, 4],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "2",
    name: "Group 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    members: usersMocks.map((user) => user.id),
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    banner: "https://pse.dev/logos/pse-logo-bg.svg",
    requiredBadges: [1],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "3",
    name: "Group 3",
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
    name: "lorem ipsum dolor sit amet consectetur adipisicing elit",
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
