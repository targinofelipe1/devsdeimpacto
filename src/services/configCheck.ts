/**
 * Utilitário para verificar e diagnosticar a configuração do GitHub Models
 */

import { isGitHubModelsConfigured } from "./llmService";

export interface ConfigStatus {
  isConfigured: boolean;
  token: {
    exists: boolean;
    format: "valid" | "invalid" | "missing";
    prefix: string;
  };
  warnings: string[];
  errors: string[];
}

/**
 * Verifica o status da configuração do GitHub Models
 */
export function checkConfiguration(): ConfigStatus {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const warnings: string[] = [];
  const errors: string[] = [];

  // Verificar se o token existe
  const tokenExists = !!token && token.trim() !== "";

  // Verificar formato do token
  let tokenFormat: "valid" | "invalid" | "missing" = "missing";
  let tokenPrefix = "";

  if (tokenExists) {
    // GitHub tokens começam com 'ghp_', 'gho_', 'ghu_', 'ghs_', ou 'ghr_'
    const validPrefixes = ["ghp_", "gho_", "ghu_", "ghs_", "ghr_"];
    const hasValidPrefix = validPrefixes.some((prefix) =>
      token.startsWith(prefix)
    );

    if (hasValidPrefix) {
      tokenFormat = "valid";
      tokenPrefix = token.substring(0, 4);

      // Token deve ter pelo menos 40 caracteres
      if (token.length < 40) {
        warnings.push("Token parece estar incompleto (menos de 40 caracteres)");
      }
    } else {
      tokenFormat = "invalid";
      errors.push(
        "Token não tem formato válido do GitHub (deve começar com ghp_, gho_, etc.)"
      );
    }
  } else {
    errors.push("Token não configurado no arquivo .env");
  }

  // Verificar outras variáveis de ambiente
  const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE;
  if (!maxFileSize) {
    warnings.push("VITE_MAX_FILE_SIZE não configurado, usando padrão (10MB)");
  }

  const maxQuestions = import.meta.env.VITE_MAX_QUIZ_QUESTIONS;
  if (!maxQuestions) {
    warnings.push(
      "VITE_MAX_QUIZ_QUESTIONS não configurado, usando padrão (20)"
    );
  }

  return {
    isConfigured: isGitHubModelsConfigured(),
    token: {
      exists: tokenExists,
      format: tokenFormat,
      prefix: tokenPrefix,
    },
    warnings,
    errors,
  };
}

/**
 * Gera mensagem de diagnóstico formatada
 */
export function getConfigDiagnostic(): string {
  const status = checkConfiguration();

  let diagnostic = "🔍 Diagnóstico de Configuração do GitHub Models\n\n";

  // Status geral
  if (status.isConfigured) {
    diagnostic +=
      "✅ Configuração OK - GitHub Models está pronto para uso!\n\n";
  } else {
    diagnostic += "❌ Configuração Incompleta - Ação necessária\n\n";
  }

  // Detalhes do token
  diagnostic += "📝 Token do GitHub:\n";
  if (status.token.exists) {
    diagnostic += `   ✓ Token encontrado (${status.token.prefix}...)\n`;

    if (status.token.format === "valid") {
      diagnostic += "   ✓ Formato válido\n";
    } else {
      diagnostic += "   ✗ Formato inválido\n";
    }
  } else {
    diagnostic += "   ✗ Token não encontrado\n";
  }

  // Erros
  if (status.errors.length > 0) {
    diagnostic += "\n❌ Erros:\n";
    status.errors.forEach((error) => {
      diagnostic += `   • ${error}\n`;
    });
  }

  // Avisos
  if (status.warnings.length > 0) {
    diagnostic += "\n⚠️  Avisos:\n";
    status.warnings.forEach((warning) => {
      diagnostic += `   • ${warning}\n`;
    });
  }

  // Instruções
  if (!status.isConfigured) {
    diagnostic += "\n📋 Para corrigir:\n";
    diagnostic +=
      "   1. Gere um token em: https://github.com/settings/tokens\n";
    diagnostic += "   2. Copie o token gerado\n";
    diagnostic += "   3. Edite o arquivo .env na raiz do projeto\n";
    diagnostic += "   4. Cole o token em VITE_GITHUB_TOKEN=seu_token_aqui\n";
    diagnostic += "   5. Reinicie o servidor de desenvolvimento\n";
    diagnostic +=
      "\n   Consulte CONFIGURACAO_GITHUB_MODELS.md para mais detalhes.\n";
  }

  return diagnostic;
}

/**
 * Testa a conexão com GitHub Models
 */
export async function testConnection(): Promise<{
  success: boolean;
  message: string;
  latency?: number;
}> {
  if (!isGitHubModelsConfigured()) {
    return {
      success: false,
      message: "Token do GitHub não configurado",
    };
  }

  try {
    const startTime = Date.now();

    // Importação dinâmica para evitar erro se não estiver configurado
    const { generateAssistantResponse } = await import("./llmService");

    const response = await generateAssistantResponse({
      message: "teste",
      tone: "aprendizado",
    });

    const latency = Date.now() - startTime;

    if (response.text && response.text.length > 0) {
      return {
        success: true,
        message: "Conexão estabelecida com sucesso!",
        latency,
      };
    } else {
      return {
        success: false,
        message: "Resposta vazia da API",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao testar conexão",
    };
  }
}

/**
 * Hook React para verificar configuração (opcional)
 */
export function useConfigStatus() {
  const status = checkConfiguration();

  return {
    ...status,
    diagnostic: getConfigDiagnostic(),
  };
}
