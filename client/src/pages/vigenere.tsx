import { useState, useMemo } from 'react';
import { CipherLayout } from '@/components/cipher-layout';
import { TextAreaPanel } from '@/components/text-area-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vigenereEncrypt, vigenereDecrypt, getVigenereTable, getVigenereSteps, type VigenereStep } from '@/lib/ciphers';
import { useToast } from '@/hooks/use-toast';
import { Lock, Unlock, Trash2, Lightbulb, Table } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function VigenereCipher() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [steps, setSteps] = useState<VigenereStep[]>([]);
  const [highlightedCell, setHighlightedCell] = useState<{ row: number; col: number } | null>(null);
  const { toast } = useToast();

  const table = useMemo(() => getVigenereTable(), []);

  const handleEncrypt = () => {
    if (!keyword.trim()) {
      toast({
        title: 'Keyword Required',
        description: 'Please enter a keyword for encryption',
        variant: 'destructive',
      });
      return;
    }
    const result = vigenereEncrypt(input, keyword);
    setOutput(result);
    setSteps(getVigenereSteps(input, keyword, true));
    toast({
      title: 'Encrypted!',
      description: `Text encrypted with keyword "${keyword.toUpperCase()}"`,
    });
  };

  const handleDecrypt = () => {
    if (!keyword.trim()) {
      toast({
        title: 'Keyword Required',
        description: 'Please enter a keyword for decryption',
        variant: 'destructive',
      });
      return;
    }
    const result = vigenereDecrypt(input, keyword);
    setOutput(result);
    setSteps(getVigenereSteps(input, keyword, false));
    toast({
      title: 'Decrypted!',
      description: `Text decrypted with keyword "${keyword.toUpperCase()}"`,
    });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setKeyword('');
    setSteps([]);
    setHighlightedCell(null);
  };

  const handleCopy = () => {
    toast({
      title: 'Copied!',
      description: 'Output copied to clipboard',
    });
  };

  const loadExample = () => {
    setInput('ATTACK TONIGHT');
    setKeyword('LEMON');
    toast({
      title: 'Example Loaded',
      description: 'Classic example: "ATTACK TONIGHT" with keyword "LEMON"',
    });
  };

  return (
    <CipherLayout
      title="Vigenère Cipher"
      description="A polyalphabetic substitution cipher using a keyword. Each letter of the keyword determines the shift for corresponding plaintext letters."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Keyword Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Encryption Keyword</Label>
              <div className="flex gap-3 flex-wrap">
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                  placeholder="Enter keyword (e.g., LEMON)"
                  className="flex-1 font-mono uppercase min-w-[200px]"
                  data-testid="input-keyword"
                />
                <Button variant="outline" onClick={loadExample} data-testid="button-load-example">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Load Example
                </Button>
              </div>
              {keyword && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Key sequence:</span>
                  {keyword.replace(/[^A-Z]/gi, '').split('').map((char, i) => (
                    <Badge key={i} variant="secondary" className="font-mono">
                      {char}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaPanel
            label="Input"
            value={input}
            onChange={setInput}
            placeholder="Enter plaintext or ciphertext..."
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

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table" data-testid="tab-table">
              <Table className="w-4 h-4 mr-2" />
              Vigenère Table
            </TabsTrigger>
            <TabsTrigger value="breakdown" data-testid="tab-breakdown">
              Step-by-Step Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">26×26 Vigenère Table</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Row = Key letter, Column = Plaintext letter, Cell = Ciphertext letter
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full">
                  <div className="inline-block">
                    <table className="border-collapse" data-testid="vigenere-table">
                      <thead>
                        <tr>
                          <th className="w-8 h-8 text-xs font-bold text-primary bg-primary/5 border border-border"></th>
                          {ALPHABET.split('').map((letter, i) => (
                            <th
                              key={i}
                              className={`w-8 h-8 text-xs font-bold text-center border border-border transition-colors ${
                                highlightedCell?.col === i
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-primary/5 text-primary'
                              }`}
                            >
                              {letter}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            <th
                              className={`w-8 h-8 text-xs font-bold text-center border border-border transition-colors ${
                                highlightedCell?.row === rowIdx
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-primary/5 text-primary'
                              }`}
                            >
                              {ALPHABET[rowIdx]}
                            </th>
                            {row.map((cell, colIdx) => (
                              <td
                                key={colIdx}
                                className={`w-8 h-8 text-xs text-center border border-border font-mono transition-colors ${
                                  highlightedCell?.row === rowIdx && highlightedCell?.col === colIdx
                                    ? 'bg-primary text-primary-foreground font-bold'
                                    : highlightedCell?.row === rowIdx || highlightedCell?.col === colIdx
                                    ? 'bg-primary/20'
                                    : 'bg-card hover:bg-muted/50'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Character-by-Character Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {steps.length > 0 ? (
                  <ScrollArea className="w-full">
                    <div className="flex gap-1 pb-2">
                      {steps.map((step, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center p-2 rounded-md bg-muted/50 min-w-[60px] cursor-pointer hover-elevate transition-all"
                          onMouseEnter={() => setHighlightedCell({ row: step.row, col: step.col })}
                          onMouseLeave={() => setHighlightedCell(null)}
                          data-testid={`step-${i}`}
                        >
                          <span className="text-xs text-muted-foreground">Plain</span>
                          <span className="font-mono font-bold text-lg">{step.plainChar}</span>
                          <span className="text-xs text-muted-foreground mt-1">Key</span>
                          <Badge variant="secondary" className="font-mono">
                            {step.keyChar}
                          </Badge>
                          <span className="text-xs text-muted-foreground mt-1">Result</span>
                          <span className="font-mono font-bold text-lg text-primary">{step.resultChar}</span>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Encrypt or decrypt a message to see the step-by-step breakdown
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Rules:</strong> Keyword required, key repeats for message length, uses mod-26 arithmetic, 
              preserves case, symbols and numbers remain unchanged.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
