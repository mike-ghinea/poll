import React from "react";
import axios from "axios";

const App = () => {
  React.useEffect(() => {
    axios
      .get(`http://localhost:8080`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <> </>;
};
export default App;
