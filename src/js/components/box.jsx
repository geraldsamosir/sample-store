import React, {Component} from 'react';
import accounting from 'accounting';

class Box extends Component {

  onClick = (event) => {
    event.preventDefault();
    this.props.onBuy(this.props.item);
  }

  render() {
    return (
      <div className="ad-box-inner">
        <div className="title">{this.props.item.title}</div>
        <hr />
        <div className="price">Rp {accounting.formatMoney(this.props.item.price, '', '0')}</div>
        <hr />
        <div className="desc">
          Give a bear a new home!
          <br />
          <br />
          <i>
            Disclaimer: This is not a real transaction.No funds will be transfered out of your account.No bear was harmed in the making of this site.
          </i>
        </div>
        <a className="btn buy" href="#" onClick={this.onClick}>
          BUY NOW
        </a>
      </div>
    );
  }
}

export default Box;