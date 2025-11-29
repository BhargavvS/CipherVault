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
import { Trash2, RotateCcw, Zap } from 'lucide-react';

type Mode = 'entire' | 'words';

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
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Reverse Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={mode}
              onValueChange={(value) => setMode(value as Mode)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entire" id="entire" data-testid="radio-entire" />
                <Label htmlFor="entire" className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Reverse Entire String</span>
                    <span className="text-xs text-muted-foreground">
                      "Hello World" → "dlroW olleH"
                    </span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="words" id="words" data-testid="radio-words" />
                <Label htmlFor="words" className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Reverse Each Word</span>
                    <span className="text-xs text-muted-foreground">
                      "Hello World" → "olleH dlroW"
                    </span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Real-Time Processing</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Text is reversed automatically as you type!
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaPanel
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Type here to reverse..."
            testId="input"
          />
          <TextAreaPanel
            label="Output (Real-Time)"
            value={output}
            readOnly
            placeholder="Reversed text appears here..."
            testId="output"
            showCopyButton
            onCopy={handleCopy}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleSwap} data-testid="button-swap">
            <RotateCcw className="w-4 h-4 mr-2" />
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
              <CardTitle className="text-lg">
                {mode === 'entire' ? 'Character Order' : 'Word-by-Word Transformation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mode === 'entire' ? (
                <div className="flex flex-wrap gap-1">
                  {input.split('').map((char, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center"
                      data-testid={`char-position-${i}`}
                    >
                      <Badge variant="outline" className="font-mono mb-1 text-xs">
                        {i + 1}
                      </Badge>
                      <span className="font-mono text-lg">
                        {char === ' ' ? '␣' : char}
                      </span>
                      <span className="text-xs text-primary font-mono">
                        ↓
                      </span>
                      <Badge variant="secondary" className="font-mono text-xs">
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
                        <div key={i} className="flex items-center text-muted-foreground text-sm">
                          [space]
                        </div>
                      );
                    }
                    const reversed = part.split('').reverse().join('');
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center p-3 rounded-md bg-muted/50"
                        data-testid={`word-transform-${i}`}
                      >
                        <span className="font-mono text-lg">{part}</span>
                        <RotateCcw className="w-4 h-4 text-muted-foreground my-1" />
                        <Badge variant="secondary" className="font-mono">
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

        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Rules:</strong> Reverses entire string or each word individually. 
              Spaces and symbols are preserved in their relative positions when reversing words.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
