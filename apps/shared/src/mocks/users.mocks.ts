import { UserSchema } from "../schemas/user.schema"
import { badgesMocks } from "./badges.mocks"
export const usersMocks: UserSchema[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    username: "kali",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "kali@example.com",
    website: "https://example.com",
    bio: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    badges: [badgesMocks[0], badgesMocks[1]],
  },
  {
    id: 2,
    username: "Mario Rossi",
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "mario.rossi@example.com",
    website: "https://example.com",
    bio: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    badges: [badgesMocks[0]],
  },
  {
    id: 3,
    username: "Mario Bianchi",
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "john.doe@example.com",
    website: "https://example.com",
    bio: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    id: 4,
    username: "Mario Neri",
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "john.doe@example.com",
  },
  {
    id: 5,
    username: "Mario Verdi",
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "john.doe@example.com",
  },
]
