import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an initial state
const initialState = {
	readings: [],
	loading: false,
	error: null,
};

// Async thunk to fetch readings from the API
export const fetchReadings = createAsyncThunk(
	"readings/fetchReadings",
	async () => {
		const response = await fetch("/api/readings"); // Adjust the endpoint if necessary
		if (!response.ok) {
			throw new Error("Failed to fetch readings");
		}
		const data = await response.json();
		return data;
	},
);

// Async thunk to add a new reading
export const addReading = createAsyncThunk(
	"readings/addReading",
	async (newReading) => {
		const response = await fetch("/api/readings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newReading),
		});

		if (!response.ok) {
			throw new Error("Failed to add reading");
		}
		const data = await response.json();
		return data;
	},
);

// Create a slice
const readingsSlice = createSlice({
	name: "readings",
	initialState,
	reducers: {
		clearReadings: (state) => {
			state.readings = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReadings.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchReadings.fulfilled, (state, action) => {
				state.loading = false;
				state.readings = action.payload;
			})
			.addCase(fetchReadings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addReading.pending, (state) => {
				state.loading = true;
			})
			.addCase(addReading.fulfilled, (state, action) => {
				state.loading = false;
				state.readings.push(action.payload); // Add the new reading to the list
			})
			.addCase(addReading.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

// Export actions and reducer
export const { clearReadings } = readingsSlice.actions;
export default readingsSlice.reducer;
