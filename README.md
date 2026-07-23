# health-tracking-app

A tiny React + Vite sample app with LaunchDarkly wired up. One flag toggles
one visible thing on the page. Goal: **clone, paste a key, flip a flag, watch
the app change &mdash; in about two minutes, no code written.**

## Run it

```bash
git clone <this-repo>
cd health-tracking-app
cp .env.example .env       # then paste your client-side ID inside
npm install
npm run dev
```

Then open http://localhost:5173.

## Get the key

1. Open your [LaunchDarkly dashboard](https://app.launchdarkly.com).
2. Create a project if you don't have one yet: **Organization settings → [Projects](https://app.launchdarkly.com/settings/projects) → Create project** (e.g. `health-tracking-app`).
3. Go to the project's settings and select an environment (e.g. **Test**).
4. Click the **⋯** (three dots) icon next to the environment and select **View SDK Keys**.
5. On the SDK keys page, find the **Client-side IDs** section and copy the **Client-side ID** — *not* the SDK key or mobile key.
6. Paste it into `.env` as `VITE_LAUNCHDARKLY_CLIENT_ID=...`.
7. Restart the dev server (`Ctrl-C`, then `npm run dev` again).

## Create the flag

1. In the same project, **Flags -> Create flag.**
2. Name: `Show daily checkin`. Key: **`show-daily-checkin`** (must match exactly).
3. Type: **Boolean.** Variations: `true` / `false`. Default: `false`.
4. Open the flag's **Settings** and enable **Client-side SDK availability
   -> SDKs using Client-side ID.** This is off by default on new flags, and
   without it the browser SDK cannot see the flag &mdash; the app will show
   `undefined` forever.
5. Turn targeting **On**.
6. Open the running app &mdash; the flag status line at the bottom should now
   read `false`.
7. Change the default rule to serve `true`, save, and the daily check-in
   card (with three mood buttons) should appear in the app **without a page
   reload**.
<img width="640" height="360" alt="daily_checkin" src="https://github.com/user-attachments/assets/556411cb-eaba-4cb6-9fbd-ff19c772fbf9" />


## What the flag is doing

The whole integration is two files:

- `src/main.jsx` &mdash; initializes the LaunchDarkly client with your
  client-side ID and wraps the app in `<LDProvider>`.
- `src/App.jsx` &mdash; reads `show-daily-checkin` via `useFlags()` and
  conditionally renders the mood check-in card.

That's it. No routing, no state library, no build step beyond Vite defaults.

## Next steps

- **Add another flag.** Copy the pattern in `App.jsx` &mdash; add a key, read
  it from `useFlags()`, render something conditionally.
- **Target specific users.** Change the `context` in `src/main.jsx` from the
  anonymous `demo-user` to something with real attributes (email, plan,
  region) and add a targeting rule in the dashboard.
- **Wire the server SDK.** For flag evaluations that shouldn't happen in the
  browser, use `@launchdarkly/node-server-sdk` in an API route. That's a
  separate demo &mdash; keep this one client-only.

## Troubleshooting

- **Page says "client-side ID missing".** You didn't create `.env`, or forgot
  to restart `npm run dev` after editing it.
- **Flag status shows `undefined`.** The flag key in the dashboard doesn't
  match `show-daily-checkin` exactly, or targeting is off, or the flag lives in a
  different environment than the one whose client-side ID you pasted.
- **App loads but nothing updates when I flip the flag.** Check the browser
  console for `LaunchDarkly` errors &mdash; usually a wrong key or a network
  block.
