# 🧠 Second Brain

> A personal knowledge management app that helps you capture, organize, and revisit everything that matters — your own second brain, always within reach.

🔗 **Live Demo**: [https://second-brain-b5dz.onrender.com](https://second-brain-mu-seven.vercel.app)

---

## What is Second Brain?

Second Brain is a full-stack web application where you can save YouTube videos, tweets, and other content that you find valuable. Instead of losing important information across tabs and bookmarks, Second Brain gives you a single organized space to store and revisit your knowledge — and even share your entire brain with others via a public link.

---

## Features

- 📌 **Save Content** — Add YouTube videos and tweets with titles and tags
- 🗂️ **Organize with Tags** — Label your content for easy filtering and reference
- 🔗 **Share Your Brain** — Generate a public share link so others can view your saved content
- 🔐 **Authentication** — Secure sign up, login, and logout with JWT + cookies
- 📱 **Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- ⚡ **Real-time Updates** — Cards refresh instantly after adding or deleting content

---

## Tech Stack

> The entire application — frontend and backend — is written in **TypeScript**.

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.4 | UI framework |
| **TypeScript** | ~5.9.3 | Type-safe frontend code |
| **Vite** | 8.0.1 | Build tool and dev server |
| **React Router** | 7.13.2 | Client-side routing |
| **Tailwind CSS** | 4.2.2 | Utility-first styling |
| **Axios** | 1.13.6 | HTTP client |
| **Lucide React** | 1.7.0 | Icon library |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Bun** | latest | JavaScript runtime |
| **TypeScript** | ^6.0.2 | Type-safe backend code |
| **Express** | 5.2.1 | Web framework |
| **Mongoose** | 9.3.3 | MongoDB ODM |
| **Zod** | 4.3.6 | Schema validation |
| **JSON Web Token** | 9.0.3 | Authentication |
| **bcrypt** | 6.0.0 | Password hashing |
| **cookie-parser** | 1.4.7 | Cookie handling |
| **CORS** | 2.8.6 | Cross-origin requests |

### Database

- **MongoDB** — Document database for storing users, content, tags, and share links

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Node.js](https://nodejs.org) (for the frontend)
- A MongoDB connection string (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/second-brain.git
cd second-brain
```

### 2. Backend Setup

```bash
cd backend
bun install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start the backend dev server:

```bash
bun dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
second-brain/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Entry point
│   │   ├── routes/           # Express routers
│   │   ├── models/           # Mongoose models
│   │   └── middleware/       # Auth middleware
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── pages/            # Dashboard, SharedDashboard, Auth pages
    │   ├── components/       # Card, Sidebar, Modals, Buttons
    │   ├── Icons/            # Custom icon components
    │   └── config.ts         # API base URL config
    ├── package.json
    └── tsconfig.json
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/signup` | Register a new user | No |
| `POST` | `/api/v1/signin` | Login and set cookie | No |
| `POST` | `/api/v1/logout` | Clear auth cookie | Yes |
| `GET` | `/api/v1/content` | Get all user content | Yes |
| `POST` | `/api/v1/content` | Add new content | Yes |
| `DELETE` | `/api/v1/content/:id` | Delete a content item | Yes |
| `POST` | `/api/v1/brain/share` | Generate a share link | Yes |
| `GET` | `/api/v1/brain/:shareLink` | View a shared brain | No |

---

## Building for Production

### Backend

```bash
cd backend
bun run build
```

### Frontend

```bash
cd frontend
npm run build
```

The frontend build output will be in `frontend/dist/`.

---

## License

This project is open source and available under the [MIT License](LICENSE).
