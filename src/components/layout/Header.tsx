import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-border overflow-x-hidden w-full">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex w-full px-16 py-6 items-center justify-between gap-8">
        {/* Left: NIDALUM Logo */}
        <Link to="/" className="text-ivory text-2xl font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        {/* Center: Navigation Links - Spread horizontally on same line */}
        <ul className="flex gap-8 items-center flex-1 justify-center">
          <li>
            <Link to="/house" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              THE HOUSE
            </Link>
          </li>
          <li>
            <Link to="/literature" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              LITERATURE
            </Link>
          </li>
          <li>
            <Link to="/sacred" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              SACRED MUSIC
            </Link>
          </li>
          <li>
            <Link to="/artists" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              ARTISTS
            </Link>
          </li>
          <li>
            <Link to="/fragments" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              LANGUAGE
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              CONTACT
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              SIGN UP
            </Link>
          </li>
        </ul>

        {/* Right: Institutional Stamp - Same horizontal line */}
        <div className="flex items-center border-l border-border pl-8 flex-shrink-0">
          <p className="text-[0.6rem] font-body text-muted tracking-[0.1em] uppercase whitespace-nowrap" style={{ letterSpacing: '0.1em' }}>
            NIDALUM MUSIC PRODUCTION
          </p>
        </div>
      </nav>

      {/* Tablet Navigation */}
      <nav className="hidden md:flex lg:hidden w-full px-6 py-4 items-center justify-between gap-4 overflow-x-hidden">
        <Link to="/" className="text-ivory text-xl font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        <ul className="flex gap-4 items-center flex-1 justify-center">
          <li>
            <Link to="/house" className="text-ivory text-xs font-body tracking-wide hover:text-gold transition-colors">
              HOUSE
            </Link>
          </li>
          <li>
            <Link to="/literature" className="text-ivory text-xs font-body tracking-wide hover:text-gold transition-colors">
              LITERATURE
            </Link>
          </li>
          <li>
            <Link to="/sacred" className="text-ivory text-xs font-body tracking-wide hover:text-gold transition-colors">
              MUSIC
            </Link>
          </li>
          <li>
            <Link to="/artists" className="text-ivory text-xs font-body tracking-wide hover:text-gold transition-colors">
              ARTISTS
            </Link>
          </li>
          <li>
            <Link to="/fragments" className="text-ivory text-xs font-body tracking-wide hover:text-gold transition-colors">
              LANGUAGE
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-ivory text-xs font-body tracking-wide hover:text-gold transition-colors">
              CONTACT
            </Link>
          </li>
        </ul>

        <div className="flex items-center border-l border-border pl-4 flex-shrink-0">
          <p className="text-[0.5rem] font-body text-muted tracking-[0.1em] uppercase whitespace-nowrap" style={{ letterSpacing: '0.1em' }}>
            NIDALUM MUSIC<br />PRODUCTION
          </p>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden w-full px-4 py-3 flex items-center justify-between overflow-x-hidden">
        <Link to="/" className="text-ivory text-lg font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-ivory hover:text-gold transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian border-t border-border overflow-x-hidden">
          <ul className="flex flex-col gap-3 px-4 py-4">
            <li>
              <Link to="/house" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                THE HOUSE
              </Link>
            </li>
            <li>
              <Link to="/literature" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                LITERATURE
              </Link>
            </li>
            <li>
              <Link to="/sacred" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                SACRED MUSIC
              </Link>
            </li>
            <li>
              <Link to="/artists" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                ARTISTS
              </Link>
            </li>
            <li>
              <Link to="/fragments" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                LANGUAGE
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
                CONTACT
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors block py-2">
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
