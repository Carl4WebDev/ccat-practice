export default function VisualBox({ corner, size = 120, stroke = 5 }) {
  const arcRadius = size * 0.38;
  const pad = 8;

  const getPath = () => {
    switch (corner) {
      case "topLeft":
        return `M ${pad + arcRadius} ${pad} A ${arcRadius} ${arcRadius} 0 0 0 ${pad} ${pad + arcRadius}`;
      case "topRight":
        return `M ${size - pad - arcRadius} ${pad} A ${arcRadius} ${arcRadius} 0 0 1 ${size - pad} ${pad + arcRadius}`;
      case "bottomLeft":
        return `M ${pad + arcRadius} ${size - pad} A ${arcRadius} ${arcRadius} 0 0 1 ${pad} ${size - pad - arcRadius}`;
      case "bottomRight":
        return `M ${size - pad - arcRadius} ${size - pad} A ${arcRadius} ${arcRadius} 0 0 0 ${size - pad} ${size - pad - arcRadius}`;
      default:
        return "";
    }
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect
        x={pad}
        y={pad}
        width={size - pad * 2}
        height={size - pad * 2}
        fill="none"
        stroke="black"
        strokeWidth={stroke}
      />
      {corner && (
        <path
          d={getPath()}
          fill="none"
          stroke="black"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}