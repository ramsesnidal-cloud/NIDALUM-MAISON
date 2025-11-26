import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BaseCrudService } from '@/integrations';
import { MusicShowcase, AuthorVideoManagement } from '@/entities';
import { Image } from '@/components/ui/image';
import { Music, Play, Pause } from 'lucide-react';
import ModernAudioPlayer from '@/components/ModernAudioPlayer';
import { useTranslation } from '@/hooks/useTranslation';

export default function AuthorPage() {
  const { t } = useTranslation();
  const [musicTracks, setMusicTracks] = useState<MusicShowcase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [epicVideo, setEpicVideo] = useState<AuthorVideoManagement | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [items, setItems] = useState<Array<{ id: string; type: 'video' | 'track'; data: MusicShowcase | AuthorVideoManagement }>>([]);

  useEffect(() => {
    loadMusic();
    loadEpicVideo();
  }, []);

  useEffect(() => {
    // Combine video and tracks into a single array
    const combined = [];
    if (epicVideo) {
      combined.push({
        id: epicVideo._id,
        type: 'video' as const,
        data: epicVideo,
      });
    }
    musicTracks.forEach((track) => {
      combined.push({
        id: track._id,
        type: 'track' as const,
        data: track,
      });
    });
    setItems(combined);
  }, [epicVideo, musicTracks]);

  const loadMusic = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<MusicShowcase>('musicshowcase');
    setMusicTracks(items);
    setIsLoading(false);
  };

  const loadEpicVideo = async () => {
    setIsVideoLoading(true);
    const { items } = await BaseCrudService.getAll<AuthorVideoManagement>('gestionvideoauteur');
    const activeVideo = items.find(video => video.isActive);
    setEpicVideo(activeVideo || null);
    setIsVideoLoading(false);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside the list, do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reorder items
    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6">
              RAMSES NIDAL
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-secondary mb-8 tracking-widest">
              ABOUDRAMANE DOUMBIA
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t('pages.author.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Biography Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                <Image
                  src="https://static.wixstatic.com/media/9c8aea_83af5dca6fc34c339b7ad142ca365f92~mv2.jpeg"
                  width={600}
                  className="w-full h-full object-cover"
                  originWidth={864}
                  originHeight={1184}
                  focalPointX={43.63425925925926}
                  focalPointY={31.08108108108108} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                {t('pages.author.visionaryTitle')}
              </h2>
              <div className="space-y-4">
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  {t('pages.author.visionaryPara1')}
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  {t('pages.author.visionaryPara2')}
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  {t('pages.author.visionaryPara3')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Artistic Vision Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-dark-amber-shadow/10 to-background">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12 text-center">
              {t('pages.author.artisticVision')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.author.afrofuturism')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.author.afrofuturismDesc')}
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.author.mysticism')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.author.mysticismDesc')}
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.author.cinematic')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.author.cinematicDesc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Music Showcase Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <Music className="w-10 h-10 text-primary mr-4" />
              <h2 className="font-heading text-4xl md:text-5xl text-primary">
                {t('pages.author.epicMusic')}
              </h2>
            </div>
            <p className="font-paragraph text-lg text-foreground/70 text-center max-w-3xl mx-auto">
              {t('pages.author.epicMusicDesc')}
            </p>
          </motion.div>

          {isLoading || isVideoLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="font-paragraph text-foreground/70 mt-4">{t('pages.author.loading')}</p>
            </div>
          ) : musicTracks.length === 0 && !epicVideo ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-xl text-foreground/70">{t('pages.author.noContent')}</p>
            </div>
          ) : (
            <>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="music-grid" type="MUSIC_GRID">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-colors duration-200 ${
                        snapshot.isDraggingOver ? 'bg-primary/5 p-6 rounded-lg' : ''
                      }`}
                    >
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transition-all duration-200 ${
                                snapshot.isDragging ? 'opacity-50 scale-95' : ''
                              }`}
                            >
                              {item.type === 'video' ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0 }}
                                  viewport={{ once: true }}
                                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group h-full"
                                >
                                  <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-primary/10 to-secondary/10">
                                    {(item.data as AuthorVideoManagement).thumbnailImage ? (
                                      <Image
                                        src={(item.data as AuthorVideoManagement).thumbnailImage!}
                                        alt={(item.data as AuthorVideoManagement).videoTitle || 'Epic Video'}
                                        width={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Play className="w-16 h-16 text-primary/50" />
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                      <Play className="w-16 h-16 text-primary" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-6">
                                    <h3 className="font-heading text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                                      {(item.data as AuthorVideoManagement).videoTitle || 'Musique Épique'}
                                    </h3>
                                    {(item.data as AuthorVideoManagement).videoDescription && (
                                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                                        {(item.data as AuthorVideoManagement).videoDescription}
                                      </p>
                                    )}
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                  viewport={{ once: true }}
                                  className="border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm group h-full flex flex-col"
                                >
                                  {(item.data as MusicShowcase).coverImage && (
                                    <div className="aspect-square overflow-hidden relative">
                                      <Image
                                        src={(item.data as MusicShowcase).coverImage!}
                                        alt={(item.data as MusicShowcase).trackTitle || 'Track cover'}
                                        width={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Play className="w-16 h-16 text-primary" />
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex-1">
                                      <h3 className="font-heading text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                                        {(item.data as MusicShowcase).trackTitle}
                                      </h3>
                                      {(item.data as MusicShowcase).artistName && (
                                        <p className="font-paragraph text-sm text-foreground/60 mb-3">
                                          {(item.data as MusicShowcase).artistName}
                                        </p>
                                      )}
                                      {(item.data as MusicShowcase).genre && (
                                        <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 font-paragraph text-xs text-secondary mb-3">
                                          {(item.data as MusicShowcase).genre}
                                        </span>
                                      )}
                                      {(item.data as MusicShowcase).description && (
                                        <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                                          {(item.data as MusicShowcase).description}
                                        </p>
                                      )}
                                    </div>
                                    {(item.data as MusicShowcase).audio && (
                                      <div className="mt-4 pt-4 border-t border-primary/20">
                                        <ModernAudioPlayer
                                          audioUrl={(item.data as MusicShowcase).audio!}
                                          title={(item.data as MusicShowcase).trackTitle || 'Musique'}
                                          className="mt-2"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              {/* Explanatory Text */}
              {epicVideo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto text-center"
                >
                  <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                    {t('pages.author.musicExplanation')}
                  </p>
                  <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                    {t('pages.author.musicExplanation2')}
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
      {/* Creative Process Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background to-dark-amber-shadow/10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12 text-center">
              {t('pages.author.creativeProcess')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.author.linguisticCreation')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  {t('pages.author.linguisticCreationDesc1')}
                </p>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.author.linguisticCreationDesc2')}
                </p>
              </div>
              <div className="border border-primary/20 p-8 bg-background/50 backdrop-blur-sm">
                <h3 className="font-heading text-2xl text-secondary mb-4">{t('pages.author.musicalComposition')}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed mb-4">
                  {t('pages.author.musicalCompositionDesc1')}
                </p>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  {t('pages.author.musicalCompositionDesc2')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
