import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const [articles, setArticles]=useState([])
  const [loading, setLoading]=useState(true)
  const [page, setPage]=useState(1)
  const [totalResults, setTotalResults]=useState(0)
  
  const captilizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchNews=async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title=`${captilizeFirstLetter(props.category)} - NewsMonkey`;
    fetchNews();
  })

  // handlePrevBtn = async()=>{
  //    setPage(page-1);
  //     fetchNews();
  //   }

  // handleNextBtn = async()=>{
  //   setPage(page+1);
  //   fetchNews();
  // }
   const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };


    return (
      <>
      <h1 className='text-center' style={{margin: '35px', marginTop: '90px'}}>News Monkey - Top {captilizeFirstLetter(props.category)} Headlines</h1>
      {loading&&<Spinner/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
      <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItem 
            title={element.title ? element.title.slice(0,45) : ""} 
            description={element.description ? element.description.slice(0,80) : ""} 
            imageUrl={element.urlToImage ? element.urlToImage : "https://servicepath.co/wp-content/uploads/2019/11/news.jpg"} 
            newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
            />
          {/*ternary operators are used to avoid null data*/}
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
        {/* if you want Next and Previous buttons instead of infinite scroll then use this
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={page<=1} className="btn btn-dark" onClick={handlePrevBtn}>&larr; Preveious</button>
        <button type="button" disabled={page+1>Math.ceil(totalResults/props.pageSize) ? page+1 : ""} className="btn btn-dark" onClick={handleNextBtn}>Next &rarr;</button>
        </div> */}
      </>
    )
  }


News.defaultProps={
  country:"in",
  pageSize: 9,
  category: "general"
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
export default News
