import { Provider } from "react-redux";
import RootLayout from "./layout";
import "@/styles/global.scss";
import store from "../redux/store";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}
