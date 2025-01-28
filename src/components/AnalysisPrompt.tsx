import { AnalysisFramework } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function AnalysisPrompt() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const framework: AnalysisFramework = {
    sections: [
      {
        title: "研究价值与创新性诊断",
        items: [
          {
            subtitle: "研究背景评估",
            points: [
              "精准定位研究问题的科学意义",
              "分析研究主题在学科前沿的战略价值",
              "评估研究内容对国家科技创新的潜在贡献"
            ]
          },
          {
            subtitle: "创新点深度挖掘",
            points: [
              "识别研究方案的原创性特征",
              "分析技术路线的突破点和颠覆性潜力",
              "对比国内外同类研究，明确创新维度"
            ]
          }
        ]
      },
      {
        title: "方法学与技术路线评价",
        items: [
          {
            subtitle: "研究方法科学性审查",
            points: [
              "检验研究方法的理论基础和逻辑严密性",
              "评估技术路线的可操作��和实验设计合理性",
              "识别潜在的方法学风险和应对策略"
            ]
          },
          {
            subtitle: "研究方案可行性论证",
            points: [
              "审核研究周期、资源配置的现实性",
              "评估研究团队专业能力与项目匹配度",
              "分析关键技术难点及解决路径"
            ]
          }
        ]
      },
      {
        title: "文档规范与学术表达优化",
        items: [
          {
            subtitle: "学术语言与逻辑",
            points: [
              "诊断文档的学术表达准确性",
              "提升论证逻辑的严密性和连贯性",
              "优化专业术语使用和学术表述"
            ]
          },
          {
            subtitle: "结构与格式规范",
            points: [
              "审核申请书整体结构的逻辑性",
              "检查是否符合国家自然科学基金申请规范",
              "提供格式和表述的精准修改建议"
            ]
          }
        ]
      },
      {
        title: "预期成果与学术影响力",
        items: [
          {
            subtitle: "成果转化路径",
            points: [
              "分析研究成果的理论价值",
              "评估潜在的技术转化和应用前景",
              "预测对相关学科发展的引领作用"
            ]
          },
          {
            subtitle: "学术影响力评估",
            points: [
              "预测研究成果的国际学术影响范畴",
              "分析可能产生的引文和学科推进价值",
              "论证研究的长期学术价值"
            ]
          }
        ]
      }
    ]
  };

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">评审框架</h2>
      <div className="space-y-2">
        {framework.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border rounded-lg bg-white">
            <button
              className="w-full px-4 py-2 text-left font-medium flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection(sectionIndex)}
            >
              <span>{section.title}</span>
              {expandedSections.has(sectionIndex) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {expandedSections.has(sectionIndex) && (
              <div className="px-4 py-2 border-t">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">{item.subtitle}</h4>
                    <ul className="list-disc list-inside pl-2">
                      {item.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-gray-600 mb-1">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
