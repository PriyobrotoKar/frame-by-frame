'use client';

import { createContext, useContext, useRef, useState } from 'react';
import type { AxiosPromise } from 'axios';
import axios from 'axios';
import {
  completeMultipartUpload,
  getMultipartSignedUrls,
  GetMultipartSignedUrlsResponse,
  initializeMultiPartUpload,
} from '@/features/storage/actions/multipart';

interface MultipartUploadProps {
  file: File | null;
  key: string;
  callback?: () => void;
}

interface MultipartUploadContextProps {
  progress: number;
  isUploading: boolean;
  isSuccess: boolean;
  cancelUpload: () => void;
  isCancelled: boolean;
  uploadFile: (props: MultipartUploadProps) => {
    cancelUpload: () => void;
  };
}

const MultipartUploadContext =
  createContext<MultipartUploadContextProps | null>(null);

function MultipartUploadProvider({ children }: { children: React.ReactNode }) {
  const abortControllerRefs = useRef<AbortController[]>([]);
  const uploadIdRef = useRef<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  function uploadFile({ file, key }: MultipartUploadProps): {
    cancelUpload: () => void;
  } {
    const partUploadProgress: Record<number, number> = {};
    setIsUploading(true);

    const updateCombinedProgress = (
      partNumber: number,
      loaded: number,
    ): void => {
      if (!file) return;

      partUploadProgress[partNumber] = loaded;
      const totalProgress = Object.values(partUploadProgress).reduce(
        (acc, curr) => acc + curr,
        0,
      );

      setProgress(Math.floor((totalProgress / file.size) * 100));
    };

    const uploadPart = (
      chunk: Blob,
      signedUrl: GetMultipartSignedUrlsResponse,
    ): AxiosPromise => {
      const controller = new AbortController();
      abortControllerRefs.current.push(controller);

      console.log(
        'uploading chunk size:',
        chunk.size,
        'for part:',
        signedUrl.partNumber,
      );

      return axios.put(signedUrl.url, chunk, {
        headers: {
          'Content-Type': file?.type,
        },
        signal: controller.signal,
        onUploadProgress(progressEvent) {
          updateCombinedProgress(signedUrl.partNumber, progressEvent.loaded);
        },
      });
    };

    const uploadFile = async (): Promise<void> => {
      if (!file) return;

      try {
        const data = await initializeMultiPartUpload({
          contentType: file.type,
          key,
        });

        const { UploadId, Key } = data;
        uploadIdRef.current = UploadId;

        const chunkSize = 10 * 1024 * 1024; // 10MB
        const chunks: Blob[] = [];

        // Create chunks
        for (let i = 0; i < file.size; i += chunkSize) {
          const chunk = file.slice(i, i + chunkSize);
          chunks.push(chunk);
          console.log(`Chunk ${chunks.length}: size ${chunk.size}`);
        }

        console.log(
          `File size: ${file.size}, Number of chunks: ${chunks.length}`,
        );

        const signedUrls = await getMultipartSignedUrls({
          fileKey: Key,
          uploadId: UploadId,
          parts: chunks.length,
        });

        // Upload all parts
        const uploadPromises = chunks.map((chunk, index) => {
          const signedUrl = signedUrls[index];
          if (!signedUrl) {
            throw new Error(`Missing signed URL for part ${index + 1}`);
          }
          return uploadPart(chunk, signedUrl);
        });

        const responses = await Promise.all(uploadPromises);

        console.log(file, chunks);

        // Prepare parts for completion
        const parts = responses.map((response, index) => {
          const etag = response.headers.etag;
          if (!etag) {
            throw new Error(`Missing ETag for part ${index + 1}`);
          }

          return {
            PartNumber: index + 1,
            ETag: etag.replace(/"/g, ''), // Remove all quotes
          };
        });

        console.log('Completing upload with parts:', parts);

        // Complete the multipart upload
        await completeMultipartUpload({
          fileKey: Key,
          uploadId: UploadId,
          parts,
        });

        setIsSuccess(true);
        setIsUploading(false);
        console.log('Upload completed successfully');
      } catch (error) {
        console.error('Upload error:', error);
        if (axios.isCancel(error)) {
          setIsCancelled(true);
          setProgress(0);
          setIsSuccess(false);
          setIsUploading(false);
        } else {
          throw error;
        }
      }
    };

    const cancelUpload = (): void => {
      abortControllerRefs.current.forEach((controller) => {
        controller.abort();
      });
      abortControllerRefs.current = [];
    };

    uploadFile();

    return { cancelUpload };
  }

  const contextCancelUpload = (): void => {
    abortControllerRefs.current.forEach((controller) => {
      controller.abort();
    });
    abortControllerRefs.current = [];
  };

  return (
    <MultipartUploadContext.Provider
      value={{
        progress,
        isUploading,
        isSuccess,
        cancelUpload: contextCancelUpload,
        isCancelled,
        uploadFile: (props: MultipartUploadProps) => uploadFile(props),
      }}
    >
      {children}
    </MultipartUploadContext.Provider>
  );
}

export default MultipartUploadProvider;

export function useMultipartUpload() {
  const context = useContext(MultipartUploadContext);
  if (!context) {
    throw new Error(
      'useMultipartUpload must be used within a MultipartUploadProvider',
    );
  }
  return context;
}
