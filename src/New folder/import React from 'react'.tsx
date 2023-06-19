import React from "react";

interface State {
  name: string;
  age: number;
}

interface Action {
  type: "updateName" | "updateAge";
  payload: string | number;
}
interface ActionTypes {
  UpdateName: "UpdateName";
  UpdateAge: "UpdateAge";
}

const initialState: State = { name: "", age: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateName":
      return { ...state, name: action.payload as string };
    case "updateAge":
      return { ...state, age: action.payload as number };
    default:
      throw new Error();
  }
}

const Form: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "updateName", payload: event.target.value });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "updateAge", payload: Number(event.target.value) });
  };

  return (
    <>
      <input value={state.name} onChange={handleNameChange} />
      <input type="number" value={state.age} onChange={handleAgeChange} />
      <p>
        Hello, {state.name}. You are {state.age} years old.
      </p>
    </>
  );
};
