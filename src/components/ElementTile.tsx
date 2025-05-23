import React, { useState, useRef } from 'react';
import ElementPopup from './ElementPopup';

export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  electronConfiguration: string;
  group: number | null;
  period: number;
  classification: string;
  block: string;
}

interface ElementTileProps {
  element: ElementData;
  isInteractive?: boolean;
  onAskUsha?: () => void;
}

const getElementColor = (classification: string): string => {
  switch (classification) {
    case 'Alkali metal':
      return 'bg-element-alkali-metal';
    case 'Alkaline earth metal':
      return 'bg-element-alkaline-earth-metal';
    case 'Transition metal':
      return 'bg-element-transition-metal';
    case 'Post-transition metal':
      return 'bg-element-post-transition-metal';
    case 'Metalloid':
      return 'bg-element-metalloid';
    case 'Non-metal':
      return 'bg-element-non-metal';
    case 'Halogen':
      return 'bg-element-halogen';
    case 'Noble gas':
      return 'bg-element-noble-gas';
    case 'Lanthanide':
      return 'bg-element-lanthanide';
    case 'Actinide':
      return 'bg-element-actinide';
    default:
      return 'bg-element-unknown';
  }
};

const ElementTile: React.FC<ElementTileProps> = ({ element, isInteractive = true, onAskUsha }) => {
  const [showPopup, setShowPopup] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const colorClass = getElementColor(element.classification);

  const handleMouseEnter = () => {
    // For desktop only and only if interactive
    if (window.matchMedia("(min-width: 768px)").matches && isInteractive) {
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    // For desktop only
    if (window.matchMedia("(min-width: 768px)").matches) {
      setShowPopup(false);
    }
  };

  const handleClick = () => {
    // Toggle for mobile and desktop, only if interactive
    if (isInteractive) {
      setShowPopup(!showPopup);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      ref={tileRef}
      className={`border border-gray-300 p-1 flex flex-col items-center ${colorClass} h-16 w-16 text-gray-800 relative ${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Top section: Atomic Number */}
      <div className="text-xs absolute top-0 left-1">{element.atomicNumber}</div>
      
      {/* Middle section: Symbol */}
      <div className="font-bold text-xl mt-2">{element.symbol}</div>
      
      {/* Bottom section: Name and Atomic Mass with proper spacing */}
      <div className="flex flex-col items-center mt-auto w-full">
        <div className="text-[8px] leading-none w-full text-center truncate mb-1.5">
          {element.name}
        </div>
        <div className="text-[7px] leading-none w-full text-center">
          {parseFloat(element.atomicMass).toFixed(1)}
        </div>
      </div>
      
      {showPopup && (
        <ElementPopup 
          element={element} 
          onClose={closePopup}
          onAskUsha={onAskUsha}
          parentRef={tileRef}
        />
      )}
    </div>
  );
};

export default ElementTile;
