class AICore:
    def __init__(self):
        # ... 现有代码 ...
        self.thinking_principles = {
            "实用性": "方案务实，确保实际可行",
            "具体性": "方案具体，清晰描绘执行路径",
            "易懂性": "方案易懂，避免晦涩术语",
            "详细性": "方案详细，宁可啰嗦也要说清楚",
            "全面性": "方案全面，考虑所有影响因素",
            "深刻性": "思想深刻，深入分析本质",
            "辩证性": "思想辩证，避免非黑即白",
            "灵活性": "手段灵活，大问题逐步拆解",
            "引导性": "穿插引导，帮助持续深入",
            "系统性": "纵观大局，结构化思维分析"
        }

    def _analyze_with_principles(self, question):
        """根据思考原则进行分析"""
        analysis_results = {}
        for principle, description in self.thinking_principles.items():
            analysis_results[principle] = self._apply_principle(principle, question)
        return analysis_results

    def _apply_principle(self, principle, question):
        """应用具体思考原则"""
        if principle == "实用性":
            return self._analyze_practicality(question)
        elif principle == "具体性":
            return self._analyze_specificity(question)
        # ... 其他原则的实现

    def _analyze_practicality(self, question):
        """分析方案的实用性"""
        considerations = {
            "可行性": self._evaluate_feasibility(question),
            "资源需求": self._analyze_resource_requirements(question),
            "实施难度": self._assess_implementation_difficulty(question),
            "预期效果": self._predict_outcomes(question)
        }
        return considerations

    def _analyze_specificity(self, question):
        """分析方案的具体性"""
        execution_path = {
            "步骤分解": self._break_down_steps(question),
            "时间节点": self._identify_milestones(question),
            "执行细节": self._detail_execution_process(question),
            "关键指标": self._define_key_metrics(question)
        }
        return execution_path

    def deep_thinking_process(self, question):
        """增强版深度思考处理函数"""
        if self.thinking_mode['depth'] == 'quick':
            return self._quick_thinking(question)

        thinking_steps = self._get_thinking_steps()
        thinking_results = []
        
        # 添加原则分析
        if self.thinking_mode['depth'] == 'deep':
            principle_analysis = self._analyze_with_principles(question)
            thinking_results.append({
                "思考原则分析": principle_analysis
            })

        # 常规思考步骤
        for step in thinking_steps:
            if self.thinking_mode['show_process']:
                print(f"🤔 {step}")
            result = self._process_thinking_step(step, question)
            thinking_results.append(result)

        return thinking_results

    def generate_response(self, question, thinking_results):
        """基于深度思考结果生成最终回答"""
        if not thinking_results:
            return "抱歉，无法得出结论。"

        # 提取原则分析结果
        principle_analysis = None
        for result in thinking_results:
            if isinstance(result, dict) and "思考原则分析" in result:
                principle_analysis = result["思考原则分析"]
                break

        # 构建结构化回答
        response_parts = []
        
        if principle_analysis and self.thinking_mode['depth'] == 'deep':
            response_parts.append("💡 深度思考分析：\n")
            for principle, analysis in principle_analysis.items():
                response_parts.append(f"\n📌 {principle}：")
                if isinstance(analysis, dict):
                    for key, value in analysis.items():
                        response_parts.append(f"\n   • {key}: {value}")
                else:
                    response_parts.append(f"\n   {analysis}")

        # 添加最终结论
        conclusion = None
        for result in thinking_results:
            if isinstance(result, dict) and "最佳方案" in result:
                conclusion = result
                break

        if conclusion:
            response_parts.append("\n\n🎯 最终建议：")
            response_parts.append(f"\n• 最佳方案：{conclusion['最佳方案']}")
            response_parts.append(f"\n• 决策依据：{conclusion['决策依据']}")
            response_parts.append(f"\n• 执行建议：{conclusion['执行建议']}")

        return "\n".join(response_parts) 