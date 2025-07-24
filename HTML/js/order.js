const prices = {
  "Palak Paneer": 180,
  "Aloo Gobi": 150,
  "Soya Chaap": 200,
  "Channa Masala": 170,
  "Paneer tikka": 190,
  "Paneer Butter Masala": 210,
  "Butter Chicken": 250,
  "Tandoori Chicken": 240,
  "Murgh Chicken Biryani": 230,
  "Chicken Seek Kebab": 220,
  "Mutton Curry": 270,
  "Momos": 80,
  "Vegetable Fried Rice": 140,
  "Spring Rolls": 130,
  "Drums of Heaven": 180,
  "Chilli Chicken": 160,
  "Chicken Manchurian Gravy": 190,
  "Tawa Roti": 20,
  "Garlic Naan": 30,
  "Jeera Rice": 80,
  "Gulab Jamun": 60,
};

document.getElementById('orderForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email.includes('@')) {
    alert('Please enter valid name and email.');
    return;
  }

  const selectedItems = Array.from(document.querySelectorAll('input[name="items"]:checked'));
  if (!selectedItems.length) {
    alert('Please select at least one item.');
    return;
  }

  const items = selectedItems.map(cb => cb.value);
  const total = items.reduce((sum, item) => sum + (prices[item] || 0), 0);

  // Store data in localStorage for payment page
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userItems', JSON.stringify(items));
  localStorage.setItem('userTotal', total);

  // Show receipt
  document.getElementById('rcptName').textContent = name;
  document.getElementById('rcptEmail').textContent = email;

  const tbody = document.getElementById('rcptItems');
  tbody.innerHTML = items.map((item, idx) =>
    `<tr><td>${idx + 1}</td><td>${item} - ₹${prices[item]}</td></tr>`
  ).join('');

  // Add total row
  tbody.innerHTML += `<tr><td colspan="2"><strong>Total: ₹${total}</strong></td></tr>`;

  // Show receipt section
  document.querySelector('.receipt-container').style.display = 'block';

  // Create Proceed to Payment button
  if (!document.getElementById('toPayment')) {
    const payBtn = document.createElement('button');
    payBtn.id = 'toPayment';
    payBtn.textContent = 'Proceed to Payment';
    payBtn.style.marginTop = '20px';
    payBtn.onclick = () => window.location.href = 'payment.html';
    document.querySelector('.receipt-container').appendChild(payBtn);
  }

  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
