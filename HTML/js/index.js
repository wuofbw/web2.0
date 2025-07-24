// ✨ Animate on Scroll
const animatedElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));

// Hero text fade-in
window.addEventListener('load', () => {
  document.querySelector('.overlay-text').style.opacity = '1';
});

// 👤 Google Sign-In
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  document.getElementById('profile-icon').src = data.picture;
  document.getElementById('profile-name').textContent = data.name;
  document.getElementById('profile-email').textContent = data.email;

  localStorage.setItem('profilePicture', data.picture);
  localStorage.setItem('profileName', data.name);
  localStorage.setItem('profileEmail', data.email);
}

// Profile dropdown toggle
function toggleProfile() {
  const dropdown = document.getElementById('profile-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Hide dropdown when clicking outside
window.onclick = function (event) {
  if (!event.target.matches('.profile-icon')) {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.style.display = 'none';
  }
};

// Load profile info from localStorage
window.onload = function () {
  const pic = localStorage.getItem('profilePicture');
  const name = localStorage.getItem('profileName');
  const email = localStorage.getItem('profileEmail');

  if (pic) document.getElementById('profile-icon').src = pic;
  if (name) document.getElementById('profile-name').textContent = name;
  if (email) document.getElementById('profile-email').textContent = email;
};
