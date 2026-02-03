import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-border">
      <nav className="mx-auto max-w-[1120px] px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between gap-4">
        <Link to="/" className="text-ivory text-2xl font-heading font-bold tracking-widest hover:text-gold transition-colors flex-shrink-0">
          NIDALUM
        </Link>
        
        <ul className="hidden md:flex gap-12 items-center flex-1">
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

        {/* Production Label - Institutional Stamp - Visible on all sizes */}
        <div className="flex items-center border-l border-border pl-4 md:pl-8 ml-auto md:ml-8 flex-shrink-0">
          <p className="text-[0.5rem] md:text-[0.6rem] font-body text-muted tracking-[0.12em] uppercase whitespace-nowrap" style={{ letterSpacing: '0.12em' }}>
            <span className="hidden md:inline">Production label<br /></span>NIDALUM MUSIC
          </p>
        </div>
      </nav>
    </header>
  );
}
