import React, { useState, useEffect, useCallback } from "react";

const withMessage = (WrappedComponent) => {
  return ({ messageBody }) => (
    <WrappedComponent message="Hello World!" {...messageBody} />
  );
};

const Hello = ({ message }) => <h1>{message}</h1>;

const HelloWithMessage = withMessage(Hello);

// export default useCustomHook

const useHOC = () => {
  return <HelloWithMessage messageBody={"Welcome to a new dawn!"} />;
};

console.log(useHOC());

// import React from 'react';

interface Props {
  children: (data: { message: string }) => React.ReactNode | any;
}

const ChildComponent: React.FC<Props> = ({ children }) => {
  return children({ message: "Hello from Child Component!" });
};

const ParentComponent = () => {
  return (
    <ChildComponent>{({ message }) => <div>{message}</div>}</ChildComponent>
  );
};

interface FACProps {
  children: (data: {
    greetings?: string;
    apiData?: any;
  }) => React.ReactNode | any;
  url?: string;
}

// type URL = {
//   setUrl: (url: string) => string
// }

const Name: React.FC<FACProps> = ({ children }) =>
  children({ greetings: "Hello world" });

const ParentNameComponent = () => (
  <Name>
    {({ greetings }) => <div>{greetings}, Welcome to a new dawn!</div>}
  </Name>
);

const Fetch: React.FC<FACProps> = ({ children, url }) => {
  // const [url, setUrl]  = useState('')
  const [data, setData] = useState([] as any[]);

  const fetchAPI = useCallback(async () => {
    await fetch(`${url}`)
      .then((response) => response.json())
      .then((dt) => {
        dt ? setData(dt) : "";
      });
  }, [url]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return children({
    apiData: () => data.map((people) => people.name),
  });
};

export const UseFetchAPI = () => (
  <Fetch url="https://swapi.dev/api/people/">
    {({ apiData }) => <li>{apiData()}</li>}
  </Fetch>
);

console.log(UseFetchAPI());
