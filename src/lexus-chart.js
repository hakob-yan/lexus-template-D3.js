import * as d3 from "d3v4";
const dummyData = [
    { month: "Jan", 2021: 600, 2022: 21 },
    { month: "Feb", 2021: 15, 2022: 125 },
    { month: "Mar", 2021: 156, 2022: 2 },
    { month: "Apr", 2021: 125, 2022: 122 },
    { month: "Jun", 2021: 10, 2022: 2 },
    { month: "Jul", 2021: 350, 2022: 333 },
    { month: "Aug", 2021: 10, 2022: 33 },
    { month: "Sep", 2021: 112, 2022: 855 },
    { month: "Oct", 2021: 150, 2022: 554 },
    { month: "Nov", 2021: 10, 2022: 442 },
    { month: "Dec", 2021: 50, 2022: 22 },
];
const barOptions = {
    2021: "#5864FF",
    2022: "#FFFFFF",
};

export default function (current,divCurrent) {
    const data = dummyData;
    const x_data = data.map((item) => item.month);
    const y_data = data.reduce((arr, item) => { arr.push(item[2021], item[2022]); return arr }, []).sort((a, b) => (a - b));
    const SVG = d3.select(current);
    SVG.selectAll("*").remove(); //for render
    const WIDTH = parseInt(d3.select(divCurrent).style("width"));
    const HEIGHT = WIDTH / 4.05;
    const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };
    const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
    const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
    const translatedSVG = SVG.attr("style", "background-color:#0c1821")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .append("g")
        .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
    const yScale = d3
        .scaleLinear()
        .domain([0, 1.2 * d3.max(y_data)])
        .range([INNER_HEIGHT, 0])
        .nice();
    const xScale = d3
        .scaleBand()
        .domain(x_data)
        .range([0, INNER_WIDTH])
        .padding(1);
    const xAxis = d3.axisBottom(xScale).tickSize(0).ticks(10);
    const yAxis = d3.axisLeft(yScale).tickSize(0).ticks(10);
    // const xAxisGrid = d3
    //     .axisBottom(xScale)
    //     .tickSize(-INNER_HEIGHT)
    //     .tickFormat("")
    //     .ticks(10);
    // const yAxisGrid = d3
    //     .axisLeft(yScale)
    //     .tickSize(-INNER_WIDTH)
    //     .tickFormat("")
    //     .ticks(10);
    // translatedSVG
    //     .append("g")
    //     .attr("class", "x axis-grid")
    //     .attr("transform", "translate(" + 0 + "," + `${INNER_HEIGHT}` + ")")
    //     .call(xAxisGrid)
    //     .selectAll(".tick>line ")
    //     .attr("stroke", "#EAEDF0");
    // translatedSVG.select(".x.axis-grid .domain").attr("stroke", "#EAEDF0");
    // translatedSVG
    //     .append("g")
    //     .attr("class", "y axis-grid")
    //     .attr("transform", "translate(" + 0 + "," + 0 + ")")
    //     .call(yAxisGrid)
    //     .selectAll(".tick>line ")
    //     .attr("stroke", "#EAEDF0");

    translatedSVG
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + 0 + "," + `${INNER_HEIGHT}` + ")")
        .call(xAxis)
        .select(".domain")
        .attr("stroke", "#0c1821");

    translatedSVG
        .selectAll(".x.axis .tick text ")
        .attr("font-size", "24px")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .attr("transform", "translate(0, 15)");

    // translatedSVG
    //     .append("g")
    //     .attr("class", "y axis")
    //     .attr("transform", "translate(" + 0 + "," + 0 + ")")
    //     .call(yAxis)
    //     .select(".domain")
    //     .attr("stroke", "#EAEDF0");

    // translatedSVG
    //     .selectAll(".y.axis .tick text ")
    //     .attr("font-size", "14px")
    //     .attr("fill", "#9C9C9C");

    const barWidth = xScale.step() / 5;
    const barDist = barWidth / 3;


    translatedSVG
        .selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.month) - 0.5 * barDist - barWidth)
        .attr("y", (d) => yScale(d[2021]))
        .attr("height", (d) => (INNER_HEIGHT - yScale(d[2021])))
        .attr("width", barWidth)
        .style("fill", barOptions[2021]);

    translatedSVG
        .selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.month) + 0.5 * barDist)
        .attr("y", (d) => yScale(d[2022]))
        .attr("height", (d) => (INNER_HEIGHT - yScale(d[2022])))
        .attr("width", barWidth)
        .style("fill", barOptions[2022]);





    //     const COLORS = Object.values(barOptions);
    //     const TEXT_PARAMS = [];
    //     SVG.selectAll("options")
    //         .data(Object.keys(barOptions))
    //         .enter()
    //         .append("text")
    //         .attr("x", (d, i) => 14 + ((i + 1) * WIDTH) / (COLORS.length + 1))
    //         .attr("y", HEIGHT - MARGIN.bottom / 2 + 10)
    //         .style("fill", "black")
    //         .text((d) => d)
    //         .each(function (p, i) {
    //             const TEXT = d3.select(this).node().getComputedTextLength();
    //             TEXT_PARAMS.push(TEXT);
    //             d3.select(this).attr("transform", `translate(${-TEXT / 2},0)`);
    //         });
    //     SVG.selectAll("options")
    //         .data(COLORS)
    //         .enter()
    //         .append("rect")
    //         .attr(
    //             "x",
    //             (d, i) => ((i + 1) * WIDTH) / (COLORS.length + 1) - TEXT_PARAMS[i] / 2
    //         )
    //         .attr("y", HEIGHT - MARGIN.bottom / 2)
    //         .attr("height", 10)
    //         .attr("width", 10)
    //         .style("fill", (d) => d);
}
