import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import InputMask from "react-input-mask";

const memory = {};

export function Svg({ file, params }) {
  const [_file, setFile] = useState(file);

  const [svg, setSVG] = useState(null);
  const [isFetching, setIsFecthing] = useState(false);
  const [svgRender, setSVGRender] = useState(null);

  if (!svg || _file !== file) {
    if (memory[file]) {
      setSVG(memory[file]);
      setFile(file);
    } else if (!isFetching) {
      setIsFecthing(true);
      fetch(file)
        .then((response) => response.text())
        .then((text) => {
          setSVG(text);
          setFile(file);
          setIsFecthing(false);
          memory[file] = text;
        });
    }
  }

  useEffect(() => {
    if (!svg) return;
    let _svg = svg;
    for (const key in params) {
      _svg = _svg.replace("{" + key.toUpperCase() + "}", params[key]);
    }
    setSVGRender(_svg);
  }, [params, svg]);

  return (
    <div className="content" dangerouslySetInnerHTML={{ __html: svgRender }} />
  );
}

Svg.propTypes = {
  file: PropTypes.string,
  params: PropTypes.object,
};

export function createInput({ label, value, mask, maxLength }) {
  const [_value, setValue] = useState(value);
  const onChange = ({ target: { value } }) => setValue(value);
  if (mask) {
    return [
      <div key={label}>
        <label>{label}</label>
        <InputMask mask={mask} value={_value} onChange={onChange} />
      </div>,
      _value,
    ];
  }
  return [
    <div key={label}>
      <label>{label}</label>
      <input
        type={"text"}
        value={_value}
        onChange={onChange}
        maxLength={maxLength || Infinity}
      />
    </div>,
    _value,
  ];
}
