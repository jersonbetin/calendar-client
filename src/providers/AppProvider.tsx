'use client';
import useInitial from "@/hooks/useInitial";
import { Spinner } from "@nextui-org/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useInitial();

  if (loading) {
    return (
      <div className="flex w-full min-h-screen justify-center items-center">
        <Spinner label="Secondary" color="secondary" labelColor="secondary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AppProvider;
