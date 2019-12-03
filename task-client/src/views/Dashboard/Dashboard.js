/* eslint-disable react/jsx-key */
import React, { Component } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { emailsSubscriptionChart } from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { isConstructorDeclaration } from "typescript";
import Axios from "axios";
import { APIURL } from "constants/AppConstants";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsData: [],
      statsData: []
    };
  }

  prepareData = (data = []) => {
    let fieldsProcessing = [];

    data.forEach(obj => {
      let labels = [];
      let series = [];
      obj.processes.forEach(val => {
        labels.push(val.date.toString());
        series.push(val.area);
      });
      fieldsProcessing.push({
        data: { labels: labels, series: series },
        field: { ...obj }
      });
    });
    return fieldsProcessing;
  };

  componentDidMount() {
    Axios.get(`${APIURL}/fields-data`)
      .then(response => {
        console.log(response.data.data);
        let data = response.data.data;
        // let data = this.prepareData(response.data.data);
        this.setState({
          fieldsData: data
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    Axios.get(`${APIURL}/stats`)
      .then(response => {
        console.log(response.data.data);
        this.setState({
          statsData: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const { statsData, fieldsData } = this.state;
    console.log(fieldsData);
    return (
      <div>
        <h3>Total Coverage</h3>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Total Coverage</p>
                <h3 className={classes.cardTitle}>
                  {statsData.processedArea}/{statsData.totalArea} sq Yards
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <h2>Fields Coverage</h2>

        <GridContainer>
          {fieldsData.map(data => (
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>{data.name}</p>
                  <h3 className={classes.cardTitle}>
                    {data.totalProcessedArea} is processed
                  </h3>
                  <p className={classes.cardTitle}>{data.leftProcessedArea} needs to be processed</p>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Total Area is {data.area}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
