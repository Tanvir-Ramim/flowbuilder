import React from "react";
import type { CodeData } from "../../types/AllTypes";

interface CodeConfigProps {
  data: CodeData;
  onChange: (data: CodeData) => void;
}

const CodeConfig: React.FC<CodeConfigProps> = ({ data, onChange }) => {
  const updateField = (field: keyof CodeData, value: string) => {
    onChange({ ...data, [field]: value });
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
          placeholder="Code Node"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <input
          type="text"
          value={data.language}
          onChange={(e) => updateField("language", e.target.value)}
          placeholder="language"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code
        </label>
        <textarea
          value={data.code}
          onChange={(e) => updateField("code", e.target.value)}
          rows={10}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          placeholder="write your code here..."
        />
      </div>
    </div>
  );
};

export default CodeConfig;
