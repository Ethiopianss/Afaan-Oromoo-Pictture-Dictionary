# Afaan Oromo Picture Dictionary - Technical Documentation

## Architecture Overview

This application follows a modern full-stack architecture using Laravel as the backend API and React with Inertia.js for the frontend.

### Technology Stack

**Backend:**
- Laravel 11 (PHP 8.2+)
- SQLite3 database
- Inertia.js server-side adapter

**Frontend:**
- React 19 with TypeScript
- Fluent UI (Microsoft Design System)
- Tailwind CSS 4
- Vite build tool

**State Management:**
- Inertia.js (eliminates need for separate API layer)
- React hooks for local state

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'learner', -- learner, contributor, admin
    remember_token VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    name_oromo VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Words Table
```sql
CREATE TABLE words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_oromo VARCHAR(255) NOT NULL,
    word_english VARCHAR(255) NOT NULL,
    definition TEXT,
    image_path VARCHAR(255),
    audio_path VARCHAR(255),
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

### Quiz Attempts Table
```sql
CREATE TABLE quiz_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category_id INTEGER,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Contributions Table
```sql
CREATE TABLE contributions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    word_oromo VARCHAR(255) NOT NULL,
    word_english VARCHAR(255) NOT NULL,
    definition TEXT,
    image_path VARCHAR(255),
    audio_path VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

## API Endpoints

### Public Endpoints

#### GET /
**Description:** Home page with search functionality  
**Response:** Inertia page component

#### GET /search?q={query}
**Description:** Search for words by Oromo or English name  
**Parameters:**
- `q` (string, required): Search query
**Response:**
```json
[
    {
        "id": 1,
        "word_oromo": "Saree",
        "word_english": "Dog",
        "definition": "A domesticated animal",
        "category": "Animals",
        "image_path": null,  // null if not authenticated
        "audio_path": null   // null if not authenticated
    }
]
```

#### GET /categories
**Description:** List all categories with word counts  
**Response:** Inertia page with categories array

#### GET /categories/{id}
**Description:** View all words in a category  
**Parameters:**
- `id` (integer, required): Category ID
**Response:** Inertia page with category and words

### Authentication Endpoints

#### GET /register
**Description:** Registration page  
**Response:** Inertia page component

#### POST /register
**Description:** Create new user account  
**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```
**Response:** Redirect to home page with authenticated session

#### GET /login
**Description:** Login page  
**Response:** Inertia page component

#### POST /login
**Description:** Authenticate user  
**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123",
    "remember": false
}
```
**Response:** Redirect to intended page or home

#### POST /logout
**Description:** Logout current user  
**Response:** Redirect to home page

### Protected Endpoints (Require Authentication)

#### GET /words/{id}
**Description:** View detailed word information  
**Parameters:**
- `id` (integer, required): Word ID
**Response:** Inertia page with full word details including images and audio

#### GET /quiz
**Description:** Quiz interface and history  
**Response:** Inertia page with recent quiz attempts

#### POST /quiz/start
**Description:** Start a new quiz session  
**Request Body:**
```json
{
    "category_id": 1  // optional, null for mixed categories
}
```
**Response:**
```json
[
    {
        "id": 1,
        "word_oromo": "Saree",
        "word_english": "Dog",
        "image_path": "/storage/images/dog.jpg",
        "category": {
            "id": 1,
            "name": "Animals"
        }
    }
    // ... 9 more questions
]
```

#### POST /quiz/submit
**Description:** Submit quiz results  
**Request Body:**
```json
{
    "category_id": 1,  // optional
    "score": 8,
    "total_questions": 10
}
```
**Response:**
```json
{
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "score": 8,
    "total_questions": 10,
    "created_at": "2026-02-07T09:00:00.000000Z"
}
```

### Contributor Endpoints (Require Authentication)

#### GET /contributor/dashboard
**Description:** View contributor's submission history  
**Response:** Inertia page with user's contributions

#### GET /contributor/create
**Description:** Word contribution form  
**Response:** Inertia page with submission form

#### POST /contributor/store
**Description:** Submit new word contribution  
**Request Body:** (multipart/form-data)
```json
{
    "word_oromo": "Saree",
    "word_english": "Dog",
    "definition": "A domesticated animal",
    "category_id": 1,
    "image": "file",  // optional
    "audio": "file"   // optional
}
```
**Response:** Redirect to contributor dashboard

### Admin Endpoints (Require Authentication + Admin Role)

#### GET /admin/dashboard
**Description:** Admin panel with pending contributions and user management  
**Response:** Inertia page with contributions and users

#### POST /admin/contributions/{id}/approve
**Description:** Approve a pending contribution  
**Response:** Redirect to admin dashboard

#### POST /admin/contributions/{id}/reject
**Description:** Reject a pending contribution  
**Response:** Redirect to admin dashboard

#### POST /admin/users/{id}/role
**Description:** Update user role  
**Request Body:**
```json
{
    "role": "contributor"  // learner, contributor, or admin
}
```
**Response:** Redirect to admin dashboard

#### DELETE /admin/users/{id}
**Description:** Delete a user  
**Response:** Redirect to admin dashboard

#### DELETE /admin/words/{id}
**Description:** Delete a word  
**Response:** Redirect to admin dashboard

## Component Structure

### Layout Component
**Location:** `resources/js/layouts/Layout.tsx`

**Purpose:** Main application wrapper with navigation

**Features:**
- Responsive navigation bar
- User authentication state display
- Role-based navigation (learner, contributor, admin)
- Ethiopian flag color scheme
- Fluent UI theming

### Page Components

#### Home.tsx
**Features:**
- Search input with real-time results
- Word cards with conditional image/audio display
- Guest vs authenticated user views

#### Category/Index.tsx
**Features:**
- Grid layout of all categories
- Word count display
- Hover effects
- Bilingual category names

#### Category/Show.tsx
**Features:**
- Category header with Oromo name
- Word grid with full details
- Conditional media display for authenticated users

#### Quiz/Index.tsx
**Features:**
- Quiz start interface
- Question display with images
- Multiple choice answers
- Score tracking
- Quiz history display

#### Auth/Login.tsx & Auth/Register.tsx
**Features:**
- Form validation
- Error display
- Inertia.js form handling
- Responsive design

## Security Features

### Authentication
- Laravel's built-in authentication system
- Password hashing with bcrypt
- Session-based authentication
- CSRF protection on all POST requests

### Authorization
- Middleware protection for authenticated routes
- User-specific data access (quiz attempts)
- Guest restrictions on media content

### Data Validation
- Server-side validation on all form submissions
- Type-safe TypeScript on frontend
- SQL injection prevention via Eloquent ORM

## Accessibility Features

### WCAG 2.1 Compliance
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- High contrast color scheme (red, green, black, white)

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Readable font sizes

### Screen Reader Support
- Proper heading hierarchy
- Alt text for images
- Form labels
- Status messages

## Performance Optimizations

### Frontend
- Code splitting with Vite
- React 19 compiler optimizations
- Lazy loading of images
- Minimal bundle size

### Backend
- Eager loading of relationships (N+1 prevention)
- Database indexing on foreign keys
- Efficient query design
- SQLite for fast local development

## Development Workflow

### Local Development
```bash
# Terminal 1: Backend
php artisan serve

# Terminal 2: Frontend
npm run dev
```

### Building for Production
```bash
npm run build
php artisan config:cache
php artisan route:cache
```

### Database Management
```bash
# Reset database
php artisan migrate:fresh

# Seed categories
php artisan db:seed --class=CategorySeeder

# Seed sample words
php artisan db:seed --class=SampleWordSeeder
```

### Code Quality
```bash
# TypeScript type checking
npm run types

# ESLint
npm run lint

# Prettier formatting
npm run format

# PHP formatting (Pint)
./vendor/bin/pint
```

## Testing Strategy

### Manual Testing Checklist

**Guest User:**
- [ ] Can view home page
- [ ] Can search for words
- [ ] Can see word translations
- [ ] Cannot see images/audio
- [ ] Can view categories
- [ ] Can view category words
- [ ] Cannot access quiz

**Authenticated User:**
- [ ] Can register new account
- [ ] Can login
- [ ] Can search and see full results
- [ ] Can view images and audio
- [ ] Can start quiz
- [ ] Can complete quiz
- [ ] Can view quiz history
- [ ] Can logout

### Future Testing Improvements
- PHPUnit tests for controllers
- React Testing Library for components
- E2E tests with Playwright
- API endpoint tests

## Deployment Considerations

### Requirements
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite3 (or MySQL/PostgreSQL for production)
- Web server (Apache/Nginx)

### Environment Variables
```env
APP_NAME="Afaan Oromo Dictionary"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=sqlite
# Or for MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=afaan_oromo
# DB_USERNAME=root
# DB_PASSWORD=
```

### Production Deployment Steps
1. Clone repository
2. Run `composer install --optimize-autoloader --no-dev`
3. Run `npm install && npm run build`
4. Copy `.env.example` to `.env` and configure
5. Run `php artisan key:generate`
6. Run `php artisan migrate --force`
7. Run `php artisan db:seed --class=CategorySeeder`
8. Run `php artisan storage:link`
9. Set proper file permissions
10. Configure web server

## Future Enhancements

### Phase 1 (MVP Complete) ✅
- User authentication
- Word search
- Category browsing
- Basic quiz functionality
- Progress tracking

### Phase 2 (Planned)
- Community word contributions
- Audio recording in-app
- Advanced quiz modes (listening, spelling)
- User profiles with statistics
- Spaced repetition algorithm

### Phase 3 (Future)
- Mobile app (React Native)
- Offline mode with PWA
- Social features (sharing, leaderboards)
- Admin dashboard
- Content moderation system

## Troubleshooting Guide

### Common Issues

**Issue: Blank page after login**
- Check browser console for errors
- Verify Inertia middleware is configured
- Clear Laravel cache: `php artisan cache:clear`

**Issue: Images not displaying**
- Run `php artisan storage:link`
- Check file paths in database
- Verify files exist in storage directory

**Issue: Quiz not starting**
- Check if words exist in database
- Verify CSRF token is present
- Check browser console for fetch errors

**Issue: Styles not loading**
- Run `npm run build`
- Clear browser cache
- Check Vite manifest exists in public/build

## Contributing Guidelines

### Code Style
- Follow PSR-12 for PHP
- Use ESLint/Prettier for TypeScript/React
- Write descriptive commit messages
- Comment complex logic

### Pull Request Process
1. Create feature branch
2. Make changes with tests
3. Run code quality checks
4. Submit PR with description
5. Address review feedback

## License

Educational project for MWU Web Programming course.

## Contact

For questions or support, contact the development team.

---

**Last Updated:** February 7, 2026
