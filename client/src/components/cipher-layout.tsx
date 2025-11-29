import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, Shield } from 'lucide-react';

interface CipherLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

export function CipherLayout({ 
  title, 
  description, 
  children,
  gradientFrom = 'from-violet-500',
  gradientTo = 'to-purple-600',
  glowColor = 'bg-violet-500/10'
}: CipherLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-96 h-96 ${glowColor} rounded-full blur-3xl`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${glowColor} rounded-full blur-3xl`}></div>
      
      <nav className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10" data-testid="button-back-home">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/">
              <span className="text-white/50 hover:text-white/70 cursor-pointer transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3" />
                CipherVault
              </span>
            </Link>
            <ChevronLeft className="w-3 h-3 rotate-180 text-white/30" />
            <span className="text-white font-medium">{title}</span>
          </div>
        </div>
      </nav>

      <main className="relative flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <header className="mb-8">
          <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white text-xs font-medium mb-4`}>
            Encryption Tool
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 text-white" data-testid="text-page-title">
            {title}
          </h1>
          <p className="text-white/60 text-lg" data-testid="text-page-description">
            {description}
          </p>
        </header>

        {children}
      </main>

      <footer className="relative border-t border-white/10 py-6 mt-auto bg-black/20 backdrop-blur-sm">
        <p className="text-center text-sm text-white/50" data-testid="text-footer">
          Built using Loveable AI
        </p>
      </footer>
    </div>
  );
}
