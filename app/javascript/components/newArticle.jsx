import React from "react";
import { Link } from "react-router-dom";

class newArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            abstract: "",
            body: ""
        };
    //arrow function not working in render, so bounded it instead
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({ [event.target.title]: event.target.value });
      }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/articles/create";
        const { title, abstract, body } = this.state;

        if(title.length == 0 || abstract.length == 0 || body.length == 0)
        return;

        const value = {
            body,
            abstract, 
            title 
        }

    };


}