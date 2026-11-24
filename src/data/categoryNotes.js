// Halden's own copy for each DummyJSON category:
// - intro: one line under the catalog heading
// - why:   "Why we stock it" on the product page
// - tip:   "Good to know" on the product page
// - choose: "How to choose" tips on the product page

export const catalogIntro =
  'Everything we stock, from bedside tables to bananas. Filter by department or price, or sort by what other customers rate highest.';

export const searchIntro = 'Products whose name, brand, department or tags match your search.';

const fallbackNote = {
  intro: 'A small range we have picked with care.',
  why: 'We only list products we would be happy to use at home, and we take them off the shelf when customers tell us they disappoint.',
  tip: 'Unused items can be returned within 30 days. The returns label is in the box.',
  choose: [
    'Read the delivery, returns and warranty details on this page before you order.',
    'Compare a few products side by side in the catalog, sorted by rating.',
    'Check the reviews below for how the product holds up in everyday use.',
  ],
};

export const categoryNotes = {
  beauty: {
    intro: 'Make-up for every day and for evenings out: mascara, eyeshadow, powder, lipstick and nail colour.',
    why: 'We keep the range small and choose shades that suit many skin tones, so you spend less time comparing and more time using.',
    tip: 'Make-up keeps best away from heat and direct sun. Replace mascara about three months after opening.',
    choose: [
      "Test foundation and powder shades in daylight, on your jawline rather than your hand.",
      "If your eyes are sensitive, look for mascara labelled as ophthalmologist tested.",
      "Long-wear lipsticks last longer but can feel drier, so a thin layer of balm underneath helps.",
    ],
  },
  fragrances: {
    intro: 'Perfumes and colognes, from fresh everyday scents to richer ones for the evening.',
    why: 'Every scent here has stayed popular for years, which usually means it wears well on most people.',
    tip: 'Spray on pulse points and let it dry instead of rubbing it in. Keep the bottle in a cool, dark cupboard rather than the bathroom.',
    choose: [
      "Eau de parfum lasts longer on the skin than eau de toilette, but costs more.",
      "Fresh and citrus scents suit daytime; woody and amber scents feel heavier and warmer.",
      "Test a scent on your skin, not on paper, and wait an hour before you decide.",
    ],
  },
  furniture: {
    intro: 'Beds, sofas, chairs and bedside tables for rooms of every size.',
    why: 'Furniture should outlast a trend, so we look for solid frames, replaceable parts and finishes that age well.',
    tip: 'Measure doorways and stairs before you order. Large pieces arrive in one delivery and need two people to carry.',
    choose: [
      "Leave about 75 cm around beds and between sofas and tables so you can walk past comfortably.",
      "Solid wood and metal frames outlast particle board, especially if you move house.",
      "Removable, washable covers make a fabric sofa much easier to live with.",
    ],
  },
  groceries: {
    intro: 'Fresh produce, meat and fish, cupboard staples and pet food.',
    why: 'We stock the basics people buy every week, so you can add them to an order you are placing anyway.',
    tip: 'Fresh food travels in an insulated box. Put it in the fridge on the day it arrives.',
    choose: [
      "Choose firmer fruit if you plan to eat it later in the week.",
      "Keep apples away from other fruit: they release a gas that makes it ripen faster.",
      "Cook meat and fish within two days, or freeze them on the day they arrive.",
    ],
  },
  'home-decoration': {
    intro: 'Lamps, mirrors, plants and the small pieces that make a room feel finished.',
    why: 'Small changes are the cheapest way to refresh a room, so we look for pieces that work with many styles.',
    tip: 'Hang a mirror opposite a window to bring more daylight into the room.',
    choose: [
      "Pick one or two colours already in the room and repeat them in smaller pieces.",
      "Use warm white bulbs (about 2700 K) in living spaces and cooler light at a desk.",
      "Groups of three or five objects usually look more natural than pairs.",
    ],
  },
  'kitchen-accessories': {
    intro: 'Pans, knives, utensils and storage for cooking every day.',
    why: 'These are the tools we reach for most at home: simple, sturdy and easy to clean.',
    tip: 'Wash wooden and bamboo tools by hand and dry them straight away so they do not crack.',
    choose: [
      "Check that pans suit your hob: induction needs a magnetic base.",
      "Wooden and silicone utensils will not scratch non-stick pans.",
      "One good chef’s knife does more than a block full of average ones.",
    ],
  },
  laptops: {
    intro: 'Laptops for work, study and everything in between.',
    why: 'We pick models with good keyboards, all-day batteries and screens that stay comfortable to read for hours.',
    tip: 'Check which ports you need before you buy. Many thin laptops only have USB-C.',
    choose: [
      "16 GB of memory keeps everyday multitasking smooth; 8 GB suits light use.",
      "If you carry it every day, a 14-inch screen or smaller is easier on your back.",
      "A 512 GB SSD leaves room for photos and apps; 256 GB fills up quickly.",
    ],
  },
  'mens-shirts': {
    intro: 'Shirts for work and weekends, in cotton and easy-care fabrics.',
    why: 'We choose cuts that fit well straight off the rail and fabrics that keep their shape after many washes.',
    tip: 'Wash at 30°C and hang to dry. It means less ironing and less shrinking.',
    choose: [
      "A shirt fits at the shoulders when the seam sits on the edge of your shoulder bone.",
      "Oxford cloth is hard-wearing; poplin is smoother and dressier.",
      "With your arms relaxed, the cuff should reach the base of your thumb.",
    ],
  },
  'mens-shoes': {
    intro: 'Trainers, boots and smart shoes.',
    why: 'Good shoes are worth buying once, so we look for solid soles and materials that can be cleaned and repaired.',
    tip: 'Give leather shoes a day off between wears so they dry out and keep their shape.',
    choose: [
      "Measure both feet in the evening and buy for the larger one.",
      "Leave about a thumb’s width between your longest toe and the front of the shoe.",
      "Rubber soles grip better in the wet; leather soles look smarter but can be slippery at first.",
    ],
  },
  'mens-watches': {
    intro: 'Everyday and dress watches.',
    why: 'A watch should be easy to read at a glance and comfortable all day. Everything here passes both tests.',
    tip: 'Check the water resistance rating before you swim or shower with a watch on.',
    choose: [
      "50 m water resistance is fine for rain and hand washing, but not for swimming.",
      "A case of 38 to 42 mm suits most wrists.",
      "Quartz watches keep better time; automatic watches never need a battery.",
    ],
  },
  'mobile-accessories': {
    intro: 'Chargers, cables, cases, earphones and stands for your phone and tablet.',
    why: 'A poor charger can shorten a battery’s life, so we stock accessories from makers with clear safety markings.',
    tip: 'Use a charger rated for at least the wattage your phone supports to charge at full speed.',
    choose: [
      "Check the connector: most current phones use USB-C, while older iPhones use Lightning.",
      "Cases with raised edges protect the screen and cameras when a phone lands face down.",
      "For wireless charging, look for Qi certification and a case thinner than 5 mm.",
    ],
  },
  motorcycle: {
    intro: 'Motorcycles for commuting and weekend rides.',
    why: 'We list a small range for riders who already know what they want, each with full specifications.',
    tip: 'Check that your licence covers the engine size before you order.',
    choose: [
      "You should be able to reach the ground with the balls of both feet when seated.",
      "Budget for insurance, a helmet and protective clothing as well as the bike itself.",
      "Smaller engines are cheaper to run and easier to learn on.",
    ],
  },
  'skin-care': {
    intro: 'Cleansers, moisturisers, serums and sun protection.',
    why: 'We favour short ingredient lists and products that do one job well.',
    tip: 'Try anything new on a small patch of skin first, and wear sun protection every day, not only in summer.',
    choose: [
      "Oily skin usually suits gel textures; dry skin suits richer creams.",
      "Introduce one new product at a time so you can tell what works.",
      "For daily use, choose sun protection of SPF 30 or higher.",
    ],
  },
  smartphones: {
    intro: 'Phones from the major makers.',
    why: 'We stock current and recent models, which often give the best value for money.',
    tip: 'Make sure the phone supports the mobile bands your network uses before you buy.',
    choose: [
      "128 GB of storage suits most people; choose more if you film a lot of video.",
      "Check how many years of software updates the maker promises.",
      "Battery capacity matters, but so does how efficient the processor is.",
    ],
  },
  'sports-accessories': {
    intro: 'Balls, rackets, gloves and kit for sport and exercise.',
    why: 'We choose kit that suits beginners and keeps up as you improve.',
    tip: 'Pump balls to the pressure printed near the valve so they keep their bounce and shape.',
    choose: [
      "Size 5 footballs are for adults; size 4 suits players aged about 8 to 12.",
      "On a racket, you should fit one finger between your fingertips and palm around the grip.",
      "Gloves should feel snug at first, because they loosen with use.",
    ],
  },
  sunglasses: {
    intro: 'Sunglasses for driving, travel and bright days.',
    why: 'Dark lenses without UV protection can do more harm than good, so every pair we sell blocks UV light.',
    tip: 'Clean lenses with water and a soft cloth. Paper towels can scratch the coating.',
    choose: [
      "Polarised lenses cut glare from water and wet roads, which helps when driving.",
      "Category 3 lenses suit most sunny days; category 4 is for mountains and must not be worn for driving.",
      "Wraparound frames block more light from the sides.",
    ],
  },
  tablets: {
    intro: 'Tablets for reading, drawing, video calls and work on the move.',
    why: 'A tablet should stay quick for years, so we pick models with enough storage and long software support.',
    tip: 'Choose more storage if you plan to download films or music to watch and play offline.',
    choose: [
      "An 11-inch screen balances size and weight for reading and video.",
      "Check stylus and keyboard support if you plan to draw or type a lot.",
      "Wi-Fi models cost less; cellular models work anywhere with a SIM card.",
    ],
  },
  tops: {
    intro: 'T-shirts, blouses and knitwear.',
    why: 'We pick soft fabrics and simple shapes that go with what you already own.',
    tip: 'Turn printed tops inside out before washing to keep the print looking new.',
    choose: [
      "Cotton and linen breathe better than synthetics in warm weather.",
      "Heavier knits hold their shape for longer.",
      "Check the fabric on the label if you would rather not iron.",
    ],
  },
  vehicle: {
    intro: 'Cars and SUVs, each listed with full specifications.',
    why: 'A car is a big decision, so every listing shows the details you need to compare models side by side.',
    tip: 'Arrange a test drive of the same model before you order.',
    choose: [
      "Compare running costs as well as the price: fuel, insurance and servicing.",
      "Check the boot space against what you carry most often.",
      "Look up the safety rating for the exact model and year.",
    ],
  },
  'womens-bags': {
    intro: 'Handbags, totes and backpacks.',
    why: 'We look for strong stitching, sturdy handles and enough pockets to keep things organised.',
    tip: 'Fill leather bags with paper when you are not using them so they keep their shape.',
    choose: [
      "A zip-top bag keeps belongings safer on public transport.",
      "Check the strap drop if you want to wear the bag on your shoulder over a coat.",
      "Lighter bags are better for every day; leather adds weight.",
    ],
  },
  'womens-dresses': {
    intro: 'Dresses for work, weekends and special occasions.',
    why: 'We choose dresses that are comfortable to move in and easy to dress up or down.',
    tip: 'Hang dresses on wide hangers and wash delicate fabrics on a cool, gentle cycle.',
    choose: [
      "Check the length against your height, because midi lengths fall differently on everyone.",
      "Fabrics with some stretch are more forgiving between sizes.",
      "Lined dresses hang better and are less see-through.",
    ],
  },
  'womens-jewellery': {
    intro: 'Earrings, necklaces, bracelets and rings.',
    why: 'We pick pieces you can wear every day, not only on special occasions.',
    tip: 'Put jewellery on after perfume and make-up, and take it off before swimming or exercise.',
    choose: [
      "Sterling silver and gold-plated pieces suit sensitive skin better than base metals.",
      "Measure a ring you already own to find your size.",
      "Adjustable chains of 40 to 45 cm work with most necklines.",
    ],
  },
  'womens-shoes': {
    intro: 'Heels, flats, trainers and boots.',
    why: 'We look for cushioned insoles and soles with good grip, so shoes feel comfortable from the first day.',
    tip: 'Try new shoes indoors first. Unworn shoes can be returned within 30 days.',
    choose: [
      "Block heels are easier to walk in than stilettos of the same height.",
      "Measure your feet in the evening, when they are slightly larger.",
      "Treat suede with a protective spray before you wear it for the first time.",
    ],
  },
  'womens-watches': {
    intro: 'Watches for everyday and evening wear.',
    why: 'We choose watches that are easy to read and light enough to forget you are wearing them.',
    tip: 'Keep watches away from strong magnets, such as phone cases with magnetic clasps. They can affect accuracy.',
    choose: [
      "Cases of 26 to 34 mm suit slimmer wrists.",
      "Mesh and leather straps are lighter than metal bracelets.",
      "Check whether the bracelet can be shortened at home or needs a jeweller.",
    ],
  },
};

export function getCategoryNote(slug) {
  return categoryNotes[slug] ?? fallbackNote;
}
