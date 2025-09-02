import { ChevronDown } from "lucide-react";

const GhibliStyleDropdown = ({ value, onChange }) => {
  const styles = [
    { value: "general", label: "General Ghibli Style" },
    { value: "totoro", label: "My Neighbor Totoro" },
    { value: "spirited", label: "Spirited Away" },
    { value: "castle", label: "Castle in the Sky" },
    { value: "mononoke", label: "Princess Mononoke" },
    { value: "howl", label: "Howl's Moving Castle" },
    { value: "kiki", label: "Kiki's Delivery Service" },
    { value: "ponyo", label: "Ponyo" }
  ];

  return (
    <div>
      <label
        htmlFor="ghibli-style"
        className="text-md font-semibold mb-2 block"
      >
        Art Style
      </label>
      <div className="relative">
        <select
          id="ghibli-style"
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {styles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default GhibliStyleDropdown;
