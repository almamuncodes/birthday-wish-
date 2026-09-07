import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata = {
  title: "শুভ জন্মদিন আপু! 🌸 | ভালোবাসার স্মৃতির অ্যালবাম ও সারপ্রাইজ",
  description: "প্রিয় আপুর জন্মদিনের জন্য তৈরি একটি একান্ত সারপ্রাইজ ও স্মৃতিচারণের পাতা।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfaff] text-[#1e1b2e]">
        {children}
      </body>
    </html>
  );
}
