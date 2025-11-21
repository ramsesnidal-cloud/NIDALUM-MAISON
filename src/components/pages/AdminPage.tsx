import { useState } from 'react';
import { useAdminStore } from '@/lib/admin-store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AudioDiagnostics from '@/components/AudioDiagnostics';
import AudioDebugger from '@/components/AudioDebugger';
import { Lock, LogOut } from 'lucide-react';

export default function AdminPage() {
  const { isAdmin, setAdmin, adminPassword } = useAdminStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAdmin(true);
      setPassword('');
      setError('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setAdmin(false);
    setPassword('');
    setError('');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md px-6">
            <div className="bg-background border border-primary/30 p-8">
              <div className="flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-primary mr-3" />
                <h1 className="font-heading text-3xl text-primary">Admin Panel</h1>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block font-paragraph text-sm text-foreground mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez le mot de passe admin"
                    className="w-full px-4 py-2 bg-background border border-primary/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary/80 transition-colors font-paragraph"
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive font-paragraph text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-primary-foreground font-heading hover:bg-primary/90 transition-colors"
                >
                  Connexion
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-heading text-4xl text-primary">Panneau d'Administration</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground font-heading hover:bg-destructive/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        <div className="space-y-8">
          {/* Audio Diagnostics Section */}
          <div className="border border-primary/30 p-8 bg-background/50 backdrop-blur-sm">
            <h2 className="font-heading text-2xl text-secondary mb-6">Diagnostic Audio</h2>
            <AudioDiagnostics />
          </div>

          {/* Audio Debugger Section */}
          <div className="border border-primary/30 p-8 bg-background/50 backdrop-blur-sm">
            <h2 className="font-heading text-2xl text-secondary mb-6">Débogage Audio</h2>
            <AudioDebugger />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
