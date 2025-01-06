import { ReactNode } from "react";
import Header from "./Header";
import Container from "./Container";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header title="Checkpoint: frontend" subtitle="Countries" />
      <Container>{children}</Container>
    </div>
  );
}
