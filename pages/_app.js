import "../styles/globals.css";
import { StateProvider } from "../context/StateProvider";
import { initialState } from "../context/initialState";
import reducer from "../context/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
