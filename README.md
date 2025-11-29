# CipherVault

## Overview

CipherVault is a web-based encryption and encoding tool collection that provides five different cipher implementations: Caesar Cipher, Vigenère Cipher, Atbash Cipher, Binary Encoding, and Reverse Cipher. The application is built as a single-page application (SPA) with a focus on clean UI/UX and educational value, allowing users to encrypt, decrypt, and learn about various classical cipher techniques.

The application follows a Material Design-inspired approach with a productivity tool aesthetic, emphasizing usability, readability, and efficient workflows for cipher operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (alternative to React Router)
- Single-page application architecture with route-based code splitting

**UI Component System:**
- Shadcn UI component library (Radix UI primitives with Tailwind styling)
- "New York" style variant configured in components.json
- Comprehensive component library including forms, dialogs, cards, toasts, and navigation elements
- Custom cipher-specific components: `CipherLayout`, `TextAreaPanel`

**State Management:**
- TanStack Query (React Query) for server state management and caching
- Local component state using React hooks (useState, useEffect)
- No global state management library - application logic is primarily client-side

**Styling Approach:**
- Tailwind CSS with custom design system configuration
- CSS variables for theming (light/dark mode support)
- Design guidelines document (`design_guidelines.md`) specifying typography, spacing, and layout systems
- System font stack for optimal performance
- Monospace fonts for cipher input/output for better readability

**Cipher Implementation:**
- Pure JavaScript/TypeScript cipher algorithms in `/client/src/lib/ciphers.ts`
- Client-side only processing (no server-side cipher operations)
- Algorithms include: Caesar, Vigenère, Atbash, Binary encoding/decoding, and string reversal
- Interactive features like brute force decryption for Caesar cipher and step-by-step visualization for Vigenère

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- TypeScript throughout the server codebase
- HTTP server created with Node's built-in `http` module

**Server Structure:**
- Minimal API surface - server primarily serves the static frontend
- Routes registered via `/server/routes.ts` (currently empty, ready for future API endpoints)
- Custom logging middleware for request/response tracking
- Static file serving with fallback to index.html for SPA routing

**Storage Layer:**
- In-memory storage implementation (`MemStorage` class) for development
- Interface-based storage design (`IStorage`) allowing easy swap to persistent storage
- User schema defined but not currently used by the application
- Ready for database integration via the storage interface

### Data Storage Solutions

**Current Implementation:**
- In-memory Map-based storage for user data
- No persistence - data lost on server restart

**Database Schema (Prepared but Not Active):**
- Drizzle ORM configured for PostgreSQL
- Schema location: `/shared/schema.ts`
- Users table with id, username, and password fields
- Schema validation using Zod via drizzle-zod integration

**Migration Setup:**
- Drizzle Kit configured for schema migrations
- Migration output directory: `/migrations`
- Database URL expected via `DATABASE_URL` environment variable
- Push command available: `npm run db:push`

**Design Pattern:**
- Repository pattern via IStorage interface
- Easy migration path from in-memory to PostgreSQL
- Shared schema types between client and server via `/shared` directory

### Authentication and Authorization

**Current State:**
- No authentication implemented
- User schema exists but is not utilized
- Storage interface includes user CRUD methods (getUser, getUserByUsername, createUser)

**Prepared Infrastructure:**
- Dependencies installed for future auth: passport, passport-local, express-session
- Session management ready: express-session with connect-pg-simple for PostgreSQL session store
- Password hashing capabilities available via installed dependencies

### External Dependencies

**Database:**
- PostgreSQL (via @neondatabase/serverless) - configured but not required for current functionality
- Drizzle ORM for database interactions and migrations

**UI Component Libraries:**
- Radix UI primitives (@radix-ui/* packages) for accessible, unstyled components
- Lucide React for icon system
- Embla Carousel for potential carousel functionality
- cmdk for command palette component

**Development Tools:**
- TypeScript for type safety across the stack
- ESBuild for server bundling in production
- Vite for frontend development and building
- Replit-specific plugins for development environment integration

**Styling:**
- Tailwind CSS for utility-first styling
- PostCSS with Autoprefixer for CSS processing
- class-variance-authority for component variant management

**Form Handling:**
- React Hook Form for form state management
- Hookform Resolvers for validation integration
- Zod for schema validation and type inference

**Utility Libraries:**
- date-fns for date manipulation
- clsx and tailwind-merge for conditional class name composition
- nanoid for unique ID generation

**API/Network:**
- TanStack Query for data fetching, caching, and synchronization
- Built-in fetch API for HTTP requests

**Note on Database:**
The application is currently fully functional without a database connection. All cipher operations are performed client-side. The database infrastructure (PostgreSQL + Drizzle) is configured and ready for future features that may require user accounts, saved cipher configurations, or history tracking.
