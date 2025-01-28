import { Bot, User } from 'lucide-react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const timestamp = message.timestamp || new Date().toISOString();

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} group`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
        ${isUser ? 'bg-blue-500' : 'bg-gray-600'}`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex flex-col max-w-[80%] gap-1">
        <div className={`px-4 py-3 rounded-lg shadow-sm
          ${isUser ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}
          ${!isUser ? 'prose prose-sm max-w-none' : ''}`}>
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <ReactMarkdown
              className={`text-gray-800 leading-relaxed ${!isUser ? 'prose prose-sm max-w-none' : ''}`}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <div className={`text-xs text-gray-400 ${isUser ? 'text-right' : 'text-left'} opacity-0 group-hover:opacity-100 transition-opacity`}>
          {format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss', { locale: zhCN })}
        </div>
      </div>
    </div>
  );
}
