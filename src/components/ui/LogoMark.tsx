import type { SVGProps } from "react";

/**
 * Isotipo de Electrind en vector: rayo 3D celeste con rayo naranja interior
 * y anillo amarillo orbitando (la mitad trasera pasa detrás del rayo).
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <defs>
        <clipPath id="lm-front">
          <rect x="-10" y="50" width="120" height="60" />
        </clipPath>
      </defs>

      {/* Anillo: mitad trasera */}
      <g transform="rotate(24 50 54)">
        <ellipse cx="50" cy="54" rx="44" ry="17" fill="none" stroke="#e8c90c" strokeWidth="7" />
      </g>

      {/* Rayo: extrusión 3D */}
      <path d="M61 5 L33 51 L50 51 L39 96 L76 41 L58 41 L71 5 Z" transform="translate(6 4)" fill="#1592b8" />
      {/* Rayo: cara frontal */}
      <path
        d="M61 5 L33 51 L50 51 L39 96 L76 41 L58 41 L71 5 Z"
        fill="#dff4fa"
        stroke="#1fb6d9"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Rayo interior naranja */}
      <path d="M60 17 L44 45 L54 45 L47 72 L67 38 L57 38 L64 17 Z" fill="#ff5a1f" />

      {/* Anillo: mitad delantera */}
      <g transform="rotate(24 50 54)">
        <ellipse
          cx="50"
          cy="54"
          rx="44"
          ry="17"
          fill="none"
          stroke="#f7dc12"
          strokeWidth="7"
          clipPath="url(#lm-front)"
        />
      </g>
    </svg>
  );
}
