import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import InputMask from "react-input-mask";

import { createPortal } from "react-dom";
import FontPicker from "font-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";

import { Button, Form } from "react-bootstrap";

const memory = {};

export function Svg({ file, params, frameId }) {
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
  const onLoadFrame = () => {
    const iframe = document.querySelector("#" + frameId);
    iframe.contentWindow.document.body.style.margin = 0;
    iframe.contentWindow.document.body.style.overflow = "hidden";
    const svg = iframe.contentWindow.document.body.querySelector("svg");
    if (svg) {
      iframe.width = svg.width.baseVal.value + "px";
      iframe.height = svg.height.baseVal.value + "px";
    }
  };
  return (
    <div>
      <iframe
        ref={setContentRef}
        id={frameId}
        name={frameId}
        frameBorder={0}
        onLoad={onLoadFrame}
      >
        {mountNode &&
          createPortal(
            <>
              {fontsHTML}
              <link href={"/print.css"} type={"text/css"} rel={"stylesheet"} />
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
  frameId: PropTypes.string,
};

const setMounts = [];

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  font: PropTypes.any,
  mask: PropTypes.any,
  maxLength: PropTypes.any,
  onValueChange: PropTypes.any,
  onFontChange: PropTypes.any,
};

export function Input({
  label,
  value,
  font,
  mask,
  maxLength,
  onValueChange,
  onFontChange,
}) {
  const [_value, setValue] = useState(value);
  const [mount, setMount] = useState(false);
  setMounts.push(setMount);
  const [_fontFamily, setFont] = useState(font || "Arial");
  const onChange = ({ target: { value } }) => {
    setValue(value);
    onValueChange(value);
  };
  const fontSelector = (
    <>
      {mount && (
        <FontPicker
          apiKey="AIzaSyCj3vnbWZspJHcytmJQYA3-h2MYKE9s-cI"
          activeFontFamily={_fontFamily}
          onChange={(nextFont) => {
            setFont(nextFont.family);
            onFontChange(nextFont.family);
            setMount(false);
          }}
        />
      )}
      {!mount && (
        <Button
          onClick={() => {
            for (const setter of setMounts) {
              if (setter) {
                try {
                  setter(false);
                } catch (e) {
                  // ignore
                }
              }
            }
            setMount(true);
          }}
        >
          <FontAwesomeIcon icon={faFont} />
        </Button>
      )}
    </>
  );
  if (mask) {
    return (
      <Form.Group key={label}>
        <Form.Label>{label}</Form.Label>
        <div className="d-flex">
          <InputMask
            mask={mask}
            value={_value}
            onChange={onChange}
            class={"form-control"}
          />
          {fontSelector}
        </div>
      </Form.Group>
    );
  }
  return (
    <Form.Group key={label}>
      <Form.Label>{label}</Form.Label>
      <div className="d-flex">
        <Form.Control
          type={"text"}
          value={_value}
          onChange={onChange}
          maxLength={maxLength || Infinity}
        />
        {fontSelector}
      </div>
    </Form.Group>
  );
}
