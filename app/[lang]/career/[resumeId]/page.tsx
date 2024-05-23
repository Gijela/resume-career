"use client";

import {
  InItEdgesProp,
  getInitEdges,
  getInitNodes,
} from "@/app/[lang]/career/[resumeId]/config";
import { useCareerInfo } from "@/components/CareerInfoProvider";
import CareerNode from "@/components/CareerNode";
import { TypeLocale } from "@/lib/i18n";
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

export default function Career({
  params: { lang },
}: {
  params: { lang: TypeLocale };
}) {
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
    if (!theme) return;
    const Nodes = getInitNodes(theme);
    const filterCareerInfo = curCareerInfo.filter((item) => {
      if (Object.keys(item).length > 0) {
        let flag = false;
        item.roadmap?.forEach((road) => {
          flag = flag || Boolean(Object.values(road)[0]);
        });
        item.whyItsagoodfit?.forEach((subFit) => {
          flag = flag || Boolean(subFit);
        });
        return flag;
      } else {
        return false;
      }
    });
    Nodes.length = filterCareerInfo.length + 1;

    const curNodes = Nodes.map((node) => {
      if (node.id === "1") {
        node.data = {
          label: lang === "zh" ? "职业" : "Careers",
        } as any;
      } else {
        let realdata = filterCareerInfo[Number(node.id) - 2];

        if ([2, 3, 6].includes(Number(node.id))) {
          // @ts-ignore
          node.data = { ...realdata, connectPosition: "top" };
        } else {
          // @ts-ignore
          node.data = { ...realdata, connectPosition: "bottom" };
        }
      }
      return node;
    });

    setNodes(curNodes);
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
