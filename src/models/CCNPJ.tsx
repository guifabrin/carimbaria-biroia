import { useState } from "react";

import { Svg, Input } from "./Components.tsx";
import * as PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export default function CCNPJ({ frameId, models, types, type: _type }) {
  const [model, setModel] = useState(0);
  const [type, setType] = useState(_type);
  const [params, setParams] = useState({
    cnpj: {
      value: "00.000.000/0000-00",
      font: "Courier New",
    },
    nome: {
      value: "Razão social da empresa",
      font: "Courier New",
    },
    nome2: {
      value: "",
      font: "Courier New",
    },
    rua: {
      value: "Rua Ernestro Alves, 123",
      font: "Courier New",
    },
    ciep: {
      value: "IJUÍ - RS",
      font: "Courier New",
    },
    cep: {
      value: "98.700-000",
      font: "Courier New",
    },
    ie: {
      value: "123456789",
      font: "Courier New",
    },
  });
  const onValueChange = (key, value) => {
    params[key].value = value;
    setParams({ ...params });
  };

  const onFontChange = (key, font) => {
    params[key].font = font;
    setParams({ ...params });
  };
  const [inputs] = useState([
    <Input
      key={"cnpj"}
      label={"CNPJ: "}
      {...params.cnpj}
      onValueChange={(value) => onValueChange("cnpj", value)}
      onFontChange={(font) => onFontChange("cnpj", font)}
      mask={"999.999/9999-99"}
    />,
    <Input
      key={"nome"}
      label={"Nome - Linha 1"}
      {...params.nome}
      onValueChange={(value) => onValueChange("nome", value)}
      onFontChange={(font) => onFontChange("nome", font)}
    />,
    <Input
      key={"nome2"}
      label={"Nome - Linha 2"}
      {...params.nome2}
      onValueChange={(value) => onValueChange("nome2", value)}
      onFontChange={(font) => onFontChange("nome2", font)}
    />,
    <Input
      key={"rua"}
      label={"Rua"}
      {...params.rua}
      onValueChange={(value) => onValueChange("rua", value)}
      onFontChange={(font) => onFontChange("rua", font)}
    />,
    <Input
      key={"ciep"}
      label={"Cidade e Estado: "}
      {...params.ciep}
      onValueChange={(value) => onValueChange("ciep", value)}
      onFontChange={(font) => onFontChange("ciep", font)}
    />,
    <Input
      key={"cep"}
      label={"CEP: "}
      {...params.cep}
      onValueChange={(value) => onValueChange("cep", value)}
      onFontChange={(font) => onFontChange("cep", font)}
      mask={"99.999-999"}
    />,
    <Input
      key={"ie"}
      label={"IE: "}
      {...params.ie}
      onValueChange={(value) => onValueChange("ie", value)}
      onFontChange={(font) => onFontChange("ie", font)}
    />,
  ]);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Modelo: </Form.Label>
        <Form.Select
          value={model}
          onChange={({ target }) => {
            setModel(+target.value);
          }}
        >
          {Object.keys(models).map((index) => (
            <option key={`option${index}`} value={index}>
              {models[index].name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Tipo: </Form.Label>
        <Form.Select
          value={type}
          onChange={({ target }) => setType(target.value)}
        >
          {Object.keys(types).map((index) => (
            <option key={`option_${index}`} value={index}>
              {types[index]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {inputs}
      <div className={"d-flex"}>
        <div className={"img-flow"}>
          <img src={`./models/CCNPJ_${type}.jpg`} />
        </div>
        <Svg file={models[model].model} frameId={frameId} params={params} />
      </div>
    </Form>
  );
}

CCNPJ.propTypes = {
  frameId: PropTypes.string,
  models: PropTypes.any,
  types: PropTypes.any,
  type: PropTypes.any,
};
