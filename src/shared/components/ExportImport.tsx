/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Download, Upload, Image, FileText } from "lucide-react";
import { toPng } from "html-to-image";
import type { FlowEdge, FlowNode, FlowState } from "../types/AllTypes";
import { toast } from "react-toastify";

interface ExportImportProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  flowRef: React.RefObject<HTMLDivElement | null>;
  onImport: (flow: FlowState) => void;
}

const ExportImport: React.FC<ExportImportProps> = ({
  nodes,
  edges,
  flowRef,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const exportJSON = () => {
    const transformedNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      positionAbsolute: node.positionAbsolute ?? node.position,
      label: node.data?.name || node.type,
      data: node.data,
    }));

    const transformedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle ?? null,
      targetHandle: edge.targetHandle ?? null,
      type: edge.type ?? "smoothstep",
    }));

    const flow: FlowState = {
      version: 1,
      nodes: transformedNodes,
      edges: transformedEdges,
      viewport: { x: 0, y: 0, zoom: 1 },
    };

    const dataStr = JSON.stringify(flow, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `flow-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    setShowExportOptions(false);
  };

  const exportPNG = async () => {
    if (!flowRef.current) return;

    try {
      const dataUrl = await toPng(flowRef.current, {
        backgroundColor: "#ffffff",
        quality: 1.0,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `flow-${new Date().toISOString().split("T")[0]}.png`;
      link.click();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to export PNG. Please try again.");
    }
    setShowExportOptions(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("This JSON file is not valid.");
      resetFileInput();
      return;
    }

    if (!file.type.includes("json") && !file.name.endsWith(".json")) {
      toast.error("This JSON file is not valid.");
      resetFileInput();
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (!content || content.trim() === "") throw new Error("Empty file");

        let importedFlow: any;
        try {
          importedFlow = JSON.parse(content);
        } catch {
          throw new Error("Invalid JSON");
        }

        if (
          !importedFlow ||
          !Array.isArray(importedFlow.nodes) ||
          !Array.isArray(importedFlow.edges) ||
          importedFlow.nodes.length === 0
        ) {
          throw new Error("Invalid structure");
        }

        const internalNodes: FlowNode[] = importedFlow.nodes.map(
          (node: any, index: number) => {
            if (
              !node.id ||
              !node.type ||
              !node.position ||
              typeof node.position.x !== "number" ||
              typeof node.position.y !== "number"
            ) {
              throw new Error(`Invalid node at index ${index}`);
            }

            return {
              id: node.id,
              type: node.type,
              position: node.position,
              positionAbsolute: node.position,
              data: node.data || {},
              width: node.width || 182,
              height: node.height || 84,
              selected: false,
              dragging: false,
              style: {
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
                background: "white",
                minWidth: 150,
                ...node.style,
              },
            };
          }
        );

        const internalEdges: FlowEdge[] = importedFlow.edges.map(
          (edge: any, index: number) => {
            const source = edge.from?.nodeId || edge.source;
            const target = edge.to?.nodeId || edge.target;

            if (!source || !target) {
              throw new Error(`Invalid edge at index ${index}`);
            }

            const sourceNodeExists = internalNodes.some((n) => n.id === source);
            const targetNodeExists = internalNodes.some((n) => n.id === target);

            if (!sourceNodeExists || !targetNodeExists) {
              throw new Error(`Invalid edge reference`);
            }

            return {
              id: edge.id || `edge-${source}-${target}-${index}`,
              source,
              target,
              sourceHandle: edge.sourceHandle || null,
              targetHandle: edge.targetHandle || null,
              type: edge.type || "smoothstep",
            };
          }
        );

        const flowState: FlowState = {
          version: importedFlow.version || 1,
          nodes: internalNodes,
          edges: internalEdges,
          viewport: importedFlow.viewport || { x: 0, y: 0, zoom: 1 },
        };

        onImport(flowState);
        toast.success("Flow imported successfully!");
      } catch (error) {
        console.log(error);
        toast.error("This JSON file is not valid.");
      } finally {
        resetFileInput();
      }
    };

    reader.onerror = () => {
      toast.error("This JSON file is not valid.");
      resetFileInput();
    };

    reader.readAsText(file);
  };


  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex gap-2 relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />

      <div className="relative">
        <button
          onClick={() => setShowExportOptions(!showExportOptions)}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          <Download size={16} />
          Export
        </button>

        {showExportOptions && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <button
              onClick={exportJSON}
              className="flex cursor-pointer items-center gap-2 w-full px-4 py-3 text-left hover:bg-gray-50 rounded-t-lg transition-colors"
            >
              <FileText size={16} className="text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Export JSON</div>
                <div className="text-xs text-gray-500">
                  Download as JSON file
                </div>
              </div>
            </button>

            <button
              onClick={exportPNG}
              className="flex items-center cursor-pointer gap-2 w-full px-4 py-3 text-left hover:bg-gray-50 rounded-b-lg transition-colors"
            >
              <Image size={16} className="text-purple-600" />
              <div>
                <div className="font-medium text-gray-900">Export PNG</div>
                <div className="text-xs text-gray-500">
                  Download as PNG image
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      <button
        onClick={triggerFileInput}
        className="flex cursor-pointer items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <Upload size={16} />
        Import
      </button>

      {showExportOptions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
};

export default ExportImport;
