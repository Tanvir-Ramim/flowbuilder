import React, { useState, useEffect } from "react";
import type { Node } from "reactflow";

import "./NodeConfigModal.css";

import type {
  CodeData,
  HttpRequestData,
  SMTPData,
  WebhookData,
} from "../types/AllTypes";
import WebhookConfig from "./modalConfig/WebhookConfig";
import CodeConfig from "./modalConfig/CodeConfig";
import HttpRequestConfig from "./modalConfig/HttpRequestConfig";
import SMTPConfig from "./modalConfig/SMTPConfig";

interface NodeConfigModalProps {
  node: Node;
  onSave: (node: Node) => void;
  onClose: () => void;
}

const NodeConfigModal: React.FC<NodeConfigModalProps> = ({
  node,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState(node.data);

  useEffect(() => {
    setFormData(node.data);
  }, [node]);

  const handleSave = () => {
    onSave({
      ...node,
      data: formData,
    });
  };

  const renderForm = () => {
    switch (node.type) {
      case "webhook":
        return (
          <WebhookConfig
            data={formData as WebhookData}
            onChange={setFormData}
          />
        );
      case "code":
        return (
          <CodeConfig data={formData as CodeData} onChange={setFormData} />
        );
      case "http":
        return (
          <HttpRequestConfig
            data={formData as HttpRequestData}
            onChange={setFormData}
          />
        );
      case "smtp":
        return (
          <SMTPConfig data={formData as SMTPData} onChange={setFormData} />
        );
      default:
        return <div>Unknown node type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white modal-slide-down rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Configure{" "}
            {node.type
              ? node.type.charAt(0).toUpperCase() + node.type.slice(1)
              : "Unknown"}{" "}
            Node
          </h2>
          {/* <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button> */}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {renderForm()}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeConfigModal;
