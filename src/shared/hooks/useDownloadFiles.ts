import { IFileConverted } from "@/stores/file/types";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useFileStore } from "@/providers/file-store-provider";

interface IDownloadSingleFile {
  id: string;
  url?: string;
  filename?: string;
  extension?: string;
}

export const useDownloadFile = () => {
  const { convertedFiles } = useFileStore((state) => state);
  const downloadAllFiles = (convertedFiles: IFileConverted[]): void => {
    const zip = new JSZip();
    convertedFiles.forEach((file) => {
      zip.file(file.name, file.blob, {
        binary: true,
      });
    });
    zip
      .generateAsync({ type: "blob" })
      .then((data) => saveAs(data, "converted-files.zip"));
  };
  const downloadSingleFile = ({
    id,
    url,
    filename,
    extension,
  }: IDownloadSingleFile): void => {
    convertedFiles.forEach((file) => {
      if (file.fileId === id) {
        const link = document.createElement("a");
        link.href = file.url;
        link.download = `${file.name}`;
        link.click();
      }
    });
  };

  return { downloadAllFiles, downloadSingleFile };
};
