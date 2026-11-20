/**
 * Memformat nomor telepon Indonesia agar selalu kompatibel dengan WhatsApp (wa.me)
 * Mengubah awalan seperti:
 * - 085896611944 -> 6285896611944
 * - 0858-9661-1944 -> 6285896611944
 * - +62 858-9661-1944 -> 6285896611944
 * - 85896611944 -> 6285896611944
 * - 6285896611944 -> 6285896611944
 */
export const formatWhatsAppNumber = (phone) => {
  if (!phone) return '';
  // Hanya ambil karakter angka
  let cleaned = String(phone).replace(/\D/g, '');
  if (!cleaned) return '';

  // Jika diawali 0, gantikan 0 pertama dengan 62 (contoh: 0858... -> 62858...)
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  // Jika pengguna langsung mengetik mulai angka 8 (misal 858...), tambahkan 62 di depannya
  else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  // Jika belum ada awalan 62 dan panjangnya wajar untuk nomor HP
  else if (!cleaned.startsWith('62') && cleaned.length >= 6) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
};

/**
 * Menghasilkan URL langsung ke WhatsApp yang aman di semua perangkat (Desktop / Android / iOS)
 */
export const getWhatsAppLink = (phone, text = '') => {
  const formatted = formatWhatsAppNumber(phone);
  if (!formatted) return '#';
  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${formatted}${encodedText}`;
};
