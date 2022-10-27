import React, { useEffect, useRef } from "react";
import "./App.scss";
import lexusChart from "./lexus-chart";
import Logo from "./assets/general-area-logo.svg";
import Person from "./assets/person.svg";
import Wave from "./assets/wave.svg";

export default function  App() {
    const chartRef = useRef(null);
    const elRef = useRef(null);
    const observer = useRef(new ResizeObserver(() => lexusChart(chartRef.current,elRef.current)));
    useEffect(() => lexusChart(chartRef.current,elRef.current))
    useEffect(() => {
        if (elRef.current) { observer.current.observe(elRef.current)}
        return () => observer.current.unobserve()
    }, [elRef, observer])
    return (
        <div className="lexus">
            <div className="lexus-header">
                <img src={Logo}></img>
                <hr className="top-line" />
                <p>01</p>
            </div>
            <div>
                <div className="lexus-titles">
                    <p className="left-title">Fields Glenview success</p>
                    <p className="close-rate"> Close rate +9 ppts YoY</p>
                </div>
                <p className="bottom-title">Close Rate success</p>
            </div>

            <div ref={elRef} className="lexus-chart">
                <svg width="100%" ref={chartRef}></svg>
                <span className="colored-yaer">2021</span>
                <span className="uncolored-yaer">2022</span>
            </div>
            <div className="lexus-options">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img className="person" src={Person}></img>
                                Bredemann Buy-Sell in November 2019
                            </td>
                            <td>
                                <img className="person" src={Person}></img>
                                Consistent sales performance
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="wave" src={Wave}></img>

                                Improved partnership
                            </td>
                            <td>
                                <img className="wave" src={Wave}></img>Digital retailing
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};