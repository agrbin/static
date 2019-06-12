// inspired from https://visjs.org/examples/network/data/dynamicData.html
// TODO: visualize timeline
// TODO: write some stats and when was the data last refreshed
function draw() {
  var nodes = new vis.DataSet();
  var num_reached = 0;
  var num_total = 0;
  window.status_data.peeps.forEach(function (person, index) {
    var node = {
      id: person.id,
      label: person.initial,
      color: (person.gender == "m" ?
          "#9bc1ff" :
          "#f5ceff"),
    };
    if (!person.reached) {
      node.fixed = true;
      node.x = -300 + index * 20;
      node.y = 250;
      node.mass = 1;
    } else {
      num_reached++;
    }
    num_total++;
    nodes.add(node);
  });

  var stats = num_reached + "/" + num_total + " ljudi kontaktirano.";
  document.getElementById("stats").innerHTML = stats;

  // create an array with edges
  var edges = new vis.DataSet();
  window.status_data.responses.forEach(function (row) {
    row.src_ids.forEach(function (src_id) {
      edges.add({
        id: row.name_id + "-" + src_id,
        from: src_id,
        to: row.name_id,
        color: {
          inherit: false,
          color: "gray",
        },
        arrows: "to",
      })
    });
  });

  // create a network
  var container = document.getElementById('network');
  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    physics: {
      barnesHut: {
        springLength: 20,
        springConstant: 0.1,
      },
    },
    layout: {
      randomSeed: 1,
    },
    interaction: {
      dragView: false,
      zoomView: false,
      selectConnectedEdges: false,
    },
  };
  var network = new vis.Network(container, data, options);
}
