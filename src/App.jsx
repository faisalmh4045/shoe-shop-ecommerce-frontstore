import { RouterProvider } from "react-router";
import router from "./routes";
import AuthListener from "./components/AuthListener";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AuthListener />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
