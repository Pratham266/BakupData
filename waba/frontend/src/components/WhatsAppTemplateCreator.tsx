import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { apiService } from "../services/api";

interface TemplateComponent {
  type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
  format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT";
  text?: string;
  example?: {
    header_text?: string[][];
    body_text?: string[][];
    footer_text?: string[];
  };
  buttons?: ButtonComponent[];
}

interface ButtonComponent {
  type:
    | "QUICK_REPLY"
    | "URL"
    | "PHONE_NUMBER"
    | "OTP"
    | "MPM"
    | "CATALOG"
    | "FLOW"
    | "VOICE_CALL"
    | "APP";
  text: string;
  url?: string;
  phone_number?: string;
}

interface TemplateFormData {
  name: string;
  category: string;
  language: string;
  components: TemplateComponent[];
}

const TEMPLATE_CATEGORIES = [
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY",
  "ACCOUNT_UPDATE",
  "ALERT_UPDATE",
  "APPOINTMENT_UPDATE",
  "AUTO_REPLY",
  "ISSUE_RESOLUTION",
  "PAYMENT_UPDATE",
  "PERSONAL_FINANCE_UPDATE",
  "RESERVATION_UPDATE",
  "SHIPPING_UPDATE",
  "TICKET_UPDATE",
  "TRANSPORTATION_UPDATE",
];

const SUPPORTED_LANGUAGES = [
  "en_US",
  "en_GB",
  "en_CA",
  "en_AU",
  "en_IN",
  "es_ES",
  "es_MX",
  "es_AR",
  "es_CL",
  "es_CO",
  "es_PE",
  "es_VE",
  "pt_BR",
  "pt_PT",
  "fr_FR",
  "fr_CA",
  "de_DE",
  "de_AT",
  "de_CH",
  "it_IT",
  "it_CH",
  "nl_NL",
  "nl_BE",
  "pl_PL",
  "ru_RU",
  "tr_TR",
  "ja_JP",
  "ko_KR",
  "zh_CN",
  "zh_TW",
  "ar_AR",
  "he_IL",
  "hi_IN",
  "th_TH",
  "vi_VN",
];

const COMPONENT_TYPES = [
  { value: "HEADER", label: "Header" },
  { value: "BODY", label: "Body" },
  { value: "FOOTER", label: "Footer" },
  { value: "BUTTONS", label: "Buttons" },
];

const BUTTON_TYPES = [
  { value: "QUICK_REPLY", label: "Quick Reply" },
  { value: "URL", label: "URL" },
  { value: "PHONE_NUMBER", label: "Phone Number" },
  { value: "OTP", label: "OTP" },
  { value: "MPM", label: "MPM" },
  { value: "CATALOG", label: "Catalog" },
  { value: "FLOW", label: "Flow" },
  { value: "VOICE_CALL", label: "Voice Call" },
  { value: "APP", label: "App" },
];

export const WhatsAppTemplateCreator: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    category: "UTILITY",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "",
        example: {
          body_text: [[""]],
        },
      },
    ],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const addComponent = (type: string) => {
    const newComponent: TemplateComponent = {
      type: type as TemplateComponent["type"],
      text: "",
      example: type === "BODY" ? { body_text: [[""]] } : undefined,
    };

    if (type === "BUTTONS") {
      newComponent.buttons = [];
    }

    setFormData((prev) => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));
  };

  // Function to detect positional parameters in text
  const detectPositionalParameters = (text: string): number => {
    const matches = text.match(/\{\{(\d+)\}\}/g);
    if (!matches) return 0;

    const numbers = matches.map((match) =>
      parseInt(match.replace(/\{\{|\}\}/g, ""))
    );
    return Math.max(...numbers);
  };

  // Function to update body text and automatically adjust examples
  const updateBodyText = (index: number, value: string) => {
    const paramCount = detectPositionalParameters(value);
    const examples = Array(paramCount)
      .fill("")
      .map(() => [""]);

    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index
          ? {
              ...comp,
              text: value,
              example: {
                body_text: examples,
              },
            }
          : comp
      ),
    }));
  };

  // Function to update header text and automatically adjust examples
  const updateHeaderText = (index: number, value: string) => {
    const paramCount = detectPositionalParameters(value);
    const examples = Array(paramCount)
      .fill("")
      .map(() => [""]);

    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index
          ? {
              ...comp,
              text: value,
              example: {
                header_text: examples,
              },
            }
          : comp
      ),
    }));
  };

  // Function to update a specific example value for body
  const updateBodyExample = (
    componentIndex: number,
    exampleIndex: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === componentIndex
          ? {
              ...comp,
              example: {
                body_text: comp.example?.body_text?.map((ex, j) =>
                  j === exampleIndex ? [value] : ex
                ),
              },
            }
          : comp
      ),
    }));
  };

  // Function to update a specific example value for header
  const updateHeaderExample = (
    componentIndex: number,
    exampleIndex: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === componentIndex
          ? {
              ...comp,
              example: {
                header_text: comp.example?.header_text?.map((ex, j) =>
                  j === exampleIndex ? [value] : ex
                ),
              },
            }
          : comp
      ),
    }));
  };

  const removeComponent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index),
    }));
  };

  const updateComponent = (
    index: number,
    field: keyof TemplateComponent,
    value: string | TemplateComponent["format"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index ? { ...comp, [field]: value } : comp
      ),
    }));
  };

  const updateComponentText = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index ? { ...comp, text: value } : comp
      ),
    }));
  };

  const addButton = (componentIndex: number) => {
    const newButton: ButtonComponent = {
      type: "QUICK_REPLY",
      text: "",
    };

    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === componentIndex
          ? { ...comp, buttons: [...(comp.buttons || []), newButton] }
          : comp
      ),
    }));
  };

  const updateButton = (
    componentIndex: number,
    buttonIndex: number,
    field: keyof ButtonComponent,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === componentIndex
          ? {
              ...comp,
              buttons: comp.buttons?.map((btn, j) =>
                j === buttonIndex ? { ...btn, [field]: value } : btn
              ),
            }
          : comp
      ),
    }));
  };

  const removeButton = (componentIndex: number, buttonIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === componentIndex
          ? {
              ...comp,
              buttons: comp.buttons?.filter((_, j) => j !== buttonIndex),
            }
          : comp
      ),
    }));
  };

  const generateTemplate = async () => {
    try {
      setIsSubmitting(true);
      setSubmitMessage(null);

      const template = {
        name: formData.name,
        category: formData.category,
        parameter_format: "POSITIONAL",
        language: formData.language,
        components: formData.components,
      };

      // Get auth token from localStorage
      const token = localStorage.getItem("authToken");
      if (!token) {
        setSubmitMessage({
          type: "error",
          text: "Authentication token not found. Please log in again.",
        });
        return;
      }

      // Call the API to create the template
      const response = await apiService.createTemplate(token, {
        name: template.name,
        category: template.category,
        language: template.language,
        components: template.components as TemplateComponent[],
      });

      if (response.success) {
        const templateId = (response.data as { id?: string })?.id || "Unknown";
        setSubmitMessage({
          type: "success",
          text: `Template "${template.name}" created successfully! Template ID: ${templateId}`,
        });

        // Reset form after successful creation
        setFormData({
          name: "",
          category: "UTILITY",
          language: "en_US",
          components: [
            {
              type: "BODY",
              text: "",
              example: {
                body_text: [[""]],
              },
            },
          ],
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: response.message || "Failed to create template",
        });
      }
    } catch (error) {
      console.error("Error creating template:", error);
      setSubmitMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderComponent = (component: TemplateComponent, index: number) => {
    return (
      <Card key={index} className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{component.type}</CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeComponent(index)}
            >
              Remove
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {component.type === "HEADER" && (
            <div className="space-y-2">
              <Label>Format</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={component.format || "TEXT"}
                onChange={(e) =>
                  updateComponent(index, "format", e.target.value)
                }
              >
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="DOCUMENT">Document</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Text Content</Label>
            <Input
              placeholder={`Enter ${component.type.toLowerCase()} text...`}
              value={component.text || ""}
              onChange={(e) => {
                if (component.type === "BODY") {
                  updateBodyText(index, e.target.value);
                } else if (component.type === "HEADER") {
                  updateHeaderText(index, e.target.value);
                } else {
                  updateComponentText(index, e.target.value);
                }
              }}
            />
            <p className="text-xs text-gray-500">
              {component.type === "BODY" || component.type === "HEADER"
                ? "Use {{1}}, {{2}}, {{3}} etc. for positional parameters"
                : "Text content"}
            </p>
          </div>

          {component.type === "BODY" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Example Values</Label>
                <div className="text-sm text-gray-500">
                  {component.example?.body_text?.length || 0} parameter(s)
                  detected
                </div>
              </div>
              {component.example?.body_text &&
              component.example.body_text.length > 0 ? (
                component.example.body_text.map((example, exampleIndex) => (
                  <div
                    key={exampleIndex}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      placeholder={`Example value for {{${exampleIndex + 1}}}`}
                      value={example[0] || ""}
                      onChange={(e) =>
                        updateBodyExample(index, exampleIndex, e.target.value)
                      }
                    />
                    <div className="text-sm text-gray-500 font-medium min-w-[100px]">
                      Parameter {exampleIndex + 1}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 italic">
                  Add {"{{1}}"}, {"{{2}}"}, {"{{3}}"} etc. in the text above to
                  see example fields
                </div>
              )}
            </div>
          )}

          {component.type === "HEADER" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Example Values</Label>
                <div className="text-sm text-gray-500">
                  {component.example?.header_text?.length || 0} parameter(s)
                  detected
                </div>
              </div>
              {component.example?.header_text &&
              component.example.header_text.length > 0 ? (
                component.example.header_text.map((example, exampleIndex) => (
                  <div
                    key={exampleIndex}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      placeholder={`Example value for {{${exampleIndex + 1}}}`}
                      value={example[0] || ""}
                      onChange={(e) =>
                        updateHeaderExample(index, exampleIndex, e.target.value)
                      }
                    />
                    <div className="text-sm text-gray-500 font-medium min-w-[100px]">
                      Parameter {exampleIndex + 1}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 italic">
                  Add {"{{1}}"}, {"{{2}}"}, {"{{3}}"} etc. in the text above to
                  see example fields
                </div>
              )}
            </div>
          )}

          {component.type === "BUTTONS" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Buttons</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addButton(index)}
                >
                  Add Button
                </Button>
              </div>
              {component.buttons?.map((button, buttonIndex) => (
                <div
                  key={buttonIndex}
                  className="border p-3 rounded-md space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Label>Button {buttonIndex + 1}</Label>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeButton(index, buttonIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Type</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={button.type}
                        onChange={(e) =>
                          updateButton(
                            index,
                            buttonIndex,
                            "type",
                            e.target.value
                          )
                        }
                      >
                        {BUTTON_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Text</Label>
                      <Input
                        placeholder="Button text"
                        value={button.text}
                        onChange={(e) =>
                          updateButton(
                            index,
                            buttonIndex,
                            "text",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  {button.type === "URL" && (
                    <div>
                      <Label>URL</Label>
                      <Input
                        placeholder="https://example.com"
                        value={button.url || ""}
                        onChange={(e) =>
                          updateButton(
                            index,
                            buttonIndex,
                            "url",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {button.type === "PHONE_NUMBER" && (
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+1234567890"
                        value={button.phone_number || ""}
                        onChange={(e) =>
                          updateButton(
                            index,
                            buttonIndex,
                            "phone_number",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Template Creator</CardTitle>
          <CardDescription>
            Create WhatsApp message templates with POSITIONAL parameter format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Template Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                placeholder="e.g., order_confirmation"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <p className="text-xs text-gray-500">Max 512 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                {TEMPLATE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <select
                id="language"
                className="w-full p-2 border rounded-md"
                value={formData.language}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, language: e.target.value }))
                }
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Template Components */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">
                Template Components
              </Label>
              <div className="space-x-2">
                {COMPONENT_TYPES.map((type) => (
                  <Button
                    key={type.value}
                    variant="outline"
                    size="sm"
                    onClick={() => addComponent(type.value)}
                  >
                    Add {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {formData.components.map((component, index) =>
              renderComponent(component, index)
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: "",
                    category: "UTILITY",
                    language: "en_US",
                    components: [
                      {
                        type: "BODY",
                        text: "",
                        example: {
                          body_text: [[""]],
                        },
                      },
                    ],
                  });
                }}
              >
                Reset
              </Button>
              <Button onClick={generateTemplate} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Template"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/templates")}
                className="ml-2"
              >
                View My Templates
              </Button>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Template Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(
                    {
                      name: formData.name,
                      category: formData.category,
                      parameter_format: "POSITIONAL",
                      language: formData.language,
                      components: formData.components,
                    },
                    null,
                    2
                  )}
                </pre>
              </CardContent>
            </Card>
          )}

          {submitMessage && (
            <div
              className={`mt-4 p-3 rounded-md ${
                submitMessage.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {submitMessage.text}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
