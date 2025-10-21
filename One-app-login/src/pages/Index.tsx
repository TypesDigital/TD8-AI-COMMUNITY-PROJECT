import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Chrome, Shield, Zap, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) console.error("Error logging in:", error);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">One Login. All Your Social Media.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in">
            Manage Everything<br />
            <span className="gradient-text">In One Place</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connect all your social media accounts with just your Gmail. One password, infinite possibilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {/* Feature cards omitted for brevity - see full code above */}
        </div>

        <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button onClick={handleGoogleLogin} size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300">
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <p className="text-xs text-muted-foreground mt-4">No credit card required • Free forever</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
        
