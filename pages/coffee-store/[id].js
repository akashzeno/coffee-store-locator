import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/CoffeeStore.module.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storeContext.js";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher.js";
export default function CoffeeStore() {
	const findCoffeeStoreById = (coffeeStores, id) =>
		coffeeStores.find((coffeeStore) => coffeeStore.fsq_id === id);

	const router = useRouter();

	const {
		state: { coffeeStores, demoCoffeeStores },
	} = useContext(StoreContext);

	const id = router.query.id;

	const [rating, setRating] = useState(0);

	const [coffeeStore, setCoffeeStore] = useState(
		findCoffeeStoreById(demoCoffeeStores, id) ||
			findCoffeeStoreById(coffeeStores, id)
	);

	const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

	const handleCreateCoffeeStore = async (coffeeStore) => {
		try {
			const { name, location, imgUrl } = coffeeStore;
			const response = await fetch("/api/createCoffeeStore", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					name,
					address: location.address || "",
					neighborhood: location.neighborhood || "",
					rating: 0,
					img_url: imgUrl,
				}),
			});
			// const dbCoffeeStore = response.json();
		} catch (error) {
			console.error("Error creating coffee store", error);
		}
	};

	const upVote = async () => {
		try {
			const response = await fetch("/api/upvoteCoffeeStoreById", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
				}),
			});
			setRating(rating + 1);
		} catch (error) {
			console.error("Error upvoting coffee store", error);
		}
	};

	useEffect(() => {
		if (coffeeStore) {
			handleCreateCoffeeStore(coffeeStore);
		}
	}, [id]);

	useEffect(() => {
		if (data && data.length > 0) {
			const { name, address, neighborhood, rating, img_url } = data[0];

			setCoffeeStore({
				id,
				name,
				location: { address, neighborhood },
				imgUrl: img_url,
			});
			setRating(rating);
		}
	}, [data]);

	const { name, imgUrl, location } = coffeeStore || {};

	if (error) {
		return <div>Something went wrong retrieving coffee store page</div>;
	}

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<Link href="/">
						<a className={styles.backToHomeLink}>
							<span className={styles.backToHomeLinkIcon}>➜</span> Back To Home
						</a>
					</Link>
					<h1 className={styles.name}>{name}</h1>
					<Image
						src={
							imgUrl ||
							"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
						}
						alt={name}
						width={600}
						height={360}
						className={styles.storeImg}
						layout="responsive"
					/>
				</div>
				<div className={`glass ${styles.col2}`}>
					<div className={styles.addressImgWrapper}>
						<Image src={"/static/icons/map-2.svg"} width={30} height={30} />
					</div>
					<p className={styles.address}>{location?.address}</p>
					{location?.neighborhood && (
						<p className={styles.neighborhood}>{location.neighborhood}</p>
					)}
					<div className={styles.starImgWrapper}>
						<Image src={"/static/icons/star.svg"} width={30} height={30} />
					</div>
					<p className={styles.votes}>{rating}</p>
					<button className={styles.upVoteBtn} onClick={upVote}>
						Up Vote!
					</button>
				</div>
			</div>
		</div>
	);
}
