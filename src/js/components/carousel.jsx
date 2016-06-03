import React, {Component} from 'react';
import classnames from 'classnames';

class Carousel extends Component {

  activeIndex = 0;

  next = (event) => {
    if (event)
      event.preventDefault();

    if (this.moving) {
      return;
    } else {
      this.moving = true;
    }

    if (this.timeOut)
      clearTimeout(this.timeOut);

    let activeIndex = this.activeIndex;
    let nextIndex = activeIndex + 1;

    if (nextIndex > this.props.item.previews.length - 1)
      nextIndex = 0;

    let activeElement = this.refs[`crslItm${activeIndex}`];
    let nextElement = this.refs[`crslItm${nextIndex}`];

    nextElement.className = 'item next';
    setTimeout(() => {
      nextElement.className = 'item next left';
      activeElement.className = 'item active left';

      setTimeout(() => {
        nextElement.className = 'item active';
        activeElement.className = 'item';
        this.loop(); this.moving = false;
      }, 600);
    }, 10);

    this.activeIndex = nextIndex;
  };

  prev = (event) => {
    if (event)
      event.preventDefault();

    if (this.moving) {
      return;
    } else {
      this.moving = true;
    }

    if (this.timeOut)
      clearTimeout(this.timeOut);

    let activeIndex = this.activeIndex;
    let prevIndex = activeIndex - 1;

    if (prevIndex < 0)
      prevIndex = this.props.item.previews.length - 1;

    let prevElement = this.refs[`crslItm${prevIndex}`];
    let activeElement = this.refs[`crslItm${activeIndex}`];

    prevElement.className = 'item prev';
    setTimeout(() => {
      prevElement.className = 'item prev right';
      activeElement.className = 'item active right';

      setTimeout(() => {
        prevElement.className = 'item active';
        activeElement.className = 'item';
        this.loop(); this.moving = false;
      }, 600);
    }, 10);

    this.activeIndex = prevIndex;
  };

  loop = () => {
    this.timeOut = setTimeout(() => {
      this.next();
    }, 10000);
  };

  componentDidMount() {
    this.loop();
  }

  render() {
    let items = this.props.item.previews.map((url, index) => {
      return (
        <div key={index} ref={`crslItm${index}`} className={classnames('item', {active: !index})}>
          <div className="slide-image" style={{backgroundImage: `url(${url})`}}></div>
        </div>
      );
    });

    return (
      <div className="carousel slide" data-ride="carousel" id="carousel">
        <div className="carousel-inner" role="listbox">
          {items}
        </div>
        <div className="control">
          <a className="control-button" data-slide="prev" href="#carousel" onClick={this.prev} role="button">
            <i className="glyphicon glyphicon-menu-left"></i>
          </a>
          <a className="control-button" data-slide="next" href="#carousel" onClick={this.next} role="button">
            <i className="glyphicon glyphicon-menu-right"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Carousel;