import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="bg-gray-100 p-6 max-w-7xl mx-auto">{children}</div>;
}
