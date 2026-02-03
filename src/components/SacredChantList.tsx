import { sacredChants } from '@/content/sacredChants';
import SacredChantCard from '@/components/SacredChantCard';

export default function SacredChantList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {sacredChants.map((chant) => (
        <SacredChantCard key={chant.id} chant={chant} />
      ))}
    </div>
  );
}
