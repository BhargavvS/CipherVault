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
import { Lock, Unlock, Trash2, Wand2 } from 'lucide-react';

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
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Shift Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Shift Value</Label>
                <span className="text-2xl font-mono font-bold text-primary" data-testid="text-shift-value">
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
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>13 (ROT13)</span>
                <span>25</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-decode">Auto-Decode Mode</Label>
                <p className="text-xs text-muted-foreground">
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
          />
          <TextAreaPanel
            label="Output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            testId="output"
            showCopyButton
            onCopy={handleCopy}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleEncrypt} data-testid="button-encrypt">
            <Lock className="w-4 h-4 mr-2" />
            Encrypt
          </Button>
          <Button onClick={handleDecrypt} variant="secondary" data-testid="button-decrypt">
            <Unlock className="w-4 h-4 mr-2" />
            Decrypt
          </Button>
          <Button onClick={handleClear} variant="outline" data-testid="button-clear">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {autoDecode && bruteForceResults.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                All Possible Decryptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {bruteForceResults.map(({ shift: s, result }) => (
                    <div
                      key={s}
                      className="flex items-start gap-3 p-2 rounded-md hover-elevate cursor-pointer"
                      onClick={() => {
                        setShift(s);
                        setOutput(result);
                      }}
                      data-testid={`brute-force-result-${s}`}
                    >
                      <span className="font-mono text-sm bg-primary/10 text-primary px-2 py-0.5 rounded min-w-[40px] text-center">
                        {s}
                      </span>
                      <span className="font-mono text-sm break-all">{result}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Rules:</strong> Shift 0-25, wrap-around at Z→A, only alphabetic characters shift, 
              symbols and numbers remain unchanged, case is preserved.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
