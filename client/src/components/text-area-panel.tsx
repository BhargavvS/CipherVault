import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface TextAreaPanelProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  testId: string;
  showCharCount?: boolean;
  showCopyButton?: boolean;
  onCopy?: () => void;
  rows?: number;
  accentClass?: string;
}

export function TextAreaPanel({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  testId,
  showCharCount = true,
  showCopyButton = false,
  onCopy,
  rows = 6,
  accentClass = 'focus:border-white/30 focus:ring-white/10',
}: TextAreaPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium uppercase tracking-wide text-white/60">
          {label}
        </Label>
        {showCopyButton && value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-white/60 hover:text-white hover:bg-white/10"
            data-testid={`button-copy-${testId}`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>
      <Textarea
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        className={`font-mono text-sm resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 ${accentClass}`}
        data-testid={`textarea-${testId}`}
      />
      {showCharCount && (
        <p className="text-xs text-white/40 text-right">
          {value.length} character{value.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
