﻿var AddUser = React.createClass({
    getInitialState: function() {
        return {};
    },
    submit: function(e) {
        var self;

        e.preventDefault();
        self = this;

        console.log(this.state);

        var data = {
            Email: $("#Email").val(),
            Password: $("#Password").val()
        };

        // Submit form via jQuery/AJAX
        $.ajax({
                type: "POST",
                url: this.props.url,
                data: data
            })
            .done(function(data) {
                self.clearForm();
            })
            .fail(function(jqXhr) {
                console.log("failed to register");
            });

    },
    clearForm: function() {
        this.setState({
            Email: "",
            Password: ""
        });
    },
    render: function() {
        return (
            <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
        </div>
        <div className="modal-body">
            <form onSubmit={this.submit}>
                <input placeholder="email" className="form-control" id="Email" type="email" name="Email" label="Email:"/>
                <input placeholder="password" className="form-control" id="Password" type="password" name="Password" label="Password:"/>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
        );
    }
});


var AuthUser = React.createClass({
    getInitialState: function() {
        return {};
    },
    submitAuth: function(e) {
        var self;

        e.preventDefault();
        self = this;

        console.log(this.state);

        var tokenKey = "tokenInfo";
        var userNameKey = "userName";

        var data = {
            grant_type: "password",
            username: $("#EmailAuth").val(),
            Password: $("#PasswordAuth").val()
        };

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function(data) {
            console.log(data);
            $("#whoLog").text(data.userName);
            $('#authBtn').css('visibility', 'hidden');
            $('#regBtn').css('visibility', 'hidden');
            $('#logOutBtn').css('visibility', 'visible');
            $("#hello").css('visibility', 'visible');
            $('#authorizationModal').modal('hide')
            // сохраняем в хранилище sessionStorage токен доступа
            sessionStorage.setItem(tokenKey, data.access_token);
            sessionStorage.setItem(userNameKey, data.userName);
            console.log(data.access_token);
        }).fail(function(data) {
            alert("При логине возникла ошибка");
        });

    },
    clearForm: function() {
        this.setState({
            Email: "",
            Password: ""
        });
    },
    render: function() {
        return (
            <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Modal Header</h4>
        </div>
        <div className="modal-body">
            <form onSubmit={this.submitAuth}>
                <h3>Вход на сайт</h3>
                <label>Введите email</label><br/>
                <input placeholder="email" className="form-control" id="EmailAuth" type="email" name="EmailAuth" label="Email:"/><br/><br/>
                <label>Введите пароль</label><br/>
                <input placeholder="password" className="form-control" id="PasswordAuth" type="password" name="PasswordAuth" label="Password:"/><br/><br/>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
        );
    }
});


ReactDOM.render(
    <AddUser url="/api/PhoneBook/Create"/>,
    document.getElementById("registrationModal")
);

ReactDOM.render(
    <AuthUser url="/Token"/>,
    document.getElementById("authorizationModal")
);
