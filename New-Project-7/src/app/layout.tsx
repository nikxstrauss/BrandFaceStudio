import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "brandface.studio – Premium Brand Faces für authentische Kampagnen",
  description: "Wir helfen Marken dabei, echte Brand Faces als visuelles Aushängeschild und Wiedererkennungsmerkmal zu etablieren.",
  keywords: ["Brand Faces", "Influencer Marketing", "Social Media Kampagnen", "Content Creator", "Marketing Agentur"],
  authors: [{ name: "brandface.studio" }],
  openGraph: {
    title: "brandface.studio – Premium Brand Faces",
    description: "Wir helfen Marken dabei, echte Brand Faces als visuelles Aushängeschild zu etablieren.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
