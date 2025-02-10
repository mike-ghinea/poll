import Poll from "./components/Poll/Poll";
import { LoadingBox } from "./components/LoadingBox/LoadingBox";
import { ErrorMessage, SIZE } from "./components/ErrorMessage/ErrorMessage";
import { useApp } from "./useApp";

const App = () => {
  const { isLoading, error, activePoll } = useApp();

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorMessage size={SIZE.TITLE} message={error} />;

  if (!activePoll) return <></>;

  return <Poll poll={activePoll} />;
};
export default App;
