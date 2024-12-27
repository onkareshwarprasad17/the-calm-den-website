'use client';

import { useTransition } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import SpinnerMini from '@/app/_components/SpinnerMini';

function DeleteReservation({ bookingId, onDelete }) {
  const [pending, startTransition] = useTransition();

  // wrapping the server action with a transition will help to add a loading indicator
  function handleDelete() {
    if (confirm('Are you sure you want to delete this reservation?'))
      startTransition(() => onDelete(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {pending ? (
        <SpinnerMini />
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
