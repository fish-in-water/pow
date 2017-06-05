# POW

## 0. 前言

POW是一个早期的探索项目。

POW基于Rapheal图形库，以SVG&VML技术为基础，结合完善的参数体系，简单便捷定制具有交互性的图形报表。适用于IE6+、Chrome、Firefox、Opera、Safari，无需额外插件。

在线实例：	http://111.231.10.229/pow/examples/index.html

查看文档：	http://111.231.10.229/pow/doc/POW.html 或 doc/POW.docx




## 1. 快速开始

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>POW - Quick Start</title>
  <style type="text/css">
    h1 {
      text-align: center;
    }

    #chart {
      margin: 0 auto;
      width: 800px;
      height: 400px;
      border: 1px solid gray;
    }
  </style>
</head>
<body>
<h1>My First POW Chart</h1>
<div id="chart">

</div>
</body>
<script type="text/javascript" src="../../lib/raphael/raphael-min.js"></script>
<script type="text/javascript" src="../../src/pow.chart.core.js"></script>
<script type="text/javascript" src="../../src/pow.chart.axis.js"></script>
<script type="text/javascript">
  var chart = new POW.Chart.Axis(document.getElementById('chart'));
  chart.setData({
      "caption": "Business Results",
      "categories": {
        "category": [
          {
            "label": "2014"
          },
          {
            "label": "2015"
          },
          {
            "label": "2016"
          }
        ]
      },
      "dataset": [
        {
          "set": [
            {
              "y": "27400",
              "fillColor": "8CA7BA"
            },
            {
              "y": "29800",
              "fillColor": "B59327"
            },
            {
              "y": "25800",
              "fillColor": "BA7345"
            }
          ]
        }
      ]
    }
  );
</script>
</html>



```



也可根据实际需要引入所需POW文件

| 文件                    | 描述                                  |
| --------------------- | ----------------------------------- |
| pow.chart.core.js     | 必选。 提供数据解析、图形绘制、图形计算等公共方法           |
| pow.chart.axis.js     | 轴图，通过定义数据类型指定柱图、线图、面积图、条形图、散列图、气泡图等 |
| pow.chart.pie.js      | 饼图                                  |
| pow.chart.doughnut.js | 环图                                  |
| pow.chart.radar.js    | 雷达图                                 |


