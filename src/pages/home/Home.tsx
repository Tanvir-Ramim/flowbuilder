import { useState, useEffect, useCallback } from "react";
import { ReactFlowProvider } from "reactflow";

import type { FlowState } from "../../shared/types/AllTypes";
import FlowBuilder from "../../shared/components/FlowBuilder";

const defaultFlow: FlowState = {
  version: 1,
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
};

const Home = () => {
  const [flow, setFlow] = useState<FlowState>(defaultFlow);

  useEffect(() => {
    const saved = localStorage.getItem("flowbuilder-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFlow(parsed);
      } catch (error) {
        console.error("Failed to load saved flow:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flowbuilder-data", JSON.stringify(flow));
  }, [flow]);

  const handleFlowChange = useCallback((newFlow: FlowState) => {
    setFlow(newFlow);
  }, []);
  return (
    <div className="h-screen bg-gray-50">
      <ReactFlowProvider>
        <FlowBuilder flow={flow} onFlowChange={handleFlowChange} />
      </ReactFlowProvider>
    </div>
  );
};

export default Home;
