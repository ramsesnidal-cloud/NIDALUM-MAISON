import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-night border-t border-border overflow-x-hidden">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14 py-12 md:py-16 lg:py-18 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <h3 className="text-ivory text-xs md:text-sm font-body tracking-wide mb-4 md:mb-6 font-semibold uppercase">INFORMATION</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/imprint" className="text-muted text-xs md:text-sm hover:text-gold transition-colors">
                  Imprint
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted text-xs md:text-sm hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-xs md:text-sm hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="text-left sm:text-right">
            <p className="text-muted text-xs">© 2025 NIDALUM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
