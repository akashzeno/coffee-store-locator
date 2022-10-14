import { createApi } from "unsplash-js";

// on your node server
const unsplashServerApi = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
	//...other fetch options
});

export async function fetchCoffeeStores(
	latLong = "22.5542144,88.3654656",
	limit = 10,
	query = "coffee"
) {
	const unsplashPhotos = await unsplashServerApi.search.getPhotos({
		query,
		perPage: limit,
		orientation: "landscape",
	});

	const unsplashPhotosUrls = unsplashPhotos.response.results.map((photo) => {
		return photo.urls.small;
	});

	const foursquareApiOptions = {
		method: "GET",

		headers: {
			Accept: "application/json",

			Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
		},
	};

	const foursquareApiResponse = await fetch(
		`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`,
		foursquareApiOptions
	);
	const coffeeStoresData = await foursquareApiResponse.json();
	return coffeeStoresData.results.map((result, index) => {
		return {
			...result,
			imgUrl: unsplashPhotosUrls[index],
		};
	});
}
