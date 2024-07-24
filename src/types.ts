export interface JSONSchema {
  title?: string;
  description?: string;
  type: string;
  properties: {
    [key: string]: JSONSchemaProperty;
  };
  required?: string[];
}

export interface JSONSchemaProperty {
  type: string;
  title?: string;
  description?: string;
  enum?: string[]; // for radio and checkbox options
}


