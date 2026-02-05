import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-night border-t border-border">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 xl:px-14 py-8 sm:py-12 md:py-14 lg:py-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <div>
            <h3 className="text-ivory text-[0.7rem] sm:text-xs md:text-sm font-body tracking-wide mb-3 sm:mb-4 md:mb-5 font-semibold uppercase">INFORMATION</h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <li>
                <Link to="/imprint" className="text-muted text-[0.65rem] sm:text-xs md:text-sm hover:text-gold transition-colors">
                  Imprint
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted text-[0.65rem] sm:text-xs md:text-sm hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-[0.65rem] sm:text-xs md:text-sm hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="text-left sm:text-right">
            <p className="text-muted text-[0.65rem] sm:text-xs md:text-sm">© 2025 NIDALUM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
