import { useCallback } from "react";
import { createStore } from "zustand/vanilla";
import { v4 as uuidv4 } from "uuid";
import { FileConvertingStatus, FilesState, FilesStore } from "./types";

const defaultFilesInitialState: FilesState = {
  files: [],
  isHover: false,
  convertedFiles: [],
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
      set((state) => ({
        files: state.files.filter((file) => file.id !== id),
        convertedFiles: state.convertedFiles.filter(
          (file) => file.fileId !== id
        ),
      }));
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
    pushConvertedFile: (data) => {
      set((state) => ({
        convertedFiles: [...state.convertedFiles, data],
      }));
    },
  }));
};