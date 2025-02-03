class Config:
    """基础配置类"""
    DEBUG = False
    TESTING = False
    
    # AI配置
    AI_MODEL_PATH = 'models/ai_model'
    KNOWLEDGE_BASE_PATH = 'data/knowledge_base'
    
    # 思考模式配置
    DEFAULT_THINKING_MODE = 'quick'
    THINKING_DELAY = 0.5  # 思考显示延迟（秒）
    
    # 日志配置
    LOG_LEVEL = 'INFO'
    LOG_FILE = 'logs/app.log'

class DevelopmentConfig(Config):
    """开发环境配置"""
    DEBUG = True
    LOG_LEVEL = 'DEBUG'

class ProductionConfig(Config):
    """生产环境配置"""
    pass

class TestingConfig(Config):
    """测试环境配置"""
    TESTING = True
    LOG_LEVEL = 'DEBUG' 