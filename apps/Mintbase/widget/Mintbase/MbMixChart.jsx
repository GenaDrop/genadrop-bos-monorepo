const themeColor = props.themeColor;
const theme = themeColor?.chart
  ? {
      title: {
        style: {
          color: themeColor.chart?.title,
          fontWeight: "bold",
        },
      },
      subtitle: {
        style: {
          color: themeColor.chart?.subtitle,
        },
      },
      xAxis: { labels: { style: { color: themeColor.chart?.xAxis } } },
      yAxis: { labels: { style: { color: themeColor.chart?.yAxis } } },

      legend: {
        itemStyle: {
          color: themeColor.chart?.legend,
        },
        itemHoverStyle: {
          color: themeColor.chart?.legendHover,
        },
      },
      rangeSelector: {
        buttonTheme: {
          fill: themeColor?.chart?.rangeSelector?.btn_bg,

          style: {
            color: themeColor?.chart?.rangeSelector?.btn_color,
          },
          states: {
            hover: {
              fill: themeColor?.chart?.rangeSelector?.btn_hover_bg,
              style: {
                color: themeColor?.chart?.rangeSelector?.btn_hover_color,
              },
            },
            select: {
              fill: themeColor?.chart?.rangeSelector?.btn_active_bg,
              style: {
                color: themeColor?.chart?.rangeSelector?.btn_active_color,
              },
            },
          },
        },

        inputStyle: {
          color: themeColor?.chart?.rangeSelector?.inputColor,
        },
        labelStyle: {
          color: themeColor?.chart?.rangeSelector?.labels,
        },
      },
    }
  : {};

const series = props.series ?? [];
let colors = props.colors ?? [
  "#A084E8",
  "#6F61C0",
  "#241468",
  "#9F0D7F",
  "#EA1179",
  "#F79BD3",
];
const overrideOptions = props.overrideOptions || {};
const chartOption = {
  title: "chart title",
  subtitle: "",
  legend: false,
  stacking: false,
  ...props.chartOption,
};
let spinnerColors = props?.spinnerColors.length >= 0 && {
  color1: props?.spinnerColors[0],
  color2: props?.spinnerColors[1],
};
const other_colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
if (series.length > colors.length) {
  for (let i = colors.length; i < series.length; i++) {
    colors.push(other_colors[i % other_colors.length]);
  }
}
if (series.length > colors.length) {
  for (let i = colors.length; i < series.length; i++) {
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
}
const chartSeries = series.reduce(
  (totalChartData, series, i) => {
    let yAxis;
    let data;
    const index = totalChartData.yAxis.findIndex(
      (axis) => axis._id === series.axisId
    );
    if (index === -1) {
      yAxis = {
        _id: series.axisId,
        offset: 15,
        margin: 10,
        title: { text: series.name, style: { color: colors[i] } },
        labels: { style: { color: colors[i] } },
      };
      data = {
        yAxis: totalChartData.yAxis.length,
        name: series.name,
        type: series.type,
        data: series.data,
      };
      if (totalChartData.yAxis.length % 2 !== 0) yAxis.opposite = false;
      totalChartData.yAxis.push(yAxis);
    } else {
      data = {
        yAxis: index,
        name: series.name,
        type: series.type,
        data: series.data,
      };
    }

    totalChartData.data.push(data);
    return totalChartData;
  },
  { yAxis: [], data: [] }
);
State.init({
  isLoading: true,
});
const code = `
<html>
  <head>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"
    ></script>
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <script src="https://code.highcharts.com/modules/no-data-to-display.js"></script>
  </head>
  <body>
    <div id="container"></div>
  </body> 
  <script>
  
window.addEventListener("message", function (event) {}, false);

const handleMessage = (message) => {
  const { chartSeries, colors, chartOption, overrideOptions, theme} = message;
  const stacking = chartOption.stacking
    ? chartOption.stacking === "normal" || chartOption.stacking === "percent"
      ? chartOption.stacking
      : undefined
    : undefined;

   Highcharts.theme=theme;
   Highcharts.setOptions( Highcharts.theme);

  const chart = 
  Highcharts.stockChart("container", {
    chart: {
      backgroundColor: "transparent",
      zooming: {
        mouseWheel: false,
      },
    },
    colors: colors,
    navigator: {
      enabled: false,
    },
    title: {
      text: chartOption.title,
      align: "center",
    },
    subtitle: {
      text: chartOption.subtitle,
      align: "center",
    },
    plotOptions: {
      column: {
        stacking: stacking,
      },
    },
    yAxis: chartSeries.yAxis,
    xAxis: {
      type: "datetime",
    },
    rangeSelector: {
      // buttons: [
      //   {
      //     type: "day",
      //     count: 2,
      //     text: "1d",
      //   },
      //   {
      //     type: "week",
      //     count: 1,
      //     text: "1m",
      //   },
      //   {
      //     type: "month",
      //     count: 1,
      //     text: "2m",
      //   },
      //   {
      //     type: "all",
      //     count: 1,
      //     text: "All",
      //   },
      // ],
      selected: 1,
      inputEnabled: true,
    },
    lang: {
      noData: "no data to display",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
    tooltip: {
      split : true,
    },
    legend: {
      enabled: chartOption.legend,
    },
    series: chartSeries.data,
    ...overrideOptions
  });
  window.iFrameResizer.onMessage = () => {};
};

window.iFrameResizer = {
  onMessage: handleMessage,
};
  </script>
</html>
`;

return (
  <div
    className="w-100 d-flex justify-content-center align-items-center"
    style={{
      minHeight: "300px",
      minWidth: "300px",
    }}
  >
    <>
      <div className={`w-100 ${state.isLoading ? "d-block" : "d-none"}`}>
        <Widget
          src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
          props={{ ...spinnerColors }}
        />
      </div>
      <iframe
        iframeResizer
        className={`w-100 ${state.isLoading ? "d-none" : "d-block"}`}
        srcDoc={code}
        message={{
          chartSeries,
          colors,
          chartOption,
          overrideOptions,
          theme,
        }}
        onLoad={() => {
          State.update({
            isLoading: false,
          });
        }}
      />
    </>
  </div>
);

// {
//   "series": [
//     {
//       "data": [
//         [
//           timestamp,
//           value
//         ]
//       ], // data timestamp must be sorted
//       "name": "series name",
//       "type": "spline - line - area - areaspline - column",
//       "axisId":1-2-... datasets with the same axis range must be have equal id
//     }
//   ],
//   "colors": [
//     "color1",
//     "color2"
//   ], // optional
//   "chartOption": {
//     "title": "chart title",
//     "subtitle": "chart subtitle",
//     "legend": true - false,
//     "stacking":"false - normal - percent" // optional , only column charts can be stacked ,
//      "background":"black"
//   },
//    "spinnerColors":[],  // optional , two colors
//    "overrideOptions":{},
//  themeColor: {
//     chart: {
//       title: "red",
//       subtitle: "blue",
//       xAxis: "red",
//       yAxis: "blue",
//       legend: "green",
//       legendHover: "blue",
//       rangeSelector: {
//         labels: "red",
//         inputColor: "blue",
//         btn_bg: "red",
//         btn_color: "blue",
//         btn_hover_bg: "red",
//         btn_hover_color: "blue",
//         btn_active_bg: "red",
//         btn_active_color: "blue",
//       },
//     },
//   },
// }
