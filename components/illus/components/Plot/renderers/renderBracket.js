import {translate} from "../../utils";

export const renderBracket = (
  selection,
  datum,
  index,
  xScale,
  yScale,
  plotLineColor,
  _plotREF,
  scaleDimensionX,
) => {
  const bracketMidPoint = {
    x: xScale(datum.xy[0]),
    y: yScale(datum.xy[1]),
  };

  const center = selection
    .append("g")
    .attr("transform", translate(bracketMidPoint.x, bracketMidPoint.y));
  const lineGroup = center
    .append("g")
    .style("transform-box", "fill-box")
    .style("transform-origin", "center");
  if (datum.rotate) {
    lineGroup.style("transform", `rotate(${datum.rotate}deg)`);
  }

  // right arm
  lineGroup
    .append("line")
    .attr("stroke", plotLineColor)
    .attr("x1", -0.1)
    .attr("y1", 0)
    .attr("x2", scaleDimensionX(datum.length / 2))
    .attr("y2", 0);
  // left arm
  lineGroup
    .append("line")
    .attr("stroke", plotLineColor)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", scaleDimensionX(-datum.length / 2))
    .attr("y2", 0);
  // left tick
  lineGroup
    .append("line")
    .attr("stroke", plotLineColor)
    .attr("x1", scaleDimensionX(-datum.length / 2 + 0.025))
    .attr("y1", 0)
    .attr("x2", scaleDimensionX(-datum.length / 2 + 0.025))
    .attr("y2", scaleDimensionX(-0.2));
  // right tick
  lineGroup
    .append("line")
    .attr("stroke", plotLineColor)
    .attr("x1", scaleDimensionX(datum.length / 2) - 0.49)
    .attr("y1", 0)
    .attr("x2", scaleDimensionX(datum.length / 2) - 0.49)
    .attr("y2", scaleDimensionX(-0.2));

  if (datum.markCenter) {
    lineGroup
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 2)
      .attr("fill", "red");
  }
};
