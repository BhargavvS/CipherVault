import { Link } from 'wouter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  KeyRound, 
  Lock, 
  ArrowLeftRight, 
  Binary, 
  RotateCcw,
  Shield,
  Sparkles
} from 'lucide-react';

const ciphers = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'Shift letters by a fixed number of positions in the alphabet',
    icon: KeyRound,
    path: '/caesar',
    gradient: 'from-amber-500 to-orange-600',
    bgGlow: 'bg-amber-500/20',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'Polyalphabetic cipher using a keyword for encryption',
    icon: Lock,
    path: '/vigenere',
    gradient: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
    iconBg: 'bg-gradient-to-br from-violet-400 to-purple-500',
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    description: 'Symmetric cipher that maps A↔Z, B↔Y, and so on',
    icon: ArrowLeftRight,
    path: '/atbash',
    gradient: 'from-emerald-500 to-teal-600',
    bgGlow: 'bg-emerald-500/20',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
  },
  {
    id: 'binary',
    name: 'Binary Encoding',
    description: 'Convert text to 8-bit ASCII binary and back',
    icon: Binary,
    path: '/binary',
    gradient: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
  },
  {
    id: 'reverse',
    name: 'Reverse Cipher',
    description: 'Reverse entire text or each word individually',
    icon: RotateCcw,
    path: '/reverse',
    gradient: 'from-rose-500 to-pink-600',
    bgGlow: 'bg-rose-500/20',
    iconBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80">5 Powerful Encryption Tools</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/25">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent" data-testid="text-app-title">
              CipherVault
            </h1>
          </div>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed" data-testid="text-app-description">
            Secure your messages with classic ciphers and modern encoding.
            <span className="block mt-2 text-purple-300">Encrypt. Decode. Explore.</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ciphers.map((cipher) => {
            const Icon = cipher.icon;
            return (
              <Link key={cipher.id} href={cipher.path} data-testid={`link-open-${cipher.id}`}>
                <Card 
                  className="group h-full cursor-pointer bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden relative"
                >
                  <div className={`absolute inset-0 ${cipher.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                  
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cipher.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <CardHeader className="relative flex flex-col gap-4 p-6">
                    <div className={`w-14 h-14 rounded-xl ${cipher.iconBg} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2 text-white group-hover:text-white transition-colors" data-testid={`text-cipher-name-${cipher.id}`}>
                        {cipher.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-white/60 group-hover:text-white/80 transition-colors" data-testid={`text-cipher-desc-${cipher.id}`}>
                        {cipher.description}
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-white/70 transition-colors mt-2">
                      <span>Open Tool</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="relative border-t border-white/10 py-6 mt-auto bg-black/20 backdrop-blur-sm">
        <p className="text-center text-sm text-white/50" data-testid="text-footer">
          Bhargav S
        </p>
      </footer>
    </div>
  );
}
