const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const dialog = document.getElementById('registrationDialog');
const openButtons = document.querySelectorAll('[data-open-registration]');
const closeButton = document.getElementById('closeDialog');
const form = document.getElementById('registrationForm');
const result = document.getElementById('formResult');
const dateInput = document.getElementById('visitDate');

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

openButtons.forEach(button => button.addEventListener('click', () => {
  result.textContent = '';
  dialog.showModal();
}));
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.getElementById('patientName').value.trim();
  result.textContent = `Simulasi berhasil untuk ${name}. Belum ada pendaftaran nyata yang dikirim.`;
  form.reset();
  dateInput.min = localToday;
});

// Simulasi laporan masalah administrasi.
const adminDialog = document.getElementById('adminReportDialog');
const adminOpenButtons = document.querySelectorAll('[data-open-admin-report]');
const adminCloseButton = document.getElementById('closeAdminDialog');
const adminReportForm = document.getElementById('adminReportForm');
const adminReportResult = document.getElementById('adminReportResult');

adminOpenButtons.forEach(button => button.addEventListener('click', () => {
  adminReportResult.textContent = '';
  adminDialog.showModal();
}));
adminCloseButton.addEventListener('click', () => adminDialog.close());
adminDialog.addEventListener('click', event => {
  if (event.target === adminDialog) adminDialog.close();
});
adminReportForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!adminReportForm.reportValidity()) return;
  const reporter = document.getElementById('reporterName').value.trim();
  adminReportResult.textContent = `Laporan simulasi dari ${reporter} berhasil dibuat pada demo. Belum dikirim ke petugas.`;
  adminReportForm.reset();
});

// Contoh katalog buku. Data ini nantinya diganti dengan isi database Perpustakaan Desa.
const bookCatalog = [
  {level:'SD', title:'Ensiklopedia Sains Anak', subject:'Pengetahuan umum dan sains dasar', available:true},
  {level:'SD', title:'Kumpulan Cerita Nusantara', subject:'Literasi dan budaya Indonesia', available:true},
  {level:'SMP', title:'Matematika SMP: Konsep dan Latihan', subject:'Matematika', available:true},
  {level:'SMP', title:'IPA Terpadu untuk SMP', subject:'Ilmu pengetahuan alam', available:false},
  {level:'SMA', title:'Kimia Dasar SMA', subject:'Kimia dan latihan soal', available:true},
  {level:'SMA', title:'Persiapan UTBK: Penalaran dan Literasi', subject:'Persiapan seleksi perguruan tinggi', available:false},
  {level:'Kuliah', title:'Pengantar Pemrograman', subject:'Dasar algoritma dan pemrograman', available:true},
  {level:'Kuliah', title:'Metode Penelitian', subject:'Penulisan akademik dan penelitian', available:false},
  {level:'Umum', title:'Keterampilan Literasi Digital', subject:'Keamanan dan kecakapan digital', available:true},
  {level:'Umum', title:'Belajar Sepanjang Hayat', subject:'Pengembangan diri', available:false}
];
const learningForm = document.getElementById('learningForm');
const recommendationPanel = document.getElementById('recommendationPanel');
learningForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!learningForm.reportValidity()) return;
  const name = document.getElementById('studentName').value.trim();
  const level = document.getElementById('educationLevel').value;
  const matches = bookCatalog.filter(book => book.level === level);
  const cards = matches.map(book => `
    <article class="book-result">
      <h4>${book.title}</h4>
      <p>${book.subject}</p>
      <span class="book-status ${book.available ? '' : 'unavailable'}">${book.available ? 'Contoh: tersedia di perpustakaan' : 'Contoh: belum tersedia'}</span>
    </article>`).join('');
  recommendationPanel.innerHTML = `
    <span class="eyebrow">REKOMENDASI UNTUK ${escapeHTML(name).toUpperCase()}</span>
    <h3>Rekomendasi belajar jenjang ${escapeHTML(level)}</h3>
    <p>Berikut contoh buku yang sesuai. Status ketersediaan hanya data demo, bukan stok perpustakaan yang sebenarnya.</p>
    <div class="book-results">${cards}</div>`;
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}
