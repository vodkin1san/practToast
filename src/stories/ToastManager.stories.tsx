import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import ToastContainer from '../components/Toast/ToastContainer';
import { toastManager } from '../components/Toast/ToastManager';

const meta: Meta = {
  title: 'Components/Demo',
  parameters: {
    layout: 'fullscreen',
  },
};
type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    return (
      <>
        <ToastContainer />

        <div
          style={{
            top: '20px',
            left: '20px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>Создать тосты:</h3>
          <button
            onClick={() => {
              toastManager
                .setPosition('bottom', 'left')
                .setType('info')
                .setTitle('Info Left bottom')
                .setDescription('Just first info')
                .setDuration(1000)
                .show();
            }}
          >
            Info Left bottom
          </button>
          <button
            onClick={() => {
              toastManager
                .setPosition('top', 'left')
                .setType('success')
                .setTitle('Success Left top')
                .setDescription('Just 2d info')
                .setDuration(1500)
                .show();
            }}
          >
            Success Left top
          </button>
          <button
            onClick={() => {
              toastManager
                .setPosition('bottom', 'right')
                .setType('warning')
                .setTitle('Warning Right 3d bottom')
                .setDescription('Just info')
                .setDuration(2000)
                .show();
            }}
          >
            Warning Right 3d bottom
          </button>
          <button
            onClick={() => {
              toastManager
                .setPosition('top', 'right')
                .setType('info')
                .setTitle('Info Right 4d top')
                .setDescription('Just info')
                .setDuration(2500)
                .show();
            }}
          >
            Just info
          </button>
        </div>
      </>
    );
  },
};

export default meta;
