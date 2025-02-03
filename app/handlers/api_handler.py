from flask import Blueprint, jsonify, request
from app.core.ai_core import AICore
from app.handlers.ui_handler import UiHandler

api_bp = Blueprint('api', __name__)
ai_core = AICore()
ui_handler = UiHandler(ai_core)

@api_bp.route('/process', methods=['POST'])
def process_input():
    data = request.get_json()
    message = data.get('message', '')
    
    if message.startswith('/mode'):
        # 处理模式切换
        parts = message.split()
        mode = parts[1] if len(parts) > 1 else None
        mode_name = ui_handler.toggle_thinking_mode(mode)
        return jsonify({
            'mode_change': True,
            'mode': ui_handler.current_mode,
            'response': f"已切换到{mode_name}模式"
        })
    
    # 处理普通消息
    thinking_results = ai_core.deep_thinking_process(message)
    response = ai_core.generate_response(message, thinking_results)
    
    return jsonify({
        'thinking_process': thinking_results if ui_handler.thinking_modes[ui_handler.current_mode]['show_process'] else None,
        'response': response
    }) 