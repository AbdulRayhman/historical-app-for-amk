import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface HistoricalPlace {
  id: string
  name: string
  description: string
  image: string
  location: string
  era: string
  significance: string
  isVisited: boolean
}

interface HistoricalPlacesState {
  places: HistoricalPlace[]
  loading: boolean
  error: string | null
}

const initialState: HistoricalPlacesState = {
  places: [
    {
      id: "1",
      name: "Colosseum",
      description: "An ancient amphitheatre in the centre of Rome, Italy.",
      image: "/roman-colosseum-ancient-amphitheatre.png",
      location: "Rome, Italy",
      era: "Ancient Rome (72-80 AD)",
      significance:
        "The Colosseum is the largest amphitheatre ever built and is considered one of the greatest works of Roman architecture and engineering. It could hold an estimated 50,000 to 80,000 spectators and was used for gladiatorial contests and public spectacles. It remains an iconic symbol of Imperial Rome and its architectural innovations influenced arena design for centuries.",
      isVisited: false,
    },
    {
      id: "2",
      name: "Machu Picchu",
      description: "An ancient Incan citadel set high in the Andes Mountains in Peru.",
      image: "/machu-picchu-incan-citadel-andes-mountains.png",
      location: "Cusco Region, Peru",
      era: "Inca Empire (1450 AD)",
      significance:
        "Machu Picchu is a remarkably well-preserved example of Incan architecture and urban planning. Built around 1450 AD, it demonstrates the sophisticated engineering skills of the Inca civilization, including advanced stone-cutting techniques, agricultural terraces, and water management systems. The site was abandoned during the Spanish conquest and remained hidden until 1911.",
      isVisited: false,
    },
    {
      id: "3",
      name: "Great Wall of China",
      description: "A series of fortifications built across northern China.",
      image: "/great-wall-of-china-ancient-fortification.png",
      location: "Northern China",
      era: "Ming Dynasty (1368-1644 AD)",
      significance:
        "The Great Wall of China is the longest wall in the world, stretching over 13,000 miles. Built over many dynasties, it represents one of the most impressive architectural feats in human history. The wall served as a military defense system and helped control trade along the Silk Road. It stands as a testament to Chinese engineering prowess and determination.",
      isVisited: false,
    },
    {
      id: "4",
      name: "Petra",
      description: "An archaeological site in Jordan, famous for its rock-cut architecture.",
      image: "/petra-jordan-rock-cut-architecture-treasury.png",
      location: "Ma'an Governorate, Jordan",
      era: "Nabataean Kingdom (4th century BC)",
      significance:
        "Petra was the capital of the ancient Nabataean Kingdom and showcases remarkable rock-cut architecture carved directly into sandstone cliffs. The city was a major trading hub that controlled important trade routes between Arabia, Egypt, and the Mediterranean. Its sophisticated water management system and stunning facades make it one of the most spectacular archaeological sites in the world.",
      isVisited: false,
    },
    {
      id: "5",
      name: "Angkor Wat",
      description: "A temple complex in Cambodia, originally built as a Hindu temple.",
      image: "/angkor-wat-cambodia-temple-complex-hindu-architect.png",
      location: "Angkor, Cambodia",
      era: "Khmer Empire (12th century)",
      significance:
        "Angkor Wat is the largest religious monument in the world, originally constructed as a Hindu temple dedicated to Vishnu. It represents the pinnacle of Khmer architecture and demonstrates the power and sophistication of the Khmer Empire. The complex features intricate bas-reliefs, precise astronomical alignments, and innovative hydraulic engineering that supported a massive urban center.",
      isVisited: false,
    },
    {
      id: "6",
      name: "Stonehenge",
      description: "A prehistoric monument consisting of standing stones in England.",
      image: "/stonehenge-prehistoric-stone-circle-england.png",
      location: "Wiltshire, England",
      era: "Neolithic Period (3100-2000 BC)",
      significance:
        "Stonehenge is one of the world's most famous prehistoric monuments, consisting of a ring of standing stones. Built in several phases over 1,500 years, it demonstrates sophisticated understanding of astronomy and engineering by Neolithic peoples. The monument's purpose remains debated, but it likely served as a ceremonial site, burial ground, and astronomical observatory.",
      isVisited: false,
    },
  ],
  loading: false,
  error: null,
}

export const historicalPlacesSlice = createSlice({
  name: "historicalPlaces",
  initialState,
  reducers: {
    toggleVisited: (state, action: PayloadAction<string>) => {
      const place = state.places.find((p) => p.id === action.payload)
      if (place) {
        place.isVisited = !place.isVisited
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { toggleVisited, setLoading, setError } = historicalPlacesSlice.actions
