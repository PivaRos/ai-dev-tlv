'use client';

type ColorPreviewProps = {
  rgb: string;
};

function ColorPreview({ rgb }: ColorPreviewProps) {
  const rgbArray = rgb.split(',').map(Number);
  const backgroundColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;

  return (
      <div
          className="w-32 h-32"
          style={{ backgroundColor }}
      ></div>
  );
}

export default ColorPreview;
