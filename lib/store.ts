import { configureStore } from "@reduxjs/toolkit"
import { historicalPlacesSlice } from "./features/historical-places/historicalPlacesSlice"

export const store = configureStore({
  reducer: {
    historicalPlaces: historicalPlacesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
