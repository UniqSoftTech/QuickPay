import { ParsedData } from './ParsedData';

interface DataObject {
  id: string;
  name: string;
  length: number;
  value: string;
  comment?: string;
  dataObjects?: DataObject[];
  [key: string]: unknown;
}

interface Specs {
  [key: string]: unknown;
  'templatesById'?: { [key: string]: Specs };
}

export class SGQRParser {
  private specs: Specs;
  private infoTemplate: Specs;

  private static ROOT_DATA_OBJECTS_BY_ID = 'rootDataObjectsById';
  private static INFO_TEMPLATE = 'infoTemplate';
  public static TEMPLATES_BY_ID = 'templatesById';
  private static ID = 'id';
  private static NAME = 'name';
  private static VALUE = 'value';
  private static COMMENT = 'comment';
  private static MAX_VALUE_LENGTH = 99;
  private static DATA_OBJECTS_BY_ID = 'dataObjectsById';
  private static IS_TEMPLATE = 'isTemplate';
  private static USES_INFO_TEMPLATE = 'usesInfoTemplate';
  private static DATA_OBJECTS = 'dataObjects';

  constructor(specs?: Specs) {
    this.specs = specs || {
      [SGQRParser.ROOT_DATA_OBJECTS_BY_ID]: {},
      [SGQRParser.INFO_TEMPLATE]: {},
      [SGQRParser.TEMPLATES_BY_ID]: {}
    };
    this.infoTemplate = this.specs[SGQRParser.INFO_TEMPLATE] as Specs;
  }

  parse(qrCode: string): DataObject[] {
    return this.extractDataObjects(qrCode);
  }

  assemble(dataObjects: DataObject[], isRecursiveCall: boolean = false): string {
    let result = '';

    for (const dataObject of dataObjects) {
      const id = dataObject[SGQRParser.ID as keyof DataObject] as string;
      let value = dataObject[SGQRParser.VALUE as keyof DataObject] as string;
      const subDataObjects = dataObject[SGQRParser.DATA_OBJECTS as keyof DataObject] as DataObject[] | undefined;

      if (!id || (value === '' && !subDataObjects)) {
        throw new Error(`Invalid data object: ${JSON.stringify(dataObject)}`);
      }

      if (subDataObjects) {
        value = this.assemble(subDataObjects, true);
      }

      const length = value.length;
      if (length > SGQRParser.MAX_VALUE_LENGTH) {
        throw new Error(`Value cannot be more than ${SGQRParser.MAX_VALUE_LENGTH} characters: ${JSON.stringify(dataObject)}`);
      }

      const section = id + length.toString().padStart(2, '0') + value;
      if (!section) {
        throw new Error(`Could not assemble data object: ${JSON.stringify(dataObject)}`);
      }

      result += section;
    }

    if (!isRecursiveCall) {
      const resultWithoutChecksum = result.slice(0, -4);
      result = resultWithoutChecksum + this.computeChecksum(resultWithoutChecksum);
    }

    return result;
  }

  computeChecksum(text: string, polynomialHex: number = 0x1021, initialValue: number = 0xFFFF): string {
    let result = initialValue;
    const length = text.length;

    if (length > 0) {
      for (let offset = 0; offset < length; offset++) {
        result ^= (text.charCodeAt(offset) << 8);
        for (let bitwise = 0; bitwise < 8; bitwise++) {
          if ((result <<= 1) & 0x10000) {
            result ^= polynomialHex;
          }
          result &= 0xFFFF;
        }
      }
    }

    return result.toString(16).toUpperCase().padStart(4, '0');
  }

  private extractDataObjects(text: string, specs?: Specs): DataObject[] {
    const result: DataObject[] = [];

    if (!specs) {
      specs = this.specs[SGQRParser.ROOT_DATA_OBJECTS_BY_ID] as Specs || {};
    }

    let index = 0;
    while (index < text.length) {
      const id = text.substr(index, 2);
      const length = parseInt(text.substr(index + 2, 2), 10);
      const value = text.substr(index + 4, length);
      index += 4 + length;

      result.push(this.analyzeDataObject(id, length, value, (specs?.[id] as Specs) ?? {}));
    }

    return result;
  }

  private analyzeDataObject(id: string, length: number, value: string, specs: Specs): DataObject {
    // Use empty object as default if specs is undefined
    specs = specs || {};

    const isTemplate = specs[SGQRParser.IS_TEMPLATE] || false;
    if (isTemplate) {
      specs = { ...specs, ...(this.specs[SGQRParser.TEMPLATES_BY_ID]?.[id] || {}) };
    }

    const usesInfoTemplate = specs[SGQRParser.USES_INFO_TEMPLATE] || false;
    if (usesInfoTemplate) {
      specs[SGQRParser.DATA_OBJECTS_BY_ID] = this.infoTemplate;
    }

    const result: DataObject = {
      id,
      name: (specs[SGQRParser.NAME] as string) || '',
      length,
      value,
      comment: specs[SGQRParser.COMMENT] as string | undefined,
    };

    if (isTemplate) {
      result[SGQRParser.DATA_OBJECTS] = this.extractDataObjects(value, (specs[SGQRParser.DATA_OBJECTS_BY_ID] || {}) as Specs);
    }

    return result;
  }
}

export const parseSGQR = (data: string): ParsedData => {
  const parser = new SGQRParser();
  const parsedData = parser.parse(data);
  console.log(parsedData);
  
  return {
    type: 'SGQR',
    rawData: JSON.stringify(parsedData),
    merchantId: parsedData.find(obj => obj.id === '59')?.value || '',
    amount: parsedData.find(obj => obj.id === '54')?.value || ''
  };
};
