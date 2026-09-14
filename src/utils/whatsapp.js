export const DEFAULT_WHATSAPP_NUMBER = "233555686858"; // Ghanaian International Format (0555686858)
export const DEFAULT_PHONE_DISPLAY = "+233 55 568 6858";
export const SECONDARY_PHONE_DISPLAY = "+233 55 881 7219";

/**
 * Builds a direct wa.me link with encoded pre-filled text
 */
export function buildWhatsAppUrl(phone = DEFAULT_WHATSAPP_NUMBER, message = "") {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Generates a comprehensive pre-filled vehicle booking inquiry message incorporating all form fields
 */
export function generateCarBookingMessage({
  carName = "",
  travelScope = "Inside Accra",
  pickupDate = "",
  returnDate = "",
  customerName = "",
  phone = "",
  email = "",
  notes = "",
  estimatedRate = ""
}) {
  let msg = `Hello Legacy Vehicle Hub! 👋\n\nI would like to place a vehicle rental reservation request:`;

  if (customerName) {
    msg += `\n👤 *Full Name:* ${customerName}`;
  }
  if (phone) {
    msg += `\n📞 *Contact Phone/WhatsApp:* ${phone}`;
  }
  if (email) {
    msg += `\n✉️ *Email Address:* ${email}`;
  }
  if (carName) {
    msg += `\n🚗 *Selected Vehicle:* ${carName}`;
  }
  if (travelScope) {
    msg += `\n📍 *Travel Scope:* ${travelScope}`;
  }
  if (estimatedRate) {
    msg += `\n💰 *Estimated Daily Rate:* ${estimatedRate}`;
  }
  if (pickupDate) {
    msg += `\n📅 *Pickup Date:* ${pickupDate}`;
  }
  if (returnDate) {
    msg += `\n📅 *Return Date:* ${returnDate}`;
  }
  if (notes) {
    msg += `\n📝 *Special Notes / Instructions:* ${notes}`;
  }

  msg += `\n\nPlease confirm availability and booking terms. Thank you!`;

  return msg;
}

/**
 * Generates a quick inquiry message for general customer support
 */
export function generateGeneralInquiryMessage() {
  return "Hello Legacy Vehicle Hub! 👋 I would like to inquire about your vehicle rental & chauffeur services in Ghana.";
}
