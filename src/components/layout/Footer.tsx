import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-night border-t border-border">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14 py-14 lg:py-18">
        <div className="grid grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-ivory text-sm font-body tracking-wide mb-6 font-semibold">INFORMATION</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/imprint" className="text-muted text-sm hover:text-gold transition-colors">
                  Imprint
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted text-sm hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-sm hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div />
          <div />
          <div className="text-right">
            <p className="text-muted text-xs">© 2025 NIDALUM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
