'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteReservation } from '@/app/_lib/actions';

export default function ReservationList({ bookings }) {
  // optimisticDeleteBookings acts as a dispatch function that triggers the reducer function specifed as second argument in the hook
  const [optimisticBookings, optimisticDeleteBookings] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDeleteBookings(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
