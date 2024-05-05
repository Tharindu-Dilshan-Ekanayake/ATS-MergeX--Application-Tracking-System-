import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { AiTwotoneLike } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";

class PiechartWithIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [70, 30],
      options: {
        chart: {
          width: 300,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
            donut: {
              size: '85%',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Total',
                  formatter: function(w) {
                    return w.globals.series[0] + '%';
                  }
                },
                name: {
                  fontSize: '16px',
                  offsetY: 20,
                  formatter: function(val) {
                    return val;
                  }
                },
                value: {
                  fontSize: '14px',
                  offsetY: -20,
                  formatter: function(val) {
                    return val + '%';
                  }
                },
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'solid	',
        },
        colors: ['#EA7122', '#ffffff'],
        legend: {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        title: {},
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
      },
    };
  }

  render() {
    const Icon = this.props.icon;
    return (
      <div style={{ width: '200px', position: 'relative' }}>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Icon size={32} style={{ transform: 'translateY(-15px)' }} />
        </div>
        <div id="html-dist"></div>

        <style>
          {`
          .apexcharts-pie-area {
            stroke-width: 1px;
          }
          .apx-legend-position-right {
            display: none;
          }
          .apexcharts-tooltip-series-group{
            color:black !important;
          }
          .apexcharts-datalabel, .apexcharts-datalabel-label, .apexcharts-datalabel-value, .apexcharts-datalabels, .apexcharts-pie-label{
            color:white !important;
            opacity:100% !important;
          }
          .apexcharts-datalabel-value {
              fill: #ffffff !important;
              opacity: 1 !important;
          }
          .apexcharts-datalabels-group{
            display:block;
            opacity:1 !important;
          }
          .apexcharts-datalabel-label{
            fill:white !important;
            display:none;
        }
       .apexcharts-datalabel-value{
            fill:#EA7122 !important;
            transform:translateY(30px);
        }
          `}
        </style>
      </div>
    );
  }
}

export default PiechartWithIcon;