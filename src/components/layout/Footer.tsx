import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white border-opacity-10">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg tracking-widest font-light mb-4">
              NIDALUM
            </h3>
            <p className="text-xs text-stone-500 tracking-wide">
              A sacred luxury house.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-4 text-stone-400">
                Discover
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/chants"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Music
                  </Link>
                </li>
                <li>
                  <Link
                    to="/apprendre-langage"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Language
                  </Link>
                </li>
                <li>
                  <Link
                    to="/origins"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Origins
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-4 text-stone-400">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/alphabet"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Alphabet
                  </Link>
                </li>
                <li>
                  <Link
                    to="/grammar"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Grammar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lexicon"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Lexicon
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-4 text-stone-400">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-4 text-stone-400">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10 mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600 tracking-wide">
            © {currentYear} NIDALUM. All rights reserved.
          </p>
          <p className="text-xs text-stone-600 tracking-wide">
            A sacred luxury house of music, fashion & perfume.
          </p>
        </div>
      </div>
    </footer>
  );
}
