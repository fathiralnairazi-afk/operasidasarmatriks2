# Website Matematika Matriks - Outline

## Struktur Website

### Halaman Utama (index.html)
- **Hero Section**: Visual matriks dengan animasi, judul "Mengenal Dunia Matriks"
- **Kalkulator Matriks Interaktif**: Tool untuk operasi dasar
- **Navigasi Cepat**: Menu ke halaman spesifik operasi
- **Preview Materi**: Gambaran umum semua operasi

### Halaman Operasi Dasar (basic-operations.html)
- **Penjumlahan Matriks**: Sifat dan contoh interaktif
- **Pengurangan Matriks**: Sifat dan contoh interaktif  
- **Perkalian dengan Skalar**: Sifat dan contoh interaktif
- **Latihan Soal**: Quiz interaktif untuk tiap operasi

### Halaman Operasi Lanjut (advanced-operations.html)
- **Perkalian Matriks**: Sifat, syarat, dan contoh
- **Transpose Matriks**: Definisi dan sifat-sifat
- **Determinan Matriks**: Metode perhitungan dan sifat
- **Invers Matriks**: Syarat existensi dan metode pencarian
- **Latihan Kompleks**: Soal kombinasi operasi

## Konten Matematika

### Sifat-Sifat Penjumlahan Matriks
- Komutatif: A + B = B + A
- Asosiatif: (A + B) + C = A + (B + C)
- Elemen identitas: A + O = A (O = matriks nol)
- Elemen invers: A + (-A) = O

### Sifat-Sifat Perkalian Skalar
- k(A + B) = kA + kB
- (k + m)A = kA + mA
- k(mA) = (km)A
- 1A = A

### Sifat-Sifat Perkalian Matriks
- Tidak komutatif: AB ≠ BA (umumnya)
- Asosiatif: (AB)C = A(BC)
- Distributif: A(B + C) = AB + AC
- Elemen identitas: AI = A (I = matriks identitas)

### Sifat-Sifat Transpose
- (A + B)ᵗ = Aᵗ + Bᵗ
- (kA)ᵗ = kAᵗ
- (AB)ᵗ = BᵗAᵗ
- (Aᵗ)ᵗ = A

### Sifat-Sifat Determinan
- det(AB) = det(A) × det(B)
- det(Aᵗ) = det(A)
- det(kA) = kⁿ det(A) (n = ordo matriks)
- Jika det(A) ≠ 0 → A punya invers

### Sifat-Sifat Invers
- (A⁻¹)⁻¹ = A
- (AB)⁻¹ = B⁻¹A⁻¹
- (Aᵗ)⁻¹ = (A⁻¹)ᵗ
- A⁻¹A = AA⁻¹ = I

## Fitur Interaktif

### Kalkulator Matriks
- Input matriks custom (2x2, 3x3, 4x4)
- Operasi real-time dengan visualisasi
- Step-by-step penyelesaian

### Visualisasi Animasi
- Efek perpindahan elemen saat operasi
- Warna berbeda untuk setiap operasi
- Transisi smooth antar state

### Quiz Interaktif
- Soal acak dengan tingkat kesulitan bervariasi
- Feedback langsung
- Penjelasan step-by-step

### Cheat Sheet
- Tabel sifat-sifat lengkap
- Downloadable PDF guide
- Quick reference cards

## Teknis Implementation

### Library yang Digunakan
- Anime.js untuk animasi
- ECharts.js untuk visualisasi data
- p5.js untuk grafik interaktif
- Splide.js untuk carousel materi

### Desain Visual
- Warm earth tone color palette
- Typography: Serif untuk judul, Sans-serif untuk konten
- Grid layout yang responsive
- Dark mode support

### Interaktivitas
- Hover effects pada elemen matriks
- Smooth scroll navigation
- Progressive disclosure untuk materi
- Mobile-friendly interface