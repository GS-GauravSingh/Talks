import Dropzone from "dropzone";
import React, { useEffect, useRef } from "react";
import commonStyles from "../commonStyles";
import { UploadSimple } from "@phosphor-icons/react";

function FileDropzone({
    acceptedFiles = "images/*, videos/*",
    maxFileSize = 16 * 1024 * 1024,
    url = "/file/post",
}) {
    const dropzoneRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Disable auto-discovery
        Dropzone.autoDiscover = false;

        // Manually Initialize Dropzone
        if (!dropzoneRef.current && formRef.current) {
            dropzoneRef.current = new Dropzone(formRef.current, {
                url: url, // upload url
                acceptedFiles: acceptedFiles,
                maxFilesize: maxFileSize / (1024 * 1024), // dropzone excepts file size in mb (Mega Bytes)
                dictDefaultMessage: "",
            });
        }

        // Cleanup Dropzone instance on component unmount
        return () => {
            if (dropzoneRef.current) {
                // Destroy the dropzone instance
                dropzoneRef.current.destroy();
                dropzoneRef.current = null;
            }
        };
    }, []);

    return (
        <div
            className={`rounded-md ${commonStyles.border} ${commonStyles.inputBackground}`}
        >
            <div className="px-4 py-4">
                <form
                    action={url}
                    ref={formRef}
                    id="upload"
                    className={`dropzone rounded-md ${commonStyles.border} !border-dashed hover:!border-primary flex justify-center items-center`}
                >
                    <div className="dz-message flex flex-col items-center justify-center gap-4">
                        <span
                            className="bg-white dark:bg-darkGray p-4 rounded-full text-black dark:text-white"
                            title="Upload files"
                        >
                            <UploadSimple size={24} weight="regular" />
                        </span>

                        <span className="">Drop files here to upload</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FileDropzone;
