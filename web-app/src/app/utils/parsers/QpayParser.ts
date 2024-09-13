import { ParsedData } from './ParsedData';

export const parseQpay = (data: string): ParsedData => {
  // This is a simplified parser and should be expanded for production use
  const parts = data.split(':');
  return { type: 'Qpay', merchantId: parts[1], amount: parts[2] };
};
