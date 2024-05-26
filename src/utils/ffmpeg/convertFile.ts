import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
interface IFileConvert {
  fileContent: File[];
  id: string;
  to: string;
}

interface IFileInfo {
  file: File;
  fileName: string;
  fileType: string;
  fileSize: number;
  typeToConvert: string;
}

export const convertFile = async (
  ffmpegRef: FFmpeg,
  fileToConvert: IFileConvert
) => {
  const ffmpeg = ffmpegRef;
  const fileInfo: IFileInfo = {
    file: fileToConvert.fileContent[0],
    fileName: fileToConvert.fileContent[0].name,
    fileType: fileToConvert.fileContent[0].type,
    fileSize: fileToConvert.fileContent[0].size,
    typeToConvert: fileToConvert.to,
  };
  const fileNameWithoutFormat = fileInfo.fileName.split(".")[0];
  const fileNameConverted = `${fileNameWithoutFormat}.${fileInfo.typeToConvert}`;
  await ffmpeg.writeFile(fileInfo.fileName, await fetchFile(fileInfo.file));
  await ffmpeg.exec(["-i", fileInfo.fileName, fileNameConverted]);
  const data = (await ffmpeg.readFile(fileNameConverted)) as any;
  const blob = new Blob([data], {
    type: `${fileInfo.file.type.split("/")[0]}/${fileInfo.typeToConvert}`,
  });
  const url = URL.createObjectURL(blob);
  console.log(blob, fileNameConverted, fileNameWithoutFormat);
  return { url, fileNameConverted, size: blob.size, blob };
};
