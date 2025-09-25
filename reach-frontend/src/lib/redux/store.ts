import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from "./featuresSlice/slideBarSlice"
import ProfileSLice from './featuresSlice/slideBarProfileSlice'
import userState from './featuresSlice/userDetails'
export const makeStore = () => {
  return configureStore({
    reducer: {
        sideBar:sideBarReducer,
        profile:ProfileSLice,
        user:userState
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']