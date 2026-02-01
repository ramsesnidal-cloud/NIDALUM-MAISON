import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white border-opacity-10">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 lg:py-20">
        {/* NIDALUM MUSIC Seal */}
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16 pb-8 border-b border-white border-opacity-10">
          <Image
            src="https://static.wixstatic.com/media/9c8aea_fd135d0ad42a4065b1414ce0a7f4db9f~mv2.png"
            alt="NIDALUM seal"
            width={40}
            height={40}
            className="mb-3 md:mb-4 opacity-60"
          />
          <p className="text-xs tracking-widest text-stone-500 uppercase mb-1">NIDALUM MUSIC</p>
          <p className="text-xs tracking-widest text-stone-600">The operational artistic foundation of the House</p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-base md:text-lg tracking-widest font-light mb-3 md:mb-4">
              NIDALUM
            </h3>
            <p className="text-xs text-stone-500 tracking-wide">
              A sacred house of creation.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-3 md:mb-4 text-stone-400">
                Discover
              </h4>
              <ul className="space-y-2 md:space-y-3">
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
                    to="/fashion"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/perfume"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Perfume
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
              <h4 className="text-xs tracking-widest uppercase font-light mb-3 md:mb-4 text-stone-400">
                Explore
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link
                    to="/grand-lexique"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Lexicon
                  </Link>
                </li>
                <li>
                  <Link
                    to="/grammaire-nidalum"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Grammar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/publications"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Publications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-3 md:mb-4 text-stone-400">
                Connect
              </h4>
              <ul className="space-y-2 md:space-y-3">
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
                <li>
                  <Link
                    to="/apprendre-langage"
                    className="text-xs text-stone-500 hover:text-white transition-colors duration-300"
                  >
                    Language
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest uppercase font-light mb-3 md:mb-4 text-stone-400">
                Legal
              </h4>
              <ul className="space-y-2 md:space-y-3">
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
        <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10 mb-6 md:mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-xs text-stone-600 tracking-wide text-center md:text-left">
            © {currentYear} NIDALUM. All rights reserved.
          </p>
          <p className="text-xs text-stone-600 tracking-wide text-center md:text-right">
            A sacred house of music, fashion, and perfume.
          </p>
        </div>
      </div>
    </footer>
  );
}
