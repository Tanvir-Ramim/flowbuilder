import React from "react";
import type { Node } from "reactflow";
import type {
  CodeData,
  HttpRequestData,
  SMTPData,
  WebhookData,
} from "../types/AllTypes";

interface PropertiesPanelProps {
  selectedNode: Node | null;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Node Properties
        </h2>
        <div className="text-gray-500 text-center py-8">
          Select a node to view properties
        </div>
      </div>
    );
  }
  console.log(selectedNode);
  const renderProperties = () => {
    switch (selectedNode.type) {
      case "webhook": {
        const webhookData = selectedNode.data as WebhookData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {webhookData.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Method
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {webhookData.method}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Path
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {webhookData.path}
              </div>
            </div>
          </div>
        );
      }

      case "code": {
        const codeData = selectedNode.data as CodeData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {codeData.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {codeData.language}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code
              </label>
              <pre className="p-2 bg-gray-50 rounded border text-sm whitespace-pre-wrap max-h-32 overflow-y-auto">
                {codeData.code}
              </pre>
            </div>
          </div>
        );
      }

      case "http": {
        const httpData = selectedNode.data as HttpRequestData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {httpData.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Method
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {httpData.method}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <div className="p-2 bg-gray-50 rounded border break-words">
                {httpData.url}
              </div>
            </div>
          </div>
        );
      }

      case "smtp": {
        const smtpData = selectedNode.data as SMTPData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {smtpData.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Host
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {smtpData.host}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="p-2 bg-gray-50 rounded border">{smtpData.to}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <div className="p-2 bg-gray-50 rounded border">
                {smtpData.subject}
              </div>
            </div>
          </div>
        );
      }

      default:
        return <div>Unknown node type</div>;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Node Properties
      </h2>
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Type</div>
        <div className="font-medium capitalize">{selectedNode.type}</div>
      </div>
      {renderProperties()}
    </div>
  );
};

export default PropertiesPanel;
