// redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { HYDRATE } from "next-redux-wrapper";

// Async action to handle login
// export const loginUser = createAsyncThunk(
// 	"auth/loginUser",
// 	async (credentials, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.post("/api/auth/login", credentials);
// 			return response.data; // Assuming response contains user info and token
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	},
// );

const initialState = {
	user: { name: null, email: null, token: null },
	error: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = { name: null, email: null, token: null };
			state.error = null;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(loginUser.pending, (state) => {
	// 			state.loading = true;
	// 			state.error = null;
	// 		})
	// 		.addCase(loginUser.fulfilled, (state, action) => {
	// 			state.user = action.payload.user; // Assuming response contains { user: { name, email, token }}
	// 			state.loading = false;
	// 		})
	// 		.addCase(loginUser.rejected, (state, action) => {
	// 			state.loading = false;
	// 			state.error = action.payload;
	// 		});
	// 	// Handle SSR and hydration in Next.js
	// 	// .addCase(HYDRATE, (state, action) => {
	// 	// 	return {
	// 	// 		...state,
	// 	// 		...action.payload.auth,
	// 	// 	};
	// 	// });
	// },
});

// Export actions
export const { logout } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;
