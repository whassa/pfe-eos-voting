import CardContainer from "@common/Cards/CardContainer";
import { makeStyles } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./proposalDetails.css";

const useStyles = makeStyles(styles);

const propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};

const ProposalDetails = ({ details }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <CardContainer title={t("pages.shareholding.resolutions.details")}>
      <TableContainer className={classes.table}>
        <Table>
          <TableBody>
            {details.map((detail) => (
              <TableRow key={detail.name}>
                <TableCell size={"small"} className={classes.detailsName}>
                  {`${detail.name}:`}
                </TableCell>
                <TableCell size={"small"} className={classes.detailsValue}>
                  {detail.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContainer>
  );
};

ProposalDetails.propTypes = propTypes;

export default ProposalDetails;
