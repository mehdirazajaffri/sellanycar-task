import React, { Component } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Datetime from "react-datetime";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import Axios from "axios";
import { APIURL } from "constants/AppConstants";
import { FormControl, Select, MenuItem } from "@material-ui/core";

class ProcessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      area: null,
      fields: [],
      field_id: null,
      date: new Date(),
      tractor: null,
      tractors: []
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/fields`)
      .then(response => {
        this.setState({
          fields: response.data.data
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });

    Axios.get(`${APIURL}/tractors`)
      .then(response => {
        this.setState({
          tractors: response.data.data
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  submit = () => {
    const { name, area, field_id, tractor, date } = this.state;

    if ((name && area && field_id, tractor)) {
      Axios.post(`${APIURL}/processes`, {
        name: name,
        area: area,
        field_id: field_id,
        tractor_id: tractor,
        date: date.format("YYYY-MM-DD")
      })
        .then(response => {
          console.log(response);
          this.props.history.push("/admin/processes");
        })
        .catch(error => {
          this.setState({
            error: error.response.data.message
          });
          console.log(error);
        });
    }
  };

  handleChange = evt => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  };

  handleDateChange = value => {
    this.setState({
      date: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="flex-end">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Process Form</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Area you have processed so far ?
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="area-text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        name: "area",
                        value: this.state.area,
                        onChange: this.handleChange,
                        placeholder: "Area"
                      }}
                      helpText="Area in Sq. yards"
                    />
                  </GridItem>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Field
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.field_id}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "field_id",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Field
                        </MenuItem>
                        {this.state.fields.length > 0 &&
                          this.state.fields.map(el => (
                            <MenuItem
                              key={el.id}
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value={el.id}
                            >
                              {el.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Tractor
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.tractor}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "tractor",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Tractor
                        </MenuItem>
                        {this.state.tractors.length > 0 &&
                          this.state.tractors.map(el => (
                            <MenuItem
                              key={el.id}
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value={el.id}
                            >
                              {el.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Date
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <FormControl fullWidth>
                      <Datetime
                        timeFormat={false}
                        dateFormat="YYYY-MM-DD"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                        inputProps={{
                          placeholder: "Date Picker Here"
                        }}
                      />
                    </FormControl>
                  </GridItem>

                  {this.state.error && <h5>{this.state.error}</h5>}

                  <GridItem xs={12} sm={3} md={8} justify="flex-end">
                    <Button color="rose" onClick={this.submit}>
                      Submit
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ProcessForm);
