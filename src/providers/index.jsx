import { Provider } from "react-redux";
import store from "../app/store";
import { BrowserRouter } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import BoundaryError from "../pages/BoundaryError";
import Authenticator from "./Authenticator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      gcTime: 2 * 3600 * 1000, // cache data for 2hours
    },
  },
});
export default function Providers({ children }) {
  return (
    <ErrorBoundary fallbackRender={BoundaryError}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Authenticator>
            <BrowserRouter>{children}</BrowserRouter>
          </Authenticator>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
