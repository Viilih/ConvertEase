import { FileRejection } from "react-dropzone";

export enum FileConvertingStatus {
  Blank = 1,
  Converting = 2,
  Success = 3,
  Failed = 4,
}

export type IFileConverted = {
  fileId: string;
  url: string;
  size: number;
  name: string;
  blob: Blob;
};

export type FilesState = {
  files: {
    fileContent: File[];
    id: string;
    to: string;
    converting: FileConvertingStatus;
  }[];
  isHover: boolean;
  convertedFiles: IFileConverted[];
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
  pushConvertedFile: (data: IFileConverted) => void;
};

export type FilesStore = FilesState & FilesActions;
