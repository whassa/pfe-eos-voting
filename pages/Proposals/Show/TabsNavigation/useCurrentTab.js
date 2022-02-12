import { useRouter } from 'next/router'
import { useRouteMatch } from "react-router-dom";

const values = {
  overview: "overview",
  args: "arguments",
  statistics: "statistics",
  news: "news",
  comments: "comments",
};

const useCurrentTab = () => {
  let currentTab;
  // const [currentTab, setCurrentTab] = useState();

  const overviewMatch = useRouteMatch({
    path: r.shareholding.resolutions.show.overview.path,
    exact: true,
  });
  const argumentsMatch = useRouteMatch({
    path: r.shareholding.resolutions.show.args.path,
    exact: true,
  });
  const statisticsMatch = useRouteMatch({
    path: r.shareholding.resolutions.show.statistics.path,
    exact: true,
  });
  const newsMatch = useRouteMatch({
    path: r.shareholding.resolutions.show.news.path,
    exact: true,
  });
  const commentsMatch = useRouteMatch({
    path: r.shareholding.resolutions.show.comments.path,
    exact: true,
  });

  if (overviewMatch) {
    currentTab = values.overview;
  } else if (argumentsMatch) {
    currentTab = values.args;
  } else if (statisticsMatch) {
    currentTab = values.statistics;
  } else if (newsMatch) {
    currentTab = values.news;
  } else if (commentsMatch) {
    currentTab = values.comments;
  } else {
    currentTab = values.overview;
  }

  return currentTab;
};

export default useCurrentTab;
