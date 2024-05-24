"use client";
import React, { useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { v4 as uuidv4 } from "uuid";
import {
  RiFileUploadFill,
  RiAddCircleFill,
  RiDownloadFill,
} from "react-icons/ri";
import FileContainer from "./FileContainer";
import FileCard from "./FileCard";
import { Button } from "./ui/button";
import { useFileStore } from "@/providers/file-store-provider";
import { useDropzone } from "react-dropzone";
import { useToast } from "./ui/use-toast";
import { loadFfmpegService } from "@/utils/ffmpeg/loadFfmpeg";
import { convertFile } from "@/utils/ffmpeg/convertFile";
import { FileConvertingStatus } from "@/stores/fille-store";

const Dropzone = () => {
  const ffmpegRef = useRef<any>(null);
  const { toast } = useToast();
  const { addFile, removeFile, files, isHover, setIsHover, setFileStatus } =
    useFileStore((state) => state);
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
  const ConvertAll = async () => {
    files.map(async (file) => {
      setFileStatus(file.id, FileConvertingStatus.Converting);

      try {
        if (file.to === "") {
          toast({
            variant: "destructive",
            title: "At least one type of format should be selected",
          });
          return;
        }
        await convertFile(ffmpegRef.current, file);
        setFileStatus(file.id, FileConvertingStatus.Success);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong during the operation",
        });
        setFileStatus(file.id, FileConvertingStatus.Failed);
      }
    });
  };
  useEffect(() => {
    const handleFocus = () => {
      dropzoneRef.current?.focus();
    };

    if (files.length > 0) {
      handleFocus();
    }
  }, [files]);

  useEffect(() => {
    loadFfmpeg();
  }, []);
  const loadFfmpeg = async () => {
    const ffmpegResponse: FFmpeg = await loadFfmpegService();
    ffmpegRef.current = ffmpegResponse;
  };
  return (
    <section className="container flex flex-col gap-8">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} autoFocus />
        {files.length > 0 && <p>oie</p>}
        {files.length === 0 && (
          <FileContainer dropping={isHover}>
            {isHover ? (
              <span className="text-white text-xl">Right here</span>
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
                  fileContent={{
                    file: file.fileContent[0],
                    id: file.id,
                    to: file.to,
                    convertingStatus: file.converting,
                  }}
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
      <div className="flex justify-end">
        <Button
          variant="secondary"
          className="w-[150px]"
          onClick={() => {
            ConvertAll();
          }}
        >
          <RiDownloadFill />
          Convert now
        </Button>
      </div>
    </section>
  );
};
export default Dropzone;
