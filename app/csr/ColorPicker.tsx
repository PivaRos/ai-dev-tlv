'use client';

import React, { useState } from 'react';

type ColorPickerProps = {
  onColorSelected: (rgb:string) => void;
  colorFamily: string;
};

function ColorPicker({ onColorSelected }: ColorPickerProps) {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRgb(prevColor => ({
      ...prevColor,
      [name]: Number(value),
    }));
  };

  const submitSelectedColor = () => {
    const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    onColorSelected(rgbString);
  };

  return (
      <div className="flex flex-col items-center p-4">
        <div
            className="w-32 h-32"
            style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
        ></div>
        <div className="mt-4 w-full">
          <label>R: {rgb.r}</label>
          <input
              type="range"
              name="r"
              min="0"
              max="255"
              value={rgb.r}
              onChange={handleColorChange}
              className="w-full"
          />
        </div>
        <div className="mt-4 w-full">
          <label>G: {rgb.g}</label>
          <input
              type="range"
              name="g"
              min="0"
              max="255"
              value={rgb.g}
              onChange={handleColorChange}
              className="w-full"
          />
        </div>
        <div className="mt-4 w-full">
          <label>B: {rgb.b}</label>
          <input
              type="range"
              name="b"
              min="0"
              max="255"
              value={rgb.b}
              onChange={handleColorChange}
              className="w-full"
          />
        </div>
        <button
            type="button"
            onClick={submitSelectedColor}
            className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </div>
  );
}

export default ColorPicker;
