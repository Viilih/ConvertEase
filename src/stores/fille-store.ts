import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { createStore } from "zustand/vanilla";
import { v4 as uuidv4 } from "uuid";

export enum FileConvertingStatus {
  Blank = 1,
  Converting = 2,
  Success = 3,
  Failed = 4,
}
export type FilesState = {
  files: {
    fileContent: File[];
    id: string;
    to: string;
    converting: FileConvertingStatus;
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
  setFileStatus: (id: string, status: FileConvertingStatus) => void;
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
            {
              fileContent: [...acceptedFiles],
              id: uuidv4(),
              to: "",
              converting: FileConvertingStatus.Blank,
            },
          ],
        }));
      }
    }, []),
    removeFile: (id) => {
      set((state) => ({ files: state.files.filter((file) => file.id !== id) }));
    },
    setFileStatus: (id, status) =>
      set((state) => ({
        files: state.files.map((file) =>
          file.id === id ? { ...file, converting: status } : file
        ),
      })),
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
