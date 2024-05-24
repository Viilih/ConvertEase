"use client";
import {
  RiFileVideoFill,
  RiFileImageFill,
  RiFileMusicFill,
  RiCloseFill,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CircleLoader from "react-spinners/ClipLoader";
import { Button } from "./ui/button";
import { useFileStore } from "@/providers/file-store-provider";
import { FileConvertingStatus } from "@/stores/fille-store";
import { CSSProperties } from "react";
interface IFileCard {
  fileContent: {
    file: File;
    id: string;
    to: string;
    convertingStatus: FileConvertingStatus;
  };
  removeFile: (id: string) => void;
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
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
  const { file, id, to, convertingStatus } = fileContent;
  console.log(file);
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
  const getDefaulTab = () => {
    if (file.type.includes("image")) return "images";
    if (file.type.includes("audio")) return "audio";
    if (file.type.includes("video")) return "video";
  };

  //   if (file.type.includes("image")) {
  //     {
  //       extensions.image?.map((type) => (
  //         <Button
  //           className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
  //           key={Math.random()}
  //         >
  //           {type}
  //         </Button>
  //       ));
  //     }
  //   }
  //   if (file.type.includes("video")) {
  //     {
  //       extensions.video?.map((type) => (
  //         <Button
  //           className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
  //           key={Math.random()}
  //         >
  //           {type}
  //         </Button>
  //       ));
  //     }
  //   }
  //   if (file.type.includes("audio")) {
  //     {
  //       extensions.audio?.map((type) => (
  //         <Button
  //           className="p-1 bg-slate-300 text-black rounded flex items-center justify-center hover:bg-slate-700 hover:text-white"
  //           key={Math.random()}
  //         >
  //           {type}
  //         </Button>
  //       ));
  //     }
  //   }
  // };

  // useEffect(() => {
  //   listExtensions();
  // }, []);
  return (
    <div className="w-full rounded-2xl border border-slate-600  px-10 py-5  text-white flex justify-between">
      <div className="flex items-center gap-5">
        <div className="text-4xl">{getIconFromFileType(file.type)}</div>
        <span>{file.name}</span>
      </div>
      <div className="flex items-center gap-5">
        <span>Convert to</span>
        <Select
          value={to}
          onValueChange={(value) => {
            setFormatToConvertFile(value, id);
          }}
        >
          <SelectTrigger className="w-[180px] text-slate-50 bg-slate-600 bg-opacity-25 border border-slate-600 border-opacity-25 focus:ring-offset-0">
            <SelectValue placeholder="Select a format" />
          </SelectTrigger>
          <SelectContent className="focus:ring-offset-0  bg-slate-900 p-1">
            <Tabs defaultValue={getDefaulTab()} className="h-auto">
              <TabsList className="bg-transparent  border-white space-x-4 text-white active:text-black">
                <TabsTrigger
                  value="images"
                  disabled={
                    file.type.includes("video") || file.type.includes("audio")
                  }
                >
                  Images
                </TabsTrigger>

                <TabsTrigger
                  value="video"
                  disabled={
                    file.type.includes("image") || file.type.includes("audio")
                  }
                >
                  Video
                </TabsTrigger>
                <TabsTrigger
                  value="audio"
                  disabled={file.type.includes("image")}
                >
                  Audio
                </TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="grid grid-cols-4 gap-3">
                {extensions.video.map((type) => (
                  <SelectItem
                    value={type}
                    key={Math.random()}
                    className="bg-transparent border-2 border-slate-50 text-white flex items-center justify-center px-3 cursor-pointer gap-2 hover:bg-slate-50 hover:text-black"
                  >
                    {type}
                  </SelectItem>
                ))}
              </TabsContent>
              <TabsContent value="audio" className="grid grid-cols-3 gap-4">
                {extensions.audio.map((type) => (
                  <SelectItem
                    value={type}
                    className="bg-transparent border-2 border-slate-50 text-white flex items-center justify-center px-3 cursor-pointer gap-2 hover:bg-slate-50 hover:text-black"
                    key={Math.random()}
                  >
                    {type}
                  </SelectItem>
                ))}
              </TabsContent>
              <TabsContent value="images" className="grid grid-cols-3 gap-4">
                {extensions.image.map((type) => (
                  <SelectItem
                    value={type}
                    key={Math.random()}
                    className="bg-transparent border-2 border-slate-50 text-white flex items-center justify-center px-3 cursor-pointer gap-2 hover:bg-slate-50 hover:text-black"
                  >
                    {type}
                  </SelectItem>
                ))}
              </TabsContent>
            </Tabs>
          </SelectContent>
        </Select>
        <div className="text-3xl">
          {convertingStatus === 2 ? (
            <CircleLoader
              color={"white"}
              loading={convertingStatus === 2}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <div className="flex gap-4 items-center justify-center">
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
              {convertingStatus === 3 && (
                <RiCheckboxCircleLine className="text-green-600" />
              )}
              {convertingStatus === 4 && (
                <RiCloseCircleLine className="text-red-600" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileCard;
