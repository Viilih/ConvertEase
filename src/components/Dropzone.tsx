"use client";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { RiFileUploadFill, RiAddCircleFill } from "react-icons/ri";
import FileContainer from "./FileContainer";
import FileCard from "./FileCard";
import { Button } from "./ui/button";
import { useFileStore } from "@/providers/file-store-provider";
import { useDropzone } from "react-dropzone";
import { useToast } from "./ui/use-toast";

const Dropzone = () => {
  const { toast } = useToast();
  const { addFile, removeFile, files, isHover, setIsHover } = useFileStore(
    (state) => state
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "audio/*": [],
      "video/*": [],
    },
    onDrop: addFile,
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

  const dropzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      dropzoneRef.current?.focus();
    };

    if (files.length > 0) {
      handleFocus();
    }
  }, [files]);
  return (
    <section className="container flex flex-col gap-8">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} autoFocus />
        {files.length > 0 && <p>oie</p>}
        {files.length === 0 && (
          <FileContainer dropping={isHover}>
            {isHover ? (
              <span className="text-white text-xl">Right here </span>
            ) : (
              <>
                <div className="text-6xl text-white">
                  <RiFileUploadFill />
                </div>
                <span className="text-white text-xl">
                  Drag 'n' drop some files here, or click to select files
                </span>
              </>
            )}
          </FileContainer>
        )}
      </div>
      <section
        ref={dropzoneRef}
        tabIndex={0}
        className="space-y-5 focus:outline-none focus:border-none focus:ring-offset-0"
      >
        <ul className="flex flex-col gap-4">
          {files?.map((file) => {
            return (
              <li key={uuidv4()}>
                <FileCard
                  fileContent={{ file: file.fileContent[0], id: file.id }}
                  removeFile={removeFile}
                />
              </li>
            );
          })}
        </ul>
        {files.length > 0 && (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button
              className="w-full p-3 flex items-center justify-center gap-2 text-xl h-14 "
              size="icon"
            >
              <RiAddCircleFill />
              <span>Add more files</span>
            </Button>
          </div>
        )}
      </section>
    </section>
  );
};
export default Dropzone;
