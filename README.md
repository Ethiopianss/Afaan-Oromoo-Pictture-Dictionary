# Afaan Oromo Picture Dictionary

A comprehensive web application for learning Afaan Oromo through visual aids, audio pronunciations, and interactive quizzes. Features a role-based system with learners, contributors, and administrators.

## Tech Stack

- **Backend**: Laravel 11 (PHP)
- **Frontend**: React 19 with TypeScript
- **UI Framework**: Fluent UI (Microsoft)
- **Database**: SQLite3
- **State Management**: Inertia.js
- **Styling**: Tailwind CSS + Fluent UI

## Features

### For All Users (Public)
- **Search Words**: Search for Afaan Oromo words and get English translations
- **Browse Categories**: Explore 10 different word categories
- **Featured Words**: View highlighted vocabulary on the home page

### For Learners (Authenticated Users)
- **Visual Learning**: View pictures and hear pronunciations
- **Interactive Quizzes**: Test vocabulary knowledge with image-based questions
- **Progress Tracking**: Track quiz scores and performance over time
- **Word Details**: Access full word information including definitions and audio

### For Contributors
- **Submit New Words**: Contribute new vocabulary entries to the dictionary
- **Contribution Dashboard**: Track submitted words and their approval status
- **Add Media**: Upload images and audio files for word entries
- **Category Assignment**: Organize contributions by category

### For Administrators
- **Review Contributions**: Approve or reject word submissions from contributors
- **User Management**: Manage user roles (learner, contributor, admin)
- **Content Moderation**: Delete inappropriate words or users
- **System Overview**: Monitor all contributions and user activity

### Categories
1. Animals (Bineensota)
2. Food and Drinks (Nyaataa fi Dhugaatii)
3. Clothing (Uffata)
4. Family and People (Maatii fi Namoota)
5. Household Items (Meeshaalee Manaa)
6. Parts of the Body (Qaamolee Qaamaa)
7. Transportation (Geejjiba)
8. Education and School (Barnoota fi Mana Barumsaa)
9. Nature (Uumama)
10. Jobs and Professions (Hojii fi Ogummaa)

## Project Structure

### Backend (Laravel)

#### Models
- `User.php` - User authentication, profile, and role management (learner, contributor, admin)
- `Category.php` - Word categories
- `Word.php` - Dictionary entries with Oromo/English translations
- `QuizAttempt.php` - Quiz history and scores
- `Contribution.php` - User-submitted word contributions pending approval

#### Controllers
- `AuthController.php` - Registration, login, logout
- `WordController.php` - Word search, display, and featured words
- `CategoryController.php` - Category browsing
- `QuizController.php` - Quiz generation and scoring
- `ContributorController.php` - Word contribution submission and dashboard
- `AdminController.php` - Contribution approval, user management, content moderation

#### Database Schema

**users**
- id, name, email, password, role (learner/contributor/admin), timestamps

**categories**
- id, name, name_oromo, timestamps

**words**
- id, word_oromo, word_english, definition, image_path, audio_path, category_id, timestamps

**contributions**
- id, user_id, category_id, word_oromo, word_english, definition, image_path, audio_path, status (pending/approved/rejected), timestamps

**quiz_attempts**
- id, user_id, category_id, score, total_questions, timestamps

### Frontend (React)

#### Pages
- `Home.tsx` - Landing page with search functionality and featured words
- `welcome.tsx` - Welcome/splash page
- `Auth/Login.tsx` - User login
- `Auth/Register.tsx` - User registration
- `Category/Index.tsx` - Category listing
- `Category/Show.tsx` - Words in a category
- `Quiz/Index.tsx` - Quiz interface and history
- `Contributor/Dashboard.tsx` - Contributor's submission history
- `Contributor/Create.tsx` - New word contribution form
- `Admin/Dashboard.tsx` - Admin panel for managing contributions and users

#### Components
- `WordSlider.tsx` - Featured words carousel

#### Layout
- `Layout.tsx` - Main application layout with role-based navigation

## Color Scheme

The application uses the Ethiopian flag colors:
- **Red** (#dc143c) - Primary accent, headings
- **Green** (#228b22) - Secondary accent, buttons
- **White** (#ffffff) - Background, text
- **Black** (#000000) - Text, borders

## Installation

1. **Clone the repository**
```bash
cd "/home/yazeedmahad2018/Desktop/MWU courses/Third Year/1stSemester/Web-programming/Afaan-oromoo"
```

2. **Install PHP dependencies**
```bash
composer install
```

3. **Install Node dependencies**
```bash
npm install
```

4. **Set up environment**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Run migrations and seed database**
```bash
php artisan migrate:fresh
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=SampleWordSeeder
php artisan db:seed --class=AdminSeeder
php artisan db:seed --class=ContributorSeeder
```

6. **Create storage link**
```bash
php artisan storage:link
```

7. **Build frontend assets**
```bash
npm run build
# or for development
npm run dev
```

8. **Start the server**
```bash
php artisan serve
```

Visit `http://localhost:8000` in your browser.

## Default Users

After seeding, you can login with these accounts:

**Admin Account**
- Email: admin@afaanoromo.com
- Password: password

**Contributor Account**
- Email: contributor@afaanoromo.com
- Password: password

**Learner Account**
- Register a new account (default role is learner)

## Usage

### For Learners

1. **Browse without login**: Search for words and see basic translations
2. **Register/Login**: Access pictures, audio pronunciations, and quizzes
3. **Search**: Use the search bar on the home page to find words
4. **Browse Categories**: Click "Categories" to explore organized vocabulary
5. **Take Quizzes**: Click "Quiz" (when logged in) to test your knowledge

### For Contributors

1. **Login**: Use contributor credentials or request contributor role from admin
2. **Submit Words**: Navigate to "Contribute" to add new words
3. **Upload Media**: Add images and audio files for your submissions
4. **Track Status**: View your contribution history and approval status in the dashboard

### For Administrators

1. **Login**: Use admin credentials
2. **Review Contributions**: Approve or reject pending word submissions
3. **Manage Users**: Change user roles or remove users
4. **Moderate Content**: Delete inappropriate words or contributions

### Adding Words (Admin/Developer)

Words can be added directly to the database or through a seeder:

```php
use App\Models\Word;

Word::create([
    'word_oromo' => 'Saree',
    'word_english' => 'Dog',
    'definition' => 'A domesticated animal',
    'image_path' => '/storage/images/dog.jpg',
    'audio_path' => '/storage/audio/dog.mp3',
    'category_id' => 1, // Animals
]);
```

## API Endpoints

### Public Routes
- `GET /` - Home page
- `GET /search?q={query}` - Search words
- `GET /categories` - List categories
- `GET /categories/{id}` - View category words
- `GET /words/featured` - Get featured words
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /register` - Registration page
- `POST /register` - Create new user

### Protected Routes (Requires Authentication)
- `GET /words/{id}` - View word details
- `GET /quiz` - Quiz page
- `POST /quiz/start` - Start new quiz
- `POST /quiz/submit` - Submit quiz results
- `POST /logout` - Logout user

### Contributor Routes (Requires Authentication)
- `GET /contributor/dashboard` - View contribution history
- `GET /contributor/create` - New word contribution form
- `POST /contributor/store` - Submit new word contribution

### Admin Routes (Requires Authentication + Admin Role)
- `GET /admin/dashboard` - Admin panel
- `POST /admin/contributions/{id}/approve` - Approve contribution
- `POST /admin/contributions/{id}/reject` - Reject contribution
- `POST /admin/users/{id}/role` - Update user role
- `DELETE /admin/users/{id}` - Delete user
- `DELETE /admin/words/{id}` - Delete word

## Accessibility

The application is built with accessibility in mind:
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Responsive design for mobile and desktop
- High contrast color scheme
- Screen reader compatible

## Future Enhancements

- Audio recording functionality
- Advanced quiz modes (listening comprehension, spelling)
- User profiles with learning statistics
- Spaced repetition algorithm for vocabulary review
- Mobile app version
- Offline mode support
- Social features (word sharing, leaderboards)
- Multi-language support beyond Oromo and English

## Development

### Running in Development Mode
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

### Code Quality
```bash
# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run types
```

## License

This project is developed for educational purposes as part of the Web Programming course at MWU.

## Contributing

This is a student project. For adding words or suggesting improvements, please contact the development team.

## Acknowledgments

- Afaan Oromo language community
- Ethiopian diaspora learners
- MWU Web Programming course instructors
