import React from "react";
import { Webhook, Code, Globe, Mail } from "lucide-react";
import type { NodeType } from "../types/AllTypes";

const nodeTypes: { type: NodeType; label: string; icon: React.ReactNode }[] = [
  { type: "webhook", label: "Webhook", icon: <Webhook size={20} /> },
  { type: "code", label: "Code", icon: <Code size={20} /> },
  { type: "http", label: "HTTP Request", icon: <Globe size={20} /> },
  { type: "smtp", label: "SMTP", icon: <Mail size={20} /> },
];

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Nodes</h2>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center p-3 border border-gray-300 rounded-lg cursor-move bg-white hover:bg-gray-50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-md mr-3">
              {node.icon}
            </div>
            <span className="text-gray-700 font-medium">{node.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">How to use</h3>
          <ul className="text-sm list-disc ml-4 text-blue-700 space-y-1">
            <li> Drag nodes to canvas</li>
            <li> Connect nodes with edges</li>
            <li> Click to view properties</li>
            <li> Double-click to configure</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
