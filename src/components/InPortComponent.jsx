import React from "react";

const InPortComponent = ({ data, vertex }) => {
  const port = vertex.getPort(data.id);
  const portId = port?.id || data.id;

  return (
    <div
      className="jtk-in"
      data-type={data.datatype}
      data-primary-key={data.primaryKey || false}
    >
      {" "}
      <div
        className="jtk-ep"
        data-jtk-target="true"
        data-jtk-port={`in:${portId}`}
        data-jtk-port-type="target"
        data-jtk-scope={portId}
      />
      <span>{data.name}</span>
    </div>
  );
};

export default InPortComponent;
