document.addEventListener('DOMContentLoaded', () => {
  const methodRadios = document.querySelectorAll('input[name="method"]');
  const cardForm = document.getElementById('cardForm');
  const upiForm = document.getElementById('upiForm');
  const bankSelect = document.getElementById('bankSelect');
  const otpSection = document.getElementById('otpSection');
  const confirmation = document.getElementById('confirmation');
  const form = document.getElementById('paymentForm');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const verifyOtpBtn = document.getElementById('verifyOtp');
  const otpInput = document.getElementById('otp');
  const emailDisplay = document.getElementById('emailDisplay');
  let generatedOtp = '';

  // Show saved email
  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail) {
    emailDisplay.textContent = `OTP will be sent to: ${savedEmail}`;
  } else {
    emailDisplay.textContent = '⚠️ No email found. Please go back and fill the order form.';
  }

  // Handle payment method selection
  methodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const method = document.querySelector('input[name="method"]:checked')?.value;
      cardForm.classList.add('hidden');
      upiForm.classList.add('hidden');
      bankSelect.classList.add('hidden');
      otpSection.classList.add('hidden');
      confirmation.classList.add('hidden');

      if (method === 'Credit Card') cardForm.classList.remove('hidden');
      if (method === 'UPI') upiForm.classList.remove('hidden');
      if (method === 'Net Banking') bankSelect.classList.remove('hidden');
    });
  });

  // Handle form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const method = document.querySelector('input[name="method"]:checked')?.value;
    if (!method) return alert('Please select a payment method.');

    let isValid = false;

    if (method === 'Credit Card') {
      const fields = ['cardNumber', 'cardName', 'expiry', 'cvv'];
      isValid = fields.every(id => document.getElementById(id).value.trim());
      if (!isValid) return alert('Please fill all card fields.');
    }

    if (method === 'UPI') {
      const upiId = document.getElementById('upiId').value.trim();
      isValid = upiId && upiId.includes('@');
      if (!isValid) return alert('Enter a valid UPI ID.');
    }

    if (method === 'Net Banking') {
      const bank = document.getElementById('bank').value;
      isValid = !!bank;
      if (!isValid) return alert('Please select a bank.');
    }

    if (method === 'Cash') {
      confirmation.classList.remove('hidden');
      form.classList.add('hidden');
      return;
    }

    if (isValid) {
      sendOtpBtn.classList.remove('hidden');
      otpSection.classList.remove('hidden');
    }
  });

  // Dummy OTP sending
  sendOtpBtn.addEventListener('click', () => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      alert('No email found. Please place an order first.');
      return;
    }

    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`Dummy OTP sent to ${email} (Not really): ${generatedOtp}`);
    console.log(`Generated OTP: ${generatedOtp}`); // For developer only
  });

  // Dummy OTP verification
verifyOtpBtn.addEventListener('click', () => {
  if (otpInput.value === generatedOtp) {
    otpSection.classList.add('hidden');
    confirmation.classList.remove('hidden');
    form.classList.add('hidden');
    sendOtpBtn.classList.add('hidden'); // ✅ Hide "Send OTP" button
    localStorage.removeItem('userEmail');
  } else {
    alert('❌ Invalid OTP. Try again.');
  }
});

});
