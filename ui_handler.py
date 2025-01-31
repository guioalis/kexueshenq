import time

class UiHandler:
    def __init__(self, ai_core):
        self.ai_core = ai_core
        self.deep_thinking_enabled = False  # 控制是否启用深度思考模式

    def toggle_deep_thinking(self):
        """切换深度思考模式"""
        self.deep_thinking_enabled = not self.deep_thinking_enabled
        status = "开启" if self.deep_thinking_enabled else "关闭"
        print(f"\n🔄 深度思考模式已{status}")
        return self.deep_thinking_enabled

    def display_thinking_process(self, thinking_results):
        """增强版思考过程显示"""
        print("\n=== 思考过程详情 ===\n")
        
        for i, result in enumerate(thinking_results, 1):
            print(f"📝 步骤 {i}:")
            self._display_result_details(result)
            print("\n" + "="*50 + "\n")
            time.sleep(0.8)  # 给用户足够的阅读时间

    def _display_result_details(self, result):
        """递归显示思考结果的详细信息"""
        if isinstance(result, dict):
            for key, value in result.items():
                print(f"\n🔹 {key}:")
                if isinstance(value, (dict, list)):
                    self._display_result_details(value)
                else:
                    print(f"  {value}")
        elif isinstance(result, list):
            for item in result:
                self._display_result_details(item)
        else:
            print(f"  {result}")

    def process_user_input(self, user_input):
        """增强版用户输入处理"""
        if user_input.strip().lower() == "/deep":
            return self.toggle_deep_thinking()
            
        if self.deep_thinking_enabled:
            print("\n🤖 启动深度思考模式...\n")
            
            # 获取深度思考结果
            thinking_results = self.ai_core.deep_thinking_process(user_input)
            
            # 显示思考过程
            self.display_thinking_process(thinking_results)
            
            # 生成最终答案
            final_answer = self.ai_core.generate_response(user_input, thinking_results)
            
            print("\n📊 最终结论：")
            print(final_answer)
        else:
            # 普通模式下的处理
            final_answer = self.ai_core.quick_response(user_input)
            print(f"\n💭 回答：\n{final_answer}")
            
        return final_answer 