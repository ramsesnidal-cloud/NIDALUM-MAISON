import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';

export default function PerfumePage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-5xl font-heading font-bold tracking-widest mb-4">
            NIDALUM PERFUME
          </h1>
          <p className="text-lg font-body text-muted">
            A SACRED HOUSE OF CREATION
          </p>
        </div>
      </section>

      {/* Development Status */}
      <section className="py-16 px-6 sm:px-10 lg:px-14 border-b border-border bg-night">
        <div className="max-w-[1320px] mx-auto">
          <p className="text-base font-body text-ivory">
            In development. Formulation is being composed under controlled research and restrained release principles.
          </p>
        </div>
      </section>

      {/* Perfume Image */}
      <section className="py-24 px-6 sm:px-10 lg:px-14 border-b border-border">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-2xl mx-auto">
            <Image
              src="https://static.wixstatic.com/media/9c8aea_a5faff4be923489284587525ded5e829~mv2.png?originWidth=384&originHeight=576"
              alt="NIDALUM Perfume"
              width={400}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
