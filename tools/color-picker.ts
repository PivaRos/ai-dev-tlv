import { tool as createTool } from 'ai';
import { z } from 'zod';

export const chooseColor = createTool({
  description: 'Display a color picker to help you choose a color from a color family',
  parameters: z.object({
    colorFamily: z.string(),
  }),
  execute: async function ({colorFamily}) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { colorFamily};
  },
});

export const suggestedColor = createTool({
  description: 'Display a color preview from RGB values',
  parameters: z.object({
    rgb: z.string(),
  }),
  execute: async function ({ rgb }) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const reversedRgb = rgb.split(',').reverse().join(',');
    return { rgbString: reversedRgb};
  },
});


export const tools = {
  chooseColor,
  suggestedColor
};
