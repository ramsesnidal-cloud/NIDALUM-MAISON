import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/20">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-background font-heading font-bold text-2xl">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl text-primary tracking-wider">NIDALUM</span>
                <span className="font-paragraph text-xs text-secondary tracking-widest">LANGUAGE INSTITUTE</span>
              </div>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
              Un institut dédié à la langue sacrée Nidalum, à l'univers narratif Souma-Ra, et à l'expression artistique afrofuturiste.
            </p>
          </div>

          {/* Langue */}
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Langue</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/alphabet" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Alphabet Toraé-Shira
                </Link>
              </li>
              <li>
                <Link to="/grammar" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Grammaire
                </Link>
              </li>
              <li>
                <Link to="/phonetics" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Phonétique
                </Link>
              </li>
              <li>
                <Link to="/lexicon" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Lexique
                </Link>
              </li>
            </ul>
          </div>

          {/* Spiritualité & Univers */}
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Univers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chants" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Chants Rituels
                </Link>
              </li>
              <li>
                <Link to="/origins" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Origines Souma-Ra
                </Link>
              </li>
              <li>
                <Link to="/academy" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link to="/publications" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Contact</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link to="/resources" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Ressources Officielles
                </Link>
              </li>
              <li>
                <Link to="/author" className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors">
                  Ramses Nidal
                </Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a href="https://Facebook.com/share/17TQzqWwzM" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://wwww.instagram.com/nidalumuniverseofficial?igsh=MTVsc2Jhem9renhoNQ==" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCOUh1sSDFaMgr24SNVLj4Nw" className="text-foreground/70 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="ramsesnidal@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-paragraph text-sm text-foreground/50">
              © 2025 NIDALUM Language Institute. Tous droits réservés.
            </p>
            <p className="font-paragraph text-sm text-foreground/50">
              Créé par <span className="text-primary">Ramses Nidal</span> (Aboudramane Doumbia)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
