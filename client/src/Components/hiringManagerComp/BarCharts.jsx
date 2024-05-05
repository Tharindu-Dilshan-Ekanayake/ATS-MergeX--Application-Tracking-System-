import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

class BarCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: [400, 130, 348, 270, 540]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Application', 'Phone Screen', 'Interview', 'offer', 'Hire'
          ],
        },
        colors: ['#EA7122'] // Change fill color of the bars
      }
    };
  }

  render() {
    return (
      <div className='w-[92%]'>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300} />
        </div>
        <div id="html-dist"></div>
        <style>
          {`
          .apexcharts-text tspan {
              fill: #ffffff;
          }
          .apexcharts-gridline {
            display: none;
          }
          .apexcharts-menu {
            background: #1f1f1f;
            border: none;
          }
          .apexcharts-menu-item:hover {
            color: #EA7122;
          }
          .apexcharts-menu-item.exportSVG:hover {
            background: #2b2b2b;
          }
          .apexcharts-menu-item.exportPNG:hover {
            background: #2b2b2b;
          }
          .apexcharts-menu-item.exportCSV:hover {
            background: #2b2b2b;
          }
          .apexcharts-tooltip {
            background: #1f1f1f !important;
          }
          .apexcharts-tooltip .apexcharts-theme-dark {
            background: #1f1f1f !important;
          }
          .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
            background:#362e2e;
          }
          .apexcharts-tooltip-text-y-label{
            display:none;
          }
       
          `}
        </style>
      </div>
    );
  }
}

export default BarCharts;