import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar
      className="backdrop-blur-md bg-background/70 border-b border-default-200"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <NextLink className="flex items-center gap-2" href="/">
            <Logo />
            <div className="flex flex-col leading-tight">
              <span className="text-sm uppercase tracking-[0.35em] text-default-500">
                Alliance
              </span>
              <span className="text-base font-semibold text-foreground">
                Personnel Archive
              </span>
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex items-center gap-2">
          <Button
            isExternal
            as={Link}
            className="text-sm"
            href={siteConfig.links.swapi}
            variant="flat"
          >
            SWAPI Data
          </Button>
          <Button
            isExternal
            as={Link}
            className="text-sm"
            href={siteConfig.links.gallery}
            variant="bordered"
          >
            Image Archive
          </Button>
        </NavbarItem>
        <NavbarItem className="flex items-center gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
