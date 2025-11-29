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
import { Lock, Unlock, Trash2, Lightbulb, Table, Grid3X3 } from 'lucide-react';

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
      gradientFrom="from-violet-500"
      gradientTo="to-purple-600"
    >
      <div className="space-y-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-violet-400" />
              Keyword Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-white/70">Encryption Keyword</Label>
              <div className="flex gap-3 flex-wrap">
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                  placeholder="Enter keyword (e.g., LEMON)"
                  className="flex-1 font-mono uppercase min-w-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                  data-testid="input-keyword"
                />
                <Button variant="outline" onClick={loadExample} className="border-violet-500/50 text-violet-300 hover:bg-violet-500/20 hover:text-violet-200" data-testid="button-load-example">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Load Example
                </Button>
              </div>
              {keyword && (
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  <span className="text-sm text-white/50">Key sequence:</span>
                  {keyword.replace(/[^A-Z]/gi, '').split('').map((char, i) => (
                    <Badge key={i} className="font-mono bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0">
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
          <Button onClick={handleEncrypt} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0" data-testid="button-encrypt">
            <Lock className="w-4 h-4 mr-2" />
            Encrypt
          </Button>
          <Button onClick={handleDecrypt} className="bg-white/10 hover:bg-white/20 text-white border-white/20" data-testid="button-decrypt">
            <Unlock className="w-4 h-4 mr-2" />
            Decrypt
          </Button>
          <Button onClick={handleClear} variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" data-testid="button-clear">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger value="table" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300 text-white/60" data-testid="tab-table">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Vigenère Table
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300 text-white/60" data-testid="tab-breakdown">
              Step-by-Step Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-4">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">26×26 Vigenère Table</CardTitle>
                <p className="text-sm text-white/50">
                  Row = Key letter, Column = Plaintext letter, Cell = Ciphertext letter
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full">
                  <div className="inline-block">
                    <table className="border-collapse" data-testid="vigenere-table">
                      <thead>
                        <tr>
                          <th className="w-7 h-7 text-xs font-bold text-violet-400 bg-violet-500/10 border border-white/10"></th>
                          {ALPHABET.split('').map((letter, i) => (
                            <th
                              key={i}
                              className={`w-7 h-7 text-xs font-bold text-center border border-white/10 transition-colors ${
                                highlightedCell?.col === i
                                  ? 'bg-violet-500 text-white'
                                  : 'bg-violet-500/10 text-violet-400'
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
                              className={`w-7 h-7 text-xs font-bold text-center border border-white/10 transition-colors ${
                                highlightedCell?.row === rowIdx
                                  ? 'bg-violet-500 text-white'
                                  : 'bg-violet-500/10 text-violet-400'
                              }`}
                            >
                              {ALPHABET[rowIdx]}
                            </th>
                            {row.map((cell, colIdx) => (
                              <td
                                key={colIdx}
                                className={`w-7 h-7 text-xs text-center border border-white/10 font-mono transition-colors ${
                                  highlightedCell?.row === rowIdx && highlightedCell?.col === colIdx
                                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold'
                                    : highlightedCell?.row === rowIdx || highlightedCell?.col === colIdx
                                    ? 'bg-violet-500/30 text-white'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10'
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
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Character-by-Character Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {steps.length > 0 ? (
                  <ScrollArea className="w-full">
                    <div className="flex gap-2 pb-2">
                      {steps.map((step, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 min-w-[70px] cursor-pointer transition-all"
                          onMouseEnter={() => setHighlightedCell({ row: step.row, col: step.col })}
                          onMouseLeave={() => setHighlightedCell(null)}
                          data-testid={`step-${i}`}
                        >
                          <span className="text-xs text-white/40">Plain</span>
                          <span className="font-mono font-bold text-xl text-white">{step.plainChar}</span>
                          <span className="text-xs text-white/40 mt-2">Key</span>
                          <Badge className="font-mono bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0">
                            {step.keyChar}
                          </Badge>
                          <span className="text-xs text-white/40 mt-2">Result</span>
                          <span className="font-mono font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{step.resultChar}</span>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                ) : (
                  <p className="text-center text-white/40 py-8">
                    Encrypt or decrypt a message to see the step-by-step breakdown
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/20">
          <CardContent className="pt-4">
            <p className="text-sm text-white/60">
              <strong className="text-violet-400">Rules:</strong> Keyword required, key repeats for message length, uses mod-26 arithmetic, 
              preserves case, symbols and numbers remain unchanged.
            </p>
          </CardContent>
        </Card>
      </div>
    </CipherLayout>
  );
}
