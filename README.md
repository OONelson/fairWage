# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Quickstart (MVP)

1. Create `.env` at project root with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. In Supabase SQL Editor, create tables:

```sql
create table public.negotiations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  user_id uuid references auth.users(id),
  job_title text not null,
  location text,
  years_of_experience int not null default 0,
  proposed_range_min int not null,
  proposed_range_max int not null,
  justification text not null,
  votes int not null default 0
);

create table public.counter_offers (
  id uuid primary key default gen_random_uuid(),
  negotiation_id uuid not null references public.negotiations(id) on delete cascade,
  user_id uuid references auth.users(id),
  proposed_range_min int not null,
  proposed_range_max int not null,
  justification text not null,
  votes int not null default 0
);

-- RLS
alter table public.negotiations enable row level security;
alter table public.counter_offers enable row level security;

create policy "read all negotiations" on public.negotiations for select using (true);
create policy "insert own negotiations" on public.negotiations for insert with check (auth.uid() = user_id or user_id is null);
create policy "update votes anyone" on public.negotiations for update using (true) with check (true);

create policy "read counters" on public.counter_offers for select using (true);
create policy "insert counters" on public.counter_offers for insert with check (auth.uid() = user_id or user_id is null);
create policy "update counter votes" on public.counter_offers for update using (true) with check (true);
```

3. Install deps and run:

```
npm install
npm run dev
```

4. Pages:

- `/` Landing
- `/auth` Login / Signup
- `/negotiations` List
- `/new` Create negotiation
- `/negotiations/:id` Thread view
