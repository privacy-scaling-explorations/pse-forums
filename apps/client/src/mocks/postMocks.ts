export const postMocks = [
  {
    id: 1,
    title: "Dolor sit amet consectetur adipiscing elit",
    author: "Sam",
    createdAt: "2025-02-26T10:00:00Z",
    group: "PSE",
    totalViews: 100,
    content: `## Lorem Ipsum Dolor  
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  

### Code Example  
\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

**Nunc finibus nisi nec magna ullamcorper dapibus.**`,
    replies: [
      {
        id: 101,
        author: "Alex",
        content: `# h1
## h2
### h3
#### h4
##### h5
###### h6
*italic*
**bold**
~~strikethrough~~
- Signed user interactions - posts/comments/emoji reactions/upvotes/etc
- User badges like Carlos mentioned that are signed or expose a proof: verified email (at some domain), verified passport, verified NFT, etc
- Gated inns/subreddits; gated posts (for example: only someone with a verified email at pse.dev or ethereum.org can respond)
- Anonymous gated polls (everyone that can prove they are a current ethereum validator can respond)
- If a user signs up with an email domain that hasn't been used previously, an inn/subreddit is created and gated for that email domain.

I have a bunch more but we will start there
        `,
        createdAt: "2025-02-26T12:00:00Z",
      },
      {
        id: 102,
        author: "Emma",
        content: "Praesent volutpat nisi nec urna.",
        createdAt: "2025-02-26T14:00:00Z",
      },
    ],
  },
  {
    id: 2,
    title: "Aenean tincidunt velit id nisi efficitur",
    author: "Alex",
    createdAt: "2025-02-26T08:00:00Z",
    group: "PSE",
    totalViews: 12,
    content: `### Fusce at lacus  
Name at felis nec eros vestibulum tincidunt eget a libero.  

\`\`\`css
.container {
  display: flex;
  justify-content: center;
}
\`\`\``,
    replies: [
      {
        id: 103,
        author: "Olivia",
        content: "Curabitur fringilla quam in tortor.",
        createdAt: "2025-02-26T10:30:00Z",
      },
    ],
  },
  {
    id: 3,
    title: "Vestibulum facilisis nulla at venenatis",
    author: "Emma",
    createdAt: "2025-02-26T06:00:00Z",
    content: `### Integer tristique  
- Morbi consequat nunc ut purus  
- Nulla facilities vestibulum egestas  
- Etiam in turpis ac felis ultricies tincidunt  

\`\`\`typescript
const add = (a: number, b: number): number => a + b;
\`\`\``,
    replies: [],
  },
  {
    id: 4,
    title: "Nullam nec velit ac neque tempor",
    author: "John",
    createdAt: "2025-02-26T04:00:00Z",
    group: "PSE",
    totalViews: 12,
    content: `### Proin malesuada  
Duis quis erat fringilla, luctus massa et, bibendum purus.  

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\``,
    replies: [
      {
        id: 104,
        author: "Liam",
        content: "Cras non lorem malesuada interdum.",
        createdAt: "2025-02-26T06:00:00Z",
      },
      {
        id: 105,
        author: "Sophia",
        content: "Donec vitae sapien eget nunc.",
        createdAt: "2025-02-26T07:00:00Z",
      },
    ],
  },
  {
    id: 5,
    title: "Curabitur id justo vel metus tristique",
    author: "Liam",
    createdAt: "2025-02-26T02:00:00Z",
    group: "PSE",
    totalViews: 233,
    content: `### Ut tristique mauris  
Suspendisse potenti. Vestibulum ante ipsum primis in faucibus.  

\`\`\`javascript
const greet = name => \`Hello, \${name}!\`;
console.log(greet("Alice"));
\`\`\``,
    replies: [
      {
        id: 107,
        author: "Mia",
        content: "Pellentesque habitant morbi tristique.",
        createdAt: "2025-02-26T03:30:00Z",
      },
    ],
  },
  {
    id: 6,
    title: "Quisque congue turpis ac quam suscipit",
    author: "Olivia",
    createdAt: "2025-02-25T22:00:00Z",
    content: `### Sed venenatis  
Pellentesque ullamcorper vel augue at consectetur. **Aenean sollicitudin nunc euismod leo lobortis, eget venenatis elit mollis.**`,
    replies: [],
  },
  {
    id: 7,
    title: "Aliquam eget risus ac neque faucibus",
    author: "Sophia",
    createdAt: "2025-02-25T18:00:00Z",
    content: `### Fusce efficitur  
- Donec placerat sapien nec sapien  
- Etiam vehicula justo a felis tincidunt  

\`\`\`html
<div class="box">Hello World</div>
\`\`\``,
    replies: [
      {
        id: 108,
        author: "Ethan",
        content: "Lorem ipsum dolor sit amet.",
        createdAt: "2025-02-25T19:00:00Z",
      },
    ],
  },
  {
    id: 8,
    title: "Pellentesque dignissim sapien vel mauris",
    author: "Ethan",
    createdAt: "2025-02-25T14:00:00Z",
    content: `### Integer dictum  
Donec euismod, nisi ac suscipit suscipit, risus nulla posuere lacus, sed ultricies turpis quam non nisl.`,
    replies: [],
  },
  {
    id: 9,
    title: "Mauris fermentum justo vel ultricies",
    author: "Mia",
    createdAt: "2025-02-25T10:00:00Z",
    content: `### Phasellus tristique  
Suspendisse aliquet ante ut justo **porta consectetur**.  

\`\`\`javascript
const square = num => num * num;
console.log(square(4)); // 16
\`\`\``,
    replies: [
      {
        id: 109,
        author: "Noah",
        content: "Morbi efficitur ligula id ex.",
        createdAt: "2025-02-25T12:00:00Z",
      },
    ],
  },
  {
    id: 10,
    title: "Donec venenatis leo id sapien interdum",
    author: "Noah",
    createdAt: "2025-02-25T06:00:00Z",
    content: `### Aenean dictum  
Morbi quis lacus vehicula, facilisis dolor sed, vehicula mauris.  

\`\`\`sql
SELECT * FROM users WHERE active = 1;
\`\`\``,
    replies: [],
  },
]
