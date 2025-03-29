import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import { searchPlugin } from "@react-pdf-viewer/search";
import * as React from "react";

// Import styles
import type {
  HighlightArea,
  RenderHighlightsProps,
} from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/search/lib/styles/index.css";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

interface RenderHighlightAreasExampleProps {
  areas: HighlightArea[];
  fileUrl: string;
}
const searchPluginInstance = searchPlugin({});

const RenderHighlightAreasExample: React.FC<
  RenderHighlightAreasExampleProps
> = ({ areas, fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {areas
        .filter((area) => area.pageIndex === props.pageIndex)
        .map((area, idx) => (
          <div
            key={idx}
            className="highlight-area"
            style={Object.assign(
              {},
              {
                background: "yellow",
                opacity: 0.4,
              },
              props.getCssProperties(area, props.rotation)
            )}
          />
        ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlights,
    trigger: Trigger.None,
  });

  return (
    <Viewer
      withCredentials
      fileUrl={fileUrl}
      plugins={[
        defaultLayoutPluginInstance,
        searchPluginInstance,
        highlightPluginInstance,
      ]}
    />
  );
};

export default RenderHighlightAreasExample;
