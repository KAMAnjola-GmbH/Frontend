# Plan Działania (Roadmap) - Frontend r0sita

Ten dokument stanowi kompleksowy plan rozwoju frontendu projektu r0sita. Zadania zostały podzielone na logiczne fazy, zaczynając od spłaty długu technologicznego, poprzez integrację backendu, aż po nowe funkcjonalności i compliance.

Każdy punkt poniżej jest sformatowany jako gotowy **GitHub Issue**.

---


### Issue 4: Dashboard Użytkownika ✅ DONE
**Tytuł:** [Feat] Implementacja Dashboardu Użytkownika
**Opis:**
Stworzenie centralnego miejsca, gdzie użytkownik widzi swoje statystyki i projekty.
**Zadania:**
- [x] Sekcja "Ostatnie Projekty" (lista/kafelki) - RecentActivity.tsx
- [x] Wykresy KPI (wykorzystanie biblioteki wykresów z `package.json`) - BusinessKpis.tsx
- [x] Statusy zadań w czasie rzeczywistym - ProductCards.tsx z liczbą projektów
**Pliki:**
- dashboard/page.tsx
- components/dashboard/* (BusinessKpis, ProductCards, RecentActivity, SubscriptionCard, QuickActions)
- hooks/useDashboard.ts

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

### Issue 7: Strona MyWorkBench ✅ DONE
**Tytuł:** [Feat] Nowa podstrona: MyWorkBench
**Opis:**
Przestrzeń robocza użytkownika (możliwe rozszerzenie SUSA).
**Zadania:**
- [x] Implementacja interfejsu roboczego - Dashboard jako MyWorkbench
- [x] Integracja z narzędziami edycji/symulacji - QuickActions linkuje do SuSa/Viewer
**Uwaga:** MyWorkbench = Dashboard - centralne miejsce z dostępem do wszystkich narzędzi

### Issue 8: Strona Learn ✅ DONE
**Tytuł:** [Feat] Nowa podstrona: Learn (Baza Wiedzy)
**Opis:**
Centrum edukacyjne dla użytkowników.
**Zadania:**
- [x] Sekcja z tutorialami (wideo/tekst) - informacyjne karty z tutorials
- [x] FAQ - accordion z 6 pytaniami
- [x] Dokumentacja techniczna - sekcja "coming soon"
**Pliki:**
- [locale]/learn/page.tsx
- messages/en.json (learn.*)
- messages/de.json (learn.*)

---

## Faza 4: UI/UX i Internacjonalizacja
*Cel: Dostępność i profesjonalny wygląd.*


### Issue 10: Responsywność (Mobile First) ✅ DONE
**Tytuł:** [UI] Poprawki RWD i optymalizacja mobilna
**Opis:**
Aplikacja musi wyglądać idealnie na telefonach i tabletach.
**Zadania:**
- [x] Audyt Navbaru na mobile (Hamburger menu) - Dodano MobileMenu.tsx z drawer
- [x] Dostosowanie tabel (np. poziomy scroll lub widok kart na mobile) - overflow-auto w KpiTable
- [x] Sprawdzenie wielkości czcionek i przycisków (dotyk) - responsive text classes
- [x] SuSa/Viewer layout - sidebar jako drawer na mobile z floating button
**Pliki:**
- MobileMenu.tsx (nowy)
- Navbar.tsx (hidden lg:block dla desktop nav)
- SuSa layout.tsx (responsive sidebar drawer)
- Viewer layout.tsx (responsive sidebar drawer)
- AnalysisReport.tsx (flex-col sm:flex-row dla header)

---

## Faza 5: Legal & Compliance
*Cel: Zgodność z prawem UE.*

### Issue 11: Cookie Consent (EU ePrivacy) ✅ DONE
**Tytuł:** [Legal] Baner Cookies zgodny z dyrektywą UE
**Opis:**
Implementacja mechanizmu zgody na pliki cookies.
**Zadania:**
- [x] Modal/Baner z opcjami: Niezbędne, Analityczne, Marketingowe - CookieConsentBanner.tsx
- [x] Blokowanie skryptów (np. Google Analytics) przed wyrażeniem zgody - context controls this
- [x] Zapisywanie preferencji użytkownika - CookieConsentContext.tsx
**Pliki:**
- CookieConsentBanner.tsx
- CookieConsentContext.tsx
- Footer.tsx (resetConsent button)

### Issue 12: Zaktualizowanie Strony Prawne (Contact)
**Tytuł:** [Legal] Dodanie stron prawnych: Kontakt
**Opis:**
Wymagane prawem podstrony informacyjne.
**Zadania:**
- [ ] Strona `/contact` z formularzem kontaktowym wymaga backend arhitektury do wysyłania formularzy.

