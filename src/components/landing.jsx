import React from 'react';

var s3Root = 'https://s3-us-west-2.amazonaws.com/toolbus/images/'

var Landing = React.createClass({
  render() {
    return (
      <div>
        <div className="slide1">

          <div id="logo" className="shape">
            <img src={s3Root + "toolbus.png" }/>
          </div>

          <div id="content1">
            <p>Go from a junior developer to a senior developer</p>
            <p>Measure what you do know and master what you dont</p>
            <p>Toolbus scans your projects for code achievements</p>
            <a href="2"><img src={s3Root + "embernerd.png" } /></a>
            <a href="1"><img src={s3Root + "railsnerd.png" } /></a>
            <a href="7"><img src={s3Root + "rubynerd.png" } /></a>
            <a href="4"><img src={s3Root + "pythonnerd.png" } /></a>
            <a href="3"><img src={s3Root + "cssnerd.png" }/></a>
            <a href="6"><img src={s3Root + "jsnerd.png" } /></a>
            <h1>CHOOSE AN OPTION TO BUILD YOUR MASTERY</h1>
          </div>
        </div>

        <div className="slide2">
          <div id="content2">
            <h1>INSTALLATION</h1>
            <pre>&gt; gem install toolbus</pre>
            <pre className="inline">cd</pre> to your project directory
            <pre>&gt; toolbus</pre>
          </div>
        </div>

        <div className="footer">
          <p> All rights reserved 2015</p>
          <a href="https://www.github.com/JasonBenn">A Project by Jason Ben /n</a>
        </div>
      </div>
    )
  }
});

module.exports = Landing;