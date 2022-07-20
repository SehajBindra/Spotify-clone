import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import spotifyapi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyapi.setAccessToken(token.accessToken);
    spotifyapi.setRefreshAccessToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyapi.refreshAccessToken();
    console.log("REFRESH TOKEN IS", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1hour  as 3600 returns from Spotifyapi

      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      //    replace if new one came back else fall back to old refresh token
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAcesstokenError",
    };
  }
}

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
        console.log("existing token is vaild");
        return token;
      }

      //  access token has expired so we need to refreh it
      console.log("existing token is vaild");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
