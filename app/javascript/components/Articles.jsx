import React from "react";
import { Link } from "react-router-dom";

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        const url = "/api/v1/articles/index";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ articles: response }))
          .catch(() => this.props.history.push("/"));
    }

    render (){
        const { articles } = this.state;
        const totalArticles = articles.map((article, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card mb-4">
              <img
                src={article.image}
                className="card-img-top"
                alt={`${article.title} image`}
              />
              <div className="card-body">
                <h5 className="card-title">{article.name}</h5>
                <Link to={`/article/${article.id}`} className="btn custom-button">
                  Article Here
                </Link>
              </div>
            </div>
          </div>
        ));
        const noArticle = (
          <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
              No Articles yet. Go ahead and create<Link to="/new_article"> one</Link>
            </h4>
          </div>
        );
    
        return (
          <>
            <section className="jumbotron jumbotron-fluid text-center">
              <div className="container py-5">
                <h1 className="display-4">Articles on BMIs</h1>
                <p className="lead text-muted">
                  The blog section acts as an example of what Neuralink can create to
                  educate people who are interested in BMIs and the work being done. It will keep 
                  the public engaged on topics like BMI research to interesting interviews. 
                </p>
              </div>
            </section>
            <div className="py-5">
              <main className="container">
                <div className="text-right mb-3">
                  <Link to="/article" className="btn custom-button">
                    New Article
                  </Link>
                </div>
                <div className="row">
                  {articles.length > 0 ? totalArticles : noArticle}
                </div>
                <Link to="/" className="btn btn-link">
                  Home
                </Link>
              </main>
            </div>
          </>
        );
    }
}

export default Articles;
