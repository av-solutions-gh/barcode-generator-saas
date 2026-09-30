export const BARCODE_TYPES = {
    CODE128: { id: 'code128', name: 'Code 128', category: 'Standard' },
    EAN13: { id: 'ean13', name: 'EAN-13', category: 'Retail' },
    UPCA: { id: 'upca', name: 'UPC-A', category: 'Retail' },
    CODE39: { id: 'code39', name: 'Code 39', category: 'Industrial' },
    GTIN: { id: 'gtin', name: 'GTIN', category: 'Logistics' },
    GS1_SSCC18: { id: 'gs1_sscc18', name: 'GS1 SSCC-18', category: 'Logistics' }
};

export const LABEL_OPTIONS = {
    BARCODE: 'barcode_labels',
    NO_BARCODE: 'text_only_labels'
};