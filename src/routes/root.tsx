import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";

const Nav = () => {
  const isUserPage = useMatch("/user/:username");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  if (isUserPage) {
    return (
      <div className="flex gap-2">
        <div
          className="text-slate-600 font-bold text-xs p-2 rounded-md cursor-pointer"
          onClick={goBack}
        >
          ← Back
        </div>
        <div className="font-bold text-xs p-2 rounded-md cursor-pointer bg-blue-400 text-slate-100">
          <Link to="/">New Search</Link>
        </div>
      </div>
    );
  }
  return null;
};

export default function Root() {
  return (
    <main className="w-full h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
      <header className="shadow-xl p-4 text-center bg-white flex">
        <div className="flex-shrink-0">
          <Nav />
        </div>
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 flex-grow">
          Github Search
        </h1>
      </header>
      <section className="flex justify-center p-10 max-h-[calc(100vh-10%)]">
        <Outlet />
      </section>
    </main>
  );
}
