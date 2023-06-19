import React, { FC, useContext } from "react";
import { IssueContext, Issue } from "./ts1";
import { create } from "zustand";

export const Issues: FC = () => {
  const { issues, url } = useContext(IssueContext);
  return (
    <>
      <h1></h1>
      {issues.map((issue: Issue) => (
        <p key={`issue-${issue.number}`}>
          <strong>#{issue.number} </strong>{" "}
          <a href={`${url}/${issue.number}`}>{issue.title}</a> {issue.state}
        </p>
      ))}
    </>
  );
};

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
}

export const usePokemon = create<{
  pokemon: Pokemon[];
  allPokemon: Pokemon[];
  setAllPokemon: (pokemon: Pokemon[]) => void;
  search: string;
  setSearch: (search: string) => void;
}>((set) => ({
  pokemon: [],
  allPokemon: [],
  setAllPokemon: (pokemon) => set({ allPokemon: pokemon, pokemon }),
  search: "",
  setSearch: (search) => set({ search }),
}));

function SearchBox() {
  const search = usePokemon((state) => state.search);
}

fetch("/pokemon.json")
  .then((response) => response.json())
  .then((pokemon) => {
    usePokemon.getState().setAllPokemon(pokemon);
  });
