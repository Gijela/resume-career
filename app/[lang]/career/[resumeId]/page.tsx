"use client";

import {
  InItEdgesProp,
  getInitEdges,
  getInitNodes,
} from "@/app/[lang]/career/[resumeId]/config";
import { useCareerInfo } from "@/components/CareerInfoProvider";
import CareerNode from "@/components/CareerNode";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Node,
  NodeTypes,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  careerNode: CareerNode,
} satisfies NodeTypes;

export default function Career() {
  const { theme } = useTheme();
  const { curCareerInfo } = useCareerInfo();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<InItEdgesProp>(
    [] as InItEdgesProp
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (theme) {
      setNodes(getInitNodes(theme));
      setEdges(getInitEdges(theme));
    }
  }, [theme]);

  useEffect(() => {
    setNodes((initialNodes) =>
      initialNodes.map((node) => {
        if (node.id === "1") {
          node.data = {
            label: "Careers",
          } as any;
        } else {
          let realdata = curCareerInfo[Number(node.id) - 2];

          if (node.id === "2" || node.id === "3" || node.id === "6") {
            // @ts-ignore
            node.data = { ...realdata, connectPosition: "top" };
          } else {
            // @ts-ignore
            node.data = { ...realdata, connectPosition: "bottom" };
          }
        }
        return node;
      })
    );
  }, [curCareerInfo]);

  return (
    <div className="w-screen h-[1200px] mx-auto">
      <ReactFlow
        style={{ stroke: "red" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
