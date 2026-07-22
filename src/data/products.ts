import { Product, Review } from '../types';

export const CATEGORIES_DATA = [
  {
    id: 'shoes',
    title: 'Shoes',
    subtitle: 'Refined Step',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-gl0roOssXULT1lHt1GBYbL6Q8junCaL6oB2rPF07EY5y5tg-LKUBMIUW5J7zgZtfxPPJGmHR5fk3nowlLQN-qJ_aetiSBfExdTx_6pgTItad6_ttM0JCIgTABrlUMCVB60vkbzVIKc3UwnBMxDJw-8I6_5cd33RjdS55SLCaC-KRZkpKTAkA-bQO4Cd0yKZqJR162FPihpeopEZF2bRbKwTDaUDawwVwNdRovxKu9joiH_PVBFJwnBC6xB6jBQvwamzkU15nUaXw',
    description: 'Close-up artistic shot of handcrafted Italian leather men\'s oxford shoes in a rich mahogany brown. The shoes sit on a minimalist marble pedestal under soft, diffused studio lighting.'
  },
  {
    id: 'watches',
    title: 'Watches',
    subtitle: 'Timeless Precision',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtakpO2AAaIfa_zCtmPPm4wq-zVVLHYlSFX0BvKreJnF_zWukQN0jJIoRBDBhsy0n2cfqtKKvx2GluLNOoQrRRfFRSz36URWUFfkiqzctztetGw1pwN_zBWjDORKBXyZQXUc7TahC0j5nBXgECJhW45ZDUWvfPdCGdQrWTqont6EhDrrdDs-OCTFLWbXHrRCXZUgf1fuZtRkGHDe068CwU-tO8PyTivX44AHw-Wyjo54qKsF3t-DEnCH4fM9Zs08Zw0ye1nNkZLTe',
    description: 'A macro photograph of a high-end luxury mechanical watch with a skeleton dial, revealing intricate gold gears and escapements.'
  },
  {
    id: 'perfumes',
    title: 'Perfumes',
    subtitle: 'Scent Narrative',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW4_piH1zTbAOR02ejRZylZqbqfS4BQ6d2JdwldKPFEpyfH7UF5uFYlqO-WvBuGhRrcFMZSlHbTUUcTu0f7Yzdh8k_wOBtByG2ifGShOE6F6yx4x0ga9Kw7oXAx8FXM4cRqe2dRsX_Xi7zPZwxjMYg15jr4T4HxE5R7DOC_lLoIToKdkW0AzG5gN6jXIH0PNrrcwtFRLs6pWZGZYgnF7Tk5XqO3O5KaKhrsuH_riUDXElR434cIQ9jsCr3Hqf6NZ-kiw7i_W3lI5L-',
    description: 'An elegant glass perfume bottle with a minimalist gold cap, standing amongst soft architectural shadows.'
  },
  {
    id: 'bags',
    title: 'Bags',
    subtitle: 'Carry with Grace',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnh7iX53kY1J5KWKOR3CoFKPnGVw3qmBfxRWxvPItZp0K2gqhr2Izrm-eSq2lVHotVKidioQ6w9lX9pwPoecEzZgY6ihfXkvMfcNV31Y3XRkkjbhB24svjhOuNmP2f1MqG2LEqzclbn9exK-JUSZNTqblk9GMP4a49G2-8XDe0dSKHdbNLg58H4CTKHzlVE5dVIFN7u9yZAlzLAoG3MRH2Dg7CXxxzyIM4Lnxf7w6ib7YHm3p_BT5qOkCYwAs-keElgFRfNHuR1FGt',
    description: 'A structural luxury leather handbag in matte black with minimalist gold hardware on modern concrete bench.'
  }
];

export const PRODUCTS_DATA: Product[] = [
  // Flash Sale / Midnight Drop
  {
    id: 'drop-1',
    name: 'Noir Collection Vase',
    description: 'A sleek black obsidian luxury desk accessory or flower vase, highly polished and reflective. Minimalist and sculptural in design, bringing deep sophistication to any office or drawing room.',
    price: 420,
    originalPrice: 600,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-YEqcCmElxKNvKf_Ji8adWeDUc5phcc0eB0bbAHW90M4w-esxkImfuLp6GNz-XXEEkPU9MnEH9O9Xr06HO-OxoGJ55-6sgLTaoJYeX4Q9YKWsTewe_5Tb15pA_g2SP8xyBFWLyn-Ngh6kEDuyN_xWihh0XAwzhfCP5EF-JJKOsOuFfxtCXfA7k358K2ovuanjlzxYtnXKnWRx-nTQk4OAHurI0ugl--8IAURM1YZmgH9gorw9BUeB8tAtaA-khHjyGqWCSCCaA8Xr',
    category: 'accessories',
    subtitle: 'Midnight Drop Exclusive',
    badge: '30% OFF',
    details: [
      'Genuine hand-cut black obsidian stone',
      'Ultra-high mirror-polish finish',
      'Heavy weighted base for ultimate stability',
      'Individually numbered editorial collector\'s card'
    ],
    sizes: ['Standard'],
    colors: [{ name: 'Obsidian Black', hex: '#0a0a0a' }]
  },
  {
    id: 'drop-2',
    name: 'Titanium Aviators',
    description: 'A pair of luxury titanium sunglasses with dark polarized lenses, resting on a charcoal gray textured surface. Minimalist studio design with extreme lightweight feel and perfect UV protection.',
    price: 280,
    originalPrice: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw7E_rD2IOayVCgO-ct29BrK1hmbGgXJWq9enUNmxT0IKWz09gCp9VO95DxgClv__MVMpqx8TI8mLkCpLdnavUeWFmfsL5pWpvN_-CLEp2MsAZrnFRAJRPIV1sq1G2xpRkXkpa_VJBEgWEAFLfPvP_CZvkG7qldEyMFSYClnu76DbmogafiATq5I-5lVz9ZZm9EQniYA4gVUxfCWxqGUym-XgiACmEv3cqDQKDOP5K9Wd-lOhOJO8-QZ12G_LC0PgU9lk0xabEgBjo',
    category: 'accessories',
    subtitle: 'Midnight Drop Exclusive',
    badge: '37% OFF',
    details: [
      'Pure Grade-5 Aerospace Titanium frames',
      'Japan-crafted polarized dark lenses with anti-reflective coating',
      'Zero-pressure weightless hinge system',
      'Elysia leather protective carry pouch included'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Titanium Silver', hex: '#b4b4b4' },
      { name: 'Brushed Gold', hex: '#cfb97c' }
    ]
  },
  {
    id: 'drop-3',
    name: 'The Scribe Pen',
    description: 'A luxury gold-plated fountain pen with an intricate custom nib, designed for collectors and elite minds. Delivers a flawless flowing script across premium parchment or heavy cotton paper.',
    price: 890,
    originalPrice: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDapnaq2AwGSl6ZA4QfrHmYkwCITlCM-jhsRbB38WGD4EwJ_09CmJqRNMCAoBJ0JsB7LbuXpbvKZQ4O_HLXSIOWNGObEuaq4S-pueKALf-LkKzYnFnYmARcSir2cKVmmff8LEV3ctDIZmg_N1YErkHSff4wsR8DIaUKe9V8rYJhsktAhJ3PZDEjKVLla5blZfDhYJ-TiDEnQSWKVGpyLHmvHaMMxjtx4okTER-dBfsnL_-nmeieIYGgJDF4e1bAMIWIHmCjUMqfQjRX',
    category: 'accessories',
    subtitle: 'Midnight Drop Exclusive',
    badge: '25% OFF',
    details: [
      '18-karat gold-plated detailing & cap',
      'Hand-ground German iraurita medium nib',
      'Internal dual-fill ink converter system',
      'Presented in hand-stitched walnut presentation box'
    ],
    sizes: ['Fine Nib', 'Medium Nib'],
    colors: [{ name: 'Gold & Ivory', hex: '#d4af37' }]
  },
  {
    id: 'drop-4',
    name: 'Bifold Wallet',
    description: 'A premium hand-stitched French calfskin leather wallet with a discrete gold monogram. Designed with a ultra-slim profile that preserves sartorial silhouettes without compromising storage.',
    price: 150,
    originalPrice: 290,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNOnnffrzaLoKHD0oRkV6g90ET1kSmeg0Rlyz0RqR4Za6PvL37zs0Q5I1LSUf7N4lSuptmh5q4X5K3wGNpH19w7abQpGLq_A1YR9xWPNq5FEEGN6dG-WDjl2eNS0Y4W0arw7W18x2vWTLA5IR9Q5SDO0Gmthvr8VoYK-mi8yUqpQr4DuWL6PvgI4mCvw6jhei6ONNCAE9eT6JFFKMzxvFx4GsPYgoWjcEh0BiB9Sn5Uf7QcJdQ1Y1CcUw1-jOFSx3RxGWK8lLkEd0Y',
    category: 'bags',
    subtitle: 'Midnight Drop Exclusive',
    badge: '48% OFF',
    details: [
      'Full-grain French box calfskin leather',
      'Six card slots, double bill compartment',
      'Embossed 24k gold leaf Elysia monogram seal',
      'Hand-painted finished edges'
    ],
    sizes: ['Slim Bifold'],
    colors: [
      { name: 'Noir Black', hex: '#111111' },
      { name: 'Elysia Tan', hex: '#8b5a2b' }
    ]
  },

  // New Arrivals
  {
    id: 'arrival-1',
    name: 'Camel Cashmere Overcoat',
    description: 'A tailored luxury double-breasted overcoat in soft Grade-A Mongolian cashmere. Fits fluidly over formal tailoring or off-duty knitwear, offering ultimate warmth and editorial presence.',
    price: 2450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNOyQu0ikGpjMbx-0ubZxqU1xTcRRmBsU40iNKVhR22Kt-xX15gy8qUUFl_XtmNL9jJDhGzYrznFiWnxBSBB4e7rxyaG6affi1_KTHln7vn9VwJN_xfhrevgNXTaF9WSfbxA96Th7iOFj6Xb40hIWc-l2Ukt2S_dru0e6dulJL0BOrrxhHepaC8Ia6AAp53D7bb11XBj3Tqt5GWnR4NdXh6hKfdjk4eW9p88R7cSrpGsG8VVOWQuBHRGnwcbo6dNBX6AapJpsynasF',
    category: 'apparel',
    subtitle: 'The Seasonal Edit',
    details: [
      '100% sustainably-sourced Grade-A Mongolian cashmere',
      'Hand-stitched peak lapel and unstructured shoulder flow',
      'Genuine dark horn custom-engraved buttons',
      'Cupro-jacquard breathable satin lining'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel Tan', hex: '#c5a059' },
      { name: 'Elysia Cream', hex: '#fbf7f0' }
    ]
  },
  {
    id: 'arrival-2',
    name: 'Ivory Silk Clutch',
    description: 'A minimalist architectural clutch bag in 100% mulberry silk with a structural brushed gold-plated handpiece. Ideal for evening events, private viewings, or dining out.',
    price: 1120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyYhwUCYSf5bsKYquIAHuO6MkuupUdLId5cPWB3AlaSrjf6PJ4cF_XLF4mbmBvkifeaAKuVRQowGdD-1WsRgrbVKfTQKmNYlTHE3h7fB1GN0AunqA9ykj2CuNGm6oUDc332gsfZ8x7Rek3zNsrBGcW0Gs_cXwofIBlKh2Kndu2YRmlwXuF20eGQLNtdMZm4h0NqMdAlUp0m0bQK2hjmS4DrmqeIYRGA1ChOE8wQHzCFFBc_mqJBJMIW-e72WlDssdAKEAnI5OiUQEt',
    category: 'bags',
    subtitle: 'The Seasonal Edit',
    details: [
      'Double-ply organic Mulberry raw silk',
      'Solid brass frame with brushed 18k gold-plating',
      'Concealed fine-chain shoulder strap option',
      'Magnetic secure closure snaps'
    ],
    sizes: ['Mini Clutch'],
    colors: [
      { name: 'Ivory White', hex: '#fdfbf7' },
      { name: 'Sable Black', hex: '#111111' }
    ]
  },
  {
    id: 'arrival-3',
    name: 'Espresso Chelsea Boots',
    description: 'A pair of meticulously hand-stitched luxury Italian leather Chelsea boots in a deep espresso brown. Clean silhouette, polished sheen, and unmatched urban posture.',
    price: 680,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRZ7Pg2AZnvR4xuI39tf-bT2U9Mx3n6fz-ZPog6uUw_pz5GRuK0F49ZIg-U4UqRJ1pn3eUoNEhUuxHChAJBqrvjnIZ7rvtRI7BNaln8qzNJE62Y7bjtgR4VpvMGoWxBxavLD-Pl_xSoxkl3_1-R662mVsLnk8gS1Vqxh6XfYXdF2OKecCC7sNSENeQwRw2q5bw53bDqbA8xQc4gE3QvaocIURRQuZ3yB_kwh5_iKy5QGpTH15JeCBvqqgD9FoadzsS9xCoMSvab32U',
    category: 'shoes',
    subtitle: 'The Seasonal Edit',
    details: [
      'Full-grain Italian calf leather upper',
      'Blake-stitched construction for lifetime recraftability',
      'Dual-elasticated side panels with high-rebound shape-memory',
      'Comfort-molded leather insoles'
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Espresso Brown', hex: '#3d2b1f' },
      { name: 'Classic Black', hex: '#0a0a0a' }
    ]
  },
  {
    id: 'arrival-4',
    name: 'Artisanal Silk Scarf',
    description: 'A premium organic silk scarf with abstract artistic hand-prints in gold and black tones. Drapes gracefully, showing beautiful luster and liquid fluidity.',
    price: 340,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB860Yy8oajV-jR9SJ4DJiJW7jPfn2iuNeeqqDlUdAuWxjmhXDsnIkUdWReIEoLUil8iuO7pZXuy0jDfFOkCDgEw7q9he4R-D7ag20S56xvqqtnxrQ7PYW4ZmGiMbMuo9uBmBzCTe_rtZLvzy-QyUJzNfCvQhcoOS1df0JG46ybpLT0jKhCabeT-NdBPPsHyEMIDaEUttQ-xkYqLyAi-ZD9jkM8zfni8MEC1wxW4CG4hSH-1GcCxuDfa9bKgLWzDZDLcl5oWotsyQik',
    category: 'accessories',
    subtitle: 'The Seasonal Edit',
    details: [
      '100% natural pure Twill Silk (14 momme)',
      'Hand-rolled and hand-stitched elegant edges',
      'Elysia signature watercolor abstract print design',
      'Generous dimensions for multiple styling options (90cm x 90cm)'
    ],
    sizes: ['One Size'],
    colors: [{ name: 'Abstract Gold/Black', hex: '#d4af37' }]
  },
  {
    id: 'arrival-5',
    name: 'Matte Signature Belt',
    description: 'A high-end designer dress belt crafted in durable pebble-grain French calfskin leather. Finished with a subtle matte-texture Elysia emblem buckle.',
    price: 490,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH2Q5BJKx_MQh-XWZWneNuENOjDzwGNv0wfIwgq-1HEuTlZPumlj5H8f6hokMEh9gI8VWIc4Zu2cbON5pzvSA4etIyB1_G0iU0isiDY7cbQpVgrupIRK1Vzh7xBVcTX2O_mHyO1rKwkJ9ErvoD6ChUmJ_Qb6Dkod7H4wJsp61nFdvmfGXTzVzZnSgKmVn_m5HFtabF6Jhd5heNgkaUHn6E4QKFhUzhkEDvw1rzURSRLM3rLRPed78Ut-PNL7j3Lzo9X7ggYbctJxuP',
    category: 'accessories',
    subtitle: 'The Seasonal Edit',
    details: [
      'Finest grain French calf leather',
      'Solid brass signature emblem buckle with custom matte powder-coating',
      'Width: 3.5cm',
      'Hand-painted contrast-finished edges'
    ],
    sizes: ['80cm', '85cm', '90cm', '95cm', '100cm'],
    colors: [
      { name: 'Grained Obsidian', hex: '#111111' },
      { name: 'Muted Taupe', hex: '#b3a296' }
    ]
  },

  // Extra items to fill up single-category filtering
  {
    id: 'shoe-extra-1',
    name: 'Mahogany Leather Oxfords',
    description: 'The pinnacle of formal dress shoes. Handcrafted in Milan from a single piece of full-grain leather, tinted with mahogany patinas, and set on a fine leather sole.',
    price: 950,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-gl0roOssXULT1lHt1GBYbL6Q8junCaL6oB2rPF07EY5y5tg-LKUBMIUW5J7zgZtfxPPJGmHR5fk3nowlLQN-qJ_aetiSBfExdTx_6pgTItad6_ttM0JCIgTABrlUMCVB60vkbzVIKc3UwnBMxDJw-8I6_5cd33RjdS55SLCaC-KRZkpKTAkA-bQO4Cd0yKZqJR162FPihpeopEZF2bRbKwTDaUDawwVwNdRovxKu9joiH_PVBFJwnBC6xB6jBQvwamzkU15nUaXw',
    category: 'shoes',
    subtitle: 'Refined Step Series',
    details: [
      'Whole-cut hand-polished Italian box calf leather',
      'Rich mahogany and cherry multi-toned hand patina',
      'Stitch-channel closed leather sole with protective rubber heel insert',
      'Crafted by multi-generational cobbler families in Milan'
    ],
    sizes: ['41', '42', '43', '44'],
    colors: [{ name: 'Mahogany Burgundy', hex: '#4a1515' }]
  },
  {
    id: 'watch-extra-1',
    name: 'Titanium Skeleton Watch',
    description: 'An architectural statement for your wrist. Pure platinum and skeleton titanium frame reveal every subtle tick of the custom mechanical movement inside.',
    price: 14500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtakpO2AAaIfa_zCtmPPm4wq-zVVLHYlSFX0BvKreJnF_zWukQN0jJIoRBDBhsy0n2cfqtKKvx2GluLNOoQrRRfFRSz36URWUFfkiqzctztetGw1pwN_zBWjDORKBXyZQXUc7TahC0j5nBXgECJhW45ZDUWvfPdCGdQrWTqont6EhDrrdDs-OCTFLWbXHrRCXZUgf1fuZtRkGHDe068CwU-tO8PyTivX44AHw-Wyjo54qKsF3t-DEnCH4fM9Zs08Zw0ye1nNkZLTe',
    category: 'watches',
    subtitle: 'Timeless Precision',
    details: [
      'Skeleton tourbillon automatic mechanical movement',
      '50-hour reserve window with retrograde power dial',
      'Slightly curved scratchproof sapphire crystal glass',
      'Interlocking matte grade-5 titanium strap link mechanism'
    ],
    sizes: ['40mm Case'],
    colors: [
      { name: 'Platinum Steel', hex: '#e2e2e2' },
      { name: 'Smoked Onyx', hex: '#2c2d30' }
    ]
  },
  {
    id: 'perfume-extra-1',
    name: 'Scent Narrative No. 3',
    description: 'A deep, mysterious, woody perfume designed for modern individuals. Warm sandalwood, pale amber glow, and smoky incense rise elegantly, offering a sensory high-key experience.',
    price: 320,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW4_piH1zTbAOR02ejRZylZqbqfS4BQ6d2JdwldKPFEpyfH7UF5uFYlqO-WvBuGhRrcFMZSlHbTUUcTu0f7Yzdh8k_wOBtByG2ifGShOE6F6yx4x0ga9Kw7oXAx8FXM4cRqe2dRsX_Xi7zPZwxjMYg15jr4T4HxE5R7DOC_lLoIToKdkW0AzG5gN6jXIH0PNrrcwtFRLs6pWZGZYgnF7Tk5XqO3O5KaKhrsuH_riUDXElR434cIQ9jsCr3Hqf6NZ-kiw7i_W3lI5L-',
    category: 'perfumes',
    subtitle: 'Sensory Experience',
    details: [
      'Top Notes: Soft Bergamot, White Saffron, Cardamom',
      'Heart Notes: Smoked Incense, Pale Amber, Damask Rose',
      'Base Notes: Sandalwood, Dark Patchouli, Premium Oud Oil',
      '100ml spray bottle with solid brass-plated heavy magnetic cap'
    ],
    sizes: ['100ml'],
    colors: [{ name: 'Amber Gold', hex: '#e5c060' }]
  },
  {
    id: 'bag-extra-1',
    name: 'Brutalist Matte Handbag',
    description: 'An avant-garde handbag combining structural Brutalist concrete inspirations with buttery soft matte black calfskin. Embellished with fine-brushed gold hardware.',
    price: 3100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnh7iX53kY1J5KWKOR3CoFKPnGVw3qmBfxRWxvPItZp0K2gqhr2Izrm-eSq2lVHotVKidioQ6w9lX9pwPoecEzZgY6ihfXkvMfcNV31Y3XRkkjbhB24svjhOuNmP2f1MqG2LEqzclbn9exK-JUSZNTqblk9GMP4a49G2-8XDe0dSKHdbNLg58H4CTKHzlVE5dVIFN7u9yZAlzLAoG3MRH2Dg7CXxxzyIM4Lnxf7w6ib7YHm3p_BT5qOkCYwAs-keElgFRfNHuR1FGt',
    category: 'bags',
    subtitle: 'Brutalist series',
    details: [
      '100% thick premium matte box calfskin leather',
      'Structured structural frame that stands independently',
      'Brushed golden brass signature custom hardware',
      'Secret internal zip pocket with custom serial number plaque'
    ],
    sizes: ['Standard'],
    colors: [
      { name: 'Matte Obsidian', hex: '#1c1b1b' },
      { name: 'Brutal Ivory', hex: '#e8e8e8' }
    ]
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Alexander M.',
    role: 'Verified Collector',
    rating: 5,
    comment: 'The attention to detail and curated selection is unmatched. My go-to for pieces that truly stand out.',
    avatar: 'AM'
  },
  {
    id: 'rev-2',
    name: 'Sophia C.',
    role: 'Loyalty Member',
    rating: 5,
    comment: 'Elysia represents the pinnacle of digital luxury. The shipping experience was as premium as the product.',
    avatar: 'SC'
  },
  {
    id: 'rev-3',
    name: 'Julian H.',
    role: 'Verified Buyer',
    rating: 5,
    comment: 'Finding these limited drops is always the highlight of my week. Authentic luxury at its best.',
    avatar: 'JH'
  },
  {
    id: 'rev-4',
    name: 'Elena V.',
    role: 'Collector',
    rating: 5,
    comment: 'Exceptional customer service and a selection that truly reflects a global luxury perspective.',
    avatar: 'EV'
  }
];
