# Plan: User Dashboard - r0sita Platform

## Wizja platformy
> "Unsere Plattform bringt Ihre physischen Anlagen in die digitale Welt und ermöglicht Echtzeitüberwachung, vorausschauende KI-Analysen und fortschrittliche Simulationen für Wirtschaftlichkeit Ihrer Geschäftsprozesse."

**Kluczowe filary:**
1. **Digitalizacja** - przenoszenie fizycznych zasobów do świata cyfrowego
2. **Echtzeitüberwachung** - monitoring w czasie rzeczywistym
3. **KI-Analysen** - predykcyjne analizy AI
4. **Simulationen** - symulacje procesów
5. **Wirtschaftlichkeit** - ekonomiczność i optymalizacja biznesowa

---

## Produkty platformy (obecne i przyszłe)

| Produkt | Filar | Status |
|---------|-------|--------|
| **SuSa Analytics** | KI-Analysen, Wirtschaftlichkeit | ✅ Gotowy |
| **3D Model Viewer** | Digitalisierung, Simulationen | ✅ Gotowy |
| **Real-time Monitoring** | Echtzeitüberwachung | 🔜 Planowany |
| **AI Forecasting** | KI-Analysen | 🔜 Planowany |
| **Process Optimizer** | Wirtschaftlichkeit | 🔜 Planowany |

---

## 1. Dashboard Design

### Główny cel Dashboard:
**Centralny hub biznesowy** - jeden widok na całą działalność użytkownika w platformie

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  r0sita Dashboard                                            [🔔] [👤 User] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Willkommen zurück, {name}                                                  │
│  Ihre Geschäftsübersicht auf einen Blick                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  GESCHÄFTS-KPIs                                                      │   │
│  │  ═══════════════                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ Projekte │ │ Analysen │ │Simulat.  │ │ Aktive   │               │   │
│  │  │    24    │ │    12    │ │    8     │ │ Alerts   │               │   │
│  │  │  Total   │ │Completed │ │  Runs    │ │    3     │               │   │
│  │  │ +3 diese │ │ +2 diese │ │ +5 diese │ │ ⚠ Check  │               │   │
│  │  │  Woche   │ │  Woche   │ │  Woche   │ │          │               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────┐  ┌──────────────────────────────────┐  │
│  │  IHRE PRODUKTE                 │  │  LETZTE AKTIVITÄT                │  │
│  │  ══════════════                │  │  ════════════════                │  │
│  │                                │  │                                  │  │
│  │  ┌─────────────────────────┐   │  │  • SuSa Q4 Analyse abgeschlossen │  │
│  │  │ 📊 SuSa Analytics       │   │  │    vor 2 Stunden                 │  │
│  │  │    8 Analysen           │   │  │                                  │  │
│  │  │    [Öffnen →]           │   │  │  • Stress-Simulation gestartet   │  │
│  │  └─────────────────────────┘   │  │    Turbine_v2.glb - vor 5 Std    │  │
│  │                                │  │                                  │  │
│  │  ┌─────────────────────────┐   │  │  • Neues 3D Modell hochgeladen   │  │
│  │  │ 🎨 3D Model Viewer      │   │  │    Pump_Assembly.glb - gestern   │  │
│  │  │    16 Modelle           │   │  │                                  │  │
│  │  │    [Öffnen →]           │   │  │  [Alle Aktivitäten →]            │  │
│  │  └─────────────────────────┘   │  │                                  │  │
│  │                                │  └──────────────────────────────────┘  │
│  │  ┌─────────────────────────┐   │                                        │
│  │  │ 📡 Monitoring (Soon)    │   │  ┌──────────────────────────────────┐  │
│  │  │    Coming soon...       │   │  │  KONTO & ABONNEMENT              │  │
│  │  │    [Mehr erfahren]      │   │  │  ═══════════════════             │  │
│  │  └─────────────────────────┘   │  │                                  │  │
│  │                                │  │  Plan: Professional              │  │
│  └────────────────────────────────┘  │  Gültig bis: 31.12.2025          │  │
│                                      │  Projekte: 24/50 verwendet       │  │
│                                      │                                  │  │
│                                      │  [Konto verwalten →]             │  │
│                                      │  [Plan upgraden →]               │  │
│                                      └──────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SCHNELLZUGRIFF                                                      │   │
│  │  ══════════════                                                      │   │
│  │  [+ Neue Analyse starten]  [+ 3D Modell hochladen]  [📖 Dokumentation]│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Backend API

### 2.1 Endpoint: `GET /api/user/dashboard`

```csharp
public class DashboardResponseDto
{
    // User basics
    public UserInfoDto User { get; set; }

    // Business KPIs
    public BusinessKpisDto Kpis { get; set; }

    // Products summary
    public List<ProductSummaryDto> Products { get; set; }

    // Recent activity
    public List<ActivityItemDto> RecentActivity { get; set; }

    // Subscription
    public SubscriptionDto Subscription { get; set; }
}

public class UserInfoDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string? AvatarUrl { get; set; }
}

public class BusinessKpisDto
{
    public int TotalProjects { get; set; }
    public int ProjectsThisWeek { get; set; }

    public int CompletedAnalyses { get; set; }
    public int AnalysesThisWeek { get; set; }

    public int SimulationRuns { get; set; }
    public int SimulationsThisWeek { get; set; }

    public int ActiveAlerts { get; set; }  // Future: monitoring alerts
}

public class ProductSummaryDto
{
    public string ProductId { get; set; }      // "susa", "viewer", "monitoring"
    public string Name { get; set; }
    public string Icon { get; set; }
    public int ItemCount { get; set; }
    public string Status { get; set; }         // "active", "coming_soon"
    public string Url { get; set; }
}

public class ActivityItemDto
{
    public string Type { get; set; }           // "analysis_complete", "upload", "simulation"
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Timestamp { get; set; }
    public string? ProjectUrl { get; set; }
}

public class SubscriptionDto
{
    public string Plan { get; set; }           // "Free", "Professional", "Enterprise"
    public DateTime? ValidUntil { get; set; }
    public int ProjectsLimit { get; set; }
    public int ProjectsUsed { get; set; }
}
```

### 2.2 Controller: `UserController.cs`

```csharp
[ApiController]
[Route("api/user")]
[Authorize(Policy = "defaultPolicy")]
public class UserController : ControllerBase
{
    // Main dashboard aggregation
    [HttpGet("dashboard")]
    public async Task<IResult> GetDashboard() { ... }

    // User profile management
    [HttpGet("profile")]
    public async Task<IResult> GetProfile() { ... }

    [HttpPut("profile")]
    public async Task<IResult> UpdateProfile([FromBody] UpdateProfileDto dto) { ... }

    [HttpPost("profile/avatar")]
    public async Task<IResult> UploadAvatar() { ... }  // S3 upload

    // Subscription (future)
    [HttpGet("subscription")]
    public async Task<IResult> GetSubscription() { ... }
}
```

---

## 3. Frontend Structure

```
Frontend/src/
├── types/
│   └── user.ts                         # User/Dashboard interfaces
├── services/api/
│   └── user.ts                         # User API client
├── hooks/
│   └── useDashboard.ts                 # Dashboard data fetching
├── app/
│   ├── components/
│   │   └── dashboard/
│   │       ├── BusinessKpis.tsx        # KPI cards row
│   │       ├── ProductCards.tsx        # Products grid
│   │       ├── RecentActivity.tsx      # Activity timeline
│   │       ├── SubscriptionCard.tsx    # Account/plan info
│   │       └── QuickActions.tsx        # Action buttons
│   └── [locale]/
│       └── dashboard/
│           ├── layout.tsx              # Dashboard layout
│           ├── page.tsx                # Main dashboard
│           └── profile/
│               └── page.tsx            # Profile settings
└── messages/
    ├── en.json                         # English
    └── de.json                         # German
```

---

## 4. Implementation Phases

### Phase 1: Backend MVP
- [ ] Create `Dtos/User/` folder
- [ ] Create `UserController.cs`
- [ ] Implement `GET /api/user/dashboard` (aggregate Projects + SuSa data)
- [ ] Add tests

### Phase 2: Frontend Dashboard
- [ ] Types and API client
- [ ] Dashboard hook
- [ ] Components: BusinessKpis, ProductCards, RecentActivity, QuickActions
- [ ] Main dashboard page
- [ ] Translations (EN + DE)

### Phase 3: Profile Management
- [ ] Profile page
- [ ] Avatar upload to S3
- [ ] Profile update endpoint

### Phase 4: Subscriptions (Future)
- [ ] UserProfile database table
- [ ] Stripe integration
- [ ] Plan limits enforcement

---

## 5. Translations

```json
{
  "dashboard": {
    "title": "Dashboard",
    "welcome": "Willkommen zurück, {name}",
    "subtitle": "Ihre Geschäftsübersicht auf einen Blick",

    "kpis": {
      "title": "Geschäfts-KPIs",
      "projects": "Projekte",
      "analyses": "Analysen",
      "simulations": "Simulationen",
      "alerts": "Aktive Alerts",
      "this_week": "diese Woche",
      "total": "Gesamt",
      "completed": "Abgeschlossen"
    },

    "products": {
      "title": "Ihre Produkte",
      "open": "Öffnen",
      "coming_soon": "Demnächst",
      "learn_more": "Mehr erfahren"
    },

    "activity": {
      "title": "Letzte Aktivität",
      "view_all": "Alle Aktivitäten",
      "empty": "Keine Aktivität. Starten Sie mit einem neuen Projekt!"
    },

    "subscription": {
      "title": "Konto & Abonnement",
      "plan": "Plan",
      "valid_until": "Gültig bis",
      "projects_used": "{used}/{limit} Projekte verwendet",
      "manage": "Konto verwalten",
      "upgrade": "Plan upgraden"
    },

    "quick_actions": {
      "title": "Schnellzugriff",
      "new_analysis": "Neue Analyse starten",
      "upload_model": "3D Modell hochladen",
      "documentation": "Dokumentation"
    }
  }
}
```

---

## 6. Priorytety

1. **Sofort:** Backend endpoint + Frontend dashboard (Phase 1-2)
2. **Następnie:** Profile management (Phase 3)
3. **Później:** Subscriptions, Monitoring, AI Features (Phase 4+)

Czy rozpocząć implementację Phase 1 (Backend)?
