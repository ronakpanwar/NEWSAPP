import React, { Component } from 'react'

export default class NewsIteam extends Component {
  render() {
    let { tittle, discription ,ImUrl , NewsUrl ,auther , date} = this.props;
    return (
      <div className='my-3 '  >
        <div className="card ">
          <img src={!ImUrl?"https://images.hindustantimes.com/tech/img/2023/10/04/1600x900/meteorites-7231216_1920_1696395449583_1696395456939.jpg":ImUrl} class="card-img-top" alt="..." />
          <div className="card-body bg-dark text-light">
            <h5 className="card-title">{tittle}</h5>
            <p className="card-text">{discription}</p>
            <p className="card-text"> By <b> {auther?auther:"Unknown"} </b> to {new Date(date).toGMTString()} </p>
            <a href={NewsUrl} target='_blank' className="btn btn-primary">Read more..</a>
          </div>
        </div>
      </div>
    )
  }
}
