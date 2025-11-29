const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function caesarEncrypt(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26;
  return text
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const charCode = char.charCodeAt(0);
        const shifted = ((charCode - base + normalizedShift) % 26) + base;
        return String.fromCharCode(shifted);
      }
      return char;
    })
    .join('');
}

export function caesarDecrypt(text: string, shift: number): string {
  return caesarEncrypt(text, -shift);
}

export function caesarBruteForce(text: string): { shift: number; result: string }[] {
  return Array.from({ length: 26 }, (_, i) => ({
    shift: i,
    result: caesarDecrypt(text, i),
  }));
}

export function vigenereEncrypt(text: string, keyword: string): string {
  if (!keyword) return text;
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key) return text;

  let keyIndex = 0;
  return text
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65;
        const encrypted = (charCode + keyChar) % 26;
        keyIndex++;
        const result = String.fromCharCode(encrypted + 65);
        return isUpperCase ? result : result.toLowerCase();
      }
      return char;
    })
    .join('');
}

export function vigenereDecrypt(text: string, keyword: string): string {
  if (!keyword) return text;
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key) return text;

  let keyIndex = 0;
  return text
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65;
        const decrypted = ((charCode - keyChar + 26) % 26);
        keyIndex++;
        const result = String.fromCharCode(decrypted + 65);
        return isUpperCase ? result : result.toLowerCase();
      }
      return char;
    })
    .join('');
}

export function getVigenereTable(): string[][] {
  return Array.from({ length: 26 }, (_, row) =>
    Array.from({ length: 26 }, (_, col) =>
      ALPHABET[(row + col) % 26]
    )
  );
}

export interface VigenereStep {
  plainChar: string;
  keyChar: string;
  resultChar: string;
  row: number;
  col: number;
}

export function getVigenereSteps(text: string, keyword: string, isEncrypt: boolean): VigenereStep[] {
  if (!keyword) return [];
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key) return [];

  const steps: VigenereStep[] = [];
  let keyIndex = 0;

  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const plainChar = char.toUpperCase();
      const keyChar = key[keyIndex % key.length];
      const plainIndex = plainChar.charCodeAt(0) - 65;
      const keyIndex2 = keyChar.charCodeAt(0) - 65;

      let resultIndex: number;
      if (isEncrypt) {
        resultIndex = (plainIndex + keyIndex2) % 26;
      } else {
        resultIndex = ((plainIndex - keyIndex2 + 26) % 26);
      }

      steps.push({
        plainChar,
        keyChar,
        resultChar: ALPHABET[resultIndex],
        row: isEncrypt ? keyIndex2 : resultIndex,
        col: isEncrypt ? plainIndex : keyIndex2,
      });
      keyIndex++;
    }
  }

  return steps;
}

export function atbashCipher(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const transformed = 25 - charCode;
        const result = String.fromCharCode(transformed + 65);
        return isUpperCase ? result : result.toLowerCase();
      }
      return char;
    })
    .join('');
}

export function textToBinary(text: string): string {
  return text
    .split('')
    .map((char) => {
      const binary = char.charCodeAt(0).toString(2);
      return binary.padStart(8, '0');
    })
    .join(' ');
}

export function binaryToText(binary: string): string {
  const cleaned = binary.replace(/\s+/g, '');
  
  if (cleaned.length % 8 !== 0) {
    return 'Error: Binary string must have complete 8-bit blocks';
  }
  
  if (!/^[01]*$/.test(cleaned)) {
    return 'Error: Binary string must contain only 0s and 1s';
  }

  const bytes = cleaned.match(/.{8}/g);
  if (!bytes) return '';

  return bytes
    .map((byte) => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}

export function reverseString(text: string): string {
  return text.split('').reverse().join('');
}

export function reverseWords(text: string): string {
  return text
    .split(/(\s+)/)
    .map((part) => {
      if (/\s+/.test(part)) return part;
      return part.split('').reverse().join('');
    })
    .join('');
}
