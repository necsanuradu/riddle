import React, { Suspense, Component, createClass, createElement } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getComponentPath } from "../web-helpers/riddle-helpers";
import md5 from "md5";
import Demofile from "../pre-components/demofile2";
import ReactDOM from "react-dom";
import StringToReact from "string-to-react";
// npm i react-html-parser --force
import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
// npm install create-react-class --save
//import createReactClass from "create-react-class";
//import DemofileNew from "../pre-components/demofile11-6bbd96eca280fb9d3f930e25911b2ad9.js";
var createReactClass = require("create-react-class");

export default class Riddle extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      renderedState: this.props.riddleContent,
    };

    this.getRegexComponents = this.getRegexComponents.bind(this);
    this.sourceComponentLoader = this.sourceComponentLoader.bind(this);
    this.riddleComponentLoader = this.riddleComponentLoader.bind(this);
    this.setComponentAsString = this.setComponentAsString.bind(this);
    this.defaultRenderForNewComponent =
      this.defaultRenderForNewComponent.bind(this);
    this.getRegexComponents(this.props.riddleContent, this);
  }

  setRenderedState(newState) {
    this.setState({ renderedState: newState });
  }

  defaultRenderForNewComponent(source) {
    return `<div class="bg-danger rounded-2">new component created just now replacing ${source}</div>`;
  }

  getRegexComponents(textstring, object) {
    const pattern = /\<([A-Z])([a-zA-Z0-9]*)(((?![>]).)*)( \/\>|\>)/gs;
    textstring.replace(pattern, function (...args) {
      let wholematch = args.shift();
      let componentName = args[0] + args[1];
      let importPath = getComponentPath(args[2], componentName);
      object.sourceComponentLoader({
        all: wholematch,
        instructions: args[2].replace(/\/$/, "").trim(),
        name: componentName,
        path: importPath,
      });
      return;
    });
  }

  sourceComponentLoader(component) {
    return import(`../${component.path}`).then(
      (result) => {
        component.path = `${component.path}-${md5(component.all)}`;
        this.riddleComponentLoader(component, <result.default />);
        return result;
      },
      (err) => {
        this.saveNewComponent(component);
        let renderedState = this.state.renderedState;
        renderedState = renderedState.replace(
          component.all,
          this.defaultRenderForNewComponent(component.name)
        );
        this.setRenderedState(renderedState);
      }
    );
  }

  riddleComponentLoader(component, sourceComponent) {
    return import(`../${component.path}`).then(
      (result) => {
        let renderedState = this.state.renderedState;
        renderedState = renderedState.replace(
          component.all,
          renderToString(<result.default />)
        );
        this.setRenderedState(renderedState);
        return result;
      },
      (err) => {
        this.remakeComponent(component, sourceComponent);
      }
    );
  }

  saveNewComponent(component) {
    component.path = `/client/src/${component.path}-${md5(component.path)}`;
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    component.content = `import React from "react";
      export default function ${component.name}(props) {
        return (
          ${this.defaultRenderForNewComponent(component.name)}
        );
      }`;
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    this.setComponentAsString(component);
  }

  remakeComponent(component, sourceComponent) {
    component.path = `/client/src/${component.path}`;
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    let renderedState = this.state.renderedState;
    renderedState = renderedState.replace(
      component.all,
      renderToString(sourceComponent)
    );
    this.setRenderedState(renderedState);
    component.content = sourceComponent;
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    // this is where we WILL implement the component.instructions
    this.setComponentAsString(component);
  }

  setComponentAsString(component) {
    return fetch("http://localhost:5000/put", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ component: component }),
    })
      .then((result) => result.text())
      .then((result) => {
        return result.replace(/className/g, "class");
      });
  }

  render() {
    return (
      <React.Fragment>
        {ReactHtmlParser(this.state.renderedState)}
      </React.Fragment>
    );
  }
}
