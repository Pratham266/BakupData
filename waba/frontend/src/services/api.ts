// Template component interface for API calls
interface TemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  text?: string;
  example?: {
    header_text?: string[][];
    body_text?: string[][];
    footer_text?: string[];
  };
  buttons?: Array<{
    type: string;
    text: string;
    url?: string;
    phone_number?: string;
  }>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    stack?: string;
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async signup(userData: {
    fullName: string;
    companyName: string;
    businessEmail: string;
    password: string;
    phoneNumber?: string;
    acceptedTerms: boolean;
  }): Promise<ApiResponse<{ user: unknown; token: string }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: {
    businessEmail: string;
    password: string;
  }): Promise<ApiResponse<{ user: unknown; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile(token: string): Promise<ApiResponse<unknown>> {
    return this.request('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateProfile(
    token: string,
    profileData: {
      fullName?: string;
      companyName?: string;
      phoneNumber?: string;
    }
  ): Promise<ApiResponse<unknown>> {
    return this.request('/auth/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // WhatsApp Template endpoints
  async createTemplate(
    token: string,
    templateData: {
      name: string;
      category: string;
      language: string;
      components: TemplateComponent[];
    }
  ): Promise<ApiResponse<unknown>> {
    return this.request('/templates', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(templateData),
    });
  }

  async getUserTemplates(
    token: string,
    page: number = 1,
    limit: number = 10,
    status?: string,
    category?: string
  ): Promise<ApiResponse<{
    templates: unknown[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (status) params.append('status', status);
    if (category) params.append('category', category);

    return this.request(`/templates?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getTemplateById(token: string, templateId: string): Promise<ApiResponse<unknown>> {
    return this.request(`/templates/${templateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateTemplate(
    token: string,
    templateId: string,
    updateData: {
      category?: string;
      components?: TemplateComponent[];
    }
  ): Promise<ApiResponse<unknown>> {
    return this.request(`/templates/${templateId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
  }

  async deleteTemplate(token: string, templateId: string): Promise<ApiResponse<unknown>> {
    return this.request(`/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async submitTemplateToWhatsApp(
    token: string,
    templateId: string,
    whatsappBusinessAccountId: string
  ): Promise<ApiResponse<unknown>> {
    return this.request(`/templates/${templateId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ whatsapp_business_account_id: whatsappBusinessAccountId }),
    });
  }

  async getTemplateStats(token: string): Promise<ApiResponse<{
    total: number;
    byStatus: Record<string, number>;
  }>> {
    return this.request('/templates/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();
export type { ApiResponse }; 