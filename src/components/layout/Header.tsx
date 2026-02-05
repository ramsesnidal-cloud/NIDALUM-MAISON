import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-border w-full">
      {/* Desktop Navigation - lg and up */}
      <nav className="hidden lg:flex w-full px-8 xl:px-16 py-5 items-center justify-between gap-6">
        {/* Left: NIDALUM Logo */}
        <Link to="/" className="text-ivory text-xl xl:text-2xl font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        {/* Center: Navigation Links */}
        <ul className="flex gap-6 xl:gap-8 items-center flex-1 justify-center">
          <li>
            <Link to="/house" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              THE HOUSE
            </Link>
          </li>
          <li>
            <Link to="/literature" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              LITERATURE
            </Link>
          </li>
          <li>
            <Link to="/sacred" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              SACRED MUSIC
            </Link>
          </li>
          <li>
            <Link to="/artists" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              ARTISTS
            </Link>
          </li>
          <li>
            <Link to="/fragments" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              LANGUAGE
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              CONTACT
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-ivory text-xs xl:text-sm font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              SIGN UP
            </Link>
          </li>
        </ul>

        {/* Right: Institutional Stamp */}
        <div className="flex items-center border-l border-border pl-6 xl:pl-8 flex-shrink-0">
          <p className="text-[0.55rem] xl:text-[0.6rem] font-body text-muted tracking-[0.1em] uppercase whitespace-nowrap">
            NIDALUM MUSIC PRODUCTION
          </p>
        </div>
      </nav>

      {/* Mobile Navigation - base to sm */}
      <nav className="flex md:hidden w-full px-3 sm:px-4 py-3 items-center justify-between gap-2">
        <Link to="/" className="text-ivory text-base sm:text-lg font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-ivory hover:text-gold transition-colors flex-shrink-0 p-1"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Tablet Navigation - md to lg */}
      <nav className="hidden md:flex lg:hidden w-full px-4 sm:px-6 py-4 items-center justify-between gap-3">
        <Link to="/" className="text-ivory text-lg sm:text-xl font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        <ul className="flex gap-2 sm:gap-3 items-center flex-1 justify-center">
          <li>
            <Link to="/house" className="text-ivory text-[0.65rem] sm:text-xs font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              HOUSE
            </Link>
          </li>
          <li>
            <Link to="/literature" className="text-ivory text-[0.65rem] sm:text-xs font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              LITERATURE
            </Link>
          </li>
          <li>
            <Link to="/sacred" className="text-ivory text-[0.65rem] sm:text-xs font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              MUSIC
            </Link>
          </li>
          <li>
            <Link to="/artists" className="text-ivory text-[0.65rem] sm:text-xs font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              ARTISTS
            </Link>
          </li>
          <li>
            <Link to="/fragments" className="text-ivory text-[0.65rem] sm:text-xs font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              LANGUAGE
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-ivory text-[0.65rem] sm:text-xs font-body tracking-wide hover:text-gold transition-colors whitespace-nowrap">
              CONTACT
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-ivory hover:text-gold transition-colors flex-shrink-0"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown - base to md */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian border-t border-border">
          <ul className="flex flex-col gap-1 px-3 sm:px-4 py-3">
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/house" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                THE HOUSE
              </Link>
            </li>
            <li>
              <Link to="/sacred" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                SACRED MUSIC
              </Link>
            </li>
            <li>
              <Link to="/artists" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                ARTISTS
              </Link>
            </li>
            <li>
              <Link to="/literature" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                LITERATURE
              </Link>
            </li>
            <li>
              <Link to="/fragments" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                LANGUAGE
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                CONTACT
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                SIGN UP
              </Link>
            </li>
            <li className="border-t border-border pt-3 mt-3">
              <p className="text-[0.5rem] font-body text-muted tracking-[0.1em] uppercase" style={{ letterSpacing: '0.1em' }}>
                NIDALUM MUSIC PRODUCTION
              </p>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
