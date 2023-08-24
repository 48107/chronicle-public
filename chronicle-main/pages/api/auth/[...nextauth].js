import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoClient } from 'mongodb';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'light',
    logo: '/chronicle-mobile.svg',
  },
  callbacks: {
    async jwt({ token, isNewUser, user }) {
      if (user) {
        const admins = ['thomas.noonan201@gmail.com'];
        token.isAdmin = admins.includes(user?.email)
      }
      return token;
    },
    async session({ session, token }) {
      // const client = await MongoClient.connect(
      //   'mongodb+srv://tnoonan:mqSizDooyRS6rZwv@cluster0.h7mon.mongodb.net/chronicle?retryWrites=true&w=majority'
      // );
      // const db = client.db();
      // const userCollection = db.collection('users');

      // const userAccount = await userCollection.find();

      // if (!userAccount) {
      //   const result = await userCollection.insertOne(JSON.stringify(user));
      // }
      // console.log(`Hoorah ${result}`)

      session.isAdmin = token.isAdmin;
      return session;
    },
  },
});
