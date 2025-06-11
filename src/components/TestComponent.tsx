// src/components/TestComponent.tsx
import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid blue', backgroundColor: 'lightblue' }}>
      <h2>Hello from Test Component!</h2>
      <p>This is a simple component to check Storybook build.</p>
    </div>
  );
};

export default TestComponent;
