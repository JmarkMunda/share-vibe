import User from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can do verification here and manage if you want to login the user or not.
      await connectToDb();

      try {
        const result = await User.findOne({ email: profile?.email });
        if (!result) {
          await User.create({
            username: profile?.name,
            email: profile?.email,
            image: profile?.image,
          });
        }
        return Promise.resolve(true);
      } catch (error) {
        console.log("Sign in error:", error);
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
      const result = await User.findOne({ email: session.user?.email });
      if (result) (session as any).user.id = result?._id;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
