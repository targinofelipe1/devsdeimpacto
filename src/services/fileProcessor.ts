import { AttachmentType, FileProcessingResult } from "../types/assistant";

/**
 * Extrai texto de arquivos PDF
 * Em produção, usar uma biblioteca como pdf.js ou pdf-parse
 */
export async function extractTextFromPDF(
  file: File
): Promise<FileProcessingResult> {
  try {
    // Simulação - em produção, usar pdf.js ou similar
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = async (e) => {
        // Simulação de extração de texto
        // Em produção: usar pdfjs-dist ou pdf-parse
        const mockContent = `Conteúdo extraído do PDF: ${
          file.name
        }\n\nSimulação de texto extraído com aproximadamente ${Math.floor(
          Math.random() * 20 + 5
        )} páginas de conteúdo educacional.\n\nTópicos identificados:\n- Matemática\n- Álgebra\n- Geometria\n\nEste é um exemplo de processamento que seria feito por uma biblioteca real de PDF.`;

        resolve({
          success: true,
          content: mockContent,
          metadata: {
            pageCount: Math.floor(Math.random() * 20 + 5),
            wordCount: Math.floor(Math.random() * 5000 + 1000),
            format: "PDF",
          },
        });
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Erro ao ler arquivo PDF",
        });
      };

      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao processar PDF",
    };
  }
}

/**
 * Processa imagens convertendo para base64
 * A análise real será feita pela LLM com capacidade de visão
 */
export async function extractTextFromImage(
  file: File
): Promise<FileProcessingResult> {
  try {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;

        // Retornar a imagem em base64 para ser analisada pela LLM
        resolve({
          success: true,
          content: base64Image, // Base64 da imagem para enviar à LLM
          metadata: {
            format: "Image",
            imageBase64: base64Image,
          },
        });
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Erro ao ler imagem",
        });
      };

      reader.readAsDataURL(file);
    });
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao processar imagem",
    };
  }
}

/**
 * Extrai texto de arquivo de texto simples
 */
export async function extractTextFromTextFile(
  file: File
): Promise<FileProcessingResult> {
  try {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (e) => {
        const content = e.target?.result as string;

        resolve({
          success: true,
          content: content,
          metadata: {
            wordCount: content.split(/\s+/).length,
            format: "Text",
          },
        });
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Erro ao ler arquivo de texto",
        });
      };

      reader.readAsText(file);
    });
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao processar arquivo de texto",
    };
  }
}

/**
 * Determina o tipo de arquivo e processa adequadamente
 */
export async function processFile(file: File): Promise<FileProcessingResult> {
  const fileType = getFileType(file);

  switch (fileType) {
    case "pdf":
      return await extractTextFromPDF(file);
    case "image":
      return await extractTextFromImage(file);
    case "text":
      return await extractTextFromTextFile(file);
    default:
      return {
        success: false,
        error: "Tipo de arquivo não suportado",
      };
  }
}

/**
 * Identifica o tipo de arquivo baseado no MIME type
 */
export function getFileType(file: File): AttachmentType | "unknown" {
  if (file.type.includes("pdf")) {
    return "pdf";
  } else if (file.type.includes("image")) {
    return "image";
  } else if (file.type.includes("text")) {
    return "text";
  }
  return "unknown";
}

/**
 * Valida se o arquivo é permitido
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "text/plain",
  ];

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Arquivo muito grande. Tamanho máximo: 10MB",
    };
  }

  if (!allowedTypes.some((type) => file.type.includes(type.split("/")[1]))) {
    return {
      valid: false,
      error:
        "Tipo de arquivo não suportado. Use PDF, imagens (JPG/PNG) ou texto.",
    };
  }

  return { valid: true };
}

/**
 * Formata o tamanho do arquivo para exibição
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
