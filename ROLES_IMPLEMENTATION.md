# Role-Based Access Control Implementation

## Overview
Added contributor and admin roles to the Afaan Oromo Picture Dictionary application.

## User Roles

### 1. Learner (Default)
- Search words
- Browse categories
- Take quizzes
- View word details with images and audio

### 2. Contributor
- All learner permissions
- Access to contributor dashboard
- Submit new word contributions with:
  - Oromo and English translations
  - Definitions
  - Images
  - Audio files
- View approval status of contributions
- See rejection reasons if applicable

### 3. Admin
- All contributor permissions
- Access to admin dashboard
- Approve or reject contributions
- Manage users:
  - Change user roles
  - Delete users
- View all pending contributions

## Test Accounts

### Admin Account
- Email: admin@example.com
- Password: password

### Contributor Account
- Email: contributor@example.com
- Password: password

## New Routes

### Contributor Routes (requires contributor or admin role)
- GET `/contributor/dashboard` - View contributions and their status
- GET `/contributor/create` - Form to submit new word
- POST `/contributor/store` - Submit contribution

### Admin Routes (requires admin role)
- GET `/admin/dashboard` - Manage contributions and users
- POST `/admin/contributions/{id}/approve` - Approve contribution
- POST `/admin/contributions/{id}/reject` - Reject contribution with reason
- POST `/admin/users/{id}/role` - Update user role
- DELETE `/admin/users/{id}` - Delete user

## Database Changes

### Users Table
- Added `role` column (enum: learner, contributor, admin)

### New Contributions Table
- id
- user_id (foreign key)
- category_id (foreign key)
- word_oromo
- word_english
- definition
- image_path
- audio_path
- status (enum: pending, approved, rejected)
- rejection_reason
- timestamps

## Features

### Contributor Dashboard
- List all contributions with status badges
- Color-coded status (pending=orange, approved=green, rejected=red)
- View rejection reasons
- Quick link to add new words

### Contributor Submission Form
- Category selection
- Oromo and English word fields
- Optional definition textarea
- Image upload (max 2MB)
- Audio upload (max 5MB, mp3/wav)
- Form validation

### Admin Dashboard
- Two sections:
  1. Pending Contributions - Approve/reject with reason
  2. User Management - Change roles, delete users
- Real-time status updates
- Inline rejection reason input

## Navigation Updates
- Role-based menu items appear automatically
- Contributors see "Contribute" link
- Admins see both "Contribute" and "Admin" links
- Login redirects based on role:
  - Admin → Admin Dashboard
  - Contributor → Contributor Dashboard
  - Learner → Home Page

## File Uploads
Contributions with images and audio are stored in:
- Images: `storage/app/public/contributions/images/`
- Audio: `storage/app/public/contributions/audio/`

Make sure to run: `php artisan storage:link`

## Security
- Authorization checks in all controller methods
- 403 errors for unauthorized access
- Role validation on user updates
- File upload validation (type and size)
