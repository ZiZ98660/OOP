import React from "react";
import IssueProvider from "./ContextAPI";
import { Issues } from "./ts4";

const App = () => (
  <IssueProvider url="https://api.github.com/repos/ContentPI/ContentPI/issues">
    <Issues />
  </IssueProvider>
);
// declare var foo: any;
