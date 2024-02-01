// src/app/reducers/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const propiedadesSlice = createSlice({
	name: "propiedades",
	initialState: {
		propiedades: [],
		loading: false,
		error: null,
	},
	reducers: {
		setPropiedades: (state, action) => {
			state.propiedades = action.payload;
			state.loading = false;
			state.error = false;
		},
		setPropiedadesLoading: (state) => {
			state.loading = true;
			state.error = false;
		},
		setPropiedadesError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearPropiedades: (state) => {
			state.propiedades = null;
			state.loading = false;
			state.error = false;
		},
	},
});

export const {
	setPropiedades,
	setPropiedadesLoading,
	setPropiedadesError,
	clearPropiedades,
} = propiedadesSlice.actions;

export default propiedadesSlice.reducer;
