import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Resume Generator",
  description: "Generate resumes and cover letters using AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <nav className="p-4 shadow bg-white">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="p-2">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/generate-resume" className="p-2">Generate Resume</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/generate-cover-letter" className="p-2">Generate Cover Letter</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
