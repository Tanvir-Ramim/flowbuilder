/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "reactflow";

export const WebhookNode = ({ data }: { data: any }) => (
  
  <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500 min-w-[150px]">
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
      <div className="font-semibold text-blue-700">Webhook</div>
    </div>
    <div className="text-xs text-gray-600 mt-1">{data.name}</div>
    <Handle
      type="target"
      position={Position.Top}
      className="w-3 h-3 bg-blue-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className="w-3 h-3 bg-blue-500"
    />
  </div>
);

export const CodeNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500 min-w-[150px]">
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
      <div className="font-semibold text-green-700">Code</div>
    </div>
    <div className="text-xs text-gray-600 mt-1">{data.name}</div>
    <Handle
      type="target"
      position={Position.Top}
      className="w-3 h-3 bg-blue-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className="w-3 h-3 bg-blue-500"
    />
  </div>
);

export const HttpNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500 min-w-[150px]">
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
      <div className="font-semibold text-purple-700">HTTP Request</div>
    </div>
    <div className="text-xs text-gray-600 mt-1">{data.name}</div>
    <Handle
      type="target"
      position={Position.Top}
      className="w-3 h-3 bg-blue-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className="w-3 h-3 bg-blue-500"
    />
  </div>
);

export const SMTPNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-orange-500 min-w-[150px]">
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
      <div className="font-semibold text-orange-700">SMTP</div>
    </div>
    <div className="text-xs text-gray-600 mt-1">{data.name}</div>
    <Handle
      type="target"
      position={Position.Top}
      className="w-3 h-3 bg-blue-500"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className="w-3 h-3 bg-blue-500"
    />
  </div>
);
