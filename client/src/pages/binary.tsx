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
import { Trash2, ArrowRight, Binary as BinaryIcon } from 'lucide-react';

type Direction = 'text-to-binary' | 'binary-to-text';

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
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Conversion Direction</CardTitle>
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
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text-to-binary" id="text-to-binary" data-testid="radio-text-to-binary" />
                <Label htmlFor="text-to-binary" className="flex items-center gap-2 cursor-pointer">
                  <span>Text</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <BinaryIcon className="w-4 h-4 text-primary" />
                  <span>Binary</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="binary-to-text" id="binary-to-text" data-testid="radio-binary-to-text" />
                <Label htmlFor="binary-to-text" className="flex items-center gap-2 cursor-pointer">
                  <BinaryIcon className="w-4 h-4 text-primary" />
                  <span>Binary</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span>Text</span>
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
          />
          <TextAreaPanel
            label={direction === 'text-to-binary' ? 'Binary Output' : 'Text Output'}
            value={output}
            readOnly
            placeholder={getOutputPlaceholder()}
            testId="output"
            showCopyButton
            onCopy={handleCopy}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleConvert} data-testid="button-convert">
            <ArrowRight className="w-4 h-4 mr-2" />
            Convert
          </Button>
          <Button onClick={handleClear} variant="outline" data-testid="button-clear">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {binaryBreakdown.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ASCII Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {binaryBreakdown.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center p-3 rounded-md bg-muted/50 min-w-[90px]"
                      data-testid={`binary-breakdown-${i}`}
                    >
                      <span className="text-2xl font-mono">{item.char === ' ' ? '␣' : item.char}</span>
                      <span className="text-xs text-muted-foreground mt-1">ASCII: {item.ascii}</span>
                      <Badge variant="secondary" className="font-mono text-xs mt-2">
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

        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Rules:</strong> Text→Binary uses 8-bit ASCII encoding. Binary→Text validates 
              that input consists of 8-bit blocks (multiples of 8 digits) containing only 0s and 1s.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
