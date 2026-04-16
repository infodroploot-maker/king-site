'use client'

import { useEffect } from 'react'

export default function BookingLinker() {
  useEffect(() => {
    async function linkPendingBooking() {
      const bookingId = localStorage.getItem('pending_booking_id')
      const bookingToken = localStorage.getItem('pending_booking_token')
      if (!bookingId) return

      try {
        await fetch('/api/bookings/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking_id: bookingId, link_token: bookingToken }),
        })
      } catch {
        // silently fail
      } finally {
        localStorage.removeItem('pending_booking_id')
        localStorage.removeItem('pending_booking_token')
      }
    }

    linkPendingBooking()
  }, [])

  return null
}
