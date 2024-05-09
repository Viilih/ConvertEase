import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { createStore } from "zustand/vanilla";
import { v4 as uuidv4 } from "uuid";

export type FilesState = {
  files: {
    fileContent: File[];
    id: string;
  }[];
  isHover: boolean;
};

export type FilesActions = {
  addFile: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles: FileRejection[]
  ) => void;
  removeFile: (id: string) => void;
  setIsHover: (isHover: boolean) => void;
};

export type FilesStore = FilesState & FilesActions;

export const defaultFilesInitialState: FilesState = {
  files: [],
  isHover: false,
};

export const createFilesStore = (
  initialState: FilesState = defaultFilesInitialState
) => {
  return createStore<FilesStore>()((set) => ({
    ...initialState,
    addFile: (acceptedFiles, _) => {
      if (acceptedFiles?.length > 0) {
        set((state) => ({
          files: [
            ...state.files,
            { fileContent: [...acceptedFiles], id: uuidv4() },
          ],
        }));
      }
    },
    removeFile: (id) => {
      set((state) => ({ files: state.files.filter((file) => file.id !== id) }));
    },
    setIsHover: (isHover) => {
      set({ isHover });
    },
  }));
};
