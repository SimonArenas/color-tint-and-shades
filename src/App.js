import { useState } from "react";
import { ChromePicker } from "react-color";
import convert from "color-convert";
import "./App.css";

function App() {
  const [colorWasCopied, setColorWasCopied] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [selectedColor, setSelectedColor] = useState({});
  const [shadeColors, setShadeColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tintColors, setTintColors] = useState([]);
  const shadeColorsArray = [];
  const tintColorsArray = [];

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleChangeComplete = (color) => {
    setIsSend(false);
    setSelectedColor(color.rgb);
  };

  const calculateTintsAndShades = (color) => {
    let base = 255;
    let TintPercentage = 0.0;
    let ShadePercentage = 1;

    // Tints
    for (let index = 0; index < 9; index++) {
      let red = (base - color.r) * TintPercentage;
      red = Math.round(color.r + red);

      let green = (base - color.g) * TintPercentage;
      green = Math.round(color.g + green);

      let blue = (base - color.b) * TintPercentage;
      blue = Math.round(color.b + blue);

      tintColorsArray.push({ r: red, g: green, b: blue });
      TintPercentage = TintPercentage + 0.1;
    }
    setTintColors(tintColorsArray);

    // Shades
    for (let index = 0; index < 9; index++) {
      let red = Math.round(color.r * ShadePercentage);
      let green = Math.round(color.g * ShadePercentage);
      let blue = Math.round(color.b * ShadePercentage);

      shadeColorsArray.push({ r: red, g: green, b: blue });
      ShadePercentage = ShadePercentage - 0.1;
    }
    setShadeColors(shadeColorsArray);
  };

  const generatePaletteColor = () => {
    calculateTintsAndShades(selectedColor);
    setIsSend(true);
  };

  const copyColorToClickboard = ({ r, g, b }) => {
    setColorWasCopied(true);
    setTimeout(() => {
      setColorWasCopied(false);
    }, 3000);
    let conversion = convert.rgb.hex(r, g, b);
    navigator.clipboard.writeText(`#${conversion}`);
  };

  return (
    <div className="App">
      <button className="button" onClick={toggleColorPicker}>
        {!showColorPicker ? "Open color picker" : "Close color picker"}
      </button>
      {showColorPicker && (
        <ChromePicker
          color={selectedColor}
          onChangeComplete={handleChangeComplete}
        />
      )}
      {showColorPicker && (
        <button className="button" onClick={generatePaletteColor}>
          Generate
        </button>
      )}

      {isSend && showColorPicker && (
        <>
          <div className="palette">
            {tintColors.map((color, index) => (
              <div key={index}>
                <p className="percentage">{index > 0 ? `${index}0%` : "0%"}</p>
                <div
                  style={{
                    backgroundColor: `rgb(${color.r},${color.g}, ${color.b})`,
                    width: 120,
                    height: 120,
                    cursor: "pointer",
                  }}
                  onClick={() => copyColorToClickboard(color)}
                ></div>
              </div>
            ))}
          </div>
          <div className="palette">
            {shadeColors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: `rgb(${color.r},${color.g}, ${color.b})`,
                  width: 120,
                  height: 120,
                  cursor: "pointer",
                }}
                onClick={() => copyColorToClickboard(color)}
              ></div>
            ))}
          </div>
          <h3 style={{ color: "#e74c3c" }}>
            Click any color to copy to the clipboard
          </h3>
          {colorWasCopied && <h3 className="copied">Color was copied!</h3>}
        </>
      )}
    </div>
  );
}

export default App;
