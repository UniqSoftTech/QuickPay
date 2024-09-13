import { parse } from 'promptparse'
import { ParsedData } from './ParsedData';

export const parsePromptPay = (data: string): ParsedData => {
    const parsedData = parse(data);
    if (!parsedData) {
        throw new Error('Failed to parse data');
    }
    console.log(parsedData);
    
    return {
        type: 'PromptPay',
        rawData: JSON.stringify(parsedData),
        merchantId: parsedData.getTagValue('59') || '',
        amount: parsedData.getTagValue('54') || ''
    };
};
