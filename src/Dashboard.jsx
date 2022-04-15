import PropTypes from "prop-types";
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
  const onConfigLoad = useOnConfigLoad(); // default loader
  useConfigLoader({ config, onLoad: onLoad || onConfigLoad });

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

Dashboard.propTypes = {
  /**
   * The query client for react-query.
   */
  client: PropTypes.any,
  /**
   * Configuration for the dashboard
   */
  config: PropTypes.object.isRequired,
  /**
   * The loader to display while the configuration is loading.
   */
  loader: PropTypes.any,
  /**
   * A callback function to be called when the configuration is loaded.
   */
  onLoad: PropTypes.func,
};
