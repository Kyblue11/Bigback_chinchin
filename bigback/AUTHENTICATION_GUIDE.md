# Authentication Guide

This guide explains how authentication works in this Next.js AISDK template and how to set it up and test it.

## Overview

The application uses NextAuth.js for authentication with the following features:

- **User Registration/Login**: Email and password authentication
- **Guest Access**: Anonymous users can access the chat without registration
- **Route Protection**: Middleware ensures authenticated access to chat features
- **Session Management**: Server-side session handling with JWT tokens

## Authentication Flow

### 1. Route Protection

All chat-related routes are protected by middleware (`middleware.ts`):

- `/` (home page)
- `/chat/*` (chat pages)
- `/api/chat/*` (chat API endpoints)
- `/api/vote/*` (voting API)
- `/api/suggestions/*` (suggestions API)
- `/api/history/*` (chat history API)
- `/api/document/*` (document API)

**Unauthenticated users** are automatically redirected to `/login`.

### 2. Authentication Types

#### Regular Users
- Register with email and password
- Full access to all features
- Can create private chats
- Data persists across sessions

#### Guest Users
- No registration required
- Limited access (may have usage restrictions)
- Data may not persist across sessions
- Automatically created when accessing protected routes without authentication

## Setup Instructions

### 1. Environment Variables

Ensure your `.env` file has the required authentication variables:

```env
# Required for authentication
AUTH_SECRET=your-random-secret-here

# AI Gateway (required for chat functionality)
AI_GATEWAY_API_KEY=your-gateway-key-here

# Database (required for user data persistence)
POSTGRES_URL=your-postgres-connection-string-here
```

**Important**: Generate a secure `AUTH_SECRET`:
```bash
# Generate a random secret
openssl rand -base64 32
# Or use the online generator: https://generate-secret.vercel.app/32
```

### 2. Database Setup

The application uses PostgreSQL. Make sure your database is set up and the connection string is correct.

**Database Tables Created**:
- `User` - User accounts
- `Chat` - Chat conversations
- `Message` - Chat messages
- `Vote` - Message votes
- `Document` - Uploaded documents
- `Suggestion` - AI suggestions

### 3. Start the Application

```bash
npm install
npm run db:migrate  # Run database migrations
npm run dev         # Start development server
```

## Testing Authentication

### 1. Access Protected Routes

1. **Without Authentication**:
   - Visit `http://localhost:3000`
   - You should be redirected to `http://localhost:3000/login`

2. **With Guest Access**:
   - The middleware will create a guest session automatically
   - You can access the chat interface
   - Note: Guest users may have limited features

### 2. User Registration/Login

1. **Register a New Account**:
   - Go to `http://localhost:3000/register`
   - Fill in email and password
   - Submit the form
   - You should be redirected to the chat interface

2. **Login with Existing Account**:
   - Go to `http://localhost:3000/login`
   - Enter your email and password
   - Submit the form
   - You should be redirected to the chat interface

### 3. Session Management

- **Stay Logged In**: Sessions persist across browser refreshes
- **Logout**: Use the logout functionality in the sidebar
- **Session Expiry**: Sessions expire after a period of inactivity

## API Authentication

All protected API routes require authentication headers. The middleware and individual route handlers validate sessions:

```typescript
// In API routes, check authentication like this:
const session = await auth();
if (!session?.user) {
  return new ChatSDKError("unauthorized:api").toResponse();
}
```

## Troubleshooting

### Common Issues

1. **"Redirect loop" or "Too many redirects"**:
   - Check that your `AUTH_SECRET` is set correctly
   - Ensure the database connection is working
   - Verify middleware configuration

2. **"Unauthorized" errors on API calls**:
   - Check browser cookies are enabled
   - Verify session hasn't expired
   - Check server logs for authentication errors

3. **Database connection errors**:
   - Verify `POSTGRES_URL` is correct
   - Ensure database is running and accessible
   - Run `npm run db:migrate` to ensure tables exist

### Debug Authentication

1. **Check Session State**:
   ```javascript
   // In browser console
   // This will show the current session data
   ```

2. **Server Logs**:
   - Check Next.js server logs for authentication errors
   - Look for NextAuth.js related messages

3. **Database Queries**:
   ```sql
   -- Check users table
   SELECT * FROM "User";

   -- Check sessions
   SELECT * FROM "Session"; -- If using database sessions
   ```

## Security Considerations

- **Password Hashing**: Passwords are hashed using bcrypt-ts
- **Session Security**: JWT tokens with secure secrets
- **Route Protection**: Middleware protects all sensitive routes
- **CORS**: Properly configured for API access
- **CSRF Protection**: Built into NextAuth.js

## Advanced Configuration

### Custom User Types

The app supports different user types (`guest`, `regular`) defined in `auth.ts`:

```typescript
export type UserType = "guest" | "regular";
```

### Custom Authentication Providers

To add more auth providers (Google, GitHub, etc.), update `auth.ts`:

```typescript
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Existing providers...
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // ... rest of config
});
```

### Rate Limiting

Different user types have different rate limits defined in `lib/ai/entitlements.ts`.

## File Structure

```
app/
├── (auth)/
│   ├── auth.ts              # NextAuth configuration
│   ├── auth.config.ts       # Auth config
│   ├── login/page.tsx       # Login page
│   ├── register/page.tsx    # Registration page
│   └── actions.ts           # Auth actions
├── (chat)/
│   ├── layout.tsx           # Chat layout
│   ├── page.tsx             # Main chat page
│   ├── chat/[id]/page.tsx   # Specific chat page
│   └── api/                 # Protected API routes
middleware.ts                # Route protection
```

## Next Steps

1. Test the authentication flow thoroughly
2. Configure additional auth providers if needed
3. Set up production environment variables
4. Configure database backups
5. Monitor authentication logs for security

For more information, refer to the [NextAuth.js documentation](https://next-auth.js.org).