import { useRouter } from 'next/router'
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import NavTab from "./NavTab";
import TabsContainer from "./TabsContainer";
import useCurrentTab from "./useCurrentTab";

const TabsNavigation = () => {
  const { t } = useTranslation();
  const params = useParams();

  const currentTab = useCurrentTab();

  return (
    <div>
      <TabsContainer value={currentTab}>
        <NavTab
          to={r.shareholding.resolutions.show.overview({ id: params.id })}
          label={t("pages.shareholding.resolutions.overview")}
          value="overview"
        />
        <NavTab
          to={r.shareholding.resolutions.show.args({ id: params.id })}
          label={t("pages.shareholding.resolutions.prosAndCons")}
          value="arguments"
        />
        <NavTab
          to={r.shareholding.resolutions.show.statistics({ id: params.id })}
          label={t("pages.shareholding.resolutions.statistics")}
          value="statistics"
        />
        <NavTab
          to={r.shareholding.resolutions.show.news({ id: params.id })}
          label={t("pages.shareholding.resolutions.news")}
          value="news"
        />
        <NavTab
          to={r.shareholding.resolutions.show.comments({ id: params.id })}
          label={t("pages.shareholding.resolutions.discussion")}
          value="comments"
        />
      </TabsContainer>
    </div>
  );
};

export default TabsNavigation;
