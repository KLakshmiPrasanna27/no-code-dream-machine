import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Wand2,
  Code,
  Database,
  Palette
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { label: "Create login page", icon: User, type: "auth" },
  { label: "Add payment form", icon: Code, type: "integration" },
  { label: "Design hero section", icon: Palette, type: "design" },
  { label: "Setup database", icon: Database, type: "backend" }
];

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI assistant. I can help you build your app by generating components, writing code, setting up databases, and much more. What would you like to create today?",
      timestamp: new Date(),
      suggestions: [
        "Create a landing page",
        "Setup user authentication", 
        "Add a contact form",
        "Design a dashboard"
      ]
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I understand you want to " + message + ". Let me help you with that! I'll generate the necessary components and code for your application.",
        timestamp: new Date(),
        suggestions: [
          "Add styling",
          "Make it responsive",
          "Add animations",
          "Connect to database"
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const quickMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: action,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, quickMessage]);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Great choice! I'm creating a ${action.toLowerCase()} for you. This will include all the necessary components, styling, and functionality.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary shadow-platform z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 z-50 transition-smooth ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="w-full h-full glass shadow-platform border-primary/20">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Always ready to help</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    className="h-auto p-2 text-left justify-start hover:border-primary/50"
                    onClick={() => handleQuickAction(action.label)}
                  >
                    <action.icon className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                  {msg.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`p-3 rounded-lg text-sm ${
                      msg.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted text-foreground'
                    }`}>
                      {msg.content}
                    </div>
                    
                    {msg.suggestions && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {msg.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-primary/20 transition-smooth"
                            onClick={() => setMessage(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {msg.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what you want to build..."
                  className="flex-1 bg-background"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="gradient-primary shadow-platform"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};