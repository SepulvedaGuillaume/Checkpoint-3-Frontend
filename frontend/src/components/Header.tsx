interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-pink-500 text-white py-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm mt-1">{subtitle}</p>
      </div>
    </header>
  );
}
