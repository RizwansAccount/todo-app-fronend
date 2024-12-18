import { configureStore } from "@reduxjs/toolkit";
import { todoAppApi } from "./storeApis";

export const store = configureStore({
    reducer : {
        [todoAppApi.reducerPath]: todoAppApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoAppApi.middleware),
})