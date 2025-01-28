export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface GeminiResponse {
  choices: {
    message: Message;
  }[];
}

export interface AnalysisSection {
  title: string;
  items: {
    subtitle: string;
    points: string[];
  }[];
}

export interface AnalysisFramework {
  sections: AnalysisSection[];
}
