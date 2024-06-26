export default function Header({ title }) {
  return (
    <header className="w-screen bg-slate-300">
      <div className="container flex flex-col mx-auto px-4 py-2">
        <h1 className="text-2xl">{title}</h1>
      </div>
    </header>
  );
}
