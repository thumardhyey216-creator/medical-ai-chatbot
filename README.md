# MedTutor AI 🩺

AI-powered medical tutor for NEET PG, INI CET & MBBS preparation.

## Features

- **🤖 Chat Tutor**: RAG-powered AI tutor with Gemini integration
- **📇 Flashcards**: Spaced repetition system with AI generation
- **📝 QBank**: Practice tests with AI-generated questions
- **📊 Performance Analytics**: Detailed stats and weak area identification

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with pgvector
- **AI**: Google Gemini 2.0 Flash

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Setup Database**
   ```bash
   # Create PostgreSQL database
   createdb medtutor_db
   
   # Initialize schema
   npm run init-db
   
   # Seed sample data (optional)
   npm run seed
   ```

4. **Start Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   Open `http://localhost:3000` in your browser

## Project Structure

```
medtutor-ai/
├── public/           # Frontend static files
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript files
│   ├── assets/      # Images, icons
│   ├── index.html   # Chat Tutor (Home)
│   ├── login.html   # Login page
│   ├── flashcards.html
│   ├── qbank.html
│   └── stats.html
├── server/          # Backend code
│   ├── routes/      # API endpoints
│   ├── controllers/ # Business logic
│   ├── models/      # Database models
│   ├── middleware/  # Auth, validation
│   └── services/    # Gemini, RAG, SRS
├── scripts/         # Database scripts
└── server.js        # Entry point
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Chat
- `POST /api/chat/message` - Send message
- `GET /api/chat/sessions` - Get chat history
- `POST /api/chat/sessions` - Create new session

### Flashcards
- `GET /api/flashcards/decks` - List decks
- `POST /api/flashcards/generate` - AI generate cards
- `GET /api/flashcards/due-today` - Get due cards
- `POST /api/flashcards/review` - Submit review

### QBank
- `POST /api/qbank/start-session` - Start test
- `POST /api/qbank/answer` - Submit answer
- `POST /api/qbank/generate` - AI generate questions
- `GET /api/qbank/session/:id` - Get session results

### Stats
- `GET /api/stats/overview` - Dashboard stats
- `GET /api/stats/by-subject` - Performance by subject
- `GET /api/stats/today-plan` - AI daily recommendations

## License

MIT
