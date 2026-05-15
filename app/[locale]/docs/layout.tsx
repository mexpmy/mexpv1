"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Drawer, DrawerContent, DrawerBody, useDisclosure } from "@heroui/react";
// You can import a Menu icon from your icons folder or use a simple SVG
const MenuIcon = () => (
  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
    <line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="18" y2="18" />
  </svg>
);

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Create a reusable component for your links to keep it clean
  const SidebarLinks = () => (
    <div className="flex flex-col gap-4 p-4">
      <p className="font-bold text-xs uppercase text-default-400 tracking-wider">Getting Started</p>
      <nav className="flex flex-col gap-2">
        <a href="/en/docs" className="text-default-600 hover:text-primary py-1">Introduction</a>
        <a href="/en/docs/installation" className="text-default-600 hover:text-primary py-1">Installation</a>
        <a href="/en/docs/configuration" className="text-default-600 hover:text-primary py-1">Configuration</a>
      </nav>
      {/* Add more sections as needed */}
    </div>
  );

  return (
    <div className="relative flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
      
      {/* 📱 MOBILE FLOATING BUTTON - Hidden on Desktop (lg:hidden) */}
      <div className="lg:hidden fixed bottom-8 right-8 z-50">
        <Button
          isIconOnly
          className="bg-primary text-white shadow-lg"
          radius="full"
          size="lg"
          onPress={onOpen}
        >
          <MenuIcon />
        </Button>
      </div>

      {/* 💻 DESKTOP SIDEBAR - Hidden on Mobile (hidden lg:block) */}
      <aside className="hidden lg:block w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-default-100 pr-4">
        <SidebarLinks />
      </aside>

      {/* 📱 MOBILE DRAWER - Only appears when button is clicked */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="xs">
        <DrawerContent>
          {(onClose) => (
            <DrawerBody className="pt-10">
              <div onClick={onClose}> {/* Closes drawer when a link is clicked */}
                <SidebarLinks />
              </div>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>

      {/* 📄 MAIN CONTENT AREA */}
      <main className="flex-grow px-4 pb-20 lg:px-10">
        {children}
      </main>
    </div>
  );
}