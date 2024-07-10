import React, { ChangeEvent, FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ImageCropper } from "@/components/image-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileWithPreview } from "@/lib/types";

const accept = {
    "image/*": [],
};

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export default function UserProfile({ onChange, value }: Props) {
    const [selectedFile, setSelectedFile] =
        React.useState<FileWithPreview | null>(null);
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const onDrop = React.useCallback(
        (acceptedFiles: FileWithPath[]) => {
            const file = acceptedFiles[0];
            if (!file) {
                alert("Selected image is too large!");
                return;
            }

            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            setSelectedFile(fileWithPreview);
            setDialogOpen(true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
    });

    return (
        <div className="relative ">
            {selectedFile ? (
                <ImageCropper
                    dialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />
            ) : (
                <Avatar
                    {...getRootProps()}
                    className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                >
                    <input
                        name="img_url"
                        type="file"
                        value={value}
                        onChange={onChange}
                        {...getInputProps()}
                    />
                    <AvatarImage
                        src="https://github.com/alkadoHs.png"
                        alt="Avatar"
                    />
                    <AvatarFallback>AL</AvatarFallback>
                </Avatar>
            )}

            {/* <div className=" absolute -bottom-12 left-28 ">
                <SvgText />
            </div> */}
        </div>
    );
}
