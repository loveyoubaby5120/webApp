export const bar = (legendData, yAxisData, seriesData) => {
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            top: 20,
            data: legendData,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                saveAsImage: {},
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
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
            top: 20,
            data: legendData,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                saveAsImage: {},
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
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
