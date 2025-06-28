import Messages from "./Messages";
import QueryForm from "./QueryForm";

export default function Home() {
  return (
    <>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center px-2">
        <header className="mb-4">
          <h1>Hello World</h1>
        </header>
        <Messages />
        <QueryForm />
      </div>
    </>
  );
}
