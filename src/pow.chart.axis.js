(function (root) {

  var POW = root.POW;

  //构造函数
  POW.Chart.Axis = function (render, width, height) {
    POW.Chart.Core.call(this, render, width, height);
  };

  //寄生继承
  POW.Chart.Core.prototype._inheritPrototype(POW.Chart.Axis, POW.Chart.Core);

  //原型
  var _p = POW.Chart.Axis.prototype;

  //默认值
  _p._DEFAULT = {

    "chart": {
      //rotate
      "rotateXY": "0",

      //XYPlot
      "XYPlot": "0",
      "xAxisMinValue": "",
      "xAxisMaxValue": "",

      //xAxisLabel
      "showXAxisLabel": "1",
      "xAxisLabelDisplay": "WRAP",
      "rotateXAxisLabel": "0",
      "slantXAxisLabel": "0",
      "xAxisLabelStep": "1",
      "xAxisLabelStaggerLine": "2",
      "xAxisLabelPadding": "5",

      //PYAxisLabel
      "showPYAxisLabel": "1",
      "rotatePYAxisName": "1",
      "PYAxisLabelPadding": "5",

      //SYAxisLabel
      "showSYAxisLabel": "1",
      "rotateSYAxisName": "1",
      "SYAxisLabelPadding": "5",

      //hDivLine
      "hDivLineNum": "4",
      "hDivLineColor": "C1C0BE",
      "hDivLineThickness": "1",
      "hDivLineAlpha": "100",
      "hDivLineIsDashed": "0",
      "hDivLineDashStyle": "-",
      "showAlternateHGridColor": "1",
      "alternateHGridColor": "AAAAAA",
      "alternateHGridAlpha": "15",
      "showHZeroPlane": "1",
      "hZeroPlaneColor": "545454",
      "hZeroPlaneThickness": "2",
      "hZeroPlaneAlpha": "100",
      "hZeroPlaneIsDashed": "0",
      "hZeroPlaneDashStyle": "-",

      //vDivLine
      "vDivLineColor": "C1C0BE",
      "vDivLineThickness": "1",
      "vDivLineAlpha": "100",
      "vDivLineIsDashed": "0",
      "vDivLineDashStyle": "-",
      "showAlternateVGridColor": "1",
      "alternateVGridColor": "AAAAAA",
      "alternateVGridAlpha": "15",
      "showVZeroPlane": "1",
      "vZeroPlaneColor": "545454",
      "vZeroPlaneThickness": "2",
      "vZeroPlaneAlpha": "100",
      "vZeroPlaneIsDashed": "0",
      "vZeroPlaneDashStyle": "-",

      //NUMBERFORMAT
      "PYAxisDivLineRoundNumber": "5",
      "SYAxisDivLineRoundNumber": "5",

      //VALUELABEL
      "showValueLabel": "1",
      "rotateValueLabel": "0",
      "placeValueLabelInside": "0",  //only for column
      "valueLabelPadding": "3",

      //Column Plot
      "plotPadding": "3",
      "plotSetPadding": "7",
      "plotMaxWidth": "120",

      //CATEGORIES
      "categories": {
        "sepLineThickness": "0",
        "sepLineColor": "000000",
        "sepLineAlpha": "50",
        "sepLineDashed": "0",
        "sepLineDashedStyle": "-",

        "category": [{
          "label": "",
          "x": ""
        }]
      },
      //DATASET
      "dataset": [{
        "parentYAxis": "P",
        "pattern": "COLUMN",
        "seriesName": "",
        "stackedGroup": "",
        //Line
        "lineCurvature": "100",
        "blShowOnTop": "1",
        "lineColor": "000000",
        "lineThickness": "",
        "lineAlpha": "100",
        "lineDashed": "0",
        "lineDashedStyle": "-",
        "trendArrow": "0",
        "drawAnchors": "1",
        "anchorsShowOnTop": "1",
        "anchorSides": "0",
        "anchorRadius": "3",
        "anchorBorderColor": "000000",
        "anchorBorderThickness": "1",
        "anchorBorderAlpha": "100",
        "anchorBgColor": "000000",
        "anchorBgAlpha": "100",
        //Column
        "fillColor": "000000",
        "fillAlpha": "80",
        "fillAngle": "90",
        "gradientColor": "",
        "bubbleGradientOffset": "30,30",
        "set": [{
          "x": "0",
          "y": "0",
          "r": "0",
          "click": "",
          "fillColor": "",
          "mouseover": "",
          "mousemove": "",
          "mouseout": ""
        }]
      }],
      "hTrendlines": {
        "line": [{
          "parentYAxis": "P",
          "y0": "",
          "y1": "",
          "color": "91C728",
          "thickness": "1",
          "alpha": "",
          "dashed": "0",
          "dashedStyle": "-",
          "toolText": "",
          "isTrendZone": "0",
          "displayValue": ""
        }]
      },
      "vTrendlines": {
        "line": [{
          "x0": "",
          "x1": "",
          "color": "91C728",
          "thickness": "1",
          "alpha": "",
          "dashed": "0",
          "dashedStyle": "-",
          "toolText": "",
          "isTrendZone": "0",
          "displayValue": ""
        }]
      }
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
  //继承资源
  POW.Chart.Core.prototype._extendObject(_p._RESOURCE, POW.Chart.Core.prototype._RESOURCE);
  //继承常量
  POW.Chart.Core.prototype._extendObject(_p._CONST, POW.Chart.Core.prototype._CONST);

  //设置数据
  _p.setData = function (data) {

    //设置默认值
    this._setDefault(data);

    //教正数据
    this._adjustData(data);

    //初始化轴线
    this._initAxises(data);

    //初始化BBOX
    this._initBBox(data);

    //画基础信息
    this._drawBase(data);

    //画Axis
    this._drawAxis(data);
  };

  //初始化数据
  _p._getDataByUrl = function (dataUrl) {
    var xmlDocument = this._loadXmlUrl(dataUrl);
    var chart = this._tranXml2Object(xmlDocument);
    this._setDefault(chart);
    this._adjustData(chart);
    this._initAxises(chart);
    return chart;
  };

  //设置图形的默认值
  _p._setDefault = function (chart) {
    //加上标准默认值
    this._standardizeObject(chart, this._DEFAULT.chart);
    //如果有柱状图数据，计算是否展示垂直分隔线
    var columnDatasets = this._getDatasets(chart, this._CONST.PATTERN.COLUMN);
    var allDatasets = this._getDatasets(chart, null);
    if (0 < (allDatasets.length - columnDatasets.length)) {  //展示垂直分隔线
      chart.vDivLineThickness = chart.vDivLineThickness || "1";
    } else {
      chart.categories.sepLineThickness = chart.categories.sepLineThickness || "1";
    }
  };

  //修复无效的数据
  _p._adjustData = function (chart) {
    var rotateXY = chart.rotateXY;
    if (this._CONST.ENABLE === rotateXY) {  //图形翻转了，需要变换XY轴
      //SYAXISNAME
      chart.SYAxisName = "";  //目前翻转暂时不支持双Y轴
      //对数据值全部设置为PY轴
      var datasets = chart.datasets;
      if (datasets) {
        for (var i = 0, ii = datasets.length; i < ii; i++) {
          var dataset = datasets[i];
          dataset.parentYAxis = this._CONST.AXIS.PY;
        }
      }
      //对趋势线/区数值设置为PY轴
      var hTrendlines = chart.hTrendlines;
      if (hTrendlines) {
        var hLines = hTrendlines.line;
        if (hLines) {
          for (var i = 0, ii = hLines.length; i < ii; i++) {
            hLines[i].parentYAxis = this._CONST.AXIS.PY;
          }
        }
      }
      //对垂直趋势线/区设置为PY轴
      var vTrendlines = chart.vTrendlines;
      if (vTrendlines) {
        var vLines = vTrendlines.line;
        if (vLines) {
          for (var i = 0, ii = vLines.length; i < ii; i++) {
            vLines[i].parentYAxis = this._CONST.AXIS.PY;
          }
        }
      }
    }
  };

  //绘制网格图形
  _p._drawAxis = function (chart) {
    //绘制X轴标签
    this._createXAxisLabel(chart);
    //绘制PY轴标签
    this._createPYAxisLabel(chart);
    //绘制SY轴标签
    this._createSYAxisLabel(chart);
    //绘制水平分隔线
    this._createHDivLine(chart);
    //绘制垂直分隔线
    this._createVDivLine(chart);
    //绘制序列分隔线
    this._createSepLine(chart);
    //绘制水平趋势线/区
    this._createHTrendLine(chart);
    //绘制垂直趋势线/区
    this._createVTrendLine(chart);
    //绘制图形
    this._createDataPlot(chart);
    //最后绘制边框
    this._createCanvasBorder(chart);
  };

  //获得X,PY,SY轴数据
  _p._initAxises = function (chart) {
    //X轴
    var xAxiseset = [];
    var categories = "undefined" !== typeof chart.categories ?
      chart.categories.category : null;
    if (categories) {
      var XYPlot = chart.XYPlot;
      if (this._CONST.ENABLE === XYPlot) {
        var min = Number.MAX_VALUE;
        var max = 0 - Number.MAX_VALUE;
        for (var i = 0, ii = categories.length; i < ii; i++) {
          var category = categories[i];
          var label = category.label || "";
          var value = category.x;
          if (!value) {
            throw Error("shit");
          }
          min = (value - 0) < min ? (value - 0) : min;
          max = (value - 0) > max ? (value - 0) : max;
          xAxiseset[xAxiseset.length] = {
            "value": value - 0,
            "label": label,
            "visiable": "1"
          };
        }
        var xAxisMinValue = chart.xAxisMinValue;
        if (xAxisMinValue) {
          if ((xAxisMinValue - 0) < min) {
            xAxiseset.splice(0, 0, {
              "value": xAxisMinValue - 0,
              "label": "",
              "visiable": "1"
            });
          }
        }
        var xAxisMaxValue = chart.xAxisMaxValue;
        if (xAxisMaxValue) {
          if ((xAxisMaxValue - 0) > max) {
            xAxiseset[xAxiseset.length] = {
              "value": xAxisMaxValue - 0,
              "label": "",
              "visiable": "1"
            };
          }
        }
      } else {
        //如果其中有柱状图数据，则需要将X轴向前偏移0.5个位
        var columnDatasets = this._getDatasets(chart, this._CONST.PATTERN.COLUMN);
        if (0 === columnDatasets.length && 1 !== categories.length) {
          for (var i = 0, ii = categories.length; i < ii; i++) {
            xAxiseset[xAxiseset.length] = {
              "value": i,
              "label": categories[i].label || "",
              "visiable": "1"
            }
          }
        } else {
          xAxiseset[xAxiseset.length] = {
            "value": -0.5,
            "label": "",
            "visiable": "0"
          };
          for (var i = 0, ii = categories.length; i < ii; i++) {
            xAxiseset[xAxiseset.length] = {
              "value": i,
              "label": categories[i].label || "",
              "visiable": "1"
            }
          }
          xAxiseset[xAxiseset.length] = {
            "value": ii - 0.5,
            "label": "",
            "visiable": "0"
          };
        }
      }
      if (this._CONST.ENABLE === chart.rotateXY) {
        xAxiseset = xAxiseset.reverse();
      }
    }

    //Y轴
    var posReg = this._getPosReg(chart);
    //计算获得PY轴的分隔线数据
    var PYAxisDiv = this._getYAxisDiv(chart,
      this._CONST.AXIS.PY,
      posReg,
      Math.floor(chart.hDivLineNum - 0),
      Math.floor(chart.PYAxisDivLineRoundNumber - 0));
    //计算获得SY轴的分隔线数据
    var SYAxisDiv = this._getYAxisDiv(chart,
      this._CONST.AXIS.SY,
      posReg,
      Math.floor(chart.hDivLineNum - 0),
      Math.floor(chart.SYAxisDivLineRoundNumber - 0));
    var start = PYAxisDiv.start;
    var end = PYAxisDiv.end;
    if (SYAxisDiv) {
      start = SYAxisDiv.start < start ? SYAxisDiv.start : start;
      end = SYAxisDiv.end > end ? SYAxisDiv.end : end;
    }
    //PY轴数据
    var PYAxiseset = [];
    for (var i = start; i <= end; i++) {
      PYAxiseset[PYAxiseset.length] = {
        "value": i * PYAxisDiv.each,
        "label": this._getFormatNumber(chart, i * PYAxisDiv.each)
      };
    }
    //SY轴数据
    var SYAxiseset = null;
    if (SYAxisDiv) {
      SYAxiseset = [];
      for (var i = start; i <= end; i++) {
        SYAxiseset[SYAxiseset.length] = {
          "value": i * SYAxisDiv.each,
          "label": this._getFormatNumber(chart, i * SYAxisDiv.each)
        };
      }
    }

    chart.axises = {
      "xAxiseset": xAxiseset,
      "PYAxiseset": PYAxiseset,
      "SYAxiseset": SYAxiseset
    };
  };


  //创建X轴标签
  _p._createXAxisLabel = function (chart) {
    var showXAxisLabel = chart.showXAxisLabel;
    if (this._CONST.ENABLE !== showXAxisLabel) {
      return;
    }
    var xAxises = null;
    if (this._CONST.ENABLE === chart.rotateXY) {
      xAxises = chart.axises.PYAxiseset;
    } else {
      xAxises = chart.axises.xAxiseset;
    }

    if (!xAxises || 0 === xAxises.length) {
      return;
    }
    var xAxisLabelBBox = this._getXAxisLabelBBox(chart);
    var x = xAxisLabelBBox.x;
    var y = xAxisLabelBBox.y;
    var x2 = xAxisLabelBBox.x2;
    var y2 = xAxisLabelBBox.y2;
    var width = xAxisLabelBBox.width;
    var height = xAxisLabelBBox.height;
    var perWidth = width / xAxises.length;
    var rotateXAxisLabel = chart.rotateXAxisLabel;
    var xAxisLabelDisplay = this._CONST.ENABLE === rotateXAxisLabel ?
      this._CONST.LABELDISPLAY.ROTATE : chart.xAxisLabelDisplay;
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.XAXISLABEL);
    var xAxisLabelStep = Math.floor(chart.xAxisLabelStep - 0);
    var lineHeight = this._getTextWH(chart,
      this._CONST.STYLEOBJECT.XAXISLABEL,
      "0",
      0,
      false).height;
    for (var i = 0, ii = xAxises.length; i < ii; i++) {
      if (0 !== i % xAxisLabelStep) {
        continue;
      }
      var xAxis = xAxises[i];
      var label = xAxis.label || "";
      var cx = this._getXAxisPos(chart, xAxis.value);//x + (i + 0.5) * perWidth;
      if (this._CONST.LABELDISPLAY.NONE === xAxisLabelDisplay) {
        var cy = (y + y2) / 2;
        this._createText({
          "text": label,
          "cx": cx,
          "cy": cy,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": fontStyle.color,
          "font-weight": fontStyle.bold
        });
      } else if (this._CONST.LABELDISPLAY.STAGGER === xAxisLabelDisplay) {    //STAGGER排版
        var xAxisLabelStaggerLine = Math.floor(chart.xAxisLabelStaggerLine - 0);
        cy = y + (0.5 + i % xAxisLabelStaggerLine) * lineHeight;
        this._createText({
          "text": label,
          "cx": cx,
          "cy": cy,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": fontStyle.color,
          "font-weight": fontStyle.bold
        });
      } else if (this._CONST.LABELDISPLAY.WRAP === xAxisLabelDisplay) {   //WRAP排版
        var cy = (y + y2) / 2;
        this._createText({
          "text": label,
          "cx": cx,
          "cy": cy,
          "width": perWidth * 0.9,
          "height": height,
          "line-height": lineHeight,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": fontStyle.color,
          "font-weight": fontStyle.bold,
          "word-break": "1"
        });
      } else if (this._CONST.LABELDISPLAY.ROTATE === xAxisLabelDisplay) { //ROTATE排版
        var slantXAxisLabel = chart.slantXAxisLabel;
        var fontSize = fontStyle.size - 0;
        if (this._CONST.ENABLE === slantXAxisLabel) {
          var cy = y;
          if (Raphael.svg) {
            cx -= height;
            if ((this._CONST.WEBKITMINFONTSIZE - 0) > fontSize) {
              var scale = fontSize / (this._CONST.WEBKITMINFONTSIZE - 0);
              if (this._browser.browser.chrome || this._browser.browser.opera) {
                cx += lineHeight * (1 - scale);
              } else {
                cx += lineHeight;
                cx += lineHeight / 2;
              }
            } else {
              cx += lineHeight;
              cx += lineHeight / 2;
            }
            cy += lineHeight / Math.sqrt(2) / 2;
          } else {
            cy += lineHeight / Math.sqrt(2) / 2;
          }

          this._createText({
            "text": label,
            "cx": cx,
            "cy": cy,
            "width": height * Math.sqrt(2),
            "height": lineHeight,
            "lineHeight": lineHeight,
            "font-family": fontStyle.font,
            "font-size": fontStyle.size,
            "font-color": fontStyle.color,
            "font-weight": fontStyle.bold,
            "angle": 315,
            "transform-origin": "top right",
            "text-align": "right"
          });
        } else {
          var cx = cx;
          var cy = Raphael.vml ? y : (y + y2) / 2 + 3;
          this._createText({
            "text": label,
            "cx": cx,
            "cy": cy,
            "width": height,
            "height": lineHeight,
            "lineHeight": lineHeight,
            "font-family": fontStyle.font,
            "font-size": fontStyle.size,
            "font-color": fontStyle.color,
            "font-weight": fontStyle.bold,
            "angle": 270,
            "text-align": "right"
          });
        }
      }
    }
  };

  //创建PY轴标签
  _p._createPYAxisLabel = function (chart) {
    this._createYAxisLabel(chart, this._CONST.AXIS.PY);
  };

  //创建SY轴标签
  _p._createSYAxisLabel = function (chart) {
    this._createYAxisLabel(chart, this._CONST.AXIS.SY);
  };

  //创建Y轴标签
  _p._createYAxisLabel = function (chart, parentYAxis) {
    var showYAxisLabels = null;
    var yAxisLabelBBox = null;
    var axiseset = null;
    var styleObject = null;
    var textAlign = null;

    if (this._CONST.AXIS.SY === parentYAxis) {
      if (this._CONST.ENABLE === chart.rotateXY) {
        return;
      } else {
        showYAxisLabels = chart.showSYAxisLabel;
        yAxisLabelBBox = this._getSYAxisLabelBBox(chart);
        axiseset = chart.axises.SYAxiseset;
        styleObject = this._CONST.STYLEOBJECT.SYAXISLABEL;
        textAlign = this._CONST.TEXTALIGN.LEFT;
      }

    } else {
      if (this._CONST.ENABLE === chart.rotateXY) {
        axiseset = chart.axises.xAxiseset;
      } else {
        axiseset = chart.axises.PYAxiseset;
      }
      showYAxisLabels = chart.showPYAxisLabel;
      yAxisLabelBBox = this._getPYAxisLabelBBox(chart);
      //    axiseset = chart.axises.PYAxiseset;
      styleObject = this._CONST.STYLEOBJECT.PYAXISLABEL;
      textAlign = this._CONST.TEXTALIGN.RIGHT;
    }


    if (this._CONST.ENABLE !== showYAxisLabels || !axiseset) {
      return;
    }
    var lineHeight = this._getTextWH(chart,
      styleObject,
      "0",
      0,
      false).height;
    var fontStyle = this._getFontStyle(chart, styleObject);
    for (var i = 0, ii = axiseset.length; i < ii; i++) {
      var label = axiseset[i].label || "";
      var value = axiseset[i].value || "0";
      var cx = (yAxisLabelBBox.x + yAxisLabelBBox.x2) / 2;
      var cy = this._getYAxisPos(chart, value, parentYAxis);
      this._createText({
        "text": label,
        "cx": cx,
        "cy": cy,
        "width": yAxisLabelBBox.width,
        "height": lineHeight,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "text-align": textAlign
      });
    }
  };

  //创建水平趋势线
  _p._createHTrendLine = function (chart) {
    this._createTrendLine(chart, this._CONST.TRENDLINE.H);
  };

  //创建垂直趋势线
  _p._createVTrendLine = function (chart) {
    this._createTrendLine(chart, this._CONST.TRENDLINE.V);
  };

  //创建趋势线
  _p._createTrendLine = function (chart, trendLine) {
    var XYPlot = chart.XYPlot;
    var rotateXY = chart.rotateXY;
    var canvasBorderThickness = Math.floor(chart.canvasBorderThickness - 0);
    var canvasBBox = this._getCanvasBBox(chart);
    var PYAxisLabelBBox = this._getPYAxisLabelBBox(chart);
    var SYAxisLabelBBox = this._getSYAxisLabelBBox(chart);
    var xAxisLabelBBox = this._getXAxisLabelBBox(chart);
    var styleObject = null;
    var lines = null;

    if (this._CONST.TRENDLINE.H === trendLine) {
      lines = !chart.hTrendlines ? null : chart.hTrendlines.line;
      styleObject = this._CONST.STYLEOBJECT.HTRENDLABEL;
    } else {
      lines = !chart.vTrendlines ? null : chart.vTrendlines.line;
      styleObject = this._CONST.STYLEOBJECT.VTRENDLABEL;
    }
    if (!lines) {
      return;
    }
    var fontStyle = this._getFontStyle(chart, styleObject);
    var lineHeight = this._getTextWH(chart,
      styleObject,
      "0",
      0,
      true).height;
    var PYAxiseset = chart.axises.PYAxiseset;
    var xAxiseset = chart.axises.xAxiseset;
    for (var i = 0, ii = lines.length; i < ii; i++) {
      var line = lines[i];

      var parentYAxis = line.parentYAxis;

      var tcx = null;
      var tcy = null;
      if (this._CONST.ENABLE === line.isTrendZone) {  //区域方式
        var alpha = Math.floor(line.alpha || "30" - 0) / 100;
        var cx0 = null;
        var cy0 = null;
        var cx1 = null;
        var cy1 = null;

        if ((this._CONST.ENABLE !== rotateXY && this._CONST.TRENDLINE.H === trendLine) ||
          (this._CONST.ENABLE === rotateXY && this._CONST.TRENDLINE.V === trendLine)) {
          //var y0 = (line.y0 || PYAxiseset[0].value) - 0;
          //var y1 = (line.y1 || PYAxiseset[PYAxiseset.length - 1].value) - 0;

          var v0 = null;
          var v1 = null;
          if (this._CONST.ENABLE === rotateXY) {
            v0 = (line.x0 || xAxiseset[0].value) - 0;
            v1 = (line.x1 || xAxiseset[xAxiseset.length - 1].value) - 0;
          } else {
            v0 = (line.y0 || PYAxiseset[0].value) - 0;
            v1 = (line.y1 || PYAxiseset[PYAxiseset.length - 1].value) - 0;
          }

          cx0 = Math.floor(canvasBBox.x + canvasBorderThickness / 2);
          cy0 = Math.floor(this._getYAxisPos(chart, v0, parentYAxis));
          cx1 = Math.floor(canvasBBox.x2 - canvasBorderThickness / 2);
          cy1 = Math.floor(this._getYAxisPos(chart, v1, parentYAxis));

          tcx = null;
          if (this._CONST.AXIS.PY === parentYAxis) {
            tcx = (PYAxisLabelBBox.x + PYAxisLabelBBox.x2) / 2;
          } else {
            tcx = (SYAxisLabelBBox.x + SYAxisLabelBBox.x2) / 2;
          }

          tcy = (cy0 + cy1) / 2;
        } else {
          var v0 = null;
          var v1 = null;
          if (this._CONST.ENABLE === rotateXY) {
            v0 = (line.y0 || PYAxiseset[0].value) - 0;
            v1 = (line.y1 || PYAxiseset[PYAxiseset.length - 1].value) - 0;
          } else {
            v0 = (line.x0 || xAxiseset[0].value) - 0;
            v1 = (line.x1 || xAxiseset[xAxiseset.length - 1].value) - 0;
          }

          cx0 = Math.floor(this._getXAxisPos(chart, v0));
          cy0 = Math.floor(canvasBBox.y + canvasBorderThickness / 2);
          cx1 = Math.floor(this._getXAxisPos(chart, v1));
          cy1 = Math.floor(canvasBBox.y2 - canvasBorderThickness / 2);

          tcx = (cx0 + cx1) / 2;
          tcy = (xAxisLabelBBox.y + xAxisLabelBBox.y2) / 2;
        }

        var path = [];
        path[path.length] = ["M", cx0, cy0];
        path[path.length] = ["L", cx1, cy0];
        path[path.length] = ["L", cx1, cy1];
        path[path.length] = ["L", cx0, cy1];
        path[path.length] = ["Z"];
        this._paper.path(path)
          .attr({
            "stroke-width": 0,
            "fill": this._getColor(line.color),
            "fill-opacity": alpha
          });
      } else {    //线条方式
        var alpha = Math.floor(line.alpha || "100" - 0) / 100;
        var cx0 = null;
        var cy0 = null;
        var cx1 = null;
        var cy1 = null;

        if ((this._CONST.ENABLE !== rotateXY && this._CONST.TRENDLINE.H === trendLine) ||
          (this._CONST.ENABLE === rotateXY && this._CONST.TRENDLINE.V === trendLine)) {
          var v0 = null;
          var v1 = null;
          if (this._CONST.ENABLE === rotateXY) {
            v0 = line.x0 || "";
            v1 = line.x1 || "";
          } else {
            v0 = line.y0 || "";
            v1 = line.y1 || "";
          }
          if ("" == v0 && "" == v1) {
            continue;
          }
          v0 = ("" == v0 ? v1 : v0) - 0;
          v1 = ("" == v1 ? v0 : v1) - 0;
          cx0 = Math.floor(canvasBBox.x + canvasBorderThickness / 2);
          cy0 = Math.floor(this._getYAxisPos(chart, v0, parentYAxis));
          cx1 = Math.floor(canvasBBox.x2 - canvasBorderThickness / 2);
          cy1 = Math.floor(this._getYAxisPos(chart, v1, parentYAxis));
          tcx = null;
          if (this._CONST.AXIS.PY === parentYAxis) {
            tcx = (PYAxisLabelBBox.x + PYAxisLabelBBox.x2) / 2;
          } else {
            tcx = (SYAxisLabelBBox.x + SYAxisLabelBBox.x2) / 2;
          }
          tcy = cy0;
        } else {
          var v0 = null;
          var v1 = null;
          if (this._CONST.ENABLE === rotateXY) {
            v0 = line.y0 || "";
            v1 = line.y1 || "";
          } else {
            v0 = line.x0 || "";
            v1 = line.x1 || "";
          }
          if ("" == v0 && "" == v1) {
            continue;
          }
          v0 = ("" == v0 ? v1 : v0) - 0;
          v1 = ("" == v1 ? v0 : v1) - 0;
          cx0 = Math.floor(this._getXAxisPos(chart, v0));
          cy0 = Math.floor(canvasBBox.y2 + canvasBorderThickness / 2);
          cx1 = Math.floor(this._getXAxisPos(chart, v1));
          cy1 = Math.floor(canvasBBox.y - canvasBorderThickness / 2);
          tcx = cx0;
          tcy = (xAxisLabelBBox.y + xAxisLabelBBox.y2) / 2;
        }

        var path = [];
        path[path.length] = ["M", cx0, cy0];
        path[path.length] = ["L", cx1, cy1];
        this._paper.path(path)
          .attr({
            "stroke": this._getColor(line.color),
            "stroke-width": Math.floor(line.thickness),
            "stroke-opacity": alpha,
            "stroke-dasharray": this._CONST.ENABLE === line.dashed ? line.dashedStyle : ""
          });
      }

      //展示值
      var displayValue = line.displayValue;
      if (displayValue) {
        var width = null;
        var align = this._CONST.TEXTALIGN.CENTER;
        if ((this._CONST.TRENDLINE.H === trendLine && this._CONST.ENABLE !== rotateXY) ||
          (this._CONST.TRENDLINE.V === trendLine && this._CONST.ENABLE === rotateXY)) {
          //   width = PYAxisLabelBBox.width;
          width = null;
          if (this._CONST.AXIS.PY === parentYAxis) {
            width = PYAxisLabelBBox.width;
            align = this._CONST.TEXTALIGN.RIGHT;
          } else {
            width = SYAxisLabelBBox.width;
            align = this._CONST.TEXTALIGN.LEFT;
          }
        }

        this._createText({
          "text": displayValue,
          "cx": tcx,
          "cy": tcy,
          "width": width,
          "height": 12,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": this._getColor(line.color),
          "font-weight": fontStyle.bold,
          "text-align": align
        });
      }
      ;
    }
  };

  //创建柱状图案
  _p._createColumnPlot = function (chart, dataset) {
    var datas = dataset.set;
    if (!datas) {
      return;
    }

    var lineColor = dataset.lineColor;
    var lineThickness = Math.floor(dataset.lineThickness || "0" - 0);
    var lineAlpha = Math.floor(dataset.lineAlpha - 0) / 100;
    var lineDashedStyle = this._CONST.ENABLE === dataset.lineDashed ?
      dataset.lineDashedStyle : "";
    var fillColor = dataset.fillColor;
    var fillAngle = (360 - Math.floor(dataset.fillAngle - 0)) % 360;
    var fillAlpha = Math.floor(dataset.fillAlpha - 0) / 100;
    var gradientColor = dataset.gradientColor;
    var fill = null;
    if (gradientColor) {
      fill = fillAngle + "-" + this._getColor(fillColor) + "-" + this._getColor(gradientColor);
    } else {
      fill = this._getColor(fillColor);
    }
    for (var j = 0, jj = datas.length; j < jj; j++) {
      var data = datas[j];
      var path = [];

      data.p0.x = Math.floor(data.p0.x);
      data.p0.y = Math.floor(data.p0.y);
      data.p1.x = Math.floor(data.p1.x);
      data.p1.y = Math.floor(data.p1.y);

      if (Raphael.vml) {
        data.p0.x += 0.5;
        data.p0.y += 0.5;
        data.p1.x += 0.5;
        data.p1.y += 0.5;
      }

      path[path.length] = ["M", data.p0.x, data.p0.y];
      path[path.length] = ["L", data.p1.x, data.p0.y];
      path[path.length] = ["L", data.p1.x, data.p1.y];
      path[path.length] = ["L", data.p0.x, data.p1.y];
      path[path.length] = ["Z"];

      var columnElement = this._paper.path(path)
        .attr({
          "stroke": this._getColor(lineColor),
          "stroke-width": lineThickness,
          "stroke-opacity": lineAlpha,
          "stroke-dasharray": lineDashedStyle,
          "fill": (data.fillColor && this._getColor(data.fillColor)) || fill,
          "fill-opacity": fillAlpha
        });
      columnElement.node["click-data"] = data.click;
      columnElement.node["mouseover-data"] = data.mouseover;
      columnElement.node["mousemove-data"] = data.mousemove;
      columnElement.node["mouseout-data"] = data.mouseout;
      columnElement.node["tooltip-data"] = data.toolTip;
    }
  };

  //创建区域图形
  _p._createAreaPlot = function (chart, dataset) {
    var datas = dataset.set;
    if (!datas) {
      return;
    }

    var canvasBBox = this._getCanvasBBox(chart);
    var lineCurvature = Math.floor(dataset.lineCurvature - 0) / 100;
    var fillColor = dataset.fillColor;
    var fillAngle = (360 - Math.floor(dataset.fillAngle - 0)) % 360;
    var fillAlpha = Math.floor(dataset.fillAlpha - 0) / 100;
    var gradientColor = dataset.gradientColor;
    var fill = null;
    if (gradientColor) {
      fill = fillAngle + "-" + this._getColor(fillColor) + "-" + this._getColor(gradientColor);
    } else {
      fill = this._getColor(fillColor);
    }

    var path = [];
    for (var i = 0, ii = datas.length; i < ii; i++) {
      var data = datas[i];
      var x = Math.floor(data.p0.x);
      var y = Math.floor(data.p0.y);
      if (Raphael.vml) {
        x += 0.5;
      }
      if (0 === i) {
        path = ["M", x, y, "C", x, y];
      }
      if (ii - 1 > i) {
        path = path.concat([data.bcp0.x, data.bcp0.y,
          x, y,
          data.bcp1.x, data.bcp1.y]);
      }
      if (ii - 1 === i) {
        path = path.concat([x, y, x, y]);
      }
    }

    if (!datas[0].sbcp0.x) {
      path = path.concat(["L", datas[datas.length - 1].p1.x, datas[datas.length - 1].p1.y]);
      path = path.concat(["L", datas[0].p1.x, datas[0].p1.y]);
      path = path.concat(["Z"]);
    } else {
      for (var i = datas.length - 1; i >= 0; i--) {
        var data = datas[i];
        var x2 = Math.floor(data.p1.x);
        var y2 = Math.floor(data.p1.y);
        if (Raphael.vml) {
          x2 += 0.5;
        }
        if (datas.length - 1 == i) {
          path = path.concat(["L", x2, y2, "C", x2, y2]);
        } else if (0 < i) {
          path = path.concat([data.sbcp1.x, data.sbcp1.y,
            x2, y2,
            data.sbcp0.x, data.sbcp0.y]);
        } else {
          path = path.concat([x2, y2, x2, y2]);
        }
      }
    }

    var areaElement = this._paper.path(path)
      .attr({
        "stroke-width": 0,
        "fill": fill,
        "fill-opacity": fillAlpha
      });
  };

  //计算贝塞尔曲线
  _p._calcBezierAnchor = function (rotate, p0, p1, p2, curvature) {
    var l0 = null;
    var l1 = null;
    if (this._CONST.ENABLE === rotate) {
      l0 = (p1.y - p0.y) / 2;
      l1 = (p2.y - p1.y) / 2;
    } else {
      l0 = (p1.x - p0.x) / 2;
      l1 = (p2.x - p1.x) / 2;
    }

    var a = Math.atan((p1.x - p0.x) / Math.abs(p1.y - p0.y));
    var b = Math.atan((p2.x - p1.x) / Math.abs(p1.y - p2.y));
    var a = p0.y < p1.y ? Math.PI - a : a;
    var b = p2.y < p1.y ? Math.PI - b : b;
    var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2;
    var dx1 = l0 * Math.sin(alpha + a) * curvature;
    var dy1 = l0 * Math.cos(alpha + a) * curvature;
    var dx2 = l1 * Math.sin(alpha + b) * curvature;
    var dy2 = l1 * Math.cos(alpha + b) * curvature;
    return {
      "cp0": {
        "x": p1.x - 0 - dx1,
        "y": p1.y - 0 + dy1
      },
      "cp1": {
        "x": p1.x - 0 + dx2,
        "y": p1.y - 0 + dy2
      }
    };
  };

  //创建线条图形
  _p._createLinePlot = function (chart, dataset) {
    var datas = dataset.set;
    if (!datas) {
      return;
    }

    //Line
    var pattern = dataset.pattern;
    var lineCurvature = Math.floor(dataset.lineCurvature - 0) / 100;
    var lineColor = dataset.lineColor;
    var lineThickness = Math.floor(dataset.lineThickness || "0" - 0);
    var lineAlpha = Math.floor(dataset.lineAlpha - 0) / 100;
    var lineDashedStyle = this._CONST.ENABLE === dataset.lineDashed ?
      dataset.lineDashedStyle : "";
    //  var drawArrow = dataset.drawArrow;
    var path = [];
    for (var i = 0, ii = datas.length; i < ii; i++) {
      var data = datas[i];
      if (0 === i) {
        path = ["M", data.p0.x, data.p0.y, "C", data.p0.x, data.p0.y];
      }
      if (ii - 1 > i) {
        path = path.concat([data.bcp0.x, data.bcp0.y,
          data.p0.x, data.p0.y,
          data.bcp1.x, data.bcp1.y]);
      }
      if (ii - 1 === i) {
        path = path.concat([data.p0.x, data.p0.y, data.p0.x, data.p0.y]);
      }
    }
    var lineElement = this._paper.path(path)
      .attr({
        "stroke": this._getColor(lineColor),
        "stroke-width": lineThickness,
        "stroke-opacity": lineAlpha,
        "stroke-dasharray": lineDashedStyle
      });
  };

  //创建气泡图
  _p._createBubblePlot = function (chart, dataset) {

    var datas = dataset.set;
    if (!datas) {
      return;
    }

    var lineColor = dataset.lineColor;
    var lineThickness = Math.floor(dataset.lineThickness || "0" - 0);
    var lineAlpha = Math.floor(dataset.lineAlpha - 0) / 100;
    var lineDashedStyle = this._CONST.ENABLE === dataset.lineDashed ?
      dataset.lineDashedStyle : "";
    var fillColor = dataset.fillColor;
    var fillAngle = (360 - Math.floor(dataset.fillAngle - 0)) % 360;
    var fillAlpha = Math.floor(dataset.fillAlpha - 0) / 100;
    var gradientColor = dataset.gradientColor;
    var bubbleGradientOffset = dataset.bubbleGradientOffset;
    var fill = null;
    if (fillColor) {
      if (gradientColor) {
        var offsets = bubbleGradientOffset.split(",");
        var offset0 = Math.floor(offsets[0] - 0) / 100;
        var offset1 = 1 === offsets.length ? offset0 : Math.floor(offsets[1] - 0) / 100;
        fill = "r(" + offset0 + "," + offset1 + ")" + this._getColor(gradientColor) + "-" + this._getColor(fillColor) + ":100";
      } else {
        fill = this._getColor(fillColor);
      }
    }
    var perRound = null;
    if (this._CONST.ENABLE === chart.rotateXY) {
      perRound = this._getXAxisPos(chart, 1) - this._getXAxisPos(chart, 0);
    } else {
      perRound = this._getYAxisPos(chart, 0, dataset.parentYAxis) - this._getYAxisPos(chart, 1, dataset.parentYAxis);
    }
    //var perRound = this._getYAxisPos(chart, 0, dataset.parentYAxis) - this._getYAxisPos(chart, 1, dataset.parentYAxis);
    for (var i = 0, ii = datas.length; i < ii; i++) {
      var data = datas[i];
      var r = data.r || "0" - 0;
      var bubbleRadius = perRound * r;
      bubbleRadius = 1 > bubbleRadius ? 1 : bubbleRadius;
      var columnElement = this._paper.circle(data.p0.x, data.p0.y, bubbleRadius)
        .attr({
          "stroke": this._getColor(lineColor),
          "stroke-width": lineThickness,
          "stroke-opacity": lineAlpha,
          "stroke-dasharray": lineDashedStyle,
          "fill": fill,
          "fill-opacity": fillAlpha
        });
      columnElement.node["click-data"] = data.click;
      columnElement.node["mouseover-data"] = data.mouseover;
      columnElement.node["mousemove-data"] = data.mousemove;
      columnElement.node["mouseout-data"] = data.mouseout;
      columnElement.node["tooltip-data"] = data.toolTip;
    }
  };

  //创建锚点
  _p._createAnchorPlot = function (chart, dataset) {
    var datas = dataset.set;
    if (!datas) {
      return;
    }

    var anchorSides = Math.floor(dataset.anchorSides - 0);
    var anchorRadius = Math.floor(dataset.anchorRadius - 0);
    var anchorBorderColor = dataset.anchorBorderColor;
    var anchorBorderThickness = Math.floor(dataset.anchorBorderThickness - 0);
    var anchorBorderAlpha = Math.floor(dataset.anchorBorderAlpha - 0) / 100;
    var anchorBgColor = dataset.anchorBgColor;
    var anchorBgAlpha = Math.floor(dataset.anchorBgAlpha - 0) / 100;

    for (var i = 0, ii = datas.length; i < ii; i++) {
      var data = datas[i];

      var anchorElement = this._createAnchor({
        "cx": data.p0.x,
        "cy": data.p0.y,
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
  };

  //创建图形
  _p._createPatternPlot = function (chart) {
    var datasets = chart.dataset;
    if (!datasets) {
      return;
    }
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i];
      var pattern = dataset.pattern;
      if (this._CONST.PATTERN.COLUMN === pattern) {
        this._createColumnPlot(chart, dataset);
      } else if (this._CONST.PATTERN.LINE === pattern) {
        //Line
        this._createLinePlot(chart, dataset);
        //Anchors
        if (this._CONST.ENABLE === dataset.drawAnchors && !(this._CONST.ENABLE === dataset.anchorsShowOnTop)) {
          this._createAnchorPlot(chart, dataset);
        }
      } else if (this._CONST.PATTERN.AREA === pattern) {
        //Area
        this._createAreaPlot(chart, dataset);
        //Line
        if (this._CONST.ENABLE !== dataset.blShowOnTop) {
          this._createLinePlot(chart, dataset);
        }
        //Anchors
        if (this._CONST.ENABLE === dataset.drawAnchors && !(this._CONST.ENABLE === dataset.anchorsShowOnTop)) {
          this._createAnchorPlot(chart, dataset);
        }
      } else if (this._CONST.PATTERN.BUBBLE === pattern) {
        //Bubble
        this._createBubblePlot(chart, dataset);
      }
    }

    //Border show on top
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i];
      var pattern = dataset.pattern;
      if (this._CONST.PATTERN.AREA === pattern) {
        if (this._CONST.ENABLE === dataset.blShowOnTop) {
          this._createLinePlot(chart, dataset);
        }
      }
    }

    //Anchor show on top
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i];
      var pattern = dataset.pattern;
      if (this._CONST.PATTERN.LINE === pattern ||
        this._CONST.PATTERN.AREA === pattern) {
        var drawAnchors = dataset.drawAnchors;
        var anchorsShowOnTop = dataset.anchorsShowOnTop;
        if (this._CONST.ENABLE === drawAnchors && this._CONST.ENABLE === anchorsShowOnTop) {
          this._createAnchorPlot(chart, dataset);
        }
      }
    }
  };

  //创建图形数据标签
  _p._createPlotValue = function (chart) {
    var showValueLabel = chart.showValueLabel;
    if (this._CONST.ENABLE !== showValueLabel) {
      return;
    }
    var datasets = chart.dataset;
    if (!datasets) {
      return;
    }

    var rotateXY = chart.rotateXY;
    var rotateValueLabel = chart.rotateValueLabel;
    var placeValueLabelInside = chart.placeValueLabelInside;
    var valueLabelPadding = Math.floor(chart.valueLabelPadding - 0);
    var canvasBBox = this._getCanvasBBox(chart);
    var styleObject = this._CONST.STYLEOBJECT.VALUELABEL;
    var fontStyle = this._getFontStyle(chart, styleObject);
    var lineHeight = this._getTextWH(chart,
      styleObject,
      "0",
      0,
      true).height;
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i];
      var pattern = dataset.pattern;
      var anchorRadius = 0;
      if ((this._CONST.PATTERN.LINE === pattern || this._CONST.PATTERN.AREA === pattern) &&
        this._CONST.ENABLE === dataset.drawAnchors) {
        anchorRadius = Math.floor(dataset.anchorRadius - 0);
      }
      var parentYAxis = dataset.parentYAxis;
      var perRound = 0;
      var datas = dataset.set;
      if (!datas) {
        continue;
      }
      if (this._CONST.PATTERN.BUBBLE === pattern) {
        if (this._CONST.ENABLE === chart.rotateXY) {
          perRound = this._getXAxisPos(chart, 0) - this._getXAxisPos(chart, 1);
        } else {
          perRound = this._getYAxisPos(chart, 0, dataset.parentYAxis) - this._getYAxisPos(chart, 1, dataset.parentYAxis);
        }
      }
      for (var j = 0, jj = datas.length; j < jj; j++) {
        var data = datas[j];
        var x = data.p0.x;
        var y = data.p0.y;
        var x2 = data.p1.x;
        var y2 = data.p1.y;
        var r = data.r || "0" - 0;
        var vcx = null;
        var vcy = null;
        var angle = this._CONST.ENABLE === rotateValueLabel ? 270 : 0;

        if (this._CONST.PATTERN.COLUMN === pattern) {   //柱状图
          if (this._CONST.ENABLE === rotateXY) {
            var textWidth = null;
            if (this._CONST.ENABLE === rotateValueLabel) {
              textWidth = lineHeight;
            } else {
              textWidth = this._getTextWH(chart,
                styleObject,
                data.displayValue,
                0,
                false).width;
            }
            if (0 <= (data.y - 0)) {
              if ((this._CONST.ENABLE === placeValueLabelInside || (textWidth + valueLabelPadding) > (canvasBBox.x2 - x)) &&
                (textWidth + 2 * valueLabelPadding) <= (x - x2)) { //inside
                vcx = x - valueLabelPadding - textWidth / 2;
              } else if ((textWidth + valueLabelPadding) <= (canvasBBox.x2 - x)) { //have space
                vcx = x + valueLabelPadding + textWidth / 2;
              } else {
                vcx = x2 - valueLabelPadding - textWidth / 2;
              }
            } else {
              if ((this._CONST.ENABLE === placeValueLabelInside || (textWidth + valueLabelPadding) > (x - canvasBBox.x)) &&
                (textWidth + 2 * valueLabelPadding) <= (x2 - x)) { //inside
                vcx = x + valueLabelPadding + textWidth / 2;
              } else if ((textWidth + valueLabelPadding) <= (x - canvasBBox.x)) { //have space
                vcx = x - valueLabelPadding - textWidth / 2;
              } else {
                vcx = x2 + valueLabelPadding + textWidth / 2;
              }
            }
            vcy = (y + y2) / 2;

          } else {
            var textHeight = null;
            if (this._CONST.ENABLE === rotateValueLabel) { //rotate
              textHeight = this._getTextWH(chart,
                styleObject,
                data.displayValue,
                0,
                false).width;
            } else {
              textHeight = lineHeight;
            }
            vcx = (x + x2) / 2;
            if (0 <= (data.y - 0)) {
              if ((this._CONST.ENABLE === placeValueLabelInside || (textHeight + valueLabelPadding) > (y - canvasBBox.y)) &&
                (textHeight + 2 * valueLabelPadding) <= (y2 - y)) { //inside
                vcy = y + valueLabelPadding + textHeight / 2;
              } else if ((textHeight + valueLabelPadding) <= (y - canvasBBox.y)) { //有空间
                vcy = y - valueLabelPadding - textHeight / 2;
              } else {
                vcy = y2 + valueLabelPadding + textHeight / 2;
              }
            } else {
              if ((this._CONST.ENABLE === placeValueLabelInside || (textHeight + valueLabelPadding) > (canvasBBox.y2 - y)) &&
                (textHeight + 2 * valueLabelPadding) <= (y - y2)) { //inside
                vcy = y - valueLabelPadding - textHeight / 2;
              } else if ((textHeight + valueLabelPadding) <= (canvasBBox.y2 - y)) { //有空间
                vcy = y + valueLabelPadding + textHeight / 2;
              } else {
                vcy = y2 + valueLabelPadding + textHeight / 2;
              }
            }
          }
          vcx += 2;
          vcy += 1;

        } else if (this._CONST.PATTERN.LINE === pattern) {  //线图
          var textHeight = null;
          if (this._CONST.ENABLE === rotateValueLabel) {
            textHeight = this._getTextWH(chart,
              styleObject,
              data.displayValue,
              0,
              false).width;
          } else {
            textHeight = lineHeight;
          }

          vcx = x;
          if ((textHeight + valueLabelPadding + anchorRadius) <= (y - canvasBBox.y)) {
            vcy = y - valueLabelPadding - textHeight / 2 - anchorRadius;
          } else {
            vcy = y + valueLabelPadding + textHeight / 2 + anchorRadius;
          }
        } else if (this._CONST.PATTERN.AREA === pattern) {  //面积图
          if (this._CONST.ENABLE === rotateXY) {
            var textHeight = null;
            if (this._CONST.ENABLE === rotateValueLabel) {
              textHeight = this._getTextWH(chart,
                styleObject,
                data.displayValue,
                0,
                false).width;
            } else {
              textHeight = lineHeight;
            }
            vcx = x;
            if ((textHeight + valueLabelPadding + anchorRadius) <= (y - canvasBBox.y)) {
              vcy = y - valueLabelPadding - textHeight / 2 - anchorRadius;
            } else {
              vcy = y + valueLabelPadding + textHeight / 2 + anchorRadius;
            }

          } else {
            var textHeight = null;
            if (this._CONST.ENABLE === rotateValueLabel) { //rotate
              textHeight = this._getTextWH(chart,
                styleObject,
                data.displayValue,
                0,
                false).width;
            } else {
              textHeight = lineHeight;
            }

            vcx = (x + x2) / 2;
            if (0 <= (data.y - 0)) {
              if ((textHeight + valueLabelPadding + anchorRadius) <= (y - canvasBBox.y)) {  //有空间
                vcy = y - valueLabelPadding - textHeight / 2 - anchorRadius;
              } else {
                vcy = y + valueLabelPadding + textHeight / 2 + anchorRadius;
              }
            } else {
              if ((textHeight + valueLabelPadding + anchorRadius) <= (canvasBBox.y2 - y)) { //有空间
                vcy = y + valueLabelPadding + textHeight / 2 + anchorRadius;
              } else {
                vcy = y - valueLabelPadding - textHeight / 2 - anchorRadius;
              }
            }
          }
        } else if (this._CONST.PATTERN.BUBBLE === pattern) {    //气泡图
          var textHeight = lineHeight;
          var bubbleRadius = r * perRound;

          vcx = (x + x2) / 2;
          if (10 <= bubbleRadius) {
            vcy = y;
          } else {
            if ((textHeight + valueLabelPadding + bubbleRadius) <= (y - canvasBBox.y)) {  //有空间
              vcy = y - valueLabelPadding - textHeight / 2 - bubbleRadius;
            } else {
              vcy = y + valueLabelPadding + textHeight / 2;
            }
          }
        }

        var valueElement = this._createText({
          "text": data.displayValue,
          "cx": vcx,
          "cy": vcy,
          "angle": angle,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": fontStyle.color,
          "font-weight": fontStyle.bold,
          "text-align": this._CONST.TEXTALIGN.CENTER,
          "transform-origin": "center center"
        });
        valueElement["click-data"] = data.click;
        valueElement["mouseover-data"] = data.mouseover;
        valueElement["mousemove-data"] = data.mousemove;
        valueElement["mouseout-data"] = data.mouseout;
        valueElement["tooltip-data"] = data.toolTip;
      }
    }
  };

  //创建图形
  _p._createDataPlot = function (chart) {
    //创建基本图形信息
    this._setPatternInfo(chart);
    //创建柱状图
    this._createPatternPlot(chart);
    //创建数据值
    this._createPlotValue(chart);
  };

  //设置图形信息
  _p._setPatternInfo = function (chart) {
    var categories = "undefined" !== typeof chart.categories ?
      chart.categories.category : null;
    if (!categories) {
      return null;
    }
    var datasets = chart.dataset;
    if (!datasets) {
      return null;
    }

    //cal column sum
    var rotateXY = chart.rotateXY;
    var XYPlot = chart.XYPlot;
    var canvasBBox = this._getCanvasBBox(chart);
    var columnIndex = 0;
    var showToolTip = chart.showToolTip;
    var toolTipSepChar = chart.toolTipSepChar;
    var seriesNameInToolTip = chart.seriesNameInToolTip;
    var canvasBorderThickness = Math.floor(chart.canvasBorderThickness - 0);
    //var XYPlot = chart.XYPlot;
    var bezierLimitBBox = {
      "x": canvasBBox.x + canvasBorderThickness / 2,
      "y": canvasBBox.y + canvasBorderThickness / 2,
      "x2": canvasBBox.x2 - canvasBorderThickness / 2,
      "y2": canvasBBox.y2 - canvasBorderThickness / 2
    }
    var categoryWidth = 0;//(canvasBBox.width - 0) / categories.length;
    var plotSetPadding = 0;
    var plotPadding = 0;
    var plotWidth = 0;
    var plotMaxWidth = Math.floor(chart.plotMaxWidth - 0);
    var columnDatasets = this._getDatasets(chart, this._CONST.PATTERN.COLUMN);
    var columnTotal = 0;
    if (0 !== columnDatasets.length) {
      if (this._CONST.ENABLE === rotateXY) {
        categoryWidth = (canvasBBox.height - 0) / categories.length;
      } else {
        categoryWidth = (canvasBBox.width - 0) / categories.length;
      }

      var stackedColumn = {};
      for (var i = 0, ii = columnDatasets.length; i < ii; i++) {
        var dataset = datasets[i];
        var parentYAxis = dataset.parentYAxis;
        var stackedGroup = dataset.stackedGroup;
        if (!stackedGroup) {
          columnTotal++;
        } else {
          if (!stackedColumn[parentYAxis + stackedGroup]) {
            stackedColumn[parentYAxis + stackedGroup] = 1;
            columnTotal++;
          }
        }
      }
      plotSetPadding = Math.floor(chart.plotSetPadding - 0);
      plotPadding = Math.floor(chart.plotPadding - 0);
      plotWidth = (categoryWidth - plotSetPadding) / columnTotal;
      plotWidth = plotMaxWidth < plotWidth ? plotMaxWidth : plotWidth;
    }
    //calculate basic info
    var columnIndex = 0;
    var stackedMap = {};

    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i];
      var parentYAxis = dataset.parentYAxis;
      var seriesName = dataset.seriesName || "";
      var pattern = dataset.pattern;
      var stackedGroup = dataset.stackedGroup;
      var lineCurvature = Math.floor(dataset.lineCurvature - 0) / 100;
      var stackedId = parentYAxis + "_" + pattern + "_" + stackedGroup;
      var colIndex = 0;

      if (stackedGroup) {
        if ("undefined" === typeof stackedMap[stackedId]) {
          stackedMap[stackedId] = {};
          stackedMap[stackedId].stackedValue = {};
          stackedMap[stackedId].stackedData = {};
          if (this._CONST.PATTERN.COLUMN === pattern) {
            stackedMap[stackedId].colIndex = columnIndex++;
            colIndex = stackedMap[stackedId].colIndex;
          }
        } else {
          if (this._CONST.PATTERN.COLUMN === pattern) {
            colIndex = stackedMap[stackedId].colIndex;
          }
        }
      } else {
        if (this._CONST.PATTERN.COLUMN === pattern) {
          colIndex = columnIndex++;
        }
      }
      var by = Math.floor(this._getYAxisPos(chart, 0, parentYAxis));
      if (Raphael.svg) {
        by += 0.5;
      }
      var lx = Math.floor(this._getXAxisPos(chart, 0));
      var datas = dataset.set;
      if (datas) {
        var len = this._CONST.ENABLE === XYPlot ?
          datas.length : (datas.length < categories.length ? datas.length : categories.length);
        if (len < datas.length) {
          datas.length = len;
        }
        for (var j = 0, jj = len; j < jj; j++) {
          var data = datas[j];
          var value = data.y || "0" - 0;
          var x = 0;
          var y = 0;
          var x2 = 0;
          var y2 = 0;

          var stackedValue = 0;
          var stackedData = null;
          if (stackedGroup) {
            if ("undefined" === typeof stackedMap[stackedId].stackedValue[j]) {
              stackedMap[stackedId].stackedValue[j] = value;
            } else {
              stackedValue = stackedMap[stackedId].stackedValue[j];
              stackedMap[stackedId].stackedValue[j] += value;
            }

            if ("undefined" === typeof stackedMap[stackedId].stackedData[j]) {
              stackedMap[stackedId].stackedData[j] = data;
            } else {
              stackedData = stackedMap[stackedId].stackedData[j];
              stackedMap[stackedId].stackedData[j] = data;
            }
          }
          if (!stackedData) {
            if (this._CONST.ENABLE === rotateXY) {
              var cy = 0;
              if (this._CONST.ENABLE !== XYPlot && this._CONST.PATTERN.COLUMN === pattern) {
                cy = canvasBBox.y + (0.5 + j) * categoryWidth + (colIndex + 0.5 - columnTotal / 2) * plotWidth;
              } else {
                cy = this._getYAxisPos(chart, this._CONST.ENABLE === XYPlot ? data.x : j);
              }
              var ty = this._CONST.PATTERN.COLUMN === pattern ?
                cy - (plotWidth - plotPadding) / 2 : cy;
              var by = this._CONST.PATTERN.COLUMN === pattern ?
                cy + (plotWidth - plotPadding) / 2 : cy;
              var rx = this._getXAxisPos(chart, value);

              data.p0 = {
                "x": rx,
                "y": by
              };
              data.p1 = {
                "x": lx,
                "y": ty
              };
            } else {
              var cx = 0;
              if (this._CONST.ENABLE !== XYPlot && this._CONST.PATTERN.COLUMN === pattern) {
                cx = canvasBBox.x + (0.5 + j) * categoryWidth + (colIndex + 0.5 - columnTotal / 2) * plotWidth;
              } else {
                cx = this._getXAxisPos(chart, this._CONST.ENABLE === XYPlot ? data.x : j);
              }

              //    var cx = this._getXAxisPos(chart, data.x, j);//canvasBBox.x + (0.5 + j) * categoryWidth + (colIndex + 0.5 - columnTotal / 2) * plotWidth;
              var lx = this._CONST.PATTERN.COLUMN === pattern ?
                cx - (plotWidth - plotPadding) / 2 : cx;
              var rx = this._CONST.PATTERN.COLUMN === pattern ?
                cx + (plotWidth - plotPadding) / 2 : cx;
              var ty = this._getYAxisPos(chart, value, parentYAxis);

              data.p0 = {
                "x": lx,
                "y": ty
              };
              data.p1 = {
                "x": rx,
                "y": by
              };
            }
          } else {
            if (this._CONST.ENABLE === rotateXY) {

              data.p0 = {
                "x": stackedData.p0.x + (this._getXAxisPos(chart, value) - lx),
                "y": stackedData.p0.y
              };
              data.p1 = {
                "x": stackedData.p0.x,
                "y": stackedData.p1.y
              };
            } else {
              data.p0 = {
                "x": stackedData.p0.x,
                "y": stackedData.p0.y + (this._getYAxisPos(chart, value, parentYAxis) - by)
              };
              data.p1 = {
                "x": stackedData.p1.x,
                "y": stackedData.p0.y
              };
            }
          }

          //如果是区域或者线图，需要计算贝塞尔曲线
          if (this._CONST.PATTERN.AREA === pattern || this._CONST.PATTERN.LINE === pattern) {
            if (2 <= j) {
              var bezierAnchor = this._calcBezierAnchor(rotateXY,
                datas[j - 2].p0,
                datas[j - 1].p0,
                datas[j].p0,
                lineCurvature);
              var cp0 = bezierAnchor.cp0;
              var cp1 = bezierAnchor.cp1;

              if (this._CONST.ENABLE === rotateXY) {
                cp0.x = bezierLimitBBox.x > cp0.x ? bezierLimitBBox.x : cp0.x;
                cp0.x = bezierLimitBBox.x2 < cp0.x ? bezierLimitBBox.x2 : cp0.x;
                cp1.x = bezierLimitBBox.x > cp1.x ? bezierLimitBBox.x : cp1.x;
                cp1.x = bezierLimitBBox.x2 < cp1.x ? bezierLimitBBox.x2 : cp1.x;
              } else {
                cp0.y = bezierLimitBBox.y > cp0.y ? bezierLimitBBox.y : cp0.y;
                cp0.y = bezierLimitBBox.y2 < cp0.y ? bezierLimitBBox.y2 : cp0.y;
                cp1.y = bezierLimitBBox.y > cp1.y ? bezierLimitBBox.y : cp1.y;
                cp1.y = bezierLimitBBox.y2 < cp1.y ? bezierLimitBBox.y2 : cp1.y;
              }


              datas[j - 1].bcp0 = bezierAnchor.cp0;
              datas[j - 1].bcp1 = bezierAnchor.cp1;
            }
            if (0 === j || jj - 1 === j) {
              data.bcp0 = {"x": data.p0.x, "y": data.p0.y};
              data.bcp1 = {"x": data.p0.x, "y": data.p0.y};
            }

            if (this._CONST.PATTERN.AREA === pattern) {
              if (stackedData) {
                data.sbcp0 = {"x": stackedData.bcp0.x, "y": stackedData.bcp0.y};
                data.sbcp1 = {"x": stackedData.bcp1.x, "y": stackedData.bcp1.y};
              } else {
                data.sbcp0 = {"x": data.x2, "y": data.y2};
                data.sbcp1 = {"x": data.x2, "y": data.y2};
              }
            }
          }

          data.displayValue = this._getFormatNumber(chart, value - 0 + stackedValue);
          if (this._CONST.ENABLE === showToolTip) {
            var tooltip = [];
            if (this._CONST.ENABLE === chart.XYPlot) {
              if (!seriesName) {
                //toolTip = data.displayValue;
                tooltip[tooltip.length] = data.displayValue;
              } else {
                tooltip[tooltip.length] = seriesName;
                tooltip[tooltip.length] = data.displayValue;
                //toolTip = seriesName + toolTipSepChar + data.displayValue;
              }
            } else {
              var categoryLabel = categories[j].label || "";
              if (!seriesName) {
                tooltip[tooltip.length] = categoryLabel;
                tooltip[tooltip.length] = data.displayValue;
                //toolTip = categoryLabel + toolTipSepChar + data.displayValue;
              } else {
                tooltip[tooltip.length] = seriesName;
                tooltip[tooltip.length] = categoryLabel;
                tooltip[tooltip.length] = data.displayValue;
                //toolTip = seriesName + toolTipSepChar + categoryLabel + toolTipSepChar + data.displayValue;
              }
            }
            if (this._CONST.PATTERN.BUBBLE === pattern) {
              tooltip[tooltip.length] = data.r || "0";
            }
            data.toolTip = tooltip.join(toolTipSepChar);
          }
        }
      }
    }
  };

  //绘制分隔线
  _p._createDivLine = function (chart, divLine) {
    var rotateXY = chart.rotateXY;
    var XYPlot = chart.XYPlot;
    var canvasBBox = this._getCanvasBBox(chart);
    var x = canvasBBox.x;
    var y = canvasBBox.y;
    var x2 = canvasBBox.x2;
    var y2 = canvasBBox.y2;
    var width = canvasBBox.width;
    var height = canvasBBox.height;
    var canvasBorderThickness = Math.floor(chart.canvasBorderThickness - 0);
    var axises = null;
    var divLineColor = null;
    var divLineThickness = null;
    var divLineAlpha = null;
    var divLineDashStyle = null;
    var showAlternateGridColor = null;
    var alternateGridColor = null;
    var alternateGridAlpha = null;
    var showZeroPlane = null;
    var zeroPlaneColor = null;
    var zeroPlaneThickness = null;
    var zeroPlaneAlpha = null;
    var zeroPlaneDashStyle = null;
    if (this._CONST.DIVLINE.H === divLine) {
      axises = chart.axises.PYAxiseset;
      divLineColor = chart.hDivLineColor;
      divLineThickness = Math.floor(chart.hDivLineThickness - 0);
      divLineAlpha = Math.floor(chart.hDivLineAlpha - 0) / 100;
      divLineIsDashed = chart.hDivLineIsDashed;
      divLineDashStyle = this._CONST.ENABLE === chart.hDivLineIsDashed ?
        chart.hDivLineDashStyle : "";
      showAlternateGridColor = chart.showAlternateHGridColor;
      alternateGridColor = chart.alternateHGridColor;
      alternateGridAlpha = Math.floor(chart.alternateHGridAlpha - 0) / 100;

      showZeroPlane = chart.showHZeroPlane;
      zeroPlaneColor = chart.hZeroPlaneColor;
      zeroPlaneThickness = Math.floor(chart.hZeroPlaneThickness - 0);
      zeroPlaneAlpha = Math.floor(chart.hZeroPlaneAlpha - 0) / 100;
      zeroPlaneDashStyle = this._CONST.ENABLE === chart.hZeroPlaneIsDashed ?
        chart.hZeroPlaneDashStyle : "";
    } else {
      axises = chart.axises.xAxiseset;
      divLineColor = chart.vDivLineColor;
      divLineThickness = Math.floor(chart.vDivLineThickness - 0);
      divLineAlpha = Math.floor(chart.vDivLineAlpha - 0) / 100;
      divLineIsDashed = chart.vDivLineIsDashed;
      divLineDashStyle = this._CONST.ENABLE === chart.vDivLineIsDashed ?
        chart.vDivLineDashStyle : "";
      showAlternateGridColor = chart.showAlternateVGridColor;
      alternateGridColor = chart.alternateVGridColor;
      alternateGridAlpha = Math.floor(chart.alternateVGridAlpha - 0) / 100;

      showZeroPlane = chart.showVZeroPlane;
      zeroPlaneColor = chart.vZeroPlaneColor;
      zeroPlaneThickness = Math.floor(chart.vZeroPlaneThickness - 0);
      zeroPlaneAlpha = Math.floor(chart.vZeroPlaneAlpha - 0) / 100;
      zeroPlaneDashStyle = this._CONST.ENABLE === chart.vZeroPlaneIsDashed ?
        chart.vZeroPlaneDashStyle : "";
    }

    if (this._CONST.ENABLE === chart.rotateXY) {
      if (this._CONST.DIVLINE.H === divLine) {
        divLine = this._CONST.DIVLINE.V;
      } else {
        divLine = this._CONST.DIVLINE.H;
      }
    }

    if (this._CONST.ENABLE === showAlternateGridColor && 0 < alternateGridAlpha) {
      for (var i = 0, ii = axises.length; i < ii; i++) {

        var cx0 = null;
        var cy0 = null;
        var cx1 = null;
        var cy1 = null;
        if (0 === i) {
          if (this._CONST.DIVLINE.V === divLine) {
            var lx = Math.floor(this._getXAxisPos(chart, axises[0].value)) - divLineThickness / 2;
            if (x < lx) {
              cx0 = Math.floor(x + canvasBorderThickness / 2);
              cy0 = Math.floor(y + canvasBorderThickness / 2);
              cx1 = lx;
              cy1 = Math.floor(y2 - canvasBorderThickness / 2);
            }
          }
        } else if (ii - 1 === i && 1 == i % 2) {
          if (this._CONST.DIVLINE.V === divLine) {
            var rx = Math.floor(this._getXAxisPos(chart, axises[ii - 1].value)) + divLineThickness / 2;
            if (x2 > rx) {
              cx0 = rx;
              cy0 = Math.floor(y + canvasBorderThickness / 2);
              cx1 = Math.floor(x2 - canvasBorderThickness / 2);
              cy1 = Math.floor(y2 - canvasBorderThickness / 2);
            }
          }
        } else if (1 == i % 2) {
          if (this._CONST.DIVLINE.H === divLine) {
            cx0 = Math.floor(x + canvasBorderThickness / 2);
            cy0 = Math.floor(this._getYAxisPos(chart, axises[i].value, this._CONST.AXIS.PY)) - divLineThickness / 2;
            cx1 = Math.floor(x2 - canvasBorderThickness / 2);
            cy1 = Math.floor(this._getYAxisPos(chart, axises[i + 1].value, this._CONST.AXIS.PY)) + divLineThickness / 2;
          } else {
            cx0 = Math.floor(this._getXAxisPos(chart, axises[i].value)) - divLineThickness / 2;
            cy0 = Math.floor(y + canvasBorderThickness / 2);
            cx1 = Math.floor(this._getXAxisPos(chart, axises[i + 1].value)) + divLineThickness / 2;
            cy1 = Math.floor(y2 - canvasBorderThickness / 2);
          }

          if (Raphael.svg) {
            cy0 += divLineThickness / 2;
            if (axises.length - 2 === i) {
              cy1 += canvasBorderThickness / 2 - divLineThickness / 2;
            }
            cx1 += 1;
          } else {
            if (axises.length - 2 === i) {
              cy1 += canvasBorderThickness / 2 - divLineThickness / 2;
            }
          }
        }

        if (cx0) {
          var path = [];
          path[path.length] = ["M", cx0, cy0];
          path[path.length] = ["L", cx1, cy0];
          path[path.length] = ["L", cx1, cy1];
          path[path.length] = ["L", cx0, cy1];
          path[path.length] = ["Z"];
          this._paper.path(path)
            .attr({
              "stroke-width": 0,
              "fill": this._getColor(alternateGridColor),
              "fill-opacity": alternateGridAlpha
            });
        }
      }
    }

    if (0 < divLineThickness && 0 < divLineAlpha) {
      for (var i = 0, ii = axises.length; i < ii; i++) {
        if (this._CONST.DIVLINE.H === divLine) {
          var cx0 = Math.floor(x + canvasBorderThickness / 2);
          var cy0 = Math.floor(this._getYAxisPos(chart, axises[i].value, this._CONST.AXIS.PY));
          var cx1 = Math.floor(x2 - canvasBorderThickness / 2);
          var cy1 = cy0;
          if (Raphael.svg) {
            cx1 += 1;
          }
          this._createHLine(cx0, cy0, cx1, cy1, divLineThickness)
            .attr({
              "stroke": this._getColor(divLineColor),
              "stroke-width": divLineThickness,
              "stroke-opacity": divLineAlpha,
              "stroke-dasharray": divLineDashStyle
            });

          if (0 !== i && (ii - 1) - i) {
            var value = axises[i].value;
            if (this._CONST.ENABLE === showZeroPlane &&
              null != value && 0 === (value - 0) &&
              (this._CONST.ENABLE == XYPlot || this._CONST.ENABLE !== rotateXY)) {
              this._createHLine(cx0, cy0, cx1, cy1, zeroPlaneThickness)
                .attr({
                  "stroke": this._getColor(zeroPlaneColor),
                  "stroke-width": zeroPlaneThickness,
                  "stroke-opacity": zeroPlaneAlpha,
                  "stroke-dasharray": zeroPlaneDashStyle
                });
            }
          }

        } else {
          var cx0 = Math.floor(this._getXAxisPos(chart, axises[i].value));
          var cy0 = Math.floor(y + canvasBorderThickness / 2);
          var cx1 = cx0;
          var cy1 = Math.floor(y2 - canvasBorderThickness / 2);
          if (Raphael.svg) {
            cy1 += 1;
          }
          this._createVLine(cx0, cy0, cx1, cy1, divLineThickness)
            .attr({
              "stroke": this._getColor(divLineColor),
              "stroke-width": divLineThickness,
              "stroke-opacity": divLineAlpha,
              "stroke-dasharray": divLineDashStyle
            });
          if (this._CONST.ENABLE === showZeroPlane &&
            0 !== i && (ii - 1) - i &&
            (this._CONST.ENABLE == XYPlot || this._CONST.ENABLE === rotateXY)) {
            var value = axises[i].value;
            if (null != value && 0 === (value - 0)) {
              this._createVLine(cx0, cy0, cx1, cy1, zeroPlaneThickness)
                .attr({
                  "stroke": this._getColor(zeroPlaneColor),
                  "stroke-width": zeroPlaneThickness,
                  "stroke-opacity": zeroPlaneAlpha,
                  "stroke-dasharray": zeroPlaneDashStyle
                });
            }
          }
        }
      }
    }
  };

  //绘制序列分隔线
  _p._createSepLine = function (chart) {
    var axises = chart.axises.xAxiseset;
    if (!axises) {
      return;
    }
    var canvasBBox = this._getCanvasBBox(chart);
    var x = canvasBBox.x;
    var y = canvasBBox.y;
    var x2 = canvasBBox.x2;
    var y2 = canvasBBox.y2;
    var canvasBorderThickness = Math.floor(chart.canvasBorderThickness - 0);
    var categories = chart.categories;
    var sepLineThickness = Math.floor(categories.sepLineThickness - 0);
    var sepLineColor = categories.sepLineColor;
    var sepLineAlpha = Math.floor(categories.sepLineAlpha - 0) / 100;
    var sepLineDashedStyle = this._CONST.ENABLE === categories.sepLineDashed ?
      categories.sepLineDashedStyle : "";
    if (1 > sepLineThickness) {
      return;
    }
    for (var i = 0, ii = axises.length - 1; i < ii; i++) {
      var axis0 = axises[i];
      var axis1 = axises[i + 1];
      if (this._CONST.ENABLE !== axis0.visiable || this._CONST.ENABLE !== axis1.visiable) {
        continue;
      }
      var value = (axis0.value + axis1.value) / 2;

      var cx0 = null;
      var cy0 = null;
      var cx1 = null;
      var cy1 = null;
      if (this._CONST.ENABLE === chart.rotateXY) {
        cx0 = Math.floor(x + canvasBorderThickness / 2);
        cy0 = Math.floor(this._getYAxisPos(chart, value, this._CONST.AXIS.PY));
        cx1 = Math.floor(x2 - canvasBorderThickness / 2);
        cy1 = cy0;
      } else {
        cx0 = Math.floor(this._getXAxisPos(chart, value));
        cy0 = Math.floor(y + canvasBorderThickness / 2);
        cx1 = cx0;
        cy1 = Math.floor(y2 - canvasBorderThickness / 2);
      }

      this._createVLine(cx0, cy0, cx1, cy1, sepLineThickness)
        .attr({
          "stroke": this._getColor(sepLineColor),
          "stroke-width": sepLineThickness,
          "stroke-opacity": sepLineAlpha,
          "stroke-dasharray": sepLineDashedStyle
        });
    }
  };

  //绘制垂直分隔线
  _p._createVDivLine = function (chart) {
    this._createDivLine(chart, this._CONST.DIVLINE.V);
  };

  //创建水平分隔线
  _p._createHDivLine = function (chart) {
    this._createDivLine(chart, this._CONST.DIVLINE.H);
  };


  //创建垂直分隔线
  _p._createHLine = function (cx0, cy0, cx1, cy1, t) {
    var adjust = 0;
    if (Raphael.svg && this._isOdd(t)) {
      adjust += 0.5;
    } else if (Raphael.vml && !this._isOdd(t)) {
      adjust += 0.5;
    }
    var path = [];
    path[path.length] = ["M", cx0, cy0 + adjust];
    path[path.length] = ["L", cx1, cy1 + adjust];
    return this._paper.path(path);
  };

  //绘制垂直线
  _p._createVLine = function (cx0, cy0, cx1, cy1, t) {
    var adjust = 0;
    if (Raphael.svg && this._isOdd(t)) {
      adjust += 0.5;
    } else if (Raphael.vml && !this._isOdd(t)) {
      adjust += 0.5;
    }
    var path = [];
    path[path.length] = ["M", cx0 + adjust, cy0];
    path[path.length] = ["L", cx1 + adjust, cy1];
    return this._paper.path(path);
  };

  //计算X轴位置
  _p._getXAxisPos = function (chart, value) {
    value = value || "0" - 0;

    if ("undefined" !== typeof this._getXAxisPosCurrying) {
      return this._getXAxisPosCurrying(value);
    }
    var axiseset = null;
    if (this._CONST.ENABLE === chart.rotateXY) {
      axiseset = chart.axises.PYAxiseset;
    } else {
      axiseset = chart.axises.xAxiseset;
    }
    var xAxisLabelBBox = this._getXAxisLabelBBox(chart);
    var start = axiseset[0].value;
    var end = axiseset[axiseset.length - 1].value;

    this._getXAxisPosCurrying = function (value) {
      return xAxisLabelBBox.x +
        (xAxisLabelBBox.x2 - xAxisLabelBBox.x) /
        (end - start) * (value - start);
    };
    return this._getXAxisPosCurrying(value);
  };

  //计算Y轴位置
  _p._getYAxisPos = function (chart, value, parentYAxis) {
    if (this._CONST.AXIS.SY === parentYAxis) {
      if ("undefined" !== typeof this._getSYAxisPosCurrying) {
        return this._getSYAxisPosCurrying(value);
      }
      var yAxisLabelBBox = this._getSYAxisLabelBBox(chart);
      var axiseset = chart.axises.SYAxiseset;
      var y = yAxisLabelBBox.y;
      var y2 = yAxisLabelBBox.y2;
      if (!axiseset || 0 === axiseset.length) {
        return y2;
      }
      var start = axiseset[0].value - 0;
      var end = axiseset[axiseset.length - 1].value - 0;
      this._getSYAxisPosCurrying = function (value) {
        return y2 - (y2 - y) / (end - start) * (value - start);
      };
      return this._getSYAxisPosCurrying(value);
    } else {
      if ("undefined" !== typeof this._getPYAxisPosCurrying) {
        return this._getPYAxisPosCurrying(value);
      }
      var yAxisLabelBBox = this._getPYAxisLabelBBox(chart);
      var axiseset = null;
      if (this._CONST.ENABLE === chart.rotateXY) {
        axiseset = chart.axises.xAxiseset;
      } else {
        axiseset = chart.axises.PYAxiseset;
      }
      var y = yAxisLabelBBox.y;
      var y2 = yAxisLabelBBox.y2;
      if (!axiseset || 0 === axiseset.length) {
        return y2;
      }
      var start = axiseset[0].value - 0;
      var end = axiseset[axiseset.length - 1].value - 0;
      this._getPYAxisPosCurrying = function (value) {
        return y2 - (y2 - y) / (end - start) * (value - start);
      };
      return this._getPYAxisPosCurrying(value);
    }
  };
}).call(this, window);
