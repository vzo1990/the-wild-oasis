import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedComponent from "./ui/ProtectedComponent";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyles />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                  style: {
                    backgroundColor: "var(--color-green-100)",
                    color: "var(--color-grey-700)",
                  },
                },
                error: {
                  duration: 10000,
                  style: {
                    backgroundColor: "var(--color-red-100)",
                    color: "var(--color-grey-700)",
                  },
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                },
              }}
            />
            <ReactQueryDevtools initialIsOpen={false} />

            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedComponent>
                      <AppLayout />
                    </ProtectedComponent>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="account" element={<Account />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="bookings/:id" element={<Booking />} />
                  <Route path="checkin/:id" element={<Checkin />} />
                  <Route path="cabins" element={<Cabins />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="users" element={<Users />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </DarkModeProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
