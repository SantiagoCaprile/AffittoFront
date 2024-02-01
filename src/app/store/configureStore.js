// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import propiedadesReducer from "./reducers/propiedadesSlice";

const store = configureStore({
	reducer: {
		user: userReducer, // Agrega otros reducers aquí si es necesario
		propiedades: propiedadesReducer,
		//ver si crear el de clientes
	},
});

export default store;
