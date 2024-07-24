### AutoForm Library

The AutoForm library is a React component that dynamically renders form fields based on a provided JSON schema using TypeScript and Vite. It supports various input types like text, number, date, radio buttons, and checkboxes, with built-in validation rules defined in the schema.

#### Key Features:
- **Dynamic Form Rendering**: Automatically generates form fields from a JSON schema.
- **Input Types**: Supports text, number, date, radio buttons, and checkboxes.
- **Validation**: Includes validation based on the schema's `required` fields.
- **State Management**: Utilizes React hooks for managing form state and handling submissions.

### Example Usage:

```tsx
import React from 'react';
import AutoForm from './components/AutoForm';
import { JSONSchema } from './types';

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

const App: React.FC = () => {
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

export default App;
```

This setup provides a flexible and reusable form component for various use cases.

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
