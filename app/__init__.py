from flask import Flask
from app.core.ai_core import AICore
from app.handlers.ui_handler import UiHandler
from app.utils.config import Config

def create_app(config_name='default'):
    app = Flask(__name__)
    
    # 加载配置
    app.config.from_object(f'config.{config_name}')
    
    # 初始化组件
    ai_core = AICore()
    ui_handler = UiHandler(ai_core)
    
    # 注册路由
    from app.handlers.api_handler import api_bp
    app.register_blueprint(api_bp)
    
    return app 