import React from "react";

const OutPortComponent = ({ data, vertex }) => {
  const column = vertex.getPort(data.id);
  const columnId = column?.id || data.id;

  return (
    <div
      className="jtk-out"
      data-type={data.datatype}
      data-primary-key={data.primaryKey || false}
    >
      <span>{data.name}</span>
      <div
        className="jtk-ep"
        data-jtk-source="true"
        data-jtk-port={`out:${columnId}`}
        data-jtk-port-type="source"
        data-jtk-scope={columnId}
      />
    </div>
  );
};

export default OutPortComponent;
