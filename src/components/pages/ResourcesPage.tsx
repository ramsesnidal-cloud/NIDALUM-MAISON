import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { OfficialResources } from '@/entities';
import { Image } from '@/components/ui/image';
import { Download, FileText, Calendar, X, CheckCircle, BookOpen, Scroll } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <DialogContent className="bg-background border-2 border-primary/30 max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl text-primary mb-4">
              Confirmation de Téléchargement
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirmez le téléchargement de la ressource
            </DialogDescription>
          </DialogHeader>

          {selectedResource && (
            <ScrollArea className="h-[calc(90vh-120px)] pr-4">
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

                  {/* Extended Content - Nidalum Language Information */}
                  <div className="border-2 border-primary/30 bg-gradient-to-br from-dark-amber-shadow/30 to-background p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <h4 className="font-heading text-2xl text-primary">
                        Aperçu du Contenu - La Langue Nidalum
                      </h4>
                    </div>

                    <div className="space-y-6">
                      {/* Introduction */}
                      <section>
                        <h5 className="font-heading text-xl text-secondary mb-3 flex items-center">
                          <Scroll className="w-5 h-5 mr-2" />
                          Introduction à Nidalum
                        </h5>
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            Nidalum est bien plus qu'une simple langue construite : c'est un système linguistique complet, 
                            conçu pour exprimer des concepts spirituels, philosophiques et émotionnels avec une précision 
                            remarquable. Née de la volonté de créer un langage universel capable de transcender les 
                            barrières culturelles, Nidalum s'inspire des structures grammaticales les plus élégantes des 
                            langues naturelles tout en introduisant des innovations uniques qui la distinguent.
                          </p>
                          <p>
                            L'alphabet Nidalum se compose de 32 caractères distincts, chacun porteur d'une symbolique 
                            profonde et d'une résonance phonétique spécifique. Ces caractères ne sont pas de simples 
                            représentations graphiques : ils incarnent des archétypes, des énergies primordiales qui, 
                            lorsqu'elles sont combinées, créent des mots chargés de sens et de pouvoir. La calligraphie 
                            Nidalum est considérée comme un art sacré, où chaque trait, chaque courbe, chaque point 
                            contribue à la manifestation de l'intention du scripteur.
                          </p>
                          <p>
                            La phonétique de Nidalum a été méticuleusement élaborée pour favoriser la méditation et 
                            l'harmonisation intérieure. Les sons sont classés en trois catégories principales : les 
                            consonnes terrestres, qui ancrent et stabilisent ; les voyelles célestes, qui élèvent et 
                            inspirent ; et les semi-voyelles éthérées, qui servent de pont entre les deux dimensions. 
                            Cette classification tripartite reflète la cosmologie Nidalum, où l'univers est perçu comme 
                            l'interaction constante entre le matériel, le spirituel et l'intermédiaire.
                          </p>
                        </div>
                      </section>

                      {/* Grammar Structure */}
                      <section className="border-t border-primary/20 pt-6">
                        <h5 className="font-heading text-xl text-secondary mb-3 flex items-center">
                          <Scroll className="w-5 h-5 mr-2" />
                          Structure Grammaticale
                        </h5>
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            La grammaire Nidalum repose sur un système d'agglutination sophistiqué, où les morphèmes 
                            s'assemblent pour créer des mots complexes capables d'exprimer des nuances subtiles. Contrairement 
                            aux langues flexionnelles, Nidalum privilégie la transparence sémantique : chaque élément d'un 
                            mot conserve sa signification propre, permettant une compréhension intuitive même pour les 
                            néophytes. Cette caractéristique fait de Nidalum une langue particulièrement adaptée à 
                            l'enseignement et à la transmission de savoirs ésotériques.
                          </p>
                          <p>
                            L'ordre des mots en Nidalum suit généralement le schéma Sujet-Objet-Verbe, mais cette règle 
                            peut être modulée pour créer des emphases particulières ou exprimer des relations temporelles 
                            complexes. Le système verbal distingue sept aspects temporels, allant du passé ancestral au 
                            futur prophétique, en passant par le présent éternel utilisé pour les vérités universelles. 
                            Cette richesse temporelle permet d'exprimer non seulement quand une action se produit, mais 
                            aussi sa relation avec le flux cosmique du temps.
                          </p>
                          <p>
                            Les noms en Nidalum ne connaissent pas de genre grammatical au sens traditionnel, mais sont 
                            classés selon leur essence énergétique : actif, passif, neutre, ou transcendant. Cette 
                            classification influence les accords et les modifications que peuvent subir les noms, créant 
                            un système grammatical qui reflète la nature profonde des choses plutôt que des conventions 
                            arbitraires. Les adjectifs s'accordent en essence avec les noms qu'ils qualifient, créant 
                            une harmonie linguistique qui résonne avec l'harmonie universelle.
                          </p>
                          <p>
                            Le système pronominal de Nidalum est particulièrement développé, avec des distinctions non 
                            seulement de personne et de nombre, mais aussi de niveau de conscience et de degré d'intimité 
                            spirituelle. Il existe ainsi des pronoms spécifiques pour s'adresser aux entités divines, aux 
                            ancêtres, aux pairs spirituels, et aux êtres en apprentissage. Cette hiérarchie linguistique 
                            n'est pas une marque de supériorité, mais une reconnaissance des différents niveaux de 
                            réalisation spirituelle et des responsabilités qui en découlent.
                          </p>
                        </div>
                      </section>

                      {/* Lexicon and Vocabulary */}
                      <section className="border-t border-primary/20 pt-6">
                        <h5 className="font-heading text-xl text-secondary mb-3 flex items-center">
                          <Scroll className="w-5 h-5 mr-2" />
                          Lexique et Vocabulaire
                        </h5>
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            Le lexique Nidalum compte actuellement plus de 15 000 racines lexicales, chacune soigneusement 
                            choisie pour sa capacité à exprimer des concepts fondamentaux. Ces racines peuvent être combinées 
                            selon des règles précises pour générer un nombre quasi infini de termes dérivés. Le processus de 
                            création lexicale en Nidalum n'est pas arbitraire : chaque nouveau mot doit être validé par le 
                            Conseil Linguistique de l'Institut Nidalum, qui vérifie sa cohérence phonétique, sémantique et 
                            spirituelle avec le corpus existant.
                          </p>
                          <p>
                            Une caractéristique remarquable du vocabulaire Nidalum est l'existence de termes spécifiques 
                            pour des états de conscience et des expériences spirituelles qui n'ont pas d'équivalent dans 
                            les langues naturelles. Par exemple, "Thalamir" désigne l'état de paix profonde atteint après 
                            une méditation réussie, tandis que "Vexalun" décrit la sensation de connexion avec l'univers 
                            lors d'une contemplation nocturne. Ces mots ne sont pas de simples étiquettes, mais des clés 
                            qui ouvrent la porte à des expériences transformatrices.
                          </p>
                          <p>
                            Le vocabulaire technique de Nidalum est particulièrement développé dans les domaines de la 
                            métaphysique, de l'alchimie spirituelle et de la cosmologie sacrée. Des termes précis existent 
                            pour décrire les différentes couches de l'aura, les types de méditation, les phases de 
                            transformation intérieure, et les hiérarchies angéliques. Cette richesse terminologique fait 
                            de Nidalum un outil indispensable pour les praticiens des arts ésotériques qui cherchent à 
                            communiquer leurs expériences avec exactitude.
                          </p>
                          <p>
                            Les champs sémantiques en Nidalum sont organisés selon une structure fractale, où chaque 
                            concept central rayonne vers des concepts périphériques de plus en plus spécifiques. Cette 
                            organisation reflète la vision Nidalum de la réalité comme un hologramme où chaque partie 
                            contient le tout. Ainsi, étudier un seul mot en profondeur peut révéler toute une cosmologie, 
                            toute une philosophie de vie. C'est pourquoi l'apprentissage de Nidalum est considéré comme 
                            un chemin initiatique autant qu'une acquisition linguistique.
                          </p>
                        </div>
                      </section>

                      {/* Ritual and Sacred Use */}
                      <section className="border-t border-primary/20 pt-6">
                        <h5 className="font-heading text-xl text-secondary mb-3 flex items-center">
                          <Scroll className="w-5 h-5 mr-2" />
                          Usage Rituel et Sacré
                        </h5>
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            Dans la tradition Nidalum, la langue n'est pas un simple outil de communication, mais un 
                            véhicule de transformation spirituelle. Les chants rituels en Nidalum sont conçus pour induire 
                            des états de conscience modifiés, faciliter la méditation profonde, et établir des connexions 
                            avec les plans supérieurs de l'existence. Chaque phonème, chaque syllabe est chargée d'une 
                            intention spécifique, créant des vibrations qui résonnent avec les centres énergétiques du 
                            corps et de l'esprit.
                          </p>
                          <p>
                            Les mantras Nidalum sont particulièrement puissants car ils combinent la précision sémantique 
                            avec l'harmonie phonétique. Un mantra typique peut contenir plusieurs niveaux de signification : 
                            le sens littéral des mots, le symbolisme des sons, et les correspondances numériques basées sur 
                            la valeur des lettres. Cette polysémie intentionnelle permet au pratiquant d'approfondir 
                            progressivement sa compréhension et son expérience du mantra, découvrant de nouvelles dimensions 
                            à chaque récitation.
                          </p>
                          <p>
                            Les cérémonies Nidalum font un usage extensif de la langue dans ses formes parlée, chantée et 
                            écrite. Les textes sacrés sont calligraphiés avec une attention méticuleuse, car on croit que 
                            la beauté visuelle des caractères amplifie leur pouvoir spirituel. Les invocations sont prononcées 
                            selon des règles prosodiques strictes, où le rythme, l'intonation et la durée des syllabes sont 
                            aussi importants que les mots eux-mêmes. Cette rigueur formelle n'est pas une contrainte, mais 
                            une discipline qui canalise l'énergie spirituelle vers sa manifestation optimale.
                          </p>
                          <p>
                            L'apprentissage des formules rituelles en Nidalum est un processus graduel qui accompagne 
                            l'évolution spirituelle de l'étudiant. Les débutants commencent par des phrases simples de 
                            purification et de protection, tandis que les initiés avancés ont accès à des invocations 
                            complexes capables d'influencer les forces subtiles de l'univers. Cette progression pédagogique 
                            assure que chaque pratiquant utilise la langue à un niveau approprié à son développement, 
                            évitant ainsi les dangers potentiels d'une manipulation prématurée des énergies sacrées.
                          </p>
                        </div>
                      </section>

                      {/* Learning and Practice */}
                      <section className="border-t border-primary/20 pt-6">
                        <h5 className="font-heading text-xl text-secondary mb-3 flex items-center">
                          <Scroll className="w-5 h-5 mr-2" />
                          Apprentissage et Pratique
                        </h5>
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            L'apprentissage de Nidalum est structuré en sept niveaux de maîtrise, correspondant aux sept 
                            chakras principaux et aux sept étapes de l'éveil spirituel. Le premier niveau, appelé "Éveil 
                            de la Racine", se concentre sur l'alphabet, la phonétique de base et les structures grammaticales 
                            fondamentales. Les étudiants apprennent à tracer les caractères avec précision, à prononcer les 
                            sons correctement, et à construire des phrases simples. Cette phase d'ancrage est essentielle 
                            pour établir une base solide sur laquelle construire les compétences ultérieures.
                          </p>
                          <p>
                            Le deuxième niveau, "Flux du Sacré", introduit le vocabulaire spirituel et les concepts 
                            métaphysiques. Les étudiants commencent à explorer les textes sacrés, à mémoriser des mantras 
                            simples, et à comprendre les correspondances symboliques entre les mots et les réalités qu'ils 
                            désignent. C'est à ce stade que beaucoup d'apprenants commencent à expérimenter les effets 
                            transformateurs de la langue, ressentant comment la simple prononciation de certains mots peut 
                            modifier leur état intérieur.
                          </p>
                          <p>
                            Les niveaux intermédiaires (trois à cinq) approfondissent la compréhension grammaticale, 
                            enrichissent le vocabulaire, et initient aux pratiques rituelles. Les étudiants apprennent à 
                            composer leurs propres prières et invocations, à interpréter les textes anciens, et à utiliser 
                            la langue dans des contextes méditatifs et cérémoniels. La pratique quotidienne devient 
                            essentielle : récitation de mantras, lecture de textes sacrés, et écriture contemplative sont 
                            recommandées pour intégrer pleinement les enseignements.
                          </p>
                          <p>
                            Les niveaux avancés (six et sept) sont réservés aux initiés qui ont démontré non seulement une 
                            maîtrise linguistique exceptionnelle, mais aussi une profonde transformation spirituelle. À ces 
                            niveaux, les étudiants accèdent aux enseignements ésotériques les plus profonds, apprennent les 
                            formules de haute magie verbale, et peuvent même contribuer à l'évolution de la langue elle-même 
                            en proposant de nouveaux termes ou en découvrant de nouvelles applications rituelles. Le septième 
                            niveau, "Couronne de Lumière", représente la fusion complète entre le pratiquant et la langue, 
                            où Nidalum devient une seconde nature, un mode de pensée et d'être.
                          </p>
                        </div>
                      </section>

                      {/* Cultural and Philosophical Context */}
                      <section className="border-t border-primary/20 pt-6">
                        <h5 className="font-heading text-xl text-secondary mb-3 flex items-center">
                          <Scroll className="w-5 h-5 mr-2" />
                          Contexte Culturel et Philosophique
                        </h5>
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            Nidalum s'inscrit dans une tradition philosophique qui voit le langage comme un pont entre le 
                            monde manifesté et les réalités transcendantes. Cette vision s'inspire des grandes traditions 
                            mystiques de l'humanité : la Kabbale hébraïque avec sa science des lettres, le sanskrit védique 
                            avec ses mantras sacrés, l'arabe coranique avec sa récitation psalmodiée, et bien d'autres. 
                            Nidalum synthétise ces héritages tout en créant quelque chose d'entièrement nouveau, adapté aux 
                            besoins spirituels de l'ère contemporaine.
                          </p>
                          <p>
                            La philosophie Nidalum postule que l'univers lui-même est un langage, une expression divine qui 
                            se déploie à travers les formes, les sons, et les significations. Apprendre Nidalum, c'est donc 
                            apprendre à lire le livre de la création, à déchiffrer les messages cachés dans la nature, dans 
                            les événements de la vie, dans les profondeurs de la psyché. Cette approche transforme l'étude 
                            linguistique en quête spirituelle, où chaque mot appris est une révélation, chaque phrase 
                            construite une prière.
                          </p>
                          <p>
                            La communauté Nidalum, dispersée à travers le monde, forme une fraternité spirituelle unie par 
                            la langue commune. Les pratiquants se reconnaissent entre eux par des salutations rituelles, 
                            partagent leurs expériences lors de rassemblements réguliers, et collaborent à des projets de 
                            traduction et de création littéraire. Cette dimension communautaire est essentielle : Nidalum 
                            n'est pas destiné à être pratiqué en isolement, mais à créer des liens, à faciliter la 
                            transmission de sagesse, et à construire une culture spirituelle vivante.
                          </p>
                          <p>
                            L'éthique Nidalum insiste sur l'usage responsable de la langue. Les mots ont un pouvoir, et ce 
                            pouvoir doit être exercé avec sagesse et compassion. Les praticiens sont encouragés à cultiver 
                            la parole juste, à éviter les mensonges et les manipulations, et à utiliser leur maîtrise 
                            linguistique pour élever, guérir et illuminer. Cette éthique s'étend au-delà de Nidalum 
                            lui-même : ceux qui étudient la langue sacrée sont invités à porter la même attention à toutes 
                            leurs communications, faisant de chaque parole un acte conscient et intentionnel.
                          </p>
                        </div>
                      </section>

                      {/* Conclusion */}
                      <section className="border-t border-primary/20 pt-6">
                        <div className="font-paragraph text-foreground/80 leading-relaxed space-y-3 text-justify">
                          <p>
                            Ce document représente une introduction aux multiples facettes de la langue Nidalum. Chaque 
                            section pourrait être développée en volumes entiers, tant la richesse de cette tradition 
                            linguistique et spirituelle est vaste. Les ressources que vous vous apprêtez à télécharger 
                            contiennent des informations détaillées, des exercices pratiques, des enregistrements audio, 
                            et des guides visuels qui vous accompagneront dans votre voyage d'apprentissage.
                          </p>
                          <p>
                            Que vous soyez attiré par Nidalum pour des raisons linguistiques, spirituelles, artistiques ou 
                            simplement par curiosité, sachez que vous vous engagez dans une aventure transformatrice. La 
                            langue que vous allez apprendre n'est pas un simple code à déchiffrer, mais un chemin vers une 
                            compréhension plus profonde de vous-même et de l'univers. Chaque mot que vous prononcerez, 
                            chaque texte que vous lirez, chaque calligraphie que vous tracerez sera une étape sur ce chemin.
                          </p>
                          <p>
                            L'Institut Nidalum vous souhaite la bienvenue dans cette communauté d'apprenants et de 
                            chercheurs spirituels. Que votre étude soit fructueuse, que votre pratique soit régulière, et 
                            que la sagesse de Nidalum illumine votre vie. N'hésitez pas à contacter l'Institut pour toute 
                            question, pour partager vos expériences, ou pour rejoindre les groupes d'étude locaux. Ensemble, 
                            nous préservons et développons ce trésor linguistique et spirituel pour les générations futures.
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>

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
                <div className="flex flex-col sm:flex-row gap-4 pt-4 sticky bottom-0 bg-background pb-4">
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
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
