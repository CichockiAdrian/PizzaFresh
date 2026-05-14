# 🍕 PizzaFresh

Aplikacja mobilna do zamawiania pizzy z śledzeniem dostawy w czasie rzeczywistym na mapie. Zbudowana w React Native (Expo) z backendem na Supabase.

## ✨ Funkcje

### 👤 Klient
- 📋 **Dashboard** — przeglądanie menu i dostępnych pizz
- 🛒 **Koszyk** — zarządzanie zamowieniem przed finalizacją
- 💳 **Checkout** — podsumowanie i złożenie zamówienia
- ✅ **Potwierdzenie** — ekran sukcesu po złożeniu zamówienia
- 🗺️ **Mapa** — śledzenie dostawy w czasie rzeczywistym z lokalizacją kierowcy
- ⚙️ **Ustawienia** — zarządzanie kontem i preferencjami

### 🚚 Kierowca
- 🚦 **Panel kierowcy** — lista aktywnych dostaw do obsługi
- 🗺️ **Mapa admina** — widok wszystkich aktywnych dostaw i kierowców

## 🛠️ Tech stack

| Warstwa | Technologia |
|---|---|
| Framework | React Native 0.76 + Expo 52 |
| Nawigacja | Expo Router 4 (file-based) |
| Backend / DB | Supabase (PostgreSQL + Realtime) |
| Mapa | react-native-maps |
| Lokalizacja | expo-location |
| Auth / storage | expo-secure-store |
| Język | TypeScript |
| Animacje | react-native-reanimated |

## 🚀 Uruchomienie

```bash
npm install
npx expo start
```

Następnie otwórz apkę na:
- **iOS** — naciśnij `i`
- **Android** — naciśnij `a`
- **Expo Go** — zeskanuj QR kod

## ⚙️ Konfiguracja Supabase

1. Utwórz projekt na [supabase.com](https://supabase.com)
2. Skopiuj `SUPABASE_URL` i `SUPABASE_ANON_KEY`
3. Dodaj je do pliku konfiguracyjnego (np. `src/lib/supabase.ts`)

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

## 📁 Struktura projektu

```
app/
  (tabs)/         # Dolna nawigacja tabów
  pizza/          # Ekrany szczegółów pizzy
  cart.tsx        # Koszyk
  checkout.tsx    # Finalizacja zamówienia
  confirmation.tsx # Potwierdzenie zamówienia
  dashboard.tsx   # Strona główna / menu
  drivers.tsx     # Panel kierowcy
  map.tsx         # Mapa śledzenia dostawy
  map_admin.tsx   # Mapa admina
  settings.tsx    # Ustawienia
assets/           # Obrazki, ikony
src/              # Logika biznesowa, helpery, konfiguracja Supabase
```

## 📞 Role użytkowników

- **Klient** — składa zamówienia i śledzi dostawę na mapie
- **Kierowca** — widzi przypisane zamówienia i aktualizuje status dostawy
- **Admin** — widzi wszystkich kierowców i zamówienia na mapie

---

Made by [@CichockiAdrian](https://github.com/CichockiAdrian)
