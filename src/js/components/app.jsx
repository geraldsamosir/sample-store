import React, {Component} from 'react';
import classnames from 'classnames';
import Header from './header';
import Carousel from './carousel';
import Box from './box';
import Cart from './cart';
import Notif from './notif';

class App extends Component {
  state = {
    item: {
      id: 1,
      title: 'Veritrans Bear',
      price: 20000,
      desc: 'Give a bear a new home!',
      previews: [
        'images/slide/1.jpg',
        'images/slide/2.jpg',
        'images/slide/3.jpg',
        'images/slide/4.jpg'
      ]
    },
    cartItems: [],
    checkout: false,
    notif: {
      show: false,
      type: ''
    }
  };

  onBuy = (item) => {
    let cartItems = this.state.cartItems;
    cartItems.push(item);

    this.setState({
      cartItems: cartItems,
      checkout: true
    });
  };

  onCancel = () => {
    this.setState({
      cartItems: [],
      checkout: false
    });
  };

  onResult = (result) => {
    this.setState({
      notif: {
        show: true,
        type: result.type
      }
    });
  };

  closeNotif = () => {
    this.setState({
      notif: {
        show: false,
        type: ''
      }
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={classnames('main-content', {'buying': this.state.checkout})}>
            <Header />
            <Carousel item={this.state.item}/>
            <div className="ad-box-wrapper">
              <div className="ad-box">
                <Box item={this.state.item} onBuy={this.onBuy}/>
                <Notif {...this.state.notif} onRequestClose={this.closeNotif}/>
              </div>
            </div>
            <div className={classnames('main-overlay', {'buying': this.state.checkout})}></div>
          </div>
          <Cart
            className={classnames('cart-content', {'buying': this.state.checkout})}
            items={this.state.cartItems}
            onCancel={this.onCancel}
            onResult={this.onResult} />
        </div>
      </div>
    );
  }
}

export default App;