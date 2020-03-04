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
        };
       
        //Token needed for proper write-authorization to server
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "POST",
            headers: {
              "X-CSRF-Token": token,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/article/${response.id}`))
            .catch(error => console.log(error.message));
        };
    render() {
        return (
            <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                    Add a new BMI Article to share to newcomers!!
                </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label htmlFor="articleTitle">Article title</label>
                    <input
                        type="text"
                        name="title"
                        id="articleTitle"
                        className="form-control"
                        required
                        onChange={this.onChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="articleAbstract">Abstract</label>
                    <input
                        type="text"
                        name="abstract"
                        id="articleAbstract"
                        className="form-control"
                        required
                        onChange={this.onChange}
                    />
                    </div>
                    <label htmlFor="instruction">Preparation Instructions</label>
                    <textarea
                    className="form-control"
                    id="instruction"
                    name="instruction"
                    rows="5"
                    required
                    onChange={this.onChange}
                    />
                    <button type="submit" className="btn custom-button mt-3">
                    Create Article
                    </button>
                    <Link to="/articles" className="btn btn-link mt-3">
                    Back to Articles
                    </Link>
                </form>
                </div>
            </div>
        </div>
        );
        }

}

export default newArticle;