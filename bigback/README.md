<a href="https://chat.vercel.ai/">
  <img alt="Next.js 16 and App Router-ready AI chatbot." src="app/(chat)/opengraph-image.png">
  <h1 align="center">Bigback AI Chatbot</h1>
</a>

<p align="center">
    A production-ready AI chatbot template built with Next.js 16, Vercel AI SDK, and modern web technologies. Features multi-model AI integration, real-time streaming, document creation, and comprehensive authentication.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#architecture"><strong>Architecture</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#api-documentation"><strong>API Docs</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#development"><strong>Development</strong></a>
</p>
<br/>

## Features

### 🤖 **AI & Chat**
- **Multi-Model Support**: Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok
- **Real-time Streaming**: Instant AI responses with streaming text generation
- **Tool Calling**: Weather information, document creation, artifact management
- **Reasoning Models**: Extended thinking capabilities for complex tasks
- **Message Voting**: Upvote/downvote messages for quality feedback
- **Auto-resume**: Continue interrupted conversations seamlessly

### 🔐 **Authentication & Security**
- **Dual Authentication**: Regular users + guest access for immediate use
- **NextAuth.js v5**: Secure session management with JWT tokens
- **Route Protection**: Middleware-based access control
- **Password Security**: bcrypt hashing for user credentials
- **Rate Limiting**: User-type based API limits and entitlements

### 📊 **Data & Persistence**
- **PostgreSQL Database**: Type-safe queries with Drizzle ORM
- **Chat History**: Persistent conversation storage with pagination
- **Document Management**: Create and edit artifacts (code, text, spreadsheets, images)
- **AI Suggestions**: Collaborative document improvement with AI assistance
- **Database Migrations**: Automated schema management

### 🎨 **UI & UX**
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Themes**: System preference detection and manual toggle
- **Rich Text Editing**: CodeMirror and ProseMirror integration
- **File Attachments**: Support for multimodal inputs
- **Toast Notifications**: User feedback with Sonner

### 🚀 **Developer Experience**
- **Next.js 16**: App Router with Server Components and Server Actions
- **TypeScript**: Full type safety throughout the application
- **ESLint/Prettier**: Code quality and formatting standards
- **Hot Reload**: Fast development with Turbopack
- **Component Library**: 100+ reusable UI components

### 🛠 **Tools & Integrations**
- **Vercel AI Gateway**: Unified access to multiple AI providers
- **OpenTelemetry**: Performance monitoring and tracing
- **Analytics**: Built-in usage tracking
- **Error Handling**: Structured error responses with custom error classes

## Architecture

### **Project Structure**
```
bigback/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   ├── api/auth/             # NextAuth API routes
│   │   └── actions.ts            # Server actions
│   ├── (chat)/                   # Chat routes
│   │   ├── chat/[id]/            # Individual chat pages
│   │   ├── api/                  # Chat API endpoints
│   │   └── actions.ts            # Chat server actions
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components (100+ files)
│   ├── ui/                       # shadcn/ui components
│   ├── ai-elements/              # AI-specific components
│   └── [feature]/                # Feature-specific components
├── lib/                          # Core business logic
│   ├── ai/                       # AI integration layer
│   │   ├── models.ts             # Model definitions
│   │   ├── providers.ts          # AI providers
│   │   ├── prompts.ts            # System prompts
│   │   └── tools/                # AI tool implementations
│   ├── db/                       # Database layer
│   │   ├── schema.ts             # Drizzle schema
│   │   ├── queries.ts            # Database operations
│   │   └── migrations/           # Migration files
│   ├── types.ts                  # TypeScript definitions
│   └── utils.ts                  # Utility functions
├── hooks/                        # Custom React hooks
├── middleware.ts                 # Route protection
└── [config files]                # next.config.ts, drizzle.config.ts, etc.
```

### **Technology Stack**
- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5.6.3
- **AI**: Vercel AI SDK 6.0.37, AI Gateway 3.0.15
- **Database**: PostgreSQL with Drizzle ORM 0.34.0
- **Authentication**: NextAuth.js 5.0.0-beta.25
- **UI**: React 19.0.1, Tailwind CSS 4.1.13, shadcn/ui
- **State**: SWR 2.2.5 for data fetching
- **Package Manager**: pnpm 9.12.3

### **Modularization Principles**
- **Route Groups**: Logical separation of auth `(auth)` and chat `(chat)` features
- **Server Actions**: Mutations handled server-side for better performance
- **API Routes**: RESTful endpoints with proper error handling
- **Custom Hooks**: Shared logic extraction for reusability
- **Type Safety**: Comprehensive TypeScript coverage
- **Error Boundaries**: Structured error handling with custom error classes

## Model Providers

This application uses the **Vercel AI Gateway** for unified access to multiple AI models through a single interface.

### **Supported Models**

| Provider | Models | Capabilities |
|----------|--------|--------------|
| **Anthropic** | Claude 3.5 Haiku, Sonnet, Opus<br>Claude 3.7 Sonnet (Thinking) | Text generation, tool calling, reasoning |
| **OpenAI** | GPT-4o Mini, GPT-4o | Advanced reasoning, multimodal |
| **Google** | Gemini 2.0 Flash, Gemini 1.5 Pro | Fast responses, multimodal |
| **xAI** | Grok-2 Vision, Grok-3<br>Grok Code Fast (Thinking) | Creative tasks, real-time knowledge |

### **Default Configuration**
- **Primary Model**: `google/gemini-2.0-flash-lite`
- **Title Generation**: Optimized for concise chat titles
- **Artifact Creation**: Specialized prompts for document generation
- **Reasoning**: Extended thinking budgets for complex tasks

### **AI Gateway Authentication**

**For Vercel Deployments**: Authentication is handled automatically via OIDC tokens.

**For Local/Non-Vercel Deployments**: Set the `AI_GATEWAY_API_KEY` environment variable.

```bash
# Generate or obtain your AI Gateway API key
# Set in .env.local
AI_GATEWAY_API_KEY=your_gateway_api_key_here
```

### **Tool Integration**
The AI system includes built-in tools for enhanced functionality:
- **Weather Tool**: Real-time weather information
- **Document Creation**: Generate code, text, spreadsheets, and images
- **Artifact Management**: Update and modify created documents
- **AI Suggestions**: Collaborative document improvement

## API Documentation

### **Authentication Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth.js handlers |
| `POST` | `/api/auth/guest` | Create guest session |

### **Chat Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/chat` | Send chat message (streaming) | ✅ |
| `DELETE` | `/api/chat?id={chatId}` | Delete chat | ✅ |
| `GET` | `/api/history` | Get chat history (paginated) | ✅ |
| `DELETE` | `/api/history` | Delete all user chats | ✅ |
| `GET` | `/api/vote?chatId={id}` | Get message votes | ✅ |
| `PATCH` | `/api/vote` | Vote on message | ✅ |

### **Document & Artifact Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/document?id={id}` | Get document | ✅ |
| `POST` | `/api/document?id={id}` | Create/update document | ✅ |
| `DELETE` | `/api/document?id={id}&timestamp={ts}` | Delete document version | ✅ |
| `GET` | `/api/suggestions` | Get document suggestions | ✅ |

### **Request/Response Examples**

**Send Chat Message:**
```typescript
POST /api/chat
Content-Type: application/json

{
  "id": "chat_123",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?",
      "attachments": []
    }
  ],
  "model": "google/gemini-2.0-flash-lite"
}
```

**Response (Streaming):**
```
data: {"type":"text","content":"Hello! I'm doing well, thank you for asking."}
data: {"type":"finish","finishReason":"stop"}
```

**Get Chat History:**
```typescript
GET /api/history?limit=20&starting_after=chat_123
```

## Setup

### **Prerequisites**
- **Node.js**: 18.17.0 or later
- **pnpm**: 9.12.3 (recommended)
- **PostgreSQL**: Database instance (local or cloud)

### **1. Clone & Install**
```bash
git clone <repository-url>
cd bigback
pnpm install
```

### **2. Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Generate secure AUTH_SECRET
openssl rand -base64 32
```

**Required Environment Variables:**
```env
# Authentication (Required)
AUTH_SECRET=<generated-32-byte-secret>

# Database (Required)
POSTGRES_URL=postgresql://username:password@localhost:5432/bigback

# AI Gateway (Required for local development)
AI_GATEWAY_API_KEY=<your-gateway-api-key>

# Optional: Analytics, Monitoring
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

### **3. Database Setup**
```bash
# Generate migration (if schema changed)
pnpm db:generate

# Run migrations
pnpm db:migrate

# Optional: View database
pnpm db:studio
```

### **4. Development Server**
```bash
# Start development server with Turbopack
pnpm dev

# Access at http://localhost:3000
```

### **5. Test Authentication**
- **Regular User**: Register at `/register` or login at `/login`
- **Guest User**: Access protected routes directly (auto-created session)
- **Test Account**: `test@example.com` / `Test1234` (if configured)

## Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/templates/next.js/nextjs-ai-chatbot)

**Automated Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Pull environment variables
vercel env pull

# Deploy
vercel --prod
```

**Environment Variables on Vercel:**
- `AUTH_SECRET`: Generate new secret for production
- `POSTGRES_URL`: Use Neon Postgres or similar
- `AI_GATEWAY_API_KEY`: Automatic (OIDC) on Vercel

### **Manual Deployment**
The application can be deployed to any platform supporting Node.js:
- **Railway**
- **Render**
- **AWS/GCP/Azure**
- **Self-hosted**

**Build Commands:**
```bash
# Install dependencies
pnpm install

# Run migrations
pnpm db:migrate

# Build application
pnpm build

# Start production server
pnpm start
```

## Development

### **Code Quality**
```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check
```

### **Database Management**
```bash
# Generate new migration
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Reset database
pnpm db:reset

# View database in browser
pnpm db:studio
```

### **Available Scripts**
```json
{
  "dev": "next dev --turbo",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "type-check": "tsc --noEmit",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "tsx lib/db/migrate.ts",
  "db:studio": "drizzle-kit studio",
  "db:reset": "tsx lib/db/reset.ts"
}
```

### **Project Conventions**

**File Naming:**
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Pages: `page.tsx`, `layout.tsx`
- API Routes: `route.ts`

**Code Style:**
- TypeScript strict mode enabled
- ESLint with Next.js rules
- Prettier for consistent formatting
- Import organization: React → Third-party → Local

**Git Workflow:**
- Feature branches from `main`
- Conventional commits
- Pull requests for code review
- Automated testing on CI/CD

### **Adding New Features**

**AI Models:**
1. Add model definition in `lib/ai/models.ts`
2. Update provider configuration in `lib/ai/providers.ts`
3. Test integration in chat interface

**Database Schema:**
1. Update schema in `lib/db/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Update queries in `lib/db/queries.ts`

**API Endpoints:**
1. Create route file in appropriate `api/` directory
2. Add validation with Zod schemas
3. Implement error handling with `ChatSDKError`

### **Testing**
- **Authentication**: Test login/register/guest flows
- **Chat**: Test streaming, tool calling, message persistence
- **Database**: Verify migrations and data integrity
- **UI**: Test responsive design and accessibility

### **Performance Optimization**
- **Server Components**: Use RSCs for static content
- **Streaming**: Implement progressive loading
- **Caching**: Leverage Next.js caching strategies
- **Bundle Analysis**: Monitor bundle size with `next build --analyze`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with proper TypeScript types
4. Test thoroughly (authentication, chat, database)
5. Submit a pull request with a clear description

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

- **Documentation**: See inline code comments and JSDoc
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions
- **Authentication Guide**: See `AUTHENTICATION_GUIDE.md` for detailed auth setup

---

**Built with ❤️ using Next.js, Vercel AI SDK, and modern web technologies.**
