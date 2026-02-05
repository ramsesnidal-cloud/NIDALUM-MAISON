import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-border">
      <nav className="w-full px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between gap-8">
        {/* Left: NIDALUM Logo */}
        <Link to="/" className="text-ivory text-2xl font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        {/* Center: Navigation Links - Spread horizontally */}
        <ul className="hidden lg:flex gap-8 items-center flex-1 justify-center">
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
          {/* Perfume and Fashion sections hidden - will be re-enabled in 6 months */}
          {/* <li>
            <Link to="/perfume" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              PERFUME
            </Link>
          </li>
          <li>
            <Link to="/fashion" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              FASHION
            </Link>
          </li> */}
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

        {/* Right: Institutional Stamp */}
        <div className="hidden md:flex items-center border-l border-border pl-6 lg:pl-8 flex-shrink-0">
          <p className="text-[0.5rem] lg:text-[0.6rem] font-body text-muted tracking-[0.1em] uppercase whitespace-nowrap" style={{ letterSpacing: '0.1em' }}>
            NIDALUM MUSIC<br />PRODUCTION
          </p>
        </div>
      </nav>
    </header>
  );
}
