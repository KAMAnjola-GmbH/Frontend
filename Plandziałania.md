# Plan Działania (Roadmap) - Frontend r0sita

Ten dokument stanowi kompleksowy plan rozwoju frontendu projektu r0sita. Zadania zostały podzielone na logiczne fazy, zaczynając od spłaty długu technologicznego, poprzez integrację backendu, aż po nowe funkcjonalności i compliance.

Każdy punkt poniżej jest sformatowany jako gotowy **GitHub Issue**.

---


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

### Issue 12: Zaktualizowanie Strony Prawne (Contact)
**Tytuł:** [Legal] Dodanie stron prawnych: Kontakt
**Opis:**
Wymagane prawem podstrony informacyjne.
**Zadania:**
- [ ] Strona `/contact` z formularzem kontaktowym wymaga backend arhitektury do wysyłania formularzy.

