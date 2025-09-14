import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Save, 
  Share2, 
  Download, 
  Settings, 
  User,
  Zap,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";

interface ToolbarProps {
  projectName: string;
  onPreview: () => void;
  onSave: () => void;
  onDeploy: () => void;
}

export const Toolbar = ({ projectName, onPreview, onSave, onDeploy }: ToolbarProps) => {
  return (
    <div className="h-16 bg-toolbar border-b border-border flex items-center justify-between px-6">
      {/* Left Section - Logo & Project */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BuilderAI
          </span>
        </div>
        
        <div className="w-px h-6 bg-border" />
        
        <div className="flex items-center gap-2">
          <Input 
            value={projectName}
            className="bg-transparent border-none text-foreground font-medium w-48 focus:ring-1 focus:ring-primary"
            placeholder="Untitled Project"
          />
          <Badge variant="secondary" className="text-xs">
            Draft
          </Badge>
        </div>
      </div>

      {/* Center Section - View Toggle */}
      <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
        <Button variant="ghost" size="sm" className="bg-primary text-primary-foreground">
          <Monitor className="w-4 h-4 mr-1" />
          Desktop
        </Button>
        <Button variant="ghost" size="sm">
          <Smartphone className="w-4 h-4 mr-1" />
          Mobile
        </Button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onPreview}>
          <Play className="w-4 h-4 mr-2" />
          Preview
        </Button>
        
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button size="sm" className="gradient-primary shadow-platform" onClick={onDeploy}>
          <Globe className="w-4 h-4 mr-2" />
          Deploy
        </Button>
        
        <div className="w-px h-6 bg-border" />
        
        <Button variant="ghost" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};