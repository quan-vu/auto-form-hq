import React from 'react';
import AutoForm from '../components/AutoForm';
import { JSONSchema } from '../types';

const schema: JSONSchema = {
  title: "User Registration",
  type: "object",
  properties: {
    name: { type: "string", title: "Name" },
    age: { type: "number", title: "Age" },
    birthDate: { type: "date", title: "Birth Date" },
    gender: { type: "radio", title: "Gender", enum: ["Male", "Female", "Other"] },
    interests: { type: "checkbox", title: "Interests", enum: ["Reading", "Traveling", "Cooking"] }
  },
  required: ["name", "age"]
};

const AutoFormDemo1: React.FC = () => {
  const handleSubmit = (data: { [key: string]: any }) => {
    console.log("Form Data Submitted: ", data);
  };

  return (
    <div>
      <h1>{schema.title}</h1>
      <AutoForm schema={schema} onSubmit={handleSubmit} />
    </div>
  );
};

export default AutoFormDemo1;
