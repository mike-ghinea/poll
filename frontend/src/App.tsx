import { useEffect, useState } from "react";
import Poll from "./components/Poll/Poll";
import { getActivePoll } from "./requests/poll";
import { Poll as PollInterface } from "./requests/utils";
import { LoadingBox } from "./components/LoadingBox/LoadingBox";
import { ErrorMessage, SIZE } from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [activePoll, setActivePoll] = useState<PollInterface>();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    getActivePoll()
      .then((res) => setActivePoll(res.data))
      .catch((e: { status: number }) => {
        if (e.status === 404)
          setError(
            "There are no active polls at the moment. Please check in later.",
          );
        else
          setError(
            "We are not able to get the active poll at the moment. Please try again later.",
          );
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingBox />;

  if (error) return <ErrorMessage size={SIZE.TITLE} message={error} />;

  if (!activePoll) return <></>;

  return <Poll poll={activePoll} />;
};
export default App;
