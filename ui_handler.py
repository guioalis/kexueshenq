import time

class UiHandler:
    def __init__(self, ai_core):
        self.ai_core = ai_core
        self.thinking_modes = {
            'quick': {
                'name': '快速响应',
                'depth': 'quick',
                'show_process': False,
                'detail_level': 1
            },
            'normal': {
                'name': '标准思考',
                'depth': 'normal',
                'show_process': True,
                'detail_level': 2
            },
            'deep': {
                'name': '深度思考',
                'depth': 'deep',
                'show_process': True,
                'detail_level': 3
            }
        }
        self.current_mode = 'quick'

    def toggle_thinking_mode(self, mode=None):
        """切换思考模式"""
        if mode and mode in self.thinking_modes:
            self.current_mode = mode
        else:
            # 循环切换：quick -> normal -> deep -> quick
            modes = list(self.thinking_modes.keys())
            current_index = modes.index(self.current_mode)
            self.current_mode = modes[(current_index + 1) % len(modes)]
        
        # 更新AI核心的思考模式
        self.ai_core.set_thinking_mode(self.thinking_modes[self.current_mode])
        return self.thinking_modes[self.current_mode]['name']

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
        """处理用户输入"""
        if user_input.startswith('/mode'):
            # 处理模式切换命令
            parts = user_input.split()
            if len(parts) > 1 and parts[1] in self.thinking_modes:
                mode_name = self.toggle_thinking_mode(parts[1])
                return f"已切换到{mode_name}模式"
            else:
                return "可用的模式: " + ", ".join(self.thinking_modes.keys())
        
        # 获取思考结果
        thinking_results = self.ai_core.deep_thinking_process(user_input)
        
        # 显示思考过程
        if self.thinking_modes[self.current_mode]['show_process']:
            self.display_thinking_process(thinking_results)
        
        # 生成最终答案
        final_answer = self.ai_core.generate_response(user_input, thinking_results)
        
        return final_answer 