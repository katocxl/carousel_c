
import React from 'react';
import { CarouselCard, CarouselConfig } from '../types';

interface Carousel3DProps {
  cards: CarouselCard[];
  config: CarouselConfig;
}

const Carousel3D: React.FC<Carousel3DProps> = ({ cards, config }) => {
  const translateZ = (config.width + config.height) + config.radiusOffset;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible select-none">
      {/* Container to handle the rotation context */}
      <div 
        className="carousel-inner relative"
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          '--w': `${config.width}px`,
          '--h': `${config.height}px`,
          '--quantity': cards.length,
          '--duration': `${config.duration}s`,
          '--perspective': `${config.perspective}px`,
          '--rotateX': `${config.rotateX}deg`,
        } as React.CSSProperties}
      >
        {cards.map((card) => (
          <div
            key={card.index}
            className="card-3d absolute inset-0 rounded-2xl border-2 overflow-hidden shadow-lg transition-all duration-500 hover:scale-110 cursor-pointer group"
            style={{
              borderColor: `rgba(${card.color}, 0.5)`,
              transform: `rotateY(calc((360deg / var(--quantity)) * ${card.index})) translateZ(${translateZ}px)`,
              background: `linear-gradient(135deg, rgba(${card.color}, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)`,
            }}
          >
            {/* The "Img" visual element from original prompt */}
            <div 
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
              style={{
                background: `radial-gradient(circle, rgba(${card.color}, 0.2) 0%, rgba(${card.color}, 0.6) 80%, rgba(${card.color}, 0.9) 100%)`
              }}
            />
            
            {/* Content overlay */}
            <div className="relative z-10 p-4 h-full flex flex-col justify-end">
              <h3 className="text-sm font-bold text-slate-800 truncate mb-1" style={{ color: `rgb(${card.color})` }}>
                {card.title}
              </h3>
              <p className="text-[10px] leading-tight text-slate-600 line-clamp-2">
                {card.description}
              </p>
            </div>

            {/* Reflection mask effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;
