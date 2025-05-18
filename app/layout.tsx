import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ClientLayoutWrapper from '@/app/components/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AllForChat - Modern Chat Application',
  description: 'A beautiful real-time chat application with reactions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
    </html>
  );
}