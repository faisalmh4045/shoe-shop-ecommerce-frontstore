import { RouterProvider } from "react-router";
import router from "./routes";
import AuthListener from "./components/AuthListener";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthListener />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
