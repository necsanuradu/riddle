import React from "react";

const getComponentPath = (path, component) => {
  return (path.match(/import\(((?![\)]).)+\)/) || [
    `import(./pre-components/${component.toLowerCase()})`,
  ])[0]
    .slice(7, -1)
    .replace(/^[\.]+/, "")
    .replace(/^[/]+/, "");
};

export { getComponentPath };
