import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../context/storeContext.js";

export default function getUserLocation() {
	const [locationErrorMsg, setLocationErrorMsg] = useState("");

	const [isFindingLocation, setIsFindingLocation] = useState(false);
	const { dispatch } = useContext(StoreContext);
	const success = (position) => {
		setIsFindingLocation(false);
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		dispatch({
			type: ACTION_TYPES.SET_LAT_LONG,
			payload: `${latitude},${longitude}`,
		});
		setLocationErrorMsg("");
	};
	const error = () => {
		setIsFindingLocation(false);
		setLocationErrorMsg("Unable to retrieve your location");
	};
	const handleUserLocation = () => {
		setIsFindingLocation(true);
		if (!navigator.geolocation) {
			setIsFindingLocation(false);
			setLocationErrorMsg("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};
	return {
		locationErrorMsg,
		handleUserLocation,
		isFindingLocation,
	};
}
