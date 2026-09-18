# 🚗 Legacy Vehicle Auto Hub — Collaborator Guide

Welcome to the **Legacy Vehicle Auto Hub** codebase! This document provides essential information for developers and collaborators joining the project, covering our tech stack, repository layout, environment setup, core architecture, and development workflow.

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack & Languages](#-tech-stack--languages)
- [Key Features](#-key-features)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Available Scripts](#-available-scripts)
- [State Management & Services](#-state-management--services)
- [Collaboration & Code Guidelines](#-collaboration--code-guidelines)

---

## 🚘 Project Overview

**Legacy Vehicle Auto Hub** is a modern, responsive web application designed for browsing, searching, and managing luxury and quality vehicle inventory. It features customer-facing vehicle showcases, dynamic filtering, test drive / booking modal workflows (Email & WhatsApp), and an authentication-protected Admin Dashboard for inventory management.

---

## 🛠 Tech Stack & Languages

| Layer | Technology | Description |
|---|---|---|
| **Programming Language** | **JavaScript (ES6+ / JSX)** | Client-side application logic and component structure |
| **Frontend Framework** | **React 18** | UI component library |
| **Build Tool & Dev Server** | **Vite 5** | Fast HMR (Hot Module Replacement) bundler |
| **Routing** | **React Router DOM v7** | Single Page Application (SPA) client-side routing |
| **Styling** | **Tailwind CSS v3** + **PostCSS** | Utility-first CSS styling with custom animations |
| **UI Icons** | **Lucide React** | Modern vector icons for actions & features |
| **Media Management** | **Cloudinary API** | Client-side image upload & optimization |
| **Form Submissions** | **Web3Forms API** | Serverless email notification delivery |
| **Authentication** | **WebAuthn (FIDO2)** + Fallback | Passwordless biometric/security key authentication for admins |

---

## ✨ Key Features

1. **Vehicle Inventory & Showcase**: Filter by category, make, model, price, transmission, and fuel type.
2. **Admin Dashboard**: Full CRUD (Create, Read, Update, Delete) capability for vehicle listings with image uploads.
3. **Dual Authentication System**: Standard credential check and WebAuthn (Passkey / Fingerprint / FaceID) protection for admin operations.
4. **Booking & Inquiry Systems**: Integrated email booking modal (via Web3Forms) and instant WhatsApp chat launcher.
5. **Theme Engine**: Light and Dark mode support backed by React Context and Tailwind CSS.
6. **Cloudinary Asset Upload**: Direct client-side unsigned uploads for car showcase imagery.

---

## 📂 Project Architecture & Directory Structure

```text
legacy_vehicle_autohub/
├── public/                 # Static assets (logos, favicon, etc.)
├── src/
│   ├── components/         # Reusable UI components & modals
│   │   ├── AdminCarModal.jsx       # Modal for adding/editing car listings
│   │   ├── CarCard.jsx             # Card display for individual vehicles
│   │   ├── CarDetailModal.jsx      # Comprehensive detail view modal
│   │   ├── EmailBookingModal.jsx   # Vehicle booking / inquiry form modal
│   │   ├── Footer.jsx              # Site footer component
│   │   ├── Navbar.jsx              # Navigation header with theme toggle
│   │   ├── PhoneNumbersModal.jsx   # Quick contact numbers dialog
│   │   ├── ProtectedRoute.jsx      # Auth guard for admin routes
│   │   └── WhatsAppFloat.jsx       # Floating WhatsApp quick-action button
│   ├── context/            # React Context providers for global state
│   │   ├── CarContext.jsx          # Inventory state & CRUD methods
│   │   ├── PhoneContext.jsx        # Contact phone numbers state
│   │   └── ThemeContext.jsx        # Light/Dark theme toggle state
│   ├── data/               # Default static datasets
│   │   └── cars.js                 # Initial vehicle inventory mock data
│   ├── pages/              # Top-level page views (Routes)
│   │   ├── About.jsx               # About Us page
│   │   ├── AdminDashboard.jsx      # Inventory management panel
│   │   ├── AdminLogin.jsx          # Admin authentication page
│   │   ├── Cars.jsx                # Full vehicle catalog with search & filters
│   │   ├── Contact.jsx             # Contact form & location details
│   │   ├── Home.jsx                # Landing page hero & featured vehicles
│   │   └── Terms.jsx               # Terms of Service & privacy policy
│   ├── utils/              # Helper utilities & API integrations
│   │   ├── cloudinary.js           # Cloudinary image upload handler
│   │   ├── webauthn.js             # WebAuthn passkey registration & auth logic
│   │   └── whatsapp.js             # WhatsApp URL generator helpers
│   ├── App.jsx             # Main router configuration & layout structure
│   ├── index.css           # Tailwind directives & global style overrides
│   └── main.jsx            # React root entry point
├── .env                    # Environment variables (create from template)
├── index.html              # Entry HTML template
├── package.json            # Project dependencies and script definitions
├── tailwind.config.js      # Tailwind CSS theme customization
└── vite.config.js          # Vite build configuration
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/legacy_hub.git
   cd legacy_hub/legacy_vehicle_autohub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root of `legacy_vehicle_autohub` (or copy `.env.example` if available) with the following structure:

```env
# Admin Credentials
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_admin_password

# Cloudinary Image Upload Configuration (https://cloudinary.com)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset

# Web3Forms Access Key for Email Submissions (https://web3forms.com)
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
```

> ⚠️ **Note**: Do not commit actual production secrets to Git. Always use `.env` for local configuration.

### Running the Application

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Open your browser at `http://localhost:5173` (or the URL shown in your terminal).

- **Build for Production**:
  ```bash
  npm run build
  ```
  The production build assets will be generated inside the `dist/` directory.

- **Preview Production Build locally**:
  ```bash
  npm run preview
  ```

---

## 📜 Available Scripts

In the `legacy_vehicle_autohub` directory, you can run:

- `npm run dev`: Launches Vite dev server with hot reload.
- `npm run build`: Bundles app for production deployment.
- `npm run preview`: Bootstraps local web server serving `dist/` build.
- `npm run lint`: Runs ESLint to check for syntax and style errors.

---

## 🔄 State Management & Services

- **Global Inventory State**: Controlled via `CarContext.jsx`. Initializes from `localStorage` if available, falling back to `src/data/cars.js`.
- **Media Storage**: Car images uploaded in the Admin modal pass through `src/utils/cloudinary.js` to Cloudinary's REST API endpoint.
- **Biometric Auth**: `src/utils/webauthn.js` manages WebAuthn credentials stored locally for fast biometric login on supported hardware.

---

## 🤝 Collaboration & Code Guidelines

1. **Branching Model**:
   - `main`: Production-ready code.
   - `feature/<feature-name>`: New features or UI components.
   - `fix/<bug-name>`: Bug fixes and patches.
2. **Code Style**:
   - Write clean, componentized React code (`.jsx` extension for React components).
   - Use Tailwind utility classes for styling. Place shared utility classes or custom animations in `src/index.css`.
   - Maintain mobile-first responsive design principles across all pages and modals.
3. **Pull Requests**:
   - Test your changes locally (`npm run dev` and `npm run build`).
   - Run `npm run lint` before creating PRs to prevent lint errors.
