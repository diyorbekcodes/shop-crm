import Content from "./Content";
import Header from "./Header";

interface MainProps {
  onMenuClick: () => void;
}

export default function Main({ onMenuClick }: MainProps) {
  return (
    <main className="min-w-0 flex-1 h-screen flex flex-col overflow-hidden ">
      <div className="shrink-0">
        <Header onMenuClick={onMenuClick} />
      </div>
      <Content />
    </main>
  );
}
