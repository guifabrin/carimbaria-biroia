import { useEffect, useState } from "react";
import Model0 from "./extends/C4910_0.svg";

import { Svg, createInput } from "./Components.tsx";

export default function C4910() {
  const [InputLinha1, linha1, fontLinha1] = createInput({
    label: "Linha 1: ",
    value: "Guilherme Fabrin",
    font: "Arimo",
  });
  const [InputLinha2, linha2, fontLinha2] = createInput({
    label: "Linha 2: ",
    value: "Analista de Sistemas",
    font: "Arimo",
  });
  const [InputLinha3, linha3, fontLinha3] = createInput({
    label: "Linha 3: ",
    value: "(99) 99999-9999",
    mask: "(99) 99999-9999",
    font: "Arimo",
  });

  const MODELS = {
    0: {
      name: "Simples",
      model: Model0,
      inputs: [InputLinha1, InputLinha2, InputLinha3],
    },
  };

  const [model, setModel] = useState(null);

  useEffect(() => {
    if (model == null) {
      setModel(0);
    }
  }, [model]);

  if (model == null) return <></>;

  const selectedModel = MODELS[model];

  return (
    <>
      <div>
        <label>Modelo: </label>
        <select value={model} onChange={({ target }) => setModel(target.value)}>
          {Object.keys(MODELS).map((index) => (
            <option key={`option${index}`} value={index}>
              {MODELS[index].name}
            </option>
          ))}
        </select>
      </div>
      {selectedModel.inputs}
      <Svg
        file={selectedModel.model}
        params={{
          linha1: {
            value: linha1,
            font: fontLinha1,
          },
          linha2: {
            value: linha2,
            font: fontLinha2,
          },
          linha3: {
            value: linha3,
            font: fontLinha3,
          },
        }}
      />
    </>
  );
}
