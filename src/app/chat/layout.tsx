import ChatHeader from "../components/chat/ChatHeader";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen max-h-screen pb-12">
        <div className="">
          <ChatHeader />
        </div>
        <div className="flex-grow px-8">
          {children}
        </div>
  </div>
  );
}