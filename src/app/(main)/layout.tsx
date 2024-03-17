import { ReactNode } from 'react';
import CustomNavbar from '@components/navbar/CustomNavbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex min-h-screen w-full'>
      <CustomNavbar />
      {children}
    </main>
  );
};

export default Layout;
