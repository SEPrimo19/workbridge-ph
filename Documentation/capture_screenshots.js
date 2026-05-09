/**
 * WorkBridge PH — Screenshot Capture Script
 * Captures all pages for MCO PowerPoint
 */

const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT  = path.join(__dirname, 'screenshots');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

// Seed data injected for all protected pages
const SEED_SCRIPT = `
  if (!localStorage.getItem('workbridge_seeded')) {
    // minimal flag so app doesn't re-seed and wipe mock user
  }
`;

const SEEKER_USER  = JSON.stringify({ id: 's1', email: 'juan@example.com',   name: 'Juan dela Cruz', role: 'seeker'   });
const EMPLOYER_USER= JSON.stringify({ id: 'c1', email: 'hr@technova.ph', name: 'TechNova Solutions HR', role: 'employer' });
const ADMIN_USER   = JSON.stringify({ id: 'admin1', email: 'admin@workbridge.ph', name: 'Admin WorkBridge', role: 'admin'   });

const PAGES = [
  // ── Public ──────────────────────────────────────────────────────────────────
  { file: '01_homepage',           url: '/',                              user: null,         label: 'Homepage' },
  { file: '02_jobs',               url: '/jobs.html',                     user: null,         label: 'Browse Jobs' },
  { file: '03_job_detail',         url: '/job-detail.html?id=j1',         user: null,         label: 'Job Detail' },
  { file: '04_companies',          url: '/companies.html',                user: null,         label: 'Companies' },
  { file: '05_company_detail',     url: '/company-detail.html?id=c1',     user: null,         label: 'Company Detail' },
  { file: '06_safety',             url: '/safety.html',                   user: null,         label: 'Safety & Awareness' },
  { file: '07_about',              url: '/about.html',                    user: null,         label: 'About' },
  { file: '08_help',               url: '/help.html',                     user: null,         label: 'Help' },
  // ── Auth ────────────────────────────────────────────────────────────────────
  { file: '09_login',              url: '/auth/login.html',               user: null,         label: 'Login Page' },
  { file: '10_register',           url: '/auth/register.html',            user: null,         label: 'Register Page' },
  { file: '11_forgot',             url: '/auth/forgot.html',              user: null,         label: 'Forgot Password' },
  // ── Seeker ──────────────────────────────────────────────────────────────────
  { file: '12_seeker_dashboard',   url: '/seeker/dashboard.html',         user: SEEKER_USER,  label: 'Seeker Dashboard' },
  { file: '13_seeker_jobs',        url: '/seeker/jobs.html',              user: SEEKER_USER,  label: 'Seeker — Browse Jobs' },
  { file: '14_seeker_saved',       url: '/seeker/saved-jobs.html',        user: SEEKER_USER,  label: 'Seeker — Saved Jobs' },
  { file: '15_seeker_applications',url: '/seeker/applications.html',      user: SEEKER_USER,  label: 'Seeker — Applications' },
  { file: '16_seeker_profile',     url: '/seeker/profile.html',           user: SEEKER_USER,  label: 'Seeker — Profile' },
  { file: '17_seeker_resume',      url: '/seeker/resume.html',            user: SEEKER_USER,  label: 'Seeker — Resume' },
  { file: '18_seeker_notifications',url: '/seeker/notifications.html',    user: SEEKER_USER,  label: 'Seeker — Notifications' },
  { file: '19_seeker_messages',    url: '/seeker/messages.html',          user: SEEKER_USER,  label: 'Seeker — Messages' },
  { file: '20_seeker_settings',    url: '/seeker/settings.html',          user: SEEKER_USER,  label: 'Seeker — Settings' },
  // ── Employer ────────────────────────────────────────────────────────────────
  { file: '21_employer_dashboard', url: '/employer/dashboard.html',       user: EMPLOYER_USER,label: 'Employer Dashboard' },
  { file: '22_employer_post_job',  url: '/employer/post-job.html',        user: EMPLOYER_USER,label: 'Employer — Post Job' },
  { file: '23_employer_manage',    url: '/employer/manage-jobs.html',     user: EMPLOYER_USER,label: 'Employer — Manage Jobs' },
  { file: '24_employer_applicants',url: '/employer/applicants.html',      user: EMPLOYER_USER,label: 'Employer — Applicants' },
  { file: '25_employer_profile',   url: '/employer/company-profile.html', user: EMPLOYER_USER,label: 'Employer — Company Profile' },
  { file: '26_employer_verify',    url: '/employer/verification.html',    user: EMPLOYER_USER,label: 'Employer — Verification' },
  { file: '27_employer_messages',  url: '/employer/messages.html',        user: EMPLOYER_USER,label: 'Employer — Messages' },
  { file: '28_employer_settings',  url: '/employer/settings.html',        user: EMPLOYER_USER,label: 'Employer — Settings' },
  // ── Admin ───────────────────────────────────────────────────────────────────
  { file: '29_admin_dashboard',    url: '/admin/dashboard.html',          user: ADMIN_USER,   label: 'Admin Dashboard' },
  { file: '30_admin_verification', url: '/admin/employer-verification.html', user: ADMIN_USER,label: 'Admin — Employer Verification' },
  { file: '31_admin_moderation',   url: '/admin/job-moderation.html',     user: ADMIN_USER,   label: 'Admin — Job Moderation' },
  { file: '32_admin_reports',      url: '/admin/reports.html',            user: ADMIN_USER,   label: 'Admin — Reports' },
  { file: '33_admin_users',        url: '/admin/users.html',              user: ADMIN_USER,   label: 'Admin — Users' },
  { file: '34_admin_analytics',    url: '/admin/analytics.html',          user: ADMIN_USER,   label: 'Admin — Analytics' },
  { file: '35_admin_categories',   url: '/admin/categories.html',         user: ADMIN_USER,   label: 'Admin — Categories' },
  { file: '36_admin_audit_logs',   url: '/admin/audit-logs.html',         user: ADMIN_USER,   label: 'Admin — Audit Logs' },
  { file: '37_admin_settings',     url: '/admin/settings.html',           user: ADMIN_USER,   label: 'Admin — Settings' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const page of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });

    if (page.user) {
      await ctx.addInitScript(({ user }) => {
        localStorage.setItem('workbridge_user', user);
      }, { user: page.user });
    }

    const p = await ctx.newPage();

    try {
      await p.goto(BASE + page.url, { waitUntil: 'networkidle', timeout: 15000 });
      await p.waitForTimeout(800); // let animations settle

      const filePath = path.join(OUT, page.file + '.png');
      await p.screenshot({ path: filePath, fullPage: false });
      console.log('✔ ' + page.label.padEnd(35) + page.file + '.png');
    } catch (err) {
      console.warn('✘ ' + page.label + ' — ' + err.message.split('\n')[0]);
    }

    await ctx.close();
  }

  await browser.close();
  console.log('\nDone. Screenshots saved to:', OUT);
})();
