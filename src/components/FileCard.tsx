"use client";
import {
  RiFileVideoFill,
  RiFileImageFill,
  RiFileMusicFill,
  RiCloseFill,
} from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useFileStore } from "@/providers/file-store-provider";
interface IFileCard {
  fileContent: {
    file: File;
    id: string;
  };
  removeFile: (id: string) => void;
}

const extensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};
const FileCard = ({ fileContent, removeFile }: IFileCard) => {
  const { file, id } = fileContent;
  const { setFormatToConvertFile } = useFileStore((state) => state);
  const getIconFromFileType = (fileType: string) => {
    switch (true) {
      case fileType.includes("image"):
        return <RiFileImageFill className="text-blue-400" />;
      case fileType.includes("audio"):
        return <RiFileMusicFill className="text-green-400" />;
      case fileType.includes("video"):
        return <RiFileVideoFill className="text-red-400" />;
      default:
        break;
    }
  };
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const listExtensions = () => {
    if (file.type.includes("image")) {
      {
        extensions.image?.map((type) => (
          <Button
            className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
            key={Math.random()}
          >
            {type}
          </Button>
        ));
      }
    }
    if (file.type.includes("video")) {
      {
        extensions.video?.map((type) => (
          <Button
            className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
            key={Math.random()}
          >
            {type}
          </Button>
        ));
      }
    }
    if (file.type.includes("audio")) {
      {
        extensions.audio?.map((type) => (
          <Button
            className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
            key={Math.random()}
          >
            {type}
          </Button>
        ));
      }
    }
  };

  useEffect(() => {
    listExtensions();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-slate-600  px-10 py-5  text-white flex justify-between">
      <div className="flex items-center gap-5">
        <div className="text-4xl">{getIconFromFileType(file.type)}</div>
        <span>{file.name}</span>
      </div>
      <div className="flex items-center gap-5">
        <span>Convert to</span>
        <Select>
          <SelectTrigger className="w-[180px] text-slate-50 bg-slate-600 bg-opacity-25 border border-slate-600 border-opacity-25 focus:ring-offset-0">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="focus:ring-offset-0  bg-slate-900 p-1">
            <Tabs defaultValue="images" className="w-[300px]">
              <TabsList className="">
                {file.type.includes("image") && (
                  <TabsTrigger value="images">Images</TabsTrigger>
                )}
                {file.type.includes("video") && (
                  <>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                  </>
                )}
                {file.type.includes("audio") && (
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="video" className="">
                <div className="grid grid-cols-4 gap-4">
                  {extensions.video.map((type) => (
                    <Button
                      className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
                      key={Math.random()}
                      onClick={() => setFormatToConvertFile(type, id)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="audio" className="">
                <div className="grid grid-cols-3 gap-4">
                  {extensions.audio.map((type) => (
                    <Button
                      className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
                      key={Math.random()}
                      onClick={() => setFormatToConvertFile(type, id)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="images">
                <div className="grid grid-cols-3 gap-4">
                  {extensions.image.map((type) => (
                    <Button
                      className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
                      key={Math.random()}
                      onClick={() => setFormatToConvertFile(type, id)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <SelectGroup>
              {/* {typeOptions?.map((type) => (
                <SelectItem value={type} key={Math.random()}>
                  {type}
                </SelectItem>
              ))} */}
              {/* <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="text-3xl">
          <Button
            variant="default"
            size="icon"
            className=" hover:bg-slate-500  text-slate-50 bg-slate-600 bg-opacity-25 border border-slate-600 border-opacity-25"
            onClick={() => {
              removeFile(id);
            }}
          >
            <RiCloseFill />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
