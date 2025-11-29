import { useState } from 'react';
import { CipherLayout } from '@/components/cipher-layout';
import { TextAreaPanel } from '@/components/text-area-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { textToBinary, binaryToText } from '@/lib/ciphers';
import { useToast } from '@/hooks/use-toast';
import { Trash2, ArrowRight, Binary as BinaryIcon, Cpu } from 'lucide-react';

type Direction = 'text-to-binary' | 'binary-to-text';
const ACCENT_CLASS = 'focus:border-cyan-500/50 focus:ring-cyan-500/20';

export default function BinaryEncoding() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<Direction>('text-to-binary');
  const { toast } = useToast();

  const handleConvert = () => {
    if (!input.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text or binary to convert',
        variant: 'destructive',
      });
      return;
    }

    if (direction === 'text-to-binary') {
      const result = textToBinary(input);
      setOutput(result);
      toast({
        title: 'Converted!',
        description: 'Text converted to 8-bit binary',
      });
    } else {
      const result = binaryToText(input);
      setOutput(result);
      if (result.startsWith('Error:')) {
        toast({
          title: 'Conversion Error',
          description: result.replace('Error: ', ''),
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Converted!',
          description: 'Binary converted to text',
        });
      }
    }
  };

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

  const getInputPlaceholder = () => {
    return direction === 'text-to-binary'
      ? 'Enter text to convert to binary...'
      : 'Enter binary (e.g., 01001000 01101001)...';
  };

  const getOutputPlaceholder = () => {
    return direction === 'text-to-binary'
      ? 'Binary output will appear here...'
      : 'Text output will appear here...';
  };

  const binaryBreakdown = direction === 'text-to-binary' && output && !output.startsWith('Error:')
    ? input.split('').map((char, i) => ({
        char,
        binary: char.charCodeAt(0).toString(2).padStart(8, '0'),
        ascii: char.charCodeAt(0),
      }))
    : [];

  return (
    <CipherLayout
      title="Binary Encoding"
      description="Convert text to 8-bit ASCII binary representation and vice versa. Each character is encoded as 8 binary digits."
      gradientFrom="from-cyan-500"
      gradientTo="to-blue-600"
      glowColor="bg-cyan-500/10"
    >
      <div className="space-y-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Conversion Direction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={direction}
              onValueChange={(value) => {
                setDirection(value as Direction);
                setInput('');
                setOutput('');
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                direction === 'text-to-binary' 
                  ? 'bg-cyan-500/20 border-cyan-500/50' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}>
                <RadioGroupItem value="text-to-binary" id="text-to-binary" data-testid="radio-text-to-binary" />
                <Label htmlFor="text-to-binary" className="flex items-center gap-2 cursor-pointer text-white">
                  <span className="font-medium">ABC</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-cyan-400">01</span>
                </Label>
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                direction === 'binary-to-text' 
                  ? 'bg-cyan-500/20 border-cyan-500/50' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}>
                <RadioGroupItem value="binary-to-text" id="binary-to-text" data-testid="radio-binary-to-text" />
                <Label htmlFor="binary-to-text" className="flex items-center gap-2 cursor-pointer text-white">
                  <span className="font-mono text-cyan-400">01</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">ABC</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaPanel
            label={direction === 'text-to-binary' ? 'Text Input' : 'Binary Input'}
            value={input}
            onChange={setInput}
            placeholder={getInputPlaceholder()}
            testId="input"
            accentClass={ACCENT_CLASS}
          />
          <TextAreaPanel
            label={direction === 'text-to-binary' ? 'Binary Output' : 'Text Output'}
            value={output}
            readOnly
            placeholder={getOutputPlaceholder()}
            testId="output"
            showCopyButton
            onCopy={handleCopy}
            accentClass={ACCENT_CLASS}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0" data-testid="button-convert" onClick={handleConvert}>
            <BinaryIcon className="w-4 h-4 mr-2" />
            Convert
          </Button>
          <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" data-testid="button-clear" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {binaryBreakdown.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">ASCII Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <div className="flex gap-3 pb-2">
                  {binaryBreakdown.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 min-w-[100px] hover:border-cyan-500/30 transition-all"
                      data-testid={`binary-breakdown-${i}`}
                    >
                      <span className="text-3xl font-mono text-white">{item.char === ' ' ? '␣' : item.char}</span>
                      <span className="text-xs text-white/40 mt-2">ASCII: {item.ascii}</span>
                      <Badge className="font-mono text-xs mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                        {item.binary}
                      </Badge>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
          <CardContent className="pt-4">
            <p className="text-sm text-white/60">
              <strong className="text-cyan-400">Rules:</strong> Text→Binary uses 8-bit ASCII encoding. Binary→Text validates 
              that input consists of 8-bit blocks (multiples of 8 digits) containing only 0s and 1s.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
