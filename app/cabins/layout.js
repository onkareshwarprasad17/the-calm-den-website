import { ReservationProvider } from '../_components/ReservationContext';

export default function CabinRootLayout({ children }) {
  return <ReservationProvider>{children}</ReservationProvider>;
}
