import Spinner from '@/app/_components/Spinner';

/*
  This loading file will be overwritten by the Suspense component for more granular approach
*/
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />;
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
