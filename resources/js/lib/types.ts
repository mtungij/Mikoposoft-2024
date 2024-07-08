import { FileWithPath, useDropzone } from "react-dropzone";

export type FileWithPreview = FileWithPath & {
    preview: string;
};
