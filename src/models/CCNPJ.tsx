import { useEffect, useState } from "react";
import Model0 from "./extends/CCNPJ_0.svg";
import Model1 from "./extends/CCNPJ_1.svg";

import { Svg, createInput } from "./Components.tsx";

export default function CCNPJ() {
  const [InputCNPJ, cnpj, fontCnpj] = createInput({
    label: "CNPJ: ",
    value: "00.000.000/0000-00",
    mask: "99.999.999/9999-99",
    font: "Courier New",
  });
  const [InputNome, nome, fontNome] = createInput({
    label: "Nome - Linha 1: ",
    value: "Razão social da empresa",
    font: "Courier New",
  });
  const [InputNome2, nome2, fontNome2] = createInput({
    label: "Nome - Linha 2: ",
    value: "",
    font: "Courier New",
  });
  const [InputRua, rua, fontRua] = createInput({
    label: "Rua: ",
    value: "Rua Ernestro Alves, 123",
    font: "Courier New",
  });
  const [InputCEIP, ciep, fontCiep] = createInput({
    label: "Cidade e Estado: ",
    value: "IJUÍ - RS",
    font: "Courier New",
  });
  const [InputCEP, cep, fontCep] = createInput({
    label: "CEP: ",
    value: "98.700-000",
    mask: "99.999-999",
    font: "Courier New",
  });
  const [InputIE, ie, fontIe] = createInput({
    label: "IE: ",
    value: "123456789",
    font: "Courier New",
  });

  const MODELS = {
    0: {
      name: "Simples",
      model: Model0,
      inputs: [InputCNPJ, InputNome, InputNome2, InputRua, InputCEIP, InputCEP],
    },
    1: {
      name: "Com inscrição estadual",
      model: Model1,
      inputs: [InputCNPJ, InputIE, InputNome, InputRua, InputCEIP, InputCEP],
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
          cnpj: {
            value: cnpj,
            font: fontCnpj,
          },
          nome: {
            value: nome,
            font: fontNome,
          },
          nome2: {
            value: nome2,
            font: fontNome2,
          },
          rua: {
            value: rua,
            font: fontRua,
          },
          ciep: {
            value: ciep,
            font: fontCiep,
          },
          cep: {
            value: cep,
            font: fontCep,
          },
          ie: {
            value: ie,
            font: fontIe,
          },
        }}
      />
    </>
  );
}
