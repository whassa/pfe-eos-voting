## Getting Started

First, you need to put the good environment variable for the project to run on the desired blockchain network.
You could cp the default.env or the jungle default .env.jungle.text file into the .env file for the project to have the good environment variable.

```bash
    cp default.env .env
```

Then just install packages
```bash
    npm install
```

and you can run the development server:

```bash
    npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Contract

All the contract files are situated in the contracts folder of the project. We used the eos studio compiler to compile using the CDT v1.8.1. The application uses the contract on a certain account defined in the environment variable. You can decide to deploy your own on another user if desired.

## Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
