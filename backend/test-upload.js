const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function testUpload() {
  try {
    // 1. Sign up a fake user
    const email = `test_${Date.now()}@test.com`;
    await axios.post('http://localhost:8000/api/v1/auth/signUp', {
      name: 'TestUser',
      email: email,
      password: 'password'
    });

    // 2. Sign in to get token
    const loginRes = await axios.post('http://localhost:8000/api/v1/auth/signIn', {
      email,
      password: 'password'
    });
    const token = loginRes.data.token;

    // 3. Create dummy PDF
    fs.writeFileSync('dummy.pdf', '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Test Resume) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000219 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n314\n%%EOF');

    // 4. Upload
    const formData = new FormData();
    formData.append('resume', fs.createReadStream('dummy.pdf'));

    const uploadRes = await axios.post('http://localhost:8000/api/v1/documents/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Success:", uploadRes.data);
  } catch (err) {
    if (err.response) {
      console.error("API Error:", err.response.status, err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

testUpload();
