import { GetCareersRequest } from "@/app/api/career/getCareers/route";
import { TypeLocale } from "@/lib/i18n";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const sixCareerLocale = ({
  resumeInfo,
  context,
}: Partial<GetCareersRequest>) => ({
  systemContent: {
    en: "You are a helpful career expert that ONLY responds in JSON.",
    zh: "您是一位杰出的职业专家, 擅长的交流语言是中文, 只用 JSON 进行响应, 文字部分使用中文回答",
  } as Record<Partial<TypeLocale>, string>,
  userContent: {
    en: `Give me 6 career paths that the following user could transition into based on their resume and any additional context. Respond like this in JSON: {jobTitle: string, jobDescription: string, timeline: string, salary: string, difficulty: string}.
      <example>
      [
        {
        "jobTitle": "UX Designer",
        "jobDescription": "Creates user-centered design solutions to improve product usability and user experience.",
        "timeline": "3-6 months",
        "salary": "$85k - $110k",
        "difficulty": "Medium"
        },
        {
        "jobTitle": "Digital Marketing Specialist",
        "jobDescription": "Develops and implements online marketing campaigns to drive business growth.",
        "timeline": "2-4 months",
        "salary": "$50k - $70k",
        "difficulty": "Low"
        },
        {
        "jobTitle": "Software Engineer",
        "jobDescription": "Designs, develops, and tests software applications to meet business needs.",
        "timeline": "6-12 months",
        "salary": "$100k - $140k",
        "difficulty": "High"
        },
        {
        "jobTitle": "Business Analyst",
        "jobDescription": "Analyzes business needs and develops solutions to improve operations and processes.",
        "timeline": "3-6 months",
        "salary": "$65k - $90k",
        "difficulty": "Medium"
        },
        {
        "jobTitle": "Cybersecurity Specialist",
        "jobDescription": "Protects computer systems and networks from cyber threats by developing and implementing security protocols.",
        "timeline": "6-12 months",
        "salary": "$80k - $120k",
        "difficulty": "High"
        }
        ]
      </example>

      <resume>
      ${resumeInfo}
      </resume>

      <additionalContext>
      ${context}
      </additionalContext>

      ONLY respond with JSON, nothing else.
    `,
    zh: `给我6个职业道路, 以下用户可以过渡到基于他们的简历和任何其他上下文。在 JSON 也是这样: {jobTitle: string, jobDescription: string, timeline: string, salary: string, difficulty: string}.
      <example>
      [
        {
        "jobTitle": "用户体验设计师",
        "jobDescription": "创建以用户为中心的设计解决方案, 以提高产品的可用性和用户体验。",
        "timeline": "3-6 months",
        "salary": "￥15k-￥30k",
        "difficulty": "Medium"
        },
        {
        "jobTitle": "数字营销专员",
        "jobDescription": "开发和实施在线营销活动, 以推动业务增长。",
        "timeline": "2-4 months",
        "salary": "￥15k-￥30k",
        "difficulty": "Low"
        },
        {
        "jobTitle": "软件工程师",
        "jobDescription": "设计、开发和测试软件应用程序以满足业务需求。",
        "timeline": "6-12 months",
        "salary": "￥15k-￥30k",
        "difficulty": "High"
        },
        {
        "jobTitle": "经营分析",
        "jobDescription": "分析业务需求并开发解决方案以改善运营和流程。",
        "timeline": "3-6 months",
        "salary": "￥15k-￥30k",
        "difficulty": "Medium"
        },
        {
        "jobTitle": "网络安全专家",
        "jobDescription": "通过开发和实施安全协议, 保护计算机系统和网络免受网络威胁。",
        "timeline": "6-12 months",
        "salary": "￥15k-￥30k",
        "difficulty": "High"
        }
        ]
      </example>

      <resume>
      ${resumeInfo}
      </resume>

      <additionalContext>
      ${context}
      </additionalContext>
      只用 JSON 响应, 别的什么都不要说。
    `,
  } as Record<Partial<TypeLocale>, string>,
});

export const getSixCareerMessage = ({
  resumeInfo,
  context,
  lang,
}: GetCareersRequest) =>
  [
    {
      role: "system",
      content: sixCareerLocale({ resumeInfo, context }).systemContent[lang],
    },
    {
      role: "user",
      content: sixCareerLocale({ resumeInfo, context }).userContent[lang],
    },
  ] as ChatCompletionMessageParam[];

const careerDetailLocale = ({
  resumeInfo,
  context,
  career,
}: Partial<GetCareersRequest> & { career: any }) => ({
  systemContent: {
    en: "You are a helpful career expert that ONLY responds in JSON.",
    zh: "您是一位杰出的职业专家, 擅长的交流语言是中文, 只用 JSON 进行响应, 文字部分使用中文回答",
  } as Record<Partial<TypeLocale>, string>,
  userContent: {
    en: `You are helping a person transition into the ${career.jobTitle} role in ${career.timeline}. Given the context about the person, return more information about the ${career.jobTitle} role in JSON as follows: {workRequired: string, aboutTheRole: string, whyItsagoodfit: array[], roadmap: [{string: string}, ...]
      <example>
      {"role": "DevOps Engineer",
      "workRequired": "20-30 hours/week",
      "whyItsagoodfit": [
        "Leverages your extensive experience in software engineering and developer advocacy.",
        "Utilizes your skills in Python, JavaScript, Node.js, React, and cloud services like AWS.",
        "Aligns with your experience in building and maintaining large-scale applications and infrastructure.",
        "Allows you to continue working with cutting-edge technologies and practices."
      ],
      "aboutTheRole": "As a DevOps Engineer, you will work closely with development, operations, and QA teams to streamline the software development lifecycle. Your responsibilities will include automating infrastructure provisioning, monitoring system performance, and ensuring security and compliance. The goal is to enhance the efficiency, reliability, and scalability of software deployments.",
      "roadmap": [
        {"Weeks 1-2": "Learn the basics of DevOps tools and practices, including Docker and Kubernetes. Start with online courses or tutorials to build foundational knowledge."},
        {"Weeks 3-4": "Set up a local development environment with Docker and Kubernetes. Practice creating and managing containers and clusters."},
        {"Weeks 5-6": "Explore continuous integration and continuous delivery (CI/CD) concepts. Implement a simple CI/CD pipeline using tools like Jenkins or GitLab CI."},
        {"Weeks 7-8": "Familiarize yourself with configuration management tools like Ansible or Terraform. Practice writing scripts to automate infrastructure provisioning."},
        {"Weeks 9-10": "Obtain a relevant certification such as AWS Certified DevOps Engineer or Google Cloud Professional DevOps Engineer to validate your skills."},
        {"Weeks 11-12": "Set up monitoring and logging solutions using tools like Prometheus, Grafana, and ELK stack. Learn to monitor system performance and troubleshoot issues."},
        {"Weeks 13-14": "Optimize your CI/CD pipelines for efficiency, scalability, and reliability. Implement advanced deployment strategies such as blue-green deployments or canary releases."},
        {"Weeks 15-16": "Collaborate with development and operations teams on real projects to apply your skills in a practical setting. Seek feedback and continuously improve your processes."}
      ]}
      </example>

      <context>
      ${resumeInfo}
      ${context}
      </context>

      ONLY respond with JSON, nothing else.
    `,
    zh: `您正在帮助一个人转换到${career.jobTitle}角色。给定关于这个人的上下文, 返回关于JSON中${career.jobTitle}角色的更多信息, 如下所示: {workRequired: string, aboutTheRole: string, whyItsagoodfit: array[], roadmap: [{string: string}, ...]
      <example>
      {"role": "DevOps 工程师",
      "workRequired": "20-30 hours/week",
      "whyItsagoodfit": [
        "利用你在软件工程和开发者宣传方面的丰富经验。",
        "利用你在 Python、 JavaScript、 Node.js、 React 和 AWS 等云服务方面的技能。",
        "与您在构建和维护大型应用程序和基础设施方面的经验保持一致。",
        "允许您继续使用尖端技术和实践"
      ],
      "aboutTheRole": "作为 DevOps 工程师, 您将与开发、运营和 QA 团队紧密合作, 以简化软件开发生命周期。您的职责将包括自动化基础设施供应、监视系统性能以及确保安全性和遵从性。目标是提高软件部署的效率、可靠性和可伸缩性。",
      "roadmap": [
        {"第1-2周": "学习 DevOps 工具和实践的基础, 包括 Docker 和 Kubernetes。从在线课程或教程开始, 建立基础知识。"}, 
        {"第3-4周": "使用 Docker 和 Kubernetes 建立一个本地开发环境。实践创建和管理容器和集群。"}, 
        {"第5-6周": "探索持续集成和持续交付(CI/CD)概念。使用 Jenkins 或 GitLab CI 等工具实现一个简单的 CI/CD 管道。"},
        {"第7-8周": "熟悉自己的组态管理工具, 如安赛尔或 Terraform。练习编写自动化基础设施配置的脚本。"}, 
        {"第9-10周": "获得相关的认证, 如 AWS 认证 DevOps 工程师或 Google Cloud Professional DevOps 工程师, 以验证您的技能。"},
        {"第11-12周": "使用 Prometheus、 Grafana 和 ELK 堆栈等工具设置监视和日志记录解决方案。学习监视系统性能和故障排除问题。"},
        {"第13-14周": "为效率、可伸缩性和可靠性优化 CI/CD 管道。实施高级部署策略, 如蓝绿部署或金丝雀版本。"},
        {"第15-16周": "在实际项目中与开发和运营团队合作, 在实际环境中应用您的技能。寻求反馈, 不断改进你的流程。"}
      ]}
      </example>

      <context>
      ${resumeInfo}
      ${context}
      </context>

      只用 JSON 进行响应, 别的什么都不要做。
    `,
  } as Record<Partial<TypeLocale>, string>,
});

export const getCareerDetailMessage = ({
  resumeInfo,
  context,
  lang,
  career,
}: GetCareersRequest & { career: any }) =>
  [
    {
      role: "system",
      content: careerDetailLocale({ resumeInfo, context, career })
        .systemContent[lang],
    },
    {
      role: "user",
      content: careerDetailLocale({ resumeInfo, context, career }).userContent[
        lang
      ],
    },
  ] as ChatCompletionMessageParam[];
