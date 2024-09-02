import React from 'react';

interface ParsedData {
  id: string;
  length: number;
  value: string;
  subTags?: ParsedData[];
}

const parsedData: ParsedData[] = [
  { id: '00', length: 2, value: '01' },
  { id: '01', length: 2, value: '11' },
  { id: '02', length: 16, value: '4787720001476526' },
  { id: '04', length: 15, value: '530392000147682' },
  { id: '15', length: 31, value: '3430076400520446401220163757001' },
  { id: '30', length: 81, value: '0016A00000067701011201150107536000315080214KB0000017816480320KPS004KB000001781648', subTags: [] },
  { id: '31', length: 69, value: '0016A00000067701011301030040214KB0000017816480420KPS004KB000001781648', subTags: [] },
  { id: '51', length: 43, value: '0014A00000000410100106416971021112345678901', subTags: [] },
  { id: '52', length: 4, value: '5451' },
  { id: '53', length: 3, value: '764' },
  { id: '58', length: 2, value: 'TH' },
  { id: '59', length: 19, value: 'SEED OF HOPE COFFEE' },
  { id: '60', length: 4, value: 'CITY' },
  { id: '62', length: 24, value: '050849270381070842016375', subTags: [] },
  { id: '63', length: 4, value: 'CB82' },
];

const ParsedDataDisplay: React.FC = () => {
  return (
    <div>
      <h1>Parsed Data</h1>
      <ul>
        {parsedData.map((data, index) => (
          <li key={index}>
            <strong>ID:</strong> {data.id}, <strong>Length:</strong> {data.length}, <strong>Value:</strong> {data.value}
            {data.subTags && data.subTags.length > 0 && (
              <ul>
                {data.subTags.map((subTag, subIndex) => (
                  <li key={subIndex}>
                    <strong>SubTag ID:</strong> {subTag.id}, <strong>Length:</strong> {subTag.length}, <strong>Value:</strong> {subTag.value}
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

export default ParsedDataDisplay;
