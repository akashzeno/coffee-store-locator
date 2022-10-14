import { createContext, useReducer } from "react";
export const StoreContext = createContext();

export const ACTION_TYPES = {
	SET_LAT_LONG: "SET_LAT_LONG",
	SET_COFFEE_STORES: "SET_COFFEE_STORES",
	SET_DEMO_COFFEE_STORES: "SET_DEMO_COFFEE_STORES",
};

function StoreReducer(state, action) {
	switch (action.type) {
		case ACTION_TYPES.SET_LAT_LONG: {
			return { ...state, latLong: action.payload };
		}
		case ACTION_TYPES.SET_COFFEE_STORES: {
			return {
				...state,
				coffeeStores: action.payload,
			};
		}
		case ACTION_TYPES.SET_DEMO_COFFEE_STORES: {
			return {
				...state,
				demoCoffeeStores: action.payload,
			};
		}

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

export default function StoreProvider({ children }) {
	const initialState = {
		latLong: "",
		coffeeStores: [],
		demoCoffeeStores: [],
	};
	const [state, dispatch] = useReducer(StoreReducer, initialState);
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}
