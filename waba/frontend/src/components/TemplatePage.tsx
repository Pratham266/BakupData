import React from "react";
import { useNavigate } from "react-router-dom";
import { WhatsAppTemplateCreator } from "./WhatsAppTemplateCreator";
import { Navigation } from "./Navigation";

export const TemplatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onLogout={handleLogout} />

      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WhatsApp Template Creator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create and manage WhatsApp message templates with POSITIONAL
            parameter format. Design templates for authentication, marketing,
            utility, and more.
          </p>
        </div>

        <WhatsAppTemplateCreator />
      </div>
    </div>
  );
};
