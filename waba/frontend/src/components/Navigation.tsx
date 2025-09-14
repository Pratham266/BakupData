import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, MessageSquare, LogOut } from "lucide-react";

interface NavigationProps {
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-gray-900">WABA</h1>

          <div className="flex items-center space-x-2">
            <Button
              variant={isActive("/dashboard") ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>

            <Button
              variant={isActive("/templates") ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate("/templates")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Templates
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
};
