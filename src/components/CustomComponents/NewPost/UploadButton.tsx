"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const UploadButton = ({
  setPubliId,
  setUrl,
}: {
  setPubliId?: (id: string) => void;
  setUrl?: (url: string) => void;
}) => {
  const [success, setSuccess] = React.useState(false);

  return (
    <CldUploadWidget
      uploadPreset="qcvjziqk"
      onSuccess={(result: any) => {
        if (result.event === "success") {
          setSuccess(true);
          const { public_id, secure_url } = result.info;

          if (setPubliId) {
            setPubliId(public_id);
          }

          if (setUrl) {
            setUrl(secure_url);
          }

          console.log("Upload Result:", result.info);
        }
      }}
    >
      {({ open, isLoading }) => (
        <button
          type="button"
          className="border-red-500 p-1 text-xs rounded-lg border-[1px] m-2 text-red-500 bg-white"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            open();
          }}
        >
          {success ? "Edit" : "Upload"}
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadButton;
