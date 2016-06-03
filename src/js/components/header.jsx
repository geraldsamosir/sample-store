import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <div className="pull-left">
          <h1>
            <a href="/">Coco</a>
          </h1>
        </div>
      </nav>
    );
  }
}

export default Header;