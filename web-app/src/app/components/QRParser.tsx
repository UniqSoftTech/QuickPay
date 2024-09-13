'use client';

import React, { useState } from 'react';
import { QrReader, OnResultFunction } from '@cmdnio/react-qr-reader';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { ParsedData } from '../utils/parsers/ParsedData';
import { parseQRCode } from '../utils/QRParser';
import SGQRDisplay from './SGQRDisplay';

const QRParser: React.FC = () => {
  const [result, setResult] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResult: OnResultFunction = (result, error) => {
    if (result) {
      try {
        const parsedData = parseQRCode(result.getText());
        setResult(parsedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } else if (error) {
      setError('Error scanning QR code');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">QuickPay</h1>
      <div className="mb-4">
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
          containerStyle={{ width: '100%' }}
        />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <AlertCircle className="h-4 w-4 inline mr-2" />
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <CheckCircle className="h-4 w-4 inline mr-2" />
          {result.type === 'SGQR' && <SGQRDisplay parsedData={result} />}
        </div>
      )}
    </div>
  );
};

export default QRParser;