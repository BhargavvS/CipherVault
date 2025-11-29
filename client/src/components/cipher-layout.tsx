import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';

interface CipherLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function CipherLayout({ title, description, children }: CipherLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Home</span>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <span className="text-foreground font-medium">{title}</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2" data-testid="text-page-title">
            {title}
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            {description}
          </p>
        </header>

        {children}
      </main>

      <footer className="border-t py-6 mt-auto">
        <p className="text-center text-sm text-muted-foreground" data-testid="text-footer">
          Built using Loveable AI
        </p>
      </footer>
    </div>
  );
}
