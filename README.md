
## Tech Stack

The technology and library used are :

- [Next.js](https://nextjs.org/docs) - Is the react framework.
- [Mongodb](https://www.mongodb.com/) - For the database.
- [Prisma](https://www.prisma.io/) -  ORM with mongodb.
- [Firebase](https://firebase.google.com/) - User auth.
- [Nodemailer](https://nodemailer.com/about/) - Email Notification.

- [react-firebase-hook](https://github.com/csfrequency/react-firebase-hooks) - hooks for firebase use.

## Getting Started

Clone the respitory and then run:

```bash
yarn install

or

npm install
```

Create a .env file and add the database endpoint after install mongodb in your device.

```bash

DATABASE_URL=""

```

The push the db schema from the ORM to mongodb:

```bash

 npx prisma db push
 
 then
 
 npx prisma generate 

```

Then start the project by run:

```bash

yarn dev

or 

npm run  dev

```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
