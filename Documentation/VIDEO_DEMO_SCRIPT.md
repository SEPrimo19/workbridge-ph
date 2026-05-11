# WorkBridge PH — Video Demo Script

**Target runtime:** 4–5 minutes
**Recording tool:** OBS Studio (free) or Windows Game Bar (`Win+G`) or Loom
**Resolution:** 1080p, 1920×1080 viewport
**Audio:** Speak clearly, slightly slower than natural pace (the instructor may watch on phone speakers, not headphones)

---

## 👥 Presenter assignments

Each member narrates one segment. Swap roles if anyone has voice/recording issues — these are defaults.

| Segment | Time | Presenter |
|---|---|---|
| 1. Cold open + intro | 0:00 – 0:25 | **Jhon Clarence Rulona** |
| 2. Public browse | 0:25 – 0:55 | **Jovannie Mataganas** |
| 3. Seeker journey | 0:55 – 1:55 | **John Lienard Safuentes** |
| 4. Employer journey | 1:55 – 3:00 | **Cyril James Garnica** |
| 5. Admin journey | 3:00 – 4:00 | **Jahiel Tapiador** |
| 6. Tech, security, closing | 4:00 – 4:30 | **Jhon Clarence Rulona** |

**Recording approach:** record each segment independently on the same machine, then stitch the clips end-to-end in Clipchamp (free, built into Windows) or any video editor. Each member only needs to be physically present for their own segment. The lead developer bookends the video for technical authority on the intro and closing.

---

## Pre-recording checklist

- [ ] Run `php artisan migrate:fresh --seed` so demo data is fresh
- [ ] Run `php artisan serve` (port 8000) and confirm it's up
- [ ] Apache running for the frontend at `http://localhost/workbridge/`
- [ ] Hard refresh in the browser, DevTools closed
- [ ] Browser zoom at 100%
- [ ] Close unrelated tabs and notifications
- [ ] Have these credentials ready (paste into a notes window off-screen):
  - Seeker: `juan@example.com` / `password`
  - Employer: `hr@technova.ph` / `password`
  - Admin: `admin@workbridge.ph` / `password`

---

## 🎬 SCRIPT

### [0:00 – 0:25] · Cold open
*Presenter: Jhon Clarence Rulona*

**On screen:** Public homepage at `http://localhost/workbridge/`

> "Good day, Sir/Ma'am. This is **WorkBridge PH** — a web-based unified employment platform built as our IT305 Major Course Output for Northwest Samar State University.
>
> The system addresses Sustainable Development Goal 8 — Decent Work and Economic Growth — by connecting job seekers, employers, and regulators in a single trusted platform that serves white-collar, blue-collar, and household workers alike."

**Action:** Slowly scroll down the homepage so the viewer sees the hero, search, category tiles, and featured jobs.

---

### [0:25 – 0:55] · Public browse
*Presenter: Jovannie Mataganas*

**On screen:** Click **Categories** in the top nav.

> "The Categories page groups industries by sector — professional and office, healthcare and trades, and service and hospitality."

**Action:** Click "Information Technology" → land on jobs filtered by IT.

> "Filtered job listings stay readable. Notice the company avatars with verified-employer checkmarks, salary in proper peso format, and the live filter chip showing what's applied. A clear close button removes the filter cleanly."

**Action:** Click X to clear filter. Click on any job → land on Job Detail page.

> "Each job has its own detail page with overview, responsibilities, qualifications, and benefits tabs."

---

### [0:55 – 1:55] · Seeker journey *(60 sec — most important role to showcase)*
*Presenter: John Lienard Safuentes*

**Action:** Top right → click **Log in** → use `juan@example.com` / `password`.

> "Logging in as a job seeker — Juan dela Cruz, one of our seeded test users."

**On screen:** Seeker dashboard.

> "The dashboard shows saved jobs count, applications, and profile strength. Below are recommended jobs."

**Action:** Click **Jobs** in sidebar → click Save (bookmark) on one job → click into another job → click **Apply Now** → confirm in modal.

> "I can save jobs for later, and applying takes one click. The system warns me if I don't have a resume uploaded, calculates a skill-match score, and confirms before submission."

**Action:** Click **Resume** in sidebar → click Download on the seeded resume.

> "Resumes are stored privately on the server — only the seeker, the employer who received the application, and admins can download them."

**Action:** Click **Profile** → **Change Photo** → pick a JPEG/PNG.

> "Profile photos upload to a public storage area for display."

**Action:** Click user dropdown top-right → Log out.

---

### [1:55 – 3:00] · Employer journey *(65 sec)*
*Presenter: Cyril James Garnica*

**Action:** Log in as `hr@technova.ph` / `password`.

> "Now as TechNova Solutions — an employer."

**On screen:** Employer dashboard with charts.

> "The employer dashboard surfaces four core metrics — active jobs, total applicants, shortlisted candidates, and hires — plus four live charts: applications pipeline, jobs by status, top-performing jobs, and a 30-day applications trend line. All driven by real data from a single backend query."

**Action:** Click **Post Job** → fill in title, location, salary, description → click Post.

> "Posting a job uses a live preview — the formatted salary updates as you type."

**Action:** Click **Applicants** → click View on Juan's application.

> "Reviewing an applicant — I can see their resume, skill-match score, and full profile."

**Action:** Click **Reviewing** status button.

> "Status changes write to an audit timeline and dispatch a notification to the seeker."

**Action:** Logout.

---

### [3:00 – 4:00] · Admin journey *(60 sec)*
*Presenter: Jahiel Tapiador*

**Action:** Log in as `admin@workbridge.ph` / `password`.

**On screen:** Admin dashboard.

> "As an admin, I have full platform oversight."

**Action:** Click **Analytics** → show the 4 charts.

> "Platform-wide analytics — users by role, companies by verification status, applications pipeline, and jobs by status. Each chart is a single SQL aggregation query on the backend."

**Action:** Click **Employer Verification** → click any company.

> "Admins verify or reject employer companies. Every decision writes to an audit log for accountability."

**Action:** Click **Users** → demonstrate the ban/unban button on a non-admin user.

> "Suspending or unbanning users — also audit-logged."

**Action:** Click **Audit Logs**.

> "Every administrative action is captured here with the actor, action type, target, and timestamp."

---

### [4:00 – 4:30] · Tech and security
*Presenter: Jhon Clarence Rulona (closing)*

**On screen:** Briefly toggle dark mode in Settings.

> "The platform supports a full dark mode across all pages, is fully mobile-responsive, and is built on a hardened technical foundation:
>
> Backend in **Laravel 11** with **MySQL 8** and **Sanctum** token authentication. Frontend in **vanilla JavaScript** with **Bootstrap 5** and **Chart.js**.
>
> Security includes role-based access control, rate limiting on authentication endpoints, XSS protection, IDOR prevention, and private file storage for sensitive uploads.
>
> Quality is enforced by **14 automated tests** — 7 PHPUnit feature tests on the backend and 7 Playwright end-to-end tests on the frontend.
>
> WorkBridge PH — connecting opportunity with capability, with integrity. Thank you."

---

## Post-recording

- [ ] Trim dead air at the start and end
- [ ] Verify audio is clear (no background noise spikes)
- [ ] Export as MP4 (H.264, 1080p)
- [ ] File name: `WorkBridgePH_Demo_v1.mp4`
- [ ] Upload to MCO Google Drive folder `Project WorkBridge PH`

## Tips for nailing the take

1. **Speak in your normal voice but project slightly louder.** Phone-speaker playback is unforgiving.
2. **Don't apologize on camera** if you fumble — just pause, breathe, restart that segment.
3. **Mouse movements should be deliberate**, not frantic. Move, pause, click, pause.
4. **Highlight critical buttons by hovering 1 second** before clicking — gives the eye time to track.
5. **You don't have to memorize the script.** Tape it next to your camera or use teleprompter software (free: Teleprompter.io).

You don't need to nail it in one take. Record in chunks per role, then stitch in any video editor (free: Clipchamp on Windows, DaVinci Resolve, or even Windows Photos).
