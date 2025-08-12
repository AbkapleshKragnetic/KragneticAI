
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from "./_components/Header";
import Footer from "./_components/footer";
import Getstarted from "./_components/Getstarted";
import { Space_Grotesk } from 'next/font/google';
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Choose the weights you need
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
      <body className={`${spaceGrotesk.className}`}
       
      >

        <Header />
        {children}
        <Getstarted />
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
