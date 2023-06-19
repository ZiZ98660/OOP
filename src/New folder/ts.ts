import React, {
  useCallback,
  useState,
  FC,
  useEffect,
  ChangeEvent,
  useReducer,
  ReactElement,
  createContext,
} from "react";
import axios from "axios";
import { IssueContext, Issue } from "./ts1";

function isPalindrome(word: string): boolean {
  const lowerCaseWord = word.toLowerCase();
  const reverseWord = lowerCaseWord.split(" ").reverse().join(" ");

  return lowerCaseWord === reverseWord;
}

type User = {
  username: string;
  email: string;
  name: string;
  website: string;
  phone: number;
  active: boolean;
};

const user: User = {
  username: "Ziz",
  name: "Sadiq Abdulazeez",
  email: "",
  website: "",
  active: true,
  phone: 090,
};

// Extending a type
type TWork = {
  company: string;
  position: string;
};

type TPerson = TWork & {
  name: string;
};

// Extending an Interface

interface IWork {
  company: string;
  position: string;
}

type TPerson1 = IWork & {
  name: string;
  age: any;
  // getFullName : Function
};

("use strict");

const add = (x, y): number => x + y;

const log =
  (fn) =>
  (...args) => {
    return fn(...args);
  };

const logAdd = log(add(2, 4));

console.log(logAdd);

// useCallback
const [todoList, setTodoList] = useState([]);

type Todo = {
  id: number;
  task: string;
};

const handleDelete = (taskId: number) => {
  const newTodoList = todoList.filter((todo: Todo) => todo.id !== taskId);
  setTodoList(newTodoList);
};

interface Props {
  todoList: Todo[];
  handleDelete: any;
}

// const List : FC<Props> = ({todoList, handleDelete}) => {
//   useEffect(()=> {
//     console.log('rendering');
//   })

//   return (
//     todoList.map((todo : Todo) => (

//     ))
//   )
// }

// App.tsx
type Note = {
  id: number;
  note: string;
  // time: any
};

type Action = {
  type: string;
  payload?: any;
};

type ActionTypes = {
  ADD: "ADD";
  UPDATE: "UPDATE";
  DELETE: "DELETE";
  // REDO: 'REDO'
};

const actionType: ActionTypes = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

const initNotes: Note[] = [
  {
    id: 1,
    note: "Note 1",
  },
  {
    id: 2,
    note: "Note 2",
  },
];

const reducer = (state: Note[], action: Action) => {
  switch (action.type) {
    case actionType.ADD:
      return [...state, action.payload];

    case actionType.DELETE:
      return state.filter((note) => note.id !== action.payload);
    // return state.filter(note => note.id !== action.payload)

    //  if current note id matches potential payload id, then payload(id, note) replaces the current note
    // if not, current note is not changed
    case actionType.UPDATE:
      const updatedNote = action.payload;
      return state.map((n: Note) =>
        n.id === updatedNote.id ? updatedNote : n
      );

    default:
      return state;
  }
};

// const Notes = () => {
//   const [notes, dispatch] = useReducer(reducer, initNotes);
//   const [note, setNote] = useState(" ");

//   const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();

//     const newNote = {
//       id: Date.now(),
//       note,
//     };

//     dispatch({
//       type: actionType.ADD,
//       payload: newNote,
//     });
//   };
// };

const Notes = () => {
  const [notes, dispatch] = useReducer(reducer, initNotes);
  const [note, setNote] = useState(" ");

  // const [state, dispatch] =useReducer((state, action) => ({
  //   ...state,
  //   ...action
  // }),
  // {
  //   note:''
  // })

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      note,
    };

    dispatch({
      type: actionType.ADD,
      payload: newNote,
    });
  };
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((n: Note) => {
          <li key={n.id}>
            {n.note}
            <button
              onClick={() => {
                dispatch({
                  type: actionType.DELETE,
                  payload: n.id,
                });
              }}
            >
              {"DELETE"}
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: actionType.UPDATE,
                  payload: { ...n, note },
                });
              }}
            >
              {actionType.UPDATE}
            </button>
          </li>;
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={note}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNote(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

// ContextAPI
