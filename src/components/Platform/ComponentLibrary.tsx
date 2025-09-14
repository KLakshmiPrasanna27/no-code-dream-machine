import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Square, 
  Type, 
  Image, 
  MousePointer, 
  Layout, 
  Grid, 
  List,
  Database,
  UserCheck,
  CreditCard,
  Mail,
  BarChart3,
  Calendar,
  Search
} from "lucide-react";

const componentCategories = [
  {
    name: "Basic",
    components: [
      { name: "Button", icon: MousePointer, description: "Interactive button element" },
      { name: "Text", icon: Type, description: "Text content and headings" },
      { name: "Image", icon: Image, description: "Image and media display" },
      { name: "Container", icon: Square, description: "Layout container" }
    ]
  },
  {
    name: "Layout",
    components: [
      { name: "Grid", icon: Grid, description: "Responsive grid system" },
      { name: "Flex", icon: Layout, description: "Flexible box layout" },
      { name: "List", icon: List, description: "Ordered and unordered lists" }
    ]
  },
  {
    name: "Data",
    components: [
      { name: "Table", icon: Database, description: "Data table display" },
      { name: "Chart", icon: BarChart3, description: "Data visualization" },
      { name: "Form", icon: UserCheck, description: "Input and form elements" }
    ]
  },
  {
    name: "Advanced",
    components: [
      { name: "Payment", icon: CreditCard, description: "Stripe payment integration" },
      { name: "Auth", icon: UserCheck, description: "User authentication" },
      { name: "Email", icon: Mail, description: "Email notifications" },
      { name: "Search", icon: Search, description: "Search functionality" },
      { name: "Calendar", icon: Calendar, description: "Date picker and calendar" }
    ]
  }
];

export const ComponentLibrary = () => {
  const handleDragStart = (e: React.DragEvent, componentName: string) => {
    e.dataTransfer.setData("text/plain", componentName);
  };

  return (
    <div className="w-80 bg-sidebar border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Components</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Drag components to your canvas
        </p>
      </div>

      {/* Component Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {componentCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.components.length}
              </Badge>
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              {category.components.map((component) => (
                <Card
                  key={component.name}
                  className="p-3 cursor-grab active:cursor-grabbing hover:shadow-card transition-smooth hover:border-primary/20 group"
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.name)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
                      <component.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{component.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-tight">
                        {component.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Generate Section */}
      <div className="p-4 border-t border-border">
        <Button className="w-full gradient-secondary text-secondary-foreground shadow-platform">
          <Type className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </div>
    </div>
  );
};