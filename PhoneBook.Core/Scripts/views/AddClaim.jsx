﻿var Autocomplete = require('react-autocomplete');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            Email: '',
            NameOfClaim: '',
            Users: []
    };
    },
    getFromServer: function () {
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "GET",
            url: '/api/PhoneBook/All'
        }).success((data) => {
            console.log(data);
            this.setState({ Users: data });
        }).fail(function (error) {
            console.log("error: ", error.responseText);
            alert(error.responseText);
        });
    },
    componentDidMount: function() {
        this.getFromServer();
    },
    sendToServer: function() {
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        var data = {
            Email: this.refs.EmailOfUser.value,
            NameOfClaim: this.refs.NameOfClaim.value
        }
        console.log(data);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(()=> {
            ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
        }).fail(function (error) {
            console.log("error: ", error.responseText);
            alert(error.responseText);
        });
    },
    render: function() {
        return (
            <div>
                <form onSubmit={this.sendToServer}>
                    <select className="form-control" ref="EmailOfUser">
                        {this.state.Users.map((u) => {
                    return (<option value={u.Email}>{u.Email}</option>);
                })}
                    </select>
                <select className="form-control" ref="NameOfClaim">
                      <option value="Admin">Administrator</option>
                      <option value="User">User</option>
                </select>
                    <button className="btn btn-success" type="submit">Submit</button>
</form>
            </div>
            );
    }
});