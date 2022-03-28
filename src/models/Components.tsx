import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import InputMask from "react-input-mask";

import { createPortal } from "react-dom";
import FontPicker from "font-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont, faPrint } from "@fortawesome/free-solid-svg-icons";

const memory = {};

let lastId = 0;

function newId(prefix = "id") {
  lastId++;
  return `${prefix}${lastId}`;
}

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

  const [fontsHTML, setFontsHTML] = useState([]);
  useEffect(() => {
    if (!svg) return;
    let _svg = svg;
    const fonts = [];
    const _fontsHTML = [];
    for (const key in params) {
      _svg = _svg.replace("{" + key.toUpperCase() + "}", params[key].value);
      _svg = _svg.replace("{font" + key.toUpperCase() + "}", params[key].font);
      if (fonts.indexOf(params[key].font) == -1) {
        fonts.push(params[key].font);
        _fontsHTML.push(
          <link
            rel="stylesheet"
            key={params[key].font}
            href={"https://fonts.googleapis.com/css?family=" + params[key].font}
          />
        );
      }
      setFontsHTML(_fontsHTML);
    }
    setSVGRender(_svg);
  }, [params, svg]);

  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const idFrame = newId("iframe_");
  return (
    <div>
      <button
        onClick={() =>
          document.querySelector("#" + idFrame).contentWindow.print()
        }
      >
        <FontAwesomeIcon icon={faPrint} />
      </button>
      <iframe ref={setContentRef} id={idFrame} name={idFrame}>
        {mountNode &&
          createPortal(
            <>
              {fontsHTML}
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: svgRender }}
              />
            </>,
            mountNode
          )}
      </iframe>
    </div>
  );
}

Svg.propTypes = {
  file: PropTypes.string,
  params: PropTypes.object,
};

export function createInput({ label, value, font, mask, maxLength }) {
  const [_value, setValue] = useState(value);
  const [mount, setMount] = useState(false);
  const [_fontFamily, setFont] = useState(font || "Arial");
  const onChange = ({ target: { value } }) => setValue(value);
  const fontSelector = (
    <>
      {mount && (
        <FontPicker
          apiKey="AIzaSyCj3vnbWZspJHcytmJQYA3-h2MYKE9s-cI"
          activeFontFamily={_fontFamily}
          onChange={(nextFont) => {
            setFont(nextFont.family);
            setMount(false);
          }}
        />
      )}
      {!mount && (
        <button onClick={() => setMount(!mount)}>
          <FontAwesomeIcon icon={faFont} />
        </button>
      )}
    </>
  );
  if (mask) {
    return [
      <div key={label}>
        <label>{label}</label>
        <InputMask mask={mask} value={_value} onChange={onChange} />
        {fontSelector}
      </div>,
      _value,
      _fontFamily,
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
      {fontSelector}
    </div>,
    _value,
    _fontFamily,
  ];
}
