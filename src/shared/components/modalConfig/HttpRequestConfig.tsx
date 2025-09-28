/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { HttpRequestData } from "../../types/AllTypes";

interface HttpRequestConfigProps {
  data: HttpRequestData;
  onChange: (data: HttpRequestData) => void;
}

const HttpRequestConfig: React.FC<HttpRequestConfigProps> = ({
  data,
  onChange,
}) => {
  const updateField = (field: keyof HttpRequestData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateHeader = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newHeaders = [...data.headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    updateField("headers", newHeaders);
  };

  const addHeader = () => {
    updateField("headers", [...data.headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    updateField(
      "headers",
      data.headers.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="HTTP Request"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Method
        </label>
        <select
          value={data.method}
          onChange={(e) => updateField("method", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="url"
          value={data.url}
          onChange={(e) => updateField("url", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://api.example.com/users"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Headers
          </label>
          <button
            type="button"
            onClick={addHeader}
            className="text-sm cursor-pointer bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Add Header
          </button>
        </div>
        <div className="space-y-2">
          {data.headers.map((header, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={header.key}
                onChange={(e) => updateHeader(index, "key", e.target.value)}
                placeholder="Key"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) => updateHeader(index, "value", e.target.value)}
                placeholder="Value"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeHeader(index)}
                className="px-3 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body Mode
        </label>
        <select
          value={data.bodyMode}
          onChange={(e) => updateField("bodyMode", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="none">None</option>
          <option value="json">JSON</option>
          <option value="text">Text</option>
          <option value="form">Form Data</option>
        </select>
      </div>

      {data.bodyMode !== "none" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <textarea
            value={data.body}
            onChange={(e) => updateField("body", e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder={
              data.bodyMode === "json"
                ? '{"key": "value"}'
                : "Enter body content"
            }
          />
        </div>
      )}
    </div>
  );
};

export default HttpRequestConfig;
