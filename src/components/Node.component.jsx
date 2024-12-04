import React from "react";

import PortComponent from "./PortComponent";

const NodeComponent = ({ ctx }) => {
  const { vertex, surface, toolkit } = ctx;

  return (
    <div className="jtk-table jtk-element">
      <div className="jtk-element-name">
        <span>{vertex.data.name}</span>
      </div>
      <div className="jtk-table-columns">
        {vertex.data.columns.map((port) => (
          <PortComponent
            data={port}
            key={port.id}
            toolkit={toolkit}
            surface={surface}
            vertex={vertex}
          />
        ))}
      </div>
    </div>
  );
}

export default NodeComponent;
