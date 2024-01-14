import type { FC } from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Modals from "../../components/modals";
interface PropChildren {
  children: React.ReactNode;
}

const ProviderConf: FC<PropChildren> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <ConfigProvider>
              <Modals />
              {children}
            </ConfigProvider>
          </QueryClientProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default ProviderConf;
