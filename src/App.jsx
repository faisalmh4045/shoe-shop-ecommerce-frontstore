import AuthListener from "@/components/AuthListener";
import { Provider } from "react-redux";
import store from "@/store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import AppContent from "@/components/AppContent";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthListener />
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
