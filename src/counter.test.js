import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
const { default: App } = require("./App");

describe("Testing my counter button ", () => {
  let parent;

  // Se reinicia el wrapper en cada ejecución
  beforeEach(() => {
    parent = shallow(<App value={0} />);
  });

  test("Debe incrementar el valor con el botón +1", () => {
    // at(0) significa que tome el primer btn que aparezca en el componente
    parent.find("button").at(0).simulate("click");
    const valueP = parent.find("p").text().trim();
    expect(valueP).toBe("1");
  });
});
