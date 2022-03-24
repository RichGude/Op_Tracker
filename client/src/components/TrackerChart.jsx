import React from 'react';

const TrackerChart = () => {
    return (<>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-top border-bottom" style='margin-top: 60px'>
            <div><h1 class="h2" id='stat_title'>Technical Operations Statistics:</h1></div>

            <canvas id='stat_chart' width='400' height='200' style='margin-bottom: 40px'></canvas>
        </div>
    </>);
};

export default TrackerChart;