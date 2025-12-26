
export interface CarouselCard {
  index: number;
  color: string;
  title: string;
  description: string;
  image?: string;
}

export interface CarouselConfig {
  quantity: number;
  duration: number;
  perspective: number;
  rotateX: number;
  width: number;
  height: number;
  radiusOffset: number;
}

export enum Theme {
  AURORA = 'AURORA',
  PASTEL = 'PASTEL',
  OCEAN = 'OCEAN',
  DESERT = 'DESERT',
  CYBER = 'CYBER'
}
