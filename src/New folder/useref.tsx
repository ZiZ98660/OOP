import React, { useRef, useEffect, useState } from "react";

const useRefSample = () => {
  // interface IRef {
  //     current:
  // }
  // interface Name {

  // }

  const inputRef = useRef<HTMLInputElement>(null);

  const [names, setNames] = useState([] as string[]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onAddName = () => {
    if (inputRef.current) {
      setNames([...names, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div>
        {names.map((n) => (
          <div key={n}>{n}</div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}></button>
    </div>
  );
};
