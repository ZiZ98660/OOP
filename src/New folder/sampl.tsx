import React, { useState, useEffect, useCallback } from "react";
import { create } from "zustand";

const withMessage = (WrappedComponent) => {
  return ({ messsageBody }) => (
    <WrappedComponent message="Hello" {...messsageBody} />
  );
};

const Hello = ({ message }) => <h1>{message}</h1>;

const HelloWithMessage = withMessage(Hello);

const useHOC = () => <HelloWithMessage messsageBody={"Hello"} />;

interface Props {
  children: (data: { message: string }) => React.ReactNode | any;
}

const ChildComponent: React.FC<Props> = ({ children }) => {
  return children({ message: "Hello" });
};

const ParentComponent = () => { 
  return (
    <ChildComponent>{({ message }) => <div>{message}</div>}</ChildComponent>
  );
};

export const useProfile = create<{
  profile: {};
  setProfile: (profile: {}) => void;
  reloadUser: boolean;
  setReloadUser: (reloadUser: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}>((set) => ({
  profile: {},
  setProfile: (profile) => set({ profile }),
  reloadUser: false,
  setReloadUser: (reloadUser) => set({ reloadUser }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));

useProfile((store) => store.isLoggedIn);
useProfile.getState().setIsLoggedIn(false);
