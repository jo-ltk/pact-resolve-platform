---
name: site-audit
description: "Systematically analyzes the website page-by-page to ensure architectural integrity, design consistency, and functional correctness across frontend and backend."
---

This skill provides a rigorous framework for auditing the Mediation platform. It is designed to prevent "hallucinations" by enforcing a verification-first approach where every claim must be backed by file inspection or database checks.

## Audit Workflow (The Flow)

When asked to check a page or the whole site, follow this exact sequence:

### 1. Route & File Mapping

- **Action**: Identify the frontend page file and its corresponding admin dashboard component.
- **Verification**: Locate the API routes (`/api/content/...`) that serve data to these pages.
- **Goal**: Create a mental map of the "Data Triangle" (Database -> API -> UI).

### 2. Implementation Audit (Frontend vs. Backend)

- **Check for Hardcoding**: Verify if the page is using `useEffect` with `fetch` or if it has static arrays. If it should be dynamic, flag any static leftovers.
- **Schema Alignment**: Compare the TypeScript interfaces in `@/lib/db/schemas.ts` with the actual objects being fetched and rendered.
- **API Robustness**: Check API routes for revalidation logic (`revalidatePath`), error handling, and correct collection naming (e.g., camelCase `mediationRules` vs snake_case `mediation_rules`).

### 3. Design & UX Verification

- **Aesthetic Consistency**: Check for the "PACT Premium" look:
  - **Typography**: Verify that `uppercase` is only used where appropriate and titles are bold/italicized per design rules.
  - **Colors**: Use the established Navy/Gold/Accent palettes.
  - **Animations**: Ensure `FadeInUp` and other motion wrappers are correctly applied.
- **Loading & Error States**: Ensure `Skeleton` loaders and `toast` messages are present in admin tables.

### 4. Functional Drill-Down

- **CRUD Operations**: For admin pages, verify that Create, Update, and Delete operations targets the correct API and refresh the UI.
- **Cache-Busting**: Ensure fetch calls use `cache: 'no-store'` or timestamp parameters (`?t=...`) to avoid stale data in the dashboard.

## Anti-Hallucination Checklist

Before reporting a result, you MUST:

1.  **View File Contents**: Never assume code structure based on previous responses. Read the file.
2.  **Verify DB Collections**: Run a check script to see if data actually exists in the expected MongoDB collection.
3.  **Cross-Reference**: If the user says "it's not updating", check the API logic, then the UI fetching logic, then the database content.

## Reporting Format

For every page audited, provide:

- **Status**: (Ready / Issues Found / Broken)
- **Data Source**: (Dynamic / Mixed / Hardcoded)
- **Visual Check**: (Pass/Fail on casing, fonts, spacing)
- **Backend Sync**: (Pass/Fail on API consistency)
- **Fixes Applied**: (List of specific code changes made)

Use the site-audit skill to perform a deep-dive analysis of [Page Name, e.g., Rules & Fees]. Follow the 'Route & File Mapping' and 'Implementation Audit' flows. Specifically check if the data is dynamic or hardcoded, verify the API routes, and ensure the UI preserves the PACT premium design (no forced uppercase, correct fonts, and working loading states)."
