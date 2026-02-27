### Blog News Platform

A simple blog news platform built with Next.js, Prisma, and MongoDB.
Users can browse and read articles, while admins can manage blog posts.

### Features
## User
- View list of blog posts
- View blog post details
- Responsive UI

## Admin

- Create new posts
- Edit posts
- Delete posts
- Manage all blog articles

### Tech Stack
## Frontend & Backend

- Next.js (App Router)
- React
- API Routes
- Database
- MongoDB
- Prisma ORM

### Installation & Setup
- Clone project
git clone https://github.com/your-username/blog-news.git
cd blog-news

- Install dependencies
npm install

- Setup environment variables
Create a .env file:
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/blog"
NEXTAUTH_SECRET=your_secret_key

- Prisma setup

Generate Prisma client:
npx prisma generate
Push schema to database:
npx prisma db push

- Run development server
npm run dev

### Role Concept
- Role	Permission
- User	View posts
- Admin	Full CRUD posts

### Screenshots
- Homepage (Post List)
- Post Detail Page
- Admin Dashboard

### Deployment

- Vercel VPS


