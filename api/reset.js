export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  const resetCode = Math.floor(100000 + Math.random() * 900000);

  console.log(`Mengirim kode ${resetCode} ke email ${email}`);

  return res.status(200).json({ 
    success: true, 
    message: 'A temporary password will be sent to the email provided.' 
  });
}