/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Controls,
  Background,
  useReactFlow,
  Panel,
} from "reactflow";
import type { Node, Edge, ReactFlowInstance, Connection } from "reactflow";
import "reactflow/dist/style.css";
import type { FlowEdge, FlowNode, FlowState } from "../types/AllTypes";
import NodeConfigModal from "./NodeConfigModal";
import PropertiesPanel from "./PropertiesPanel";
import ExportImport from "./ExportImport";
import Sidebar from "./Sidebar";
import { getNodeConfig } from "../utils/nodeConfig";
import { CodeNode, HttpNode, SMTPNode, WebhookNode } from "./CustomeNode";

const nodeTypes = {
  webhook: WebhookNode,
  code: CodeNode,
  http: HttpNode,
  smtp: SMTPNode,
};

interface FlowBuilderProps {
  flow: FlowState;
  onFlowChange: (flow: FlowState) => void;
}

const FlowBuilder: React.FC<FlowBuilderProps> = ({ flow, onFlowChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(flow.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    flow.edges.map((edge: any) => ({
      ...edge,
      source: edge.source ?? edge.from,
      target: edge.target ?? edge.to,
    })) as Edge[]
  );
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [configuringNode, setConfiguringNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  const { setViewport } = useReactFlow();

  useEffect(() => {
    onFlowChange({
      version: 1,
      nodes: nodes as FlowNode[],
      edges: edges.map((edge) => ({
        ...edge,
        from: (edge as any).from ?? edge.source,
        to: (edge as any).to ?? edge.target,
      })) as FlowEdge[],
      viewport: reactFlowInstance?.getViewport() || { x: 0, y: 0, zoom: 1 },
    });
  }, [nodes, edges, reactFlowInstance, onFlowChange]);


  useEffect(() => {
    if (reactFlowInstance && flow.viewport) {
      setViewport(flow.viewport);
    }
  }, [reactFlowInstance, flow.viewport, setViewport]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setConfiguringNode(node);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow") as any;
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: getNodeConfig(type).defaultData,
        ...getNodeConfig(type).nodeProps,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1 relative" ref={flowRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          connectionMode={ConnectionMode.Loose}
          nodeTypes={nodeTypes}
          fitView
          className="bg-white"
        >
          <Background />
          <Controls />
          <Panel position="top-right" className="bg-white p-2 rounded shadow">
            <ExportImport
              nodes={nodes as FlowNode[]}
              edges={
                edges.map((edge) => ({
                  ...edge,
                  from: (edge as any).from ?? edge.source,
                  to: (edge as any).to ?? edge.target,
                })) as FlowEdge[]
              }
              flowRef={flowRef}
              onImport={(newFlow) => {
                setNodes(newFlow.nodes as Node[]);
                setEdges(
                  newFlow.edges.map((edge: any) => ({
                    id: edge.id,
                    source: edge.source ?? edge.from,
                    target: edge.target ?? edge.to,
                    type: edge.type,
                    label: edge.label,
                    animated: edge.animated,
                    style: edge.style,
                    data: edge.data,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle,
                  })) as Edge[]
                );
                setViewport(newFlow.viewport);
                setSelectedNode(null);
              }}
            />
          </Panel>
        </ReactFlow>

        {selectedNode && (
          <button
            onClick={deleteSelectedNode}
            className="absolute bottom-4 cursor-pointer right-1 bg-red-500 text-white p-2 text-sm rounded shadow hover:bg-red-600"
          >
            Delete Node
          </button>
        )}
      </div>

      <PropertiesPanel selectedNode={selectedNode} />

      {configuringNode && (
        <NodeConfigModal
          node={configuringNode}
          onSave={(updatedNode) => {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === updatedNode.id ? updatedNode : node
              )
            );
            if (selectedNode?.id === updatedNode.id) {
              setSelectedNode(updatedNode);
            }
            setConfiguringNode(null);
          }}
          onClose={() => setConfiguringNode(null)}
        />
      )}
    </div>
  );
};

export default FlowBuilder;
