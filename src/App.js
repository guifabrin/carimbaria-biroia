import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CCNPJ from "./models/CCNPJ.tsx";

// 4910 3 linhas
import Model4910_0_3 from "./models/extends/C4910_0.svg";
import Model4910_1_3 from "./models/extends/C4910_1.svg";
import Model4910_2_3 from "./models/extends/C4910_2.svg";
import Model4910_3_3 from "./models/extends/C4910_3.svg";

// 4910 2 linhas
import Model4910_0_2 from "./models/extends/C4910_4.svg";
import Model4910_1_2 from "./models/extends/C4910_5.svg";
import Model4910_2_2 from "./models/extends/C4910_6.svg";

// 4910 1 linhas
import Model4910_0_1 from "./models/extends/C4910_7.svg";
import Model4910_1_1 from "./models/extends/C4910_8.svg";

import ModelCNPJ_0 from "./models/extends/CCNPJ_0.svg";
import ModelCNPJ_1 from "./models/extends/CCNPJ_1.svg";

import C491N from "./models/C491N.tsx";
import {
  Container,
  Row,
  ThemeProvider,
  Col,
  Button,
  Form,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const stampClasses = {
    CCNPJ: {
      Stamp: CCNPJ,
      models: {
        0: {
          name: "Simples",
          model: ModelCNPJ_0,
        },
        1: {
          name: "Com inscrição estadual",
          model: ModelCNPJ_1,
        },
      },
      types: {
        4927: "Automático 4927",
        simples: "Simples",
      },
      type: 4927,
    },
    C4910: {
      Stamp: C491N,
      suffix: "C4910",
      color: "normal_black",
      types: {
        normal_black: "Normal - Preto",
        normal_green: "Normal - Verde",
        normal_pink: "Normal - Rosa",
        normal_red: "Normal - Vermelho",
        normal_white: "Normal - Branco",
      },
      models: {
        0: {
          name: "3 Linhas: Simples",
          lines: 3,
          model: Model4910_0_3,
          image_index: 0,
        },
        1: {
          name: "3 Linhas: L1 Esticada",
          lines: 3,
          model: Model4910_1_3,
          image_index: 0,
        },
        2: {
          name: "3 Linhas: L1 e L2 Esticada",
          lines: 3,
          model: Model4910_2_3,
          image_index: 0,
        },
        3: {
          name: "3 Linhas: Todas Esticadas",
          lines: 3,
          model: Model4910_3_3,
          image_index: 0,
        },
        4: {
          name: "2 Linhas: Simples",
          lines: 2,
          model: Model4910_0_2,
          image_index: 0,
        },
        5: {
          name: "2 Linhas: L1 Esticada",
          lines: 2,
          model: Model4910_1_2,
          image_index: 0,
        },
        6: {
          name: "2 Linhas: Todas Esticadas",
          lines: 2,
          model: Model4910_2_2,
          image_index: 0,
        },
        7: {
          name: "1 Linha: Simples",
          lines: 1,
          model: Model4910_0_1,
          image_index: 0,
        },
        8: {
          name: "1 Linha: Esticada",
          lines: 1,
          model: Model4910_1_1,
          image_index: 0,
        },
      },
    },
  };
  const [selected, setSelected] = useState(null);
  const [addedStamps, setAddedStamps] = useState({});
  const [index, setIndex] = useState(0);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Button
              onClick={() => {
                document.body.classList.remove("negative");
                const iframes = [...document.querySelectorAll("iframe")];
                for (const frame of iframes) {
                  frame.contentWindow.document.body.classList.remove(
                    "negative"
                  );
                }
                print();
              }}
            >
              Imprimir Modelo
            </Button>
            <Button
              onClick={() => {
                document.body.classList.add("negative");
                const iframes = [...document.querySelectorAll("iframe")];
                for (const frame of iframes) {
                  frame.contentWindow.document.body.classList.add("negative");
                }
                print();
              }}
            >
              Imprimir Negativa
            </Button>
            <Form>
              <Form.Group className="mb-3" controlId="formStamp">
                <Form.Label>Tipo de carimbo</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    onChange={({ target: { value } }) => {
                      setSelected(value);
                    }}
                  >
                    <option>Selecione um tipo de carimbo</option>
                    <option value="CCNPJ">CNPJ</option>
                    <option value="C4910">4910</option>
                  </Form.Select>
                  <Button
                    onClick={() => {
                      const { Stamp, ...props } = stampClasses[selected];
                      if (!Stamp) {
                        return;
                      }
                      const key = `stamp_${index}`;
                      addedStamps[key] = (
                        <Col key={key} className="mb-3">
                          <h2>{selected}</h2>
                          <Button
                            onClick={() => {
                              delete addedStamps[key];
                              setAddedStamps({ ...addedStamps });
                            }}
                            variant="danger"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                          <Button
                            onClick={() =>
                              document
                                .querySelector("#frame_" + key)
                                .contentWindow.print()
                            }
                            variant="light"
                          >
                            <FontAwesomeIcon icon={faPrint} />
                          </Button>
                          <Stamp frameId={"frame_" + key} {...props} />
                        </Col>
                      );
                      setAddedStamps(addedStamps);
                      setIndex(index + 1);
                    }}
                    variant="success"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Row>{Object.values(addedStamps)}</Row>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
