# 🌟 Sanjhi Gupta - Personal Portfolio & Admin Dashboard

A modern, responsive, and dynamic personal portfolio web application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Supabase**, deployed live on **Vercel**.

🔗 **Live Demo**: [https://my-portfolio-sanjhi.vercel.app/](https://my-portfolio-sanjhi.vercel.app/)

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://my-portfolio-sanjhi.vercel.app/)
![Portfolio Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Supported-3ecf8e)

---

## ✨ Features

- 👤 **Hero & About Section**: Dynamic intro highlighting bio, contact options, and availability status.
- 🎓 **Education Timeline**: Showcasing degree programs, institutions, dates, CGPA, and key course highlights.
- ⚡ **Skills Showcase**: Visual proficiency bars for Languages, Web & Frameworks, Databases, Tools, and CS Core Concepts.
- 🚀 **Projects Gallery**: Interactive modal view for project descriptions, tech tags, GitHub links, and live demos.
- 📜 **Certifications & Badges**: Displaying verifiable certificates and credentials.
- 🏆 **Extracurricular Activities**: Achievements, hackathons, and leadership roles.
- 📬 **Contact Form**: Direct messaging with live Supabase database sync and email links.
- 🔐 **Admin Management Suite**:
  - Secure login portal for portfolio administration.
  - Real-time management of Profile, Education, Skills, Projects, Certifications, and Activities.
  - Contact message viewer with status filtering (Read/Unread/Replied).
- 🎨 **Responsive & Dark Visuals**: Designed with sleek glassmorphism elements, custom scrollbars, and vibrant accents.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Autoprefixer](https://github.com/postcss/autoprefixer)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL with RLS & Realtime capability)
- **Hosting & Deployment**: [Vercel](https://vercel.com/) (Continuous Deployment linked to `main` branch)

---

## 🌐 Deployment

This application is deployed on **Vercel** with automatic deployment enabled. Any updates pushed to the `main` branch trigger a production build on Vercel.

🔗 **Live Website**: [https://my-portfolio-sanjhi.vercel.app/](https://my-portfolio-sanjhi.vercel.app/)



---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/sanjhi-gupta13/MY_PORTFOLIO.git
cd MY_PORTFOLIO
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

*(Note: The portfolio seamlessly falls back to default local data if Supabase keys are not provided.)*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to view the application.

---

## 📁 Project Structure

```text
MY_PORTFOLIO/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard & content management editors
│   │   ├── layout/         # Navigation header, sidebar, and mobile menu
│   │   ├── portfolio/      # Portfolio sections (Hero, About, Skills, Projects, etc.)
│   │   └── ui/             # Reusable UI components (Toast notifications)
│   ├── context/            # Global DataContext state management
│   ├── data/               # Default static portfolio data
│   ├── lib/                # Supabase client integration
│   ├── types/              # TypeScript data interfaces
│   ├── App.tsx             # Root component & view routing
│   └── main.tsx            # React entry point
├── supabase_schema.sql     # SQL database schema for Supabase setup
├── vite.config.ts          # Vite configuration
└── package.json
```

---

## 📄 License & Contact

Developed by **Sanjhi Gupta**  
- **GitHub**: [@sanjhi-gupta13](https://github.com/sanjhi-gupta13)  
- **LinkedIn**: [Sanjhi Gupta](https://linkedin.com/in/sanjhi-gupta-907b57382)  
- **Email**: sanjhigupta2023@gmail.com
