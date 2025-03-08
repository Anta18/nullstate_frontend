import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Checkbox } from "../ui/checkbox";

interface Trait {
  label: string;
  count: number;
}

const traitsData: Trait[] = [
  { label: "Background", count: 8 },
  { label: "Clothing", count: 12 },
  { label: "Ear", count: 4 },
  { label: "Eyes", count: 6 },
  { label: "Face", count: 13 },
  { label: "Hair", count: 12 },
  { label: "Headgear", count: 6 },
  { label: "Mouth", count: 12 },
  { label: "Neck", count: 7 },
  { label: "Offhand", count: 5 },
  { label: "Special", count: 8 },
  { label: "Type", count: 9 },
];

// Simple reusable collapsible section component
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        type="button"
        className="flex w-full items-center justify-between text-sm font-semibold mb-1 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="pl-2 mt-2">{children}</div>}
    </div>
  );
};

const SidebarFilters: React.FC = () => {
  return (
    <aside className=" bg-black text-white p-4 space-y-6">
      {/* STATUS Section */}
      <div>
        <h2 className="text-sm font-semibold mb-3">STATUS</h2>
        <div className="flex items-center mb-2 ml-2">
          <Checkbox className="mr-1" />
          <label htmlFor="onlyBuyNow" className="text-sm">
            ONLY BUY NOW
          </label>
        </div>
        <div className="flex items-center ml-2">
          <Checkbox className="mr-1" />
          <label htmlFor="showAll" className="text-sm">
            SHOW ALL
          </label>
        </div>
      </div>

      {/* RARITY Section */}
      <CollapsibleSection title="RARITY">
        {/* Replace this with your desired rarity UI (range slider, text inputs, etc.) */}
        <p className="text-sm">Rarity filter UI goes here.</p>
      </CollapsibleSection>

      {/* PRICE Section */}
      <CollapsibleSection title="PRICE">
        {/* Replace this with your desired price UI (range slider, text inputs, etc.) */}
        <p className="text-sm">Price filter UI goes here.</p>
      </CollapsibleSection>

      {/* TRAITS Section */}
      <CollapsibleSection title="TRAITS" defaultOpen>
        <ul className="space-y-2 text-sm">
          {traitsData.map((trait) => (
            <li key={trait.label} className="flex items-center justify-between">
              <span>{trait.label}</span>
              <span className="text-gray-400">{trait.count}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
    </aside>
  );
};

export default SidebarFilters;
