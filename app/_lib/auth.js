import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from '@/app/_lib/data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // below callback will be executed when the middleware runs as per matcher
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; // will return true if user is authorized
    },
    // runs before the actual signIn process happens but after the user has put their credentials
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        return true;
      } catch (error) {
        return false;
      }
    },
    // runs each time the session is checked out, for ex. when we call the auth function
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session; // not returning session here will skip generating session when auth is called
    },
  },
  // to specify the file we want instead of the default one for a certain action, i.e. sign-in
  pages: {
    signIn: '/login', // default route:- api/auth/signin
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
