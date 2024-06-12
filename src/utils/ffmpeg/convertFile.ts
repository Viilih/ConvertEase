import {
  IFileConvert,
  IFileConversionResult,
  IFileInfo,
} from "@/shared/interfaces";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export const convertFile = async (
  ffmpegRef: FFmpeg,
  fileToConvert: IFileConvert
): Promise<IFileConversionResult> => {
  try {
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
    let cmd = [];
    if (fileInfo.typeToConvert == "3gp") {
      cmd = [
        "-i",
        fileInfo.fileName,
        "-r",
        "20",
        "-s",
        "352x288",
        "-vb",
        "400k",
        "-acodec",
        "aac",
        "-strict",
        "experimental",
        "-ac",
        "1",
        "-ar",
        "8000",
        "-ab",
        "24k",
        fileNameConverted,
      ];
    } else if (fileInfo.typeToConvert == "webm") {
      cmd = [
        "-i",
        fileInfo.fileName,
        "-fflags",
        "+genpts",
        "-preset",
        "ultrafast",
        "-c:v",
        "libvpx",
        "-c:a",
        "libvorbis",
        "-crf",
        "23",
        "-threads",
        "0",
        fileNameConverted,
      ];
    } else {
      cmd = ["-i", fileInfo.fileName, fileNameConverted];
    }
    await ffmpeg.exec(cmd);
    const data = (await ffmpeg.readFile(fileNameConverted)) as any;
    const blob = new Blob([data], {
      type: `${fileInfo.file.type.split("/")[0]}/${fileInfo.typeToConvert}`,
    });
    const url = URL.createObjectURL(blob);
    return { url, fileNameConverted, size: blob.size, blob };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
