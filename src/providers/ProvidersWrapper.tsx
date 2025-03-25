import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthProvider } from "../auth/providers/JWTProvider";
import {
  LayoutProvider,
  LoadersProvider,
  // // MenusProvider,
  // SettingsProvider,
  // SnackbarProvider,
  // TranslationProvider,
} from "../providers";

import { HelmetProvider } from "react-helmet-async";

export const queryClient = new QueryClient();

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <SnackbarProvider> */}
      <AuthProvider>
        {/* <SettingsProvider> */}
        {/* <TranslationProvider> */}
        <HelmetProvider>
          <LayoutProvider>
            <LoadersProvider>
              {/* <MenusProvider></MenusProvider> */}
              {children}
            </LoadersProvider>
          </LayoutProvider>
        </HelmetProvider>
        {/* </TranslationProvider> */}
        {/* </SettingsProvider> */}
      </AuthProvider>
      {/* // </SnackbarProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { ProvidersWrapper };
