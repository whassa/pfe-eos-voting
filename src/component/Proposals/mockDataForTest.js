import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from "dayjs"
dayjs.extend(customParseFormat)

const resolutions = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Resolution",
    summary: "This is a summary",
    content: "this is a content",
    transactionId: "4jk55r53f8576asdfasdfasdffg85as77sdfghsdfsad",
    expireAt: dayjs("01-01-2025", "DD-MM-YYYY"),
    createdAt: dayjs("01-10-2025", "DD-MM-YYYY"),
    updatedAt: dayjs("01-10-2025", "DD-MM-YYYY"),
    deletedAt: null,
    organizationId: "00000000-0000-0000-0000-000000000001",
    integrity: true,
    pictureThumbUrl: "/DataSources/EOSIO_logo.png",
    category: {
      id: "00000000-0000-0000-0000-000000000002",
      name: "Marketing",
      threshold: {
        id: "00000000-0000-0000-0000-000000000003",
        value: 10,
      },
    },
    status: {
      id: "00000000-0000-0000-0000-000000000004",
      name: "Open",
    },
    author: {
      id: "00000000-0000-0000-0000-000000000005",
      user: {
        displayName: "John Doe",
      },
    },
    arguments: {
      items: [
        {
          id: "00000000-0000-0000-0000-000000000006",
          pro: true,
          title: 'Argument title',
          content: "This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. This is some text. ",
          member: {
            id: "00000000-0000-0000-0000-000000000007",
            user: {
              displayName: "John Deer",
            },
          },
          createdAt: dayjs("02-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("02-10-2049", "DD-MM-YYYY"),
          votes: {
            items: [
              {
                id: "00000000-0000-0000-0000-000000000008",
                member: {
                  id: "00000000-0000-0000-0000-000000000009",
                },
                value: true,
              },
            ],
          },
        },
      ],
    },
    comments: {
      totalCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
      page: 1,
      items: [
        {
          id: "00000000-0000-0000-0000-0000000000010",
          content: "This is a comment",
          member: {
            id: "00000000-0000-0000-0000-000000000005",
            user: {
              displayName: "John Doe",
            },
          },
          createdAt: dayjs("03-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("03-10-2049", "DD-MM-YYYY"),
        },
      ],
    },
    news: {
      items: [
        {
          id: "00000000-0000-0000-0000-000000000011",
          title: "Title news",
          content: "This is a news",
          createdAt: dayjs("04-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("04-10-2049", "DD-MM-YYYY"),
        },
      ],
    },
    votes: {
      totalCount: 3,
      items: [
        {
          id: "00000000-0000-0000-0000-000000000012",
          value: true,
          createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
        },
        {
          id: "00000000-0000-0000-0000-000000000013",
          value: false,
          createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
        },
        {
          id: "00000000-0000-0000-0000-000000000014",
          value: null,
          createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
        },
      ],
    },
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Resolution",
    summary: "This is a summary",
    content: "this is a content",
    transactionId: "4jk55r53f8576asdfasdfasdffg85as77sdfghsdfsad",
    expireAt: dayjs("01-01-2050", "DD-MM-YYYY"),
    createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
    updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
    deletedAt: null,
    organizationId: "00000000-0000-0000-0000-000000000001",
    integrity: true,
    pictureThumbUrl: "/DataSources/EOSIO_logo.png",
    category: {
      id: "00000000-0000-0000-0000-000000000002",
      name: "Marketing",
      threshold: {
        id: "00000000-0000-0000-0000-000000000003",
        value: 10,
      },
    },
    status: {
      id: "00000000-0000-0000-0000-000000000004",
      name: "Open",
    },
    author: {
      id: "00000000-0000-0000-0000-000000000005",
      user: {
        displayName: "John Doe",
      },
    },
    arguments: {
      items: [
        {
          id: "00000000-0000-0000-0000-000000000006",
          pro: true,
          content: "This is content",
          member: {
            id: "00000000-0000-0000-0000-000000000007",
            user: {
              displayName: "John Deer",
            },
          },
          createdAt: dayjs("02-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("02-10-2049", "DD-MM-YYYY"),
          votes: {
            items: [
              {
                id: "00000000-0000-0000-0000-000000000008",
                member: {
                  id: "00000000-0000-0000-0000-000000000009",
                },
                value: true,
              },
            ],
          },
        },
      ],
    },
    comments: {
      totalCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
      page: 1,
      items: [
        {
          id: "00000000-0000-0000-0000-0000000000010",
          content: "This is a comment",
          member: {
            id: "00000000-0000-0000-0000-000000000005",
            user: {
              displayName: "John Doe",
            },
          },
          createdAt: dayjs("03-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("03-10-2049", "DD-MM-YYYY"),
        },
      ],
    },
    news: {
      items: [
        {
          id: "00000000-0000-0000-0000-000000000011",
          title: "Title news",
          content: "This is a news",
          createdAt: dayjs("04-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("04-10-2049", "DD-MM-YYYY"),
        },
      ],
    },
    votes: {
      totalCount: 3,
      items: [
        {
          id: "00000000-0000-0000-0000-000000000012",
          value: true,
          createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
        },
        {
          id: "00000000-0000-0000-0000-000000000013",
          value: false,
          createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
        },
        {
          id: "00000000-0000-0000-0000-000000000014",
          value: null,
          createdAt: dayjs("01-10-2049", "DD-MM-YYYY"),
          updatedAt: dayjs("01-10-2049", "DD-MM-YYYY"),
        },
      ],
    },
  },
];

export default resolutions;
