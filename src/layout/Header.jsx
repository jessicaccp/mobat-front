export default function Header({ title }) {
  return (
    <header className="w-screen bg-slate-300">
      <div className="container flex flex-col mx-auto px-4 py-2">
        <a href="/" alt={title} className="w-fit">
          <h1 className="text-2xl">{title}</h1>
        </a>
      </div>
    </header>
  );
}
