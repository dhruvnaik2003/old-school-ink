import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function sendAdminNewBookingAlert(booking: any) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing. Mocking admin alert:', booking.clientName);
    return;
  }
  
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's default testing address
      to: ['dhruvnaik1315@gmail.com'], // The admin's verified email account
      subject: `New Booking Request: ${booking.clientName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #e50914;">New Booking Request</h1>
          <p><strong>Name:</strong> ${booking.clientName}</p>
          <p><strong>Email:</strong> ${booking.clientEmail}</p>
          <p><strong>Date requested:</strong> ${new Date(booking.date).toLocaleString('en-US', { timeZone: 'UTC' })}</p>
          <p><strong>Placement & Size:</strong> ${booking.placement} (${booking.size})</p>
          <br/>
          <div style="margin-top: 20px;">
            <a href="https://old-school-ink.vercel.app/api/bookings/action?id=${booking.id}&status=APPROVED" style="display: inline-block; padding: 12px 24px; background-color: #059669; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin-right: 10px;">Approve Request</a>
            <a href="https://old-school-ink.vercel.app/api/bookings/action?id=${booking.id}&status=CANCELED" style="display: inline-block; padding: 12px 24px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Reject Request</a>
          </div>
        </div>
      `
    });
  } catch (err) {
    console.error('Failed to send admin email', err);
  }
}

export async function sendClientBookingUpdate(booking: any, type: 'RECEIVED' | 'APPROVED' | 'CANCELED' | 'RESCHEDULED') {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`RESEND_API_KEY missing. Mocking client update (${type}):`, booking.clientEmail);
    return;
  }

  const subjects = {
    RECEIVED: 'We received your booking request!',
    APPROVED: 'Your tattoo appointment is confirmed!',
    CANCELED: 'Your tattoo appointment has been canceled',
    RESCHEDULED: 'Your tattoo appointment has been rescheduled'
  };

  const messages = {
    RECEIVED: 'Thank you for requesting an appointment! We are reviewing your details and will get back to you shortly with approval.',
    APPROVED: 'Great news! Your appointment has been fully approved by the artist. See you soon.',
    CANCELED: 'Unfortunately, we had to cancel your appointment. Please contact us to reschedule.',
    RESCHEDULED: 'Your appointment has been rescheduled. Check your portal or reply to this email for details.'
  };

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's default testing address
      to: [booking.clientEmail],
      subject: subjects[type],
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e50914;">OLD SCHOOL INK</h1>
          <p>Hi ${booking.clientName},</p>
          <p>${messages[type]}</p>
          <p><strong>Appointment Date:</strong> ${new Date(booking.date).toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' })}</p>
          <br/>
          <p>Best regards,<br/>The Old School Ink Team</p>
        </div>
      `
    });
  } catch (err) {
    console.error('Failed to send client email', err);
  }
}
