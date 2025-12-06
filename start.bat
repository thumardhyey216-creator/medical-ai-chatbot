@echo off
echo ===================================================
echo   MedTutor AI - Quick Start Script
echo ===================================================
echo.

REM Check if .env exists
if not exist .env (
    echo [1/5] Creating .env file...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit .env and add your Gemini API key!
    echo    Get it from: https://makersuite.google.com/app/apikey
    echo.
    pause
) else (
    echo ✓ .env file already exists
)

echo.
echo [2/5] Installing dependencies...
call npm install

echo.
echo [3/5] Setting up database...
echo.
echo Make sure PostgreSQL is running and you have created 'medtutor_db' database.
echo Run: createdb medtutor_db
echo.
set /p continue="Continue with database setup? (y/n): "
if /i "%continue%"=="y" (
    echo.
    echo Initializing database schema...
    call npm run init-db
    
    echo.
    set /p seed="Seed sample data? (y/n): "
    if /i "%seed%"=="y" (
        call npm run seed
    )
)

echo.
echo [4/5] Starting server...
echo.
echo ===================================================
echo   Server will start on: http://localhost:3000
echo.
echo   Demo Login:
echo   Email: demo@medtutor.ai
echo   Password: demo123
echo ===================================================
echo.

call npm run dev
