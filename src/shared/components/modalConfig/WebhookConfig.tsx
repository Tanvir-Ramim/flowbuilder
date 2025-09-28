import React from "react";
import type { WebhookData } from "../../types/AllTypes";

interface WebhookConfigProps {
  data: WebhookData;
  onChange: (data: WebhookData) => void;
}

const WebhookConfig: React.FC<WebhookConfigProps> = ({ data, onChange }) => {
  const updateField = (field: keyof WebhookData, value: string) => {
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
          placeholder="Webhook In"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Method
        </label>
        <select
          value={data.method}
          onChange={(e) =>
            updateField("method", e.target.value as "GET" | "POST")
          }
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Path
        </label>
        <input
          type="text"
          value={data.path}
          onChange={(e) => updateField("path", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="/path"
        />
      </div>
    </div>
  );
};

export default WebhookConfig;
