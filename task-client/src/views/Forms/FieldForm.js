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

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import Axios from "axios";
import { APIURL } from "constants/AppConstants";
import { FormControl, Select, MenuItem } from "@material-ui/core";

class FieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      area: null,
      crops: [],
      crop_id: null
    };
  }

  componentDidMount() {
    Axios.get(`${APIURL}/crops`)
      .then(response => {
        this.setState({
          crops: response.data.data
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  submit = () => {
    const { name, area, crop_id } = this.state;

    if (name && area && crop_id) {
      Axios.post(`${APIURL}/fields`, {
        name: name,
        area: area,
        crop_id: crop_id
      })
        .then(response => {
          console.log(response);
          this.props.history.push("/admin/fields");
        })
        .catch(error => {
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

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="flex-end">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Field Form</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Field Name
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <CustomInput
                      id="help-text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "name",
                        value: this.state.name,
                        onChange: this.handleChange,
                        placeholder: "Name"
                      }}
                      helpText="Wheat, Rice"
                    />
                  </GridItem>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Field Area
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
                      Crop
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={8} md={8} lg={8}>
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
                        value={this.state.crop_id}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "crop_id",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Crop
                        </MenuItem>
                        {this.state.crops.length > 0 &&
                          this.state.crops.map(el => (
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

                  <GridItem xs={6} sm={3} md={3}>
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

export default withStyles(styles)(FieldForm);
