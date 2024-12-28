'use server';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuestData,
} from './data-service';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // need to check if the bookingId is really related to the user who is attempting to delete the reservation
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

  await deleteBooking(bookingId);
}

export async function updateReservation(formData, bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const numGuests = formData.get('numGuests');
  const observations = formData.get('observations').slice(0, 1000);
  const updatedData = {
    numGuests,
    observations,
  };

  // get the bookings of the current user
  const guestBookings = await getBookings(session.user.guestId);
  // check if the current bookingId is in the current users data
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error('You are not allowed to update this booking');

  await updateBooking(bookingId, updatedData);

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect('/account/reservations');
}

export async function createNewBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const numGuests = formData.get('numGuests');
  const observations = formData.get('observations').slice(0, 1000);
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests,
    observations,
    isPaid: false,
    hasBreakfast: false,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: 'unconfirmed',
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}
