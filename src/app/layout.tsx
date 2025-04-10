"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Definir pathname usando usePathname

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <QueryClientProvider client={queryClient}>
          {/* nombre tienda  */}
          <header  className="bg-pastel-lilac text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-full mr-2"
            />
            <h1 className="text-xl font-bold">Alestore</h1>
         </div>
          </header>
      {/* Mostrar el banner solo en la página principal */}
      {pathname === "/" && (
            <div className="w-screen h-80 bg-white-200 flex items-center justify-center">
              <img
                src="/banner-tienda.png" // Ruta de la imagen del banner
                alt="Banner de la tienda"
                className="w-full h-full object-contain"
              />
            </div>
          )}

        
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}