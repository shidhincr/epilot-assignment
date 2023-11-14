import { Link, Outlet, useMatch } from "react-router-dom";

const NewSearchButton = () => {
  const isUserDetails = useMatch("/user/:username");
  if (isUserDetails) {
    return (
      <div className="text-slate-600 font-bold text-xs p-2 rounded-md cursor-pointer">
        <Link to="/">← New search</Link>
      </div>
    );
  }
  return null;
};

export default function Root() {
  return (
    <main className="w-full h-full bg-gradient-to-r from-sky-500 to-indigo-500">
      <header className="shadow-xl p-4 text-center bg-white flex">
        <div>
          <NewSearchButton />
        </div>
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 flex-grow">
          Github Search
        </h1>
      </header>
      <section className="pt-20 h-screen flex justify-center">
        <Outlet />
      </section>
    </main>
  );
}
