"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const UploadButton = ({ setPubliId }: { setPubliId: (url: any) => void }) => {
  const [success, setSuccess] = React.useState(false);
  return (
    <CldUploadWidget
      uploadPreset="qcvjziqk"
      onSuccess={(result: any) => {
        if (result.event === "success") {
          setSuccess(true);
          setPubliId(result.info.public_id);
        }
        setPubliId(result.info.public_id);
      }}
    >
      {({ open, isLoading }) => {
        return (
          <button
            type="button" // Explicitly set the type to "button"
            className="border-red-500 p-1 text-xs rounded-lg border-[1px] m-2 text-red-500 bg-white"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
          >
            {success ? "edit" : "upload"}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadButton;
