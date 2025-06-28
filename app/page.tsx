import QueryForm from "./QueryForm";

export default function Home() {
  return (
    <>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center px-2">
        <header className="mb-4">
          <h1>Hello World</h1>
        </header>
        <div className="chat-container w-full max-w-3xl mx-auto flex-grow">
          <div id="messages" className="flex flex-col gap-3">
            <div className="chat chat-start">
              <div className="chat">
                It's over Anakin,
                <br />I have the high ground.
              </div>
            </div>
            <div className="chat justify-end">
              <div className="chat-bubble chat-bubble-info">
                You underestimate my power!
              </div>
            </div>
          </div>
        </div>
        <QueryForm />
      </div>
    </>
  );
}
