import React from 'react'
import { Link } from 'react-router'

export default class D3 extends React.Component {
    
    //报表相关
    format = d3.time.format("%m/%d/%y");

    margin = {top: 20, right: 40, bottom: 80, left: 30};

    width = 640 - this.margin.left - this.margin.right;

    height = 450 - this.margin.top - this.margin.bottom;

    _legendbottom = -30;


    x = d3.time.scale()
        .range([0, this.width]);

    y = d3.scale.linear()
        .range([this.height, 0]);

    xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom")
        .ticks(d3.time.weeks)
        .tickFormat(d3.time.format("%b%e"));

    xAxis_se = d3.svg.axis()
        .scale(this.x)
        .orient("bottom")
        .ticks(d3.time.days)
        .tickFormat(d3.time.format("%b%e"));

    xAxis_th = d3.svg.axis()
        .scale(this.x)
        .orient("bottom")
        .ticks(d3.time.weeks)
        .tickFormat(d3.time.format("%b%e"));

    yAxis = d3.svg.axis()
        .scale(this.y);

    stack = d3.layout.stack()
        .offset("silhouette")
        .values(function(d) { return d.values; })
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

    nest = d3.nest()
        .key(function(d) { return d.key; });

    line = d3.svg.line() // <-D
        .x(function(d){return x(d.date);})
        .y(function(d){return y(d.y);})
                    
        
    constructor(props) {
        super(props);
        
        

        this.state = {
            type: this.props.type,
            topicArray: this.props.topicArray,
            topicColor: this.props.topicColor,
            topicDateTime: this.props.topicDateTime
        }


        //报表相关
        // datearray: datearray,
        // format: format,
        // margin: margin,
        // width: width,
        // height: height,
        // _legendbottom: _legendbottom,
        // tooltip: tooltip,
        // x: x,
        // y: y,
        // xAxis: xAxis,
        // xAxis_se: xAxis_se,
        // xAxis_th: xAxis_th,
        // yAxis: yAxis,
        // stack: stack,
        // nest: nest,
        // area: area,
        // svg: svg,
        // line: line,
        // svg1: svg1

        // window.addEventListener('message', function(e) {
        //     // console.log('bar say: '+e.data);
        // }, false);


    }

    componentWillMount(){
        this.accessChange();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.type==0){
            return false;
        }

        // this.state.topicArray != newProps.topicArray.join(',')
        // if(this.state.type != newProps.type || this.state.topicDateTime != newProps.topicDateTime){
            this.state.topicArray = newProps.topicArray;
            this.state.topicColor = newProps.topicColor;
            this.state.topicDateTime = newProps.topicDateTime;
            this.state.type = newProps.type;
            this.accessChange();
        // }


    }


    //设置颜色
    renderLegend(color, data, s){  
        var margin = this.margin;
        var _legendbottom = this._legendbottom;
        var height = this.height;

        var len = data.length;
        color = color.slice(0, len);

        var legend = s.selectAll(".legend")  
            // .data(_colors.domain())  
            .data(color)
            .enter()  
            .append("g")  
            .attr("class", "legend")
            .attr("transform", function(d, i) {  
                var legendX = i * 120 + margin.left;   //set position for each legend element  
                var legendY = height - _legendbottom;  
                return "translate(" + legendX + ", " + legendY + ")";  
            });  

          
        legend.append("rect")  
            .attr("x", 0)  
            .attr("y", 1)  
            .attr("width", 16)  
            .attr("height", 8)  
            .style("fill", function(d){
                return d;
            });  
          
        legend.append("text")
            .data(data)
            .attr("x", 20)  
            .attr("y", 9)  
            .classed("legendtext", true)  
            .text(function(d) {  
                return d.key;  
            });  
    }

    

    chart(data){
        var _this = this;
        var topicDateTime = this.state.topicDateTime;
        var topicArray = this.state.topicArray;

        var stack = this.stack;
        var nest = this.nest;
        var format = this.format;
        var height = this.height;
        var width = this.width;
        var margin = this.margin;
        var x = this.x;
        var y = this.y;
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        var datearray = [];
        // var svg = this.svg;
        
        var svg;
        if(d3.select("#main svg")[0][0]){
            svg = d3.select("#main svg g")
        }
        else{
            svg = d3.select("#main").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");    
        }
        


        

        var area = d3.svg.area()
            .interpolate("cardinal")
            .x(function(d) { return x(d.date); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); });

        var tooltip = d3.select("#main")
                .append("div")
                .attr("class", "remove")
                .style("position", "absolute")
                .style("z-index", "20")
                .style("visibility", "hidden")
                .style("top", "30px")
                .style("left", "120px");

        var colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84"];
        var strokecolor = colorrange[0];
        var colorR = [[d3.rgb(179,0,0), d3.rgb(100,0,0)],[d3.rgb(227, 74, 51), d3.rgb(150, 74, 51)],[d3.rgb(252, 141, 89), d3.rgb(150, 141, 89)],[d3.rgb(253, 187, 132), d3.rgb(130, 187, 132)]];
        var z = d3.scale.ordinal()
                .range(colorrange);

        // var graph = d3.json(url, function(data){
            // var dayV = topicDateTime;
            // var a = [];


            // for(var i = 0; i < topicArray.length; i++){
            //     a[topicArray[i]-1] = topicArray[i]-1;
            // }

            // var ds = [];
            // data.forEach(function(d, i){
            //     if((a[i]) == i){
            //         ds = ds.concat(d.slice(d.length-dayV, d.length));
            //     }
            // });
            // data = ds;
            // if(!data.length){
            //     return true;
            // }

            
            // data.forEach(function(d){
            //     d.dateStr = d.date;
            //     d.date = format.parse(d.date);
            //     d.value = parseFloat(d.value.toFixed(2));
            // });


            var layers = stack(nest.entries(data));
            var colorArr = [];

            layers.forEach(function(d, i){
                var defs = svg.append("defs");
                var ad = colorR[i][0]
                var bd = colorR[i][1]
                var linearGradient = defs
                        .append("linearGradient")
                        .attr("id","linearColor"+i)  
                        .attr("x1","0%")  
                        .attr("y1","0%")  
                        .attr("x2","100%")  
                        .attr("y2","0%");  

                var start_color = ad.toString();
                var end_color = ad.toString();
                var item_color = ad.toString();

                if(d.values[0].zf==-1){
                    start_color = bd.toString();
                }
                if(d.values[d.values.length-1].zf==-1){
                    end_color = bd.toString();
                }

                var start = linearGradient
                                .append("stop")  
                                .attr("offset","0%")  
                                .style("stop-opacity", "1")
                                .style("stop-color",start_color);

                var offset = 100/d.values.length;
                var sum = 0;

                d.values.forEach(function(val,index){

                    sum += offset

                    if(val.zf==-1){
                        item_color = bd.toString();
                    }
                    else{
                        item_color = ad.toString();
                    }
                    var item = linearGradient
                                    .append("stop")  
                                    .attr("offset", sum+"%")  
                                    .style("stop-opacity", "1")
                                    .style("stop-color",item_color);          
                });

                var stop = linearGradient
                                .append("stop")  
                                .attr("offset","100%") 
                                .style("stop-opacity", "1") 
                                .style("stop-color",end_color);
                colorArr.push(linearGradient);
            });


            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

            svg.selectAll(".layer")
                .data(layers)
                .enter().append("path")
                .attr("class", "layer")
                .attr("d", function(d) { return area(d.values); })
                .style("fill",function(d,i){
                    return "url(#" + colorArr[i].attr("id") + ")";
                });


            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);


            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis.orient("left"));


            svg.selectAll(".layer")
                .attr("opacity", 1)
                .on("mouseover", function(d, i) {
                    svg.selectAll(".layer").transition()
                        .duration(250)
                        .attr("opacity", function(d, j) {
                                return j != i ? 0.6 : 1;
                        })
                })
                .on("mousemove", function(d, i) {
                    var mousex = d3.mouse(this);
                    var mousex = mousex[0];
                    var invertedx = x.invert(mousex);
                    invertedx = invertedx.getMonth() + invertedx.getDate();
                    var selected = (d.values);
                    for (var k = 0; k < selected.length; k++) {
                        datearray[k] = selected[k].date
                        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                    }

                    var mousedate = datearray.indexOf(invertedx);
                    var pro = d.values[mousedate].value;

                    d3.select(this)
                        .classed("hover", true)
                        .attr("stroke", strokecolor)
                        .attr("stroke-width", "0.5px"),
                        tooltip.html( "<p>" + d.key + "<br>" + pro + "<br>" + d.values[mousedate].dateStr + "</p>" ).style("visibility", "visible");

                })
                .on("mouseout", function(d, i) {
                    svg.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");

                    var mousex = d3.mouse(this);
                    var mousex = mousex[0];
                    var invertedx = x.invert(mousex);
                    invertedx = invertedx.getMonth() + invertedx.getDate();
                    var selected = (d.values);
                    for (var k = 0; k < selected.length; k++) {
                        datearray[k] = selected[k].date
                        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                    }

                    var mousedate = datearray.indexOf(invertedx);
                    var pro = d.values[mousedate].value;

                    d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "<br>" + d.values[mousedate].dateStr +  "</p>" ).style("visibility", "hidden");
                })


                var vertical = d3.select("#main")
                                    .append("div")
                                    .attr("class", "remove")
                                    .style("position", "absolute")
                                    .style("z-index", "19")
                                    .style("width", "1px")
                                    .style("height", "380px")
                                    .style("top", "10px")
                                    .style("bottom", "30px")
                                    .style("left", "-5px")
                                    .style("background", "#fff");

                d3.select("#main")
                    .on("mousemove", function(){  
                        var mousex = d3.mouse(this);
                        var mousex = mousex[0] + 5;
                        vertical.style("left", mousex + "px" )
                    })
                    .on("mouseover", function(){  
                        var mousex = d3.mouse(this);
                        var mousex = mousex[0] + 5;
                        vertical.style("left", mousex + "px")
                    });

                _this.renderLegend(colorrange, layers, svg);

        // })
    }


    zx(data){
        var _this = this;
        var topicDateTime = this.state.topicDateTime;
        var topicArray = this.state.topicArray;

        var stack = this.stack;
        var nest = this.nest;
        var format = this.format;
        var height = this.height;
        var width = this.width;
        var margin = this.margin;
        var x = this.x;
        var y = this.y;
        var xAxis = this.xAxis;
        var yAxis = this.yAxis;
        var datearray = [];

        var svg1;

        if(d3.select("#main2 svg")[0][0]){
            svg = d3.select("#main svg g")
        }
        else{
            svg1 = d3.select("#main2").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        }


        var stack = d3.layout.stack()
                    .offset("zero")
                    .values(function(d) { return d.values; })
                    .x(function(d) { return d.date; })
                    .y(function(d) { return d.value; });


        var colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84"];
        var strokecolor = colorrange[0];


        var z = d3.scale.ordinal()
                .range(colorrange);

        // var graph = d3.json(url, function(data){
            // var dayV = topicDateTime;
            // var a = [];


            // for(var i = 0; i < topicArray.length; i++){
            //     a[topicArray[i]-1] = topicArray[i]-1;
            // }

            // var ds = [];
            // data.forEach(function(d, i){
            //     if((a[i]) == i){
            //         ds = ds.concat(d.slice(d.length-dayV, d.length));
            //     }
            // });
            // data = ds;
            // if(!data.length){
            //     return true;
            // }

            
            // data.forEach(function(d){
            //     d.dateStr = d.date;
            //     d.date = format.parse(d.date);
            //     // d.date = new Date(d.date).Format("yyyy-MM-dd");
            //     d.value = parseFloat(d.value.toFixed(2));
            // });


            var layers = stack(nest.entries(data));
            var colorArr = [];

            var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer.values, function(d) { return d.y; }); });
            var yStackMax = d3.max(layers, function(layer) { return d3.max(layer.values, function(d) { return d.y0 + d.y; }); });

            var x = d3.scale.ordinal()
                .domain(layers[0].values.map(function(d) { return d.date; }))
                .rangeRoundBands([0, width], .1, 0);    
            y.domain([0, yStackMax]);


            var layer = svg1.selectAll(".layer")
                            .data(layers)
                            .enter().append("g")
                            .attr("class", "layer")
                            .style("fill", function(d, i) {
                                return z(i); 
                             });


            var rect = layer.selectAll("rect")
                            .data(function(d) { return d.values; })
                            .enter().append("rect")
                            .attr("x", function(d) { return x(d.date); })
                            .attr("y", height)
                            .attr("width", x.rangeBand())
                            .attr("height", 0)


            rect.transition()
                .delay(function(d, i) { return i * 10; })
                .attr("y", function(d) { return y(d.y0 + d.y); })
                .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

            svg1.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            d3.selectAll("#changeInput input").on("click", change);

            var tooltip2 = d3.select("#main2")
                            .append("div")
                            .attr("class", "remove")
                            .style("position", "absolute")
                            .style("z-index", "20")
                            .style("visibility", "hidden")
                            .style("top", "10px")
                            .style("left", "120px");

            svg1.append("g")
                .attr("class", "y axis")
                .call(yAxis.orient("left"));

            var timeout = setTimeout(function() {
                d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
            }, 2000);

            function change() {
                clearTimeout(timeout);
                // console.log('事件');
                if (this.value === "grouped") transitionGrouped();
                else transitionStacked();
            }

            function transitionGrouped() {
                // console.log('第一个');
                y.domain([0, yGroupMax]);

                rect.transition()
                    .duration(500)
                    .delay(function(d, i) { return i * 10; })
                    .attr("x", function(d, i, j) { return x(d.date) + x.rangeBand()/layers.length * j; })
                    .attr("width", x.rangeBand()/layers.length)
                    .transition()
                    .attr("y", function(d) { return y(d.y); })
                    .attr("height", function(d) { return height - y(d.y); });
            }

            function transitionStacked() {
                // console.log('第二个');
                y.domain([0, yStackMax]);

                    rect.transition()
                    .duration(500)
                    .delay(function(d, i) { return i * 10; })
                    .attr("y", function(d) { return y(d.y0 + d.y); })
                    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
                    .transition()
                    .attr("x", function(d) { return x(d.date); })
                    .attr("width",  x.rangeBand() - 1);
            }


            svg1.selectAll(".layer")
                .attr("opacity", 1)
                .on("mouseover", function(d, i) {
                    svg1.selectAll(".layer").transition()
                    .duration(250)
                    .attr("opacity", function(d, j) {
                        return j != i ? 0.6 : 1;
                    })
                })
                .on("mousemove", function(d, i) {
                    var mousex = d3.mouse(this)[0];
                    var leftEdges = x.range();
                    var width = x.rangeBand();
                    var j;
                    for(j=0; mousex > (leftEdges[j] + width); j++) {}
                    var invertedx = x.domain()[j];
                    invertedx = invertedx.getMonth() + invertedx.getDate();
                    var selected = (d.values);
                    for (var k = 0; k < selected.length; k++) {
                        datearray[k] = selected[k].date
                        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                    }

                    var mousedate = datearray.indexOf(invertedx);
                    var pro = d.values[mousedate].value;
                    var eventData = d.values[mousedate].event;

                    d3.select(this)
                        .classed("hover", true)
                        .attr("stroke", strokecolor)
                        .attr("stroke-width", "0.5px"), 
                        tooltip2.html( "<p>" + d.key + "<br>" + pro + "<br>" + d.values[mousedate].dateStr + "<br>" + eventData +"</p>" ).style("visibility", "visible");

                })
                .on("mouseout", function(d, i) {
                    svg1.selectAll(".layer")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");

                    var mousex = d3.mouse(this)[0];
                    var leftEdges = x.range();
                    var width = x.rangeBand();
                    var j;
                    for(j=0; mousex > (leftEdges[j] + width); j++) {}
                    var invertedx = x.domain()[j];
                    invertedx = invertedx.getMonth() + invertedx.getDate();
                    var selected = (d.values);
                    for (var k = 0; k < selected.length; k++) {
                        datearray[k] = selected[k].date
                        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                    }

                    var mousedate = datearray.indexOf(invertedx);
                    var pro = d.values[mousedate].value;
                    var eventData = d.values[mousedate].event;

                    d3.select(this)
                    .classed("hover", false)
                    .attr("stroke-width", "0px"), tooltip2.html( "<p>" + d.key + "<br>" + pro + "<br>" + d.values[mousedate].dateStr + "<br>" + eventData +"</p>" ).style("visibility", "hidden");
                })


            var vertical = d3.select("#main2")
                .append("div")
                .attr("class", "remove")
                .style("position", "absolute")
                .style("z-index", "19")
                .style("width", "1px")
                .style("height", "380px")
                .style("top", "10px")
                .style("bottom", "30px")
                .style("left", "0px")
                .style("background", "#fff");

            d3.select("#main2")
                .on("mousemove", function(){  
                    var mousex = d3.mouse(this);
                    var mousex = mousex[0];
                    vertical.style("left", mousex + "px" )
                })
                .on("mouseover", function(){  
                    var mousex = d3.mouse(this);
                    var mousex = mousex[0];
                    vertical.style("left", mousex + "px")
                });

            _this.renderLegend(colorrange, layers, svg1);


        // })
    }

    //切换 数据
    accessChange(){

        if(this.state.topicArray.length == 0){
            d3.selectAll('#main *,#main2 *').remove();
            $("#main *,#main2 *").remove();
            return false;
        }
        var _this = this;
        var topicDateTime = this.state.topicDateTime;
        var topicArray = this.state.topicArray;
        var format = this.format;


        d3.selectAll('#main g *,#main2 *,#main .remove,#main2 .remove').remove();


        if(this.state.topicDateTime == 30){
          this.xAxis = this.xAxis_th;
        }else {
          this.xAxis = this.xAxis_se;
        }

        $.ajax({
            url: '/topic_hot?gzh_type=' + this.state.type + '&topicArray='+topicArray+'&topicDateTime='+topicDateTime,
            // url: '/js/index/info/right/d3-demo/d4.json',
            async: true,
            success: function(data){


                if(!data.length){
                    return true;
                }
                
                data.forEach(function(d){
                    d.date = new Date(d.time);
                    d.dateStr = d.date.getFullYear()+"-"+(d.date.getMonth()+1)+"-"+d.date.getDate();
                    // d.date = format.parse(d.date);
                    // d.value = parseFloat(d.hot.toFixed(2));
                    d.value = d.hot;
                    d.key = d.name;
                    d.event = d.event ? d.event : '';
                });

                _this.chart(data);
                _this.zx(data);
            },
            error: function(msg){
                console.log(msg);
            }
        });

        // this.chart('');
        // this.zx('/js/index/info/right/d3-demo/d4.json');
        

    }

    render() {

        return (
             <div className={ this.state.topicArray.length == 0 ? 'chart none' : "chart"}>
                <div id="main"></div>
                <form id="changeInput">
                    <label><input type="radio" name="mode" value="grouped" /> Grouped&nbsp;&nbsp;</label>
                    <label><input type="radio" name="mode" value="stacked" defaultChecked /> Stacked</label>
                </form>
                <div id="main2"></div>
             </div>
        )
    }    

}
