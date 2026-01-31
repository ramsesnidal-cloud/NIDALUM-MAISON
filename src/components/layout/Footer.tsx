import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deep-black border-t border-luxury-gold/10">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 border border-luxury-gold flex items-center justify-center flex-shrink-0">
                <span className="text-luxury-gold font-heading font-bold text-lg sm:text-2xl">◆</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl text-luxury-gold tracking-wider">NIDALUM</span>
                <span className="font-paragraph text-xs text-luxury-gold/50 tracking-widest">MAISON</span>
              </div>
            </div>
            <p className="font-paragraph text-xs sm:text-sm text-luxury-text/60 leading-relaxed">
              An exclusive gateway to consciousness. The Architect's creation awaits those who dare to decode reality.
            </p>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-luxury-gold mb-3 sm:mb-4">Language</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/alphabet" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Alphabet
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Grammar
                </Link>
              </li>
              <li>
                <Link to="/phonetics" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Phonetics
                </Link>
              </li>
              <li>
                <Link to="/lexicon" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Lexicon
                </Link>
              </li>
            </ul>
          </div>

          {/* Universe */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-luxury-gold mb-3 sm:mb-4">Universe</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chants" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Ritual Chants
                </Link>
              </li>
              <li>
                <Link to="/origins" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Origins
                </Link>
              </li>
              <li>
                <Link to="/publications" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/resources" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-luxury-gold mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-2 mb-4 sm:mb-6">
              <li>
                <Link to="/contact" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/author" className="font-paragraph text-xs sm:text-sm text-luxury-text/60 hover:text-luxury-gold transition-colors">
                  The Architect
                </Link>
              </li>
            </ul>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://facebook.com/share/17TQzqWwzM" target="_blank" rel="noopener noreferrer" className="text-luxury-text/60 hover:text-luxury-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/nidalumuniverseofficial?igsh=MTVsc2Jhem9renhoNQ==" target="_blank" rel="noopener noreferrer" className="text-luxury-text/60 hover:text-luxury-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/channel/UCOUh1sSDFaMgr24SNVLj4Nw" target="_blank" rel="noopener noreferrer" className="text-luxury-text/60 hover:text-luxury-gold transition-colors">
                <Youtube size={18} />
              </a>
              <a href="mailto:ramsesnidal@gmail.com" className="text-luxury-text/60 hover:text-luxury-gold transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-luxury-gold/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
            <p className="font-paragraph text-xs sm:text-sm text-luxury-text/40">
              © 2026 NIDALUM MAISON. All Realities Reserved.
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-luxury-text/40">
              Created by <span className="text-luxury-gold">The Architect</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
