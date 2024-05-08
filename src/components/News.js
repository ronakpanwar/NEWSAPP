import React, { useEffect, useState } from 'react'
import NewsIteam from './NewsIteam';
import Spiner from './Spiner';
import PropTypes from 'prop-types';


const News = (props) => {


  const changeupper = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);

  }

  //fuction base

  const [articles, setarticales] = useState([])
  const [loding, setloding] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  // class base component
  // console.log("constructer call");
  /* this.state = {
     articles: [],
     loding: false,
     page: 1,
     totalResults: 0
   }*/
  



  const updatePage = async() => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${page}&pageSize=${props.pageSize}`
    setloding(true)
    let data = await fetch(url);
    props.setProgress(30);
    let paseddata = await data.json()
    //console.log(paseddata)
    props.setProgress(70);
    setarticales(paseddata.articles)
    settotalResults(paseddata.totalResults)
    setloding(false)
    props.setProgress(100);

  }




  //const fetchMoreData = async () => {
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

//  }
  useEffect(() => {
    /* props.setProgress(10);
     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${page}&pageSize=${props.pageSize}`
     setloding(true)
     let data = await fetch(url);
     props.setProgress(30);
     let paseddata = await data.json()
     //console.log(paseddata)
     props.setProgress(70);
       setarticales( paseddata.articles) 
       settotalResults(paseddata.totalResults)
       setloding(false)
       props.setProgress(100);*/
    /*this.setState({
      articles: paseddata.articles,
      totalResults: paseddata.totalResults,
      loding: false
    })*/
    updatePage();
    document.title = `${changeupper(props.category)} - NewsIteam`;

  },[])

  /* async componentDidMount() {
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
 */

  const handleNextPage = async () => {
    // console.log("next")

    /*if (page + 1 > Math.ceil(totalResults / props.pageSize)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${page + 1}&pageSize=${props.pageSize}`
      setloding(true)
      let data = await fetch(url);

      let paseddata = await data.json()
      //console.log(paseddata)
  
      setarticales(paseddata.articles)
      setpage(page+1)
      setloding(false)

    /*  this.setState({
        articles: paseddata.articles,
        page: this.state.page + 1,
        loding: false
      })*/


    /* this.setState({
       page: this.state.page+1,
       loding:false
     })*/
    await setpage(page + 1)
     setloding(false)
    updatePage();

   


  }



const handlePrevPage = async () => {
  //console.log("prev")
  /*let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9d14f58d4a9e4591aa5620260a724569&page=${page - 1}&pageSize=${props.pageSize}`
  let data = await fetch(url);
  let paseddata = await data.json()
  //console.log(paseddata)
 setarticales(paseddata.articles)
 setpage(page -1)

  /*this.setState({
    articles: paseddata.articles,
    page: this.state.page - 1
  })
*/
  /*this.setState({
    page: this.state.page-1,
    loding:false
  })*/
  await setpage(page - 1)
  setloding(false)
  updatePage();
  

}



return (

  <div className='container my-3 '>
    <div className="text-center">
      <h1 >NewsEra - Top {changeupper(props.category)} Headline </h1>

      {loding && <Spiner />}


      <div className="row d-flex justify-content-between ">
        {!loding && articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsIteam tittle={element.title ? element.title.slice(0, 40) : ""} discription={element.description ? element.description.slice(0, 85) : ""} ImUrl={element.urlToImage}
              NewsUrl={element.url} auther={element.author} date={element.publishedAt} />
          </div>
        })}
      </div>

    </div>


    <div className="container d-flex justify-content-between">
      <button disabled={page <= 1} type="button" class="btn btn-dark" onClick={handlePrevPage}>	&larr; prev</button>
      <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" class="btn btn-dark" onClick={handleNextPage}>next 	&rarr;</button>
    </div>


  </div>

)
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.PropTypo = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
}


export default News