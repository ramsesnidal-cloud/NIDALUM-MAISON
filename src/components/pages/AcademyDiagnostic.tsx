import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { ProgrammesdelAcadmie } from '@/entities';

export default function AcademyDiagnostic() {
  const [programs, setPrograms] = useState<ProgrammesdelAcadmie[]>([]);

  useEffect(() => {
    const loadPrograms = async () => {
      const { items } = await BaseCrudService.getAll<ProgrammesdelAcadmie>('academieprogrammes');
      setPrograms(items);
      
      console.log('=== ACADEMY PROGRAMS DIAGNOSTIC ===');
      items.forEach((program, index) => {
        console.log(`\nProgram ${index + 1}:`);
        console.log(`  Name: ${program.programName || '❌ MISSING'}`);
        console.log(`  Image: ${program.programImage ? '✅' : '❌ MISSING'}`);
        console.log(`  Level: ${program.programLevel || '❌ MISSING'}`);
        console.log(`  Duration: ${program.programDuration || '❌ MISSING'}`);
        console.log(`  Description: ${program.programDescription ? '✅' : '❌ MISSING'}`);
        console.log(`  Enrollment Link: ${program.enrollmentLink ? '✅' : '❌ MISSING'}`);
      });
    };
    
    loadPrograms();
  }, []);

  return null;
}
