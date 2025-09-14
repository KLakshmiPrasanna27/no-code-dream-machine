import { useState } from "react";
import { Toolbar } from "./Toolbar";
import { ComponentLibrary } from "./ComponentLibrary";
import { Canvas } from "./Canvas";
import { PropertyPanel } from "./PropertyPanel";
import { AIAssistant } from "./AIAssistant";
import { toast } from "sonner";

export const Platform = () => {
  const [projectName, setProjectName] = useState("My Awesome App");

  const handlePreview = () => {
    toast.success("Opening preview...", {
      description: "Your app will open in a new tab"
    });
  };

  const handleSave = () => {
    toast.success("Project saved!", {
      description: "All changes have been saved to the cloud"
    });
  };

  const handleDeploy = () => {
    toast.success("Deployment started!", {
      description: "Your app is being deployed to production"
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <Toolbar 
        projectName={projectName}
        onPreview={handlePreview}
        onSave={handleSave}
        onDeploy={handleDeploy}
      />
      
      {/* Main Workspace */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Components */}
        <ComponentLibrary />
        
        {/* Center - Canvas */}
        <Canvas />
        
        {/* Right Sidebar - Properties */}
        <PropertyPanel />
      </div>
      
      {/* AI Assistant - Floating */}
      <AIAssistant />
    </div>
  );
};