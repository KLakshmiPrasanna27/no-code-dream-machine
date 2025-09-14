import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Monitor, 
  Plus, 
  Trash2, 
  Copy,
  Move,
  Settings
} from "lucide-react";

interface CanvasElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
}

export const Canvas = () => {
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: "1",
      type: "Button",
      x: 200,
      y: 150,
      width: 120,
      height: 40,
      content: "Get Started"
    },
    {
      id: "2", 
      type: "Text",
      x: 150,
      y: 80,
      width: 220,
      height: 50,
      content: "Welcome to Your App"
    }
  ]);
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("text/plain");
    const rect = canvasRef.current?.getBoundingClientRect();
    
    if (rect) {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: componentType,
        x: e.clientX - rect.left - 60,
        y: e.clientY - rect.top - 20,
        width: 120,
        height: 40,
        content: `New ${componentType}`
      };
      
      setElements([...elements, newElement]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const renderElement = (element: CanvasElement) => {
    const isSelected = selectedElement === element.id;
    
    return (
      <div
        key={element.id}
        className={`absolute cursor-move transition-smooth ${
          isSelected ? 'ring-2 ring-primary shadow-glow' : 'hover:ring-1 hover:ring-primary/50'
        }`}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
        }}
        onClick={() => setSelectedElement(element.id)}
      >
        {/* Element Content */}
        {element.type === "Button" && (
          <Button className="w-full h-full gradient-primary shadow-platform">
            {element.content}
          </Button>
        )}
        
        {element.type === "Text" && (
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-2xl font-bold text-foreground">{element.content}</h2>
          </div>
        )}
        
        {element.type === "Image" && (
          <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center border border-border">
            <span className="text-muted-foreground text-sm">Image Placeholder</span>
          </div>
        )}
        
        {element.type === "Container" && (
          <Card className="w-full h-full glass border-dashed border-primary/30">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Container</span>
            </div>
          </Card>
        )}

        {/* Selection Controls */}
        {isSelected && (
          <div className="absolute -top-10 left-0 flex gap-1 bg-primary rounded-lg p-1 shadow-platform">
            <Button size="icon" variant="ghost" className="w-6 h-6 text-primary-foreground hover:bg-primary-light">
              <Move className="w-3 h-3" />
            </Button>
            <Button size="icon" variant="ghost" className="w-6 h-6 text-primary-foreground hover:bg-primary-light">
              <Copy className="w-3 h-3" />
            </Button>
            <Button size="icon" variant="ghost" className="w-6 h-6 text-primary-foreground hover:bg-primary-light">
              <Settings className="w-3 h-3" />
            </Button>
            <Button size="icon" variant="ghost" className="w-6 h-6 text-primary-foreground hover:bg-destructive">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
        
        {/* Resize Handles */}
        {isSelected && (
          <>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded cursor-se-resize" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded cursor-ne-resize" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded cursor-sw-resize" />
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded cursor-nw-resize" />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-canvas">
      {/* Canvas Header */}
      <div className="h-12 bg-toolbar border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            <Monitor className="w-3 h-3 mr-1" />
            1920x1080
          </Badge>
          <Badge variant="outline" className="text-xs">
            {elements.length} elements
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Section
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-auto bg-workspace"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => setSelectedElement(null)}
      >
        {/* Canvas Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 0.3
          }}
        />
        
        {/* Mobile/Desktop Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl h-full bg-background rounded-lg shadow-card border border-border relative overflow-hidden">
            {/* Render Elements */}
            {elements.map(renderElement)}
            
            {/* Drop Zone Indicator */}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Start Building Your App
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Drag components from the library or ask the AI assistant to help you build your application.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};