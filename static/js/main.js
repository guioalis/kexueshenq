document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const toggleMode = document.getElementById('toggleMode');
    const currentMode = document.getElementById('currentMode');
    let isDeepThinkingMode = false;

    // 切换思考模式
    toggleMode.addEventListener('click', function() {
        processUserInput('/mode');  // 让后端处理模式切换
    });

    // 添加模式切换快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'm') {  // Ctrl+M 切换模式
            e.preventDefault();
            processUserInput('/mode');
        }
    });

    // 发送消息
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage('user', message);
            if (message === '/deep') {
                isDeepThinkingMode = !isDeepThinkingMode;
                appendMessage('system', `深度思考模式已${isDeepThinkingMode ? '开启' : '关闭'}`);
                currentMode.textContent = isDeepThinkingMode ? '深度思考' : '快速响应';
                currentMode.style.color = isDeepThinkingMode ? '#e74c3c' : '#3498db';
            } else {
                processUserInput(message);
            }
            userInput.value = '';
        }
    }

    // 处理用户输入
    async function processUserInput(message) {
        try {
            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const data = await response.json();
            
            // 处理模式切换响应
            if (data.mode_change) {
                updateModeDisplay(data.mode);
                appendMessage('system', data.response);
                return;
            }

            // 显示思考过程
            if (data.thinking_process) {
                data.thinking_process.forEach(step => {
                    appendMessage('thinking', step);
                });
            }
            
            appendMessage('ai', data.response);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('system', '抱歉，处理您的请求时出现错误。');
        }
    }

    // 更新模式显示
    function updateModeDisplay(mode) {
        const modeColors = {
            'quick': '#3498db',
            'normal': '#2ecc71',
            'deep': '#e74c3c'
        };
        const modeNames = {
            'quick': '快速响应',
            'normal': '标准思考',
            'deep': '深度思考'
        };
        
        currentMode.textContent = modeNames[mode];
        currentMode.style.color = modeColors[mode];
        toggleMode.style.backgroundColor = modeColors[mode];
    }

    // 添加消息到聊天框
    function appendMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        if (type === 'thinking') {
            messageDiv.innerHTML = `<div class="thinking-step">🤔 ${content}</div>`;
        } else {
            const icon = type === 'user' ? '👤' : type === 'ai' ? '🤖' : '🔔';
            messageDiv.innerHTML = `<div class="message-content">${icon} ${content}</div>`;
        }
        
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // 事件监听器
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}); 