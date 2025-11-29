import { useState, useEffect } from 'react';
import { CipherLayout } from '@/components/cipher-layout';
import { TextAreaPanel } from '@/components/text-area-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { reverseString, reverseWords } from '@/lib/ciphers';
import { useToast } from '@/hooks/use-toast';
import { Trash2, RotateCcw, Zap, FlipHorizontal } from 'lucide-react';

type Mode = 'entire' | 'words';
const ACCENT_CLASS = 'focus:border-rose-500/50 focus:ring-rose-500/20';

export default function ReverseCipher() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('entire');
  const { toast } = useToast();

  useEffect(() => {
    if (mode === 'entire') {
      setOutput(reverseString(input));
    } else {
      setOutput(reverseWords(input));
    }
  }, [input, mode]);

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
      description: 'Output moved to input',
    });
  };

  return (
    <CipherLayout
      title="Reverse Cipher"
      description="Reverse the order of characters in text. Choose between reversing the entire string or reversing each word individually."
      gradientFrom="from-rose-500"
      gradientTo="to-pink-600"
      glowColor="bg-rose-500/10"
    >
      <div className="space-y-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <FlipHorizontal className="w-5 h-5 text-rose-400" />
              Reverse Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={mode}
              onValueChange={(value) => setMode(value as Mode)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer flex-1 ${
                mode === 'entire' 
                  ? 'bg-rose-500/20 border-rose-500/50' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}>
                <RadioGroupItem value="entire" id="entire" data-testid="radio-entire" />
                <Label htmlFor="entire" className="cursor-pointer flex-1">
                  <div className="flex flex-col text-white">
                    <span className="font-medium">Reverse Entire String</span>
                    <span className="text-xs text-white/50 font-mono mt-1">
                      "Hello World" → "dlroW olleH"
                    </span>
                  </div>
                </Label>
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer flex-1 ${
                mode === 'words' 
                  ? 'bg-rose-500/20 border-rose-500/50' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}>
                <RadioGroupItem value="words" id="words" data-testid="radio-words" />
                <Label htmlFor="words" className="cursor-pointer flex-1">
                  <div className="flex flex-col text-white">
                    <span className="font-medium">Reverse Each Word</span>
                    <span className="text-xs text-white/50 font-mono mt-1">
                      "Hello World" → "olleH dlroW"
                    </span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Real-Time Processing</CardTitle>
                <p className="text-sm text-white/50">
                  Text is reversed automatically as you type!
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaPanel
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Type here to reverse..."
            testId="input"
            accentClass={ACCENT_CLASS}
          />
          <TextAreaPanel
            label="Output (Real-Time)"
            value={output}
            readOnly
            placeholder="Reversed text appears here..."
            testId="output"
            showCopyButton
            onCopy={handleCopy}
            accentClass={ACCENT_CLASS}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0" data-testid="button-swap" onClick={handleSwap}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Swap (Use Output as Input)
          </Button>
          <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" data-testid="button-clear" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {input && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">
                {mode === 'entire' ? 'Character Order' : 'Word-by-Word Transformation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mode === 'entire' ? (
                <div className="flex flex-wrap gap-1">
                  {input.split('').map((char, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center p-2 rounded-lg bg-white/5 min-w-[40px]"
                      data-testid={`char-position-${i}`}
                    >
                      <Badge variant="outline" className="font-mono mb-1 text-xs text-rose-400 border-rose-500/30">
                        {i + 1}
                      </Badge>
                      <span className="font-mono text-lg text-white">
                        {char === ' ' ? '␣' : char}
                      </span>
                      <span className="text-xs text-rose-400 font-mono my-1">
                        ↓
                      </span>
                      <Badge className="font-mono text-xs bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0">
                        {input.length - i}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {input.split(/(\s+)/).filter(Boolean).map((part, i) => {
                    if (/^\s+$/.test(part)) {
                      return (
                        <div key={i} className="flex items-center text-white/30 text-sm px-2">
                          [space]
                        </div>
                      );
                    }
                    const reversed = part.split('').reverse().join('');
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500/30 transition-all"
                        data-testid={`word-transform-${i}`}
                      >
                        <span className="font-mono text-xl text-white">{part}</span>
                        <RotateCcw className="w-4 h-4 text-rose-400 my-2" />
                        <Badge className="font-mono bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0">
                          {reversed}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border-rose-500/20">
          <CardContent className="pt-4">
            <p className="text-sm text-white/60">
              <strong className="text-rose-400">Rules:</strong> Reverses entire string or each word individually. 
              Spaces and symbols are preserved in their relative positions when reversing words.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
