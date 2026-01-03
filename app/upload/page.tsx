"use client";

import React, { useState } from "react";

export default function UploadReelPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    console.log({
      title,
      description,
      file,
    });

    // upload logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-white text-2xl font-semibold mb-6">
          Upload New Reel
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full rounded-lg bg-[#1c1f26] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
              className="w-full rounded-lg bg-[#1c1f26] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Upload Video
            </label>
            <div className="flex items-center gap-4 bg-[#1c1f26] border border-gray-700 rounded-lg px-4 py-3">
              <label className="cursor-pointer text-sm bg-gray-700 hover:bg-gray-600 transition px-4 py-2 rounded-md text-white">
                Choose File
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
              <span className="text-gray-400 text-sm truncate">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!file}
            className="w-full mt-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-white font-medium py-3 disabled:opacity-40"
          >
            Publish Video
          </button>
        </form>
      </div>
    </div>
  );
}
