import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/CoffeeStore.module.css";
import Image from "next/image";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext.js";

export default function CoffeeStore() {
	const findCoffeeStoreById = (coffeeStores, id) =>
		coffeeStores.find((coffeeStore) => coffeeStore.fsq_id === id);

	const router = useRouter();

	const {
		state: { coffeeStores, demoCoffeeStores },
	} = useContext(StoreContext);

	const id = router.query.id;

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { location, name, imgUrl } =
		findCoffeeStoreById(demoCoffeeStores, id) ||
		findCoffeeStoreById(coffeeStores, id) ||
		{};

	const upVote = () => {
		console.log("Up Vote Done");
	};

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
					{location.neighborhood.length > 0 && (
						<p className={styles.neighborhood}>{location?.neighborhood}</p>
					)}
					<div className={styles.starImgWrapper}>
						<Image src={"/static/icons/star.svg"} width={30} height={30} />
					</div>
					<p className={styles.votes}>1</p>
					<button className={styles.upVoteBtn} onClick={upVote}>
						Up Vote!
					</button>
				</div>
			</div>
		</div>
	);
}
