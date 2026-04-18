# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (CI uses pnpm 9, Node 22). Do not use npm or yarn.

| Task                                                                           | Command         |
| ------------------------------------------------------------------------------ | --------------- |
| Install deps (also wires the playground to the local source via the workspace) | `pnpm install`  |
| Run the playground (interactive demo / dev harness)                            | `pnpm start`    |
| Open Cypress component-test UI                                                 | `pnpm test`     |
| Run Cypress component tests headlessly (CI uses this)                          | `pnpm test:run` |
| Build the library (`tsup` + copy `style.css` → `dist/ReactToastify.css`)       | `pnpm build`    |
| Format `src/` with Prettier                                                    | `pnpm prettier` |

### Running a single test

Tests are **Cypress component tests**, not Jest. Files live next to source as `*.cy.tsx` (e.g. `src/components/Toast.cy.tsx`). To run one file headlessly:

```sh
pnpm exec cypress run --component -b chrome --spec src/components/Toast.cy.tsx
```

Or use `pnpm test` to open the interactive runner and pick a spec.

### Lint / formatting

There is **no ESLint**. Code style is Prettier only (config inline in `package.json`: `printWidth: 120`, single quotes, no trailing commas, avoid arrow parens). A **lefthook** pre-commit hook runs `lint-staged`, which runs Prettier on staged `*.{js,jsx,ts,tsx,md,html,css}` files. The CI workflow's lint step is currently commented out — Prettier is the only gate.

## Architecture

### Two public entry points + one addon

`tsup.config.ts` produces three independent bundles:

1. **`react-toastify`** (default) — `src/index.ts`. Its `ToastContainer` export is the **`StyledToastContainer`** wrapper at `src/components/StyledToastContainer.tsx`, which imports `src/style.css` as a string (via Vite's `?raw` suffix; tsup uses `loader: { '.css': 'text' }` plus a small esbuild plugin that strips the `?raw` query) and injects it via `useStyleSheet(css, props.nonce)` on mount. Users can pass a `nonce` prop for Content Security Policy compliance. All bundles are prefixed with `"use client";` for React Server Components.
2. **`react-toastify/unstyled`** — `src/unstyled.ts`. Re-exports the **raw** `ToastContainer` from `./components` without the styled wrapper, so nothing is injected at runtime. Use this subpath when consumers want to ship their own CSS (from `react-toastify/dist/ReactToastify.css` or elsewhere).
3. **`react-toastify/addons/use-notification-center`** — built from the internal workspace package at `packages/use-notification-center/` into the `/addons` directory (not `/dist`); declared in `package.json#exports`.

The raw stylesheet is also exposed as `react-toastify/dist/ReactToastify.css`.

### Runtime model: imperative global store bridged by `useSyncExternalStore`

The library is **not** Context- or Redux-based. The flow is:

- `src/core/store.ts` — a module-level singleton. Holds a `Map<containerId, ContainerObserver>` and a `renderQueue` that buffers `toast()` calls issued before any `<ToastContainer>` mounts.
- `src/core/toast.ts` — the public imperative API (`toast()`, `toast.success`, `toast.update`, `toast.promise`, `toast.onChange`, …). Dispatches through the store.
- `src/core/containerObserver.ts` — one instance per `<ToastContainer>`. Owns per-container state: toast `Map`, waiting `queue` (when `limit > 0`), snapshot for `useSyncExternalStore`, prop validation, and lifecycle callbacks (`onOpen` / `onClose`).
- `src/hooks/useToastContainer.ts` — the **only** bridge to React. `<ToastContainer>` subscribes to its observer via `useSyncExternalStore`, which is why nothing in the tree needs to re-render just because a toast was pushed.

Consequence: multiple `<ToastContainer>` instances are supported via `containerId`; the store routes toasts to the right container (default id is `1`).

### Components (`src/components/`)

- `ToastContainer.tsx` — positions the portal, manages stacking (CSS-variable transforms computed in a layout effect), keyboard focus / `Alt+T` hotkey, collapse state.
- `Toast.tsx` — per-toast wrapper; consumes `useToast` (drag-to-dismiss, pause-on-hover, pause-on-blur, timer).
- `ProgressBar.tsx`, `CloseButton.tsx`, `Icons.tsx` — the pieces a toast renders.
- `Transitions.tsx` — `Bounce` / `Flip` / `Slide` / `Zoom` built with `cssTransition` from `src/utils/cssTransition.tsx`.

### Hooks (`src/hooks/`)

- `useToastContainer.ts` — store → React bridge (see above). The most important file in the repo.
- `useToast.ts` — per-toast UX behavior.
- `useIsomorphicLayoutEffect.ts` — SSR-safe layout effect.
- `useStyleSheet.ts` — runtime CSS injection (replaces the old tsup shim). Per-document `Map` so multiple `<ToastContainer>` instances only inject once per document (shadow DOM / iframe safe). If a later mount supplies a nonce and the previous injection had none, the attribute is updated on the existing `<style>` tag — see `src/hooks/useStyleSheet.ts`.

### Stacked / limit / queue semantics

- `ToastContainerProps.limit` — excess toasts are buffered in a per-container queue inside `containerObserver.ts`; as toasts close, the next queued toast is emitted. `toast.clearWaitingQueue()` drains it.
- `ToastContainerProps.stacked` — `ToastContainer.tsx` measures toast heights in a layout effect and sets CSS custom properties (`--y`, `--g`, `--s`) that drive `translate3d`-based stacking and a collapsed state.

### Types

Public types are centralized in `src/types.ts` and re-exported from `src/index.ts`. Notable: `ToastOptions<Data>`, `UpdateOptions<Data>`, `ToastContainerProps`, `ToastContent<T>`, `ToastItem<Data>` (payload for `toast.onChange`), `TypeOptions`, `Theme`.

### Addon: `use-notification-center`

Lives at `packages/use-notification-center/` as a **private pnpm workspace package** (see its `package.json` — `"private": true`). It exports a `useNotificationCenter()` hook — a **persistent** notification store independent from the transient toast queue. It subscribes to `toast.onChange()` to capture lifecycle events and provides filtering, read/unread, and sort.

The addon declares `"react-toastify": "workspace:*"` as a dependency, so its source can `import 'react-toastify'` and pnpm resolves it via a symlink at `packages/use-notification-center/node_modules/react-toastify → <repo root>`. No Vite alias or tsconfig `paths` entry is needed.

It is **not published separately**. The root `tsup.config.ts` builds it into `/addons/use-notification-center/` at the repo root, which the main `react-toastify` package includes via `package.json#files` and exposes via the `react-toastify/addons/use-notification-center` and `react-toastify/notification-center` subpath exports. Consumers still install only `react-toastify`.

## Playground

`/playground` is a standalone Vite app used as the demo and manual-QA harness. It is declared as a workspace in `pnpm-workspace.yaml` and depends on the root package via `"react-toastify": "workspace:*"`, so `pnpm install` symlinks the root into `playground/node_modules/react-toastify`. `pnpm start` runs it (via `pnpm --filter playground dev`). Most changes should be verified in the playground before running Cypress.

### Workspace layout

`pnpm-workspace.yaml` lists:

- **root** (`react-toastify`) — the published library.
- **`packages/*`** — currently just `packages/use-notification-center/` (private internal addon package, see Addon section above).
- **`playground`** — dev harness.

Both `playground` and `packages/use-notification-center` depend on the root via `workspace:*`. `pnpm install` is the only setup step — no `pnpm link` required.

## CI

`.github/workflows/build.yaml` runs on every push and PR: install → `pnpm build` → `pnpm test:run` → upload Cypress screenshots/videos on failure → report coverage to Coveralls. Coverage is instrumented at runtime by `vite-plugin-istanbul` (see `vite.config.mts`) and collected by `@cypress/code-coverage`.
