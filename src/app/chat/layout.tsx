import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Tanish Patel",
  description:
    "Ask questions about Tanish Patel's work, projects, and research. Powered by AI with citations from site content.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
