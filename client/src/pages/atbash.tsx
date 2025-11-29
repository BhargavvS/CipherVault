import { useState, useEffect } from 'react';
import { CipherLayout } from '@/components/cipher-layout';
import { TextAreaPanel } from '@/components/text-area-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { atbashCipher } from '@/lib/ciphers';
import { useToast } from '@/hooks/use-toast';
import { Trash2, ArrowLeftRight, Zap, Sparkles } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const REVERSED = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
const ACCENT_CLASS = 'focus:border-emerald-500/50 focus:ring-emerald-500/20';

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
      gradientFrom="from-emerald-500"
      gradientTo="to-teal-600"
      glowColor="bg-emerald-500/10"
    >
      <div className="space-y-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Real-Time Processing</CardTitle>
                <p className="text-sm text-white/50">
                  Atbash is a symmetric cipher - encrypting and decrypting produce the same result!
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-white/50 mb-4 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Letter Mapping
              </p>
              <div className="flex flex-col gap-2 font-mono text-sm overflow-x-auto">
                <div className="flex justify-center gap-1 flex-wrap">
                  {ALPHABET.split('').map((letter, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[28px] p-1 rounded-lg hover:bg-white/10 transition-colors">
                      <span className="text-emerald-400 font-bold">{letter}</span>
                      <ArrowLeftRight className="w-3 h-3 text-white/30 my-0.5" />
                      <span className="text-teal-400 font-bold">{REVERSED[i]}</span>
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
            accentClass={ACCENT_CLASS}
          />
          <TextAreaPanel
            label="Output (Real-Time)"
            value={output}
            readOnly
            placeholder="Result appears as you type..."
            testId="output"
            showCopyButton
            onCopy={handleCopy}
            accentClass={ACCENT_CLASS}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0" data-testid="button-swap" onClick={handleSwap}>
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Swap (Use Output as Input)
          </Button>
          <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" data-testid="button-clear" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {input && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Character Transformation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {input.split('').map((char, i) => {
                  const isLetter = /[a-zA-Z]/.test(char);
                  const transformed = atbashCipher(char);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/10 min-w-[50px] hover:border-emerald-500/30 transition-all"
                      data-testid={`char-transform-${i}`}
                    >
                      <span className="font-mono text-lg text-white">{char === ' ' ? '␣' : char}</span>
                      {isLetter && (
                        <>
                          <ArrowLeftRight className="w-3 h-3 text-emerald-400 my-1" />
                          <Badge className="font-mono bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
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

        <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <CardContent className="pt-4">
            <p className="text-sm text-white/60">
              <strong className="text-emerald-400">Rules:</strong> A↔Z mapping (symmetric cipher), applies only to letters, 
              case is preserved, symbols and numbers remain unchanged.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
