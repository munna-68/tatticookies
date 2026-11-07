import { u } from './images';

export interface CookieFlavor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string;
  tags: string[];
  category: 'Nuts & Caramel' | 'Stuffed & S\'mores' | 'Nuts & Pistachio' | 'Classic & Brown Butter' | 'Seasonal';
  image: string;
  demoPrice: number;
  isSeasonal?: boolean;
  isFeatured?: boolean;
  allergens: string[];
}

export interface BoxTier {
  id: 'box4' | 'box6' | 'box10';
  size: number;
  name: string;
  demoPrice: number;
  regularPrice: number;
  description: string;
  popular?: boolean;
}

export interface DropDate {
  id: string;
  dateLabel: string;
  pickupWindow: string;
  shippingDate: string;
  status: 'open' | 'filling' | 'sold-out';
  orders: number;
  capacity: number;
  cutoffText: string;
}

export interface MockData {
  business: {
    name: string;
    wordmark: string;
    tagline: string;
    location: string;
    instagram: string;
    email: string;
    lawNotice: string;
  };
  dropSchedule: {
    isOpen: boolean;
    windowName: string;
    opensAt: string;
    closesAt: string;
    pickupDate: string;
    pickupHours: string;
    pickupLocationArea: string;
    shippingDate: string;
    targetCloseEpochHours: number; // For demo timer simulation
  };
  boxTiers: BoxTier[];
  menuItems: CookieFlavor[];
  dropDates: DropDate[];
  faqs: { question: string; answer: string; category: string }[];
  dashboard: {
    visitsFromIG: number;
    menuViews: number;
    ordersThisWindow: number;
    orderCapacity: number;
    emailSignups: number;
    windowRevenue: number;
    commentToLinkClicks: number;
    fulfillmentBreakdown: { type: string; percentage: number; orders: number; color: string }[];
    topCookies: { name: string; count: number; rating: number }[];
    recentOrders: {
      id: string;
      customerName: string;
      boxSize: number;
      fulfillment: 'Austin Pickup' | 'Austin Delivery' | 'Texas Shipping';
      status: 'Ready for Pickup' | 'Baking' | 'Shipped' | 'Out for Delivery';
      itemsSummary: string;
      timeAgo: string;
      total: number;
    }[];
    weeklyTraffic: { day: string; visits: number; orders: number }[];
    commentKeywords: { keyword: string; comments: number; converted: number }[];
  };
}

export const mockData: MockData = {
  business: {
    name: "Tatti | Gourmet Cookies & Bakes",
    wordmark: "Tatti",
    tagline: "Carefully made. Perfectly baked. Handmade in Austin, TX.",
    location: "Austin, Texas",
    instagram: "@tatticookies",
    email: "hello@tatticookies.com",
    lawNotice: "Made in an Austin home kitchen under the Texas Cottage Food Law."
  },
  dropSchedule: {
    isOpen: true,
    windowName: "Drop #42 — Saturday Nov 8 Pickup & TX Shipping",
    opensAt: "Monday 12:00 PM CST",
    closesAt: "Friday 12:00 PM CST",
    pickupDate: "Saturday, Nov 8, 2026",
    pickupHours: "11:00 AM – 2:00 PM CST",
    pickupLocationArea: "Central Austin (South Congress / Travis Heights pick-up porch)",
    shippingDate: "Monday, Nov 10, 2026",
    targetCloseEpochHours: 48,
  },
  boxTiers: [
    {
      id: 'box4',
      size: 4,
      name: "Taster Box (4 Cookies)",
      demoPrice: 22.00,
      regularPrice: 24.00,
      description: "Perfect introduction to Tatti. Pick any 4 decadent flavors.",
      popular: false
    },
    {
      id: 'box6',
      size: 6,
      name: "The Austin Six (6 Cookies)",
      demoPrice: 32.00,
      regularPrice: 36.00,
      description: "Our #1 most ordered box. Generous assortment for sharing or savoring all week.",
      popular: true
    },
    {
      id: 'box10',
      size: 10,
      name: "Party Baker's Box (10 Cookies)",
      demoPrice: 50.00,
      regularPrice: 60.00,
      description: "Best value ($5.00/cookie)! Tailored for weekend gatherings, office gifts & dessert tables.",
      popular: false
    }
  ],
  menuItems: [
    {
      id: "dubai-pistachio",
      name: "Dubai Pistachio",
      tagline: "Viral Toasted Kataifi & Sicilian Pistachio",
      description: "Dark Dutch cacao dough packed with crunchy toasted buttered kataifi pastry, rich Sicilian pistachio cream, and Belgian milk chocolate chips.",
      ingredients: "Dark Dutch cacao, toasted kataifi phyllo, artisan pistachio cream, Belgian milk chocolate, roasted pistachios, butter, farm eggs, unbleached flour.",
      tags: ["Viral Favorite", "Nut & Pistachio", "Crunchy & Gooey"],
      category: "Nuts & Pistachio",
      image: u('1770377124556-7ad85aebd7eb', 900),
      demoPrice: 6.00,
      isFeatured: true,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Pistachio)"]
    },
    {
      id: "pecan-dulce",
      name: "Pecan Dulce",
      tagline: "Toasted Texas Pecans & Dulce de Leche",
      description: "Buttery vanilla dough with toasted local pecans, Belgian dark and milk chocolate chunks, centered with molten dulce de leche and flaky sea salt.",
      ingredients: "Vanilla cookie dough, toasted Texas pecans, Belgian dark chocolate, milk chocolate, authentic dulce de leche, pure butter, eggs, sea salt.",
      tags: ["Signature Flavor", "Nuts & Caramel", "Texas Classic"],
      category: "Nuts & Caramel",
      image: "/images/cookies/pecan-dulce.jpg",
      demoPrice: 5.50,
      isFeatured: true,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Pecans)"]
    },
    {
      id: "red-velvet-smores",
      name: "Red Velvet Nutella S'mores",
      tagline: "Molten Nutella, Marshmallow & Cream Cheese",
      description: "Velvety scarlet dough loaded with white chocolate chips, cream cheese chunks, a decadent molten Nutella center, and toasted gooey marshmallow.",
      ingredients: "Red velvet dough, Nutella hazelnut spread, campfire marshmallows, cream cheese chips, Belgian white chocolate, graham cracker crumble.",
      tags: ["Top DM Request", "Stuffed", "Molten Center"],
      category: "Stuffed & S'mores",
      image: u('1673412810103-27c233f77da6', 900),
      demoPrice: 5.75,
      isFeatured: true,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Hazelnuts)"]
    },
    {
      id: "chocolate-chunk",
      name: "Brown Butter Chocolate Chunk",
      tagline: "48-Hour Brown Butter & Maldon Flakes",
      description: "The gold standard: European butter browned for 48 hours, slabs of Belgian milk and 70% dark chocolate, a whisper of espresso, topped with Maldon salt.",
      ingredients: "Browned European butter, Belgian 70% dark chocolate, milk chocolate slabs, organic espresso powder, brown sugar, eggs, Maldon sea salt.",
      tags: ["Classic Staple", "Brown Butter", "Nut-Free Friendly"],
      category: "Classic & Brown Butter",
      image: "/images/cookies/chocolate-chunk.jpg",
      demoPrice: 5.00,
      isFeatured: true,
      allergens: ["Wheat", "Milk", "Eggs", "Soy"]
    },
    {
      id: "biscoff-cream",
      name: "Biscoff Cream",
      tagline: "Warm Spiced Cinnamon Cookie Butter",
      description: "Cinnamon-kissed vanilla dough loaded with crushed Lotus Biscoff cookies, Belgian white chocolate chips, and a warm spiced cookie butter molten center.",
      ingredients: "Cinnamon vanilla dough, Lotus Biscoff biscuits, Lotus cookie butter spread, Belgian white chocolate, pure butter, organic flour.",
      tags: ["Seasonal Hit", "Spiced", "Nut-Free Friendly"],
      category: "Seasonal",
      image: u('1611082191524-1c049443f288', 900),
      demoPrice: 5.50,
      isSeasonal: true,
      allergens: ["Wheat", "Milk", "Eggs", "Soy"]
    },
    {
      id: "kinder-hazelnut",
      name: "Kinder Hazelnut",
      tagline: "Belgian Milk Chocolate & Kinder Bueno",
      description: "Vanilla dough stuffed with silky white chocolate hazelnut cream, melted Kinder chocolate bars, Belgian milk chocolate, topped with crunchy Kinder Bueno.",
      ingredients: "Vanilla dough, Kinder chocolate bars, Kinder Bueno wafer, white chocolate hazelnut cream, Belgian milk chocolate, farm butter.",
      tags: ["Stuffed", "Creamy & Sweet", "European Confection"],
      category: "Stuffed & S'mores",
      image: u('1741542164717-5f5f13cbfcd2', 900),
      demoPrice: 5.75,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Hazelnuts)"]
    },
    {
      id: "ferrero-hazelnut",
      name: "Ferrero Hazelnut",
      tagline: "Dark Cacao, Nutella & Ferrero Truffle",
      description: "Intense dark Dutch cacao dough studded with roasted chopped hazelnuts, Belgian chocolate chunks, and stuffed with a whole Ferrero Rocher truffle and Nutella.",
      ingredients: "Dark cacao dough, roasted chopped hazelnuts, Ferrero Rocher truffle, Nutella spread, Belgian dark chocolate chunks.",
      tags: ["Decadent", "Contains Hazelnuts", "Dark Chocolate"],
      category: "Nuts & Caramel",
      image: u('1654178990976-b88c403b3257', 900),
      demoPrice: 5.75,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Hazelnuts)"]
    },
    {
      id: "pistachio-white",
      name: "Pistachio White",
      tagline: "Slow-Roasted Pistachio & White Chocolate",
      description: "Velvety vanilla dough filled with artisan pistachio butter, roasted California pistachios, and rich Belgian white chocolate chunks.",
      ingredients: "Vanilla dough, roasted California pistachios, Belgian white chocolate chunks, artisan pistachio paste, pure butter, farm eggs.",
      tags: ["Artisan", "Contains Pistachio", "Rich & Nutty"],
      category: "Nuts & Pistachio",
      image: u('1603889386524-2dc2867a32b4', 900),
      demoPrice: 5.75,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Pistachio)"]
    },
    {
      id: "banana-bread",
      name: "Brown Butter Banana Bread",
      tagline: "Caramelized Bananas & Dark Chunks",
      description: "Fresh caramelized ripe bananas folded into spiced brown butter dough with dark chocolate chunks, Ceylon cinnamon, and toasted walnuts.",
      ingredients: "Ripe caramelized bananas, browned butter, Ceylon cinnamon, Belgian dark chocolate, toasted walnuts, unbleached flour.",
      tags: ["Drop Special", "Limited Run", "Breakfast Cookie"],
      category: "Seasonal",
      image: u('1719384980086-ba6233425fb7', 900),
      demoPrice: 5.50,
      isSeasonal: true,
      allergens: ["Wheat", "Milk", "Eggs", "Soy", "Tree Nuts (Walnuts)"]
    }
  ],
  dropDates: [
    {
      id: "drop-nov-8",
      dateLabel: "Saturday, Nov 8, 2026",
      pickupWindow: "11:00 AM – 2:00 PM CST",
      shippingDate: "Monday, Nov 10",
      status: "filling",
      orders: 38,
      capacity: 45,
      cutoffText: "Order cutoff: Friday Nov 7 at 12:00 PM CST (7 boxes left)"
    },
    {
      id: "drop-nov-15",
      dateLabel: "Saturday, Nov 15, 2026",
      pickupWindow: "11:00 AM – 2:00 PM CST",
      shippingDate: "Monday, Nov 17",
      status: "open",
      orders: 14,
      capacity: 45,
      cutoffText: "Order cutoff: Friday Nov 14 at 12:00 PM CST (31 boxes left)"
    },
    {
      id: "drop-nov-22",
      dateLabel: "Saturday, Nov 22, 2026",
      pickupWindow: "11:00 AM – 2:00 PM CST",
      shippingDate: "Monday, Nov 24",
      status: "open",
      orders: 6,
      capacity: 45,
      cutoffText: "Order cutoff: Friday Nov 21 at 12:00 PM CST (39 boxes left)"
    },
    {
      id: "drop-nov-1",
      dateLabel: "Saturday, Nov 1, 2026 (Past)",
      pickupWindow: "11:00 AM – 2:00 PM CST",
      shippingDate: "Monday, Nov 3",
      status: "sold-out",
      orders: 45,
      capacity: 45,
      cutoffText: "Drop closed & completely sold out"
    }
  ],
  faqs: [
    {
      category: "Pickup & Delivery",
      question: "Where and when is local Austin pickup?",
      answer: "Pickup takes place every Saturday between 11:00 AM and 2:00 PM CST at our central Austin bake porch (Travis Heights / South Congress neighborhood). The exact address and drive-up instructions are sent automatically in your confirmation email and SMS reminder."
    },
    {
      category: "Pickup & Delivery",
      question: "How does Austin local delivery work?",
      answer: "We offer contactless Saturday afternoon delivery for addresses within 15 miles of Central Austin (zip codes 78701–78759). Delivery is a flat $5.00 demo fee, and your driver will text you when your freshly packed box is on the doorstep."
    },
    {
      category: "Shipping",
      question: "Can you ship outside of Texas?",
      answer: "No. Because Tatti Cookies operates under the Texas Cottage Food Law, state legislation strictly mandates that cottage food products can only be sold and shipped within the State of Texas. All mail orders ship on Mondays via USPS Priority with insulated freshness packs."
    },
    {
      category: "Ordering Model",
      question: "Why do pre-orders close on Friday at 12 PM?",
      answer: "We are a solo, small-batch home bakery. We do not mass-produce or freeze baked cookies. Closing our drop on Friday at 12:00 PM CST allows us to mix dough, slow-proof for 24-48 hours, and bake fresh on Saturday morning so your cookies are at peak molten texture."
    },
    {
      category: "Cookie Care",
      question: "How do I store and reheat my cookies for that molten center?",
      answer: "Your cookies stay bakery-fresh for 3 days at room temperature in their sealed box, or up to 2 months frozen! For that gooey, warm, fresh-out-of-the-oven texture: microwave for 10–15 seconds, or warm in a 350°F toaster oven for 3 minutes. Flaky sea salt comes alive when warm!"
    },
    {
      category: "Allergens",
      question: "What allergens do your cookies contain?",
      answer: "All cookies contain wheat, milk, egg, and soy. Several signature flavors contain tree nuts (pecans, pistachios, hazelnuts, walnuts). While nut-free flavors are baked in sanitized separate batches, our home kitchen handles nuts and common allergens under the Texas Cottage Food Law."
    }
  ],
  dashboard: {
    visitsFromIG: 1420,
    menuViews: 890,
    ordersThisWindow: 38,
    orderCapacity: 45,
    emailSignups: 142,
    windowRevenue: 1284.00,
    commentToLinkClicks: 264,
    fulfillmentBreakdown: [
      { type: "Austin Pickup", percentage: 61, orders: 23, color: "#990232" },
      { type: "Austin Delivery", percentage: 24, orders: 9, color: "#EBCB40" },
      { type: "Texas Shipping", percentage: 15, orders: 6, color: "#B51242" },
    ],
    topCookies: [
      { name: "Dubai Pistachio", count: 48, rating: 4.9 },
      { name: "Red Velvet Nutella S'mores", count: 42, rating: 5.0 },
      { name: "Pecan Dulce", count: 39, rating: 4.9 },
      { name: "Brown Butter Chocolate Chunk", count: 35, rating: 4.8 },
      { name: "Kinder Hazelnut", count: 28, rating: 4.8 },
    ],
    recentOrders: [
      {
        id: "TC-4201",
        customerName: "Sarah M.",
        boxSize: 6,
        fulfillment: "Austin Pickup",
        status: "Ready for Pickup",
        itemsSummary: "2x Dubai Pistachio, 2x Red Velvet S'mores, 2x Pecan Dulce",
        timeAgo: "14 mins ago",
        total: 32.00
      },
      {
        id: "TC-4202",
        customerName: "Jason T.",
        boxSize: 10,
        fulfillment: "Austin Delivery",
        status: "Baking",
        itemsSummary: "Party Baker's Assortment (10 cookies mixed)",
        timeAgo: "42 mins ago",
        total: 55.00
      },
      {
        id: "TC-4203",
        customerName: "Elena R.",
        boxSize: 4,
        fulfillment: "Texas Shipping",
        status: "Baking",
        itemsSummary: "Biscoff, Kinder, Dubai, Chocolate Chunk",
        timeAgo: "1 hour ago",
        total: 30.50
      },
      {
        id: "TC-4204",
        customerName: "Marcus B.",
        boxSize: 6,
        fulfillment: "Austin Pickup",
        status: "Ready for Pickup",
        itemsSummary: "3x Brown Butter Chunk, 3x Pecan Dulce",
        timeAgo: "2 hours ago",
        total: 32.00
      },
      {
        id: "TC-4205",
        customerName: "Chloe D.",
        boxSize: 6,
        fulfillment: "Austin Delivery",
        status: "Out for Delivery",
        itemsSummary: "Red Velvet, Ferrero, Dubai, Banana Bread, Kinder, Biscoff",
        timeAgo: "3 hours ago",
        total: 37.00
      },
      {
        id: "TC-4206",
        customerName: "Customer A",
        boxSize: 4,
        fulfillment: "Austin Pickup",
        status: "Ready for Pickup",
        itemsSummary: "2x Dubai Pistachio, 2x Brown Butter Chunk",
        timeAgo: "4 hours ago",
        total: 22.00
      }
    ],
    weeklyTraffic: [
      { day: "Mon (Drop Opens)", visits: 540, orders: 19 },
      { day: "Tue", visits: 280, orders: 7 },
      { day: "Wed", visits: 195, orders: 4 },
      { day: "Thu (Reminders)", visits: 245, orders: 5 },
      { day: "Fri (Cutoff 12PM)", visits: 310, orders: 3 },
      { day: "Sat (Pickup Day)", visits: 90, orders: 0 },
      { day: "Sun (Prep)", visits: 60, orders: 0 },
    ],
    commentKeywords: [
      { keyword: "DROP", comments: 148, converted: 42 },
      { keyword: "MENU", comments: 84, converted: 21 },
      { keyword: "ORDER", comments: 56, converted: 18 },
      { keyword: "DELIVERY", comments: 24, converted: 7 },
    ]
  }
};
