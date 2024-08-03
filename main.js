async function createChart() {
  Estateguru = await fetch("data/estateguru.json").then((res) => res.json());
  Mintos = await fetch("data/mintos.json").then((res) => res.json());
  Peerberry = await fetch("data/peerberry.json").then((res) => res.json());
  Twino = await fetch("data/twino.json").then((res) => res.json());
  Esketit = await fetch("data/esketit.json").then((res) => res.json());
  Robocash = await fetch("data/robocash.json").then((res) => res.json());
  Income = await fetch("data/income.json").then((res) => res.json());
  Lande = await fetch("data/lande.json").then((res) => res.json());
  Bondora = await fetch("data/bondora.json").then((res) => res.json());
  Finbee = await fetch("data/finbee.json").then((res) => res.json());
  Indemo = await fetch("data/indemo.json").then((res) => res.json());
  // Data
  const data = {
    datasets: [
      {
        label: "Mintos",
        backgroundColor: "rgb(36, 198, 177)",
        borderColor: "rgb(36, 198, 177)",
        data: [],
        pointRadius: 2,
      },
      {
        label: "Estateguru",
        backgroundColor: "rgb(17, 172, 221)",
        borderColor: "rgb(17, 172, 221)",
        data: Estateguru,
        pointRadius: 2,
      },
      {
        label: "Peerberry",
        backgroundColor: "rgb(62, 228, 164)",
        borderColor: "rgb(62, 228, 164)",
        data: Peerberry,
        pointRadius: 2,
      },
      {
        label: "Twino",
        backgroundColor: "rgb(48, 83, 179)",
        borderColor: "rgb(48, 83, 179)",
        data: Twino,
        pointRadius: 2,
      },
      {
        label: "Esketit",
        backgroundColor: "rgb(11, 5, 43)",
        borderColor: "rgb(11, 5, 43)",
        data: Esketit,
        pointRadius: 2,
      },
      {
        label: "Robocash",
        backgroundColor: "rgb(22, 148, 113)",
        borderColor: "rgb(22, 148, 113)",
        data: Robocash,
        pointRadius: 2,
      },
      {
        label: "Income",
        backgroundColor: "rgb(57, 169, 251)",
        borderColor: "rgb(57, 169, 251)",
        data: [],
        pointRadius: 2,
      },
      {
        label: "Lande",
        backgroundColor: "rgb(29, 156, 214)",
        borderColor: "rgb(29, 156, 214)",
        data: [],
        pointRadius: 2,
      },
      {
        label: "Bondora",
        backgroundColor: "rgb(156, 221, 75)",
        borderColor: "rgb(156, 221, 75)",
        data: [],
        pointRadius: 2,
      },
      {
        label: "Finbee",
        backgroundColor: "rgb(252, 198, 77)",
        borderColor: "rgb(252, 198, 77)",
        data: Finbee,
        pointRadius: 2,
      },
      {
        label: "Indemo",
        backgroundColor: "#0F68D2",
        borderColor: "#0F68D2",
        data: Indemo,
        pointRadius: 2,
      },
    ],
  };
  // Configuration
  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          type: "time",
          ticks: {
            color: "black",
            maxTicksLimit: 10,
          },
          grid: {
            color: "grey",
          },
        },
        y: {
          display: true,
          ticks: {
            format: {
              notation: "compact",
            },
            count: 5,
            color: "black",
          },
          grid: {
            color: "grey",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            title: (context) => {
              console.log(context);
              const d = new Date(context[0].parsed.x);
              const formattedDate = d.toLocaleString([], {
                month: "short",
                year: "numeric",
              });
              return formattedDate;
            },
          },
        },
      },
    },
  };
  // Creation of the Chart
  myChart = new Chart(document.getElementById("myChart"), config);
}
createChart();

function toggle(plattform) {
  var checkBox = document.getElementById(plattform);
  if (checkBox.checked == false) {
    for (let index = 0; index < myChart.data.datasets.length; index++) {
      if (myChart.data.datasets[index].label == plattform) {
        myChart.data.datasets[index].data = [];
      }
    }
  } else {
    for (let index = 0; index < myChart.data.datasets.length; index++) {
      if (myChart.data.datasets[index].label == plattform) {
        myChart.data.datasets[index].data = window[plattform];
      }
    }
  }
  myChart.update();
}
