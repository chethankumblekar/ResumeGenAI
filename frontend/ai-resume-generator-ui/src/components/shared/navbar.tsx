"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants/navigation";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-semibold text-primary tracking-tight">
          ResumeGenAI
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger className="text-muted-foreground hover:text-primary">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="text-lg font-semibold mb-4">Menu</SheetHeader>
              <nav className="flex flex-col gap-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <ModeToggle />
        </div>

        {/* Theme Toggle for Desktop */}
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
