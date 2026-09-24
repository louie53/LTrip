# LocalTrip development agreement

## Read first and preserve existing work

- Read `docs/project-plan.md`, `docs/codex_localtrip_start_here.md`, and `docs/PROGRESS.md` before changing code. The original `docs/travel_booking_project_plan_v1.md` is retained as a source document.
- Inspect existing files and Git status first. Do not overwrite, delete, reset, or reformat unrelated work. Explain material conflicts between the plan and the environment before proceeding.
- Work on one authorized milestone at a time. The current authorization is **M0 only**. Stop and report after M0; do not start M1 automatically.
- User instructions for the current task take precedence over older plans and this file. Update progress notes when scope or assumptions change.

## User-facing task workflow

- The user wants persistent, separate conversations inside the LTrip project, not internal agents as substitutes for those conversations.
- The main conversation is PM and overall acceptance. A design conversation owns the UI proposal; an implementation conversation owns initialization and code details. The user can ask questions directly in each.
- Work on one small, explicitly assigned step. Run applicable checks, report results and explanations, then stop for user confirmation before the next step. M0 authorization is not permission to run all steps without checkpoints.
- The PM must open the running website for visual acceptance when a runnable step is submitted; code generation and a build alone do not complete acceptance.
- Coordinate file ownership before parallel writes. Design proposals are not approved specifications until the user accepts them. Existing home-page code is an unaccepted draft.
- Keep agreed decisions and actual results in project documents so separate conversations have a shared reference. Remote GitHub pushes are handled by the user.

## Product scope

LocalTrip is a portfolio project for one fictional New Zealand activity operator: a public booking website and a staff operations area. The V1 path is publish sessions → reserve capacity → view bookings → cancel and release capacity. V1 is planned; M0 establishes the local project only.

- English UI and code names; explain key decisions and learning notes in Chinese.
- Use this exact notice on the home page and in the README: **Portfolio demo — reservations are simulated. No payment is collected.** Add it to the confirmation page when that page exists.
- M0 includes the smallest useful home page, shared layout/styles, `/api/health`, working development/check/build commands, CI configuration, and setup documentation.
- M0 does not implement authentication, database models, activities backed by data, booking workflows, or staff pages. Do not add fake working buttons or misleading availability.
- V1 uses NZD integer minor units and `Pacific/Auckland` display time; absolute timestamps and server-authoritative prices are required when business functionality begins.

## Implementation conventions

- Use Next.js App Router, TypeScript, Tailwind CSS, npm, and Vitest for the M0 foundation. Keep dependency versions and `package-lock.json` in sync; do not introduce a second package-manager lockfile.
- Keep the application a single Next.js project. Add folders, dependencies, and abstractions only when used by the current milestone.
- Pages and layouts are Server Components by default. Add a small Client Component only for browser APIs, event handlers, or client state that actually require one.
- Keep markup semantic, headings ordered, links descriptive, focus visible, and layouts usable on narrow screens. Avoid unnecessary animation and a bespoke component library.
- Prefer explicit types and simple functions. Explain non-obvious decisions; avoid comments that only repeat the code.
- Keep HTTP handling separate from business rules when business services are introduced. Server Components can call server services directly; do not require an internal HTTP round trip.
- Add Supabase Auth, Prisma, PostgreSQL, Zod, shadcn/ui, and Playwright when their milestone needs them. Their presence in the plan is not authorization to scaffold their features now.

## Validation and reporting

- For application changes, run the relevant checks available in `package.json`: `npm run lint`, `npm run typecheck`, `npm run test:unit`, and `npm run build`. Use `npm ci` to validate installation from the lockfile when dependency setup changes.
- Check the running home page and `/api/health`. For visible changes, inspect desktop and mobile layouts, keyboard focus, and the browser console; a successful HTTP response alone does not establish visual quality.
- Test meaningful observable behavior. Do not weaken assertions or disable type checking to obtain a passing result. Later capacity, transaction, and concurrency tests require an isolated real PostgreSQL database.
- Record actual commands, outcomes, failures, unrun checks, blockers, and the next authorized step in `docs/PROGRESS.md`. Configuration is not evidence that a check or deployment ran successfully.
- Explain the key changed files, startup steps, manual acceptance steps, and the concepts the user should understand. Keep planned features separate from implemented features in the README.
- Do not claim remote CI passed until a remote run is available. Do not claim deployment exists because deployment instructions have been written.

## Future business constraints

These constrain later implementation; they do not authorize M1 or M2 work during M0.

- Verify identity on the server. Read staff roles from controlled business records; never trust client-supplied roles. Check authorization and booking ownership at every server entry point.
- Access business tables through server-side Prisma. Do not introduce a second browser-to-database write path or build a custom password/session system.
- PostgreSQL is the source of truth for capacity. Booking, cancellation, and capacity changes use the same business layer and short transactions.
- Use activity → session → booking lock order when all are involved. Never call external services inside the transaction. Roll back the entire transaction on an idempotency uniqueness conflict.
- A cancelled booking releases capacity once. Closing sales does not cancel existing bookings. Prices, locations, timestamps, and cancellation deadlines are saved as booking snapshots.

## Explicit exclusions and approval boundaries

- Do not implement or prebuild tables/modules for social matching, groups, chat, collaborative AI trips, map routing, multiple operators, payments/refunds, hotels/flights, subscriptions, or driver matching.
- Redis, BullMQ, notifications, and activity AI Q&A belong to V1.1. Stripe test payments require a separately approved V1.2 scope. Do not prebuild workers, queues, vector stores, microservices, a monorepo, or a generic activity engine.
- Ask the user before paid resources, public deployment, remote Git pushes, destructive operations, real customer messages, or actual payments. Never create or upgrade paid services implicitly.
- Keep real secrets in local `.env.local` or the hosting provider's secret settings when needed. `.env.example` contains names, comments, and harmless placeholders only. Never ask the user to paste secrets into chat or put them into source control, browser bundles, logs, screenshots, or reports.
- M0 requires no external credentials. Never publish shared staff credentials or reset a database to conceal a failure.
