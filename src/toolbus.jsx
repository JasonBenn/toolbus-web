var Landing = React.createClass({
  render() {
    <div class="container">
      <div class="slide1">

        <div id="logo" class="shape">
          <img src="assets/images/toolbus.png"/>
        </div>

        <div id="content1">
          <p>Go from a junior developer to a senior developer</p>
          <p>Measure what you do know and master what you dont</p>
          <p>Toolbus scans your projects for code achievements</p>
          <a href="2"><img src="assets/images/embernerd.png" /></a>
          <a href="1"><img src="assets/images/railsnerd.png" /></a>
          <a href="7"><img src="assets/images/rubynerd.png" /></a>
          <a href="4"><img src="assets/images/pythonnerd.png" /></a>
          <a href="3"><img src="assets/images/cssnerd.png" /></a>
          <a href="6"><img src="assets/images/jsnerd.png" /></a>
          <h1>CHOOSE AN OPTION TO BUILD YOUR MASTERY</h1>
        </div>
      </div>

      <div class="slide2">
        <div id="content2">
          <h1>INSTALLATION</h1>
          <pre>&gt; gem install toolbus</pre>
          <pre class="inline">cd</pre> to your project directory
          <pre>&gt; toolbus</pre>
        </div>
      </div>

      <div class="footer">
        <p> All rights reserved 2015</p>
        <a href="https://www.github.com/JasonBenn">A Project by Jason Ben /n</a>
      </div>
    </div>
  }
});

React.render(
  <Landing/>,
  document.getElementById('app')
);