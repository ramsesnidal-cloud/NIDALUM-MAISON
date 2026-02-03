export interface SacredChant {
  id: string;
  title: string;
  duration: string;
  energyTag: 'Invocation' | 'Veil' | 'Fire' | 'Salt' | 'Memory' | 'Silence';
  previewMp3Url: string;
  hiResWavUrl?: string;
  coverImageUrl: string;
}

export const sacredChants: SacredChant[] = [
  {
    id: 'chant-i',
    title: 'Chant I',
    duration: '0:40',
    energyTag: 'Invocation',
    previewMp3Url: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp3',
    hiResWavUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.wav',
    coverImageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
  },
  {
    id: 'chant-ii',
    title: 'Chant II',
    duration: '0:35',
    energyTag: 'Veil',
    previewMp3Url: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp3',
    hiResWavUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.wav',
    coverImageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
  },
  {
    id: 'chant-iii',
    title: 'Chant III',
    duration: '0:42',
    energyTag: 'Fire',
    previewMp3Url: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp3',
    hiResWavUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.wav',
    coverImageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
  },
  {
    id: 'chant-iv',
    title: 'Chant IV',
    duration: '0:38',
    energyTag: 'Salt',
    previewMp3Url: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp3',
    hiResWavUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.wav',
    coverImageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
  },
  {
    id: 'chant-v',
    title: 'Chant V',
    duration: '0:45',
    energyTag: 'Memory',
    previewMp3Url: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp3',
    hiResWavUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.wav',
    coverImageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
  },
  {
    id: 'chant-vi',
    title: 'Chant VI',
    duration: '0:41',
    energyTag: 'Silence',
    previewMp3Url: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp3',
    hiResWavUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.wav',
    coverImageUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg',
  },
];
