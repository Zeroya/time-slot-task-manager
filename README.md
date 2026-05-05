# Time-slot Planner (Practice Task)

![Application screenshot](C:/Users/Yan/.cursor/projects/c-programs-interviewProjects-Infostyle-test-task/assets/c__Users_Yan_AppData_Roaming_Cursor_User_workspaceStorage_cb56e523eec199b9d90b97839faf3f86_images_image-84f7265b-93e4-494c-b456-c860a942d341.png)

Simple calendar-like task manager for interview practice.

## What is implemented

- Day split into 30-minute time slots
- Task cards in slots (empty slot if no task)
- Add, edit, and delete tasks
- Task statuses based on current time:
  - `pending` -> `in N min`
  - `active` -> `In progress`
  - `done` -> `HH:mm-HH:mm`
- Auto refresh each minute so statuses and countdown stay актуальными
- Filters:
  - single day / period view
  - date navigation with arrows
  - jump to today
  - search by title
  - hide empty slots
  - show only active sessions
  - filter by status (`pending`, `active`, `done`)

## Tech stack

- React + TypeScript + Vite
- Redux Toolkit (state management)
- React Hook Form + Zod (forms and validation)
- MUI (UI and styling)
- Day.js (date/time operations)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
