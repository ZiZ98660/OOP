import React, {
  FC,
  createContext,
  useState,
  useEffect,
  ReactElement,
  useCallback,
} from "react";
import axios from "axios";
// import { Issue } from './ts1';

export type T_Issue = {
  number: number;
  title: string;
  url: string;
  state: string;
};

interface IIssueContext {
  issues: T_Issue[];
  url: string;
}

interface IProps {
  children: React.ReactNode;
  url: string;
}

export const IssueContext = createContext<IIssueContext>({
  issues: [],
  url: "",
});

const IssueProvider: FC<IProps> = ({ children, url }) => {
  const [issues, setIssues] = useState([] as T_Issue[]);

  const fetchIssues = useCallback(async () => {
    const response = await axios(url);

    response ? setIssues(response.data) : "";
  }, [url]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const context: IIssueContext = {
    issues,
    url,
  };

  return (
    <IssueContext.Provider value={context}>{children}</IssueContext.Provider>
  );
};

export default IssueProvider;
