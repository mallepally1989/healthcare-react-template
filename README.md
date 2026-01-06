
# Healthcare React Template (Vite + React + TypeScript)

Production-ready starter for healthcare apps: auth scaffolding, protected routes, Patients & Appointments modules, and FHIR-ready client.

## Features
- React 18 + TypeScript + Vite
- Auth context + protected routes (role-aware)
- React Router v6
- Axios API client (REST + FHIR)
- Zustand state management
- Vitest + Testing Library
- FHIR Patient search page
- Appointment scheduler page

## Quick start
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Configure endpoints
Create `.env` from `.env.example` and set:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_FHIR_BASE_URL=http://localhost:5000/fhir
```

## Expected backend endpoints
- `GET /api/patients`
- `GET /api/patients/{id}`
- `GET /api/appointments`
- `POST /api/appointments`
- `GET /fhir/Patient?{query}` (FHIR R4/R5 Bundle)

## Security notes
- Do not store PHI in localStorage; prefer secure cookies or short-lived tokens.
- Enforce HTTPS, CSP, and secure headers at your gateway.
- Implement RBAC and audit logs on the backend.

## Scripts
- `npm run dev` — start Vite
- `npm run build` — type-check & build
- `npm run preview` — preview prod build
- `npm run test` — unit tests
