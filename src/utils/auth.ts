import User, { IUserSchema } from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import NextAuth, { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email && !credentials?.password) return null;

        await connectToDb();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        } else {
          // Any object returned will be saved in `user` property of the JWT
          return user;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signOut: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can do verification here and manage if you want to login the user or not.
      await connectToDb();

      try {
        // Sign using email and password
        if (account?.type === "credentials") {
          const res = await User.findOne({ email: credentials?.email });
          // const hash = await bcrypt.hash(credentials!.password as string, 10);
          const hasMatch = await bcrypt.compare(
            credentials!.password as string,
            res.password
          );
          return hasMatch;
        }

        // Google Auth
        const result = await User.findOne({ email: profile?.email });
        if (!result) {
          await User.create({
            username: profile?.name,
            email: profile?.email,
            image: user?.image,
          });
        }
        return Promise.resolve(true);
      } catch (error) {
        console.log("[auth]Sign in error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      await connectToDb();
      const result = await User.findOne({ email: session.user?.email });
      if (result) session.user.id = result?._id;
      session.accessToken = token.accessToken;
      session.user.username = result.username;
      return session;
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
