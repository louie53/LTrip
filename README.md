# LocalTrip

A portfolio project for a fictional New Zealand tourism operator: a responsive activity booking website and staff workspace, delivered one milestone at a time.

**Portfolio demo — reservations are simulated. No payment is collected.**

## Current status: M0 local foundation complete

Implemented: an English responsive home page, shared layout and styles, a minimal health endpoint, TypeScript, linting, unit tests, production build scripts and a GitHub Actions workflow.

The home page follows the approved warm white, deep green and coastal image design in `docs/design/v1/home.html`, with Georgia headings and Arial body text. Its links only navigate within the page. The coastal image is labelled **AI-generated concept image**; it does not depict a real tour offered by LocalTrip.

Activities, authentication, a database, reservations and the staff workspace are **not implemented yet**. Public deployment is deferred by the owner; M0 is closed out for the local foundation and deployment preparation. There is no live demo URL. AWS remains on its Free plan, and hosting proposals are retained for future review in [docs/aws-deployment.md](docs/aws-deployment.md). Verification evidence and pending work live in [docs/PROGRESS.md](docs/PROGRESS.md). M1 has not started.

The product serves one operator. Payments, social groups, AI planning, maps and multiple operators are outside V1. See the [project plan](docs/project-plan.md) and [roadmap](docs/roadmap.md).

## Run locally

Run these commands from the repository root. Use Node.js **24.11.1** (see `.nvmrc`) and npm **11.7.0**. If you use nvm, run `nvm install` then `nvm use`. npm is the only package manager for this repository; commit `package-lock.json` with dependency changes.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. The development server listens on the local machine only. Stop it with **Ctrl+C** in the same terminal; run `npm run dev` again to restart. Dependencies only need reinstalling after the lockfile changes or `node_modules` is removed.

If port 3000 is occupied, use `npm run dev -- --port 3001` and open http://localhost:3001. Do not stop an unrelated process to free a port.

No account, database or API key is required for M0. `.env.example` documents this intentionally empty configuration. Later, place required values in a local **`.env.local`** at the project root; never commit that file or paste secrets into chat. `NEXT_PUBLIC_` values can reach the browser and must never contain server secrets.

## Check and build

| Command | Purpose |
| --- | --- |
| `npm run lint` | Next.js/React/TypeScript lint rules; warnings fail the check |
| `npm run typecheck` | Generate route types, then check TypeScript without emitting JS |
| `npm run test:unit` | Run the health response contract tests once |
| `npm run test:watch` | Rerun unit tests while editing |
| `npm run build` | Create the production build |
| `npm run check` | Run lint, typecheck, unit tests and build in sequence |

To inspect the production application locally, stop the development server first:

```sh
npm run build
npm run start -- --hostname 127.0.0.1
```

Open the same local URL and stop with Ctrl+C. A successful build does not prove that every feature works. The unit tests call the route handler directly; they are not HTTP, database concurrency or end-to-end tests.

The Git remote is [louie53/LTrip](https://github.com/louie53/LTrip), on `main`. The [CI run for `cff7e4d`](https://github.com/louie53/LTrip/actions/runs/36522712121) passed locked dependency installation, lint, typecheck, unit tests and the production build on 2026-09-29. This validates the home-page update and tooling fixes after the initial lint failure on `ae22794`; it does not constitute a public deployment. The owner handles pushes; actual local and remote results are recorded in [docs/PROGRESS.md](docs/PROGRESS.md). There are no migration, seed, integration or E2E scripts until those features are implemented.

## What to inspect manually

1. Open `/`: English LocalTrip branding, introduction, demo disclaimer and the coastal image's AI label are visible.
2. Follow the page links: they reach the top, main content or About section on the same page; there is no pretend booking action.
3. Check a narrow phone viewport and desktop: readable text, no horizontal scrolling, and a loaded coastal image with an appropriate crop.
4. Press Tab: the skip link and links have visible focus; Enter follows them.
5. Open `/api/health`: HTTP 200 with `{"data":{"status":"ok"}}` and `Cache-Control: no-store`.
6. Inspect the browser console for runtime errors.

Health reports only that the application can respond. It does not claim database or authentication readiness.

## Structure and choices

```text
src/app/
  layout.tsx             Shared HTML shell, metadata and global styles
  page.tsx               The only product page in M0
  globals.css            Tailwind entry and responsive visual styles
  api/health/route.ts     Minimal public GET endpoint
public/images/           Local coastal concept image used by the home page
tests/unit/              Health response contract tests
.github/workflows/ci.yml  Local-check equivalents for GitHub Actions
docs/                    Scope, roadmap, progress, deployment and learning notes
AGENTS.md                Rules for future development sessions
```

Next.js App Router keeps the page and HTTP endpoint in one application. The home page uses Server Components; client state is added only when interaction requires it. Tailwind supplies the styling foundation without starting a custom component library. Georgia and Arial font stacks keep the build independent of external font downloads.

The home page statically imports `public/images/coast-concept.png` into `next/image`. Responsive `sizes` describes its rendered width so the browser can select an appropriate image candidate; `preload` requests early loading of the hero image. CSS controls the crop and responsive layout. The original design files remain in `docs/design/`.

At initialization, registry metadata and official documentation were checked. Direct dependency versions are exact and transitive versions are recorded in `package-lock.json`:

| Tool | Pinned version |
| --- | --- |
| Next.js | 16.3.6 |
| React / React DOM | 19.3.0 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.3 |
| ESLint / eslint-config-next | 9.39.5 / 16.3.6 |
| Vitest / Vite | 5.0.1 / 8.3.0 |

TypeScript 7 was the registry's latest version, but the current TypeScript ESLint parser declared support below 6.1. M0 uses 6.0.3 for compatibility. Upgrade dependencies deliberately and rerun checks. References: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Vitest setup](https://vitest.dev/guide/).

PostgreSQL, Prisma, Supabase Auth, Zod and shadcn/ui remain planned choices. Install them when their first feature needs them. M0 creates no speculative tables, service layer or empty future modules.

## Documentation and learning

- [Original project plan](docs/travel_booking_project_plan_v1.md) — preserved source; [project-plan.md](docs/project-plan.md) is its unchanged M0 snapshot.
- [Start-here instructions](docs/codex_localtrip_start_here.md) — preserved handoff.
- [Progress](docs/PROGRESS.md) — actual checks, limits and next steps, in Chinese.
- [M0 learning notes](docs/m0-learning.md) — concepts, file reading order and practice, in Chinese.
- [Deployment preparation](docs/deployment.md) — Node service configuration; deployment requires the owner's confirmation.

Codex assisted with the M0 implementation, documentation and local verification. The owner should review and explain the code before presenting it in an interview. This repository does not claim personal review, business outcomes or features that have not happened.
