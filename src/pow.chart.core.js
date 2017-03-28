(function (root) {

  //命名空间
  var POW = root.POW = root.POW || {};
  POW.Chart = POW.Chart || {};


  //构造函数
  POW.Chart.Core = function (render, width, height) {
    //render信息
    this._render = render;
    this._width = width || this._getComputedStyle(render, 'width').replace('px', '') - 0;
    this._height = height || this._getComputedStyle(render, 'height').replace('px', '') - 0;

    //holder信息
    this._holderElement = null;
    this._holderWidth = null;
    this._holderHeight = null;

    //提示元素
    this._toolTipElement = null;

    //图形画笔
    this._paper = null;

    //浏览器信息
    this._browser = null;

    //初始化
    this._init(width, height);
  };

  //原型
  var _p = POW.Chart.Core.prototype;


  //资源文件
  _p._RESOURCE = {
    "BROWER_NOT_SUPPORT": "Fail to get XML data",
    "INVALID_XML_DATA": "Invalid XML data",
    "NO_DATA": "No data to display",
    "DATA_OUT_OF_RANGE": "Data out of range"
  };

  _p._CONST = {
    "ENABLE": "1",
    "DISABLE": "0",
    "LEGENDMARKSCALE": "0.6",
    "SMARTRADIUS": {
      "SCALE": "0.9",
      "MIN": "50"
    },
    "PATTERN": {
      "COLUMN": "COLUMN",
      "LINE": "LINE",
      "AREA": "AREA",
      "BUBBLE": "BUBBLE",
      "PIE": "PIE",
      "DOUGHNUT": "DOUGHNUT"
    },
    "AXIS": {
      "X": "X",
      "Y": "Y",
      "PY": "P",
      "SY": "S"
    },
    "DIVLINE": {
      "H": "H",
      "V": "V"
    },
    "TRENDLINE": {
      "H": "H",
      "V": "V"
    },
    "COLOR": {
      "BLACK": "#000000",
      "WHITE": "#FFFFFF"
    },
    "SHADOW": {
      "COLOR": "AAAAAA",
      "OFFSET": "2",
      "OPACITY": "1"
    },
    "VMLADJUST": {
      "LEFT": "1",
      "TOP": "1"
    },
    "WEBKITMINFONTSIZE": "12",
    "TAGNAME": {
      "CHART": "chart",
      "CATEGORIES": "categories",
      "CATEGORY": "category",
      "DATASET": "dataset",
      "SET": "set",
      "hTrendlines": "hTrendlines",
      "vTrendlines": "vTrendlines",
      "LINE": "line",
      "DEFINITION": "definition",
      "STYLE": "style",
      "APPLICATION": "application",
      "APPLY": "apply"
    },
    "ARRAYDATASET": {
      "chart|dataset": true,
      "categories|category": true,
      "dataset|set": true,
      "hTrendlines|line": true,
      "vTrendlines|line": true,
      "definition|style": true,
      "application|apply": true
    },
    "LEGENDPOSITION": {
      "BOTTOM": "BOTTOM",
      "RIGHT": "RIGHT"
    },
    "TEXTELEMENTTYPE": {
      "HTML": "HTML",
      "SVGORVML": "SVGORVML"
    },
    "STYLETYPE": {
      "FONT": "font"
    },
    "STYLEOBJECT": {
      "CAPTION": "caption",
      "SUBCAPTION": "subCaption",
      "XAXISNAME": "xAxisName",
      "PYAXISNAME": "PYAxisName",
      "SYAXISNAME": "SYAxisName",
      "PYAXISLABEL": "PYAxisLabel",
      "SYAXISLABEL": "SYAxisLabel",
      "LEGEND": "legend",
      "XAXISLABEL": "xAxisLabel",
      "HTRENDLABEL": "hTrendLabel",
      "VTRENDLABEL": "vTrendLabel",
      "VALUELABEL": "valueLabel",
      "TOOLTIP": "tooltip"
    },
    "LABELDISPLAY": {
      "WRAP": "WRAP",
      "STAGGER": "STAGGER",
      "ROTATE": "ROTATE",
      "NONE": "NONE"
    },
    "TEXTALIGN": {
      "CENTER": "center",
      "LEFT": "left",
      "RIGHT": "right"
    },
    "TEXTANCHOR": {
      "START": "start",
      "MIDDLE": "middle",
      "END": "end"
    }
  };

  //默认值
  _p._DEFAULT = {
    "chart": {
      //transparent
      "transparent": "1",

      //chart
      "chartTopMargin": "20",
      "chartRightMargin": "20",
      "chartBottomMargin": "20",
      "chartLeftMargin": "20",

      //Border
      "showBorder": "0",
      "borderColor": "000000",
      "borderThickness": "1",
      "borderAlpha": "100",

      //Background
      "bgColor": "FFFFFF",
      "bgAlpha": "0",
      "bgAngle": "90",
      "bgImage": "",
      "bgImageAlpha": "60",

      //caption
      "caption": "",
      "captionPadding": "10",

      //subCaption
      "subCaption": "",
      "subCaptionPadding": "10",

      //xAxisName
      "xAxisName": "",
      "xAxisNamePadding": "5",

      //PYAxisName
      "PYAxisName": "",
      "PYAxisNameWidth": "",
      "PYAxisNamePadding": "5",

      //SYAxisName
      "SYAxisName": "",
      "SYAxisNameWidth": "",
      "SYAxisNamePadding": "5",

      //Legend
      "showLegend": "1",
      "legendPosition": "BOTTOM",
      "legendPadding": "5",
      "legendTextPadding": "5",
      "legendBgColor": "FFFFFF",
      "legendBgAlpha": "100",
      "legendBorderColor": "545454",
      "legendBorderThickness": "1",
      "legendBTOverPadding": "2",
      "legendMTPadding": "3",
      "legendMTVPadding": "5",
      "legendTMPadding": "20",
      "legendBorderAlpha": "100",
      "legendShadow": "1",

      //CanvasBorder
      "canvasBgColor": "FFFFFF",
      "canvasBgAlpha": "100",
      "canvasBgAngle": "90",
      "canvasBorderColor": "545454",
      "canvasBorderAlpha": "60",
      "canvasBorderThickness": "2",

      //Event
      "eventParamSeparator": "-",

      //ToolTip
      "showToolTip": "1",
      "toolTipSepChar": ", ",
      "seriesNameInToolTip": "1",
      "toolTipBgColor": "FFFFFF",
      "toolTipBorderColor": "545454",

      //NumberFormat
      "formatNumber": "1",
      "formatNumberScale": "1",
      "defaultNumberScale": "",
      "numberScaleUnit": "K,M,B",
      "numberScaleValue": "1000,1000,1000",
      "numberPrefix": "",
      "numberSuffix": "",
      "thousandSeparator": ",",
      "decimalSeparator": ".",
      "decimals": "2",
      "forceDecimals": "0",

      //style
      "styles": {
        "caption": {
          "font": {
            "font": "Verdana",
            "size": "14",
            "color": "000000",
            "bold": "1"
          }
        },
        "subCaption": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "1"
          }
        },
        "xAxisName": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "1"
          }
        },
        "PYAxisName": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "1"
          }
        },
        "SYAxisName": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "1"
          }
        },
        "PYAxisLabel": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "0"
          }
        },
        "SYAxisLabel": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "0"
          }
        },
        "legend": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "0"
          }
        },
        "xAxisLabel": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "0"
          }
        },
        "hTrendLabel": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "91C728",
            "bold": "0"
          }
        },
        "vTrendLabel": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "91C728",
            "bold": "0"
          }
        },
        "valueLabel": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "0"
          }
        },
        "tooltip": {
          "font": {
            "font": "Verdana",
            "size": "10",
            "color": "555555",
            "bold": "0"
          }
        }
      }
    }
  };


  //计算样式
  _p._getComputedStyle = function (element, css) {
    if (element.currentStyle) {
      return element.currentStyle[css];
    } else {
      return document.defaultView.getComputedStyle(element, false)[css];
    }
  };

  //继承，采用组合寄生
  _p._inheritPrototype = function (subType, superType) {
    var prototype = (function object(o) {
      function F() {}
      F.prototype = o;
      return new F();
    })(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
  };

  //标准化数据值，删除不在std对象中的数据后，扩展默认值
  _p._standardizeObject = function (dstObj, stdObj) {
    if (!dstObj || !stdObj) {
      return null;
    }

    //删除不在srcObj中的属性
    (function (dstObj, stdObj) {
      for (var property in dstObj) {
        if ("undefined" === typeof stdObj[property]) {  //在stdObj中没有，删除
          delete dstObj[property];
        } else {
          if (dstObj[property] instanceof Object) {   //是个对象
            if ("[object Array]" === Object.prototype.toString.call(dstObj[property])) { //是个数组
              for (var i = 0, ii = dstObj[property].length; i < ii; i++) {
                arguments.callee(dstObj[property][i], stdObj[property][0]);
              }
            } else {
              arguments.callee(dstObj[property], stdObj[property]);
            }
          }
        }
      }
    })(dstObj, stdObj);

    //扩展默认值
    return this._extendObject(dstObj, stdObj);
  };

  //扩展默认值
  _p._extendObject = function (dstObj, srcObj) {
    if (!dstObj || !srcObj) {
      return null;
    }
    for (var property in srcObj) {
      if (srcObj[property] instanceof Object) {
        if ("[object Array]" === Object.prototype.toString.call(srcObj[property])) {    //如果是数组，需要进行for处理
          if (!dstObj[property]) {
            continue;
          } else {
            for (var i = 0, ii = dstObj[property].length; i < ii; i++) {
              arguments.callee(dstObj[property][i], srcObj[property][0]);
            }
          }
        } else {
          dstObj[property] = null == dstObj[property] ? {} : dstObj[property];
          arguments.callee(dstObj[property], srcObj[property]);
        }
      } else {
        if (!dstObj[property]) {
          dstObj[property] = {};
          dstObj[property] = srcObj[property];
        }
      }
    }
    return dstObj;
  };

  //将XML转换为OBJ对象
  _p._tranXml2Object = function (xmlDocument) {
    if (!xmlDocument) {
      return null;
    }

    var self = this;
    var obj = {};
    (function (xmlElement, obj, TAGNAME) {
      if (!xmlElement) {
        return;
      }

      var tagName = xmlElement.tagName;
      var attributes = xmlElement.attributes;
      //当前属性
      if (attributes) {
        for (var i = 0, len = attributes.length; i < len; i++) {
          var attribute = attributes[i];
          var name = attribute.name;
          var value = attribute.value;
          if (!value) {
            continue;
          }
          obj[name] = value;
        }
      }

      //子节点
      var subElements = xmlElement.childNodes;
      if (subElements) {
        for (var i = 0, len = subElements.length; i < len; i++) {
          var subElement = subElements[i];
          if ("undefined" != typeof Node &&
            (Node.TEXT_NODE == subElement.nodeType ||
            Node.COMMENT_NODE == subElement.nodeType)) {   //文本节点
            continue;
          }

          var subTagName = subElement.tagName;
          if (!subTagName) {
            continue;
          }

          var subObj = obj[subTagName];
          if (!subObj) {
            var newObj = {};
            arguments.callee(subElement, newObj, TAGNAME);
            subObj = newObj;
            if (self._CONST.ARRAYDATASET[tagName + "|" + subTagName]) {
              var newObj = {};
              arguments.callee(subElement, newObj, TAGNAME);
              subObj = [subObj];
            }
          } else if ("[object Object]" === Object.prototype.toString.call(subObj)) {
            var newObj = {};
            arguments.callee(subElement, newObj, TAGNAME);
            subObj = [subObj, newObj];
          } else {
            var newObj = {};
            arguments.callee(subElement, newObj, TAGNAME);
            subObj[subObj.length] = newObj;
          }
          obj[subElement.tagName] = subObj;
        }
      }
    })(xmlDocument.documentElement, obj, this._CONST.TAGNAME);

    return obj;
  };

  //初始化
  _p._init = function () {
    //初始化浏览器信息
    var browser = { //这边需要加强，但是目前够用了
      "browser": (function () {
        var ua = navigator.userAgent.toLowerCase();
        if (-1 !== ua.indexOf("msie 6")) {
          return {"ie": true, "ver": 6};
        } else if (-1 !== ua.indexOf("msie 7")) {
          return {"ie": true, "ver": 7};
        } else if (-1 !== ua.indexOf("msie 8")) {
          return {"ie": true, "ver": 8};
        } else if (-1 !== ua.indexOf("msie 9")) {
          return {"ie": true, "ver": 9};
        } else if (-1 !== ua.indexOf("msie 10")) {
          return {"ie": true, "ver": 10};
        } else if (-1 !== ua.indexOf("chrome")) {
          return {"chrome": true};
        } else if (-1 !== ua.indexOf("opera")) {   //Actually, opera is same as chrome
          return {"opera": true};
        } else if (-1 !== ua.indexOf("firefox")) {
          return {"firefox": true};
        } else if (-1 !== ua.indexOf("safari")) {
          return {"safari": true};
        } else {
          return {"chrome": true};
        }
      })()
    };
    this._browser = browser;

    //render元素
    var renderElement = this._render;//document.getElementById(this._render);

    //初始化hoder元素
    var holderWidth = 0;
    if (-1 != (this._width + "").indexOf("%")) {    //使用百分比
      var renderWidth = renderElement.clientWidth - 0;
      holderWidth = renderWidth * (this._width.replace("%", "") - 0) / 100;
    } else {
      holderWidth = this._width;
    }

    var holderHeight = 0;
    if (-1 != (this._height + "").indexOf("%")) {    //使用百分比
      var renderHeight = renderElement.clientHeight - 0;
      holderHeight = renderHeight * (this._height.replace("%", "") - 0) / 100;
    } else {
      holderHeight = this._height;
    }
    var holderElement = document.createElement("div");
    holderElement.style.width = holderWidth + "px";
    holderElement.style.height = holderHeight + "px";
    holderElement.style.position = "relative";
    holderElement.style.cursor = "default";
    holderElement.style.overflow = "hidden";
    holderElement.style.zIndex = "0";
    var align = this._getComputedStyle(renderElement, "textAlign");
    if (align) {
      if (-1 != align.toLowerCase().indexOf("center")) {
        holderElement.style.marginLeft = "auto";
        holderElement.style.marginRight = "auto";
      } else if (-1 != align.toLowerCase().indexOf("right")) {
        holderElement.style.marginLeft = "auto";
      }
    }
    renderElement.appendChild(holderElement);
    this._holderElement = holderElement;
    this._holderWidth = holderWidth - 0;
    this._holderHeight = holderHeight - 0;

    //画笔
    var paper = new Raphael(holderElement, holderWidth, holderHeight);
    this._paper = paper;
  };

  //加载XML文件
  _p._loadXmlUrl = function (xmlUrl) {
    var xmlDocument = null;
    if (!window.DOMParser && window.ActiveXObject) {
      var xmlDomVersions = ["MSXML.2.DOMDocument.6.0", "MSXML.2.DOMDocument.3.0", "Microsoft.XMLDOM"];
      for (var i = 0, len = xmlDomVersions.length; i < len; i++) {
        try {
          xmlDocument = new ActiveXObject(xmlDomVersions[i]);
          xmlDocument.async = false;
          xmlDocument.load(xmlUrl);
          break;
        } catch (ex) {

        }
      }
    } else if (document.implementation && document.implementation.createDocument) {
      try {
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", xmlUrl, false);
        xmlhttp.send(null);
        xmlDocument = xmlhttp.responseXML;
      } catch (ex1) {
        try {
          xmlDocument = document.implementation.createDocument("", "", null);
          xmlDocument.async = false;
          xmlDocument.load(xmlUrl);
        } catch (ex2) {
          throw new Error(this._RESOURCE.BROWER_NOT_SUPPORT);
        }
      }
    } else {
      throw new Error(this._RESOURCE.BROWER_NOT_SUPPORT);
    }

    return xmlDocument;
  };

  //加载XML
  _p._loadXmlData = function (xmlData) {
    var xmlDocument = null;
    if (!window.DOMParser && window.ActiveXObject) { //IE
      var xmlDomVersions = ["MSXML.2.DOMDocument.6.0", "MSXML.2.DOMDocument.3.0", "Microsoft.XMLDOM"];
      for (var i = 0, len = xmlDomVersions.length; i < len; i++) {
        try {
          xmlDocument = new ActiveXObject(xmlDomVersions[i]);
          xmlDocument.async = false;
          xmlDocument.loadXML(xmlData);
          break;
        } catch (ex) {

        }
      }
    }
    return xmlDocument;
  };

  //获得小数位
  _p._getScientific = function (value, left) {
    var sci = 0;
    for (var i = 0; i < 100; i++) {
      var val = value / Math.pow(10, left + sci);
      if (10 <= val) {
        sci++;
      } else if (1 > val) {
        sci--;
      } else {
        break;
      }
    }
    return sci;
  };

  //计算数值
  _p._getFormatNumber = function (chart, value) {
    //ie has bug, so our charts don't support scientific notation
    //eg. 10000000000000000000000.0001's right scientific notation value is 1e+22
    //under ie8 this value is 1e+23, it's not right
    if (-1 !== (value + "").indexOf("e+")) {
      throw Error(this._RESOURCE.DATA_OUT_OF_RANGE);
    }
    var formatNumber = chart.formatNumber;
    var formatNumberScale = chart.formatNumberScale;
    var defaultNumberScale = chart.defaultNumberScale || "";
    var numberScaleUnit = chart.numberScaleUnit;
    var numberScaleValue = chart.numberScaleValue;
    var numberPrefix = chart.numberPrefix || "";
    var numberSuffix = chart.numberSuffix || "";
  //    var inThousandSeparator = chart.inThousandSeparator;
  //    var inDecimalSeparator = chart.inDecimalSeparator;
    var thousandSeparator = chart.thousandSeparator;
    var decimalSeparator = chart.decimalSeparator;
    var decimals = Math.floor(chart.decimals - 0);
    var forceDecimals = chart.forceDecimals;

    var posNegSign = 0 > value ? "-" : "";
    value = Math.abs(value);
    if (0 == value || -1 !== (value + "").indexOf("e-")) {    //too small
      var formatValue = value;
      var formatUnit = "";
      if (this._CONST.ENABLE === formatNumberScale) {
        formatUnit = defaultNumberScale;
      }
      return posNegSign + numberPrefix + formatValue + formatUnit + numberSuffix;
    }
    if (Math.pow(10, 0 - decimals) > value) {   //very small
      var pow = this._getScientific(value, 0);
      var formatUnit = "";
      if (this._CONST.ENABLE === formatNumberScale) {
        formatUnit = defaultNumberScale;
      }
      var formatValue = value.toFixed(decimals - pow);
      if (this._CONST.ENABLE !== forceDecimals) {
        formatValue = formatValue - 0 + "";
      }
      return posNegSign + numberPrefix + formatValue + formatUnit + numberSuffix;
    } else {
      var formatValue = value;
      var formatUnit = "";
      if (this._CONST.ENABLE === formatNumberScale) {
        var scaleValues = numberScaleValue.split(",");
        var scaleUnits = numberScaleUnit.split(",");
        var scaleLen = scaleValues.length < scaleUnits.length ?
          scaleValues.length : scaleUnits.length;
        var i = 0;
        for (; i < scaleLen; i++) {
          if ((scaleValues[i] - 0) > formatValue) {
            break;
          }
          formatValue = formatValue / (scaleValues[i] - 0);
        }
        if (0 !== i) {
          formatUnit = scaleUnits[i - 1];
        } else {
          formatUnit = defaultNumberScale;
        }
      }

      formatValue = formatValue.toFixed(decimals);
      if (this._CONST.ENABLE !== forceDecimals) {
        formatValue = formatValue - 0 + "";
      }

      var intStr = this._getIntegerStr(formatValue);
      var decStr = this._getDecimalStr(formatValue);
      if (this._CONST.ENABLE === formatNumber) {

        var intThousand = [];
        var len = intStr.length;
        while (3 < len) {
          intThousand[intThousand.length] = intStr.substring(len - 3, len);
          intStr = intStr.substring(0, len - 3);
          len -= 3;
        }
        intThousand[intThousand.length] = intStr;

        if (!decStr) {
          formatValue = intThousand.reverse().join(thousandSeparator);
        } else {
          formatValue = intThousand.reverse().join(thousandSeparator) + decimalSeparator + decStr;
        }
      }

      return posNegSign + numberPrefix + formatValue + formatUnit + numberSuffix;
    }
  };

  //获得整数值
  _p._getIntegerStr = function (value) {
    if (!value) {
      return "0";
    }
    var s = value + "";
    if (-1 !== s.indexOf("e-")) {
      return "0";
    }
    if (-1 !== s.indexOf("e+")) {
      throw Error(this._RESOURCE.DATA_OUT_OF_RANGE);
    }
    var index = s.indexOf(".");
    if (-1 !== index) {
      return s.substring(0, index);
    } else {
      return s;
    }
  };

  //获得小数值
  _p._getDecimalStr = function (value) {
    if (!value) {
      return "";
    }
    var s = value + "";
    if (-1 !== s.indexOf("e-")) {
      return "";
    }
    if (-1 !== s.indexOf("e+")) {
      throw Error(this._RESOURCE.DATA_OUT_OF_RANGE);
    }
    var index = s.indexOf(".");
    if (-1 !== index) {
      return s.substring(index + 1, s.length);
    } else {
      return "";
    }
  };

  //获得边框BBOX
  _p._getBorderBBox = function (chart) {
    //有计算过了，直接返回
    if ("undefined" !== typeof this._borderBBox) {
      return this._borderBBox;
    }
    var x = 0;
    var y = 0;
    var x2 = Math.floor(this._holderWidth);
    var y2 = Math.floor(this._holderHeight);

    if (Raphael.vml) {
      x -= this._CONST.VMLADJUST.LEFT - 0;
      y -= this._CONST.VMLADJUST.TOP - 0;
      x2 -= 2 * this._CONST.VMLADJUST.LEFT - 0;
      y2 -= 2 * this._CONST.VMLADJUST.TOP - 0;
    }

    return this._borderBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //初始化背景BBOX
  _p._getBgBBox = function (chart) {
    //有计算过了，直接返回
    if ("undefined" !== typeof this._bgBBox) {
      return this._bgBBox;
    }
    var borderBBox = this._getBorderBBox(chart);
    var showBorder = chart.showBorder;
    var borderThickness = this._CONST.ENABLE === showBorder ?
      Math.floor(chart.borderThickness - 0) : 0;
    var x = Math.floor(borderBBox.x + borderThickness);
    var y = Math.floor(borderBBox.y + borderThickness);
    var x2 = Math.floor(borderBBox.x2 - borderThickness);
    var y2 = Math.floor(borderBBox.y2 - borderThickness);

    return this._bgBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //初始化Legend BBOX
  _p._getLegendBBox = function (chart) {
    //有计算过了，直接返回
    if ("undefined" !== typeof this._legendBBox) {
      return this._legendBBox;
    }
    var showLegend = chart.showLegend;  //图例的位置很关键
    var legendPosition = chart.legendPosition;
    var borderBBox = this._getBorderBBox(chart);
    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;
    var series = [];
    if (this._CONST.LEGENDPOSITION.BOTTOM === legendPosition) { //图例在下面
      //x
      var chartLeftMargin = Math.floor(chart.chartLeftMargin - 0);
      var PYAxisNameWidth = 0;
      var PYAxisNamePadding = 0;
      var PYAxisName = chart.PYAxisName;
      if (PYAxisName) {
        PYAxisNameWidth = this._getYAxisNameWidth(chart, this._CONST.AXIS.PY);  //计算PYAxis的名称宽度，有缓存，别担心
        PYAxisNamePadding = Math.floor(chart.PYAxisNamePadding - 0);
      }
      var PYAxisLabelWidth = this._getYAxisLabelWidth(chart, this._CONST.AXIS.PY);    //计算PYAxis的标签宽度，有缓存，别担心
      var PYAxisLabelPadding = 0;
      if (0 < PYAxisLabelWidth) {
        PYAxisLabelPadding = Math.floor(chart.PYAxisLabelPadding - 0);
      }
      x = borderBBox.x +
        chartLeftMargin +
        PYAxisNameWidth +
        PYAxisNamePadding +
        PYAxisLabelWidth +
        PYAxisLabelPadding;

      //x2
      var chartRightMargin = Math.floor(chart.chartRightMargin - 0);
      var SYAxisNameWidth = 0;
      var SYAxisNamePadding = 0;
      var SYAxisName = chart.SYAxisName;
      if (SYAxisName) {
        SYAxisNameWidth = this._getYAxisNameWidth(chart, this._CONST.AXIS.SY);  //计算SYAxis的名称宽度，有缓存，别担心
        SYAxisNamePadding = Math.floor(chart.SYAxisNamePadding - 0);
      }
      var SYAxisLabelWidth = this._getYAxisLabelWidth(chart, this._CONST.AXIS.SY);    //计算SYAxis的标签宽度，有缓存，别担心
      var SYAxisLabelPadding = 0;
      if (0 < SYAxisLabelWidth) {
        SYAxisLabelPadding = Math.floor(chart.SYAxisLabelPadding - 0);
      }
      x2 = borderBBox.x2 -
        chartRightMargin -
        SYAxisNameWidth -
        SYAxisNamePadding -
        SYAxisLabelWidth -
        SYAxisLabelPadding;

      //y
      var chartBottomMargin = Math.floor(chart.chartBottomMargin - 0);
      var legendHeight = 0;
      if (this._CONST.ENABLE === showLegend) {    //确认展示图例的，因为图例在下面，需要计算高度
        var datasets = chart.dataset;
        if (datasets) {
          var legendTextPadding = Math.floor(chart.legendTextPadding - 0);
          var legendBorderThickness = Math.floor(chart.legendBorderThickness - 0);
          var legendBTOverPadding = Math.floor(chart.legendBTOverPadding - 0);
          var legendTextHeightMax = 0;
          for (var i = 0, ii = datasets.length; i < ii; i++) {
            var dataset = datasets[i];
            var seriesName = dataset.seriesName;
            var color = dataset.fillColor || this._CONST.COLOR.BLACK;
            var alpha = Math.floor(dataset.fillAlpha || "100" - 0) / 100;
            if (seriesName) {
              var legendTextWH = this._getTextWH(chart,
                this._CONST.STYLEOBJECT.LEGEND,
                seriesName,
                0,
                false);
              var legendTextHeight = Math.ceil(legendTextWH.height);
              legendTextHeightMax = legendTextHeight > legendTextHeightMax ? legendTextHeight : legendTextHeightMax;
              series[series.length] = {
                "name": seriesName,
                "color": color,
                "alpha": alpha,
                "width": legendTextWH.width,
                "height": legendTextWH.height
              }
            }
          }

          if (0 !== legendTextHeightMax) {
            legendHeight = legendTextHeightMax + 2 * (legendTextPadding > (legendBorderThickness + legendBTOverPadding) ?
                legendTextPadding : (legendBorderThickness + legendBTOverPadding));
          }
        }
      }

      y = borderBBox.y2 - chartBottomMargin - legendHeight;

      //y2
      y2 = borderBBox.y2 - chartBottomMargin;
    } else {
      //x
      var chartRightMargin = Math.floor(chart.chartRightMargin - 0);
      var lengendWidth = 0;
      var legendBorderThickness = Math.floor(chart.legendBorderThickness - 0);
      var legendBTOverPadding = Math.floor(chart.legendBTOverPadding - 0);
      if (this._CONST.ENABLE === showLegend) {
        var datasets = chart.dataset;
        if (datasets) {
          var legendTextPadding = Math.floor(chart.legendTextPadding - 0);
          var legendTextWidthMax = 0;
          for (var i = 0, ii = datasets.length; i < ii; i++) {
            var dataset = datasets[i];
            var seriesName = dataset.seriesName;
            var color = dataset.fillColor || this._CONST.COLOR.BLACK;
            var alpha = (Math.floor(dataset.fillAlpha || "100" - 0) / 100);
            if (seriesName) {
              var legendTextWH = this._getTextWH(chart,
                this._CONST.STYLEOBJECT.LEGEND,
                seriesName,
                0,
                false);
              var legendTextWidth = legendTextWH.width;
              legendTextWidthMax = legendTextWidth > legendTextWidthMax ?
                legendTextWidth : legendTextWidthMax;
              series[series.length] = {
                "name": seriesName,
                "color": color,
                "alpha": alpha,
                "width": legendTextWH.width,
                "height": legendTextWH.height
              }
            }
          }

          if (0 !== legendTextWidthMax) {
            var legendTextHeight = series[0].height;
            var padding = legendTextPadding > (legendBorderThickness + legendBTOverPadding) ?
              legendTextPadding : (legendBorderThickness + legendBTOverPadding);
            var legendLRPadding = padding + series[0].height * (1 - (this._CONST.LEGENDMARKSCALE - 0)) / 2;
            var legendMTPadding = Math.floor(chart.legendMTPadding - 0);
            lengendWidth = Math.ceil(legendTextWidthMax + legendTextHeight * (this._CONST.LEGENDMARKSCALE - 0) + legendMTPadding +
              2 * legendLRPadding);
            this._lengendWidth = lengendWidth;
          }
        }
      }

      x = borderBBox.x2 - chartRightMargin - lengendWidth;

      //x2
      x2 = borderBBox.x2 - chartRightMargin;

      //y
      var chartTopMargin = Math.floor(chart.chartTopMargin - 0);
      var captionHeight = 0;
      var captionPadding = 0;
      var caption = chart.caption;
      //计算主标题高度，别担心，有缓存
      if (caption) {
        var captionHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.CAPTION,
          caption,
          0,
          true).height);
        captionPadding = Math.floor(chart.captionPadding - 0);
      }
      var subCaptionHeight = 0;
      var subCaptionPadding = 0;
      var subCaption = chart.subCaption;
      if (subCaption) {
        var subCaptionHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.SUBCAPTION,
          subCaption,
          0,
          true).height);
        if (caption) {
          subCaptionPadding = Math.floor(chart.subCaptionPadding - 0);
        } else {
          captionPadding = Math.floor(chart.captionPadding - 0);
        }
      }
      y = borderBBox.y + chartTopMargin + captionHeight + captionPadding + subCaptionHeight + subCaptionPadding;

      //Y2
      var chartBottomMargin = Math.floor(chart.chartBottomMargin - 0);
      var xAxisNameHeight = 0;
      var xAxisNamePadding = 0;
      var xAxisName = chart.xAxisName;
      if (xAxisName) {
        xAxisNameHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.XAXISNAME,
          xAxisName,
          0,
          true).height);
        xAxisNamePadding = Math.floor(chart.xAxisNamePadding - 0);
      }
      var xAxisLabelHeight = 0;
      var xAxisLabelPadding = 0;
      var showXAxisLabel = chart.showXAxisLabel;
      if (this._CONST.ENABLE === showXAxisLabel) {
        xAxisLabelHeight = this._getXAxisLabelHeight(chart);
        xAxisLabelPadding = Math.floor(chart.xAxisLabelPadding - 0);
      }
      y2 = borderBBox.y2 - chartBottomMargin - xAxisNameHeight - xAxisNamePadding - xAxisLabelHeight - xAxisLabelPadding;
    }

    return this._legendBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y,
      "series": series
    };
  };

  //获得Y轴名称BBOX
  _p._getSYAxisNameBBox = function (chart) {
    //有计算过了，直接返回
    if ("undefined" !== typeof this._SYAxisNameBBox) {
      return this._SYAxisNameBBox;
    }
    var borderBBox = this._getBorderBBox(chart);
    var PYAxisNameBBox = this._getPYAxisNameBBox(chart);
    var legendPosition = chart.legendPosition;
    var chartRightMargin = Math.floor(chart.chartRightMargin - 0);
    var SYAxisNameWidth = this._getYAxisNameWidth(chart, this._CONST.AXIS.SY);
    var legendPadding = 0;
    var legendWidth = 0;
    if (this._CONST.LEGENDPOSITION.BOTTOM !== legendPosition) {
      legendWidth = this._getLegendBBox(chart).width;
      if (0 < legendWidth) {
        legendPadding = Math.floor(chart.legendPadding - 0);
      }
    }
    var x = borderBBox.x2 - chartRightMargin - legendPadding - legendWidth - SYAxisNameWidth;
    var x2 = x + SYAxisNameWidth;
    var y = PYAxisNameBBox.y;
    var y2 = PYAxisNameBBox.y2;
    return this._SYAxisNameBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };

  };

  //获得Y轴名称BBOX
  _p._getPYAxisNameBBox = function (chart) {
    //有计算过了，直接返回
    if ("undefined" !== typeof this._PYAxisNameBBox) {
      return this._PYAxisNameBBox;
    }
    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;
    var borderBBox = this._getBorderBBox(chart);
    var legendPosition = chart.legendPosition;
    var chartLeftMargin = Math.floor(chart.chartLeftMargin - 0);
    if (this._CONST.LEGENDPOSITION.BOTTOM === legendPosition) { //图例的位置很重要啊
      //x
      x = borderBBox.x + chartLeftMargin;
      //y
      var chartTopMargin = Math.floor(chart.chartTopMargin - 0);
      var captionHeight = 0;
      var captionPadding = 0;
      var caption = chart.caption;
      if (caption) {
        var captionHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.CAPTION,
          chart.caption,
          0,
          true).height);
        captionPadding = Math.floor(chart.captionPadding - 0);
      }
      var subCaptionHeight = 0;
      var subCaptionPadding = 0;
      var subCaption = chart.subCaption;
      if (subCaption) {
        var subCaptionHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.SUBCAPTION,
          subCaption,
          0,
          true).height);
        if (caption) {
          subCaptionPadding = Math.floor(chart.subCaptionPadding - 0);
        } else {
          captionPadding = Math.floor(chart.captionPadding - 0);
        }
      }
      y = borderBBox.y + chartTopMargin + captionHeight + captionPadding + subCaptionHeight + subCaptionPadding;
      //x2
      var PYAxisNameWidth = 0;
      var PYAxisName = chart.PYAxisName;
      if (PYAxisName) {
        PYAxisNameWidth = this._getYAxisNameWidth(chart, this._CONST.AXIS.PY);
      }
      x2 = x + PYAxisNameWidth;
      //y2
      var chartBottomMargin = Math.floor(chart.chartBottomMargin - 0);
      var legendPadding = 0;
      var legendHeight = 0;
      var showLegend = chart.showLegend;
      if (this._CONST.ENABLE === showLegend) {
        legendHeight = this._getLegendBBox(chart).height;
        if (0 < legendHeight) {
          legendPadding = Math.floor(chart.legendPadding - 0);
        }
      }

      var xAxisNameHeight = 0;
      var xAxisNamePadding = 0;
      var xAxisName = chart.xAxisName;
      if (xAxisName) {
        xAxisNameHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.XAXISNAME,
          xAxisName,
          0,
          true).height);
        xAxisNamePadding = Math.floor(chart.xAxisNamePadding - 0);
      }
      var xAxisLabelHeight = 0;
      var xAxisLabelPadding = 0;
      var showXAxisLabel = chart.showXAxisLabel;
      if (this._CONST.ENABLE === showXAxisLabel) {
        xAxisLabelHeight = this._getXAxisLabelHeight(chart);
        xAxisLabelPadding = Math.floor(chart.xAxisLabelPadding - 0);
      }
      y2 = borderBBox.y2 -
        chartBottomMargin -
        legendHeight -
        legendPadding -
        xAxisNameHeight -
        xAxisNamePadding -
        xAxisLabelHeight -
        xAxisLabelPadding;
    } else {
      //x
      x = borderBBox.x + chartLeftMargin;
      //y
      var legendBBox = this._getLegendBBox(chart);
      y = legendBBox.y;
      //x2
      var PYAxisNameWidth = 0;
      var PYAxisName = chart.PYAxisName;
      var PYAxisNameWidth = chart.PYAxisNameWidth;
      var rotatePYAxisName = chart.rotatePYAxisName;
      if (PYAxisName) {
        if (PYAxisNameWidth) {
          PYAxisNameWidth = chart.PYAxisNameWidth - 0;
        } else {
          var PYAxisNameWH = this._getTextWH(chart,
            this._CONST.STYLEOBJECT.PYAXISNAME,
            PYAxisName,
            0,
            true);
          PYAxisNameWidth = this._CONST.ENABLE === rotatePYAxisName ?    //PY名称是旋转显示
            PYAxisNameWH.height : PYAxisNameWH.width;
        }
      }
      x2 = x + PYAxisNameWidth;
      //y2
      y2 = legendBBox.y2;
    }

    return this._PYAxisNameBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得数据标签BBOX
  _p._getPYAxisLabelBBox = function (chart) {
    //计算过了，直接返回
    if ("undefined" !== typeof this._PYAxisLabelBBox) {
      return this._PYAxisLabelBBox;
    }
    var PYAxisLabelWidth = this._getYAxisLabelWidth(chart, this._CONST.AXIS.PY);
    var showPYAxisLabel = chart.showPYAxisLabel;
    var PYAxisNameBBox = this._getPYAxisNameBBox(chart);
    var borderBBox = this._getBorderBBox(chart);
    var chartLeftMargin = Math.floor(chart.chartLeftMargin - 0);
    var PYAxisNameWidth = 0;
    var PYAxisNamePadding = 0;
    var PYAxisName = chart.PYAxisName;
    if (PYAxisName) {
      PYAxisNameWidth = PYAxisNameBBox.width;
      PYAxisNamePadding = Math.floor(chart.PYAxisNamePadding - 0);
    }
    var x = borderBBox.x + chartLeftMargin + PYAxisNameWidth + PYAxisNamePadding;
    var y = PYAxisNameBBox.y;
    var x2 = x + PYAxisLabelWidth;
    var y2 = PYAxisNameBBox.y2;

    return this._PYAxisLabelBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得SY轴标签BBOX
  _p._getSYAxisLabelBBox = function (chart) {
    if ("undefined" !== typeof this._SYAxisLabelBBox) {
      return this._SYAxisLabelBBox;
    }
    var SYAxisLabelWidth = this._getYAxisLabelWidth(chart, this._CONST.AXIS.SY);
    var showSYAxisLabel = chart.showSYAxisLabel;
    var SYAxisNameBBox = this._getSYAxisNameBBox(chart);
    var borderBBox = this._getBorderBBox(chart);
    var chartRightMargin = Math.floor(chart.chartRightMargin - 0);
    var SYAxisNameWidth = 0;
    var SYAxisNamePadding = 0;
    var SYAxisName = chart.SYAxisName;
    if (SYAxisName) {
      SYAxisNameWidth = SYAxisNameBBox.width;
      SYAxisNamePadding = Math.floor(chart.SYAxisNamePadding - 0);
    }
    var legendPadding = 0;
    var legendWidth = 0;
    var legendPosition = chart.legendPosition;
    if (this._CONST.LEGENDPOSITION.BOTTOM !== legendPosition) {
      legendWidth = this._getLegendBBox(chart).width;
      if (0 < legendWidth) {
        legendPadding = Math.floor(chart.legendPadding - 0);
      }
    }
    var x = borderBBox.x2 - chartRightMargin -
      legendPadding - legendWidth -
      SYAxisNameWidth - SYAxisNamePadding -
      SYAxisLabelWidth;
    var x2 = x + SYAxisLabelWidth;
    var y = SYAxisNameBBox.y;
    var y2 = SYAxisNameBBox.y2;
    return this._SYAxisLabelBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得标题BBOX
  _p._getCaptionBBox = function (chart) {
    if ("undefined" !== typeof this._captionBBox) {
      return this._captionBBox;
    }
    var legendPosition = chart.legendPosition;
    var legendBBox = this._getLegendBBox(chart);
    var borderBBox = this._getBorderBBox(chart);
    var showLegend = chart.showLegend;
    var captionHeight = Math.ceil(this._getTextWH(chart,
      this._CONST.STYLEOBJECT.CAPTION,
      chart.caption,
      0,
      true).height);
    var chartTopMargin = Math.floor(chart.chartTopMargin - 0);
    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;
    if (this._CONST.LEGENDPOSITION.BOTTOM === legendPosition) {
      x = legendBBox.x;
      y = borderBBox.y + chartTopMargin;
      x2 = legendBBox.x2;
      y2 = y + captionHeight;
    } else {
      //x
      var chartLeftMargin = Math.floor(chart.chartLeftMargin - 0);
      var PYAxisNameWidth = 0;
      var PYAxisNamePadding = 0;
      var PYAxisName = chart.PYAxisName;
      if (PYAxisName) {
        var PYAxisNameBBox = this._getPYAxisNameBBox(chart);
        PYAxisNameWidth = PYAxisNameBBox.width;
        PYAxisNamePadding = Math.floor(chart.PYAxisNamePadding - 0);
      }
      var PYAxisLabelPadding = 0;
      var PYAxisLabelWidth = this._getPYAxisLabelBBox(chart).width;
      if (0 < PYAxisLabelWidth) {
        PYAxisLabelPadding = Math.floor(chart.PYAxisLabelPadding - 0);
      }

      x = borderBBox.x +
        chartLeftMargin +
        PYAxisNameWidth +
        PYAxisNamePadding +
        PYAxisLabelWidth +
        PYAxisLabelPadding;

      //y
      y = borderBBox.y + chartTopMargin;
      //x2
      var borderBBox = this._getBorderBBox(chart);
      var chartRightMargin = Math.floor(chart.chartRightMargin - 0);
      var legendWidth = legendBBox.width;
      var legendPadding = 0;
      if (0 < legendWidth) {
        legendPadding = Math.floor(chart.legendPadding - 0);
      }
      var SYAxisNameWidth = 0;
      var SYAxisNamePadding = 0;
      var SYAxisName = chart.SYAxisName;
      if (SYAxisName) {
        SYAxisNameWidth = this._getSYAxisNameBBox(chart).width;
        SYAxisNamePadding = Math.floor(chart.SYAxisNamePadding - 0);
      }
      var SYAxisLabelWidth = this._getSYAxisLabelBBox(chart).width;
      var SYAxisLabelPadding = 0;
      if (0 < SYAxisLabelWidth) {
        SYAxisLabelPadding = Math.floor(chart.SYAxisLabelPadding) - 0;
      }
      x2 = borderBBox.x2 - chartRightMargin -
        legendWidth - legendPadding -
        SYAxisNameWidth - SYAxisNamePadding -
        SYAxisLabelWidth - SYAxisLabelPadding;

      //y2
      y2 = y + captionHeight;
    }
    ;

    return this._captionBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得子标题BBOX
  _p._getSubCaptionBBox = function (chart) {
    if ("undefined" !== typeof this._subCaptionBBox) {
      return this._subCaptionBBox;
    }
    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;
    var caption = chart.caption;
    var subCaption = chart.subCaption;
    var subCaptionPadding = 0;
    var chartTopMargin = Math.floor(chart.chartTopMargin - 0);
    var captionBBox = this._getCaptionBBox(chart);
    var borderBBox = this._getBorderBBox(chart);
    var subCaptionHeight = Math.ceil(this._getTextWH(chart,
      this._CONST.STYLEOBJECT.SUBCAPTION,
      subCaption,
      0,
      true).height);
    var captionHeight = 0;
    if (caption) {
      captionHeight = captionBBox.height;
      subCaptionPadding = Math.floor(chart.subCaptionPadding - 0);
    }
    x = Math.floor(captionBBox.x);
    y = Math.floor(borderBBox.y + chartTopMargin + captionHeight + subCaptionPadding);
    x2 = Math.floor(captionBBox.x2);
    y2 = Math.floor(y + subCaptionHeight);

    return this._subCaptionBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得X轴名称BBOX
  _p._getXAxisNameBBox = function (chart) {
    if ("undefined" !== typeof this._xAxisNameBBox) {
      return this._xAxisNameBBox;
    }

    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;
    var legendPosition = chart.legendPosition;
    var borderBBox = this._getBorderBBox(chart);
    var subCaptionBBox = this._getSubCaptionBBox(chart);
    var xAxisNameHeight = Math.ceil(this._getTextWH(chart,
      this._CONST.STYLEOBJECT.XAXISNAME,
      chart.xAxisName,
      0,
      true).height);
    if (this._CONST.LEGENDPOSITION.BOTTOM === legendPosition) {
      //x
      x = subCaptionBBox.x;
      //y
      var chartBottomMargin = Math.floor(chart.chartBottomMargin - 0);
      var legendHeight = this._getLegendBBox(chart).height;
      var legendPadding = 0;
      if (0 < legendHeight) {
        legendPadding = Math.floor(chart.legendPadding - 0);
      }

      y = borderBBox.y2 - chartBottomMargin - legendHeight - legendPadding - xAxisNameHeight;
      //x2
      x2 = subCaptionBBox.x2;
      //y2
      y2 = y + xAxisNameHeight;
    } else {
      //x
      x = subCaptionBBox.x;
      //y
      var chartBottomMargin = Math.floor(chart.chartBottomMargin - 0);
      y = borderBBox.y2 - chartBottomMargin - xAxisNameHeight;
      //x2
      x2 = subCaptionBBox.x2;
      //y2
      y2 = y + xAxisNameHeight;
    }
    return this._xAxisNameBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得Y轴名称宽度
  _p._getYAxisNameWidth = function (chart, parentYAxis) {
    var yAxisNameWidth = 0;
    var yAxisName = null;
    var rotateYAxisName = null;
    var styleObject = null;
    if (this._CONST.AXIS.PY === parentYAxis) {
      if ("undefined" !== typeof this._PYAxisNameWidth) {
        return this._PYAxisNameWidth;
      }
      yAxisName = chart.PYAxisName;
      rotateYAxisName = chart.rotatePYAxisName;
      styleObject = this._CONST.STYLEOBJECT.PYAXISNAME;
    } else {
      if ("undefined" !== typeof this._SYAxisNameWidth) {
        return this._SYAxisNameWidth;
      }
      yAxisName = chart.SYAxisName;
      rotateYAxisName = chart.rotateSYAxisName;
      styleObject = this._CONST.STYLEOBJECT.SYAXISNAME;
    }

    if (this._CONST.AXIS.PY === parentYAxis && chart.PYAxisNameWidth) {
      yAxisNameWidth = chart.PYAxisNameWidth - 0;
    } else if (this._CONST.AXIS.SY === parentYAxis && chart.SYAxisNameWidth) {
      yAxisNameWidth = chart.SYAxisNameWidth - 0;
    } else {
      if (yAxisName) {
        var yAxisNameWH = this._getTextWH(chart,
          styleObject,
          yAxisName,
          0,
          false);
        yAxisNameWidth = this._CONST.ENABLE === rotateYAxisName ?
          yAxisNameWH.height : yAxisNameWH.width;
      }
    }

    if (this._CONST.AXIS.PY === parentYAxis) {
      return this._PYAxisNameWidth = yAxisNameWidth;
    } else {
      return this._SYAxisNameWidth = yAxisNameWidth;
    }
  };

  //获得Y轴标签宽度
  _p._getYAxisLabelWidth = function (chart, parentYAxis) {
    var yAxisLabelWidth = 0;
    var showYAxisLabels = null;
    var axiseset = null;
    if (this._CONST.AXIS.PY === parentYAxis) {
      if ("undefined" !== typeof this._PYAxisLabelWidth) {
        return this._PYAxisLabelWidth;
      }
      showYAxisLabels = chart.showPYAxisLabel;

      if (this._CONST.ENABLE === showYAxisLabels) {
        if (this._CONST.ENABLE === chart.rotateXY) {
          axiseset = chart.axises.xAxiseset;
        } else {
          axiseset = chart.axises.PYAxiseset;
        }
        styleObject = this._CONST.STYLEOBJECT.PYAXISLABEL;
      }
    } else {
      if ("undefined" !== typeof this._SYAxisLabelWidth) {
        return this._SYAxisLabelWidth;
      }
      showYAxisLabels = chart.showSYAxisLabel;
      if (this._CONST.ENABLE === showYAxisLabels) {
        axiseset = chart.axises.SYAxiseset;
        styleObject = this._CONST.STYLEOBJECT.SYAXISLABEL;
      }
    }

    if (this._CONST.ENABLE === showYAxisLabels && axiseset) {
      for (var i = 0, ii = axiseset.length; i < ii; i++) {
        var label = axiseset[i].label || "";
        var width = this._getTextWH(chart,
          styleObject,
          label,
          0,
          false).width;
        yAxisLabelWidth = width > yAxisLabelWidth ? width : yAxisLabelWidth;
      }
    }

    var trendLines = null;
    var styleObject = null;
    if (this._CONST.ENABLE === chart.rotateXY) {
      trendLines = chart.vTrendlines;
      styleObject = this._CONST.STYLEOBJECT.VTRENDLABEL;
    } else {
      trendLines = chart.hTrendlines;
      styleObject = this._CONST.STYLEOBJECT.HTRENDLABEL;
    }

    if (trendLines) {
      var lines = trendLines.line;
      if (lines) {
        for (var i = 0, ii = lines.length; i < ii; i++) {
          var line = lines[i];
          if (parentYAxis !== line.parentYAxis) {
            continue;
          }
          var label = line.displayValue;
          if (!label) {
            continue;
          }
          var width = this._getTextWH(chart,
            styleObject,
            label,
            0,
            false).width;
          yAxisLabelWidth = width > yAxisLabelWidth ? width : yAxisLabelWidth;
        }
      }
    }

    if (this._CONST.AXIS.PY === parentYAxis) {
      return this._PYAxisLabelWidth = yAxisLabelWidth;
    } else {
      return this._SYAxisLabelWidth = yAxisLabelWidth;
    }
  };

  //获得Y轴标签高度
  _p._getXAxisLabelHeight = function (chart) {
    if ("undefined" !== typeof this._xAxisLabelHeight) {
      return this._xAxisLabelHeight;
    }
    var dataLabels = [];
    var showXAxisLabel = chart.showXAxisLabel;
    var rotateXAxisLabel = chart.rotateXAxisLabel;
    var xAxisLabelDisplay = this._CONST.ENABLE === rotateXAxisLabel ?
      this._CONST.LABELDISPLAY.ROTATE : chart.xAxisLabelDisplay;
    var categories = "undefined" !== typeof chart.categories ?
      chart.categories.category : null;
    //   var subCaptionBBox = this._getSubCaptionBBox(chart);
    var xAxisLabelHeight = 0;
    if (this._CONST.ENABLE === showXAxisLabel && categories) {
      var lineHeight = this._getTextWH(chart,
        this._CONST.STYLEOBJECT.XAXISLABEL,
        "0",
        0,
        false).height;
      var perWidth = 0;
      if (this._CONST.LABELDISPLAY.WRAP === xAxisLabelDisplay) {
        var legendPosition = chart.legendPosition;
        var borderBBox = this._getBorderBBox(chart);
        var captionHeight = Math.ceil(this._getTextWH(chart,
          this._CONST.STYLEOBJECT.CAPTION,
          chart.caption,
          0,
          true).height);
        if (this._CONST.LEGENDPOSITION.BOTTOM === legendPosition) {
          var legendBBox = this._getLegendBBox(chart);
          perWidth = (legendBBox.x2 - legendBBox.x) / categories.length;
        } else {
          //x
          var chartLeftMargin = Math.floor(chart.chartLeftMargin - 0);
          var PYAxisNameWidth = 0;
          var PYAxisNamePadding = 0;
          var PYAxisName = chart.PYAxisName;
          var rotatePYAxisName = chart.rotatePYAxisName;
          if (PYAxisName) {
            if (chart.PYAxisNameWidth) {
              PYAxisNameWidth = chart.PYAxisNameWidth - 0;
            } else {
              var PYAxisNameWH = this._getTextWH(chart,
                this._CONST.STYLEOBJECT.PYAXISNAME,
                PYAxisName,
                0,
                true);
              PYAxisNameWidth = this._CONST.ENABLE === rotatePYAxisName ?
                PYAxisNameWH.height : PYAxisNameWH.width;
            }
            PYAxisNamePadding = Math.floor(chart.PYAxisNamePadding - 0);
          }
          var PYAxisLabelWidth = this._getYAxisLabelWidth(chart, this._CONST.AXIS.PY);
          var PYAxisLabelPadding = 0;
          if (0 < PYAxisLabelWidth) {
            PYAxisLabelPadding = Math.floor(chart.PYAxisLabelPadding - 0);
          }
          var x = borderBBox.x + chartLeftMargin + PYAxisNameWidth + PYAxisNamePadding + PYAxisLabelWidth + PYAxisLabelPadding;

          //x2
          var chartRightMargin = Math.floor(chart.chartRightMargin - 0);
          var lengendWidth = "undefined" === typeof this._lengendWidth ? 0 : this._lengendWidth; //Sorry, here i use global variable to fix this
          var legendPadding = 0;
          if (0 < lengendWidth) {
            legendPadding = Math.floor(chart.legendPadding - 0);
          }
          var x2 = borderBBox.x2 - chartRightMargin - lengendWidth - legendPadding;
          perWidth = (x2 - x) / categories.length;
        }
      }

      //只取前三个，提高判断速度
      for (var i = 0, ii = categories.length; i < ii; i++) {
        dataLabels[dataLabels.length] = categories[i].label || "";
      }
      for (var i = 0, ii = dataLabels.length - 1; i < ii; i++) {
        for (var j = 1, jj = dataLabels.length; j < jj; j++) {
          var curLabel = dataLabels[i] || "";
          var nextLabel = dataLabels[j] || "";
          if (nextLabel.length > curLabel.length) {
            dataLabels[i] = nextLabel;
            dataLabels[j] = curLabel;
          }
        }
      }
      if (3 < dataLabels.length) {
        dataLabels.length = 3;
      }
      for (var i = 0, ii = dataLabels.length; i < ii; i++) {
        var label = dataLabels[i];
        if (this._CONST.LABELDISPLAY.NONE === xAxisLabelDisplay) {
          xAxisLabelHeight = lineHeight;
          break;
        } else if (this._CONST.LABELDISPLAY.STAGGER === xAxisLabelDisplay) {
          var xAxisLabelStaggerLine = Math.floor(chart.xAxisLabelStaggerLine - 0);
          //     xAxisLabelStaggerLine = xAxisLabelStaggerLine < ii ? xAxisLabelStaggerLine : ii;
          xAxisLabelHeight = xAxisLabelStaggerLine * lineHeight;
          break;
        } else if (this._CONST.LABELDISPLAY.WRAP === xAxisLabelDisplay) {
          var hx = 0 - (this._holderWidth - 0) * 2;
          var hy = 0 - (this._holderHeight - 0) * 2;
          var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.XAXISLABEL);
          var labelElement = this._createText({
            "text": label,
            "cx": hx,
            "cy": hy,
            "width": perWidth * 0.9,
            "height": lineHeight,
            "line-height": lineHeight,
            "font-family": fontStyle.font,
            "font-size": fontStyle.size,
            "font-color": fontStyle.color,
            "font-weight": fontStyle.bold,
            "word-break": this._CONST.ENABLE
          });
          var labelHeight = (labelElement.clientHeight - 0) *
            ("undefined" === typeof labelElement.transformScale ? 1 : (labelElement.transformScale - 0) * 1.04);
          xAxisLabelHeight = labelHeight > xAxisLabelHeight ? labelHeight : xAxisLabelHeight;
        } else if (this._CONST.LABELDISPLAY.ROTATE === xAxisLabelDisplay) {
          var labelHeight = this._getTextWH(chart,
            this._CONST.STYLEOBJECT.XAXISLABEL,
            label,
            0,
            false).width;
          var slantXAxisLabel = chart.slantXAxisLabel;
          if (this._CONST.ENABLE === slantXAxisLabel) {
            labelHeight = (labelHeight + lineHeight) / Math.sqrt(2);
          }
          xAxisLabelHeight = labelHeight > xAxisLabelHeight ? labelHeight : xAxisLabelHeight;
        }
      }
    }

    return this._xAxisLabelHeight = xAxisLabelHeight;
  };

  //获得数据标签BBOX
  _p._getXAxisLabelBBox = function (chart) {
    if ("undefined" !== typeof this._xAxisLabelBBox) {
      return this._xAxisLabelBBox;
    }

    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;

    var subCaptionBBox = this._getSubCaptionBBox(chart);
    var xAxisLabelHeight = this._getXAxisLabelHeight(chart);
    var xAxisLabelPadding = Math.floor(chart.xAxisLabelPadding - 0);
    var PYAxisLabelBBox = this._getPYAxisLabelBBox(chart);

    x = subCaptionBBox.x;
    y = PYAxisLabelBBox.y2 + xAxisLabelPadding;
    x2 = subCaptionBBox.x2;
    y2 = y + xAxisLabelHeight;

    return this._xAxisLabelBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //获得网格BBOX
  _p._getCanvasBBox = function (chart) {
    if ("undefined" !== typeof this._canvasBBox) {
      return this._canvasBBox;
    }
    var subCaptionBBox = this._getSubCaptionBBox(chart);
    var PYAxisLabelBBox = this._getPYAxisLabelBBox(chart);
    var x = subCaptionBBox.x;
    var y = PYAxisLabelBBox.y;
    var x2 = subCaptionBBox.x2;
    var y2 = PYAxisLabelBBox.y2;
    return this._canvasBBox = {
      "x": x,
      "y": y,
      "x2": x2,
      "y2": y2,
      "width": x2 - x,
      "height": y2 - y
    };
  };

  //画BBOX，测试时使用
  _p._drawBBox = function (bBox) {
    //this._paper.rect(bBox.x, bBox.y, bBox.width, bBox.height).attr({"stroke-width" : 1});
  };

  //获得文字高宽
  _p._getTextWH = function (chart, styleObject, text, angle, cache) {
    if ("undefined" === typeof this._textWH) {
      this._textWH = {};
    }

    if ("undefined" !== typeof this._textWH[styleObject] && cache) {
      return this._textWH[styleObject];
    }

    var width = 0;
    var height = 0;
    if (text) {
      var hx = 0 - (this._holderWidth - 0) * 2;
      var hy = 0 - (this._holderHeight - 0) * 2;
      var fontStyle = this._getFontStyle(chart, styleObject);
      var element = this._createText({
        "text": text,
        "cx": hx,
        "cy": hy,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "angle": angle
      });
      var width = 0;
      var height = 0;
      if (this._CONST.TEXTELEMENTTYPE.HTML === element.elementType) {
        width = element.clientWidth;
        height = element.clientHeight;

        if ("undefined" !== typeof element.transformScale) {
          width = Math.ceil(width * (element.transformScale - 0) * 1.04);
          height = Math.ceil(height * (element.transformScale - 0));
          if (270 === angle) {
            var tmp = width;
            var width = height;
            var height = tmp;
          }
        }
        element.parentElement.removeChild(element);
      } else {
        var bBox = element.getBBox();
        width = bBox.width;
        height = bBox.height;
        element.remove();
      }
    }

    return this._textWH[styleObject] = {
      "width": width,
      "height": height
    };

  };

  //展示提示信息
  _p._showToolTip = function (chart, toolTip, cx, cy) {
    if (!toolTip) {
      return;
    }
    if (!this._toolTipElement) {
      var toolTipBgColor = chart.toolTipBgColor;
      var toolTipBorderColor = chart.toolTipBorderColor;
      var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.TOOLTIP);
      var hx = 0 - (this._holderWidth - 0) * 2;
      var hy = 0 - (this._holderHeight - 0) * 2;
      var padding = "2px 4px 2px 4px";
      this._toolTipElement = this._createText({
        "text": toolTip,
        "cx": hx,
        "cy": hy,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "padding": padding,
        "background-color": toolTipBgColor,
        "border": "1px solid " + this._getColor(toolTipBorderColor),
        "angle": 0
      });
    }

    this._toolTipElement.style.left = Math.floor(cx - this._toolTipElement.clientWidth / 2) + "px";
    this._toolTipElement.style.top = Math.floor(cy - this._toolTipElement.clientHeight / 2) + "px";
  };

  //隐藏提示信息
  _p._removeToolTip = function () {
    if (this._toolTipElement) {
      this._toolTipElement.parentElement.removeChild(this._toolTipElement);
    }
    this._toolTipElement = null;
  };

  //创建事件处理函数
  _p._createEventHandler = function (chart) {
    var self = this;
    //采用事件委托方式
    this._holderElement.onclick = function (event) {
      self._clickHandler(chart, event)
    };
    this._holderElement.onmouseover = function (event) {
      self._mouseoverHandler(chart, event)
    };
    this._holderElement.onmousemove = function (event) {
      self._mousemoveHandler(chart, event)
    };
    this._holderElement.onmouseout = function (event) {
      self._mouseoutHandler(chart, event)
    };
  };

  //创建背景透明色
  _p._createTransparent = function (chart) {
    if (this._CONST.ENABLE !== chart.transparent) {
      this._holderElement.style.backgroundColor = "#FFFFFF";
    }
  };

  //创建边框
  _p._createBorder = function (chart) {
    var showBorder = chart.showBorder;
    if (this._CONST.ENABLE != showBorder) {
      return;
    }
    var borderThickness = Math.floor(chart.borderThickness - 0);
    if (0 === borderThickness) {
      return;
    }
    var borderAlpha = (chart.borderAlpha - 0) / 100;
    if (0 === borderAlpha) {
      return;
    }
    var borderColor = chart.borderColor;
    if (!borderColor) {
      return;
    }
    var borderRadius = Math.floor(chart.borderRadius - 0);
    var borderBBox = this._getBorderBBox(chart);
    if (1 == borderThickness) {
      var x = borderBBox.x + borderThickness / 2;
      var y = borderBBox.y + borderThickness / 2;
      var x2 = borderBBox.x2 - borderThickness / 2;
      var y2 = borderBBox.y2 - borderThickness / 2;
      if (Raphael.vml) {
        x -= 0.5;
        y -= 0.5;
        x2 += 0.5;
        y2 += 0.5;
      }
      this._paper.rect(x,
        y,
        x2 - x,
        y2 - y,
        borderThickness)
        .attr({
          "stroke": this._getColor(borderColor),
          "stroke-width": borderThickness,
          "opacity": borderAlpha
        });
    } else {

      var t = borderThickness / 2;
      if (Raphael.vml) {
        t -= 0.5;
      }

      var x = borderBBox.x;
      var y = borderBBox.y;
      var x2 = borderBBox.x2;
      var y2 = borderBBox.y2;

      var vx0 = x + 2 * t + 10;
      var vy0 = y + t;

      var vx1 = x2 - 2 * t;
      var vy1 = vy0;

      var vx2 = x2 - t;
      var vy2 = y + 2 * t;

      var vx3 = vx2;
      var vy3 = y2 - 2 * t;

      var vx4 = vx1;
      var vy4 = y2 - t;

      var vx5 = x + 2 * t;
      var vy5 = vy4;

      var vx6 = x + t;
      var vy6 = vy3;

      var vx7 = vx6;
      var vy7 = vy2;

      var vx8 = x + 2 * t;
      var vy8 = y + t;

      var r = borderThickness / 2;
      var path = [];
      path[path.length + 1] = ["M", vx0, vy0];
      path[path.length + 1] = ["L", vx1, vy1];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, vx2, vy2];
      path[path.length + 1] = ["L", vx3, vy3];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, vx4, vy4];
      path[path.length + 1] = ["L", vx5, vy5];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, vx6, vy6];
      path[path.length + 1] = ["L", vx7, vy7];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, vx8, vy8];
      path[path.length + 1] = ["Z"];
      this._paper.path(path)
        .attr({
          "stroke": this._getColor(borderColor),
          "stroke-width": borderThickness,
          "opacity": borderAlpha
        });
    }
  };

  //如果接近0，返回0，防止科学计数法
  _p._ifZero = function (value) {
    if (0.001 > Math.abs(value)) {
      return 0
    }

    return value;
  };

  //创建背景
  _p._createBg = function (chart) {
    //背景图片
    var bgImage = chart.bgImage;
    var bgImageAlpha = Math.floor(chart.bgImageAlpha - 0) / 100;
    if (bgImage && 0 !== bgImageAlpha) {
      var bgBBox = this._getBgBBox(chart);
      var x = bgBBox.x;
      var y = bgBBox.y;
      var x2 = bgBBox.x2;
      var y2 = bgBBox.y2;
      var width = bgBBox.width;
      var height = bgBBox.height;
      if (Raphael.vml) {
        x -= 0.5;
        y -= 0.5;
        x2 += 0.5;
        y2 += 0.5;
      }
      this._paper.image(bgImage, x, y, x2 - x, y2 - y)
        .attr({
          "stroke": "none",
          "stroke-width": 0,
          "opacity": bgImageAlpha
        });
    }

    //背景颜色
    var bgColor = chart.bgColor;
    var bgAlpha = Math.floor(chart.bgAlpha.split(",")[0] - 0) / 100;
    //   if (bgAlpha && 0 !== bgAlpha) {
    var bgBBox = this._getBgBBox(chart);
    var x = bgBBox.x;
    var y = bgBBox.y;
    var x2 = bgBBox.x2;
    var y2 = bgBBox.y2;
    var width = bgBBox.width;
    var height = bgBBox.height;
    var bgColors = bgColor.split(",");
    var bgAngle = (360 - (chart.bgAngle - 0)) % 360;
    var fill = null;

    if (Raphael.vml) {
      x -= 0.5;
      y -= 0.5;
      x2 += 0.5;
      y2 += 0.5;
    }
    var path = [];
    path[path.length] = ["M", x, y];
    path[path.length] = ["L", x2, y];
    path[path.length] = ["L", x2, y2];
    path[path.length] = ["L", x, y2];
    path[path.length] = ["Z"];

    if (1 === bgColors.length) {
      fill = this._getColor(bgColors[0]);
      this._paper.path(path)
        .attr({
          "stroke": "none",
          "stroke-width": 0,
          "fill": fill,
          "fill-opacity": bgAlpha
        });
    } else {
      if (Raphael.svg) {
        fill = bgAngle + "-" + this._getColor(bgColors[0]) + "-" + this._getColor(bgColors[1]);
      } else {
        bgAngle = (bgAngle + 180) % 360;
        fill = bgAngle + "-" + this._getColor(bgColors[1]) + "-" + this._getColor(bgColors[0]);
      }
      this._paper.path(path)
        .attr({
          "stroke": "none",
          "stroke-width": 0,
          "fill": fill,
          "opacity": bgAlpha
        });
    }
    //  }
  };

  //是否为偶数
  _p._isOdd = function (value) {
    return 0 != value % 2 ? true : false;
  };

  //创建图例
  _p._createLegend = function (chart) {
    var showLegend = chart.showLegend;
    if (this._CONST.ENABLE !== showLegend) {
      return;
    }
    var legendBBox = this._getLegendBBox(chart);
    var x = legendBBox.x;
    var y = legendBBox.y;
    var x2 = legendBBox.x2;
    var y2 = legendBBox.y2;
    var series = legendBBox.series;
    if (!series || 0 === series.length) {
      return;
    }
    var legendPosition = chart.legendPosition;
    var legendShadow = chart.legendShadow;
    var legendTextPadding = Math.floor(chart.legendTextPadding - 0);
    var legendBgColor = chart.legendBgColor;
    var legendBgAlpha = Math.floor(chart.legendBgAlpha - 0) / 100;
    var legendBorderColor = chart.legendBorderColor;
    var legendBorderAlpha = Math.floor(chart.legendBorderAlpha - 0) / 100;
    var legendBorderThickness = Math.floor(chart.legendBorderThickness - 0);
    var legendShadow = chart.legendShadow;
    var legendBTOverPadding = Math.floor(chart.legendBTOverPadding - 0);
    if (this._CONST.LEGENDPOSITION.BOTTOM === legendPosition) { //Show at bottom
      var legendMTPadding = Math.floor(chart.legendMTPadding - 0);
      var legendTMPadding = Math.floor(chart.legendTMPadding - 0);
      var legendBgHeight = legendBBox.height;
      var padding = legendTextPadding > (legendBorderThickness + legendBTOverPadding) ?
        legendTextPadding : (legendBorderThickness + legendBTOverPadding);
      var legendLRPadding = padding + series[0].height * (1 - (this._CONST.LEGENDMARKSCALE - 0)) / 2;
      var legendBgWidth = legendLRPadding;
      for (var i = 0, ii = series.length; i < ii; i++) {
        legendBgWidth += Math.ceil(series[i].height * (this._CONST.LEGENDMARKSCALE - 0)) + legendMTPadding + series[i].width;
        if (ii - 1 != i) {
          legendBgWidth += legendTMPadding;
        }
      }
      legendBgWidth += legendLRPadding;
      legendBgWidth = Math.ceil(legendBgWidth);

      //Background
      if (this._CONST.ENABLE === legendShadow) {
        if (Raphael.vml) {
          this._createRect((x + x2) / 2,
            (y + y2) / 2,
            legendBgWidth + legendBorderThickness,
            legendBgHeight + legendBorderThickness,
            0)
            .attr({
              "stroke-width": 0,
              "fill": this._getColor(this._CONST.SHADOW.COLOR),
              "fill-opacity": (this._CONST.SHADOW.OPACITY - 0)
            })
            .blur(this._CONST.SHADOW.OFFSET - 0);
        } else if (!this._browser.browser.safari) { //safari does not support svg filter
          this._createRect((x + x2) / 2 + (this._CONST.SHADOW.OPACITY - 0),
            (y + y2) / 2 + (this._CONST.SHADOW.OPACITY - 0),
            legendBgWidth + legendBorderThickness,
            legendBgHeight + legendBorderThickness,
            0)
            .attr({
              "stroke-width": 0,
              "fill": this._getColor(this._CONST.SHADOW.COLOR),
              "fill-opacity": (this._CONST.SHADOW.OPACITY - 0)
            })
            .blur(this._CONST.SHADOW.OFFSET - 0);
        }
      }

      this._createRect((x + x2) / 2,
        (y + y2) / 2,
        legendBgWidth + legendBorderThickness,
        legendBgHeight + legendBorderThickness,
        legendBorderThickness)
        .attr({
          "stroke": this._getColor(legendBorderColor),
          "stroke-width": legendBorderThickness,
          "stroke-opacity": legendBorderAlpha,
          "fill": this._getColor(legendBgColor),
          "fill-opacity": legendBgAlpha
        });

      //绘制图例
      var tsx = Math.floor((x + x2) / 2 - legendBgWidth / 2) + legendLRPadding;
      var tsy = Math.floor((y + y2) / 2 - legendBgHeight / 2);

      for (var i = 0, ii = series.length; i < ii; i++) {
        var serie = series[i];
        var name = serie.name;
        var color = serie.color;
        var alpha = serie.alpha;
        var width = serie.width;
        var height = serie.height;

        //Draw Mark
        var mw = Math.ceil(height * (this._CONST.LEGENDMARKSCALE - 0));
        var mh = Math.ceil(height * (this._CONST.LEGENDMARKSCALE - 0));
        var mx = Math.floor(tsx + mw / 2);
        var my = Math.floor(tsy + legendBgHeight / 2);
        this._createRect(mx, my, mw, mh, 0)
          .attr({
            "stroke-width": 0,
            "fill": this._getColor(color),
            "fill-opacity": alpha
          });

        tsx += mw + legendMTPadding;

        //Draw Text
        var tx = Math.floor(tsx + width / 2);
        var ty = Math.floor(tsy + legendBgHeight / 2);
        var tw = Math.floor(width);
        var th = Math.floor(legendBgHeight);
        var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.LEGEND);
        this._createText({
          "text": name,
          "cx": tx,
          "cy": ty,
          "width": tw,
          "height": th,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": fontStyle.color,
          "font-weight": fontStyle.bold
        });


        tsx += width + legendTMPadding;
      }
    } else {    //Show at right
      var legendMTPadding = Math.floor(chart.legendMTPadding - 0);
      var legendBgWidth = legendBBox.width;

      var legendTextHeight = series[0].height;
      var padding = legendTextPadding > (legendBorderThickness + legendBTOverPadding) ?
        legendTextPadding : (legendBorderThickness + legendBTOverPadding);
      var legendBgHeight = 2 * padding + series.length * legendTextHeight + (series.length - 1) * legendTextPadding;
      var legendLRPadding = padding + legendTextHeight * (1 - (this._CONST.LEGENDMARKSCALE - 0)) / 2;
      var legendPerHeight = legendTextHeight + legendTextPadding;

      //背景色
      if (this._CONST.ENABLE === legendShadow) {
        if (Raphael.vml) {
          this._createRect((x + x2) / 2, (y + y2) / 2, legendBgWidth, legendBgHeight, 0)
            .attr({
              "stroke-width": 0,
              "fill": this._getColor(this._CONST.SHADOW.COLOR),
              "fill-opacity": (this._CONST.SHADOW.OPACITY - 0)
            })
            .blur(this._CONST.SHADOW.OFFSET - 0);
        } else if (!this._browser.browser.safari) {  //safari does not support svg filter
          this._createRect((x + x2) / 2 + (this._CONST.SHADOW.OPACITY - 0), (y + y2) / 2 + (this._CONST.SHADOW.OPACITY - 0), legendBgWidth, legendBgHeight, 0)
            .attr({
              "stroke-width": 0,
              "fill": this._getColor(this._CONST.SHADOW.COLOR),
              "fill-opacity": (this._CONST.SHADOW.OPACITY - 0)
            })
            .blur(this._CONST.SHADOW.OFFSET - 0);
        }
      }

      this._createRect((x + x2) / 2, (y + y2) / 2, legendBgWidth, legendBgHeight, legendBorderThickness)
        .attr({
          "stroke": this._getColor(legendBorderColor),
          "stroke-width": legendBorderThickness,
          "stroke-opacity": legendBorderAlpha,
          "fill": this._getColor(legendBgColor),
          "fill-opacity": legendBgAlpha
        });

      //图例
      //padding + series[0].height * (1 - (this._CONST.LEGENDMARKSCALE - 0)) / 2;
      var lcx = Math.floor(x + legendLRPadding + legendTextHeight * (this._CONST.LEGENDMARKSCALE - 0) / 2);//Math.floor((x + x2) / 2 - legendBgWidth / 2) + legendLRPadding;
      var tcx = Math.ceil(((x + legendLRPadding + legendTextHeight * (this._CONST.LEGENDMARKSCALE - 0) + legendMTPadding)
        + (x2 - legendLRPadding)) / 2);
      if (Raphael.vml) {
        tcx += 1;
      }

      for (var i = 0, ii = series.length; i < ii; i++) {

        var serie = series[i];
        var name = serie.name;
        var color = serie.color;
        var alpha = serie.alpha;
        var width = serie.width;
        var height = serie.height;

        var cy = Math.floor((y + y2) / 2 + 0.5 * legendPerHeight + (i - ii / 2) * legendPerHeight);

        //Draw Mark
        var mw = Math.ceil(height * (this._CONST.LEGENDMARKSCALE - 0));
        var mh = Math.ceil(height * (this._CONST.LEGENDMARKSCALE - 0));
        this._createRect(lcx, cy, mw, mh, 0)
          .attr({
            "stroke-width": 0,
            "fill": this._getColor(color),
            "fill-opacity": alpha
          });

        //Draw Text
        var tw = Math.floor(width);
        var th = Math.floor(height);
        var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.LEGEND);
        this._createText({
          "text": name,
          "cx": tcx,
          "cy": cy,
          "width": tw,
          "height": th,
          "font-family": fontStyle.font,
          "font-size": fontStyle.size,
          "font-color": fontStyle.color,
          "font-weight": fontStyle.bold
        });
      }
    }
  };

  //创建Y轴名称
  _p._createYAxisName = function (chart, parentYAxis) {
    var yAxisName = null;
    var rotateYAxisName = null;
    var yAxisNameBBox = null;
    var yAxisNameWidth = null;
    var styleObject = null;
    if (this._CONST.AXIS.PY === parentYAxis) {
      yAxisName = chart.PYAxisName;
      rotateYAxisName = chart.rotatePYAxisName;
      yAxisNameBBox = this._getPYAxisNameBBox(chart);
      yAxisNameWidth = !chart.PYAxisNameWidth ? yAxisNameBBox.width : (chart.PYAxisNameWidth - 0);
      styleObject = this._CONST.STYLEOBJECT.PYAXISNAME;
    } else {
      yAxisName = chart.SYAxisName;
      rotateYAxisName = chart.rotateSYAxisName;
      yAxisNameBBox = this._getSYAxisNameBBox(chart);
      yAxisNameWidth = !chart.SYAxisNameWidth ? yAxisNameBBox.width : (chart.SYAxisNameWidth - 0);
      styleObject = this._CONST.STYLEOBJECT.SYAXISNAME;
    }
    if (!yAxisName) {
      return;
    }

    if (this._CONST.ENABLE === rotateYAxisName) {
      var cx = (yAxisNameBBox.x + yAxisNameBBox.x2) / 2;
      var cy = (yAxisNameBBox.y + yAxisNameBBox.y2) / 2;
      var fontStyle = this._getFontStyle(chart, styleObject);
      this._createText({
        "text": yAxisName,
        "cx": cx,
        "cy": cy,
        "angle": 270,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "transform-origin": "center center"
      });
    } else {
      var yAxisNameWH = this._getTextWH(chart,
        styleObject,
        yAxisName,
        0,
        true);

      var hx = 0 - (this._holderWidth - 0) * 2;
      var hy = 0 - (this._holderHeight - 0) * 2;
      var fontStyle = this._getFontStyle(chart, styleObject);
      var element = this._createText({
        "text": yAxisName,
        "cx": hx,
        "cy": hy,
        "width": yAxisNameWidth,
        "height": yAxisNameWH.height,
        "line-height": yAxisNameWH.height,
        "angle": 0,
        "font-family": fontStyle.font,
        "font-size": fontStyle.size,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "word-break": this._CONST.ENABLE
      });
      var clientWidth = element.clientWidth;
      var clientHeight = element.clientHeight;
      var cx = (yAxisNameBBox.x + yAxisNameBBox.x2) / 2 - clientWidth / 2;
      var cy = (yAxisNameBBox.y + yAxisNameBBox.y2) / 2 - clientHeight / 2;
      if (Raphael.vml) {
        cx += 1;
      }

      element.style.left = cx;
      element.style.top = cy;
    }
  };

  //创建PY轴名称
  _p._createPYAxisName = function (chart) {
    this._createYAxisName(chart, this._CONST.AXIS.PY);
  };

  //创建SY轴名称
  _p._createSYAxisName = function (chart) {
    this._createYAxisName(chart, this._CONST.AXIS.SY);
  };

  //创建矩形
  _p._createRect = function (cx, cy, w, h, t) {
    if (3 > t) {
      ht = Math.floor(t) / 2;
      if (Raphael.vml) {
        ht += 0.5;
      }

      cx = Math.round(cx);
      cy = Math.round(cy);

      var rx0 = Math.floor(cx - w / 2) + ht;
      var ry0 = Math.floor(cy - h / 2) + ht;

      var rx1 = Math.ceil(cx + w / 2) - ht;
      var ry1 = ry0;

      var rx2 = rx1;
      var ry2 = Math.ceil(cy + h / 2) - ht;

      var rx3 = rx0;
      var ry3 = ry2;

      var path = [];
      path[path.length] = ["M", rx0, ry0];
      path[path.length] = ["L", rx1, ry1];
      path[path.length] = ["L", rx2, ry2];
      path[path.length] = ["L", rx3, ry3];
      path[path.length] = ["Z"];

      return this._paper.path(path);
    } else {
      ht = Math.floor(t) / 2;
      if (Raphael.vml) {
        ht += 0.5;
      }

      var r = 3 > t / 2 ? 3 : t / 2;
      var rx0 = Math.floor(cx - w / 2) + 2 * ht + 10;
      var ry0 = Math.floor(cy - h / 2) + ht;

      var rx1 = Math.floor(cx + w / 2) - 2 * ht;
      var ry1 = ry0;

      var rx2 = rx1 + ht;
      var ry2 = ry0 + ht;

      var rx3 = rx2;
      var ry3 = Math.floor(cy + h / 2) - 2 * ht;

      var rx4 = rx2 - ht;
      var ry4 = ry3 + ht;

      var rx5 = Math.floor(cx - w / 2) + 2 * ht;
      var ry5 = ry4;

      var rx6 = rx5 - ht;
      var ry6 = ry4 - ht;

      var rx7 = rx6;
      var ry7 = ry2;

      var rx8 = rx5;
      var ry8 = ry1;

      var path = [];
      path[path.length + 1] = ["M", rx0, ry0];
      path[path.length + 1] = ["L", rx1, ry1];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, rx2, ry2];
      path[path.length + 1] = ["L", rx3, ry3];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, rx4, ry4];
      path[path.length + 1] = ["L", rx5, ry5];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, rx6, ry6];
      path[path.length + 1] = ["L", rx7, ry7];
      path[path.length + 1] = ["A", r, r, 0, 0, 1, rx8, ry8];
      path[path.length + 1] = ["Z"];
      return this._paper.path(path);
    }
  };

  //创建主标题
  _p._createCaption = function (chart) {
    var caption = chart.caption;
    if (!caption) {
      return null;
    }

    var captionBBox = this._getCaptionBBox(chart);
    var x = (captionBBox.x + captionBBox.x2) / 2;
    var y = (captionBBox.y + captionBBox.y2) / 2;
    var width = captionBBox.width;
    var height = captionBBox.height;

    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.CAPTION);
    return this._createText({
      "text": caption,
      "cx": x,
      "cy": y,
      "width": width,
      "height": height,
      "font-family": fontStyle.font,
      "font-size": fontStyle.size,
      "font-color": fontStyle.color,
      "font-weight": fontStyle.bold
    });
  };

  //创建子标题
  _p._createSubCaption = function (chart) {
    var subCaption = chart.subCaption;
    if (!subCaption) {
      return null;
    }

    var subCaptionBBox = this._getSubCaptionBBox(chart);
    var x = (subCaptionBBox.x + subCaptionBBox.x2) / 2;
    var y = (subCaptionBBox.y + subCaptionBBox.y2) / 2;
    var width = subCaptionBBox.width;
    var height = subCaptionBBox.height;
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.SUBCAPTION);
    return this._createText({
      "text": subCaption,
      "cx": x,
      "cy": y,
      "width": width,
      "height": height,
      "font-family": fontStyle.font,
      "font-size": fontStyle.size,
      "font-color": fontStyle.color,
      "font-weight": fontStyle.bold
    });
  };

  //创建X轴名称
  _p._createXAxisName = function (chart) {
    var xAxisName = chart.xAxisName;
    if (!xAxisName) {
      return null;
    }

    var xAxisNameBBox = this._getXAxisNameBBox(chart);
    var x = (xAxisNameBBox.x + xAxisNameBBox.x2) / 2;
    var y = (xAxisNameBBox.y + xAxisNameBBox.y2) / 2;
    var width = xAxisNameBBox.width;
    var height = xAxisNameBBox.height;
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.XAXISNAME);
    return this._createText({
      "text": xAxisName,
      "cx": x,
      "cy": y,
      "width": width,
      "height": height,
      "font-family": fontStyle.font,
      "font-size": fontStyle.size,
      "font-color": fontStyle.color,
      "font-weight": fontStyle.bold
    });
  };


  //创建锚点
  _p._createAnchor = function (attr) {
    var cx = attr["cx"];
    var cy = attr["cy"];
    var side = attr["side"];
    var radius = attr["radius"];
    var borderColor = attr["border-color"];
    var borderThickness = attr["border-thickness"];
    var borderAlpha = attr["border-alpha"];
    var fillColor = attr["fill-color"];
    var fillAlpha = attr["fill-alpha"];

    var anchorElement = null;
    if (3 > (side - 0)) {
      anchorElement = this._paper.circle(cx, cy, radius);
    } else {
      var path = [];
      for (var j = 0, jj = side; j < jj; j++) {
        var angle = j * (1 / side) * 2 * Math.PI;
        var x = cx + Math.sin(angle) * radius;
        var y = cy - Math.cos(angle) * radius;
        if (0 === j) {
          path[path.length] = ["M", x, y];
        } else {
          path[path.length] = ["L", x, y];
        }
      }
      path[path.length] = ["Z"];
      anchorElement = this._paper.path(path);
    }

    anchorElement.attr({
      "stroke": this._getColor(borderColor),
      "stroke-width": borderThickness,
      "stroke-opacity": borderAlpha,
      "fill": this._getColor(fillColor),
      "fill-opacity": fillAlpha
    });

    return anchorElement;
  };


  //获得数据集合
  _p._getDatasets = function (chart, pattern) {
    var datasets = chart.dataset;
    if (!datasets) {
      return [];
    }
    if (!pattern) {
      return datasets;
    }
    var sets = [];
    for (var i = 0, ii = datasets.length; i < ii; i++) {
      var dataset = datasets[i];
      var pattern = dataset.pattern || this._CONST.PATTERN.COLUMN;
      if (this._CONST.PATTERN.COLUMN === pattern) {
        sets[sets.length] = dataset;
      }
    }
    return sets;
  };

  //触发事件
  _p._fireAttachedEvent = function (chart, funData) {
    if (!funData) {
      return;
    }
    var eventParamSeparator = chart.eventParamSeparator;
    var fun = null;
    var param = null;
    var index = funData.indexOf(eventParamSeparator);
    if (-1 === index) {
      fun = funData;
    } else {
      fun = funData.substring(0, index);
      param = funData.substring(index + 1, funData.length);
    }
    //   if ("function" !== typeof window[fun]) {   //如果未定义函数，这边会自动跑出异常
    if (!param) {
      window[fun]();
    } else {
      window[fun](param);
    }
  //    }
  };

  //点击事件
  _p._clickHandler = function (chart, event) {
    event = window.event || event;
    var element = event.srcElement; //To Do, how to get event
    var clickData = element["click-data"];
    if (clickData) {
      this._fireAttachedEvent(chart, clickData);
    }
  };

  //鼠标至事件
  _p._mouseoverHandler = function (chart, event) {
    event = window.event || event;
    var element = event.srcElement || event.targett;

    var clickData = element["click-data"];
    if (clickData) {
      this._holderElement.style.cursor = "pointer";
    }
    var mouseoverData = element["mouseover-data"];
    if (mouseoverData) {
      this._fireAttachedEvent(chart, mouseoverData);
    } else {
      var toolTip = element["tooltip-data"];
      if (toolTip) {
        this._showToolTip(chart,
          toolTip,
          event.clientX - this._holderElement.offsetLeft + document.body.scrollLeft,
          event.clientY - this._holderElement.offsetTop - 20 + document.body.scrollTop);
      }
    }
  };

  //鼠标移动事件
  _p._mousemoveHandler = function (chart, event) {
    event = window.event || event;
    var element = event.srcElement || event.target;
    var clickData = element["click-data"];
    if (clickData) {
      this._holderElement.style.cursor = "pointer";
    }
    var mousemoveData = element["mousemove-data"];
    if (mousemoveData) {
      this._fireAttachedEvent(chart, mousemoveData);
    } else {
      var toolTip = element["tooltip-data"];
      if (toolTip) {
        this._showToolTip(chart,
          toolTip,
          event.clientX - this._holderElement.offsetLeft + document.body.scrollLeft,
          event.clientY - this._holderElement.offsetTop - 20 + document.body.scrollTop);
      }
    }
  };

  //鼠标移开事件
  _p._mouseoutHandler = function (chart, event) {
    event = window.event || event;
    var element = event.srcElement || event.target; //To Do, how to get event

    this._holderElement.style.cursor = "default";
    var mouseoutData = element["mouseout-data"];
    if (mouseoutData) {
      this._fireAttachedEvent(chart, mouseoutData);
    }

    this._removeToolTip();
  };

  //创建画布背景
  _p._createCanvasBg = function (chart) {
    var canvasBgColor = chart.canvasBgColor;
    var canvasBgColors = canvasBgColor.split(",");
    var canvasBgAlpha = Math.floor(chart.canvasBgAlpha.split(",")[0] - 0) / 100;
    var canvasBgAngle = (360 - (chart.canvasBgAngle - 0)) % 360;
    var canvasBorderColor = chart.canvasBorderColor;
    var canvasBorderThickness = Math.floor(chart.canvasBorderThickness - 0);
    var canvasBorderAlpha = Math.floor(chart.canvasBorderAlpha - 0) / 100;
    var canvasBBox = this._getCanvasBBox(chart);
    var x = canvasBBox.x;
    var y = canvasBBox.y;
    var x2 = canvasBBox.x2;
    var y2 = canvasBBox.y2;
    var width = canvasBBox.width;
    var height = canvasBBox.height;
    var cx = (x + x2) / 2;
    var cy = (y + y2) / 2;
    if (Raphael.svg) {
      cx -= 1;
      width -= 1;
    }
    var canvasElement = this._createRect(cx,
      cy,
      width + canvasBorderThickness,
      height + canvasBorderThickness,
      canvasBorderThickness);
    if (1 === canvasBgColors.length) {
      canvasElement.attr({
        "stroke": this._getColor(canvasBorderColor),
        "stroke-width": 0,
        "stroke-opacity": canvasBorderAlpha,
        "fill": this._getColor(canvasBgColors[0]),
        "fill-opacity": canvasBgAlpha
      });
    } else {
      var fill = null;
      if (Raphael.svg) {
        fill = canvasBgAngle + "-" + this._getColor(canvasBgColors[0]) + "-" + this._getColor(canvasBgColors[1]);
      } else {
        canvasBgAngle = (canvasBgAngle + 180) % 360;
        fill = canvasBgAngle + "-" + this._getColor(canvasBgColors[1]) + "-" + this._getColor(canvasBgColors[0]);
      }
      canvasElement.attr({
        "stroke": this._getColor(canvasBorderColor),
        "stroke-width": 0,
        "stroke-opacity": canvasBorderAlpha,
        "fill": fill,
        "fill-opacity": canvasBgAlpha
      });
    }
  };

  //创建画布边框
  _p._createCanvasBorder = function (chart) {
    var canvasBgColor = chart.canvasBgColor;
    var canvasBgColors = canvasBgColor.split(",");
    var canvasBgAlpha = Math.floor(chart.canvasBgAlpha.split(",")[0] - 0) / 100;
    var canvasBgAngle = (360 - (chart.canvasBgAngle - 0)) % 360;
    var canvasBorderColor = chart.canvasBorderColor;
    var canvasBorderThickness = Math.floor(chart.canvasBorderThickness - 0);
    var canvasBorderAlpha = Math.floor(chart.canvasBorderAlpha - 0) / 100;
    var canvasBBox = this._getCanvasBBox(chart);
    var x = canvasBBox.x;
    var y = canvasBBox.y;
    var x2 = canvasBBox.x2;
    var y2 = canvasBBox.y2;
    var width = canvasBBox.width;
    var height = canvasBBox.height;
    var cx = (x + x2) / 2;
    var cy = (y + y2) / 2;
    if (Raphael.svg) {
      cx -= 1;
      width -= 1;
    }
    this._createRect(cx,
      cy,
      width + canvasBorderThickness,
      height + canvasBorderThickness,
      canvasBorderThickness)
      .attr({
        "stroke": this._getColor(canvasBorderColor),
        "stroke-width": canvasBorderThickness,
        "stroke-opacity": canvasBorderAlpha
      });
  };

  //是否需要使用WEBKIT字体缩放
  _p._isWebkitFontScale = function (fontSize) {

    return ((this._CONST.WEBKITMINFONTSIZE - 0) > (fontSize - 0) &&
    (this._browser.browser.chrome || this._browser.browser.opera) &&
    "undefined" !== typeof window.document.documentElement.style.webkitTransform);
  };

  //创建文本
  _p._createText = function (attr) {
    var cx = attr["cx"];
    var cy = attr["cy"];
    var width = attr["width"];
    var height = attr["height"];
    var angle = (attr["angle"] || "0" - 0) % 360;
    var wordBreak = attr["word-break"] || "0";
    var text = attr["text"] || "";
    var textAlign = attr["text-align"] || "center";
    var fontFamily = attr["font-family"] || "";
    var fontSize = attr["font-size"] || "0" - 0;
    var fontColor = attr["font-color"] || "";
    var fontWeight = attr["font-weight"] || "0";
    var lineHeight = attr["line-height"] || height;
    var transformOrigin = attr["transform-origin"] || "center center";
    var backgroundColor = attr["background-color"] || null;
    var border = attr["border"] || "";
    var padding = attr["padding"] || "";

    //VML
    if (0 !== angle && this._browser.browser.ie) {
      var textAnchor = this._CONST.TEXTANCHOR.MIDDLE;
      if (this._CONST.TEXTALIGN.RIGHT === textAlign) {
        textAnchor = this._CONST.TEXTANCHOR.END;
      }
      var element = this._paper.text(cx, cy, text)
        .attr({
          "fill": this._getColor(fontColor),
          "font-size": fontSize,
          "font-family": fontFamily,
          "font-weight": this._CONST.ENABLE == fontWeight ? "bold" : "normal",
          "transform": "r" + angle,
          "text-anchor": textAnchor
        });
      element.elementType = this._CONST.TEXTELEMENTTYPE.SVGORVML;
      return element;
    } else {
      var element = document.createElement("div");
      element.innerHTML = (text + "").replace(/ /g, "&nbsp;")
        .replace(/-/g, "&minus;");
      element.style.position = "absolute";
      //    element.style.border = "1px solid red";
      //    element.style.backgroundColor = "yellow";
      element.style.textAlign = textAlign;
      element.style.fontFamily = fontFamily;
      element.style.fontWeight = this._CONST.ENABLE == fontWeight ? "bold" : "normal";
      element.style.color = this._getColor(fontColor);
      if (backgroundColor) {
        element.style.backgroundColor = this._getColor(backgroundColor);
      }
      if (border) {
        element.style.border = border;
      }
      if (padding) {
        element.style.padding = padding;
      }

      //chrome & opera has min font size option
      if (this._isWebkitFontScale(fontSize)) {
        var scale = (fontSize - 0) / (this._CONST.WEBKITMINFONTSIZE - 0);
        fontSize = this._CONST.WEBKITMINFONTSIZE - 0;
        width = (null == width || "" == width) ? null : (width - 0) / scale;
        height = (null == height || "" == height) ? null : (height - 0) / scale;
        lineHeight = (null == lineHeight || "" == lineHeight) ?
          height : (lineHeight - 0) / scale;
        //     cy += 3;    //i don't not why
        //      cy += lineHeight / 2;
        element.style.fontSize = fontSize + "px";
        element.style.webkitTransform = "scale(" + scale + ")";
        element.style.webkitTransformOrigin = transformOrigin;
        element.transformScale = scale;

      } else {
        element.style.fontSize = fontSize + "px";
      }

      //use html5 to rotate
      if (0 !== angle) {
        if ("undefined" !== typeof element.style.webkitTransform) {
          var ori = element.style.webkitTransform || "";
          element.style.webkitTransformOrigin = transformOrigin;
          element.style.webkitTransform = ori + " rotate(" + angle + "deg)";
        }
        if ("undefined" !== typeof element.style.MozTransform) {
          var ori = element.style.MozTransform || "";
          element.style.MozTransformOrigin = transformOrigin;
          element.style.MozTransform = ori + " rotate(" + angle + "deg)";
        }
      }

      if (width && height) {
        element.style.width = width + "px";

        //word break
        if (this._CONST.ENABLE === wordBreak) {
          element.style.whiteSpace = "normal";
          element.style.wordBreak = "break-all";
          //      element.style.height = height + "px";
        } else {
          element.style.whiteSpace = "nowrap";
          element.style.height = height + "px";
        }
        element.style.lineHeight = lineHeight + "px";


        if (Raphael.vml) {
          cx += this._CONST.VMLADJUST.LEFT - 0;
          cy += this._CONST.VMLADJUST.TOP - 0;
        }
        element.style.left = cx - width / 2 + "px";
        element.style.top = cy - height / 2 + "px";

        this._holderElement.appendChild(element);
      } else {
        element.style.visibility = "hidden";
        this._holderElement.appendChild(element);
        var width = element.clientWidth;
        var height = element.clientHeight;
        element.style.left = cx - width / 2 + "px";
        element.style.top = cy - height / 2 + "px";
        element.style.lineHeight = height + "px";
        element.style.visibility = "visible";
      }
      element.elementType = this._CONST.TEXTELEMENTTYPE.HTML;
      return element;
    }
  };

  //获得颜色
  _p._getColor = function (color) {
    if (!color) {
      return this._CONST.COLOR.BLACK;
    }
    if (!color.indexOf("#")) {
      return color;
    } else {
      return "#" + color;
    }
  };

  //获得样式
  _p._getFontStyle = function (chart, toObject) {

    return chart.styles[toObject][this._CONST.STYLETYPE.FONT];

    /* 之前的定义格式，后续优化
     var styleType = this._CONST.STYLETYPE.FONT;

     //Cache
     if (this._styles &&
     this._styles[toObject] &&
     this._styles[toObject][styleType]) {
     return this._styles[toObject][styleType];
     }

     if (!chart.styles ||
     !chart.styles.definition ||
     !chart.styles.definition.style ||
     !chart.styles.application ||
     !chart.styles.application.apply) {
     return this._DEFAULT.chart.styles[toObject][styleType];
     }

     var definitions = chart.styles.definition.style;
     var applications = chart.styles.application.apply;
     var styles = {};
     for (var i = 0, ii = applications.length; i < ii; i++) {
     var apply = applications[i];
     var appToObject = apply.toObject;
     var appStyles = apply.styles;
     if (toObject == appToObject) {
     if (!appStyles) {
     continue;
     }
     var styleNames = appStyles.split(",");
     for (var j = 0, jj = styleNames.length; j < jj; j++) {
     var name = styleNames[j];
     if (!name) {
     continue;
     }
     styles[name] = true;
     }
     }
     }

     var style = {};
     for (var i = 0, ii = definitions.length; i < ii; i++) {
     var definition = definitions[i];
     var name = definition.name;
     var type = definition.type;
     if (styles[name] && type == styleType) {
     this._extendObject(style, definition);
     }
     }

     this._extendObject(style, this._DEFAULT.chart.styles[toObject][styleType]);

     if (!this._styles) {
     this._styles = {};
     }
     if (!this._styles[toObject]) {
     this._styles[toObject] = {};
     }
     this._styles[toObject][styleType] = style;

     return style;
     */
  };

  //获得提示
  _p._getToolTip = function (chart, dataset, data) {
    var showToolTip = chart.showToolTip;
    var seriesNameInToolTip = chart.seriesNameInToolTip;
    var dataValueInToolTip = chart.dataValueInToolTip;
    var percentInToolTip = chart.percentInToolTip;
    var toolTipSepChar = chart.toolTipSepChar;
    var seriesName = dataset.seriesName;
    var value = (data.value || "0") - 0;
    var label = data.label;
    var formatValue = data.formatValue;
    var percent = data.percent;
    var toolText = data.toolText;
    var toolTip = "";
    if (this._CONST.ENABLE === showToolTip) {
      if (!toolText) {
        var toolTip = [];
        if (this._CONST.ENABLE === seriesNameInToolTip) {
          if (seriesName) {
            toolTip[toolTip.length] = seriesName;
          }
        }
        if (label) {
          toolTip[toolTip.length] = label;
        }
        if (this._CONST.ENABLE === dataValueInToolTip) {
          //toolTip[toolTip.length] = formatValue;
          if (this._CONST.ENABLE === percentInToolTip) {
            toolTip[toolTip.length] = percent;
          } else {
            toolTip[toolTip.length] = formatValue;
          }
        }

        toolTip = toolTip.join(toolTipSepChar);
      } else {
        toolTip = toolText;
      }
    } else {
      toolTip = "";
    }

    return toolTip;
  };

  //获得数据标签格式
  _p._getValueLabel = function (chart, dataset, data) {
    var showValueLabel = chart.showValueLabel;
    var seriesNameInValueLabel = chart.seriesNameInValueLabel;
    var dataValueInValueLabel = chart.dataValueInValueLabel;
    var percentInValueLabel = chart.percentInValueLabel;
    var valueLabelSepChar = chart.valueLabelSepChar;
    var seriesName = dataset.seriesName;
    var value = (data.value || "0") - 0;
    var label = data.label;
    var formatValue = data.formatValue;
    var percent = data.percent;
    var displayValue = data.displayValue;
    var valueLabel = "";
    if (this._CONST.ENABLE === showValueLabel) {
      if (!displayValue) {
        var valueLabel = [];
        if (this._CONST.ENABLE === seriesNameInValueLabel) {
          if (seriesName) {
            valueLabel[valueLabel.length] = seriesName;
          }
        }
        if (label) {
          valueLabel[valueLabel.length] = label;
        }
        if (this._CONST.ENABLE === dataValueInValueLabel) {
          if (this._CONST.ENABLE === percentInValueLabel) {
            valueLabel[valueLabel.length] = percent;
          } else {
            valueLabel[valueLabel.length] = formatValue;
          }
        }
        valueLabel = valueLabel.join(valueLabelSepChar);
      } else {
        valueLabel = displayValue;
      }
    } else {
      valueLabel = "";
    }
    return valueLabel;
  };

  //计算合适的半径
  _p._calcSmartRadius = function (chart, dataset, styleObject) {
    var canvasBBox = this._getCanvasBBox(chart);
    var x0 = Math.floor((canvasBBox.x + canvasBBox.x2) / 2);
    var y0 = Math.floor((canvasBBox.y + canvasBBox.y2) / 2);
    var showValueLabel = chart.showValueLabel;
    var smartRadius = null;
    if (this._CONST.ENABLE === showValueLabel) {
      var showLabelLine = chart.showLabelLine;
      var labelLineSlanted = chart.labelLineSlanted;
      var valueLabelPadding = Math.floor(chart.valueLabelPadding - 0);
      var labelLinePadding = Math.floor(chart.labelLinePadding - 0);
      var labelLineClearance = Math.floor(chart.labelLineClearance - 0);
      var labelLineDistance = Math.floor(chart.labelLineDistance - 0);

      //获得LABELBBOX
      var valueLableBBoxs = [];
      for (var i = 0, ii = dataset.length; i < ii; i++) {
        var data = dataset[i];
        var valueLabel = data.valueLabel;
        //   var startAngle = data.startAngle;
        //   var endAngle = data.endAngle;
        var middleAngle = data.middleAngle % 360;

        var textWH = this._getTextWH(chart,
          styleObject,
          valueLabel,
          0,
          false);

        var tx = null;
        var ty = null;
        if (this._CONST.ENABLE !== showLabelLine) {
          var labelRadius = valueLabelPadding;
          var tcx = x0 + labelRadius * Math.sin(middleAngle / 180 * Math.PI);
          var tcy = y0 - labelRadius * Math.cos(middleAngle / 180 * Math.PI);

          if (180 >= middleAngle) {
            tx = tcx;
          } else {
            tx = tcx - textWH.width;
          }
          var ty = tcy - textWH.height / 2;
        } else {
          var r0 = labelLinePadding;
          var lx0 = Math.floor(x0 + r0 * Math.sin(middleAngle / 180 * Math.PI));
          var ly0 = Math.floor(y0 - r0 * Math.cos(middleAngle / 180 * Math.PI));
          var lx1 = 0;
          var ly1 = 0;
          var lx2 = 0;
          var ly2 = 0;
          var r1 = labelLinePadding + labelLineClearance;
          if (180 >= middleAngle) {
            if (this._CONST.ENABLE === labelLineSlanted) {
              lx1 = Math.floor(x0 + r1 * Math.sin(middleAngle / 180 * Math.PI));
              ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
              lx2 = lx1 + labelLineDistance;
              ly2 = ly1;
            } else {
              lx1 = lx0;
              ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
              lx2 = lx1 + labelLineDistance;
              ly2 = ly1;
            }
            tx = lx2 + valueLabelPadding;
            ty = ly2 - textWH.height / 2;
          } else {
            if (this._CONST.ENABLE === labelLineSlanted) {
              lx1 = Math.floor(x0 + r1 * Math.sin(middleAngle / 180 * Math.PI));
              ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
              lx2 = lx1 - labelLineDistance;
              ly2 = ly1;
            } else {
              lx1 = lx0;
              ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
              lx2 = lx1 - labelLineDistance;
              ly2 = ly1;
            }
            tx = lx2 - valueLabelPadding - textWH.width;
            ty = ly2 - textWH.height / 2;
          }
        }
        valueLableBBoxs[valueLableBBoxs.length] = {
          "x": tx,
          "y": ty,
          "x2": tx + textWH.width,
          "y2": ty + textWH.height
        };

      }

      var hMax = 0;
      var vMax = 0;

      for (var i = 0, ii = valueLableBBoxs.length; i < ii; i++) {
        var valueLableBBox = valueLableBBoxs[i];
        hMax = hMax > Math.abs(valueLableBBox.x - x0) ? hMax : Math.abs(valueLableBBox.x - x0);
        hMax = hMax > Math.abs(valueLableBBox.x2 - x0) ? hMax : Math.abs(valueLableBBox.x2 - x0);
        vMax = vMax > Math.abs(valueLableBBox.y - y0) ? vMax : Math.abs(valueLableBBox.y - y0);
        vMax = vMax > Math.abs(valueLableBBox.y2 - y0) ? vMax : Math.abs(valueLableBBox.y2 - y0);
      }

      smartRadius = ((canvasBBox.width / 2 - hMax) < (canvasBBox.height / 2 - vMax) ?
          (canvasBBox.width / 2 - hMax) : (canvasBBox.height / 2 - vMax)) * (this._CONST.SMARTRADIUS.SCALE - 0);

      smartRadius = (this._CONST.SMARTRADIUS.MIN - 0) > smartRadius ? (this._CONST.SMARTRADIUS.MIN - 0) : smartRadius;

    } else {
      smartRadius = (canvasBBox.width < canvasBBox.height ?
          canvasBBox.width : canvasBBox.height) / 2 * (this._CONST.SMARTRADIUS.SCALE - 0);
    }

    return smartRadius;
  };

  //创建圆形标签
  _p._createRadiantLabel = function (attr) {
    var cx = attr["cx"];
    var cy = attr["cy"];
    var radius = attr["radius"];
    var angle = (attr["angle"] - 0) % 360;
    var label = attr["label"];
    var labelPadding = attr["label-padding"];
    var fontFamily = attr["font-family"];
    var fontSize = attr["font-size"];
    var fontColor = attr["font-color"];
    var fontWeight = attr["font-weight"];
    var showLine = attr["show-line"];
    var lineSlanted = attr["line-slanted"];
    var linePadding = attr["line-padding"];
    var lineDistance = attr["line-distance"];
    var lineClearance = attr["line-clearance"];
    var lineColor = attr["line-color"];
    var lineThickness = attr["line-thickness"];
    var lineAlpha = attr["line-alpha"];
    var lineDashedStyle = attr["line-dashed-style"];
    var verticalCenter = attr["vertical-center"];
    var isWebkitFontScale = this._isWebkitFontScale(fontSize);
    var hx = 0 - (this._holderWidth - 0) * 2;
    var hy = 0 - (this._holderHeight - 0) * 2;

    if (this._CONST.ENABLE === showLine) {
      var lx0 = Math.floor(cx + (radius + linePadding) * Math.sin(angle / 180 * Math.PI));
      var ly0 = Math.floor(cy - (radius + linePadding) * Math.cos(angle / 180 * Math.PI));
      var lx1 = 0;
      var ly1 = 0;
      var lx2 = 0;
      var ly2 = 0;

      if (this._CONST.ENABLE === lineSlanted) {
        lx1 = Math.floor(cx + (radius + linePadding + lineClearance) * Math.sin(angle / 180 * Math.PI));
        ly1 = Math.floor(cy - (radius + linePadding + lineClearance) * Math.cos(angle / 180 * Math.PI));
      } else {
        lx1 = lx0;
        ly1 = Math.floor(cy - (radius + linePadding + lineClearance) * Math.cos(angle / 180 * Math.PI));
      }

      if (180 >= angle) {
        lx2 = lx1 + lineDistance;
        ly2 = ly1;
      } else {
        lx2 = lx1 - lineDistance;
        ly2 = ly1;
      }

      if (Raphael.svg && this._isOdd(lineThickness)) {
        ly1 += 0.5;
        ly2 += 0.5;

        if (this._CONST.ENABLE !== lineSlanted) {
          lx0 += 0.5;
          lx1 += 0.5;
        }
      } else if (Raphael.vml && !this._isOdd(lineThickness)) {
        ly1 += 0.5;
        ly2 += 0.5;

        if (this._CONST.ENABLE !== lineSlanted) {
          lx0 += 0.5;
          lx1 += 0.5;
        }
      }

      var path = [];
      path[path.length] = ["M", lx0, ly0];
      path[path.length] = ["L", lx1, ly1];
      path[path.length] = ["L", lx2, ly2];
      this._paper.path(path)
        .attr({
          "stroke": lineColor,
          "stroke-width": lineThickness,
          "stroke-opacity": lineAlpha,
          "stroke-dasharray": lineDashedStyle
        });

      var tmpfontSize = null;
      if (isWebkitFontScale) {  //CHROME下有字体限制
        tmpfontSize = this._CONST.WEBKITMINFONTSIZE - 0;
      } else {
        tmpfontSize = fontSize;
      }
      var textElement = this._createText({
        "text": label,
        "cx": hx,
        "cy": hy,
        "angle": 0,
        "font-family": fontFamily,
        "font-size": tmpfontSize,
        "font-color": fontColor,
        "font-weight": fontWeight,
        "text-align": this._CONST.TEXTALIGN.CENTER,
        "transform-origin": "center center"
      });
      var textWidth = textElement.clientWidth;
      var textHeight = textElement.clientHeight;

      var tx = null;
      var ty = null;
      if (180 >= angle) {
        tx = lx2 + labelPadding;
        ty = ly2 - textHeight / 2;
        transformOrigin = "left center";

      } else {
        tx = lx2 - textWidth - labelPadding;
        ty = ly2 - textHeight / 2;
        transformOrigin = "right center";
      }

      if (Raphael.vml) {
        tx += 2;
        ty += 1;
      }

      textElement.style.left = tx + "px";
      textElement.style.top = ty + "px";
      if (isWebkitFontScale) { //CHROME下有字体限制
        var scale = fontSize / (this._CONST.WEBKITMINFONTSIZE - 0);
        textElement.style.fontSize = (this._CONST.WEBKITMINFONTSIZE - 0) + "px";
        textElement.style.webkitTransform = "scale(" + scale + ")";
        textElement.style.webkitTransformOrigin = transformOrigin;
      }
      return textElement;

    } else {
      var tmpfontSize = null;
      if (isWebkitFontScale) {  //CHROME下有字体限制
        tmpfontSize = this._CONST.WEBKITMINFONTSIZE - 0;
      } else {
        tmpfontSize = fontSize;
      }
      var textElement = this._createText({
        "text": label,
        "cx": hx,
        "cy": hy,
        "angle": 0,
        "font-family": fontFamily,
        "font-size": tmpfontSize,
        "font-color": fontColor,
        "font-weight": fontWeight,
        "text-align": this._CONST.TEXTALIGN.CENTER,
        "transform-origin": "center center"
      });
      var textWidth = textElement.clientWidth;
      var textHeight = textElement.clientHeight;


      var tcx = cx + (radius + labelPadding) * Math.sin(angle / 180 * Math.PI);
      var tcy = cy - (radius + labelPadding) * Math.cos(angle / 180 * Math.PI);

      var tx = 0;
      var ty = tcy - textHeight / 2 - textHeight / 2 * Math.cos(angle / 180 * Math.PI);

      var transformOrigin = null;
      if (90 >= angle) {
        if (this._CONST.ENABLE === verticalCenter && 0 === angle) {
          tx = tcx - textWidth / 2;
          transformOrigin = "center center";
        } else {
          tx = tcx;
          transformOrigin = "left bottom";
        }
      } else if (180 >= angle) {
        if (this._CONST.ENABLE === verticalCenter && 180 === angle) {
          tx = tcx - textWidth / 2;
          transformOrigin = "center center";
        } else {
          tx = tcx;
          transformOrigin = "left top";
        }
      } else if (270 >= angle) {
        tx = tcx - textWidth;
        transformOrigin = "right top";
      } else {
        tx = tcx - textWidth;
        transformOrigin = "right bottom";
      }

      if (Raphael.vml) {
        tx += 2;
        ty += 1;
      }

      textElement.style.left = tx + "px";
      textElement.style.top = ty + "px";
      if (isWebkitFontScale) { //CHROME下有字体限制
        var scale = fontSize / (this._CONST.WEBKITMINFONTSIZE - 0);
        textElement.style.fontSize = (this._CONST.WEBKITMINFONTSIZE - 0) + "px";
        textElement.style.webkitTransform = "scale(" + scale + ")";
        textElement.style.webkitTransformOrigin = transformOrigin;
      }

      return textElement;
    }

  };

  //绘制连接线
  _p._createLineLabel = function (chart, data, innerRadius, outterRadius) {

    var canvasBBox = this._getCanvasBBox(chart);
    var x0 = Math.floor((canvasBBox.x + canvasBBox.x2) / 2);
    var y0 = Math.floor((canvasBBox.y + canvasBBox.y2) / 2);
    var fontStyle = this._getFontStyle(chart, this._CONST.STYLEOBJECT.VALUELABEL);
    var isWebkitFontScale = this._isWebkitFontScale(fontStyle.size);
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
    //var radius = Math.floor(chart.radius - 0);
    var valueLabelPadding = Math.floor(chart.valueLabelPadding - 0);
    var hx = 0 - (this._holderWidth - 0) * 2;
    var hy = 0 - (this._holderHeight - 0) * 2;

    //var startAngle = data.startAngle;
    // var endAngle = data.endAngle;
    var middleAngle = data.middleAngle % 360;
    //var labelRadius = radius + valueLabelPadding;
    var valueLabel = data.valueLabel;
    if (!valueLabel) {
      return;
    }

    if (this._CONST.ENABLE !== showLabelLine) {
      var fontSize = null;
      if (isWebkitFontScale) {  //CHROME下有字体限制
        fontSize = this._CONST.WEBKITMINFONTSIZE - 0;

      } else {
        fontSize = fontStyle.size;
      }
      var textElement = this._createText({
        "text": data.valueLabel,
        "cx": hx,
        "cy": hy,
        "angle": 0,
        "font-family": fontStyle.font,
        "font-size": fontSize,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "text-align": this._CONST.TEXTALIGN.CENTER,
        "transform-origin": "center center"
      });
      var textWidth = textElement.clientWidth;
      var textHeight = textElement.clientHeight;

      var tcx = x0 + (innerRadius + valueLabelPadding) * Math.sin(middleAngle / 180 * Math.PI);
      var tcy = y0 - (innerRadius + valueLabelPadding) * Math.cos(middleAngle / 180 * Math.PI);

      var tx = 0;
      var ty = tcy - textHeight / 2 - textHeight / 2 * Math.cos(middleAngle / 180 * Math.PI);

      var transformOrigin = null;
      if (90 >= middleAngle) {
        tx = tcx;
        transformOrigin = "left bottom";
      } else if (180 >= middleAngle) {
        tx = tcx;
        transformOrigin = "left top";
      } else if (270 >= middleAngle) {
        tx = tcx - textWidth;
        transformOrigin = "right top";
      } else {
        tx = tcx - textWidth;
        transformOrigin = "right bottom";
      }

      if (Raphael.vml) {
        tx += 2;
        ty += 1;
      }

      textElement.style.left = tx + "px";
      textElement.style.top = ty + "px";
      if (isWebkitFontScale) { //CHROME下有字体限制
        var scale = fontStyle.size / (this._CONST.WEBKITMINFONTSIZE - 0);
        textElement.style.fontSize = (this._CONST.WEBKITMINFONTSIZE - 0) + "px";
        textElement.style.webkitTransform = "scale(" + scale + ")";
        textElement.style.webkitTransformOrigin = transformOrigin;
      }
    } else {
      //LINE
      //var oRadius = ;
      var r0 = innerRadius + labelLinePadding;
      var lx0 = Math.floor(x0 + r0 * Math.sin(middleAngle / 180 * Math.PI));
      var ly0 = Math.floor(y0 - r0 * Math.cos(middleAngle / 180 * Math.PI));
      var lx1 = 0;
      var ly1 = 0;
      var lx2 = 0;
      var ly2 = 0;
      var r1 = (this._CONST.ENABLE === valueLabelOutside ? outterRadius : innerRadius) + labelLinePadding + labelLineClearance;

      if (180 >= middleAngle) {
        if (this._CONST.ENABLE === labelLineSlanted) {
          lx1 = Math.floor(x0 + r1 * Math.sin(middleAngle / 180 * Math.PI));
          ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
          lx2 = lx1 + labelLineDistance;
          ly2 = ly1;
        } else {
          lx1 = lx0;
          ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
          lx2 = lx1 + labelLineDistance;
          ly2 = ly1;
        }
      } else {
        if (this._CONST.ENABLE === labelLineSlanted) {
          lx1 = Math.floor(x0 + r1 * Math.sin(middleAngle / 180 * Math.PI));
          ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
          lx2 = lx1 - labelLineDistance;
          ly2 = ly1;
        } else {
          lx1 = lx0;
          ly1 = Math.floor(y0 - r1 * Math.cos(middleAngle / 180 * Math.PI));
          lx2 = lx1 - labelLineDistance;
          ly2 = ly1;
        }
      }

      if (Raphael.svg && this._isOdd(labelLineThickness)) {
        ly1 += 0.5;
        ly2 += 0.5;

        if (this._CONST.ENABLE !== labelLineSlanted) {
          lx0 += 0.5;
          lx1 += 0.5;
        }
      } else if (Raphael.vml && !this._isOdd(labelLineThickness)) {
        ly1 += 0.5;
        ly2 += 0.5;

        if (this._CONST.ENABLE !== labelLineSlanted) {
          lx0 += 0.5;
          lx1 += 0.5;
        }
      }

      var path = [];
      path[path.length] = ["M", lx0, ly0];
      path[path.length] = ["L", lx1, ly1];
      path[path.length] = ["L", lx2, ly2];
      this._paper.path(path)
        .attr({
          "stroke": labelLineColor,
          "stroke-width": labelLineThickness,
          "stroke-opacity": labelLineAlpha,
          "stroke-dasharray": labelLineDashedStyle
        });

      //LABEL
      var fontSize = null;
      if (isWebkitFontScale) {  //CHROME下有字体限制
        fontSize = this._CONST.WEBKITMINFONTSIZE - 0;

      } else {
        fontSize = fontStyle.size;
      }
      var textElement = this._createText({
        "text": data.valueLabel,
        "cx": hx,
        "cy": hy,
        "angle": 0,
        "font-family": fontStyle.font,
        "font-size": fontSize,
        "font-color": fontStyle.color,
        "font-weight": fontStyle.bold,
        "text-align": this._CONST.TEXTALIGN.CENTER,
        "transform-origin": "center center"
      });
      var textWidth = textElement.clientWidth;
      var textHeight = textElement.clientHeight;

      var tx = null;
      var ty = null;
      if (180 >= middleAngle) {
        tx = lx2 + valueLabelPadding;
        ty = ly2 - textHeight / 2;
        transformOrigin = "left center";

      } else {
        tx = lx2 - textWidth - valueLabelPadding;
        ty = ly2 - textHeight / 2;
        transformOrigin = "right center";
      }

      if (Raphael.vml) {
        tx += 2;
        ty += 1;
      }

      textElement.style.left = tx + "px";
      textElement.style.top = ty + "px";
      if (isWebkitFontScale) { //CHROME下有字体限制
        var scale = fontStyle.size / (this._CONST.WEBKITMINFONTSIZE - 0);
        textElement.style.fontSize = (this._CONST.WEBKITMINFONTSIZE - 0) + "px";
        textElement.style.webkitTransform = "scale(" + scale + ")";
        textElement.style.webkitTransformOrigin = transformOrigin;
      }

      textElement["click-data"] = data.click;
      textElement["mouseover-data"] = data.mouseover;
      textElement["mousemove-data"] = data.mousemove;
      textElement["mouseout-data"] = data.mouseout;
      textElement["tooltip-data"] = data.toolTip;
    }
  };

  //画基础图形
  _p._drawBase = function (chart) {
    //Event
    this._createEventHandler(chart);
    //Transparent
    this._createTransparent(chart);
    //Border
    this._createBorder(chart);
    //Background
    this._createBg(chart);
    //Legend
    this._createLegend(chart);
    //PYAxisName
    this._createPYAxisName(chart);
    //SYAxisName
    this._createSYAxisName(chart);
    //Caption
    this._createCaption(chart);
    //SubCaption
    this._createSubCaption(chart);
    //xAxisName
    this._createXAxisName(chart);
    //Create canvas
    this._createCanvasBg(chart);
  };


  //初始化BBOX
  _p._initBBox = function (chart) {

    //初始化边框BBOX
    var borderBBox = this._getBorderBBox(chart);
    this._drawBBox(borderBBox);

    //初始化背景BBOX
    var bgBBox = this._getBgBBox(chart);
    this._drawBBox(bgBBox);

    //初始化Legend BBOX
    var legendBBox = this._getLegendBBox(chart);
    this._drawBBox(legendBBox);

    //初始化YAXISNAME BBOX
    var PYAxisNameBBox = this._getPYAxisNameBBox(chart);
    this._drawBBox(PYAxisNameBBox);

    //初始化YAXISNAME BBOX
    var SYAxisNameBBox = this._getSYAxisNameBBox(chart);
    this._drawBBox(SYAxisNameBBox);

    //初始化YAXISLABEL BBOX
    var PYAxisLabelBBox = this._getPYAxisLabelBBox(chart);
    this._drawBBox(PYAxisLabelBBox);

    //初始化YAXISLABEL BBOX
    var SYAxisLabelBBox = this._getSYAxisLabelBBox(chart);
    this._drawBBox(SYAxisLabelBBox);

    //初始化Caption
    var captionBBox = this._getCaptionBBox(chart);
    this._drawBBox(captionBBox);

    //初始化subCaption
    var subCaptionBBox = this._getSubCaptionBBox(chart);
    this._drawBBox(subCaptionBBox);

    //初始化XAXISNAME BBOX
    var xAxisNameBBox = this._getXAxisNameBBox(chart);
    this._drawBBox(xAxisNameBBox);

    //初始化XAXISLABLE BBOX
    var xAxisLabelBBox = this._getXAxisLabelBBox(chart);
    this._drawBBox(xAxisLabelBBox);

    //初始化GRDI BBOX
    var canvasBBox = this._getCanvasBBox(chart);
    this._drawBBox(canvasBBox);
  };

  //获得Y轴分隔信息
  _p._getYAxisDiv = function (chart, parentYAxis, posReg, divLineNum, divLineRoundNumber) {

    var min = Number.MAX_VALUE;
    var max = 0 - Number.MAX_VALUE;

    //data
    var bezierDatasets = [];
    var datasets = chart.dataset;
    if (datasets) {
      var stackedValueMap = {};
      for (var i = 0, ii = datasets.length; i < ii; i++) {
        var dataset = datasets[i];
        if (parentYAxis !== dataset.parentYAxis) {
          continue;
        }
        var pattern = dataset.pattern;
        var stackedGroup = dataset.stackedGroup;
        var lineCurvature = Math.floor(dataset.lineCurvature - 0) / 100;
        var datas = dataset.set;
        if (!datas) {
          continue;
        }

        var bezierDataset = [];
        for (var j = 0, jj = datas.length; j < jj; j++) {
          var data = datas[j];
          var value = (data.y || data.value || "0") - 0;
          if (stackedGroup) {
            var stackedValueId = pattern + "_" + stackedGroup + "_" + j;
            if ("undefined" !== typeof stackedValueMap[stackedValueId]) {
              value = stackedValueMap[stackedValueId] += value;
            } else {
              stackedValueMap[stackedValueId] = value;
            }
          }
          min = min > value ? value : min;
          max = max < value ? value : max;

          bezierDataset[bezierDataset.length] = value;
        }
        if ((this._CONST.PATTERN.LINE === pattern || this._CONST.PATTERN.AREA === pattern) && 0 < lineCurvature) {
          bezierDatasets[bezierDatasets.length] = {
            "datas": bezierDataset,
            "curvature": lineCurvature
          }
        }
      }
    }

    //Bezier
    if (bezierDatasets.length) {
      var pos = posReg.pos;
      var reg = posReg.reg;

      var gridWidth = this._holderWidth - 0;
      var categoryWidth = gridWidth / chart.categories.category.length;
      for (var i = 0, ii = bezierDatasets.length; i < ii; i++) {
        var datas = bezierDatasets[i].datas;
        var curvature = bezierDatasets[i].curvature;
        for (var j = 1, jj = datas.length - 1; j < jj; j++) {
          var bezierAnchor = this._calcBezierAnchor(chart.rotateXY,
            {"x": 0, "y": datas[j - 1]},
            {"x": categoryWidth, "y": datas[j]},
            {"x": 2 * categoryWidth, "y": datas[j + 1]},
            curvature);
          var cy0 = bezierAnchor.cp0.y;
          var cy1 = bezierAnchor.cp1.y;

          if (pos && !reg) {
            max = max < cy0 ? cy0 : max;
            max = max < cy1 ? cy1 : max;
          }
          if (!pos && reg) {
            min = min > cy0 ? cy0 : min;
            min = min > cy1 ? cy1 : min;
          }
        }
      }
    }

    //trendline
    var hTrendlines = chart.hTrendlines;
    if (hTrendlines) {
      var lines = hTrendlines.line;
      if (lines) {
        for (var i = 0, ii = lines.length; i < ii; i++) {
          var line = lines[i];
          if (parentYAxis !== line.parentYAxis) {
            continue;
          }
          var startValue = line.startValue;
          var endValue = line.endValue;

          if (!endValue) {
            continue;
          }

          min = min > startValue ? startValue : min;
          max = max < startValue ? startValue : max;

          min = min > endValue ? endValue : min;
          max = max < endValue ? endValue : max;
        }
      }
    }
    if (this._CONST.AXIS.SY === parentYAxis &&  //Only 4 SYAxis
      (Number.MAX_VALUE === min || (0 - Number.MIN_VALUE) === max)) {
      return null;
    }

    var each = 0;
    var totalDivs = divLineNum + 1;
    var divs = 0;
    var smallDivs = 0;
    if (Number.MAX_VALUE === min || Number.MIN_VALUE === max) {
      min = 0;
      max = 0;
      divs = totalDivs;
      smallDivs = 0;
      each = 1;
    } else {
      //开始算each
      var small = 0;
      var big = 0;
      var absMin = Math.abs(min);
      var absMax = Math.abs(max);
      if ((0 > min && 0 > max) ||
        (0 < min && 0 < max)) {
        small = 0;
        big = absMin > absMax ? absMin : absMax;
      } else {
        small = absMin < absMax ? absMin : absMax;
        big = absMin > absMax ? absMin : absMax;
      }
      divs = Math.ceil(big / (small + big) * totalDivs);
      var per = big / divs;
      var sci = this._getScientific(per, 1);
      var pow = Math.pow(10, sci);
      var round = divLineRoundNumber;
      var each = Math.ceil(per / pow / round) * pow * round;
      if (per * 1.03 > each) {
        per = 1.03 * per;
        sci = this._getScientific(per, 1);
        pow = Math.pow(10, sci);
        each = Math.ceil(per / pow / round) * pow * round;
      }
    }

    var big = (totalDivs - divs) > divs ?
      (totalDivs - divs) : divs;
    var small = totalDivs - big;
    var start = 0;
    var end = 0;
    if (0 > min && 0 > max) {
      start = 0 - big;
      end = 0 - small;
    } else if (0 > min && 0 <= max) {
      if (Math.abs(min) >= Math.abs(max)) {
        start = 0 - big;
        end = small;
      } else {
        start = 0 - small;
        end = big;
      }
    } else {
      start = 0;
      end = divs;
    }

    return {
      "start": start,
      "end": end,
      "each": each
    };
  };

  //计算是否含有正负数
  _p._getPosReg = function (chart) {
    var pos = false;
    var reg = false;

    //data
    var datasets = chart.dataset;
    if (datasets) {
      for (var i = 0, ii = datasets.length; i < ii; i++) {
        var datas = datasets[i].set;
        if (!datas) {
          continue;
        }
        for (var j = 0, jj = datas.length; j < jj; j++) {
          var data = datas[j];
          if (!data) {
            continue;
          }
          var value = data.y - 0;
          if (!pos && 0 < value) {
            pos = true;
          }
          if (!reg && 0 > value) {
            reg = true;
          }
        }
      }
    }

    //trendline
    var hTrendlines = chart.hTrendlines;
    if (hTrendlines) {
      var lines = hTrendlines.line;
      if (lines) {
        for (var i = 0, ii = lines.length; i < ii; i++) {
          var line = lines[i];
          var startValue = line.startValue || "0" - 0;
          var endValue = (null == line.endValue || "" == line.endValue) ?
            0 : (line.endValue - 0);

          if (!pos && (0 < startValue || 0 < endValue)) {
            pos = true;
          }
          if (!reg && (0 < endValue || 0 < endValue)) {
            reg = true;
          }
        }
      }
    }

    return {
      "pos": pos,
      "reg": reg
    };
  };

}).call(this, window);
