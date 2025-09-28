/* eslint-disable @typescript-eslint/no-explicit-any */
export type NodeType = "webhook" | "code" | "http" | "smtp";

export interface FlowState {
  version: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  positionAbsolute: { x: number; y: number };
  data: any;
  width?: number;
  height?: number;
  selected?: boolean;
  dragging?: boolean;
  style?: any;
  label?: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
  type: string;
}

export interface WebhookData {
  name: string;
  method: "GET" | "POST";
  path: string;
}

export interface CodeData {
  name: string;
  language: "JavaScript";
  code: string;
}

export interface HttpRequestData {
  name: string;
  method: string;
  url: string;
  headers: Array<{ key: string; value: string }>;
  bodyMode: "none" | "json" | "text" | "form";
  body: string;
}

export interface SMTPData {
  name: string;
  host: string;
  port: string;
  username: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}
