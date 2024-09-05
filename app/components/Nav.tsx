"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  { title: "Home", href: "/" },
  { title: "Image Generation", href: "/image-generation" },
  { title: "About", href: "/about" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <nav className="border-b bg-slate-700">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link href="/" className="text-2xl font-bold text-white">
          ImageGenie
        </Link>
        <div className="hidden md:flex space-x-4">
          {routes.map((route) => (
            <Button
              className={cn(
                "transition-all duration-300 ease-in-out rounded-xl text-gray-100", // Set border radius to none
                pathname === route.href &&
                  "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:text-white focus:text-white active:text-white"
              )}
              key={route.href}
              variant="ghost"
              asChild
            >
              <Link className="hover:text-gray-300" href={route.href}>
                {route.title}
              </Link>
            </Button>
          ))}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-white focus:text-white active:text-white"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 py-4 bg-gray-500/80 text-white rounded-xl">
              {routes.map((route) => (
                <Button
                  className={cn(
                    "transition-all duration-300 ease-in-out text-gray-100",
                    pathname === route.href &&
                      "bg-gradient-to-r from-blue-500/75 to-purple-600/75 text-white focus:text-white active:text-white"
                  )}
                  key={route.href}
                  variant="ghost"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link className="hover:text-gray-300" href={route.href}>
                    {route.title}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
