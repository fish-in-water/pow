(function (root) {

  //命名空间
  var POW = root.POW;

  //构造函数
  POW.Chart.Radar = function (render, width, height) {
    POW.Chart.Core.call(this, render, width, height);
  };

  //寄生组合继承
  POW.Chart.Core.prototype._inheritPrototype(POW.Chart.Radar, POW.Chart.Core);

  //原型
  var _p = POW.Chart.Radar.prototype;

  //默认值
  _p._DEFAULT = {
    "chart": {
      "radarRadius": "",
      "startingAngle": "0",
      "radarBorderColor": "787878",
      "radarBorderThickness": "2",
      "radarBorderAlpha": "100",
      "radarBorderDashed": "0",
      "radarBorderDashedStyle": "-",
      "radarFillColor": "FFFFFF",
      "radarFillAlpha": "30",
      "radarSpikeColor": "C1C0BE",
      "radarSpikeThickness": "1",
      "radarSpikeAlpha": "100",
      "radarSpikeDashed": "0",
      "radarSpikeDashedStyle": "-",

      "divLineNum": "4",
      "divLineColor": "C1C0BE",
      "divLineThickness": "1",
      "divLineAlpha": "100",
      "divLineIsDashed": "0",
      "divLineDashStyle": "-",
      "showAlternateGridColor": "1",
      "alternateGridColor": "F6F6F6",
      "alternateGridAlpha": "100",
      "showZeroPlane": "1",
      "zeroPlaneColor": "545454",
      "zeroPlaneThickness": "2",
      "zeroPlaneAlpha": "100",
      "zeroPlaneIsDashed": "0",
      "zeroPlaneDashStyle": "-",
      "yAxisDivLineRoundNumber": "5",

      //TOOLTOP
      "seriesNameInToolTip": "1",
      "dataValueInToolTip": "1",

      //XAXISLABEL
      "showXAxisLabel": "1",
      "xAxisLabelPadding": "5",

      //YAxisLabel
      "showYAxisLabel": "1",
      "yAxisLabelPadding": "0",
      "yAxisLabelAngle": "",


      //VALUELABEL
      "showValueLabel": "1",
      "valueLabelPadding": "5",
      "seriesNameInValueLabel": "1",
      "dataValueInValueLabel": "1",
      "valueLabelSepChar": ", ",
      "valueLabelOutside": "1",

      //PLOT
      "plotBorderThickness": "1",
      "plotBorderColor": "",
      "plotBorderAlpha": "100",
      "plotBorderDashed": "0",
      "plotBorderDashedStyle": "-",
      "plotFillAlpha": "30",
      "plotFillColor": "",

      //ANCHOR
      "drawAnchors": "1",
      "anchorSides": "0",
      "anchorRadius": "3",
      "anchorBorderColor": "000000",
      "anchorBorderThickness": "1",
      "anchorBorderAlpha": "100",
      "anchorBgColor": "000000",
      "anchorBgAlpha": "100",

      //CATEGORIES
      "categories": {
        "category": [{
          "label": ""
        }]
      },

      //DATASET
      "dataset": [{
        "parentYAxis": "Y",
        "seriesName": "",

        "fillColor": "",
        "fillAlpha": "",
        "borderThickness": "1",
        "borderColor": "",
        "borderAlpha": "",
        "borderDashed": "",
        "borderDashedStyle": "",
        "drawAnchors": "1",
        "anchorsShowOnTop": "1",
        "anchorSides": "0",
        "anchorRadius": "3",
        "anchorBorderColor": "000000",
        "anchorBorderThickness": "1",
        "anchorBorderAlpha": "100",
        "anchorBgColor": "000000",
        "anchorBgAlpha": "100",

        "set": [{
          "label": "",
          "value": "0",
          "displayValue": "",
          "toolText": "",
          "fillColor": "",
          "fillAlpha": "",
          "borderThickness": "",
          "borderColor": "",
          "borderAlpha": "",
          "borderDashed": "",
          "borderDashedStyle": ""
        }]
      }]
    }
  };

  //资源文件
  _p._RESOURCE = {
    //ToDo
  };

  //常量
  _p._CONST = {
    //ToDo
  };

  //继承默认值
  POW.Chart.Core.prototype._extendObject(_p._DEFAULT, POW.Chart.Core.prototype._DEFAULT);
  POW.Chart.Core.prototype._extendObject(_p._RESOURCE, POW.Chart.Core.prototype._RESOURCE);
  POW.Chart.Core.prototype._extendObject(_p._CONST, POW.Chart.Core.prototype._CONST);

  //设置URL
  _p.setData = function (data) {

    //默认值
    this._setDefault(data);

    //轴线
    this._initAxises(data)

    //初始化BBOX
    this._initBBox(data);

    //画基础信息
    this._drawBase(data);

    //画基础信息
    this._drawRadar(data);
  };


  //设置XML
  _p.setDataXML = function (dataXML) {
    //ToDo
  };

  //设置JSON
  _p.setJSONData = function (dataXML) {
    //ToDo
  };

  //初始化数据
  _p._getDataByUrl = function (dataUrl) {
    var xmlDocument = this._loadXmlUrl(dataUrl);
    var chart = this._tranXml2Object(xmlDocument);
    this._setDefault(chart);
    this._initAxises(chart);
    return chart;
  };

  //轴信息
  _p._initAxises = function (chart) {
    var posReg = this._getPosReg(chart);
    var yAxisDiv = this._getYAxisDiv(chart, this._CONST.AXIS.Y, posReg, Math.floor(chart.divLineNum - 0), Math.floor(chart.yAxisDivLineRoundNumber - 0));

    var yAxiseset = [];
    for (var i = yAxisDiv.start; i <= yAxisDiv.end; i++) {
      yAxiseset[yAxiseset.length] = {
        "value": i * yAxisDiv.each,
        "label": this._getFormatNumber(chart, i * yAxisDiv.each)
      };
    }
    chart.axises =  {
      "yAxiseset": yAxiseset
    };

  };

  //设置默认数据
  _p._setDefault = function (chart) {
    this._standardizeObject(chart, this._DEFAULT.chart);
  };

  //修正数据
  _p._fixData = function (chart) {
    //To Do
  };

  //开始画图
  _p._drawRadar = function (chart) {
    //设置基础信息
    this._setPatternInfo(chart);
    //创建蜘蛛网
    this._createCobweb(chart);
    //创建图形
    this._createPatternPlot(chart);
  };


  //创建蜘蛛网
  _p._createCobweb = function (chart) {
    //创建雷达背景色
    this._createRadarBg(chart);
    //创建DIVLINE
    this._createDivLine(chart);
    //创建辐射条
    this._createRadarSpike(chart);
    //创建雷达背景色
    this._createRadarBorder(chart);
    //创建XAXISLABEL
    this._createXAxisLabel(chart);
    //创建YAXISLABEL
    this._createYAxisLabel(chart);
  };

  //创建XAXISLABEL
  _p._createXAxisLabel = function (chart) {
    var showXAxisLabel = chart.showXAxisLabel;
    if (this._CONST.ENABLE !== showXAxisLabel) {
      return;
    }
    var categories = !chart.categories || chart.categories.category;
    var radarRadius = Math.floor(chart.radarRadius - 0);
    var canvasBBox = this._getCanvasBBox(chart);
    var cx = (canvasBBox.x + canvasBBox.x2) / 2;
    var cy = (canvasBBox.y + canvasBBox.y2) / 2;
    var xAxisLabelPadding = Math.floor(chart.xAxisLabelPadding - 0);
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.XAXISLABEL);

    for (var i = 0, ii = categories.length; i < ii; i++) {
      var category = categories[i];
      var textElement = this._createRadiantLabel({
        "cx": cx,
        "cy": cy,
        "radius": radarRadius,
        "angle": category.middleAngle,
        "vertical-center": this._CONST.ENABLE,
        "label": category.label,
        "label-padding": xAxisLabelPadding,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "show-line": this._CONST.DISABLE
      });
    }
  };

  //创建YAXISLABEL
  _p._createYAxisLabel = function (chart) {
    var showYAxisLabel = chart.showYAxisLabel;
    if (this._CONST.ENABLE !== showYAxisLabel) {
      return;
    }
    var yAxiseset = chart.axises.yAxiseset;
    var categories = !chart.categories || chart.categories.category;
    var radarRadius = Math.floor(chart.radarRadius - 0);
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.PYAXISLABEL);
    var canvasBBox = this._getCanvasBBox(chart);
    var cx = (canvasBBox.x + canvasBBox.x2) / 2;
    var cy = (canvasBBox.y + canvasBBox.y2) / 2;
    var yAxisLabelPadding = Math.floor(chart.yAxisLabelPadding - 0);
    var yAxisLabelAngle = chart.yAxisLabelAngle;
    if (!yAxisLabelAngle) {
      if (3 <= categories.length) {
        yAxisLabelAngle = (categories[0].middleAngle + categories[1].middleAngle) / 2;
      } else {
        yAxisLabelAngle = categories[0].middleAngle;
      }
    } else {
      yAxisLabelAngle = (Math.floor(yAxisLabelAngle - 0) + Math.floor(chart.startingAngle - 0)) % 360;
    }
    var perAngle = 360 / categories.length;
    var a0 = 90 - perAngle / 2;
    var a1 = 180 - a0 - yAxisLabelAngle % perAngle;
    var r = 0;
    if (3 <= categories.length) {
      r = radarRadius / Math.sin(a1 / 180 * Math.PI) * Math.sin(a0 / 180 * Math.PI);
    } else {
      r = radarRadius;
    }

    for (var i = 0, ii = yAxiseset.length; i < ii; i++) {
      var tcx = Math.floor(cx + (r * i / (ii - 1) + yAxisLabelPadding) * Math.sin(yAxisLabelAngle / 180 * Math.PI));
      var tcy = Math.floor(cy - (r * i / (ii - 1) + yAxisLabelPadding) * Math.cos(yAxisLabelAngle / 180 * Math.PI));

      if (Raphael.vml) {
        tcx += 2;
        tcy += 1;
      }

      var textElement = this._createText({
        "text": yAxiseset[i].label,
        "cx": tcx,
        "cy": tcy,
        "angle": 0,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "text-align": this._CONST.TEXTALIGN.CENTER,
        "transform-origin": "center center"
      });
    }
  };

  //创建边框
  _p._createRadarBorder = function (chart) {
    //  var radarRadius = Math.floor(chart.radarRadius - 0);
    var categories = !chart.categories || chart.categories.category;
    if (3 > categories.length) {
      return;
    }

    var radarBorderColor = chart.radarBorderColor;
    var radarBorderThickness = Math.floor(chart.radarBorderThickness - 0);
    var radarBorderAlpha = Math.floor(chart.radarBorderAlpha - 0) / 100;
    var radarBorderDashedStyle = this._CONST.ENABLE === chart.radarBorderDashed ?
      chart.radarBorderDashedStyle : "";
    var yAxiseset = chart.axises.yAxiseset;
    var startValue = yAxiseset[0].value;
    var endValue = yAxiseset[yAxiseset.length - 1].value;

    var path = [];
    for (var i = 0, ii = categories.length; i < ii; i++) {
      var p = this._getAnchorPos(chart, endValue, categories[i].middleAngle);
      if (!i) {
        path[path.length] = ["M", p.x, p.y];
      } else {
        path[path.length] = ["L", p.x, p.y];
      }
    }
    path[path.length] = ["Z"];
    this._paper.path(path)
      .attr({
        "stroke": this._getColor(radarBorderColor),
        "stroke-width": radarBorderThickness,
        "stroke-opacity": radarBorderAlpha,
        "stroke-dasharray": radarBorderDashedStyle,
        "stroke-linejoin": "miter"
      });

  };


  //创建辐射条
  _p._createRadarSpike = function (chart) {
    var categories = !chart.categories || chart.categories.category;
    var radarSpikeColor = chart.radarSpikeColor;
    var radarSpikeThickness = Math.floor(chart.radarSpikeThickness - 0);
    var radarSpikeAlpha = Math.floor(chart.radarSpikeAlpha - 0) / 100;
    var radarSpikeDashedStyle = this._CONST.ENABLE === chart.radarSpikeDashed ?
      chart.radarSpikeDashedStyle : "";
    var yAxiseset = chart.axises.yAxiseset;
    var startValue = yAxiseset[0].value;
    var endValue = yAxiseset[yAxiseset.length - 1].value;

    for (var i = 0, ii = categories.length; i < ii; i++) {
      var angle = categories[i].middleAngle;
      var p0 = this._getAnchorPos(chart, startValue, angle);
      var p1 = this._getAnchorPos(chart, endValue, angle);
      var path = [];
      path[path.length] = ["M", p0.x, p0.y];
      path[path.length] = ["L", p1.x, p1.y];

      this._paper.path(path)
        .attr({
          "stroke": this._getColor(radarSpikeColor),
          "stroke-width": radarSpikeThickness,
          "stroke-opacity": radarSpikeAlpha,
          "stroke-dasharray": radarSpikeDashedStyle
        });
    }
  };

  //创建背景色
  _p._createRadarBg = function (chart) {
    var categories = !chart.categories || chart.categories.category;
    if (3 > categories.length) {
      return;
    }

    var radarFillColor = chart.radarFillColor;
    var radarFillAlpha = Math.floor(chart.radarFillAlpha - 0) / 100;
    var yAxiseset = chart.axises.yAxiseset;
    var startValue = yAxiseset[0].value;
    var endValue = yAxiseset[yAxiseset.length - 1].value;

    var path = [];
    for (var i = 0, ii = categories.length; i < ii; i++) {
      var p = this._getAnchorPos(chart, endValue, categories[i].middleAngle);
      if (!i) {
        path[path.length] = ["M", p.x, p.y];
      } else {
        path[path.length] = ["L", p.x, p.y];
      }
    }
    path[path.length] = ["Z"];
    this._paper.path(path)
      .attr({
        "stroke-width": 0,
        "fill": this._getColor(radarFillColor),
        "fill-opacity": radarFillAlpha
      });
  };

  //创建DIVLINE
  _p._createDivLine = function (chart) {
    var categories = !chart.categories || chart.categories.category;
    if (3 > categories.length) {
      return;
    }

    var radarRadius = Math.floor(chart.radarRadius - 0);
    var divLineNum = Math.floor(chart.divLineNum - 0);
    var divLineColor = chart.divLineColor;
    var divLineThickness = Math.floor(chart.divLineThickness);
    var divLineAlpha = Math.floor(chart.divLineAlpha - 0) / 100;
    var divLineDashStyle = this._CONST.ENABLE === chart.divLineIsDashed ?
      chart.divLineDashStyle : "";
    var showAlternateGridColor = chart.showAlternateGridColor;
    var alternateGridColor = chart.alternateGridColor;
    var alternateGridAlpha = Math.floor(chart.alternateGridAlpha - 0) / 100;
    var showZeroPlane = chart.showZeroPlane;
    var zeroPlaneColor = chart.zeroPlaneColor;
    var zeroPlaneThickness = Math.floor(chart.zeroPlaneThickness - 0);
    var zeroPlaneAlpha = Math.floor(chart.zeroPlaneAlpha - 0) / 100;
    var zeroPlaneDashStyle = this._CONST.ENABLE === chart.zeroPlaneIsDashed ?
      chart.zeroPlaneDashStyle : "";
    var yAxiseset = chart.axises.yAxiseset;
    if (this._CONST.ENABLE === showAlternateGridColor) {
      var perAngle = 360 / categories.length;
      var thinkness = radarRadius * Math.cos(perAngle / 2 / 180 * Math.PI) / (yAxiseset.length - 1);
      for (var i = 1, ii = yAxiseset.length - 1; i < ii; i++) {
        if (1 === i % 2) {
          var path = [];
          var value = (yAxiseset[i].value + yAxiseset[i + 1].value) / 2;

          for (var j = 0, jj = categories.length; j < jj; j++) {
            var anchor = this._getAnchorPos(chart, value, categories[j].middleAngle);
            if (!j) {
              path[path.length] = ["M", anchor.x, anchor.y];
            } else {
              path[path.length] = ["L", anchor.x, anchor.y];
            }
          }
          path[path.length] = ["Z"];

          this._paper.path(path)
            .attr({
              "stroke": this._getColor(alternateGridColor),
              "stroke-width": thinkness,
              "stroke-opacity": alternateGridAlpha,
              "stroke-linejoin": "miter"
            });
        }

      }
    }

    //先画DIV LINE
    for (var i = 0, ii = yAxiseset.length - 1; i < ii; i++) {
      var path = [];
      for (var j = 0, jj = categories.length; j < jj; j++) {
        var anchor = this._getAnchorPos(chart, yAxiseset[i].value, categories[j].middleAngle);
        if (!j) {
          path[path.length] = ["M", anchor.x, anchor.y];
        } else {
          path[path.length] = ["L", anchor.x, anchor.y];
        }
      }
      path[path.length] = ["Z"];

      this._paper.path(path)
        .attr({
          "stroke": this._getColor(divLineColor),
          "stroke-width": divLineThickness,
          "stroke-opacity": divLineAlpha,
          "stroke-dasharray": divLineDashStyle
        });
    }
  };

  //计算Y
  _p._getAnchorPos = function (chart, value, angle) {
    var yAxiseset = chart.axises.yAxiseset;
    var radarRadius = Math.floor(chart.radarRadius - 0);
    var canvasBBox = this._getCanvasBBox(chart);
    var x0 = Math.floor((canvasBBox.x + canvasBBox.x2) / 2);
    var y0 = Math.floor((canvasBBox.y + canvasBBox.y2) / 2);
    var start = yAxiseset[0].value - 0;
    var end = yAxiseset[yAxiseset.length - 1].value - 0;
    var anchorRadius = (value - start) / (end - start) * radarRadius;
    return {
      "x": Math.floor(x0 + anchorRadius * Math.sin(angle / 180 * Math.PI)),
      "y": Math.floor(y0 - anchorRadius * Math.cos(angle / 180 * Math.PI))
    }
  };

  //画图
  _p._createPatternPlot = function (chart) {
    var datasets = chart.dataset;
    if (!datasets) {
      return null;
    }

    var categories = !chart.categories || chart.categories.category;
    var yAxiseset = chart.axises.yAxiseset;
    var start = yAxiseset[0].value - 0;
    var end = yAxiseset[yAxiseset.length - 1].value - 0;

    //创建FILL
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      if (!dataset) {
        continue;
      }

      var borderThickness = Math.floor((datasets[i].borderThickness || chart.plotBorderThickness) - 0);
      var borderColor = datasets[i].borderColor || chart.plotBorderColor;
      var borderAlpha = Math.floor((datasets[i].borderAlpha || chart.plotBorderAlpha) - 0) / 100;
      var borderDashed = datasets[i].borderDashed || chart.plotBorderDashed;

      var borderDashedStyle = this._CONST.ENABLE === borderDashed ?
        (datasets[i].borderDashedStyle || chart.plotBorderDashedStyle) : "";
      var fillColor = datasets[i].fillColor || chart.plotFillColor;
      var fillAlpha = Math.floor((datasets[i].fillAlpha || chart.plotFillAlpha) - 0) / 100;

      var path = [];
      for (var j = 0, jj = categories.length; j < jj; j++) {
        var value = null;
        if (dataset.length > j) {
          value = dataset[j].value - 0;
        } else {
          value = start;
        }
        var anchor = this._getAnchorPos(chart, value, categories[j].middleAngle);

        if (!j) {
          path[path.length] = ["M", anchor.x, anchor.y];
        } else {
          path[path.length] = ["L", anchor.x, anchor.y];
        }
      }
      path[path.length] = ["Z"];

      this._paper.path(path)
        .attr({
          "stroke": this._getColor(borderColor),
          "stroke-width": borderThickness,
          "stroke-opacity": borderAlpha,
          "stroke-dasharray": borderDashedStyle,
          "fill": this._getColor(fillColor),
          "fill-opacity": fillAlpha

        })
    }
    //画ANCHOR
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      if (!dataset) {
        continue;
      }

      var drawAnchors = dataset.drawAnchors || chart.drawAnchors;
      if (this._CONST.ENABLE !== drawAnchors) {
        continue;
      }

      var anchorSides = Math.floor((datasets[i].anchorSides || chart.anchorSides) - 0);
      var anchorRadius = Math.floor((datasets[i].anchorRadius || chart.anchorRadius) - 0);
      var anchorBorderColor = datasets[i].anchorBorderColor || chart.anchorBorderColor;
      var anchorBorderThickness = Math.floor((datasets[i].anchorBorderThickness || chart.anchorBorderThickness) - 0);
      var anchorBorderAlpha = Math.floor((datasets[i].anchorBorderAlpha || chart.anchorBorderAlpha) - 0) / 100;
      var anchorBgColor = datasets[i].anchorBgColor || chart.anchorBgColor;
      var anchorBgAlpha = Math.floor((datasets[i].anchorBgAlpha || chart.anchorBgAlpha) - 0) / 100;

      for (var j = 0, jj = dataset.length; j < jj; j++) {
        var data = dataset[j];
        var value = data.value - 0;
        var anchor = this._getAnchorPos(chart, value, categories[j].middleAngle);

        var anchorElement = this._createAnchor({
          "cx": anchor.x,
          "cy": anchor.y,
          "side": anchorSides,
          "radius": anchorRadius,
          "border-color": anchorBorderColor,
          "border-thickness": anchorBorderThickness,
          "border-alpha": anchorBorderAlpha,
          "fill-color": anchorBgColor,
          "fill-alpha": anchorBgAlpha
        })
        anchorElement.node["click-data"] = data.click;
        anchorElement.node["mouseover-data"] = data.mouseover;
        anchorElement.node["mousemove-data"] = data.mousemove;
        anchorElement.node["mouseout-data"] = data.mouseout;
        anchorElement.node["tooltip-data"] = data.toolTip;
      }
    }

    //画VALUELABEL
    var showValueLabel = chart.showValueLabel;
    if (this._CONST.ENABLE === showValueLabel) {
      var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.VALUELABEL);
      var valueLabelPadding = Math.floor(chart.valueLabelPadding - 0);
      var radarRadius = Math.floor(chart.radarRadius - 0);
      var yAxiseset = chart.axises.yAxiseset;
      var start = yAxiseset[0].value - 0;
      var end = yAxiseset[yAxiseset.length - 1].value - 0;
      var canvasBBox = this._getCanvasBBox(chart);
      var cx = (canvasBBox.x + canvasBBox.x2) / 2;
      var cy = (canvasBBox.y + canvasBBox.y2) / 2;

      for (var i = 0, ii = datasets.length; i < ii; i++) {
        var dataset = datasets[i].set;
        if (!dataset) {
          continue;
        }
        for (var j = 0, jj = dataset.length; j < jj; j++) {
          var data = dataset[j];
          var value = data.value - 0;
          var radius = radarRadius * (value - start) / (end - start);

          var textElement = this._createRadiantLabel({
            "cx": cx,
            "cy": cy,
            "radius": radius,
            "angle": data.middleAngle,
            "vertical-center": this._CONST.ENABLE,
            "label": data.valueLabel,
            "label-padding": valueLabelPadding,
            "font-family": fontStyle.font,
            "font-size": fontStyle.size,
            "font-color": fontStyle.color,
            "font-weight": fontStyle.bold,
            "show-line": this._CONST.DISABLE
          });
        }

      }
    }

  };

  //设置绘图信息
  _p._setPatternInfo = function (chart) {
    var datasets = chart.dataset;
    if (!datasets) {
      return null;
    }

    var categories = !chart.categories || chart.categories.category;
    var perAngle = 360 / categories.length;

    //设置角度信息
    var startingAngle = Math.floor(chart.startingAngle - 0) % 360;
    for (var i = 0, ii = categories.length; i < ii; i++) {
      categories[i].middleAngle = startingAngle + perAngle * i;
    }
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i].set;
      var startingAngle = Math.floor(chart.startingAngle - 0) % 360;
      for (var j = 0, jj = dataset.length, jjj = categories.length; j < jj && j < jjj; j++) {
        var data = dataset[j];
        var value = (data.value || "0") - 0;
        data.middleAngle = (startingAngle + perAngle * j) % 360;
        data.formatValue = this._getFormatNumber(chart, value);
        data.toolTip = this._getToolTip(chart, datasets[i], data);
        data.valueLabel = this._getValueLabel(chart, datasets[i], data);
      }
    }

    //设置半径
    var radarRadius = chart.radarRadius;
    if (!radarRadius) {
      radarRadius = Number.MAX_VALUE;

      //categories
      var categoryChart = {
        "showValueLabel": chart.showXAxisLabel,
        "valueLabelPadding": chart.xAxisLabelPadding
      };
      var categoryDataset = [];
      for (var i = 0, ii = categories.length; i < ii; i++) {
        var category = categories[i];
        categoryDataset[categoryDataset.length] = {
          "valueLabel": category.label || "",
          "middleAngle": perAngle * i
        }
      }

      var radius = this._calcSmartRadius(chart, categoryDataset, this._CONST.STYLEOBJECT.XAXISLABEL);
      radarRadius = radarRadius < radius ? radarRadius : radius;
      //datasets
      for (var i = 0, ii = datasets.length, iii = categories.length; i < ii && i < iii; i++) {
        var dataset = datasets[i].set;
        var radius = this._calcSmartRadius(chart, dataset, this._CONST.STYLEOBJECT.VALUELABEL);
        radarRadius = radarRadius < radius ? radarRadius : radius;
      }
      chart.radarRadius = radarRadius;
    }
  };

}).call(this, window);
