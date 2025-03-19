import { Mail as MailIcon, User as PersonIcon } from 'lucide-react';
import { PostSchema } from '../schemas/post';

const AVAILABLE_BADGES = [
  {
    label: "@pse.dev",
    icon: null,
    tooltip: "Verified by",
  },
  {
    label: "@ethereum.org",
    icon: null,
    tooltip: "Verified by",
  },
  {
    label: "zksync.io",
    icon: null,
    tooltip: "Verified by",
  },
  {
    label: "+18 years old",
    icon: null,
    tooltip: "Verified by",
  }
];

const LOREM_REPLIES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,

  `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,

  `Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,

  `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,

  `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`
];

export const postMocks: PostSchema[] = [
  {
    id: 1,
    title: "Security Challenges in Multi-party Applications",
    content: `Security in multi-party applications faces key challenges: trust assumptions, scalability trade-offs, and real-world attack surfaces. While cryptographic tools like MPC and ZKPs help, key management and usability remain weak points.`,
    author: {
      username: "crypto_expert",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[0], AVAILABLE_BADGES[1]],
      isAnon: false,
    },
    group: "PSE",
    createdAt: "2024-03-10T10:00:00Z",
    totalViews: 1205,
    replies: [
      {
        id: 101,
        author: {
          username: "security_researcher",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[2]],
          isAnon: false,
        },
        content: LOREM_REPLIES[0],
        createdAt: "2024-03-10T11:30:00Z",
        replies: [
          {
            author: {
              username: null,
              avatar: "",
              badges: [AVAILABLE_BADGES[2]],
              isAnon: true,
            },
            id: 1011,
            content: LOREM_REPLIES[0],
            
          }
        ] 
      },
      {
        id: 102,
        author: {
          username: "crypto_analyst",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[1]],
          isAnon: false,
        },
        content: LOREM_REPLIES[1],
        createdAt: "2024-03-10T12:30:00Z",
      },
      {
        id: 103,
        author: {
          username: "privacy_expert",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[0]],
          isAnon: false,
        },
        content: LOREM_REPLIES[2],
        createdAt: "2024-03-10T13:30:00Z",
      }
    ],
    isAnon: false,
  },
  {
    id: 2,
    title: "Zero Knowledge Proofs: A Comprehensive Guide",
    content: `Understanding ZKPs from first principles. This guide covers the basics to advanced implementations...`,
    author: {
      username: "zkp_master",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[2]],
      isAnon: false,
    },
    group: "ZKP",
    createdAt: "2024-03-09T15:00:00Z",
    totalViews: 892,
    replies: [
      {
        id: 104,
        author: {
          username: "zkp_enthusiast",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[2]],
          isAnon: false,
        },
        content: LOREM_REPLIES[3],
        createdAt: "2024-03-09T16:00:00Z",
      }
    ],
    isAnon: false,
  },
  {
    id: 3,
    title: "Ethereum Layer 2 Scaling Solutions Compared",
    content: `Detailed comparison of different L2 solutions including Optimistic Rollups, ZK Rollups, and Validiums...`,
    author: {
      username: "l2_researcher",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[2]],
      isAnon: false,
    },
    group: "Scaling",
    replies: [
      {
        id: 105,
        author: {
          username: "l2_expert",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[1]],
          isAnon: false,
        },
        content: LOREM_REPLIES[4],
        createdAt: "2024-03-08T10:15:00Z",
      },
      {
        id: 106,
        author: {
          username: "scaling_researcher",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[0]],
          isAnon: false,
        },
        content: LOREM_REPLIES[0],
        createdAt: "2024-03-08T11:30:00Z",
      }
    ],
    totalViews: 1567,
    createdAt: "2024-03-08T09:15:00Z",
    isAnon: false,
  },
  {
    id: 4,
    title: "Privacy-Preserving Machine Learning",
    content: `Exploring the intersection of ML and privacy-preserving techniques...`,
    author: {
      username: null,
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[3]],
      isAnon: true,
    },
    group: "Privacy",
    replies: [],
    totalViews: 445,
    createdAt: "2024-03-07T14:20:00Z",
    isAnon: true,
  },
  {
    id: 5,
    title: "The Future of Decentralized Identity",
    content: `Examining the evolution of DID standards and implementations...`,
    author: {
      username: "identity_expert",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[0]],
      isAnon: false,
    },
    group: "Identity",
    replies: [
      {
        id: 107,
        author: {
          username: "identity_researcher",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[2]],
          isAnon: false,
        },
        content: LOREM_REPLIES[1],
        createdAt: "2024-03-06T12:30:00Z",
      },
      {
        id: 108,
        author: {
          username: "did_expert",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[1]],
          isAnon: false,
        },
        content: LOREM_REPLIES[2],
        createdAt: "2024-03-06T13:45:00Z",
      },
      {
        id: 109,
        author: {
          username: "web3_identity",
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[0]],
          isAnon: false,
        },
        content: LOREM_REPLIES[3],
        createdAt: "2024-03-06T14:30:00Z",
      },
      {
        id: 110,
        author: {
          username: null,
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[3]],
          isAnon: true,
        },
        content: LOREM_REPLIES[4],
        createdAt: "2024-03-06T15:15:00Z",
      }
    ],
    totalViews: 789,
    createdAt: "2024-03-06T11:30:00Z",
    isAnon: false,
  },
  {
    id: 6,
    title: "Smart Contract Security Best Practices",
    content: `Essential security considerations for smart contract development...`,
    author: {
      username: "smart_contract_dev",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[0]],
      isAnon: false,
    },
    group: "Security",
    replies: [],
    totalViews: 2341,
    createdAt: "2024-03-05T16:45:00Z",
    isAnon: false,
  },
  {
    id: 7,
    title: "Cross-Chain Bridge Security",
    content: `Analysis of recent bridge hacks and security measures...`,
    author: {
      username: "bridge_security",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[2]],
      isAnon: false,
    },
    group: "Security",
    replies: [
      {
        id: 102,
        author: {
          username: null,
          avatar: "https://github.com/shadcn.png",
          badges: [AVAILABLE_BADGES[4]],
          isAnon: true,
        },
        content: "Great analysis on recent exploits...",
        createdAt: "2024-03-04T14:20:00Z",
      }
    ],
    totalViews: 1123,
    createdAt: "2024-03-04T13:20:00Z",
    isAnon: false,
  },
  {
    id: 8,
    title: "MEV Protection Strategies",
    content: `Understanding and mitigating MEV in DeFi protocols...`,
    author: {
      username: "mev_researcher",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[2]],
      isAnon: false,
    },
    group: "MEV",
    replies: [],
    totalViews: 567,
    createdAt: "2024-03-03T10:10:00Z",
    isAnon: false,
  },
  {
    id: 9,
    title: "Quantum Resistance in Cryptography",
    content: `Preparing cryptographic systems for the quantum era...`,
    author: {
      username: "quantum_crypto",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[2]],
      isAnon: false,
    },
    group: "Cryptography",
    replies: [],
    totalViews: 890,
    createdAt: "2024-03-02T09:30:00Z",
    isAnon: false,
  },
  {
    id: 10,
    title: "Account Abstraction Implementation",
    content: `Step-by-step guide to implementing account abstraction...`,
    author: {
      username: "aa_developer",
      avatar: "https://github.com/shadcn.png",
      badges: [AVAILABLE_BADGES[1]],
      isAnon: false,
    },
    group: "Development",
    replies: [],
    totalViews: 1432,
    createdAt: "2024-03-01T15:45:00Z",
    isAnon: false,
  },
]
