import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Card.module.css";

export default function Card(props) {
	return (
		<Link href={props.href}>
			<a className={styles.cardLink}>
				<div className={`glass ${styles.container}`}>
					<h2 className={styles.cardHeader}>{props.name}</h2>
					<Image
						className={styles.cardImage}
						src={props.imgUrl}
						width={260}
						height={260}
					/>
				</div>
			</a>
		</Link>
	);
}
