import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian border-b border-border">
      <nav className="max-w-content mx-auto px-8 py-6 flex items-center justify-between">
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
      </nav>
    </header>
  );
}
