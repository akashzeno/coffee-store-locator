import Head from "next/head";
import { fetchCoffeeStores } from "../lib/fetchCoffeeStores";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner.js";
import Card from "../components/Card.js";
import getUserLocation from "../hooks/getUserLocation.js";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../context/storeContext.js";
import isEmpty from "../utils/isEmpty.js";

export async function getStaticProps() {
	const demoCoffeeStores = await fetchCoffeeStores();

	return {
		props: { demoCoffeeStores },
	};
}

export default function Home({ demoCoffeeStores }) {
	const {
		dispatch,
		state: { latLong, coffeeStores },
	} = useContext(StoreContext);

	const { handleUserLocation, locationErrorMsg, isFindingLocation } =
		getUserLocation();

	const [coffeeStoresError, setCoffeeStoresError] = useState(null);

	useEffect(() => {
		dispatch({
			type: ACTION_TYPES.SET_DEMO_COFFEE_STORES,
			payload: demoCoffeeStores,
		});
	}, []);

	useEffect(() => {
		(async () => {
			if (latLong) {
				try {
					const NewCoffeeStores = await fetchCoffeeStores(latLong, 30);
					dispatch({
						type: ACTION_TYPES.SET_COFFEE_STORES,
						payload: NewCoffeeStores,
					});
				} catch (error) {
					// Set Error
					setCoffeeStoresError(error.message);
				}
			}
		})();
	}, [latLong]);

	function bannerBtnClick() {
		handleUserLocation();
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Astral Cafe</title>
				<meta
					name="description"
					content="helps you to find coffee stores near you"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText={isFindingLocation ? "Loading..." : "Look Stores Nearby!"}
					function={bannerBtnClick}
				/>
				{locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
				{coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
			</main>
			{isEmpty(coffeeStores) ? (
				<>
					<div className={styles.cardLayout}>
						{demoCoffeeStores.map((coffeeStore) => {
							return (
								<Card
									key={coffeeStore.fsq_id}
									name={coffeeStore.name}
									imgUrl={
										coffeeStore.imgUrl ||
										"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
									}
									href={`/coffee-store/${coffeeStore.fsq_id}`}
								/>
							);
						})}
					</div>
				</>
			) : (
				<>
					<h2 className={styles.heading2}>Stores Near Me</h2>
					<div className={styles.cardLayout}>
						{coffeeStores.map((coffeeStore) => {
							return (
								<Card
									key={coffeeStore.fsq_id}
									name={coffeeStore.name}
									imgUrl={
										coffeeStore.imgUrl ||
										"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
									}
									href={`/coffee-store/${coffeeStore.fsq_id}`}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
