from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class ThinkingMode:
    name: str
    depth: str
    show_process: bool
    detail_level: int

class ThinkingModes:
    QUICK = ThinkingMode(
        name='快速响应',
        depth='quick',
        show_process=False,
        detail_level=1
    )
    
    NORMAL = ThinkingMode(
        name='标准思考',
        depth='normal',
        show_process=True,
        detail_level=2
    )
    
    DEEP = ThinkingMode(
        name='深度思考',
        depth='deep',
        show_process=True,
        detail_level=3
    )
    
    @classmethod
    def get_all_modes(cls) -> Dict[str, ThinkingMode]:
        return {
            'quick': cls.QUICK,
            'normal': cls.NORMAL,
            'deep': cls.DEEP
        } 