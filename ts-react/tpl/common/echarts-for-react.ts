import { createStubComponent, replaceWithStubInTest } from 'common/test/stub-component';

let ReactEcharts = require('echarts-for-react').default;
ReactEcharts.defaultProps.notMerge = true;

ReactEcharts = replaceWithStubInTest(ReactEcharts);
export { ReactEcharts };
