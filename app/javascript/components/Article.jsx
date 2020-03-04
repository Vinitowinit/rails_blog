import React from "react";
import { Link } from "react-router-dom";

class Article extends React.Component {
    constructor(props) {
      super(props);
      this.state = { article: { abstract: "" } };
        
    }
  
    componentDidMount() {
      const { match: { params: { id } } } = this.props;
  
     // URL request to fetch the recipe
      const url = `/api/v1/show/${id}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ article: response }))
        .catch(() => this.props.history.push("/articles"));
    }
// How are you able to pass the whole response to setState without proper schema established beforehand
    render() {
        const { article } = this.state;

        return (
          <div className="">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
              <img src={article.image}
                className="img-fluid position-absolute"
              />
              <div className="overlay bg-dark position-absolute" />
            </div>
            <div className="container py-5">
              <div className="row">
                <div className="col-sm-12 col-lg-7">
                  <h1 className="mb-2">{article.title}</h1>
                </div>
                <div className="col-sm-12 col-lg-7">
                  <h5 className="mb-2">{article.abstract}</h5>
                </div>
                <div className="col-sm-12 col-lg-7">
                  <h3 className="mb-2">{article.body}</h3>
                </div>
                <div className="col-sm-12 col-lg-2">
                  <button type="button" className="btn btn-danger">
                    Delete Article
                  </button>
                </div>
              </div>
              <Link to="/articles" className="btn btn-link">
                Return to Articles
              </Link>
            </div>
          </div>
        );
      }
    
  
  }
  
  export default Article;

