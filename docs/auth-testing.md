# Authentication Testing Procedures

This document outlines manual testing procedures for the authentication flows in the chatbot application.

## Prerequisites

- Access to the development environment
- GitHub and/or LinkedIn accounts for testing social login
- Access to the Supabase dashboard for verifying user creation

## Test Cases

### 1. Social Login - GitHub

#### Test Steps:
1. Open the chatbot widget by clicking the chat button in the bottom right corner
2. Verify that the login screen appears with GitHub and LinkedIn login options
3. Click "Sign in with GitHub"
4. Complete the GitHub authentication flow (authorize the application)
5. Verify redirection back to the application
6. Verify that the chat interface is now visible (not the login screen)

#### Expected Results:
- User is successfully authenticated
- Chat interface is displayed
- User profile is created/updated in Supabase (check the 'recruiters' table)

### 2. Social Login - LinkedIn

#### Test Steps:
1. Open the chatbot widget by clicking the chat button in the bottom right corner
2. Verify that the login screen appears with GitHub and LinkedIn login options
3. Click "Sign in with LinkedIn"
4. Complete the LinkedIn authentication flow (authorize the application)
5. Verify redirection back to the application
6. Verify that the chat interface is now visible (not the login screen)

#### Expected Results:
- User is successfully authenticated
- Chat interface is displayed
- User profile is created/updated in Supabase (check the 'recruiters' table)

### 3. Session Persistence

#### Test Steps:
1. Authenticate using either GitHub or LinkedIn
2. Close the chat widget
3. Reload the page
4. Open the chat widget again

#### Expected Results:
- User should still be authenticated (no login screen)
- Previous conversation history should be loaded

### 4. Sign Out

#### Test Steps:
1. Authenticate using either GitHub or LinkedIn
2. Look for a sign out option in the chat interface
3. Click the sign out option
4. Close and reopen the chat widget

#### Expected Results:
- User should be signed out
- Login screen should appear when reopening the widget
- No access to previous conversations until signing in again

### 5. Error Handling

#### Test Steps:
1. Attempt to sign in with GitHub/LinkedIn
2. Cancel the authorization process
3. Observe the behavior in the application

#### Expected Results:
- Application should handle the cancellation gracefully
- Error message should be displayed
- User should be able to try again

### 6. Session Timeout (Manual Simulation)

#### Test Steps:
1. Authenticate using either GitHub or LinkedIn
2. In the browser developer tools, manually expire the session token:
   - Open Developer Tools (F12)
   - Go to Application tab
   - Find the Supabase session in Local Storage
   - Modify the expires_at value to a past timestamp
3. Perform an action in the chat

#### Expected Results:
- Application should detect the expired session
- User should be prompted to log in again

## Reporting Issues

When reporting authentication issues, please include:
1. The test case that failed
2. Steps to reproduce
3. Expected vs. actual behavior
4. Browser and device information
5. Screenshots if applicable
6. Any error messages from the console

## Security Considerations

- Never share actual login credentials in issue reports
- Report security vulnerabilities privately to the development team
- Do not test with production data or accounts with sensitive information 