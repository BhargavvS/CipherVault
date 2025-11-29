import { Link } from 'wouter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  KeyRound, 
  Lock, 
  ArrowLeftRight, 
  Binary, 
  RotateCcw,
  Shield
} from 'lucide-react';

const ciphers = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'Shift letters by a fixed number of positions in the alphabet',
    icon: KeyRound,
    path: '/caesar',
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'Polyalphabetic cipher using a keyword for encryption',
    icon: Lock,
    path: '/vigenere',
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    description: 'Symmetric cipher that maps A↔Z, B↔Y, and so on',
    icon: ArrowLeftRight,
    path: '/atbash',
  },
  {
    id: 'binary',
    name: 'Binary Encoding',
    description: 'Convert text to 8-bit ASCII binary and back',
    icon: Binary,
    path: '/binary',
  },
  {
    id: 'reverse',
    name: 'Reverse Cipher',
    description: 'Reverse entire text or each word individually',
    icon: RotateCcw,
    path: '/reverse',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-app-title">
              CipherVault
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-app-description">
            Five powerful encryption and encoding tools in one place. 
            Secure your messages with classic ciphers and modern encoding.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ciphers.map((cipher) => {
            const Icon = cipher.icon;
            return (
              <Link key={cipher.id} href={cipher.path} data-testid={`link-open-${cipher.id}`}>
                <Card 
                  className="h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover-elevate"
                >
                  <CardHeader className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2" data-testid={`text-cipher-name-${cipher.id}`}>
                        {cipher.name}
                      </CardTitle>
                      <CardDescription className="text-sm" data-testid={`text-cipher-desc-${cipher.id}`}>
                        {cipher.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="border-t py-6 mt-auto">
        <p className="text-center text-sm text-muted-foreground" data-testid="text-footer">
          Built using Loveable AI
        </p>
      </footer>
    </div>
  );
}
