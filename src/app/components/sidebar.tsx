"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "./side-bar"; // No SidebarLink import to avoid conflicts
import {
  IconCategory,
  IconUser,
  IconMail,
  IconInfoCircle,
  IconClipboardList,
  IconBox , 
} from "@tabler/icons-react"; // Import new icons
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../lib/utils";
import Categories from "../dashboard/dashboard-components/categories";
import UsersControl from "../dashboard/dashboard-components/users";
import Orders from "../dashboard/dashboard-components/orders";
import Items from "../dashboard/dashboard-components/items";
import ContactInformation from "../dashboard/dashboard-components/contactInformation";


// Main SidebarDemo Component
export function SidebarDemo() {
  const [activePage, setActivePage] = useState("Categories");
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Categories",
      href: "#",
      icon: <IconCategory />,
      page: "Categories",
      onClick: () => setActivePage("Categories"),
    },
    {
      label: "Users",
      href: "#",
      icon: <IconUser />,
      page: "Users",
      onClick: () => setActivePage("Users"),
    },
    {
      label: "Orders",
      href: "#",
      icon: <IconClipboardList />,
      page: "Orders",
      onClick: () => setActivePage("Orders"),
    },
    {
        label: "Items",
        href: "#",
        icon: <IconBox />, // Use the imported icon
        page: "Items",
        onClick: () => setActivePage("Items"),
      },
    {
      label: "Contact Information",
      href: "#",
      icon: <IconMail />,
      page: "Contact Information",
      onClick: () => setActivePage("Contact Information"),
    },
    {
      label: "About Us",
      href: "#",
      icon: <IconInfoCircle />,
      page: "About Us",
      onClick: () => setActivePage("About Us"),
    },

  ];

  const renderContent = () => {
    switch (activePage) {
      case "Categories":
        return <Categories />;
      case "Users":
        return <UsersControl />;
        case "Orders":
          return <Orders />;
        case "Items": 
        return <Items />;
      case "Contact Information":
        return <ContactInformation />;
      case "About Us":
        return <AboutUs />;
      default:
        return <Categories />;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full h-screen bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
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

      <div className="flex flex-1">{renderContent()}</div>
    </div>
  );
}

// Custom Sidebar Link Component
interface CustomSidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
  };
}

const CustomSidebarLink: React.FC<CustomSidebarLinkProps> = ({ link }) => (
  <div onClick={link.onClick} className="cursor-pointer">
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



const AboutUs = () => (
  <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
    <h1 className="text-2xl font-semibold">About Us</h1>
    <p>This is the about us page.</p>
  </div>
);

