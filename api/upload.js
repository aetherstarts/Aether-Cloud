import { put } from '@vercel/blob';

export default async function handler(request, response) {
  // Hanya izinkan metode POST untuk upload
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mengambil nama file yang sudah kita acak di index.html
    const filename = request.headers['x-filename'];
    const fileContent = request.body;

    // Simpan ke Vercel Blob yang sudah 'Connected'
    const blob = await put(filename, fileContent, {
      access: 'public',
      contentType: request.headers['content-type']
    });

    // Kirim balik URL file asli ke index.html
    return response.status(200).json({ url: blob.url });
  } catch (error) {
    // Jika ada masalah koneksi storage
    return response.status(500).json({ error: "Gagal menyimpan ke storage: " + error.message });
  }
}
