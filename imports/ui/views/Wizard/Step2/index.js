import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = {
  selectType: {
    minWidth: 250
  },
  textField: {
    minWidth: 250
  },
  subtitle: {
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.5
  },
  paragraph: {
    color: "#898989",
    lineHeight: 1.75,
    fontSize: "16px",
    margin: "0 0 10px",
    fontFamily: "Roboto",
    fontWeight: 400
  }
};

class Step2 extends Component {
  constructor(props) {
    super(props);
  }

  updateEsType = event => {
    const { updateCfgEsType } = this.props;
    updateCfgEsType(event.target.value);
  };

  updateCfgEsHost = event => {
    const { updateCfgEsHost } = this.props;
    updateCfgEsHost(event.target.value);
  };

  updateCfgEssId = event => {
    const { updateCfgEssId } = this.props;
    updateCfgEssId(event.target.value);
  };

  updateCfgEssUsername = event => {
    const { updateCfgEssUsername } = this.props;
    updateCfgEssUsername(event.target.value);
  };

  updateCfgEssPassword = event => {
    const { updateCfgEssPassword } = this.props;
    updateCfgEssPassword(event.target.value);
  };

  render() {
    const {
      classes,
      cfgEsType,
      cfgEsHost,
      cfgEssId,
      cfgEssUsername,
      cfgEssPassword
    } = this.props;

    return (
      <React.Fragment>
        <p className={classes.paragraph}>
          You can decide between providing the full URL to an Elasticsearch
          instance or Elastic Cloud credentials
        </p>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={6} sm container>
            <FormControl className={classes.selectType}>
              <InputLabel htmlFor="host-type">Host type</InputLabel>
              <Select
                value={cfgEsType}
                id="estype"
                onChange={this.updateEsType}
                inputProps={{
                  name: "Host-type",
                  id: "cfg_es_type"
                }}
              >
                <MenuItem value={"elasticsearch"}>Elasticsearch Host</MenuItem>
                <MenuItem value={"elasticcloud"}>Elastic Cloud</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm container>
            {cfgEsType === "elasticsearch" ? (
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={0}
              >
                <Grid item>
                  <TextField
                    id="escluster"
                    label="Elasticsearch cluster"
                    onChange={this.updateCfgEsHost}
                    defaultValue={cfgEsHost}
                    className={classes.textField}
                    helperText="Such as: https://username:password@hostname:port"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={0}
              >
                <Grid item>
                  <TextField
                    id="essid"
                    label="Elastic Cloud ID"
                    defaultValue={cfgEssId}
                    onChange={this.updateEsType}
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    id="essusername"
                    label="Username"
                    defaultValue={cfgEssUsername}
                    onChange={this.updateEsType}
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    id="esspassword"
                    label="Password"
                    type="password"
                    defaultValue={cfgEssPassword}
                    onChange={this.updateEsType}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Step2.propTypes = {};

const mapState = state => ({
  cfgEsType: state.global.cfg_es_type,
  cfgEsHost: state.global.cfg_es_host,
  cfgEssId: state.global.cfg_ess_id,
  cfgEssUsername: state.global.cfg_ess_username,
  cfgEssPassword: state.global.cfg_ess_password
});

const mapDispatch = dispatch => ({
  updateCfgEsType: dispatch.global.updateCfgEsType,
  updateCfgEsHost: dispatch.global.updateCfgEsHost,
  updateCfgEssId: dispatch.global.updateCfgEssId,
  updateCfgEssUsername: dispatch.global.updateCfgEssUsername,
  updateCfgEssPassword: dispatch.global.updateCfgEssPassword
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Step2));
