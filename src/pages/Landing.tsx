export default function Landing() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12 space-y-12">
        {/* Navbar spacer (header exists in App) */}

        {/* Hero */}
        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="rounded-2xl bg-gradient-to-br from-fuchsia-600 via-violet-600 to-orange-500 p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Floating avatars */}
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
              <div className="absolute left-6 top-16 hidden md:block">
                <Avatar label="AB" />
              </div>
              <div className="absolute right-10 top-20 hidden md:block">
                <Avatar label="CD" />
              </div>
              <div className="absolute left-24 bottom-10 hidden md:block">
                <Avatar label="EF" />
              </div>
              <div className="absolute right-24 bottom-14 hidden md:block">
                <Avatar label="GH" />
              </div>
            </div>

            <h1 className="relative z-10 text-3xl md:text-5xl font-extrabold tracking-tight">
              Find fair salaries for your role
            </h1>
            <p className="relative z-10 mt-3 max-w-2xl mx-auto text-white/90">
              Search or start an anonymous negotiation thread. Crowd wisdom
              helps you benchmark salaries and advocate for what you deserve.
            </p>

            {/* Search */}
            <div className="relative z-10 mt-6 flex justify-center">
              <div className="flex w-full max-w-2xl items-center rounded-full bg-white/95 px-3 py-2 shadow-lg ring-1 ring-white/40">
                <input
                  placeholder="Job title, keyword, or location"
                  className="w-full rounded-full bg-transparent px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                />
                <button className="ml-2 inline-flex items-center rounded-full bg-black px-4 py-2 text-white hover:bg-slate-900">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Logos */}
          <div className="px-4 py-6">
            <p className="text-center text-xs text-slate-500 mb-4">
              Search across community-verified ranges
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-slate-400">
              {["Microsoft", "IBM", "Amazon", "eBay", "Dropbox"].map((n) => (
                <div key={n} className="flex items-center justify-center">
                  <span className="text-sm font-semibold opacity-70">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending jobs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Trending jobs
            </h2>
            <a
              href="/negotiations"
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              See all jobs
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Crisis Intervention Specialist",
                loc: "London • Remote",
                min: 187300,
                max: undefined,
              },
              {
                title: "Virtual Scheduler - Remote",
                loc: "New York • Full-Time",
                min: 150000,
                max: undefined,
              },
              {
                title: "Patient Care Advocate",
                loc: "Washington • Full-Time",
                min: 195700,
                max: undefined,
              },
            ].map((j, i) => (
              <article
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-slate-800">{j.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{j.loc}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-100" />
                </div>
                <div className="mt-4 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">
                      ${j.min.toLocaleString()}
                    </span>
                    <span className="text-slate-500"> Avg. salary</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Suggested searches + Tag cloud */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs text-slate-500">Recommended topics</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-800">
              Explore suggested job searches
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Browse common roles and ranges to learn how your compensation
              compares. Start a thread to get targeted feedback from the
              community.
            </p>
            <div className="mt-6 h-40 rounded-lg bg-slate-100" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-fuchsia-600 via-violet-600 to-orange-500 p-6 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {[
                "Developer",
                "Project Manager",
                "Sales",
                "Personal Assistant",
                "Board member",
                "Designer",
                "Managing Director",
                "Founding Partner",
                "HR Assistant",
                "Entrepreneur",
                "Coach",
                "Financial Advisor",
                "Customer Support",
                "Data analyst",
                "Dispatcher",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Team members */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Team members
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              Learn more
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Tamas Bunce",
                role: "Construction Manager",
                loc: "London",
              },
              {
                name: "Benedikt Safiyullin",
                role: "Fitness Trainer",
                loc: "New York",
              },
              {
                name: "Luis Calvillo",
                role: "Teacher Assistant",
                loc: "London",
              },
            ].map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-medium text-slate-800">{m.name}</p>
                    <p className="text-xs text-slate-500">
                      {m.loc} • {m.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="grid gap-6 md:grid-cols-[1fr_280px] items-center">
          <blockquote className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl text-fuchsia-700 mb-3">“</div>
            <p className="text-lg font-semibold text-slate-800">
              Our platform is so easy to use. We've sourced 40–50 different
              salary datapoints worldwide in the past two years.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Lubosek Hnilo — Founder at Apple Inc.
            </p>
          </blockquote>
          <div className="mx-auto h-28 w-28 rounded-full bg-slate-200" />
        </section>

        {/* CTA banner */}
        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="rounded-2xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-orange-500 px-6 py-8 md:px-10 md:py-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">Ready for your next hire?</h3>
              <p className="text-white/90 text-sm max-w-2xl mt-1">
                Post a role and get community feedback fast. Discover
                market-aligned ranges and move confidently with real insights.
              </p>
            </div>
            <a
              href="/new"
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-white hover:bg-slate-900"
            >
              Apply and Start Today
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-violet-600" />
                <span className="font-semibold text-slate-800">fairWage</span>
              </div>
              <p className="text-sm text-slate-500 max-w-sm">
                Benchmark salaries, negotiate fairly, and contribute to a
                transparent compensation community.
              </p>
            </div>
            <FooterCol
              title="Landing Pages"
              items={[
                "Landing Page",
                "Landing Page Corporate",
                "Landing Page Minimal",
                "Coming Soon",
                "404",
              ]}
            />
            <FooterCol
              title="About Pages"
              items={[
                "About Us",
                "Our Team",
                "User Profile Modern",
                "User Profile Centered",
                "Contact Us",
                "All Components",
              ]}
            />
            <FooterCol
              title="Job Search"
              items={[
                "Job List",
                "Job List Corporate",
                "Job List Minimal",
                "Job Overview",
                "Job Overview Centered",
                "Apply for a job",
              ]}
            />
          </div>
          <div className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} All rights reserved</span>
            <div className="flex items-center gap-3">
              {["x", "in", "ig"].map((s) => (
                <span
                  key={s}
                  className="h-5 w-5 rounded-full bg-slate-200 inline-block"
                />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Avatar({ label }: { label: string }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md ring-1 ring-black/5">
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-slate-800">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
