import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from "./_components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kragnetic-AI",
  description: "One event-driven platform to dial, qualify, and delight customers on every channel—while filling every form for you.",
  keywords: ["AI", "CRM automation", "customer engagement", "AI dialer", "event-driven platform"],
  openGraph: {
    title: "AI-Driven Conversations, Everywhere",
    description: "Dial, qualify, and delight customers with AI automation on every channel.",
    url: "https://yourdomain.com",
    siteName: "YourCompany",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Conversations Banner",
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
         <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
