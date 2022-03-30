import { QueryClient, QueryClientProvider } from "react-query";
import QueryParamRouter from "./Router/QueryParamRouter";
import useConfigLoader from "./Config/hooks/useConfigLoader";
import { useConfigStore } from "./Config";

/**
 * Dashboard wrapper component that handles setting up the query provider
 * as well as loading the configuration and setting the initial state for the
 * dashboard.
 */
export default function Dashboard({
  client,
  config,
  loader,
  onLoad,
  children,
  enableRouter,
  ...props
}) {
  const isReady = useConfigStore((state) => state.ready);
  useConfigLoader({ config, enableRouter, onLoad });

  return (
    <QueryClientProvider client={client} {...props}>
      {isReady ? (
        <>
          {/*
              We only want to connect the router once 
              the config + route selections have loaded
           */}
          {enableRouter && <QueryParamRouter />}
          {children}
        </>
      ) : (
        loader
      )}
    </QueryClientProvider>
  );
}

Dashboard.defaultProps = {
  client: new QueryClient(),
  loader: "loading",
};
