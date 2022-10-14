import styles from "../styles/Banner.module.css";

export default function Banner(props) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<span className={styles.astralText}>Astral</span>{" "}
				<span className={styles.cafeText}>Cafe</span>
			</h1>
			<p className={styles.subTitle}>The North Star &#128948; Of Cafes</p>
			<button className={styles.button} onClick={props.function}>
				{props.buttonText}
			</button>
		</div>
	);
}
