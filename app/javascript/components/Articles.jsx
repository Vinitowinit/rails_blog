import React from "react";
import { Link } from "react-router-dom";
import Home from "../images/house.png";
import LN from "../images/Linkedin.PNG";
import Medium from "../images/medium.png";
import Applic from "../images/Application.png";

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
        const styles = {
            height: '400px',
            width: '300px',
            overflow: 'hidden'
        };

        const { articles } = this.state;
        const totalArticles = articles.map((article, i) => (
          <div key={i} className="col-md-6 col-lg-4 ">
            <div className="card mb-4">
              <img
                src={article.image}
                className="card-img-top"
                alt={`${article.title} image`}
                height= '230px'
                width = 'auto'
                background-size= 'cover'
                overflow= 'hidden'
              />
              <div className="card-body text-center">
                <h5 className="card-title text-center">{article.title}</h5>
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
                I have created blogs highlighting Neuralink's technology, BMIs history, 
                neural decoding/encoding methods, and lighthearted Elon Musk moments. 
                I have also referenced my LinkedIn, Medium, and Neuralink Application.  
                </p>
              </div>
              <div className=" text-center b-3 center" >
                  <Link to="/article" className="btn custom-button text-center center">
                    New Article
                  </Link>
                </div>
                <br/>
                <span>
                <Link to="/" className="btn btn-link">
                    <img src={Home} width= '50px' height ='50px' />
                </Link>
                <a href="https://www.linkedin.com/in/vinitowinit/">
                    <img src={LN} width= '48px' height ='48px' />
                </a>
                <a href ="https://medium.com/@Vinitowinit" >
                    <img src={Medium} width= '70px' height ='70px' />
                </a>
                <a href ="https://docs.google.com/document/d/1tntotS-Br23ju4a_Sjoiy9h5nukJZcgK7rin_ivpfFs/edit" >
                    <img src={Applic} width= '60px' height ='60px' />
                </a>
                </span>
            </section>
            <div className="py-5">
              <main className="container">
                <div className="row">
                  {articles.length > 0 ? totalArticles : noArticle}
                </div>
              </main>
            </div>
          </>
        );
    }
}

export default Articles;
