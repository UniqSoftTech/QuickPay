import { ParsedData } from './parsers/ParsedData';
import { parsePromptPay} from './parsers/PromptPayParser';
import { parseSGQR } from './parsers/SGQRParser';
import { parseQpay } from './parsers/QpayParser';

export const parseQRCode = (data: string): ParsedData => {
  console.log(data);

  if (data.startsWith('00020101')) {
    console.log('SGQR');
    return parseSGQR(data);
  } else if (data.startsWith('SGQR')) {
    console.log('PromptPay');
    return parsePromptPay(data);
  } else if (data.startsWith('QPay')) {
    console.log('QPay');
    return parseQpay(data);
  } else {
    throw new Error('Unsupported QR code format');
  }
};
