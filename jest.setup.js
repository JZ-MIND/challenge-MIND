import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom";

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });
