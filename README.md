# Claro - AI-Powered Document Intelligence Frontend

A complete Next.js 14 frontend for the Claro document intelligence application. Transform complex documents into clear, actionable insights with AI-powered analysis.

## Quick Start

### Prerequisites
- Node.js 18+ or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

#or

yarn install
```

### Environment Setup

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in the required environment variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here (generate with: openssl rand -base64 32)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase (when ready to integrate)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Claude API
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Development

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
claro/
├── app/                              # Next.js 14 App Router
│   ├── (auth)/                       # Authentication routes (login, signup)
│   ├── (dashboard)/                  # Protected dashboard routes
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── upload/page.tsx           # Document upload
│   │   ├── documents/[id]/page.tsx   # Document results
│   │   └── history/page.tsx          # Document history
│   ├── (landing)/                    # Public landing page
│   ├── api/                          # API routes
│   │   ├── auth/                     # Authentication
│   │   ├── upload/route.ts           # File upload endpoint
│   │   ├── documents/                # Document management
│   │   └── health/route.ts           # Health check
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── layout/                       # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── document/                     # Document display components
│   │   ├── SummaryCard.tsx
│   │   ├── MetricsDisplay.tsx
│   │   ├── ActionItemList.tsx
│   │   ├── FlagCard.tsx
│   │   └── ChatBar.tsx
│   ├── upload/                       # Upload components
│   │   └── FileUploader.tsx
│   └── shared/                       # Reusable components
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Loading.tsx
│       └── ErrorBoundary.tsx
├── hooks/                            # Custom React hooks
│   ├── useAuth.ts
│   ├── useDocuments.ts
│   ├── useUpload.ts
│   └── useChat.ts
├── store/                            # Zustand state management
│   └── documentStore.ts
├── types/                            # TypeScript type definitions
│   ├── document.ts
│   └── api.ts
├── lib/                              # Utility functions
├── public/                           # Static assets
├── tailwind.config.ts                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
├── next.config.js                    # Next.js config
└── package.json                      # Dependencies
```

## Frontend Pages

### 1. Landing Page (`/`)
- Hero section with product overview
- Feature highlights
- Call-to-action buttons
- Responsive design for all devices

### 2. Authentication Pages
- **Login** (`/login`) - Email/password authentication
- **Signup** (`/signup`) - New user registration

### 3. Dashboard (`/dashboard`)
- Document list with filtering and search
- Upload status tracking
- Quick statistics (total, completed, processing, failed)
- Sort by date or name

### 4. Upload Page (`/upload`)
- Drag & drop file uploader (using react-dropzone)
- Support for PDF, DOCX, TXT formats
- Max file size: 50MB
- Real-time upload progress

### 5. Document Results (`/documents/[id]`)
- **Summary Card** - Plain English overview and impact statement
- **Key Metrics** - Extracted numbers, dates, financial data
- **Action Items** - Prioritized tasks with deadlines
- **Flags & Alerts** - Risks, opportunities, inconsistencies
- **Chat Bar** - Ask follow-up questions about the document

### 6. Document History (`/history`)
- Complete document list with metadata
- Sort options (date, name)
- Delete functionality
- Quick access to analyses

## Component Library

### Shared Components

#### Button
```tsx
<Button
  variant="primary" | "secondary" | "danger"
  size="sm" | "md" | "lg"
  loading={false}
  fullWidth={false}
  onClick={() => {}}
>
  Click Me
</Button>
```

#### Badge
```tsx
<Badge
  label="High Priority"
  variant="primary" | "success" | "warning" | "error"
  size="sm" | "md" | "lg"
/>
```

#### Loading
```tsx
<Loading message="Loading documents..." />
```

#### ErrorBoundary
```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Document Components

#### SummaryCard
Displays document type, overview, and user impact statement

#### MetricsDisplay
Shows extracted key metrics with categories and confidence levels

#### ActionItemList
Priority-sorted action items with deadlines and consequences

#### FlagCard
Grouped alerts and risks organized by category

#### ChatBar
Interactive chat interface for document questions

## State Management (Zustand) (Zustand)

The app uses Zustand for lightweight state management:

```typescript
import { useDocumentStore } from '@/store/documentStore'

const {
  documents,
  selectedDocument,
  selectedAnalysis,
  isLoading,
  searchTerm,
  selectedTags,
  setDocuments,
  setSelectedDocument,
  addDocument,
  removeDocument,
  updateDocument,
  getFilteredDocuments,
} = useDocumentStore()
```

## Custom Hooks

### useAuth
Handles user authentication (login, signup, logout)

```typescript
const { login, logout, signup } = useAuth()
```

### useDocuments
Manages document fetching, selection, and deletion

```typescript
const { documents, isLoading, fetchDocuments, fetchDocument, deleteDocument } = useDocuments()
```

### useUpload
Handles document file uploads with progress tracking

```typescript
const { uploadDocument, isLoading, error, progress } = useUpload()
```

### useChat
Manages chat messages and conversation with documents

```typescript
const { messages, isLoading, sendMessage, clearMessages } = useChat(documentId)
```

## Mock Data & Development

The frontend currently uses mock data via hooks. To test the full flow:

1. **Dashboard**: Shows mock documents list
2. **Upload**: Creates mock document entry (no real upload yet)
3. **Results**: Displays placeholder analysis
4. **Chat**: Shows placeholder responses

## Next Steps)

The frontend is ready to connect to backend APIs:

### Endpoints to Implement

1. **POST /api/upload** - Handle file uploads
   - Body: multipart form with file
   - Response: `{ documentId, status: "PROCESSING" }`

2. **GET /api/documents** - Fetch user's documents
   - Query: `page`, `limit`, `status`, `sort`
   - Response: `{ documents[], total, page, pages }`

3. **GET /api/documents/:id** - Fetch document with analysis
   - Response: `{ document, analysis }`

4. **POST /api/documents/:id/ask** - Chat endpoint
   - Body: `{ question, conversationHistory }`
   - Response: Stream of chat messages (SSE)

5. **DELETE /api/documents/:id** - Delete document

6. **POST /api/auth/signin** - User login
   - Body: `{ email, password }`
   - Response: `{ sessionToken, user }`

## Styling

The project uses Tailwind CSS with custom utilities:

### Color Palette
- **Primary**: Blue (`#2563EB`)
- **Secondary**: Gray (`#64748B`)
- **Success**: Green (`#10B981`)
- **Warning**: Amber (`#F59E0B`)
- **Error**: Red (`#EF4444`)

### Utility Classes
- `.btn` - Button styles
- `.card` - Card container
- `.badge` - Badge styles
- `.input` - Input field
- `.label` - Form label

## Dependencies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **react-dropzone** - File upload
- **next-auth** - Authentication (stub)
- **date-fns** - Date formatting
- **axios** - HTTP client (utility)
- **clsx** - Class name utilities

## Security Considerations

- All form inputs are validated
- Error messages don't leak sensitive info
- File size/type validation on client
- Environment variables not exposed to client (removed from build)
- Error boundaries prevent app crashes

## Responsive Design

The app is fully responsive:
- Mobile: Single column layout, hamburger menu
- Tablet: 2-column dashboard
- Desktop: Full sidebar + content layout

## Build

```bash
npm run build
```

## Performance

- Code splitting automatic with Next.js
- Images optimized with next/image
- Lazy loading for document lists
- Debounced search input
- Memoized components where needed

## Next Steps

1. **Implement Backend APIs**
   - Connect document upload to Supabase Storage
   - Implement Claude API integration
   - Set up database queries

2. **Add Authentication**
   - Implement NextAuth.js properly
   - Add social login providers
   - Implement logout functionality

3. **Real Data**
   - Replace mock data with API calls
   - Add error handling
   - Implement loading states

4. **Testing**
   - Add unit tests (Jest)
   - Add integration tests
   - Add E2E tests (Playwright/Cypress)

5. **Deployment**
   - Deploy to Vercel
   - Set up CI/CD pipeline
   - Configure production environment

## License

MIT

## Support

For issues or questions, please check the architecture plan at `/home/codespace/.claude/plans/functional-petting-stroustrup.md`
