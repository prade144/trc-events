import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import BackToTop from "./BackToTop";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white bg-brand-black text-white overflow-x-hidden">
      <Navbar onOpenBooking={() => setShowBookingModal(true)} />
      
      <main>
        <Outlet />
      </main>

      <Footer />
      <BackToTop />

      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  );
}
