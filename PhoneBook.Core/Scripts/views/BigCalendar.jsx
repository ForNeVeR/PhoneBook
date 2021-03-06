﻿var BigCalendar = require('react-big-calendar');
var moment = require('moment');
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

module.exports = React.createClass({
    getInitialState: function () {
        return {
            events: []
        };
    },
    componentDidMount: function () {
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token,
                'Content-Type': "application/json"
            },
            type: "GET",
            url: this.props.url
        }).success((users) => {
            this.setState({
                events: users.map(u => ({ title: u.FirstName, start: u.HolidayTimeStart, end: u.HolidayTimeEnd }))
            });
        }).fail(function () {
            alert("Error");
        });
    },
    render() {
        return (
            <div style={{height: 1000}}>
            <BigCalendar
                events={this.state.events}
                defaultDate={new Date(2016, 1, 1)}
                />
                </div>
        );
    }
});