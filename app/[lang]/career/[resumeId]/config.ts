import { Node } from "reactflow";

const initialNodes: Node[] = [
  {
    id: "2",
    type: "careerNode",
    position: { x: 50, y: 550 },
    data: {
      jobTitle: "SEO Specialist",
      jobDescription: `Uses research to improve a website's ranking in search engine results`,
      timeline: "2-3 months",
      salary: "$59k - $77k",
      difficulty: "Low",
      connectPosition: "top",
    },
  },
  {
    id: "3",
    type: "careerNode",
    position: { x: 1050, y: 550 },
    data: {
      jobTitle: "UX Designer",
      jobDescription:
        "Creates user-centered design solutions to improve product usability and user experience.",
      timeline: "3-6 months",
      salary: "$85k - $110k",
      difficulty: "Medium",
      connectPosition: "top",
    },
  },
  {
    id: "4",
    type: "careerNode",
    position: { x: 50, y: 150 },
    data: {
      jobTitle: "Digital Marketing Specialist",
      jobDescription:
        "Develops online marketing campaigns to drive business growth.",
      timeline: "2-4 months",
      salary: "$50k - $70k",
      difficulty: "Low",
      connectPosition: "bottom",
    },
  },
  {
    id: "5",
    type: "careerNode",
    position: { x: 1050, y: 150 },
    data: {
      jobTitle: "Software Engineer",
      jobDescription:
        "Designs, develops, and tests software applications to meet business needs.",
      timeline: "6-12 months",
      salary: "$100k - $140k",
      difficulty: "High",
      connectPosition: "bottom",
    },
  },
  {
    id: "6",
    type: "careerNode",
    position: { x: 550, y: 700 },
    data: {
      jobTitle: "Cybersecurity Specialist",
      jobDescription:
        "Protects computer systems and networks from cyber threats by developing and implementing security protocols.",
      timeline: "6-12 months",
      salary: "$80k - $120k",
      difficulty: "High",
      connectPosition: "top",
    },
  },
  {
    id: "7",
    type: "careerNode",
    position: { x: 550, y: 0 },
    data: {
      jobTitle: "Business Analyst",
      jobDescription:
        "Analyzes business needs and develops solutions to improve operations and processes.",
      timeline: "3-6 months",
      salary: "$65k - $90k",
      difficulty: "Medium",
      connectPosition: "bottom",
    },
  },
];

export const getInitNodes = (
  theme: string,
  effectCareersNum: number
): Node[] => {
  const rowInitNodes = [
    {
      id: "1",
      position: { x: 650, y: 450 },
      data: { label: "Careers" },
      style: {
        background: theme === "dark" ? "rgb(209 213 219)" : "black",
        color: theme === "dark" ? "black" : "white",
        fontSize: "24px",
      },
    },
    ...initialNodes,
  ];
  rowInitNodes.length = effectCareersNum + 1;

  return rowInitNodes;
};

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    animated: true,
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    animated: true,
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    animated: true,
  },
  {
    id: "e1-7",
    source: "1",
    target: "7",
    animated: true,
  },
];

export const getInitEdges = (theme: string, effectCareersNum: number) => {
  const style =
    theme === "dark" ? { stroke: "rgb(209 213 219)" } : { stroke: "#000" };

  const edges = initialEdges.map((item) => ({ ...item, style }));
  edges.length = effectCareersNum + 1;

  return edges;
};

export type InItEdgesProp = ReturnType<typeof getInitEdges>;
