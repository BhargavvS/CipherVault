import { useState, useEffect } from 'react';
import { CipherLayout } from '@/components/cipher-layout';
import { TextAreaPanel } from '@/components/text-area-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { caesarEncrypt, caesarDecrypt, caesarBruteForce } from '@/lib/ciphers';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, Trash2, Wand2, KeyRound } from 'lucide-react';

const ACCENT_CLASS = 'focus:border-amber-500/50 focus:ring-amber-500/20';

export default function CaesarCipher() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [shift, setShift] = useState(3);
  const [autoDecode, setAutoDecode] = useState(false);
  const [bruteForceResults, setBruteForceResults] = useState<{ shift: number; result: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (autoDecode && input) {
      setBruteForceResults(caesarBruteForce(input));
    } else {
      setBruteForceResults([]);
    }
  }, [input, autoDecode]);

  const handleEncrypt = () => {
    const result = caesarEncrypt(input, shift);
    setOutput(result);
    toast({
      title: 'Encrypted!',
      description: `Text encrypted with shift ${shift}`,
    });
  };

  const handleDecrypt = () => {
    const result = caesarDecrypt(input, shift);
    setOutput(result);
    toast({
      title: 'Decrypted!',
      description: `Text decrypted with shift ${shift}`,
    });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setBruteForceResults([]);
  };

  const handleCopy = () => {
    toast({
      title: 'Copied!',
      description: 'Output copied to clipboard',
    });
  };

  return (
    <CipherLayout
      title="Caesar Cipher"
      description="Shift each letter by a fixed number of positions in the alphabet. Named after Julius Caesar, who used it for secret military messages."
      gradientFrom="from-amber-500"
      gradientTo="to-orange-600"
      glowColor="bg-amber-500/10"
    >
      <div className="space-y-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-400" />
              Shift Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white/70">Shift Value</Label>
                <span className="text-3xl font-mono font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent" data-testid="text-shift-value">
                  {shift}
                </span>
              </div>
              <Slider
                value={[shift]}
                onValueChange={([value]) => setShift(value)}
                min={0}
                max={25}
                step={1}
                className="w-full"
                data-testid="slider-shift"
              />
              <div className="flex justify-between text-xs text-white/40">
                <span>0</span>
                <span className="text-amber-400">13 (ROT13)</span>
                <span>25</span>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-decode" className="text-white/70">Auto-Decode Mode</Label>
                <p className="text-xs text-white/40">
                  Show all 26 possible decryptions
                </p>
              </div>
              <Switch
                id="auto-decode"
                checked={autoDecode}
                onCheckedChange={setAutoDecode}
                data-testid="switch-auto-decode"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaPanel
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Enter text to encrypt or decrypt..."
            testId="input"
            accentClass={ACCENT_CLASS}
          />
          <TextAreaPanel
            label="Output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            testId="output"
            showCopyButton
            onCopy={handleCopy}
            accentClass={ACCENT_CLASS}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0" data-testid="button-encrypt" onClick={handleEncrypt}>
            <Lock className="w-4 h-4 mr-2" />
            Encrypt
          </Button>
          <Button className="bg-white/10 text-white border-white/20" data-testid="button-decrypt" onClick={handleDecrypt}>
            <Unlock className="w-4 h-4 mr-2" />
            Decrypt
          </Button>
          <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" data-testid="button-clear" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {autoDecode && bruteForceResults.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Wand2 className="w-5 h-5 text-amber-400" />
                All Possible Decryptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {bruteForceResults.map(({ shift: s, result }) => (
                    <div
                      key={s}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-amber-500/30"
                      onClick={() => {
                        setShift(s);
                        setOutput(result);
                      }}
                      data-testid={`brute-force-result-${s}`}
                    >
                      <span className="font-mono text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2.5 py-1 rounded-md min-w-[40px] text-center font-bold">
                        {s}
                      </span>
                      <span className="font-mono text-sm text-white/80 break-all">{result}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="pt-4">
            <p className="text-sm text-white/60">
              <strong className="text-amber-400">Rules:</strong> Shift 0-25, wrap-around at Z→A, only alphabetic characters shift, 
              symbols and numbers remain unchanged, case is preserved.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
