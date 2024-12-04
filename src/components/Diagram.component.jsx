import React, { useRef } from "react";
import {
  SurfaceProvider,
  SurfaceComponent,
  MiniviewComponent,
  ControlsComponent,
} from "@jsplumbtoolkit/browser-ui-react";
import { LassoPlugin } from "@jsplumbtoolkit/browser-ui";

import {
  DEFAULT,
  EVENT_DBL_CLICK,
  EVENT_CLICK,
  EVENT_TAP,
  AbsoluteLayout,
  BlankEndpoint,
  StateMachineConnector,
  EVENT_CANVAS_CLICK,
  LabelOverlay,
  isPort,
  PlainArrowOverlay,
  newInstance,
} from "@jsplumbtoolkit/browser-ui";
import NodeComponent from "./Node.component";

const Diagram = () => {
  const surfaceComponent = useRef(null);
  const surface = useRef(null);

  const toolkit = newInstance({
    portDataProperty: "columns",
    beforeConnect: (source, target) => {
      return (
        isPort(source) &&
        isPort(target) &&
        source !== target &&
        source.getParent() !== target.getParent()
      );
    },
  });

  const viewOptions = {
    nodes: {
      [DEFAULT]: {
        jsx: (ctx) => {
          return <NodeComponent ctx={ctx} />;
        },
        events: {
          [EVENT_TAP]: (params) => {
            surface.current.stopEditingPath();
            if (
              toolkit.getSelection()._nodes.length < 1 ||
              params.e.shiftKey !== true
            ) {
              toolkit.setSelection(params.obj);
            } else {
              toolkit.addToSelection(params.obj);
            }
          },
        },
      },
    },
    ports: {
      [DEFAULT]: {
        edgeType: "common",
        maxConnections: 2,
      },
    },
    edges: {
      [DEFAULT]: {
        overlays: [
          {
            type: LabelOverlay.type,
            options: {
              label: "x",
              cssClass: "jtk-overlay-delete",
              events: {
                [EVENT_CLICK]: (p) => {
                  toolkit.removeEdge(p.edge);
                },
              },
            },
          },
          {
            type: PlainArrowOverlay.type,
            options: {
              location: 1,
              width: 7,
              length: 7,
            },
          },
        ],
        events: {
          [EVENT_DBL_CLICK]: (p) => toolkit.removeEdge(p.edge),
        },
      },
    },
  };

  const renderOptions = {
    plugins: [
      {
        type: LassoPlugin.type,
        options: {
          invert: true
        }
      }
    ],
    layout: {
      type: AbsoluteLayout.type,
      options: {},
    },
    consumeRightClick: true,
    events: {
      [EVENT_CANVAS_CLICK]: () => {
        toolkit.clearSelection();
      },
    },
    defaults: {
      connector: StateMachineConnector.type,
      endpoint: {
        type: BlankEndpoint.type,
      },
    },
  };

  return (
      <div className="jtk-demo-canvas">
        <SurfaceProvider>
          <SurfaceComponent
            renderOptions={renderOptions}
            toolkit={toolkit}
            viewOptions={viewOptions}
            ref={surfaceComponent}
            url="/data.json"
          >
            <ControlsComponent />
            <MiniviewComponent />
          </SurfaceComponent>
        </SurfaceProvider>
      </div>
  );
};

export default Diagram;
