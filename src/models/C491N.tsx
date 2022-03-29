import { useEffect, useState } from "react";

import { Svg, Input } from "./Components.tsx";
import * as PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export default function C491N({
  frameId,
  types,
  models = [],
  model: _model = 0,
  color: _color = "black",
  suffix = "",
}) {
  const [inputs, setInputs] = useState(null);

  const [model, setModel] = useState(_model || 0);
  const [color, setColor] = useState(_color);
  const [params, setParams] = useState(null);
  const [printableInputs, setPrintableInputs] = useState([]);

  const onValueChange = (key, value) => {
    params[key].value = value;
    setParams({ ...params });
  };

  const onFontChange = (key, font) => {
    params[key].font = font;
    setParams({ ...params });
  };

  const max_lines = Math.max.apply(
    null,
    Object.values(models).map((item) => item.lines)
  );
  useEffect(() => {
    if (!params) {
      const _params = {};
      for (let index = 0; index < max_lines; index++) {
        const key = `LINHA${index + 1}`;
        _params[key] = {
          value: `Lorem ipsum dolor sit amet`,
          font: `Arimo`,
        };
      }
      setParams({ ..._params });
    }
  });

  useEffect(() => {
    if (!inputs && params) {
      const _inputs = [];
      for (let index = 0; index < max_lines; index++) {
        const key = `LINHA${index + 1}`;
        _inputs.push(
          <Input
            label={`Linha ${index + 1}: `}
            {...params[key]}
            key={key}
            onFontChange={(font) => onFontChange(key, font)}
            onValueChange={(value) => onValueChange(key, value)}
          />
        );
      }
      setInputs(_inputs);
    }
  });

  useEffect(() => {
    if (inputs && printableInputs.length != models[model].lines) {
      const _printableInputs = [];
      for (let index = 0; index < models[model].lines; index++) {
        _printableInputs.push(inputs[index]);
      }
      setPrintableInputs(_printableInputs);
    }
  });

  return (
    <Form>
      <Form.Group>
        <Form.Label>Modelo: </Form.Label>
        <Form.Select
          value={model}
          onChange={({ target }) => setModel(+target.value)}
        >
          {Object.keys(models).map((index) => (
            <option key={`option${index}`} value={index}>
              {models[index].name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Tipo - Cor: </Form.Label>
        <Form.Select
          value={color}
          onChange={({ target }) => setColor(target.value)}
        >
          {Object.keys(types).map((index) => (
            <option key={`option_${index}`} value={index}>
              {types[index]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {printableInputs}
      <div className={"d-flex"}>
        <div className={"img-flow"}>
          <img
            src={`/models/${suffix}_${
              models[model].image_index !== null
                ? models[model].image_index
                : model
            }_${color}.jpg`}
          />
        </div>
        <Svg file={models[model].model} frameId={frameId} params={params} />
      </div>
    </Form>
  );
}
C491N.propTypes = {
  frameId: PropTypes.string,
  lines: PropTypes.number,
  types: PropTypes.any,
  models: PropTypes.any,
  model: PropTypes.any,
  color: PropTypes.any,
  suffix: PropTypes.any,
};
