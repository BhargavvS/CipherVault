import { useState, useEffect } from 'react';
import { CipherLayout } from '@/components/cipher-layout';
import { TextAreaPanel } from '@/components/text-area-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { atbashCipher } from '@/lib/ciphers';
import { useToast } from '@/hooks/use-toast';
import { Trash2, ArrowLeftRight, Zap } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const REVERSED = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

export default function AtbashCipher() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setOutput(atbashCipher(input));
  }, [input]);

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    toast({
      title: 'Copied!',
      description: 'Output copied to clipboard',
    });
  };

  const handleSwap = () => {
    setInput(output);
    toast({
      title: 'Swapped!',
      description: 'Output moved to input (symmetric cipher)',
    });
  };

  return (
    <CipherLayout
      title="Atbash Cipher"
      description="A symmetric substitution cipher that maps each letter to its reverse in the alphabet. A becomes Z, B becomes Y, and so on."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Real-Time Processing</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Atbash is a symmetric cipher - encrypting and decrypting produce the same result!
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3 text-center">Letter Mapping</p>
              <div className="flex flex-col gap-2 font-mono text-sm overflow-x-auto">
                <div className="flex justify-center gap-1 flex-wrap">
                  {ALPHABET.split('').map((letter, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[24px]">
                      <span className="text-foreground font-bold">{letter}</span>
                      <ArrowLeftRight className="w-3 h-3 text-muted-foreground my-0.5" />
                      <span className="text-primary font-bold">{REVERSED[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaPanel
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Type here to encode/decode..."
            testId="input"
          />
          <TextAreaPanel
            label="Output (Real-Time)"
            value={output}
            readOnly
            placeholder="Result appears as you type..."
            testId="output"
            showCopyButton
            onCopy={handleCopy}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleSwap} data-testid="button-swap">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Swap (Use Output as Input)
          </Button>
          <Button onClick={handleClear} variant="outline" data-testid="button-clear">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {input && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Character Transformation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {input.split('').map((char, i) => {
                  const isLetter = /[a-zA-Z]/.test(char);
                  const transformed = atbashCipher(char);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center p-2 rounded-md bg-muted/50 min-w-[40px]"
                      data-testid={`char-transform-${i}`}
                    >
                      <span className="font-mono text-lg">{char === ' ' ? '␣' : char}</span>
                      {isLetter && (
                        <>
                          <ArrowLeftRight className="w-3 h-3 text-muted-foreground my-1" />
                          <Badge variant="secondary" className="font-mono">
                            {transformed}
                          </Badge>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Rules:</strong> A↔Z mapping (symmetric cipher), applies only to letters, 
              case is preserved, symbols and numbers remain unchanged.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
