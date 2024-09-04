"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { clsx } from "clsx";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full p-4 bg-gray-800">
      <NavigationMenu className="max-w-6xl mx-auto">
        <NavigationMenuList className="flex justify-between px-4 md:px-8 lg:px-16 gap-2">
          {[
            { href: "/", label: "Home" },
            { href: "/image-generation", label: "Image Generation" },
            { href: "/about", label: "About" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <NavigationMenuItem key={item.href} className="mx-2">
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    "px-3 py-2 text-sm font-medium rounded-xl",
                    "text-gray-300 hover:text-white",
                    "transition-colors duration-200",
                    "focus:outline-none",
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-transparent hover:bg-gray-700"
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
