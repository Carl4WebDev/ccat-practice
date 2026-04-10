import VisualBox from "./VisualBox";

export default function VisualChoices({ choices, selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-2 border-2 rounded-xl bg-white ${
            selected === index ? "border-blue-600" : "border-gray-300"
          }`}
        >
          <VisualBox corner={choice.corner} />
          <p className="mt-2 font-semibold text-black">{choice.label}</p>
        </button>
      ))}
    </div>
  );
}