import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { OfficialResources } from '@/entities';
import { Image } from '@/components/ui/image';
import { Download, FileText, Calendar, X, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ResourcesPage() {
  const [resources, setResources] = useState<OfficialResources[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<OfficialResources | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<OfficialResources>('officialresources');
    setResources(items);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const resourceTypes = ['all', ...Array.from(new Set(resources.map(item => item.resourceType).filter(Boolean)))];

  const filteredResources = selectedType === 'all' 
    ? resources 
    : resources.filter(r => r.resourceType === selectedType);

  const handleDownloadClick = (resource: OfficialResources) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  const handleConfirmDownload = () => {
    if (selectedResource?.fileUrl) {
      window.open(selectedResource.fileUrl, '_blank');
      setIsDialogOpen(false);
      setSelectedResource(null);
    }
  };

  const handleCancelDownload = () => {
    setIsDialogOpen(false);
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary mb-6">
              Ressources Officielles
            </h1>
            <p className="font-paragraph text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Téléchargez des documents officiels, guides d'apprentissage, et ressources pour approfondir votre maîtrise de Nidalum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/50 border border-primary/20 p-6 backdrop-blur-sm"
          >
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <span className="font-paragraph text-foreground/70">Type de ressource:</span>
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 font-paragraph text-sm transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent border border-primary/30 text-foreground hover:border-primary'
                  }`}
                >
                  {type === 'all' ? 'Toutes' : type}
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="font-paragraph text-sm text-foreground/60">
                {filteredResources.length} ressource{filteredResources.length !== 1 ? 's' : ''} disponible{filteredResources.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">Chargement des ressources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">Aucune ressource trouvée</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group"
                >
                  {resource.thumbnailImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={resource.thumbnailImage}
                        alt={resource.resourceName || 'Ressource'}
                        width={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="mb-4">
                      {resource.resourceType && (
                        <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary mb-3">
                          {resource.resourceType}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">
                        {resource.resourceName}
                      </h3>
                    </div>

                    {resource.description && (
                      <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                        {resource.description}
                      </p>
                    )}

                    {resource.publicationDate && (
                      <div className="flex items-center text-foreground/60 mb-4">
                        <Calendar className="w-4 h-4 mr-2 text-secondary" />
                        <span className="font-paragraph text-sm">{formatDate(resource.publicationDate)}</span>
                      </div>
                    )}

                    {resource.fileUrl && (
                      <button
                        onClick={() => handleDownloadClick(resource)}
                        className="inline-flex items-center bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300 w-full justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Resource Categories Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">
              Types de Ressources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Guides PDF</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Guides d'apprentissage complets et structurés
                </p>
              </div>
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Fiches Pratiques</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Résumés et aide-mémoires pour la pratique
                </p>
              </div>
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Documents Audio</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Prononciation et chants rituels enregistrés
                </p>
              </div>
              <div className="border border-primary/20 p-6 text-center bg-background/50 backdrop-blur-sm">
                <FileText className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-xl text-secondary mb-2">Matériel Visuel</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Posters, infographies, et supports visuels
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Download Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background border-2 border-primary/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl text-primary mb-4">
              Confirmation de Téléchargement
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirmez le téléchargement de la ressource
            </DialogDescription>
          </DialogHeader>

          {selectedResource && (
            <div className="space-y-6">
              {/* Resource Preview */}
              {selectedResource.thumbnailImage && (
                <div className="aspect-video overflow-hidden border border-primary/20">
                  <Image
                    src={selectedResource.thumbnailImage}
                    alt={selectedResource.resourceName || 'Ressource'}
                    width={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Resource Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-2xl text-secondary mb-2">
                    {selectedResource.resourceName}
                  </h3>
                  {selectedResource.resourceType && (
                    <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary">
                      {selectedResource.resourceType}
                    </span>
                  )}
                </div>

                {selectedResource.description && (
                  <div className="bg-dark-amber-shadow/20 border-l-4 border-primary p-4">
                    <p className="font-paragraph text-sm text-foreground/50 mb-2">Description:</p>
                    <p className="font-paragraph text-foreground/80 leading-relaxed">
                      {selectedResource.description}
                    </p>
                  </div>
                )}

                {selectedResource.publicationDate && (
                  <div className="flex items-center text-foreground/70">
                    <Calendar className="w-4 h-4 mr-2 text-secondary" />
                    <span className="font-paragraph text-sm">
                      Publié le {formatDate(selectedResource.publicationDate)}
                    </span>
                  </div>
                )}

                {/* Download Information */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-6 space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="font-paragraph text-sm text-foreground/80">
                      Cette ressource est gratuite et fait partie des documents officiels de l'Institut Nidalum
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="font-paragraph text-sm text-foreground/80">
                      Le téléchargement s'ouvrira dans un nouvel onglet
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="font-paragraph text-sm text-foreground/80">
                      Vous pouvez utiliser cette ressource pour votre apprentissage personnel de Nidalum
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleConfirmDownload}
                  className="flex-1 inline-flex items-center justify-center bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-4 hover:bg-primary/90 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Confirmer le Téléchargement
                </button>
                <button
                  onClick={handleCancelDownload}
                  className="flex-1 inline-flex items-center justify-center bg-transparent border-2 border-secondary text-secondary font-paragraph font-semibold px-6 py-4 hover:bg-secondary/10 transition-all duration-300"
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
