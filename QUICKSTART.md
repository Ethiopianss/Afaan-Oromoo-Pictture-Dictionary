# Quick Start Guide

## ✅ Setup Complete!

Your Afaan Oromo Picture Dictionary application is now ready to use.

## What's Been Created

### Backend (Laravel)
- ✅ Database migrations for users, categories, words, and quiz attempts
- ✅ Models: User, Category, Word, QuizAttempt
- ✅ Controllers: AuthController, WordController, CategoryController, QuizController
- ✅ Routes configured for all features
- ✅ 10 categories seeded
- ✅ 15 sample words added (Animals, Food, Family categories)

### Frontend (React + Fluent UI)
- ✅ Home page with search functionality
- ✅ Login and Registration pages
- ✅ Category browsing pages
- ✅ Quiz interface with progress tracking
- ✅ Responsive layout with Ethiopian flag colors
- ✅ Fluent UI components integrated

## Running the Application

### Development Mode (Recommended)

Open two terminal windows:

**Terminal 1 - Laravel Server:**
```bash
cd "/home/yazeedmahad2018/Desktop/MWU courses/Third Year/1stSemester/Web-programming/Afaan-oromoo"
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
cd "/home/yazeedmahad2018/Desktop/MWU courses/Third Year/1stSemester/Web-programming/Afaan-oromoo"
npm run dev
```

Then visit: **http://localhost:8000**

### Production Mode

```bash
npm run build
php artisan serve
```

## Testing the Application

### 1. Test Search (No Login Required)
- Go to home page
- Search for: "Saree", "Dog", "Bishaan", "Father"
- You'll see word translations but no images/audio

### 2. Register a New User
- Click "Register" in the navigation
- Fill in: Name, Email, Password
- After registration, you're automatically logged in

### 3. Browse Categories
- Click "Categories" in navigation
- You'll see all 10 categories
- Click on "Animals", "Food and Drinks", or "Family and People" to see words

### 4. Take a Quiz
- Click "Quiz" in navigation (must be logged in)
- Click "Start Quiz"
- Answer 10 random questions
- View your score and history

## Adding More Words

### Method 1: Using Tinker (Quick)
```bash
php artisan tinker
```

Then in tinker:
```php
App\Models\Word::create([
    'word_oromo' => 'Leenca',
    'word_english' => 'Lion',
    'definition' => 'A large wild cat',
    'category_id' => 1,  // Animals
]);
```

### Method 2: Create a Seeder
```bash
php artisan make:seeder YourWordSeeder
```

Edit the seeder file and run:
```bash
php artisan db:seed --class=YourWordSeeder
```

### Method 3: Direct Database Insert
Use a SQLite browser or command line:
```bash
sqlite3 database/database.sqlite
```

## Adding Images and Audio

1. **Create storage directories:**
```bash
mkdir -p storage/app/public/images
mkdir -p storage/app/public/audio
php artisan storage:link
```

2. **Add files:**
- Place images in: `storage/app/public/images/`
- Place audio in: `storage/app/public/audio/`

3. **Update words:**
```php
App\Models\Word::where('word_english', 'Dog')->update([
    'image_path' => '/storage/images/dog.jpg',
    'audio_path' => '/storage/audio/dog.mp3'
]);
```

## Project Structure

```
app/
├── Http/Controllers/
│   ├── Auth/AuthController.php
│   ├── CategoryController.php
│   ├── QuizController.php
│   └── WordController.php
├── Models/
│   ├── Category.php
│   ├── QuizAttempt.php
│   ├── User.php
│   └── Word.php

resources/js/
├── layouts/
│   └── Layout.tsx
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── Category/
│   │   ├── Index.tsx
│   │   └── Show.tsx
│   ├── Quiz/
│   │   └── Index.tsx
│   └── Home.tsx

database/
├── migrations/
│   ├── 2026_02_07_000001_create_categories_table.php
│   ├── 2026_02_07_000002_create_words_table.php
│   └── 2026_02_07_000003_create_quiz_attempts_table.php
└── seeders/
    ├── CategorySeeder.php
    └── SampleWordSeeder.php
```

## Common Commands

```bash
# Reset database and reseed
php artisan migrate:fresh --seed

# Add sample words
php artisan db:seed --class=SampleWordSeeder

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Rebuild frontend
npm run build

# Check for errors
php artisan route:list
npm run types
```

## Troubleshooting

### Issue: "Page not found"
- Make sure both Laravel and Vite servers are running
- Check `php artisan route:list` to verify routes

### Issue: "CSRF token mismatch"
- Clear browser cache
- Run `php artisan config:clear`

### Issue: "Images not showing"
- Run `php artisan storage:link`
- Check file paths in database

### Issue: "Styles not loading"
- Run `npm run build` or `npm run dev`
- Clear browser cache

## Next Steps

1. **Add more words** to each category (goal: 500+ words)
2. **Add images and audio** for existing words
3. **Customize colors** in the components if needed
4. **Add more quiz features** (category-specific quizzes, difficulty levels)
5. **Implement user profiles** with learning statistics

## Color Scheme Reference

- Red: `#dc143c` (Primary - headings, brand)
- Green: `#228b22` (Secondary - buttons, accents)
- White: `#ffffff` (Background)
- Black: `#000000` (Text)

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the code comments in controllers and components
3. Check Laravel logs: `storage/logs/laravel.log`
4. Check browser console for frontend errors

---

**Happy Learning! 🇪🇹**
