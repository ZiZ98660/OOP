import React from "react";
// Providers
import IssueProvider from "./ts1";

// Components
import { Issues } from "./ts4";

const App = () => {
  return (
    <IssueProvider url="http://github.com">
      <Issues />
    </IssueProvider>
  );
};

export default App;
