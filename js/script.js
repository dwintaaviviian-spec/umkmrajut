 // js index.html
// intro
document.addEventListener("DOMContentLoaded", function () {
  const text = "Selamat Datang (˶ˆᗜˆ˵)⟢";
  const introText = document.getElementById("introText");
  const overlay = document.getElementById("introOverlay");

  let index = 0;
  introText.textContent = "";

  function type() {
    if (index < text.length) {
      introText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 90); // kecepatan ketik
    }
  }

  type();
introText.style.borderRight = "none";

  setTimeout(() => {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    setTimeout(() => overlay.style.display = "none", 800);
  }, 4500);
});


    // simple enhancement: smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block: 'start'});
        }
      });
    });
     
    // notifikasi beli
    const buttons = document.querySelectorAll('.btn-beli');
  const overlay = document.getElementById('notifOverlay');
  const notifText = document.getElementById('notifText');
  const notifSound = document.getElementById('notifSound');


  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const produk = btn.dataset.produk;

      notifText.innerHTML = `
        <strong>Berhasil 🎉</strong><br>
        Pesanan <b>${produk}</b> berhasil ditambahkan
      `;

      overlay.style.display = 'flex';
      notifSound.currentTime = 0;
notifSound.play();


      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
          overlay.style.opacity = '1';
        }, 400);
      }, 2500);
    });
  });

 // js tentang.html
   // Modal ringkasan
    $('#showModalBtn').on('click', function () {
      var modal = new bootstrap.Modal(document.getElementById('produkModal'));
      modal.show();
    });

    // Hover list highlight
    $('#produkList li')
      .on('mouseenter', function () { $(this).addClass('li-hover'); })
      .on('mouseleave', function () { $(this).removeClass('li-hover'); });

       // js produk.html
    // Data testimoni (tetap seperti sebelumnya)
    const testimonis = [
      { nama: "Aldila✮", teks: "Tas rajutnya bagus banget!" },
      { nama: "Mutia✮", teks: "Boneka rajutnya lucu dan lembut!" },
      { nama: "Anis✮", teks: "Syalnya nyaman dipakai!" },
      { nama: "Abil✮", teks: "Topi rajutnya elastis dan keren." },
      { nama: "Vivian✮", teks: "Dompet rajutnya simpel tapi cantik!" }
    ];

    // 1) jQuery Event: buat kartu testimoni dari array (perulangan)
    $(function(){
      const $list = $('#testimoni-list');
      testimonis.forEach(t => {
        const $card = $('<div>').addClass('p-3 bg-white rounded shadow-sm').css({width:'230px'});
        $card.append(`<strong>${t.nama}</strong>`);
        $card.append(`<p class="mb-0 mt-2">${t.teks}</p>`);
        $list.append($card);
      });
    });

    // 2) jQuery Event: hover gambar di tabel beri efek (delegation)
    $(document).on('mouseenter', 'table img', function(){
      $(this).addClass('product-img hover');
    }).on('mouseleave', 'table img', function(){
      $(this).removeClass('hover');
    });

    // 3) jQuery Event: klik gambar buka modal detail
    $(document).on('click', 'table img', function(){
      const alt = $(this).attr('alt') || 'Produk';
      const src = $(this).attr('src') || '';
      const desc = $(this).closest('tr').find('td').eq(5).text() || '';
      $('#detailTitle').text(alt);
      $('#detailBody').html(`<img src="${src}" alt="${alt}" style="width:100%; border-radius:6px; margin-bottom:10px;"><p>${desc}</p>`);
      const modal = new bootstrap.Modal(document.getElementById('detailModal'));
      modal.show();
    });

    // fungsi cek usia (tetap, juga bisa dipanggil via tombol)
    $('#cekUsiaBtn').on('click', function(e){
  e.preventDefault();

  const usia = parseInt($('#usia').val(), 10);
  const $hasil = $('#hasilUsia');

  // 1️⃣ cek kosong / bukan angka
  if (isNaN(usia)) {
    $hasil.text('Masukkan angka usia yang valid!');
    return;
  }

  // 2️⃣ cek rentang masuk akal
  if (usia < 0 || usia > 120) {
    $hasil.text('Usia tidak masuk akal!');
    return;
  }

  // 3️⃣ klasifikasi usia
  if (usia < 13) {
    $hasil.text('Kategori: Anak-anak');
  } else if (usia <= 17) {
    $hasil.text('Kategori: Remaja');
  } else if (usia <= 60) {
    $hasil.text('Kategori: Dewasa');
  } else {
    $hasil.text('Kategori: Lansia');
  }
});

    // form pemesanan: validasi dan hitung total, tampil alert bootstrap
    $('#orderForm').on('submit', function(e){
      e.preventDefault();
      const nama = $.trim($('#namaProduk').val());
      const harga = parseFloat($('#hargaProduk').val());
      const jumlah = parseInt($('#jumlahProduk').val());
      const $alert = $('#formAlert');
      if(!nama || isNaN(harga) || isNaN(jumlah) || harga <= 0 || jumlah <= 0){
        $alert.removeClass('d-none alert-success').addClass('alert-danger').text('Isi semua kolom dengan benar.');
        $('#totalBelanja').text('');
        return;
      }
      const total = harga * jumlah;
      $alert.removeClass('d-none alert-danger').addClass('alert-success').text('Perhitungan berhasil.');
      $('#totalBelanja').text('Total Belanja: Rp ' + total.toLocaleString('id-ID'));
      // reset form optional
      // this.reset();
    });

    // smooth scroll untuk anchor internal (jika ada)
    $('a[href^="#"]').on('click', function(e){
      const target = $($(this).attr('href'));
      if(target.length){ e.preventDefault(); $('html,body').animate({scrollTop: target.offset().top - 60}, 350); }
    });

// js galeri.html
    $(function(){

      // klik buka modal detail
      $('#gallery').on('click', '.produk-item', function(){
        const title = $(this).data('title') || '';
        const desc  = $(this).data('desc') || '';
        const src   = $(this).data('src') || $(this).find('img').attr('src');
        $('#modalTitle').text(title);
        $('#modalDesc').text(desc);
        $('#modalImg').attr('src', src).attr('alt', title);
        const modal = new bootstrap.Modal(document.getElementById('imgModal'));
        modal.show();
      });

      // keyboard: Esc tutup modal
      $(document).on('keydown', function(e){
        if(e.key === "Escape"){
          const m = bootstrap.Modal.getInstance(document.getElementById('imgModal'));
          if(m) m.hide();
        }
      });
    });

  // ============================================
  // js kontak.html
  // ============================================


    (function($){

  const $form = $('#formKontak');
  const $nama = $('#nama');
  const $email = $('#email');
  const $hp = $('#hp');
  const $kategori = $('#kategori');
  const $pesan = $('#pesan');
  const $feedback = $('#feedback');
  const $clear = $('#clearBtn');
  const notifSound = document.getElementById('notifSound');

  function validHP(val){
    return /^[0-9]{9,15}$/.test(val.trim());
  }

  // ============================================
  // VALIDASI NAMA
  // ============================================
  $nama.on('input', function(){
    const v = $(this).val().trim();
    if(v.length < 3){
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(this).next('.invalid-feedback').text('Nama harus minimal 3 karakter.');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
    }
  });

  // ============================================
  // VALIDASI EMAIL
  // ============================================
  $email.on('input', function(){
    const v = $(this).val().trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    if(!isEmail){
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(this).next('.invalid-feedback').text('Format email gunakan .@');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
    }
  });

  // ============================================
  // VALIDASI HP
  // ============================================
  $hp.on('input', function(){
    const v = $(this).val();

    if(!v){
      $hp.removeClass('is-invalid is-valid');
      $hp.next('.invalid-feedback').text('');
      return;
    }

    if(!/^[0-9]*$/.test(v)){
      $hp.addClass('is-invalid').removeClass('is-valid');
      $hp.next('.invalid-feedback').text('Gunakan angka saja.');
    }
    else if(!validHP(v)){
      $hp.addClass('is-invalid').removeClass('is-valid');
      $hp.next('.invalid-feedback').text('Nomor HP harus 9–15 digit.');
    }
    else{
      $hp.addClass('is-valid').removeClass('is-invalid');
    }
  });



// ============================================
// NOTIFIKASI + SUARA SAAT CEKLIST LANGGANAN
// ============================================
$('#langganan').on('change', function(){
  if(this.checked){
    $feedback
      .text('Terima kasih sudah bergabung 💖 Promo & katalog terbaru segera kami kirimkan.')
      .fadeIn(300);

    notifSound.currentTime = 0;
    notifSound.play();

    setTimeout(() => {
      $feedback.fadeOut(600);
    }, 3000);
  }
});

  // ============================================
  // SUBMIT FORM
  // ============================================
  $form.on('submit', function(e){
    e.preventDefault();

    let valid = true;

    // cek ulang semua input
    if($nama.val().trim().length < 3){
      $nama.addClass('is-invalid');
      $nama.next('.invalid-feedback').text('Nama minimal 3 karakter.');
      valid = false;
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($email.val().trim())){
      $email.addClass('is-invalid');
      $email.next('.invalid-feedback').text('Email gunakan @.');
      valid = false;
    }

    if(!validHP($hp.val())){
      $hp.addClass('is-invalid');
      $hp.next('.invalid-feedback').text('Nomor HP tidak valid.');
      valid = false;
    }


    if(!valid) return;

    
    // ==== NOTIFIKASI FLOATING DI TENGAH ====
    $feedback
      .text('Terima kasih! Pesan Anda berhasil dikirim.')
      .fadeIn(300);
      notifSound.currentTime = 0;
notifSound.play();

    setTimeout(() => {
      $feedback.fadeOut(600);
    }, 3500);
    $form[0].reset();
    $('input, textarea, select').removeClass('is-valid is-invalid');
    setTimeout(()=> $feedback.fadeOut(600), 4000);
  });

  // tombol clear
  $clear.on('click', function(){
    $form[0].reset();
    $('input, textarea, select').removeClass('is-valid is-invalid');
    $('.invalid-feedback').text('');
    $feedback.hide();
  });

})(jQuery);
