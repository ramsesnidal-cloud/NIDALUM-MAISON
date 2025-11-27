import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/20">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-background font-heading font-bold text-lg sm:text-2xl">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl text-primary tracking-wider">NIDALUM</span>
                <span className="font-paragraph text-xs text-secondary tracking-widest">LANGUAGE INSTITUTE</span>
              </div>
            </div>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/70 leading-relaxed">
              Un institut dédié à la langue sacrée Nidalum, à l'univers narratif Souma-Ra, et à l'expression artistique afrofuturiste.
            </p>
          </div>

          {/* Langue */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-primary mb-3 sm:mb-4">Langue</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/alphabet" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Alphabet Toraé-Shira
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Grammaire
                </Link>
              </li>
              <li>
                <Link to="/phonetics" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Phonétique
                </Link>
              </li>
              <li>
                <Link to="/lexicon" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Lexique
                </Link>
              </li>
            </ul>
          </div>

          {/* Spiritualité & Univers */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-primary mb-3 sm:mb-4">Univers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chants" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Chants Rituels
                </Link>
              </li>
              <li>
                <Link to="/origins" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Origines Souma-Ra
                </Link>
              </li>
              <li>
                <Link to="/academy" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link to="/publications" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-primary mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-2 mb-4 sm:mb-6">
              <li>
                <Link to="/contact" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link to="/resources" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Ressources Officielles
                </Link>
              </li>
              <li>
                <Link to="/author" className="font-paragraph text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors">
                  Ramses Nidal
                </Link>
              </li>
            </ul>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://facebook.com/share/17TQzqWwzM" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/nidalumuniverseofficial?igsh=MTVsc2Jhem9renhoNQ==" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/channel/UCOUh1sSDFaMgr24SNVLj4Nw" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                <Youtube size={18} />
              </a>
              <a href="mailto:ramsesnidal@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
            <p className="font-paragraph text-xs sm:text-sm text-foreground/50">
              © 2025 NIDALUM Language Institute. Tous droits réservés.
            </p>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/50">
              Créé par <span className="text-primary">Ramses Nidal</span> (Aboudramane Doumbia)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
