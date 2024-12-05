import React from "react";
import OutPortComponent from "./OutPortComponent";
import InPortComponent from "./InPortComponent";

const Node = ({ ctx }) => {
  const { vertex } = ctx;

  return (
    <div className="jtk-table jtk-element">
      <div className="jtk-element-name">
        <span>{vertex.data.name}</span>
      </div>
      <div className="jtk-table-columns">
        <div className="jtk-table-column ">
          {vertex.data.ports.inputs.map((port) => (
            <InPortComponent data={port} vertex={vertex} key={port.id} />
          ))}
        </div>
        <div className="jtk-table-column ">
          {vertex.data.ports.outputs.map((port) => (
            <OutPortComponent data={port} vertex={vertex} key={port.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Node;
