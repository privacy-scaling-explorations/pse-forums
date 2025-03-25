import { UserSchema } from "../schemas/user.schema";

export const usersMocks: UserSchema[] = [
  {
    id: 1,
    username: "kali",
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "kali@example.com",
    website: "https://example.com",
    bio: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    badges: [
        {
            id: 1,
            name: "Badge 1",
            description: "Badge 1 description",
            imageUrl: "https://pse.dev/logos/pse-logo-bg.svg",
            createdAt: "2021-01-01",
        },
        {
            id: 2,
            name: "Badge 2",
            description: "Badge 2 description",
            imageUrl: "https://pse.dev/logos/pse-logo-bg.svg",
            createdAt: "2021-01-01",
        },
    ],
  },
  {
    id: 2,
    username: "Mario Rossi",
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "mario.rossi@example.com",
    website: "https://example.com",
    bio: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    badges: [],
  },
  {
    id: 3,
    username: "John Doe",
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    avatar: "https://pse.dev/logos/pse-logo-bg.svg",
    email: "john.doe@example.com",
    website: "https://example.com",
    bio: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];
