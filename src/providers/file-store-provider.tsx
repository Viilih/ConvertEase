"use client";

import { createFilesStore } from "@/stores/file/fille-store";
import { FilesStore } from "@/stores/file/types";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

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
