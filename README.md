![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

# 🔗 Linkle - Modern URL Shortener

Linkle is a modern web application that transforms long, complex web addresses into stylish, short, and trackable links in seconds.

🚀 **[View Live Demo](https://link-le.vercel.app)**

---

## 📸 Screenshots

| Desktop View | Mobile Responsiveness |
| :---: | :---: |
| <img src="./public/screenshots/foto1.png" width="400"> | <img src="./public/screenshots/mobil1.jpeg" width="200">  |
| <img src="./public/screenshots/foto2.png" width="400"> | <img src="./public/screenshots/mobil2.jpeg" width="200"> |
| <img src="./public/screenshots/foto3.png" width="400"> | <img src="./public/screenshots/mobil3.jpeg" width="200"> |
| <img src="./public/screenshots/foto4.png" width="400"> | <img src="./public/screenshots/mobil4.jpeg" width="200"> |




---

## ✨ Features

- ⚡ **Fast Shortening:** Secure and unique short code generation using `nanoid`.
- 🛡️ **Security & Rate Limiting:** 5 requests per 60 seconds limit using Upstash Redis.
- 👤 **User Dashboard:** Manage your own links by signing in with Google Auth (NextAuth).
- 📊 **Analytics Tracking:** View real-time total click counts for each link.
- 🔄 **Smart Synchronization:** Automatically sync links created while signed out to your account once you log in.
- 📱 **Fully Responsive:** Flawless experience across all screen sizes.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Language:** TypeScript
- **Auth:** Next-Auth (Google Provider)
- **Storage/Cache:** Redis (Upstash)
- **Validation:** Zod
