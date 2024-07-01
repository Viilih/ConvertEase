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
    addFile: (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        const newFiles = acceptedFiles.map((file) => ({
          fileContent: [file],
          id: uuidv4(),
          to: "",
          converting: FileConvertingStatus.Blank,
        }));

        set((state) => ({
          files: [...state.files, ...newFiles],
          isHover: false,
        }));
      }
    },
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
