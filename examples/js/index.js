(function () {
  var cnt = 0;
  var loader = function (hanlder) {
    window.setTimeout(hanlder, cnt++ * 50);
  };

  loader(function () {
    $.ajax({
      url: './data/column.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#column')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/line.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#line')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/area.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#area')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/bar.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#bar')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/pie.json'
    }).then(function (data) {
      (new POW.Chart.Pie($('#pie')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/doughnut.json'
    }).then(function (data) {
      (new POW.Chart.Doughnut($('#doughnut')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/radar.json'
    }).then(function (data) {
      (new POW.Chart.Radar($('#radar')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/scatter.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#scatter')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/bubble.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#bubble')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/stacked-column.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#stacked-column')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/stacked-line.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#stacked-line')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/stacked-area.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#stacked-area')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/stacked-bar.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#stacked-bar')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/dy-column.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#dy-column')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/dy-bar.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#dy-bar')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/combi-column.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#combi-column')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/combi-bar.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#combi-bar')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/negative.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#negative')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/pos-neg.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#pos-neg')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/map.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#map')[0])).setData(data);
    });
  });

  loader(function () {
    $.ajax({
      url: './data/mixed.json'
    }).then(function (data) {
      (new POW.Chart.Axis($('#mixed')[0])).setData(data);
    });
  });


  return;





  loader(function () {
    (new POW.Chart.Axis('mixed', '800', '450')).setDataURL('./data/xml/MixedDYCombi.xml');
  });

}).call(this);
