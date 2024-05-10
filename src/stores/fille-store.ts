import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { createStore } from "zustand/vanilla";
import { v4 as uuidv4 } from "uuid";

export type FilesState = {
  files: {
    fileContent: File[];
    id: string;
    to: string;
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
  setFormatToConvertFile: (type: string, id: string) => void;
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
    addFile: useCallback((acceptedFiles, _) => {
      if (acceptedFiles?.length > 0) {
        set((state) => ({
          files: [
            ...state.files,
            { fileContent: [...acceptedFiles], id: uuidv4(), to: "" },
          ],
        }));
      }
    }, []),
    removeFile: (id) => {
      set((state) => ({ files: state.files.filter((file) => file.id !== id) }));
    },
    setIsHover: (isHover) => {
      set({ isHover });
    },
    setFormatToConvertFile: (type, id) => {
      set((state) => ({
        files: state.files.map((file) =>
          file.id === id ? { ...file, to: type } : file
        ),
      }));
    },
  }));
};
