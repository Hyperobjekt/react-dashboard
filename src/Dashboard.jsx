import { QueryClient, QueryClientProvider } from "react-query";
import { useConfigStore, useConfigLoader, useOnConfigLoad } from "./Config";

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
  ...props
}) {
  const isReady = useConfigStore((state) => state.ready);
  const onConfigLoad = useOnConfigLoad(onLoad);
  useConfigLoader({ config, onLoad: onConfigLoad });

  return (
    <QueryClientProvider client={client} {...props}>
      {isReady ? children : loader}
    </QueryClientProvider>
  );
}

Dashboard.defaultProps = {
  client: new QueryClient(),
  loader: "loading",
};
