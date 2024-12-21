'use server';

import { signIn, signOut } from '@/app/_lib/auth';

/* these server actions can be used in the form action attribute 
   to perform the action needed when the form is submitted */

/* Below function name can be anything,
    but it will execute the signIn function from "auth"
    and upon successful signIn will redirect to account page */
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
