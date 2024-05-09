"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type FilesStore, createFilesStore } from "@/stores/fille-store";

export const FilesStoreContext = createContext<StoreApi<FilesStore> | null>(
  null
);

export interface IFilesStore {
  children: ReactNode;
}

export const FilesStoreProvider = ({ children }: IFilesStore) => {
  const storeRef = useRef<StoreApi<FilesStore>>();
  if (!storeRef.current) {
    storeRef.current = createFilesStore();
  }

  return (
    <FilesStoreContext.Provider value={storeRef.current}>
      {children}
    </FilesStoreContext.Provider>
  );
};

export const useFileStore = <T,>(selector: (store: FilesStore) => T): T => {
  const filesStoreContext = useContext(FilesStoreContext);
  if (!filesStoreContext) {
    throw new Error(`useFileStore must be use within FilesStoreProvider`);
  }
  return useStore(filesStoreContext, selector);
};
