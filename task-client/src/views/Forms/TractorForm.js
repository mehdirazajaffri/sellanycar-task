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

class TractorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  submit = () => {
    const { name } = this.state;

    Axios.post(`${APIURL}/tractors`, {
      name: name
    })
      .then(response => {
        console.log(response);
        this.props.history.push("/admin/tractors");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handle = event => {
    this.setState({
      name: event.target.value
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
                <h4 className={classes.cardTitle}>Tractor Form</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Tractor Name
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
                        value: this.state.name,
                        onChange: this.handle,
                        placeholder: "Name"
                      }}
                      helpText="Caterpillar"
                    />
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

export default withStyles(styles)(TractorForm);
