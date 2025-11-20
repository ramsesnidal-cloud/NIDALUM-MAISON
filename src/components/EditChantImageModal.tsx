import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { RitualChants } from '@/entities';
import { BaseCrudService } from '@/integrations';

interface EditChantImageModalProps {
  chant: RitualChants;
  onClose: () => void;
  onSave: (updatedChant: RitualChants) => void;
}

export default function EditChantImageModal({ chant, onClose, onSave }: EditChantImageModalProps) {
  const [imageUrl, setImageUrl] = useState(chant.chantImage || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setError('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La taille du fichier ne doit pas dépasser 5MB');
      return;
    }

    try {
      setIsSaving(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setImageUrl(base64String);
        setError('');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Erreur lors du chargement du fichier');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!imageUrl.trim()) {
      setError('Veuillez fournir une URL ou télécharger une image');
      return;
    }

    try {
      setIsSaving(true);
      const updatedChant: RitualChants = {
        _id: chant._id,
        chantTitle: chant.chantTitle,
        originalText: chant.originalText,
        translation: chant.translation,
        spiritualContext: chant.spiritualContext,
        chantImage: imageUrl,
        theme: chant.theme,
      };

      console.log('Saving chant with image:', updatedChant);
      await BaseCrudService.update<RitualChants>('ritualchants', updatedChant);
      console.log('Chant saved successfully');
      onSave(updatedChant);
      onClose();
    } catch (err) {
      console.error('Error saving image:', err);
      setError('Erreur lors de la sauvegarde de l\'image');
    } finally {
      setIsSaving(false);
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
        className="bg-background border border-primary/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-primary/20 bg-background/95 backdrop-blur-sm">
          <h2 className="font-heading text-2xl text-primary">
            Modifier l'image - {chant.chantTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Preview */}
          {imageUrl && (
            <div className="space-y-2">
              <p className="font-paragraph text-sm text-foreground/70">Aperçu:</p>
              <div className="aspect-video overflow-hidden rounded-lg border border-primary/20">
                <img
                  src={imageUrl}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="space-y-2">
            <label className="font-paragraph text-sm text-foreground/70">
              Télécharger une image
            </label>
            <div className="relative border-2 border-dashed border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isSaving}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-8 h-8 text-primary/60 mb-2" />
                <p className="font-paragraph text-sm text-foreground/70">
                  Cliquez pour sélectionner une image
                </p>
                <p className="font-paragraph text-xs text-foreground/50 mt-1">
                  Max 5MB
                </p>
              </div>
            </div>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <label className="font-paragraph text-sm text-foreground/70">
              Ou collez une URL d'image
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
              disabled={isSaving}
              className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg font-paragraph text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="font-paragraph text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-4 py-2 border border-primary/20 rounded-lg font-paragraph text-foreground hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !imageUrl.trim()}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
