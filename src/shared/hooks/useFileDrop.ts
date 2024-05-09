import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

import { useState, useCallback, useRef } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface IFilesContent {
  fileContent: File[];
  id: string;
}

export const useFileDrop = () => {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState(false);
  const [files, setFiles] = useState<IFilesContent[]>([]);
  const fileCardRef = useRef<HTMLDivElement>(null);
  const onDropFiles = useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length > 0) {
        setFiles((previousFiles) => [
          ...previousFiles,
          { fileContent: acceptedFiles, id: uuidv4() },
        ]);
        setIsHover(false);
      }
    },
    []
  );

  const removeFiles = (id: string) => {
    setFiles((files) => files.filter((file) => file.id !== id));
  };

  const handleDropFilesEvents = useDropzone({
    accept: {
      "image/*": [],
      "audio/*": [],
      "video/*": [],
    },
    onDrop: onDropFiles,
    onDropRejected: () => {
      setIsHover(false);
      toast({
        variant: "destructive",
        title: "File Type not supported",
        description:
          "The type of the file you added is not supported, please try another type",
      });
    },
    onDragEnter: () => {
      setIsHover(true);
    },
    onDragLeave: () => {
      setIsHover(false);
    },
    onFileDialogCancel() {},
  });

  return { isHover, files, handleDropFilesEvents, removeFiles };
};
