import React from "react";

const PortComponent = ({ data, vertex }) => {
  const column = vertex.getPort(data.id);
  const columnId = column?.id || data.id;

  return (
    <div
      className="jtk-table-column"
      data-type={data.datatype}
      data-primary-key={data.primaryKey || false}
    >
      <div className="jtk-out">
        <div
          className="jtk-ep"
          data-jtk-source="true"
          data-jtk-port={`out:${columnId}`}
          data-jtk-port-type="source"
          data-jtk-scope={columnId}
        />
      </div>
      <span>{data.name}</span>

      <div className="jtk-in">
        <div
          className="jtk-ep"
          data-jtk-target="true"
          data-jtk-port={`in:${columnId}`}
          data-jtk-port-type="target"
          data-jtk-scope={columnId}
        />
      </div>
    </div>
  );
}

export default PortComponent;