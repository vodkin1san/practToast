// src/stories/TestComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import TestComponent from '../components/TestComponent';

const meta: Meta<typeof TestComponent> = {
  title: 'Example/TestComponent',
  component: TestComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Primary: Story = {
  args: {},
};
