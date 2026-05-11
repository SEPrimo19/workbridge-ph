# WorkBridge PH — Poster Content Pack

**Format:** 3 ft × 6 ft (36" × 72") — portrait orientation recommended
**Print resolution:** 150 DPI minimum (5400 × 10800 px at 150 DPI)
**Design tool:** Canva (search "Research Poster" templates) or PowerPoint (Custom Slide Size 36"×72")

The text below is **paste-ready**. Copy each block into your chosen template.

---

## 🟪 HEADER BLOCK *(top of poster, ~10% height)*

### Big title (use 200pt+ font)
```
WorkBridge PH
```

### Subtitle (use 60pt font)
```
A Web-Based Unified Employment Platform for Decent Work Access
```

### Authoring line (use 32pt, italic)
```
Major Course Output · IT305 Web Systems and Technologies
Northwest Samar State University · Calbayog City, Samar
```

### Group members line (use 28pt)
```
Group Members:
Jhon Clarence Rulona · Jovannie Mataganas · John Lienard Safuentes
Cyril James Garnica · Jahiel Tapiador
```

### Submission line (use 24pt, slightly smaller than members)
```
Submitted May 15, 2026
```

---

## 🟥 PROBLEMS *(left column or middle-left)*

### Section title (40pt, bold)
```
The Problem
```

### Body (use 22–24pt for poster legibility from 1 meter)
```
The Philippines faces persistent employment friction. Job seekers
struggle to find legitimate, fairly-paid work. Employers cannot
efficiently reach qualified talent. Existing platforms cater
overwhelmingly to white-collar roles, leaving blue-collar and
household workers underserved. Online job scams target the most
vulnerable.

These barriers obstruct the United Nations Sustainable Development
Goals — most directly SDG 8 (Decent Work and Economic Growth),
SDG 1 (No Poverty), and SDG 10 (Reduced Inequalities).
```

### Bullet list (after the paragraph, use 24pt with icons if your template supports)
```
• Mismatch between seekers and employers
• No unified platform for blue-collar / household workers
• Scam listings exploit job hunters
• Manual hiring workflows waste time on both sides
• Lack of transparent application tracking
```

---

## 🟩 SOLUTION *(middle column or center)*

### Section title (40pt, bold)
```
Our Solution
```

### Body (24pt)
```
WorkBridge PH is a single platform unifying three audiences —
job seekers, employers, and platform administrators — across
white-collar, blue-collar, and service-sector employment.

Every employer is verified before posting jobs. Every administrative
action is audit-logged. Every applicant has skill-match scoring,
status tracking, and direct messaging with hiring managers.
```

### Feature list (24pt with checkmarks)
```
✓ Three role-based dashboards with charts and real-time analytics
✓ Verified employer system — admins approve before listings go live
✓ Skill-based match scoring on every application
✓ Application timeline — seekers track progress in real time
✓ Resume upload + private storage with authenticated download
✓ Cross-role messaging restricted to seeker ↔ employer pairs
✓ Mobile-responsive — works on phones, tablets, and desktops
✓ Full dark mode for accessibility and battery savings
✓ Audit log — every admin decision is traceable
```

---

## 🟦 PROGRAMMING & SCRIPTING LANGUAGES *(right column)*

### Section title (40pt, bold)
```
Technology Stack
```

### Three sub-sections (28pt headings, 22pt body)

**Backend**
```
PHP 8.2 with Laravel 11 framework
MySQL 8.0 relational database
Laravel Sanctum for API authentication
Eloquent ORM with 17 normalized tables
PHPUnit for automated testing
```

**Frontend**
```
HTML5 + CSS3 with custom design tokens
Vanilla JavaScript (ES Modules)
Bootstrap 5 for responsive layout
Chart.js for analytics visualizations
Bootstrap Icons for the icon set
```

**Tooling and Quality**
```
Playwright for end-to-end browser testing
Git + GitHub for version control
XAMPP for local development on Windows
14 automated tests (7 backend + 7 frontend)
```

---

## 🟨 SECURITY & ARCHITECTURE *(bottom band — small but important for technical credibility)*

### Section title (32pt)
```
Security and Architecture Highlights
```

### Two-column list (20pt)
```
• Bearer token authentication (revoked on password reset)
• Role-based access control (seeker / employer / admin)
• Rate limiting on login + register + uploads
• XSS protection via output escaping on all dynamic content
• IDOR prevention through inline ownership checks
• Private file storage for resumes (UUID filenames)
• CORS hardening with explicit origin allowlist
• 14 automated regression tests prevent class-of-bug recurrence
```

---

## 🟧 FOOTER BLOCK *(very bottom)*

### QR + repository (place QR code on the right, text on the left)
```
View source code:
github.com/SEPrimo19/workbridge-ph
```

*(Generate the QR at qrcode-monkey.com or use Canva's built-in QR widget — point it to the GitHub URL.)*

### Course instructor acknowledgment line
```
Submitted to [Instructor Name] — IT305 Web Systems and Technologies
Northwest Samar State University · College of Computing Studies · 2026
```

---

## Visual design guidance

### Color palette (matches the app's actual UI)
- **Primary indigo:** `#4F46E5`
- **Verified teal:** `#0D9488`
- **Warning amber:** `#F59E0B`
- **Rose accent:** `#E11D48`
- **Neutral slate:** `#64748B`
- **Light background:** `#F7F8FA`
- **Dark text:** `#111827`

### Typography
- **Headings:** A bold sans-serif (Inter, Poppins, Montserrat)
- **Body:** Same family in regular weight, never below 22pt for poster legibility
- **Code / tech-stack lines:** Monospace (Fira Code, JetBrains Mono, Courier)

### Layout sketch (portrait 3'×6')

```
┌─────────────────────────────┐
│         HEADER              │ ← System name + subtitle + group
├──────────┬──────────────────┤
│          │                  │
│ PROBLEM  │   SCREENSHOT     │ ← actual UI screenshot for visual punch
│          │                  │   (login, dashboard, job-detail collage)
│          │                  │
├──────────┼──────────────────┤
│          │                  │
│ SOLUTION │   TECH STACK     │
│          │                  │
│          │                  │
├──────────┴──────────────────┤
│      SECURITY band          │
├─────────────────────────────┤
│  QR  · GitHub URL · Footer  │
└─────────────────────────────┘
```

### What to take screenshots of (place center-right column)
1. The seeker dashboard with charts
2. The job-detail page (showing avatar + verified badge + apply card)
3. The admin analytics page with all 4 charts visible
4. Optional: a phone mockup of the mobile drawer open

Use **`Win+Shift+S`** (Snipping Tool) to capture, then drop into your poster template.

---

## Print services in Calbayog / Samar (rough cost estimates)

- 3'×6' tarpaulin print: **₱400–₱800** depending on shop
- Allow **48-hour turnaround** at most local printers
- Bring a USB drive with the final PDF to the print shop
- Common shops: print services near NwSSU campus, public market printers

**Recommendation:** finalize design by **May 12** so you have May 13–14 buffer for printer delays.
