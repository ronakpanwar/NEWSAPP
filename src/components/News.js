import React, { Component } from 'react'
import NewsIteam from './NewsIteam';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }
  static PropTypo = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  }

  changeupper = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);

  }

  constructor(props) {
    super(props);
    // console.log("constructer call");
    this.state = {
      articles: [],
      loding: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.changeupper(this.props.category)} - NewsIteam`;

  }

  async updatePage() {

    /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loding:true})
      let data = await fetch(url);
     
      let paseddata = await data.json()
     
       //console.log(paseddata)
      this.setState({
        articles: paseddata.articles,
        totalResults: paseddata.totalResults ,
        loding:false
      }) */

  }




  fetchMoreData = async () => {
   /*  this.setState({
       page: this.state.page + 1
     })
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${this.state.page}&pageSize=${this.props.pageSize}`
     this.setState({loding:true})
     let data = await fetch(url);
     let paseddata = await data.json()
      console.log(paseddata)
     this.setState({
       articles: this.state.articles.concat(paseddata.articles),
       totalResults: paseddata.totalResults ,
       loding:false
     }) */

  }


  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loding: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let paseddata = await data.json()
    //console.log(paseddata)
    this.props.setProgress(70);
    this.setState({
      articles: paseddata.articles,
      totalResults: paseddata.totalResults,
      loding: false
    })
    //this.updatePage();
    this.props.setProgress(100);

  }
  handleNextPage = async () => {
    // console.log("next")

    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({ loding: true })
      let data = await fetch(url);

      let paseddata = await data.json()
      //console.log(paseddata)

      this.setState({
        articles: paseddata.articles,
        page: this.state.page + 1,
        loding: false
      })


      /* this.setState({
         page: this.state.page+1,
         loding:false
       })
       this.updatePage();*/



    }
  }


  handlePrevPage = async () => {
    //console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let paseddata = await data.json()
    //console.log(paseddata)
    this.setState({
      articles: paseddata.articles,
      page: this.state.page - 1
    })

    /*this.setState({
      page: this.state.page-1,
      loding:false
    })
    this.updatePage();*/

  }

  render() {

    return (

      <div className='container my-3 '>
        <div className="text-center">
          <h1 >NewsEra - Top {this.changeupper(this.props.category)} Headline </h1>

          {this.state.loding && <Spiner />}

         
            <div className="row d-flex justify-content-between ">
              {!this.state.loding && this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsIteam tittle={element.title ? element.title.slice(0, 40) : ""} discription={element.description ? element.description.slice(0, 85) : ""} ImUrl={element.urlToImage}
                    NewsUrl={element.url} auther={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          
        </div>


        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevPage}>	&larr; prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextPage}>next 	&rarr;</button>
        </div>


      </div>

    )
  }
}
