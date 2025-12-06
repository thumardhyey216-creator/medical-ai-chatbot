# MedTutor AI - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- Google Gemini API Key

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medtutor_db
DB_USER=postgres
DB_PASSWORD=your_actual_password

# JWT Secret (generate a random string)
JWT_SECRET=your_secret_key_here_min_32_characters

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Server
PORT=3000
NODE_ENV=development
```

### 3. Setup Database

**Create the database:**
```bash
createdb medtutor_db
```

**Initialize schema (creates tables):**
```bash
npm run init-db
```

**Seed sample data (optional but recommended):**
```bash
npm run seed
```

This will create:
- Demo user: `demo@medtutor.ai` / `demo123`
- Sample medical content with embeddings
- Sample flashcards and questions

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

---

## 📁 Project Structure

```
medtutor-ai/
├── public/              # Frontend (HTML/CSS/JS)
│   ├── css/
│   │   ├── design-system.css    # Core design system
│   │   ├── app.css              # App-specific styles
│   │   └── login.css            # Auth pages styles
│   ├── js/
│   │   ├── utils.js             # Utility functions
│   │   ├── auth.js              # Authentication
│   │   ├── app.js               # Chat Tutor
│   │   ├── flashcards.js        # Flashcards
│   │   ├── qbank.js             # QBank
│   │   └── stats.js             # Performance stats
│   ├── index.html               # Chat Tutor (Home)
│   ├── flashcards.html
│   ├── qbank.html
│   ├── stats.html
│   ├── login.html
│   └── register.html
├── server/              # Backend (Node.js/Express)
│   ├── config/
│   │   └── database.js          # PostgreSQL config
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── chat.js              # Chat/RAG endpoints
│   │   ├── flashcards.js        # Flashcard endpoints
│   │   ├── qbank.js             # QBank endpoints
│   │   └── stats.js             # Stats endpoints
│   └── services/
│       └── gemini.js            # Gemini AI integration
├── scripts/
│   ├── init-db.js               # Database schema
│   └── seed-data.js             # Sample data
├── server.js                    # Entry point
├── package.json
└── README.md
```

---

## 🔑 Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key and add it to your `.env` file

---

## 🗄️ Database Schema

### Core Tables

- **users** - User accounts
- **content_chunks** - Medical notes with vector embeddings (for RAG)
- **chat_sessions** - Chat conversation sessions
- **chat_messages** - Individual chat messages
- **flashcard_decks** - Flashcard collections
- **flashcards** - Individual flashcards
- **flashcard_reviews** - SRS review data
- **questions** - MCQ question bank
- **qbank_sessions** - Test sessions
- **question_attempts** - Individual question attempts
- **study_activity** - Study tracking for analytics

---

## 🎯 Features Implemented

### ✅ Authentication
- User registration
- Login with JWT
- Protected routes

### ✅ Chat Tutor (RAG-powered)
- AI responses using Gemini
- Vector similarity search
- Source citation
- Multiple modes (Standard, Mnemonic, Rapid)
- Generate flashcards/questions from chat

### ✅ Flashcards
- Spaced Repetition System (SM-2 algorithm)
- Manual card creation
- AI generation from topics
- Deck management
- Review sessions

### ✅ QBank
- Multiple test modes (Quick, Practice, Subject, Grand Mock)
- Timed and untimed tests
- Detailed explanations
- Performance tracking
- AI question generation

### ✅ Performance Analytics
- Study streak tracking
- Subject-wise breakdown
- Weak area identification
- AI-powered study recommendations
- Activity charts

---

## 🧪 Testing the Application

1. **Start the server**: `npm run dev`
2. **Open browser**: `http://localhost:3000`
3. **Login**: Use demo credentials or register a new account
4. **Try features**:
   - Chat Tutor: Ask medical questions
   - Flashcards: Review cards or generate new ones
   - QBank: Take a practice test
   - Stats: View your performance

---

## 🔧 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check credentials in `.env`
- Verify database `medtutor_db` exists

### Gemini API Error
- Verify API key is correct
- Check internet connection
- Ensure API quota is not exceeded

### Port Already in Use
- Change `PORT` in `.env`
- Or stop the process using port 3000

---

## 📚 Adding Your Own Medical Content

To add custom medical notes for RAG:

```javascript
// Example: Add content via API or directly in database
const { generateEmbedding } = require('./server/services/gemini');

const newContent = {
  subject: 'Cardiology',
  topic: 'Atrial Fibrillation',
  text: 'Your detailed medical notes here...',
};

const embedding = await generateEmbedding(newContent.text);

await query(
  'INSERT INTO content_chunks (subject, topic, text, embedding) VALUES ($1, $2, $3, $4)',
  [newContent.subject, newContent.topic, newContent.text, `[${embedding.join(',')}]`]
);
```

---

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use a strong `JWT_SECRET` (minimum 32 characters)
- [ ] Configure production database
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS for your domain
- [ ] Set up proper logging
- [ ] Enable database backups

### Recommended Platforms
- **Backend**: Railway, Render, Heroku
- **Database**: Railway PostgreSQL, Supabase, AWS RDS
- **Frontend**: Vercel, Netlify (if separated)

---

## 📖 API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Chat
```
POST /api/chat/message
GET /api/chat/sessions
GET /api/chat/sessions/:id
GET /api/chat/last-session
```

### Flashcards
```
GET /api/flashcards/decks
POST /api/flashcards/generate
GET /api/flashcards/due-today
GET /api/flashcards/next
POST /api/flashcards/review
GET /api/flashcards
POST /api/flashcards
POST /api/flashcards/from-answer
```

### QBank
```
POST /api/qbank/start-session
POST /api/qbank/answer
POST /api/qbank/session/:id/complete
GET /api/qbank/session/:id
POST /api/qbank/generate
POST /api/qbank/generate-from-answer
```

### Stats
```
GET /api/stats/overview
GET /api/stats/by-subject
GET /api/stats/activity
GET /api/stats/accuracy
GET /api/stats/today-plan
```

---

## 🤝 Support

For issues or questions, check:
- Project README
- Database schema in `scripts/init-db.js`
- API routes in `server/routes/`

---

## 📄 License

MIT
