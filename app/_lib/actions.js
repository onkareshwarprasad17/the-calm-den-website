'use server';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import { updateGuestData } from './data-service';

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

export async function updateGuest(formData) {
  // Authorization check
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  // Input validation
  if (!/^[a-zA-Z0-9]{6,12}/g.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updatedData = {
    countryFlag,
    nationality,
    nationalID,
  };

  await updateGuestData(session.user.guestId, updatedData);
}
