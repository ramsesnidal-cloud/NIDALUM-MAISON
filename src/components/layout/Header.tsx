import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useMember } from '@/integrations';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { member, isAuthenticated, actions } = useMember();

  const navigationLinks = [
    { label: 'Music', href: '/chants' },
    { label: 'Language', href: '/apprendre-langage' },
    { label: 'Origins', href: '/origins' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 backdrop-blur-sm border-b border-white border-opacity-10">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl tracking-widest font-light hover:opacity-70 transition-opacity">
          NIDALUM
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-xs tracking-widest uppercase hover:text-stone-400 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-6 border-l border-white border-opacity-20 pl-12">
              <Link
                to="/profile"
                className="text-xs tracking-widest uppercase hover:text-stone-400 transition-colors duration-300"
              >
                {member?.profile?.nickname || 'Profile'}
              </Link>
              <button
                onClick={actions.logout}
                className="text-xs tracking-widest uppercase hover:text-stone-400 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={actions.login}
              className="text-xs tracking-widest uppercase border border-white border-opacity-50 px-4 py-2 hover:border-opacity-100 hover:bg-white hover:text-black transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:opacity-70 transition-opacity"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-white border-opacity-10 bg-black bg-opacity-98">
          <div className="max-w-[100rem] mx-auto px-4 py-6 flex flex-col gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-widest uppercase hover:text-stone-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs tracking-widest uppercase hover:text-stone-400 transition-colors duration-300"
                >
                  {member?.profile?.nickname || 'Profile'}
                </Link>
                <button
                  onClick={() => {
                    actions.logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs tracking-widest uppercase hover:text-stone-400 transition-colors duration-300 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  actions.login();
                  setMobileMenuOpen(false);
                }}
                className="text-xs tracking-widest uppercase border border-white border-opacity-50 px-4 py-2 hover:border-opacity-100 transition-all duration-300 w-full text-center"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
