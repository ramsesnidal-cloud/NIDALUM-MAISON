import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';

interface AdminLoginModalProps {
  onClose: () => void;
}

export default function AdminLoginModal({ onClose }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminPassword, setAdmin } = useAdminStore();

  const handleLogin = () => {
    if (password === adminPassword) {
      setAdmin(true);
      onClose();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-background border border-primary/30 rounded-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            <h2 className="font-heading text-2xl text-primary">Accès Admin</h2>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="font-paragraph text-sm text-foreground/70">
            Entrez votre mot de passe administrateur pour accéder aux outils de modification.
          </p>

          <div className="space-y-2">
            <label className="font-paragraph text-sm text-foreground/70">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="font-paragraph text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg font-paragraph text-foreground hover:bg-primary/10 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleLogin}
              disabled={!password.trim()}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Connexion
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
