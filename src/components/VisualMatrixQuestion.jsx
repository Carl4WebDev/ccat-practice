import VisualBox from "./VisualBox";

export default function VisualMatrixQuestion({ grid }) {
  return (
    <div className="inline-block border-4 border-black p-4 bg-white">
      <div className="grid grid-cols-3 gap-4">
        {grid.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <VisualBox corner={item} />
          </div>
        ))}
      </div>
    </div>
  );
}