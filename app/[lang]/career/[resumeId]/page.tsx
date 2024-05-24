"use client";

import {
  InItEdgesProp,
  getInitEdges,
  getInitNodes,
} from "@/app/[lang]/career/[resumeId]/config";
import { finalCareerInfo } from "@/components/CareerInfoProvider";
import CareerNode from "@/components/CareerNode";
import { TypeLocale } from "@/lib/i18n";
import { getCareersByResumeId } from "@/lib/service/supabase";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
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
  params: { lang, resumeId },
}: {
  params: { lang: TypeLocale; resumeId: string };
}) {
  const { theme } = useTheme();
  const [curCareerInfo, setCurCareerInfo] = useState<finalCareerInfo[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<InItEdgesProp>(
    [] as InItEdgesProp
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const getCareerDataByResumeId = async (resumeId: string) => {
    const data: finalCareerInfo[] = await getCareersByResumeId(resumeId);
    setCurCareerInfo(data);
  };

  useEffect(() => {
    getCareerDataByResumeId(resumeId);
  }, [resumeId]);

  // filter effective career data <= roadmap and whyItsagoodfit has effect value
  const filterEffectCareer = (careerInfo: Partial<finalCareerInfo>[]) => {
    if (careerInfo.length === 0) return careerInfo;

    const filterCareerInfo = careerInfo.filter((item) => {
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

    return filterCareerInfo;
  };

  useEffect(() => {
    if (theme && curCareerInfo.length) {
      const filterCareerInfo = filterEffectCareer(curCareerInfo);

      setNodes(getInitNodes(theme, filterCareerInfo.length));
      setEdges(getInitEdges(theme, filterCareerInfo.length));
    }
  }, [theme, curCareerInfo]);

  useEffect(() => {
    if (!theme) return;
    const filterCareerInfo = filterEffectCareer(curCareerInfo);
    const Nodes = getInitNodes(theme, filterCareerInfo.length);
    Nodes.length = filterCareerInfo.length + 1;

    // render nodes control
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
