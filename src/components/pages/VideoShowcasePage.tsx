import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Play } from 'lucide-react';

interface Video {
  _id: string;
  videoTitle?: string;
  videoDescription?: string;
  videoUrl?: string;
  thumbnailImage?: string;
  releaseDate?: string;
}

export default function VideoShowcasePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Video>('videoshowcase', {}, { limit: 50 });
      setVideos(result.items || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    // Convert YouTube URL to embed format
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Convert Vimeo URL to embed format
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] w-full overflow-hidden flex items-center justify-center pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-6">
              IMMERSIVE CINEMA
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Explore our cinematic video creations that embody the essence of the NIDALUM universe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-[120rem] mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-foreground/70">
              Les créations cinématiques seront bientôt révélées...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden border border-primary/30 hover:border-primary/70 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  {/* Thumbnail */}
                  {video.thumbnailImage ? (
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                      <Image
                        src={video.thumbnailImage}
                        width={600}
                        height={340}
                        alt={video.videoTitle || 'Video'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <Play className="w-16 h-16 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Play className="w-16 h-16 text-primary" fill="currentColor" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
                      {video.videoTitle}
                    </h3>
                    {video.releaseDate && (
                      <p className="font-paragraph text-xs text-foreground/60 mb-3">
                        {new Date(video.releaseDate).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                    {video.videoDescription && (
                      <p className="font-paragraph text-sm text-foreground/70 line-clamp-2">
                        {video.videoDescription}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            {/* Video Player */}
            <div className="aspect-video bg-black mb-6 relative">
              {selectedVideo.videoUrl && (
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Video Info */}
            <div className="bg-background border border-primary/30 p-8">
              <h2 className="font-heading text-3xl text-primary mb-4">
                {selectedVideo.videoTitle}
              </h2>
              {selectedVideo.releaseDate && (
                <p className="font-paragraph text-sm text-foreground/60 mb-4">
                  Publié le {new Date(selectedVideo.releaseDate).toLocaleDateString('fr-FR')}
                </p>
              )}
              {selectedVideo.videoDescription && (
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-8">
                  {selectedVideo.videoDescription}
                </p>
              )}
              <button
                onClick={() => setSelectedVideo(null)}
                className="bg-primary text-primary-foreground font-paragraph font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-300"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
