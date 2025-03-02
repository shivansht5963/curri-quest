import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useUserGuardContext } from "app";

export default function VirtualAssistant() {
  const navigate = useNavigate();
  const { user } = useUserGuardContext();

  useEffect(() => {
    // Load jotform embed handler script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Once the script is loaded, initialize the handler
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-019550c2d86b71a1b04f2f576ba6fd428449']",
          "https://www.jotform.com"
        );
      }
    };

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        {/* Header with back button */}
        <header className="flex items-center mb-6">
          <button 
            onClick={() => navigate("/Dashboard")} 
            className="mr-4 flex items-center justify-center h-10 w-10 rounded-lg bg-card shadow-neo-flat hover:shadow-neo-float transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">Virtual Assistant</h1>
        </header>

        {/* AI Assistant Container */}
        <div className="bg-card rounded-xl shadow-neo-flat p-4 md:p-6 mb-8 overflow-hidden">
          <p className="text-muted-foreground mb-4">
            Ask questions about your studies, get homework help, or explore new topics with our AI learning assistant.
          </p>
          
          {/* Jotform AI Chatbot */}
          <div className="relative w-full h-[700px] rounded-lg overflow-hidden shadow-neo-inner">
            <iframe 
              id="JotFormIFrame-019550c2d86b71a1b04f2f576ba6fd428449" 
              title="NOVI: Cheerful Companion"
              allow="geolocation; microphone; camera; fullscreen"
              src="https://agent.jotform.com/019550c2d86b71a1b04f2f576ba6fd428449?embedMode=iframe&background=1&shadow=1"
              frameBorder="0"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                height: "700px",
                border: "none",
                width: "100%"
              }}
              scrolling="no"
            />
          </div>
        </div>
        
        <div className="bg-card rounded-xl shadow-neo-flat p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4">Virtual Assistant Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/20 rounded-lg shadow-neo-inner">
              <h3 className="font-bold mb-2">Homework Help</h3>
              <p className="text-sm text-muted-foreground">Get assistance with assignments and homework from various subjects.</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg shadow-neo-inner">
              <h3 className="font-bold mb-2">Concept Explanations</h3>
              <p className="text-sm text-muted-foreground">Ask for detailed explanations of any curriculum concept you're learning.</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg shadow-neo-inner">
              <h3 className="font-bold mb-2">Test Preparation</h3>
              <p className="text-sm text-muted-foreground">Practice with sample questions and get feedback on your answers.</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg shadow-neo-inner">
              <h3 className="font-bold mb-2">Study Planning</h3>
              <p className="text-sm text-muted-foreground">Get help creating personalized study plans based on your learning goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}