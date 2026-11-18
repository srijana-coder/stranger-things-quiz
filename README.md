# 🔴 SURVIVE VECNA
### A Stranger Things Survival Quiz

**10 Questions. 5 Lives. One Chance.**

Enter the Upside Down, face Vecna, test your knowledge of *Stranger Things*, and see whether you have what it takes to survive.

## 🎮 About the Game

Survive Vecna is an interactive, Stranger Things-inspired quiz game built with React and TypeScript. It combines a cinematic introduction, atmospheric sound effects, Vecna voice recordings, and a survival-style quiz experience.

Every round challenges players with 10 questions. You have 5 lives. Make your choices carefully — your survival depends on it.

## ✨ Features

- 🎬 **Cinematic Intro** — An atmospheric introduction featuring the Upside Down.
- 🧠 **Randomized Questions** — Different quiz questions across rounds.
- ❤️ **Five Lives** — You have five chances to survive.
- ⏱️ **Timed Questions** — Answer before time runs out.
- 👁️ **Vecna Voice Effects** — Custom voice recordings that bring the experience to life.
- 🔊 **Sound Effects** — Immersive audio throughout the game.
- 🌫️ **Atmospheric Visuals** — Fog effects, cinematic overlays, and a grandfather clock.
- 💀 **Survival Experience** — Experience a special game-over sequence when you lose.
- 🏆 **Leaderboard** — Save and view player scores using Supabase.
- 📱 **Responsive Design** — Play on desktop or mobile devices.

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe development |
| Vite | Development and build tooling |
| CSS | Styling and animations |
| Supabase | Leaderboard and database |
| Git & GitHub | Version control |
| Vercel | Deployment |

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/srijana-coder/stranger-things-quiz.git
```

### 2. Open the project folder

```bash
cd stranger-things-quiz
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Replace the placeholder values with your own Supabase project credentials.

Never commit your `.env.local` file or expose secret service-role keys in frontend code.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to play.

### 6. Build for production

```bash
npm run build
```

## 🗄️ Supabase Setup

The game uses Supabase for leaderboard functionality.

To use the leaderboard locally:

1. Create a Supabase project.
2. Configure the required leaderboard table and database permissions.
3. Add your Supabase project URL and public client key to `.env.local`.
4. Ensure Row Level Security (RLS) policies are configured appropriately.

## 📁 Project Structure

```text
stranger-things-quiz/
├── public/
│   ├── sounds/
│   └── videos/
├── src/
│   ├── components/
│   ├── constants/
│   ├── screens/
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```

## 👩‍💻 Author

**Srijana Kamat**

GitHub: [@srijana-coder](https://github.com/srijana-coder)

## ⚠️ Disclaimer

This is an unofficial, fan-made project inspired by *Stranger Things*. It is not affiliated with, endorsed by, or associated with Netflix or the creators of the series. All related trademarks and characters belong to their respective owners.

---

**THE GATE IS OPEN. WILL YOU SURVIVE?** 🔴
