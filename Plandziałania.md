# Plan Działania (Roadmap) - Frontend r0sita

Ten dokument stanowi kompleksowy plan rozwoju frontendu projektu r0sita. Zadania zostały podzielone na logiczne fazy, zaczynając od spłaty długu technologicznego, poprzez integrację backendu, aż po nowe funkcjonalności i compliance.

Każdy punkt poniżej jest sformatowany jako gotowy **GitHub Issue**.

---

## Faza 1: Refaktoryzacja i Fundamenty (Code Review Fixes)
*Priorytet: Krytyczny. Nie budujemy nowych funkcji na bałaganie.*

### Issue 1: Centralizacja warstwy API i Typów
**Tytuł:** [Refactor] Centralizacja komunikacji z API i definicji Typów (SusaAPI)
**Opis:**
Aktualnie w kodzie panuje chaos: `fetch` jest wywoływany ręcznie w komponentach i hookach, a typy są duplikowane.
**Zadania:**
- [ ] Przenieść wszystkie wywołania sieciowe z `useSusaProjects.ts` i `ProjectContext.tsx` do `services/susaApi.ts`.
- [ ] Ujednolicić konfigurację URL (wybór między Proxy Next.js a bezpośrednim strzałem do API).
- [ ] Utworzyć jeden plik `types/index.ts` (lub `types/domain.ts`) i usunąć lokalne definicje interfejsów (np. `Project` vs `SusaProject`).
- [ ] Usunąć zduplikowany stan (decydować: albo Context, albo Hook, albo React Query).

### Issue 2: Cleanup Codebase & Optimization
**Tytuł:** [Cleanup] Usunięcie martwego kodu i optymalizacja assets
**Opis:**
Kod zawiera nieużywane fragmenty oraz nieoptymalne media.
**Zadania:**
- [ ] Usunięcie martwego kodu (np. `viewerRef` w `MainContent.tsx`).
- [ ] Wydzielenie dużych inline SVG do osobnych komponentów (`src/components/ui/icons/*`).
- [ ] Optymalizacja wideo na stronie głównej (dodanie `poster` image, kompresja lub lazy loading), aby nie zabijało transferu mobilnego.

---

## Faza 2: Integracja Backendu i Dashboard
*Cel: Pełna funkcjonalność operacyjna.*

### Issue 3: Pełna Integracja Backend SUSA
**Tytuł:** [Feat] Pełna integracja metod backendowych SUSA
**Opis:**
Zapewnienie, że wszystkie końcówki API działają poprawnie z frontendem.
**Zadania:**
- [ ] Weryfikacja uploadu plików.
- [ ] Weryfikacja procesu analizy (Start/Stop/Status).
- [ ] Poprawa obsługi SignalR (usunięcie hacków z `useRef` na rzecz poprawnej obsługi stanu).
- [ ] Obsługa błędów API (wyświetlanie czytelnych komunikatów w `useNotifications`).

### Issue 4: Dashboard Użytkownika
**Tytuł:** [Feat] Implementacja Dashboardu Użytkownika
**Opis:**
Stworzenie centralnego miejsca, gdzie użytkownik widzi swoje statystyki i projekty.
**Zadania:**
- [ ] Sekcja "Ostatnie Projekty" (lista/kafelki).
- [ ] Wykresy KPI (wykorzystanie biblioteki wykresów z `package.json`).
- [ ] Statusy zadań w czasie rzeczywistym.

---

## Faza 3: Nowe Moduły i Strony
*Cel: Rozbudowa architektury informacji.*

### Issue 5: Panel Administratora
**Tytuł:** [Feat] Panel Administratora (Backoffice)
**Opis:**
Panel dostępny tylko dla roli `Admin` do zarządzania systemem.
**Zadania:**
- [ ] Tabela użytkowników (widok listy, blokowanie, edycja ról).
- [ ] Logi systemowe (podgląd co dzieje się w systemie).
- [ ] Zarządzanie globalnymi ustawieniami aplikacji.
- [ ] Guard (zabezpieczenie routingu) dla `/admin`.

### Issue 6: Strona Workshop
**Tytuł:** [Feat] Nowa podstrona: Workshop
**Opis:**
Strona dedykowana warsztatom/szkoleniom.
**Zadania:**
- [ ] Layout strony Workshop.
- [ ] Lista dostępnych warsztatów (pobierana z API lub CMS).
- [ ] Formularz zapisu na warsztat.

### Issue 7: Strona MyWorkBench
**Tytuł:** [Feat] Nowa podstrona: MyWorkBench
**Opis:**
Przestrzeń robocza użytkownika (możliwe rozszerzenie SUSA).
**Zadania:**
- [ ] Implementacja interfejsu roboczego.
- [ ] Integracja z narzędziami edycji/symulacji.

### Issue 8: Strona Learn
**Tytuł:** [Feat] Nowa podstrona: Learn (Baza Wiedzy)
**Opis:**
Centrum edukacyjne dla użytkowników.
**Zadania:**
- [ ] Sekcja z tutorialami (wideo/tekst).
- [ ] FAQ.
- [ ] Dokumentacja techniczna.

---

## Faza 4: UI/UX i Internacjonalizacja
*Cel: Dostępność i profesjonalny wygląd.*

### Issue 9: Internacjonalizacja (i18n)
**Tytuł:** [Feat] Wdrożenie zmiany języka (DE/EN)
**Opis:**
Aplikacja musi obsługiwać język Niemiecki i Angielski.
**Zadania:**
- [ ] Instalacja i konfiguracja biblioteki (rekomendowane `next-intl`).
- [ ] Ekstrakcja wszystkich stringów do plików JSON (`en.json`, `de.json`).
- [ ] Dodanie przełącznika języka (Language Switcher) w Navbarze.
- [ ] Zapewnienie, że URL zmienia się zależnie od języka (np. `/en/dashboard`, `/de/dashboard`).

### Issue 10: Responsywność (Mobile First)
**Tytuł:** [UI] Poprawki RWD i optymalizacja mobilna
**Opis:**
Aplikacja musi wyglądać idealnie na telefonach i tabletach.
**Zadania:**
- [ ] Audyt Navbaru na mobile (Hamburger menu).
- [ ] Dostosowanie tabel (np. poziomy scroll lub widok kart na mobile).
- [ ] Sprawdzenie wielkości czcionek i przycisków (dotyk).
- [ ] Testowanie na rozdzielczościach od 320px wzwyż.

---

## Faza 5: Legal & Compliance
*Cel: Zgodność z prawem UE.*

### Issue 11: Cookie Consent (EU ePrivacy)
**Tytuł:** [Legal] Baner Cookies zgodny z dyrektywą UE
**Opis:**
Implementacja mechanizmu zgody na pliki cookies.
**Zadania:**
- [ ] Modal/Baner z opcjami: Niezbędne, Analityczne, Marketingowe.
- [ ] Blokowanie skryptów (np. Google Analytics) przed wyrażeniem zgody.
- [ ] Zapisywanie preferencji użytkownika.

### Issue 12: Strony Prawne (Imprint, Data Policy, Contact)
**Tytuł:** [Legal] Dodanie stron prawnych: Kontakt, Impressum, Polityka Prywatności
**Opis:**
Wymagane prawem podstrony informacyjne.
**Zadania:**
- [ ] Strona `/contact` z formularzem kontaktowym.
- [ ] Strona `/imprint` (Impressum - wymagane w DACH).
- [ ] Strona `/privacy-policy` (Data Policy / Datenschutz).
- [ ] Linkowanie tych stron w Footerze.
