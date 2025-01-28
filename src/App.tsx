import { useState, useEffect } from 'react';
import './index.css';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { FileUpload } from './components/FileUpload';
import { AnalysisPrompt } from './components/AnalysisPrompt';
import { Message } from './types';
import { Trash2, BookOpen, AlertCircle } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { 
      role: 'user', 
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://gemini.chaohua.me/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer AIzaSyALTMZ9ylsQf8YtBd4qX08D7HVfcUAFyzY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `你是一个专业的国家自然科学基金项目评审专家，负责分析和优化项目申请书。请基于以下框架进行分析：
              1. 研究价值与创新性诊断
              2. 方法学与技术路线评价
              3. 文档规范与学术表达优化
              4. 预期成果与学术影响力
              请提供具体、可操作的建议。`
            },
            ...messages,
            userMessage
          ],
          model: 'gemini-2.0-flash-exp'
        })
      });

      if (!response.ok) {
        throw new Error('API请求失败');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        ...data.choices[0].message,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setError('网络请求失败，请稍后重试');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，处理您的请求时出现错误。请稍后重试。',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileContent = (content: string) => {
    handleSendMessage(`请按照科学基金申请评审框架，分析以下申请书内容：\n\n${content}`);
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg min-h-[80vh] p-6 flex flex-col">
          <div className="text-center mb-8 relative">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6" />
              国家自然科学基金申请书智能分析助手
            </h1>
            <p className="text-gray-600 mt-2">专业的项目申请书分析与优化指导</p>
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="清空对话"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <AnalysisPrompt />
            </div>
            
            <div className="col-span-8 flex flex-col">
              <FileUpload onFileContent={handleFileContent} />
              
              <div className="flex-1 overflow-y-auto space-y-6 mb-6 p-2">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    请上传项目申请书或输入内容以开始分析...
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))
                )}
                {isLoading && (
                  <div className="space-y-4">
                    <Skeleton count={3} height={60} />
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
