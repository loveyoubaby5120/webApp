import * as React from "react";
import { Component } from 'react';
import * as $ from 'jquery';

export default class HomeComponent extends Component {
    private state: any;
    private setState: any;

    constructor(props) {
        super(props);
        this.state = {
            html: '<h1>aa</h1>',
        };
    }

    componentWillMount() {
        const url = 'https://ztcwx.myscrm.cn/index.php?r=choose-room-activity/confirm-login';
        const data = {
            token: 'dtiuyd1441765130',
            activityId: 284,
            mobile: 1,
            idCardNo: 1,
        };
        $.ajax({
            type: 'POST',
            url,
            dataType: 'json',
            // contentType: 'application/json; charset=utf-8',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Access-Control-Allow-Origin', "*");

            },
            async: true,
            data: JSON.stringify(data),
        }).done((d) => {
            console.log(d);
            console.log(1111)
            this.setState({ html: d });
            console.log(222)
        }).fail((err) => {
            console.warn(url, err);
            this.setState({ html: JSON.stringify(err) });
        });
    }

    render() {

        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
                <h1>Home page</h1>
                <p className="lead">Nullam mattis convallis nisi, id porttitor nibh tempus sit amet. Quisque congue magna sed tortor luctus finibus. Etiam sed molestie augue. Cras quam enim, faucibus vel sem vitae, vestibulum dignissim dui. Vivamus sapien nibh, bibendum nec lacus nec, fringilla bibendum metus. Duis laoreet interdum leo in vehicula. Fusce sem felis, convallis eu suscipit vel, tristique non eros. Aliquam dolor odio, viverra vel aliquet in, maximus ut nibh. Phasellus venenatis efficitur laoreet. Donec ac lorem nisi. Phasellus lectus mi, congue non erat quis, pellentesque sagittis risus. Etiam id nulla ultricies, aliquet ligula vitae, volutpat nibh. Aliquam ac ullamcorper nisl, et laoreet lectus.</p>
                <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
            </div>
        );
    }
}

