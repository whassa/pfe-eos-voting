import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function valueOverTime(votesList, voteType) {
  let voteData = {
    coordinate: [],
  };

  votesList.map((vote) => {
    if (vote.value === voteType) {
      const data = voteData.coordinate.find(
        ({ x }) => x === dayjs(vote.updatedAt).month()
      );

      if (data) {
        data.y = data.y + 1;
      } else {
        voteData.coordinate.push({
          x: dayjs(vote.updatedAt).month(),
          y: 1,
        });
      }
    }
  });
  return voteData;
}

export default function Chart({ dataVotes }) {
  //Chart options and data
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Vote Tracker",
        align: "start",
        font: {
          size: 14,
        },
      },
    },
    layout: {
      padding: 5,
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let labels = [];

  //Insert only the months that have votes.
  const voteMonth = valueOverTime(dataVotes, 1).coordinate;
  for (let i = 0; i < voteMonth.length; i++) {
    if (!labels.includes(months[voteMonth[i]])) {
      labels.push(months[voteMonth[i].x]);
    }
  }

  let voteMonths = { 1: [], 0: [], "-1": [] };

  for (let i = -1; i < 2; i++) {
    valueOverTime(dataVotes, i).coordinate.map((coord) => {
      if (!labels.includes(voteMonths[voteMonths[i]])) {
        voteMonths[i].push(coord.y);
      }
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Yes",
        data: voteMonths[1],
        fill: false,
        borderColor: "rgb(0, 255, 0)",
      },
      {
        label: "No",
        data: voteMonths["-1"],
        fill: false,
        borderColor: "rgb(255, 0, 0)",
      },
      {
        label: "Refrain",
        data: voteMonths[0],
        fill: false,
        borderColor: "rgb(0, 0, 255)",
      },
    ],
  };

  return <Line data={data} options={options} />;
}
