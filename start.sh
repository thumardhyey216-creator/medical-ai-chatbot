#!/bin/bash

echo "==================================================="
echo "  MedTutor AI - Quick Start Script"
echo "==================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "[1/5] Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your Gemini API key!"
    echo "   Get it from: https://makersuite.google.com/app/apikey"
    echo ""
    read -p "Press enter to continue..."
else
    echo "✓ .env file already exists"
fi

echo ""
echo "[2/5] Installing dependencies..."
npm install

echo ""
echo "[3/5] Setting up database..."
echo ""
echo "Make sure PostgreSQL is running and you have created 'medtutor_db' database."
echo "Run: createdb medtutor_db"
echo ""
read -p "Continue with database setup? (y/n): " continue
if [ "$continue" = "y" ]; then
    echo ""
    echo "Initializing database schema..."
    npm run init-db
    
    echo ""
    read -p "Seed sample data? (y/n): " seed
    if [ "$seed" = "y" ]; then
        npm run seed
    fi
fi

echo ""
echo "[4/5] Starting server..."
echo ""
echo "==================================================="
echo "  Server will start on: http://localhost:3000"
echo ""
echo "  Demo Login:"
echo "  Email: demo@medtutor.ai"
echo "  Password: demo123"
echo "==================================================="
echo ""

npm run dev
