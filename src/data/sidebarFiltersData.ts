// data/sidebarFiltersData.ts
export const traits = [
    { name: "Background", count: 8 },
    { name: "Clothing", count: 12 },
    { name: "Ear", count: 4 },
    { name: "Eyes", count: 6 },
    { name: "Face", count: 13 },
    { name: "Hair", count: 12 },
    { name: "Headgear", count: 6 },
    { name: "Mouth", count: 12 },
    { name: "Neck", count: 7 },
    { name: "Offhand", count: 5 },
    { name: "Special", count: 8 },
    { name: "Type", count: 9 },
  ];
  
  export const traitOptions: { [key: string]: string[] } = {
    Background: ["Blue", "Green", "Red", "Yellow"],
    Clothing: ["T-shirt", "Jacket", "Hoodie", "Coat"],
    Ear: ["Left Earring", "Right Earring"],
    Eyes: ["Brown", "Blue", "Green", "Gray"],
    Face: ["Smile", "Frown", "Neutral"],
    Hair: ["Short", "Long", "Curly", "Straight"],
    Headgear: ["Cap", "Beanie", "Helmet"],
    Mouth: ["Smile", "Grin", "Neutral"],
    Neck: ["Scarf", "Necklace", "Tie"],
    Offhand: ["Shield", "Sword", "Dagger"],
    Special: ["Glowing", "Sparkling", "Frosted"],
    Type: ["Type A", "Type B", "Type C"],
  };
  
  export const rarityData = [
    { label: "Common", count: 50 },
    { label: "Uncommon", count: 30 },
    { label: "Rare", count: 15 },
    { label: "Epic", count: 5 },
    { label: "Legendary", count: 1 },
  ];
  
  export const priceData = [
    { label: "Under 1 ETH", count: 20 },
    { label: "1-3 ETH", count: 35 },
    { label: "3-5 ETH", count: 25 },
    { label: "Above 5 ETH", count: 10 },
  ];
  