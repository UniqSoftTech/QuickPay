import React from 'react';
import { ParsedData } from '../utils/parsers/ParsedData';

interface RawDataItem {
  id: string;
  name: string;
  value: string;
  dataObjects?: Array<{ id: string; name: string; value: string }>;
}

interface SGQRDisplayProps {
  parsedData: ParsedData;
}

const SGQRDisplay: React.FC<SGQRDisplayProps> = ({ parsedData }) => {
  // Convert the rawData string to an array
  const rawDataArray = JSON.parse(parsedData.rawData || '[]');

  return (
    <div>
      <h2>SGQR Data</h2>
      <p>Type: {parsedData.type}</p>
      <p>Merchant ID: {parsedData.merchantId}</p>
      <p>Amount: {parsedData.amount}</p>
      <h3>Raw Data:</h3>
      <ul>
        {rawDataArray.map((item: RawDataItem, index: number) => (
          <li key={index}>
            ID: {item.id}, Name: {item.name}, Value: {item.value}
            {item.dataObjects && (
              <ul>
                {item.dataObjects.map((subItem: { id: string; name: string; value: string }, subIndex: number) => (
                  <li key={`${index}-${subIndex}`}>
                    ID: {subItem.id}, Name: {subItem.name}, Value: {subItem.value}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SGQRDisplay;