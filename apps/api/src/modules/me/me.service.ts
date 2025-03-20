const mockUser = {
  id: "1",
  username: "john_doe",
  avatar: "https://github.com/shadcn.png",
  badges: ["verified"],
  isAnon: false,
  email: "john@example.com",
  createdAt: "2024-01-01T00:00:00Z"
};

export async function getUser() {
  return mockUser;
} 