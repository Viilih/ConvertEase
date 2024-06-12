import { FileConvertingStatus } from "@/stores/file/types";

export interface IFileConvert {
  fileContent: File[];
  id: string;
  to: string;
}

export interface IFileInfo {
  file: File;
  fileName: string;
  fileType: string;
  fileSize: number;
  typeToConvert: string;
}

export interface IFileConversionResult {
  url: string;
  fileNameConverted: string;
  size: number;
  blob: Blob;
}

export interface IFileCard {
  fileContent: {
    file: File;
    id: string;
    to: string;
    convertingStatus: FileConvertingStatus;
  };
  removeFile: (id: string) => void;
}
