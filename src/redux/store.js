// redux/store.ts
"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
import authReducer from "./slices/authSlice";

// Combine your reducers here
const rootReducer = combineReducers({
	auth: authReducer,
});

// Create the Redux store
const makeStore = () =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== "production",
	});

// Export the store wrapper
// export const wrapper = createWrapper(makeStore);
export const store = makeStore();
export const selectAuth = (state) => state.auth;
