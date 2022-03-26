import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";

const memory = {};

function Svg({ file, params }) {
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
      _svg = _svg.replace("{" + key + "}", params[key]);
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

function createInput({ label, value }) {
  const [_value, setValue] = useState(value);
  return [
    <div key={label}>
      <label>{label}</label>
      <input
        type={"text"}
        value={_value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>,
    _value,
  ];
}

export default { Svg, createInput };
