import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { ProgrammesdelAcadmie } from '@/entities';

export default function AcademyDiagnostic() {
  const [programs, setPrograms] = useState<ProgrammesdelAcadmie[]>([]);

  useEffect(() => {
    const loadPrograms = async () => {
      const { items } = await BaseCrudService.getAll<ProgrammesdelAcadmie>('academieprogrammes');
      setPrograms(items);
    };
    
    loadPrograms();
  }, []);

  return null;
}
