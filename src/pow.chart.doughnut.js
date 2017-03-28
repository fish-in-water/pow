(function (root) {

  var POW = root.POW;

  //构造函数
  POW.Chart.Doughnut = function (render, width, height) {
    POW.Chart.Core.call(this, render, width, height);
  };

  //继承
  POW.Chart.Core.prototype._inheritPrototype(POW.Chart.Doughnut, POW.Chart.Core);

  //原型
  var _p = POW.Chart.Doughnut.prototype;

  //默认值
  _p._DEFAULT = {
    "chart": {
      "doughnutRadius": "",
      "doughnutThickness": "30",
      "doughnutPadding": "20",
      "startingAngle": "0",

      //LEGEND
      "legendAngle": "0",
      "legendPadding": "0",

      //PLOT
      "plotBorderThickness": "1.5",
      "plotBorderColor": "FF0000",
      "plotBorderAlpha": "0",
      "plotFillAlpha": "30",
      "plotBorderDashed": "0",
      "plotBorderDashedStyle": "0",
      "plotPadding": "10",

      //TOOLTOP
      "seriesNameInToolTip": "1",
      "dataValueInToolTip": "1",
      "percentInToolTip": "1",

      //VALUELABEL
      "showValueLabel": "1",
      "valueLabelPadding": "5",
      "seriesNameInValueLabel": "1",
      "dataValueInValueLabel": "1",
      "percentInValueLabel": "1",
      "valueLabelSepChar": ", ",
      "valueLabelOutside": "1",

      //LABELLINE
      "showLabelLine": "1",
      "labelLineSlanted": "1",
      "labelLinePadding": "2",
      "labelLineClearance": "15",
      "labelLineDistance": "10",
      "labelLineColor": "545454",
      "labelLineThickness": "1",
      "labelLineAlpha": "100",
      "labelLineDashed": "0",
      "labelLineDashedStyle": "-",

      //DATASET
      "dataset": [{
        "seriesName": "",
        "startingAngle": "",

        "fillColor": "",
        "fillAlpha": "",
        "borderColor": "",
        "borderAlpha": "",
        "borderDashed": "",
        "borderDashedStyle": "",

        "set": [{
          "label": "",
          "value": "0",
          "displayValue": "",
          "toolText": "",
          "fillColor": "",
          "fillAlpha": "",
          "borderColor": "",
          "borderAlpha": "",
          "borderDashed": "",
          "borderDashedStyle": ""
        }]
      }]
    }
  };

  // //资源文件
  // _p._RESOURCE = {
  //   //ToDo
  // };
	//
  // //常量
  // _p._CONST = {
  //   //ToDo
  // };

  //继承默认值
  POW.Chart.Core.prototype._extendObject(_p._DEFAULT, POW.Chart.Core.prototype._DEFAULT);
  //继承资源
  POW.Chart.Core.prototype._extendObject(_p._RESOURCE, POW.Chart.Core.prototype._RESOURCE);
  //继承常量
  POW.Chart.Core.prototype._extendObject(_p._CONST, POW.Chart.Core.prototype._CONST);

  //设置数据
  _p.setData = function (data) {

    //默认值
    this._setDefault(data);

    //校正数据
    this._adjustData(data);

    //初始化BBOX
    this._initBBox(data);

    //画基础信息
    this._drawBase(data);

    //画基础信息
    this._drawDoughnut(data);
  };

  //初始化数据
  _p._getDataByUrl = function (dataUrl) {
    var xmlDocument = this._loadXmlUrl(dataUrl);
    var chart = this._tranXml2Object(xmlDocument);
    this._setDefault(chart);
    this._adjustData(chart);
    return chart;
  };

  //设置默认数据
  _p._setDefault = function (chart) {
    this._standardizeObject(chart, this._DEFAULT.chart);
  };

  //修正数据
  _p._adjustData = function (chart) {
    chart.showLegend4Doughnut = chart.showLegend;
    chart.showLegend = this._CONST.DISABLE;

  };

  //开始画图
  _p._drawDoughnut = function (chart) {
    //plot basic info
    this._setPatternInfo(chart);
    //create cake
    this._createPatternPlot(chart);
    //create series name
    this._createSeriesName(chart);
  };

  //画序列名称
  _p._createSeriesName = function (chart) {
    var datasets = chart.dataset;
    if (!datasets) {
      return null;
    }
    var showLegend4Doughnut = chart.showLegend4Doughnut;
    if (this._CONST.ENABLE !== showLegend4Doughnut) {
      return;
    }
    var canvasBBox = this._getCanvasBBox(chart);
    var x0 = Math.floor((canvasBBox.x + canvasBBox.x2) / 2);
    var y0 = Math.floor((canvasBBox.y + canvasBBox.y2) / 2);
    var legendAngle = Math.floor(chart.legendAngle - 0) % 360;
    var legendPadding = Math.floor(chart.legendPadding - 0);
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.LEGEND);
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      //var dataset = datasets[i].set;
      var radius = datasets[i].radius;
      var thickness = datasets[i].thickness;
      var seriesName = datasets[i].seriesName;
      if (!seriesName) {
        continue;
      }
      var cx = x0 + (radius - thickness / 2 + legendPadding) * Math.sin(legendAngle / 180 * Math.PI);
      var cy = y0 - (radius - thickness / 2 + legendPadding) * Math.cos(legendAngle / 180 * Math.PI);
      if (Raphael.vml) {
        cx += 1;
        cy += 2;
      }

      this._createText({
        "text": seriesName,
        "cx": cx,
        "cy": cy,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold
      });
    }
  };


  //画图
  _p._createPatternPlot = function (chart) {
    var datasets = chart.dataset;
    if (!datasets) {
      return null;
    }

    var plotBorderThickness = chart.plotBorderThickness - 0;
    var plotBorderColor = chart.plotBorderColor;
    var plotBorderAlpha = Math.floor(chart.plotBorderAlpha - 0) / 100;
    var plotBorderDashed = chart.plotBorderDashed;
    var plotBorderDashedStyle = chart.plotBorderDashedStyle;
    var plotFillAlpha = Math.floor(chart.plotFillAlpha - 0);
    var plotPadding = Math.floor(chart.plotPadding - 0);

    var canvasBBox = this._getCanvasBBox(chart);
    var x0 = Math.floor((canvasBBox.x + canvasBBox.x2) / 2);
    var y0 = Math.floor((canvasBBox.y + canvasBBox.y2) / 2);

    //底色
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      var radius = datasets[i].radius;
      var thickness = datasets[i].thickness;
      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        var startAngle = data.startAngle;
        var endAngle = data.endAngle;
        var fillColor = data.fillColor || datasets[i].fillColor;
        var fillAlpha = Math.floor((data.fillAlpha || datasets[i].fillAlpha || plotBorderAlpha) - 0) / 100;
        var borderColor = data.borderColor || datasets[i].borderColor || plotBorderColor;
        var borderAlpha = data.borderAlpha || datasets[i].borderAlpha || plotBorderAlpha;
        var borderDashed = data.borderDashed || datasets[i].borderDashed || plotBorderDashed;
        var borderDashedStyle = this._CONST.ENABLE === borderDashed ?
          (data.borderDashedStyle || datasets[i].borderDashedStyle || plotBorderDashedStyle) : "";

        var dx = 0;
        var dy = 0;

        if (0 === plotBorderThickness) {
          dx = 0 - 1 * Math.sin((startAngle + endAngle) / 2 / 180 * Math.PI);
          dy = 1 * Math.cos((startAngle + endAngle) / 2 / 180 * Math.PI);
        }

        var renderElement = this._createCake({
          "cx": x0,
          "cy": y0,
          "dx": dx,
          "dy": dy,
          "radius": radius,
          "thickness": thickness,
          "start-angle": startAngle,
          "end-angle": endAngle,
          "stroke": borderColor,
          "stroke-width": plotBorderThickness,
          "stroke-opacity": borderAlpha,
          "stroke-dasharray": borderDashedStyle,
          "fill": fillColor,
          "fill-opacity": fillAlpha
        });

        renderElement.node["click-data"] = data.click;
        renderElement.node["mouseover-data"] = data.mouseover;
        renderElement.node["mousemove-data"] = data.mousemove;
        renderElement.node["mouseout-data"] = data.mouseout;
        renderElement.node["tooltip-data"] = data.toolTip;
      }
    }

    //Mask
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var tmpset = datasets[i];

      var dataset = tmpset.set;
      var radius = tmpset.radius;
      var thickness = tmpset.thickness;
      var fillColor = tmpset.fillColor;
      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        var startAngle = data.startAngle;
        var endAngle = data.endAngle;

        var dx = 0;
        var dy = 0;

        if (0 === plotBorderThickness) {
          dx = 0 - 1 * Math.sin((startAngle + endAngle) / 2 / 180 * Math.PI);
          dy = 1 * Math.cos((startAngle + endAngle) / 2 / 180 * Math.PI);
        }

        var maskElement = this._createCake({
          "cx": x0,
          "cy": y0,
          "dx": dx,
          "dy": dy,
          "radius": radius,
          "thickness": thickness,
          "start-angle": startAngle,
          "end-angle": endAngle,
          "stroke": "#FFFFFF",
          "stroke-width": 0,
          "stroke-opacity": 0,
          "fill": "#FFFFFF",
          "fill-opacity": 0
        });

        maskElement.node["click-data"] = data.click;
        maskElement.node["mouseover-data"] = data.mouseover;
        maskElement.node["mousemove-data"] = data.mousemove;
        maskElement.node["mouseout-data"] = data.mouseout;
        maskElement.node["tooltip-data"] = data.toolTip;
      }
    }

    //VALUELABEL
    var showValueLabel = chart.showValueLabel;
    if (this._CONST.ENABLE === showValueLabel) {
      var canvasBBox = this._getCanvasBBox(chart);
      var cx = (canvasBBox.x + canvasBBox.x2) / 2;
      var cy = (canvasBBox.y + canvasBBox.y2) / 2;
      var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.VALUELABEL);
      var showLabelLine = chart.showLabelLine;
      var labelLineSlanted = chart.labelLineSlanted;
      var valueLabelOutside = chart.valueLabelOutside;
      var labelLinePadding = Math.floor(chart.labelLinePadding - 0);
      var labelLineClearance = Math.floor(chart.labelLineClearance - 0);
      var labelLineDistance = Math.floor(chart.labelLineDistance - 0);
      var labelLineColor = chart.labelLineColor;
      var labelLineThickness = Math.floor(chart.labelLineThickness - 0);
      var labelLineAlpha = Math.floor(chart.labelLineAlpha - 0) / 100;
      var labelLineDashedStyle = this._CONST.ENABLE === chart.labelLineDashed ?
        chart.labelLineDashedStyle : "";
      var valueLabelPadding = Math.floor(chart.valueLabelPadding - 0);
      for (var i = 0, ii = datasets.length; i < ii; i++) {
        var dataset = datasets[i].set;
        var radius = datasets[i].radius;
        for (var j = 0, jj = dataset.length; j < jj; j++) {
          var clearance = labelLineClearance;
          if (this._CONST.ENABLE === valueLabelOutside) {
            clearance += datasets[0].radius - datasets[i].radius;
          }

          var data = dataset[j];

          var textElement = this._createRadiantLabel({
            "cx": cx,
            "cy": cy,
            "radius": radius,
            "angle": data.middleAngle,
            "label": data.valueLabel,
            "label-padding": valueLabelPadding,
            "font-family": fontStyle.font,
            "font-size": fontStyle.size,
            "font-color": fontStyle.color,
            "font-weight": fontStyle.bold,
            "show-line": showLabelLine,
            "line-slanted": labelLineSlanted,
            "line-padding": labelLinePadding,
            "line-clearance": clearance,
            "line-distance": labelLineDistance,
            "line-color": labelLineColor,
            "line-thickness": labelLineThickness,
            "line-alpha": labelLineAlpha,
            "line-dashed-style": labelLineDashedStyle
          });

          textElement["click-data"] = data.click;
          textElement["mouseover-data"] = data.mouseover;
          textElement["mousemove-data"] = data.mousemove;
          textElement["mouseout-data"] = data.mouseout;
          textElement["tooltip-data"] = data.toolTip;
        }
      }
    }
  };

  //画饼
  _p._createCake = function (attr) {
    var cx = attr["cx"];
    var cy = attr["cy"];
    var dx = attr["dx"];
    var dy = attr["dy"];
    var radius = attr["radius"];
    var thickness = attr["thickness"];
    var startAngle = attr["start-angle"];
    var endAngle = attr["end-angle"];
    //var middleAngle = (startAngle + endAngle) / 2;
    var strokeWidth = attr["stroke-width"];

    var cakeElement = null;
    if (359.9 < endAngle - startAngle) {
      cakeElement = this._paper.circle(cx, cy, radius - thickness / 2)
        .attr({
          "stroke": this._getColor(attr["fill"]),
          "stroke-width": thickness,
          "stroke-opacity": attr["fill-opacity"]
        });

      //边框
      this._paper.circle(cx, cy, radius)
        .attr({
          "stroke": this._getColor(attr["stroke"]),
          "stroke-width": attr["stroke-width"],
          "stroke-opacity": attr["stroke-opacity"],
          "stroke-dasharray": attr["stroke-dasharray"]
        });

      this._paper.circle(cx, cy, radius - thickness)
        .attr({
          "stroke": this._getColor(attr["stroke"]),
          "stroke-width": attr["stroke-width"],
          "stroke-opacity": attr["stroke-opacity"],
          "stroke-dasharray": attr["stroke-dasharray"]
        });
    } else {
      //FILL
      var x0 = cx + (radius - thickness) * Math.sin(startAngle / 180 * Math.PI);
      var y0 = cy - (radius - thickness) * Math.cos(startAngle / 180 * Math.PI);
      var x1 = cx + radius * Math.sin(startAngle / 180 * Math.PI);
      var y1 = cy - radius * Math.cos(startAngle / 180 * Math.PI);
      var x2 = cx + radius * Math.sin(endAngle / 180 * Math.PI);
      var y2 = cy - radius * Math.cos(endAngle / 180 * Math.PI);
      var x3 = cx + (radius - thickness) * Math.sin(endAngle / 180 * Math.PI);
      var y3 = cy - (radius - thickness) * Math.cos(endAngle / 180 * Math.PI);

      var path = [];
      path[path.length] = ["M", x0, y0];
      path[path.length] = ["L", x1, y1];
      path[path.length] = ["A", radius, radius, 0, 180 <= (endAngle - startAngle) ? 1 : 0, 1, x2, y2];
      path[path.length] = ["L", x3, y3];
      path[path.length] = ["A", radius - thickness, radius - thickness, 1, 180 <= (endAngle - startAngle) ? 1 : 0, 0, x0, y0];
      cakeElement = this._paper.path(path)
        .attr({
          "stroke": this._getColor(attr["stroke"]),
          "stroke-width": attr["stroke-width"],
          "stroke-opacity": attr["stroke-opacity"],
          "stroke-dasharray": attr["stroke-dasharray"],
          "fill": this._getColor(attr["fill"]),
          "fill-opacity": attr["fill-opacity"],
          "stroke-linecap": "round",
          "stroke-linejoin": "miter"
        });
    }

    return cakeElement;

  };

  //设置绘图信息
  _p._setPatternInfo = function (chart) {
    var datasets = chart.dataset;
    if (!datasets) {
      return null;
    }

    //设置角度信息
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      var valueSum = 0;
      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        valueSum += (data.value || "0") - 0;
      }

      var seriesName = datasets[i].seriesName;
      var startingAngle = Math.floor(datasets[i].startingAngle || chart.startingAngle - 0) % 360;
      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        var value = (data.value || "0") - 0;
        var angle = value / valueSum * 360;

        data.startAngle = startingAngle;
        data.endAngle = startingAngle = startingAngle + angle;
        data.middleAngle = (data.startAngle + data.endAngle) / 2;
        data.formatValue = this._getFormatNumber(chart, value);
        data.percent = this._getFormatNumber(chart, value / valueSum * 100) + "%";
      }
    }

    //设置TOOLTIPS
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        data.toolTip = this._getToolTip(chart, datasets[i], data);
      }
    }

    //设置VALUELABEL
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      var seriesName = datasets[i].seriesName;
      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        data.valueLabel = this._getValueLabel(chart, datasets[i], data);
      }
    }

    var doughnutRadius = chart.doughnutRadius;
    var doughnutThickness = Math.floor(chart.doughnutThickness - 0);
    var doughnutPadding = Math.floor(chart.doughnutPadding - 0);
    var startingAngle = Math.floor(chart.startingAngle - 0);
    if (!doughnutRadius) {   //未设置
      doughnutRadius = Number.MAX_VALUE;
      for (var i = 0, ii = datasets.length; i < ii; i++) {
        var dataset = datasets[i].set;
        var radius = this._calcSmartRadius(chart, dataset, this._CONST.STYLEOBJECT.VALUELABEL);
        doughnutRadius = doughnutRadius < radius ? doughnutRadius : radius;
      }
    }

    //太多了
    var scale = doughnutRadius / (datasets.length * (doughnutThickness + doughnutPadding));
    scale = 1 <= scale ? 1 : scale;
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      datasets[i].radius = doughnutRadius - i * (doughnutThickness + doughnutPadding) * scale;
      datasets[i].thickness = doughnutThickness * scale;
    }
  };

}).call(this, window);
