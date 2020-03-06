import React from "react";
import { Link } from "react-router-dom";

class Article extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          integr: true,
          article:  { abstract: "" } 
    };
        
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

    componentDidUpdate() {
        const {body} = this.state.article
        console.log("value")
        if( this.state.integr){
            console.log("pre")
            this.convert(body);
            this.setState({integr : false}); 
        }
    }

    //My attempt to convert links into hyperlinks. 
    convert(info)
    {
      var text=info;
      console.log(text);
	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	  var text1=text.replace(exp, "<a href='$1'>$1</a>");
	  var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
      let blog = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
      const {body} = this.state.article;
      console.log(blog);
      this.setState({body : blog}); 
    }

    render() {
        const { article } = this.state;
        console.log(article);
        let styles = {
            margin: '10px',
            whiteSpace: 'pre-link'
          };

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
                <div className="col-sm-12 ">
                  <h1 className="mb-2 text-center">{article.title}</h1>
                </div>
                <div className="col-sm-12 text-center text-muted" >
                  <h6 className="mb-2 text-center">{article.abstract}</h6>
                </div>
                <div className="col-sm-12" styles ={styles}>
                  <h5 className="mb-2 pre-link" styles ={styles}>{article.body}</h5>
                </div>
                {/*
                <div className="col-sm-12 col-lg-2">
                  <button type="button" className="btn btn-danger">
                    Delete Article
                  </button>
                </div>
                */}
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

