import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { OfficialResources, NidalumLexicon } from '@/entities';
import { Image } from '@/components/ui/image';
import { Download, FileText, Calendar, X, CheckCircle, BookOpen, Scroll, Plus, Save, Trash2, Sparkles, Lightbulb, Globe, Volume2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ResourcesPage() {
  const [resources, setResources] = useState<OfficialResources[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<OfficialResources | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Dictionary management states
  const [userWords, setUserWords] = useState<NidalumLexicon[]>([]);
  const [selectedWordDetail, setSelectedWordDetail] = useState<NidalumLexicon | null>(null);
  const [newWord, setNewWord] = useState({
    nidalumWord: '',
    definition: '',
    category: '',
    theme: '',
    pronunciationGuide: '',
    exampleSentence: '',
    etymology: '',
    traduction_fr: '',
    expression_nidalum: ''
  });

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

  const handleCancelDownload = () => {
    setIsDialogOpen(false);
    setSelectedResource(null);
  };

  const handleAddWord = async () => {
    if (!newWord.nidalumWord || !newWord.definition) {
      alert('Veuillez remplir au minimum le mot Nidalum et sa définition');
      return;
    }

    const wordToAdd: NidalumLexicon = {
      _id: crypto.randomUUID(),
      ...newWord
    };

    await BaseCrudService.create('nidalumlexicon', wordToAdd);
    setUserWords([...userWords, wordToAdd]);
    
    // Reset form
    setNewWord({
      nidalumWord: '',
      definition: '',
      category: '',
      theme: '',
      pronunciationGuide: '',
      exampleSentence: '',
      etymology: '',
      traduction_fr: '',
      expression_nidalum: ''
    });
  };

  const handleDeleteWord = async (wordId: string) => {
    await BaseCrudService.delete('nidalumlexicon', wordId);
    setUserWords(userWords.filter(w => w._id !== wordId));
  };

  const handleDownloadWithWords = () => {
    if (selectedResource?.fileUrl) {
      // Create a text file with user's dictionary words
      if (userWords.length > 0) {
        const wordsText = userWords.map(word => 
          `${word.nidalumWord}\n` +
          `Définition: ${word.definition}\n` +
          (word.category ? `Catégorie: ${word.category}\n` : '') +
          (word.theme ? `Thème: ${word.theme}\n` : '') +
          (word.pronunciationGuide ? `Prononciation: ${word.pronunciationGuide}\n` : '') +
          (word.exampleSentence ? `Exemple: ${word.exampleSentence}\n` : '') +
          (word.etymology ? `Étymologie: ${word.etymology}\n` : '') +
          (word.traduction_fr ? `Traduction FR: ${word.traduction_fr}\n` : '') +
          (word.expression_nidalum ? `Expression: ${word.expression_nidalum}\n` : '') +
          '\n---\n\n'
        ).join('');

        const blob = new Blob([`MES MOTS NIDALUM\n\n${wordsText}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mon-dictionnaire-nidalum.txt';
        a.click();
        URL.revokeObjectURL(url);
      }

      // Open the original resource
      window.open(selectedResource.fileUrl, '_blank');
      setIsDialogOpen(false);
      setSelectedResource(null);
    }
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
        <DialogContent className="bg-background border-2 border-primary/30 max-w-7xl max-h-[95vh] overflow-hidden p-0">
          <DialogHeader className="px-8 pt-8 pb-4 border-b border-primary/20">
            <DialogTitle className="font-heading text-3xl text-primary">
              {selectedResource?.resourceName}
            </DialogTitle>
            <DialogDescription className="font-paragraph text-foreground/60 mt-2">
              Consultez les informations et enrichissez votre dictionnaire personnel
            </DialogDescription>
          </DialogHeader>

          {selectedResource && (
            <div className="flex flex-col h-[calc(95vh-140px)]">
              <Tabs defaultValue="info" className="flex-1 flex flex-col">
                <TabsList className="mx-8 mt-4 grid w-auto grid-cols-2 bg-dark-amber-shadow/20">
                  <TabsTrigger value="info" className="font-paragraph data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    📄 Informations
                  </TabsTrigger>
                  <TabsTrigger value="dictionary" className="font-paragraph data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                    📚 Mon Dictionnaire
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="flex-1 overflow-hidden px-8 pb-4">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-6 py-4">
                      {/* Resource Preview */}
                      {selectedResource.thumbnailImage && (
                        <div className="aspect-video overflow-hidden border border-primary/20 rounded-sm">
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
                        {selectedResource.resourceType && (
                          <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary">
                            {selectedResource.resourceType}
                          </span>
                        )}

                        {selectedResource.description && (
                          <div className="bg-dark-amber-shadow/20 border-l-4 border-primary p-4 rounded-r-sm">
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
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-6 rounded-sm space-y-3">
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
                          {userWords.length > 0 && (
                            <div className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                              <p className="font-paragraph text-sm text-foreground/80">
                                Votre dictionnaire personnel ({userWords.length} mot{userWords.length > 1 ? 's' : ''}) sera téléchargé avec la ressource
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="dictionary" className="flex-1 overflow-hidden px-8 pb-4">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-6 py-4">
                      {/* Add New Word Form */}
                      <div className="border-2 border-primary/30 bg-gradient-to-br from-dark-amber-shadow/30 to-background p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-primary/20 rounded-sm">
                            <Plus className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="font-heading text-xl text-primary">
                            Ajouter un Nouveau Mot
                          </h4>
                        </div>

                        <div className="space-y-4">
                          {/* Primary Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nidalumWord" className="font-paragraph text-sm font-semibold text-foreground/90">
                                Mot Nidalum <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="nidalumWord"
                                value={newWord.nidalumWord}
                                onChange={(e) => setNewWord({ ...newWord, nidalumWord: e.target.value })}
                                placeholder="Ex: Thalamir"
                                className="bg-background/80 border-primary/30 text-foreground focus:border-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="pronunciationGuide" className="font-paragraph text-sm font-semibold text-foreground/90">
                                Prononciation
                              </Label>
                              <Input
                                id="pronunciationGuide"
                                value={newWord.pronunciationGuide}
                                onChange={(e) => setNewWord({ ...newWord, pronunciationGuide: e.target.value })}
                                placeholder="Ex: ta-la-mir"
                                className="bg-background/80 border-primary/30 text-foreground focus:border-primary"
                              />
                            </div>
                          </div>

                          {/* Definition */}
                          <div className="space-y-2">
                            <Label htmlFor="definition" className="font-paragraph text-sm font-semibold text-foreground/90">
                              Définition <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                              id="definition"
                              value={newWord.definition}
                              onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
                              placeholder="Définition du mot..."
                              className="bg-background/80 border-primary/30 text-foreground min-h-[80px] focus:border-primary"
                            />
                          </div>

                          {/* Category and Theme */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category" className="font-paragraph text-sm font-semibold text-foreground/90">
                                Catégorie
                              </Label>
                              <Input
                                id="category"
                                value={newWord.category}
                                onChange={(e) => setNewWord({ ...newWord, category: e.target.value })}
                                placeholder="Ex: Nom, Verbe, Adjectif"
                                className="bg-background/80 border-primary/30 text-foreground focus:border-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="theme" className="font-paragraph text-sm font-semibold text-foreground/90">
                                Thème
                              </Label>
                              <Input
                                id="theme"
                                value={newWord.theme}
                                onChange={(e) => setNewWord({ ...newWord, theme: e.target.value })}
                                placeholder="Ex: Spiritualité, Nature"
                                className="bg-background/80 border-primary/30 text-foreground focus:border-primary"
                              />
                            </div>
                          </div>

                          {/* Example Sentence */}
                          <div className="space-y-2">
                            <Label htmlFor="exampleSentence" className="font-paragraph text-sm font-semibold text-foreground/90">
                              Exemple de Phrase
                            </Label>
                            <Textarea
                              id="exampleSentence"
                              value={newWord.exampleSentence}
                              onChange={(e) => setNewWord({ ...newWord, exampleSentence: e.target.value })}
                              placeholder="Exemple d'utilisation..."
                              className="bg-background/80 border-primary/30 text-foreground min-h-[60px] focus:border-primary"
                            />
                          </div>

                          {/* Etymology */}
                          <div className="space-y-2">
                            <Label htmlFor="etymology" className="font-paragraph text-sm font-semibold text-foreground/90">
                              Étymologie
                            </Label>
                            <Textarea
                              id="etymology"
                              value={newWord.etymology}
                              onChange={(e) => setNewWord({ ...newWord, etymology: e.target.value })}
                              placeholder="Origine et histoire du mot..."
                              className="bg-background/80 border-primary/30 text-foreground min-h-[60px] focus:border-primary"
                            />
                          </div>

                          {/* French Translation */}
                          <div className="space-y-2">
                            <Label htmlFor="traduction_fr" className="font-paragraph text-sm font-semibold text-foreground/90">
                              Traduction Française
                            </Label>
                            <Input
                              id="traduction_fr"
                              value={newWord.traduction_fr}
                              onChange={(e) => setNewWord({ ...newWord, traduction_fr: e.target.value })}
                              placeholder="Traduction en français..."
                              className="bg-background/80 border-primary/30 text-foreground focus:border-primary"
                            />
                          </div>

                          {/* Nidalum Expression */}
                          <div className="space-y-2">
                            <Label htmlFor="expression_nidalum" className="font-paragraph text-sm font-semibold text-foreground/90">
                              Expression Nidalum
                            </Label>
                            <Input
                              id="expression_nidalum"
                              value={newWord.expression_nidalum}
                              onChange={(e) => setNewWord({ ...newWord, expression_nidalum: e.target.value })}
                              placeholder="Expression ou tournure idiomatique..."
                              className="bg-background/80 border-primary/30 text-foreground focus:border-primary"
                            />
                          </div>

                          <button
                            onClick={handleAddWord}
                            className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300 rounded-sm"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Ajouter au Dictionnaire
                          </button>
                        </div>
                      </div>

                      {/* User's Dictionary Words */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/20 rounded-sm">
                              <BookOpen className="w-5 h-5 text-secondary" />
                            </div>
                            <h4 className="font-heading text-xl text-secondary">
                              Mes Mots
                            </h4>
                          </div>
                          <span className="px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-sm text-secondary rounded-sm">
                            {userWords.length} mot{userWords.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        {userWords.length === 0 ? (
                          <div className="border-2 border-dashed border-primary/20 p-12 text-center rounded-sm bg-dark-amber-shadow/10">
                            <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                            <p className="font-paragraph text-foreground/60 mb-2">
                              Aucun mot ajouté pour le moment
                            </p>
                            <p className="font-paragraph text-sm text-foreground/40">
                              Commencez à construire votre dictionnaire personnel !
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {userWords.map((word) => (
                              <div
                                key={word._id}
                                className="border border-primary/20 bg-background/80 p-4 rounded-sm hover:border-primary/40 hover:bg-background transition-all duration-200 group"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-baseline gap-3">
                                      <h5 className="font-heading text-lg text-primary">
                                        {word.nidalumWord}
                                      </h5>
                                      {word.pronunciationGuide && (
                                        <span className="font-paragraph text-xs text-secondary/80">
                                          [{word.pronunciationGuide}]
                                        </span>
                                      )}
                                    </div>
                                    
                                    <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                                      {word.definition}
                                    </p>
                                    
                                    {(word.category || word.theme) && (
                                      <div className="flex flex-wrap gap-2 pt-1">
                                        {word.category && (
                                          <span className="inline-block px-2 py-0.5 bg-primary/10 border border-primary/30 font-paragraph text-xs text-primary rounded-sm">
                                            {word.category}
                                          </span>
                                        )}
                                        {word.theme && (
                                          <span className="inline-block px-2 py-0.5 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary rounded-sm">
                                            {word.theme}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                    
                                    {word.exampleSentence && (
                                      <p className="font-paragraph text-xs text-foreground/60 italic pt-1 pl-3 border-l-2 border-primary/20">
                                        {word.exampleSentence}
                                      </p>
                                    )}

                                    {word.etymology && (
                                      <p className="font-paragraph text-xs text-foreground/50 pt-1">
                                        <span className="font-semibold">Étymologie:</span> {word.etymology}
                                      </p>
                                    )}
                                  </div>
                                  
                                  <button
                                    onClick={() => handleDeleteWord(word._id)}
                                    className="p-2 text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 rounded-sm opacity-0 group-hover:opacity-100"
                                    title="Supprimer ce mot"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="border-t border-primary/20 px-8 py-4 bg-dark-amber-shadow/10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadWithWords}
                    className="flex-1 inline-flex items-center justify-center bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300 rounded-sm shadow-lg shadow-primary/20"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Télécharger la Ressource
                    {userWords.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-primary-foreground/20 rounded-sm text-xs">
                        + {userWords.length} mot{userWords.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleCancelDownload}
                    className="sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-secondary/50 text-secondary font-paragraph font-semibold px-6 py-3 hover:bg-secondary/10 hover:border-secondary transition-all duration-300 rounded-sm"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
