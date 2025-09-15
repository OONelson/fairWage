import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-full">
      <Header>
        <div className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              fairWage
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link to="/negotiations" className="hover:underline">
                Negotiations
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-white hover:bg-gray-900"
              >
                Start a Negotiation
              </Link>
            </nav>
          </div>
        </div>
      </Header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
