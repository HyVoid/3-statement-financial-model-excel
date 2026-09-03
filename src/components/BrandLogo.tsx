import React from 'react';

interface BrandLogoIconProps {
  className?: string;
  size?: number;
  variant?: 'icon-only' | 'full';
}

/**
 * THESEUS WORKSHOP Official Brand Vector Logo
 * Precise SVG reproduction of the uploaded brand insignia:
 * - Circular boundary ring with nautical dashed arc segments on the right
 * - Monogrammatic bold Capital 'T' stem and serif beam
 * - Ancient Greek Galley/Ship hull with curved strakes, planks, and rivet dots
 */
export const BrandLogo: React.FC<BrandLogoIconProps> = ({
  className = '',
  size = 36,
  variant = 'icon-only',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="THESEUS WORKSHOP Logo"
    >
      {/* Outer circular badge contour */}
      {/* Left solid arc */}
      <path
        d="M 100 12 A 88 88 0 0 0 100 188"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* Top right solid arc */}
      <path
        d="M 100 12 A 88 88 0 0 1 157 32"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* Dashed circular arc segments on the right perimeter (reproducing the brand marks) */}
      <path
        d="M 167 43 A 88 88 0 0 1 176 65"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 180 77 A 88 88 0 0 1 183 95"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 183 107 A 88 88 0 0 1 179 125"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 172 137 A 88 88 0 0 1 162 153"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 152 163 A 88 88 0 0 1 138 174"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M 125 181 A 88 88 0 0 1 100 188"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Central Capital 'T' Monogram */}
      {/* Top Crossbar with subtle serif tapered ends */}
      <path
        d="M 38 48 C 38 48 42 58 48 58 L 78 58 L 78 178 L 122 178 L 122 58 L 152 58 C 158 58 162 48 162 48 L 38 48 Z"
        fill="currentColor"
      />

      {/* Left side of the ship hull (3 curved wooden strakes) */}
      {/* Upper strake */}
      <path
        d="M 45 106 C 53 103 66 99 76 96 L 76 112 C 67 115 56 119 50 123 Z"
        fill="currentColor"
      />
      {/* Middle strake */}
      <path
        d="M 52 129 C 58 126 67 122 76 120 L 76 137 C 68 139 60 143 56 148 Z"
        fill="currentColor"
      />
      {/* Lower keel strake */}
      <path
        d="M 59 154 C 64 151 70 148 76 146 L 76 170 C 70 171 66 173 63 176 C 59 169 57 161 59 154 Z"
        fill="currentColor"
      />

      {/* Right side of the ship hull with plank rivets (dots) */}
      {/* Top strake with vertical seams and rivets */}
      <path
        d="M 124 96 C 134 99 146 103 155 107 L 150 124 C 142 120 133 116 124 113 Z"
        fill="currentColor"
      />
      {/* Middle strake */}
      <path
        d="M 124 120 C 132 123 141 127 148 131 L 143 147 C 136 143 129 140 124 138 Z"
        fill="currentColor"
      />
      {/* Lower strake */}
      <path
        d="M 124 145 C 130 148 136 151 141 155 C 137 163 131 170 124 174 Z"
        fill="currentColor"
      />

      {/* Ship hull plank seam lines (white cutouts) */}
      <line x1="135" y1="99" x2="132" y2="114" stroke="#FFF" strokeWidth="2.5" />
      <line x1="146" y1="104" x2="142" y2="119" stroke="#FFF" strokeWidth="2.5" />
      <line x1="133" y1="123" x2="130" y2="138" stroke="#FFF" strokeWidth="2.5" />
      <line x1="141" y1="127" x2="138" y2="142" stroke="#FFF" strokeWidth="2.5" />
      <line x1="132" y1="148" x2="129" y2="162" stroke="#FFF" strokeWidth="2.5" />

      {/* Hull rivet dots (white studs on wooden planks) */}
      <circle cx="129" cy="106" r="1.75" fill="#FFF" />
      <circle cx="140" cy="111" r="1.75" fill="#FFF" />
      <circle cx="150" cy="116" r="1.75" fill="#FFF" />
      <circle cx="128" cy="130" r="1.75" fill="#FFF" />
      <circle cx="137" cy="134" r="1.75" fill="#FFF" />
      <circle cx="144" cy="139" r="1.75" fill="#FFF" />
      <circle cx="128" cy="154" r="1.75" fill="#FFF" />
      <circle cx="135" cy="158" r="1.75" fill="#FFF" />
    </svg>
  );
};
