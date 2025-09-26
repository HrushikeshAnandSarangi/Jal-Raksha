"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image src="/logo.svg" alt="Jal-Raksha Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-semibold text-foreground">Jal-Raksha</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="/">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-accent font-medium transition-colors px-4 py-2"
              >
                Home
              </Button>
            </a>
            <a href="/working">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-accent font-medium transition-colors px-4 py-2"
              >
                How it Works 
              </Button>
            </a>
            <a href="/dashboard">
              <Button className=" bg-green-950 hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 ml-4 shadow-sm hover:shadow-md transition-all duration-200">
                Dashboard
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
              <a href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Button>
              </a>
              <a href="/working">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How it Works
                </Button>
              </a>
              <a href="/dashboard">
                <Button
                  className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
