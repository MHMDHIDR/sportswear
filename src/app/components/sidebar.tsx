"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "./side-bar";
import {
  IconCategory,
  IconUser,
  IconMail,
  IconInfoCircle,
  IconClipboardList,
  IconBox,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../lib/utils";

// Main SidebarDemo Component
export function SidebarDemo() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Categories",
      href: "/dashboard/categories",
      icon: <IconCategory />,
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: <IconUser />,
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: <IconClipboardList />,
    },
    {
      label: "Items",
      href: "/dashboard/items",
      icon: <IconBox />,
    },
    {
      label: "Contact Information",
      href: "/dashboard/contact-information",
      icon: <IconMail />,
    },
    {
      label: "About Us",
      href: "/dashboard/about-us",
      icon: <IconInfoCircle />,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row max-w-64 h-screen bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <CustomSidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <CustomSidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1">{/* Page content will be loaded separately */}</div>
    </div>
  );
}

// Custom Sidebar Link Component
interface CustomSidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
}

const CustomSidebarLink: React.FC<CustomSidebarLinkProps> = ({ link }) => (
  <div className="cursor-pointer">
    <Link href={link.href} className="flex items-center gap-2">
      {link.icon}
      <span>{link.label}</span>
    </Link>
  </div>
);

// Logo Component
export const Logo = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Acet Labs
    </motion.span>
  </Link>
);
