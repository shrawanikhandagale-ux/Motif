export * from './types';
export * from './registry';
import { TOOL_REGISTRY } from './registry';
import { ToolRegistryEntry, ToolConnectionCheck } from './types';
import { IntegrationCategory, IntegrationStatus } from '../../types';

export const integrationsService = {
  async getTools(category?: IntegrationCategory): Promise<ToolRegistryEntry[]> {
    if (!category) return TOOL_REGISTRY;
    return TOOL_REGISTRY.filter((t) => t.integrationType === category);
  },

  async getNativeTools(): Promise<ToolRegistryEntry[]> {
    return TOOL_REGISTRY.filter((t) => t.isNative);
  },

  async getExternalTools(): Promise<ToolRegistryEntry[]> {
    return TOOL_REGISTRY.filter((t) => !t.isNative);
  },

  async getTool(idOrKey: string): Promise<ToolRegistryEntry | null> {
    return (
      TOOL_REGISTRY.find((t) => t.id === idOrKey || t.toolKey === idOrKey) || null
    );
  },

  async checkToolStatus(toolId: string): Promise<ToolConnectionCheck> {
    const tool = await this.getTool(toolId);
    if (!tool) {
      return {
        toolId,
        toolKey: 'unknown',
        status: 'planned',
        lastCheckedAt: new Date().toISOString(),
        message: 'Tool not registered.',
      };
    }

    const status: IntegrationStatus = tool.isNative ? 'available' : tool.status;
    return {
      toolId: tool.id,
      toolKey: tool.toolKey,
      status,
      lastCheckedAt: new Date().toISOString(),
      latencyMs: tool.isNative ? 1 : 120,
      message: `${tool.name} is operational and ready for creative workflow integration.`,
    };
  },
};

export default integrationsService;

