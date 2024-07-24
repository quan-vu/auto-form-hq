import React, { useState } from 'react';
import { JSONSchema, JSONSchemaProperty } from '../types';

interface AutoFormProps {
  schema: JSONSchema;
  onSubmit: (data: { [key: string]: any }) => void;
}

const AutoForm: React.FC<AutoFormProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const errors = validateForm(schema, formData);
    if (Object.keys(errors).length > 0) {
      alert('Form contains errors: ' + JSON.stringify(errors));
      return;
    }
    
    onSubmit(formData);
  };
  
  const validateForm = (schema: JSONSchema, formData: { [key: string]: any }) => {
    const errors: { [key: string]: string } = {};
    
    if (schema.required) {
      schema.required.forEach((field) => {
        if (!formData[field]) {
          errors[field] = 'This field is required';
        }
      });
    }
    
    return errors;
  };
  

  const renderField = (key: string, property: JSONSchemaProperty) => {
    switch (property.type) {
      case 'string':
        return (
          <div key={key}>
            <label>{property.title || key}</label>
            <input
              type="text"
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        );
      case 'number':
        return (
          <div key={key}>
            <label>{property.title || key}</label>
            <input
              type="number"
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, parseFloat(e.target.value))}
            />
          </div>
        );
      case 'date':
        return (
          <div key={key}>
            <label>{property.title || key}</label>
            <input
              type="date"
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        );
      case 'boolean':
        return (
          <div key={key}>
            <label>{property.title || key}</label>
            <input
              type="checkbox"
              checked={!!formData[key]}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
          </div>
        );
      case 'radio':
        return (
          <div key={key}>
            <label>{property.title || key}</label>
            {property.enum?.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name={key}
                  value={option}
                  checked={formData[key] === option}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div key={key}>
            <label>{property.title || key}</label>
            {property.enum?.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  name={key}
                  value={option}
                  checked={Array.isArray(formData[key]) && formData[key].includes(option)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => {
                      const existingValues = Array.isArray(prev[key]) ? prev[key] : [];
                      if (e.target.checked) {
                        return { ...prev, [key]: [...existingValues, value] };
                      } else {
                        return { ...prev, [key]: existingValues.filter((v) => v !== value) };
                      }
                    });
                  }}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(schema.properties).map((key) =>
        renderField(key, schema.properties[key])
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AutoForm;
