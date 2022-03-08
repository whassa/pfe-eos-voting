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
      x: [],
      y: [],
    };
    let nbrOfVotes = 0;
    votesList.map((vote) => {
      if (vote.value === voteType) {
        nbrOfVotes++;
        const newVote = {
          x: dayjs(vote.updatedAt).valueOf(),
          y: nbrOfVotes,
        };
        voteData.x.push(newVote.x);
        voteData.y.push(newVote.y);
      }
    });
    const lastVote = votesList[votesList.length - 1];
    if (lastVote && lastVote?.value !== voteType) {
      voteData.x.push(dayjs(lastVote.updatedAt).valueOf());
      voteData.y.push(nbrOfVotes);
    }
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
                    size: 14
                }
            },
        },
        layout: {
            padding: 5
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const labels = [
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

    const data = {
        labels,
        datasets: [
            {
                label: "Yes",
                data: valueOverTime(dataVotes, 1).y,
                fill: false,
                borderColor: 'rgb(0, 255, 0)'
              },
              {
                label: "No",
                data: valueOverTime(dataVotes, -1).y,
                fill: false,
                borderColor: 'rgb(255, 0, 0)'
              },
              {
                label: "Refrain",
                data: valueOverTime(dataVotes, 0).y,
                fill: false,
                borderColor: 'rgb(0, 0, 255)'
              }
        ],
    };

    return (
        <Line
            data={data}
            options={options}
        />
    );
}
