import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Palette, 
  Code, 
  Database,
  Layers,
  Type,
  Square,
  Move,
  RotateCcw
} from "lucide-react";

export const PropertyPanel = () => {
  return (
    <div className="w-80 bg-sidebar border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Properties</h3>
          <Badge variant="secondary" className="text-xs">Button Selected</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your component
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="design" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="design">
              <Palette className="w-4 h-4 mr-1" />
              Design
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="w-4 h-4 mr-1" />
              Code
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database className="w-4 h-4 mr-1" />
              Data
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <TabsContent value="design" className="space-y-6 mt-4">
            {/* Content */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Type className="w-4 h-4 mr-2" />
                Content
              </Label>
              <Input 
                defaultValue="Get Started" 
                placeholder="Button text"
                className="bg-background"
              />
            </div>

            {/* Layout */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Move className="w-4 h-4 mr-2" />
                Position & Size
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">X</Label>
                  <Input defaultValue="200" className="bg-background" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Y</Label>
                  <Input defaultValue="150" className="bg-background" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input defaultValue="120" className="bg-background" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Height</Label>
                  <Input defaultValue="40" className="bg-background" />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </Label>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Background</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input defaultValue="#3B82F6" className="bg-background font-mono text-xs" />
                  </div>
                  <div className="w-10 h-10 rounded border border-border gradient-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Border Radius</Label>
                <Input defaultValue="8" className="bg-background" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Shadow</Label>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Square className="w-4 h-4 mr-2" />
                  Platform Shadow
                </Button>
              </div>
            </div>

            {/* States */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">States</Label>
              <div className="grid grid-cols-3 gap-1">
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  Default
                </Button>
                <Button variant="outline" size="sm">
                  Hover
                </Button>
                <Button variant="outline" size="sm">
                  Active
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6 mt-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Generated Code
              </Label>
              <Card className="p-3 bg-muted">
                <pre className="text-xs text-foreground overflow-x-auto">
{`<Button 
  className="gradient-primary"
  onClick={() => {
    // Your action here
  }}
>
  Get Started
</Button>`}
                </pre>
              </Card>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Actions</Label>
              <Input 
                placeholder="onClick handler"
                className="bg-background font-mono text-xs"
              />
            </div>

            <Button variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </TabsContent>

          <TabsContent value="data" className="space-y-6 mt-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Data Binding
              </Label>
              <Input 
                placeholder="Connect to data source"
                className="bg-background"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Dynamic Content</Label>
              <Button variant="outline" className="w-full justify-start">
                <Layers className="w-4 h-4 mr-2" />
                Bind to API
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};