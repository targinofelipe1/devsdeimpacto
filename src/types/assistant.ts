// Tipos para o Assistente Virtual

export type ToneType = "aprendizado" | "humor" | "relaxar";

export type AttachmentType = "image" | "pdf" | "text";

export interface FileAttachment {
  type: AttachmentType;
  name: string;
  url: string;
  size: number;
  content?: string; // Texto extraído do arquivo
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  attachment?: FileAttachment;
  tone?: ToneType;
}

export interface LLMRequest {
  message: string;
  tone: ToneType;
  fileContent?: string;
  fileName?: string;
  fileType?: AttachmentType;
  context?: Message[]; // Histórico de mensagens para contexto
}

export interface LLMResponse {
  text: string;
  confidence?: number;
  suggestions?: string[];
}

export interface FileProcessingResult {
  success: boolean;
  content?: string;
  error?: string;
  metadata?: {
    pageCount?: number;
    wordCount?: number;
    format?: string;
    imageBase64?: string; // Base64 da imagem para análise por LLM
  };
}
