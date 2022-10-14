import StoreProvider from "../context/storeContext.js";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<StoreProvider>
			<Component {...pageProps} />;
		</StoreProvider>
	);
}
export default MyApp;
