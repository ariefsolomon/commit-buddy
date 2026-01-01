PROJECT CONTEXT – COMMIT BUDDY
=============================

Project Name:
Commit Buddy

Project Type:
Accountability & Focus Companion Application

Architecture:
Client–Server (API-based), platform-agnostic

Primary Goal:
Help users build habits, stay focused during work sessions, and remain accountable
through partner verification and structured reports.


--------------------------------------------------
1. HIGH-LEVEL OVERVIEW
--------------------------------------------------

Commit Buddy is an accountability-driven productivity application designed to help
individuals commit to habits and focused work sessions, optionally with a partner
for social accountability.

Core idea:
- Users define habits
- Users start focus sessions tied to those habits
- Sessions are tracked, verified, and optionally validated by a partner
- The system generates reports based on session data

The application is intentionally designed so it can be implemented on any platform
(mobile, web, desktop) using a shared backend API.


--------------------------------------------------
2. CORE USER ROLES
--------------------------------------------------

1. User
- Primary account holder
- Creates habits
- Starts focus sessions
- Invites or collaborates with partners
- Views reports

2. Partner
- Another user connected for accountability
- Can receive session invitations
- Can review or verify sessions

There is no admin-facing workflow for daily usage.
Administration is system-level only.


--------------------------------------------------
3. CORE MODULES & RESPONSIBILITIES
--------------------------------------------------

## Modules Tree
```
accounts
   │
   ├── habits
   │      └── sessions
   │
   └── partners
          └── sessions (verification)
                └── reports
```

A. Accounts
- User registration
- Authentication
- Session persistence
- Password recovery
- Account state tracking (logged in / logged out)

Purpose:
Identify users and secure access to the system.


B. Habits
- Users create habits (e.g., “Study Algorithms”, “Workout”, “Write Code”)
- Habits act as anchors for focus sessions
- A habit can have multiple sessions over time

Purpose:
Define what the user is committing to.


C. Sessions
- A session represents a single focus/work attempt
- Each session is tied to:
  - a habit
  - a user
  - optionally a partner

Session lifecycle:
1. Created (pending)
2. Started
3. Completed / Failed / AFK detected
4. Verified (optional)

Session data may include:
- start time
- end time
- duration
- AFK events
- proof image (optional)
- verification status

Purpose:
Track real execution of habits in measurable time blocks.


D. Partners
- Users can invite other users as accountability partners
- Partners can:
  - accept or reject invitations
  - view session requests
  - verify completed sessions

Purpose:
Introduce social accountability and trust-based validation.


E. Reports
- Aggregated insights based on sessions
- Examples:
  - Daily summary
  - Weekly habit consistency
  - Completion vs failure ratio
  - Verified vs unverified sessions

Reports are derived data, not primary records.

Purpose:
Turn raw session data into actionable insight.


--------------------------------------------------
4. TYPICAL USER FLOW (END-TO-END)
--------------------------------------------------

1. User registers or logs in
2. User creates one or more habits
3. User optionally connects with a partner
4. User starts a focus session linked to a habit
5. System tracks session duration and status
6. Session is completed or failed
7. Partner may verify the session
8. Reports are generated from accumulated sessions
9. User reviews progress and repeats the cycle


--------------------------------------------------
5. DESIGN PRINCIPLES
--------------------------------------------------

- Platform-independent logic
- Clear separation between:
  - authentication
  - domain logic
  - reporting
- Event-driven session lifecycle
- Social accountability without coercion
- Reports as read-only projections


--------------------------------------------------
6. NON-GOALS (EXPLICITLY EXCLUDED)
--------------------------------------------------

- Platform-specific UI logic
- Frontend framework details
- Notification implementation specifics
- Monetization or gamification (for now)


--------------------------------------------------
7. KEY CONCEPTS SUMMARY
--------------------------------------------------

Habit:
A long-term commitment.

Session:
A single execution attempt.

Partner:
Accountability collaborator.

Verification:
Trust-based confirmation.

Report:
Aggregated historical insight.


--------------------------------------------------
8. EXPECTED BACKEND CAPABILITIES
--------------------------------------------------

- Authentication & authorization
- CRUD operations for core entities
- Session state transitions
- Relationship management (user ↔ partner)
- Data aggregation for reports


--------------------------------------------------
INSTRUCTION FOR GEMINI CLI
--------------------------------------------------

Use this context to reason about architecture, API design, data models, workflows,
and system behavior for Commit Buddy.

Do NOT assume any specific frontend framework or platform.
