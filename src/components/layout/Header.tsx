import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-border">
      <nav className="mx-auto max-w-[1120px] px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between">
        <Link to="/" className="text-ivory text-2xl font-heading font-bold tracking-widest hover:text-gold transition-colors">
          NIDALUM
        </Link>
        
        <ul className="flex gap-12 items-center">
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
            <Link to="/contact" className="text-ivory text-sm font-body tracking-wide hover:text-gold transition-colors">
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Production Label - Institutional Stamp */}
        <div className="hidden md:flex items-center border-l border-border pl-8 ml-8">
          <p className="text-[0.6rem] font-body text-muted tracking-[0.12em] uppercase whitespace-nowrap" style={{ letterSpacing: '0.12em' }}>
            Production label<br />NIDALUM MUSIC
          </p>
        </div>
      </nav>
    </header>
  );
}
