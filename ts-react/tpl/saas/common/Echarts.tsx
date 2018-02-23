export const bar = (legendData, yAxisData, seriesData) => {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      bottom: 0,
      data: legendData,
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '5%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
      },
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: yAxisData,
      },
    ],
    series: seriesData,
  };

  return option;
};

export const reBar = (legendData, yAxisData, seriesData) => {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      bottom: 0,
      data: legendData,
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: yAxisData,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: seriesData,
  };

  return option;
};

export const radar = (legendData, indicatorData, seriesData) => {
  let option = {
    tooltip: {},
    legend: {
      data: legendData,
    },
    radar: {
      // shape: 'circle',
      indicator: indicatorData,
    },
    series: seriesData,
  };
  return option;
};

export const pie = (legendData, seriesData) => {
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      top: 20,
      x: 'center',
      data: legendData,
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    series: seriesData,
  };
  return option;
}

export const map = (legendData, seriesData) => {
  let option = {
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      data: legendData,
      textStyle: {
        color: '#000',
      },
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false,
        },
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#eaeaea',
          borderColor: '#d4d3d3',
        },
        emphasis: {
          areaColor: '#d4d3d3',
        },
      },
    },
    series: seriesData,
  };

  return option;
}



export const verticalBar = (data, sdata, name) => {
  const optionverticalBar = {
    color: ['#24a8ff'],
    grid: {
      left: '10%',
      right: '15%',
      bottom: '15%',
      containLabel: false
    },
    xAxis: [
      {
        type: 'category',
        data: data,
        show: true,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#e4e4e4'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        show: true,
        axisLabel: {
          show: true,
          interval: 0,
          formatter: '{value} %',
          textStyle: {
            color: '#999'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#e4e4e4'
          }
        },
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        data: sdata,
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: '{c} %',
          }
        },
      }
    ],
    toolbox: {
      show: true,
      right: 50,
      feature: {
        saveAsImage: {
          show: true,
          name: `${name}-柱状图`,
        }
      }
    },
  };
  return optionverticalBar;
}

export const crossBar = (ydata, sdata, name) => {
  const optioncrossBar = {
    color: ['#24a8ff'],
    grid: {
      left: '15%',
      right: '15%',
      bottom: '15%',
      containLabel: false,
    },
    yAxis: [
      {
        type: 'category',
        data: ydata,
        show: true,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          show: true,
          interval: 0,
          formatter: function (value, index) {
            if (value.length <= 6) {
              return `${value}`;
            } else if (value.length > 6 && value.length <= 12) {
              return `
                      ${value.slice(0, 6)}
                      ${value.slice(6, value.length)}
                      `;
            } else {
              return `
                      ${value.slice(0, 6)}
                      ${value.slice(6, 11)}…
                      `;
            }
          },
          textStyle: {
            color: '#999'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e4e4e4'
          }
        },
      }
    ],
    xAxis: [
      {
        type: 'value',
        show: true,
        axisLabel: {
          show: true,
          interval: 0,
          formatter: '{value} %',
          textStyle: {
            color: '#999'
          }
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e4e4e4'
          }
        },
      },
    ],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        data: sdata,
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{c} %',
          }
        },
      }
    ],
    toolbox: {
      show: true,
      right: 50,
      feature: {
        saveAsImage: {
          show: true,
          name: `${name}-条形图`
        }
      }
    },
  };
  return optioncrossBar;
}

export const line = (data, sdata, name) => {
  const optionline = {
    color: ['#24a8ff'],
    grid: {
      left: '10%',
      right: '15%',
      bottom: '15%',
      containLabel: false,
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{a} <br />{b}:({c}%)',
    },
    xAxis: {
      show: true,
      type: 'category',
      axisLine: {
        onZero: true,
        lineStyle: {
          color: '#e4e4e4'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      },
      boundaryGap: false,
      data: data,
    },
    yAxis: {
      show: true,
      type: 'value',
      axisLabel: {
        formatter: '{value} %',
        textStyle: {
          color: '#999'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#e4e4e4'
        }
      },
    },
    series: [
      {
        type: 'line',
        smooth: true,
        name: '人数比例',
        data: sdata,
      }
    ],
    toolbox: {
      show: true,
      right: 50,
      feature: {
        saveAsImage: {
          show: true,
          name: `${name}-折线图`
        }
      }
    },
  };
  return optionline;
}

export const pie2 = (data, sdata, name) => {
  const optionpie2 = {
    color: ['#24a8ff', '#6a74ce', '#72c3f9', '#7ed321'],
    legend: {
      top: 30,
      orient: 'vertical',
      left: 'left',
      data: data,
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    grid: {
      left: '10%',
      right: '15%',
      bottom: '15%',
      containLabel: false
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        name: '人数比例',
        radius: '60%',
        data: sdata,
        label: {
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold',
            }
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          normal: {
            label: {
              show: true,
              formatter: '{b} : ({d}%)'
            },
            labelLine: {
              show: true
            }
          },
        },
      },
    ],
    toolbox: {
      show: true,
      right: 50,
      feature: {
        saveAsImage: {
          show: true,
          name: `${name}-饼状图`
        }
      },
    },
  };
  return optionpie2;
}

export const circle = (data, sdata, name) => {
  const optioncircle = {
    legend: {
      top: 30,
      orient: 'vertical',
      left: 'left',
      data: data,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br />{b}:({d}%)',
    },
    grid: {
      left: '10%',
      right: '15%',
      bottom: '15%',
      containLabel: false
    },
    color: ['#24a8ff', '#6a74ce', '#72c3f9', '#7ed321'],
    series: [
      {
        type: 'pie',
        name: '人数比例',
        radius: ['45%', '60%'],
        label: {
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold',
            }
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          normal: {
            label: {
              show: true,
              formatter: '{b} : ({d}%)'
            },
            labelLine: {
              show: true
            }
          },
        },
        data: sdata,
      },
    ],
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    toolbox: {
      show: true,
      right: 50,
      feature: {
        saveAsImage: {
          show: true,
          name: `${name}-环形图`
        }
      },
    },
  };
  return optioncircle;
};