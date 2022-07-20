import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "../../../lib/spotify";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXTPUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXTPUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),

    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/Login",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      //initial sign in
      if (account && user) {
        return {
          ...token,
          accesstoken: account.access_token,
          refreshtoken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // we are handing expiry time sin milleseconds hence *1000
        };
      }

      // return the previous token if the access token is not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      //  access token has expired so we need to refreh it
    },
  },
});
