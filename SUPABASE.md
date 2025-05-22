# Supabase Integration Documentation

This document provides information about the Supabase integration in the dk-portfolio-windsurf project.

## Configuration

Supabase is configured in the project with the following parameters (stored in `.env`):

```
PUBLIC_SUPABASE_URL=https://clzvndqgtmbsugmdpdsq.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsenZuZHFndG1ic3VnbWRwZHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwOTExNDAsImV4cCI6MjA1NTY2NzE0MH0.Moo_Tz87N5HaFHFTjqbLcAOXncKF8SC_ln39q2d7VEw
```

The Supabase client is initialized in `src/lib/supabase.ts`.

## Database Schema

The project uses the following tables in the Supabase database:

1. **recruiters**
   - Primary table for storing recruiter information
   - Key fields: `id`, `email`, `name`, `last_active`

2. **conversations**
   - Stores conversation threads between recruiters and the system
   - Key fields: `id`, `recruiter_id`, `title`, `last_message_at`

3. **messages**
   - Individual messages within conversations
   - Key fields: `id`, `conversation_id`, `content`, `role`

4. **job_descriptions**
   - Stores job description details
   - Key fields: `id`, `recruiter_id`, `title`, various job-related fields

5. **entities**
   - Entities extracted from conversations
   - Key fields: `id`, `conversation_id`, `message_id`, `type`, `value`, `confidence`

## Security

The database is configured with Row Level Security (RLS) policies:

- Anonymous users can **read** from all tables
- Anonymous users **cannot** insert, update, or delete data in any tables
- Authentication is required for data modification operations

## Helper Functions

The `src/lib/supabase.ts` file includes several helper functions for interacting with the database:

- `getRecruiterByEmail`
- `createRecruiter`
- `updateRecruiterActivity`
- `getConversationsByRecruiterId`
- `getMessagesByConversationId`
- `createConversation`
- `addMessage`
- `extractAndStoreEntities`
- `createOrUpdateJobDescription`
- `getJobDescriptionByRecruiterId`

## Authentication

The project uses Supabase authentication for user management. GitHub OAuth is configured with:

```
GITHUB_CLIENT_ID=Ov23liwH0VGT1vdwfdN2
GITHUB_CLIENT_SECRET=884e38f1a00d2d0bb1315ab30737cd676ab2584e
GITHUB_REDIRECT_URI=https://clzvndqgtmbsugmdpdsq.supabase.co/auth/v1/callback
```

## Access Methods

There are several ways to access and manage the Supabase database:

1. **Supabase Dashboard**
   - Access at https://app.supabase.com/
   - Account: dkeesey@gmail.com
   - Use the Table Editor to view and modify data
   - Configure RLS policies and authentication settings

2. **JavaScript Client**
   - Implemented in `src/lib/supabase.ts`
   - Provides a programmatic way to interact with the database
   - Requires proper authentication for write operations

3. **Supabase CLI**
   - Installed locally
   - Can be used for migrations, local development, and schema management

## Development Notes

- All tables are currently empty (as of March 2025)
- The project is set up with TypeScript interfaces for all database tables
- RLS policies are in place but may need adjustment for actual use cases
- To modify data, users must be authenticated

## Troubleshooting

If you encounter issues with database access:

1. Check RLS policies in the Supabase Dashboard
2. Ensure proper authentication when attempting to modify data
3. Verify that environment variables are correctly set
4. Check for any connection issues or firewall restrictions

## Future Considerations

- Consider implementing additional RLS policies for user-specific data access
- Set up database migrations for schema changes
- Implement server-side functions for sensitive operations
- Configure proper production environment settings
