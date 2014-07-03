/** @jsx React.DOM */
var _ = window._;
var bows = window.bows;
var React = window.React;

// tideline dependencies & plugins
// tideline dependencies & plugins
var tidelineBlip = window.tideline.blip;
var chartSettingsFactory = tidelineBlip.settings;

var Header = require('./header');
var Footer = require('./footer');

var tideline = {
  log: bows('Settings')
};

var Settings = React.createClass({
  chartType: 'settings',
  log: bows('Settings View'),
  propTypes: {
    chartPrefs: React.PropTypes.object.isRequired,
    patientData: React.PropTypes.object.isRequired,
    onClickRefresh: React.PropTypes.func.isRequired,
    onSwitchToDaily: React.PropTypes.func.isRequired,
    onSwitchToSettings: React.PropTypes.func.isRequired,
    onSwitchToWeekly: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      atMostRecent: true,
      inTransition: false,
      title: 'Device Settings'
    };
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div id="tidelineMain">
        <Header 
          chartType={this.chartType}
          atMostRecent={true}
          inTransition={this.state.inTransition}
          title={this.state.title}
          onClickMostRecent={this.handleClickMostRecent}
          onClickOneDay={this.handleClickOneDay}
          onClickRefresh={this.props.onClickRefresh}
          onClickTwoWeeks={this.handleClickTwoWeeks}
        ref="header" />
        <div className="container-box-outer patient-data-content-outer">
          <div className="container-box-inner patient-data-content-inner">
            <div className="patient-data-content">
              <SettingsChart
                bgUnits={this.props.chartPrefs.bgUnits}
                patientData={this.props.patientData}
                ref="chart" />
            </div>
          </div>
        </div>
        <Footer
         chartType={this.chartType}
         onClickSettings={this.props.onSwitchToSettings}
        ref="footer" />
      </div>
      );
    /* jshint ignore:end */
  },
  // handlers
  handleClickMostRecent: function(e) {
    if (e) {
      e.preventDefault();
    }
    return;
  },
  handleClickOneDay: function(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.onSwitchToDaily();
  },
  handleClickTwoWeeks: function(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.onSwitchToWeekly();
  }
});

var SettingsChart = React.createClass({
  chartOpts: ['bgUnits'],
  log: bows('Settings Chart'),
  propTypes: {
    bgUnits: React.PropTypes.string.isRequired,
    initialDatetimeLocation: React.PropTypes.string,
    patientData: React.PropTypes.object.isRequired,
  },
  componentDidMount: function() {
    this.mountChart(this.getDOMNode());
    this.initializeChart(this.props.patientData);
  },
  componentWillUnmount: function() {
    this.unmountChart();
  },
  mountChart: function(node, chartOpts) {
    this.log('Mounting...');
    this.chart = chartSettingsFactory(node, _.pick(this.props, this.chartOpts));
  },
  unmountChart: function() {
    this.log('Unmounting...');
    this.chart.destroy();
  },
  initializeChart: function(data) {
    this.log('Initializing...');
    if (_.isEmpty(data)) {
      throw new Error('Cannot create new chart with no data');
    }

    this.chart.load(data);
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div id="tidelineContainer" className="patient-data-chart"></div>
      );
    /* jshint ignore:end */
  }
});

module.exports = Settings;