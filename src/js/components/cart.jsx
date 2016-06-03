import React, {Component} from 'react';
import request from 'superagent';
import accounting from 'accounting';

class Cart extends Component {

  state = {
    loading: false
  };

  onResult = (type, result) => {
    console.log(type, result);

    this.onCancel();
    this.props.onResult({type: type});
  };

  onCheckout = () => {

    if (this.state.loading)
      return;

    this.setState({loading: true});

    snap.show();

    request
      .post('/charge')
      .end((err, res) => {

        if (err || !res || !res.body || !res.body.token_id) {
          snap.hide();
          this.onResult('error', err || res.body);
          return;
        }

        snap.pay(res.body.token_id, {
          onSuccess: (result) => {
            this.onResult('success', result);
          },
          onPending: (result) => {
            this.onResult(result.payment_type == 'credit_card' ? 'success' : 'pending', result);
          },
          onError: (error) => {
            this.onResult('error', error);
          }
        });

        this.setState({loading: false});
      });
  };

  onCancel = () => {
    this.setState({loading: false});
    this.props.onCancel();
  }

  render() {
    let items = this.props.items.map((item) => {
      return (
        <tr key={item.id} className="table-content">
          <td>{item.title}</td>
          <td>&times; 1</td>
          <td className="amount">{accounting.formatMoney(item.price, '', '0')}</td>
        </tr>
      );
    });

    let total = this.props.items.reduce((total, item) => {
      return total + item.price;
    }, 0);

    let buttonContent = this.state.loading ? (
      <img alt="loading..." src="images/load.gif"/>
    ) : 'CHECKOUT';

    return (
     <div className={this.props.className}>
        <div className="cart-head">
          shopping cart &nbsp;
          <span className="label label-primary">1</span>
        </div>
        <div className="cart-inner">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th className="amount">Amount (Rp) </th>
              </tr>
            </thead>
            <tbody>
              {items}
              <tr className="total">
                <td className="empty"></td>
                <td className="total">Total</td>
                <td className="amount">{accounting.formatMoney(total, '', '0')}</td>
              </tr>
            </tbody>
          </table>
          <div className="cart-checkout" onClick={this.onCheckout}>
            {buttonContent}
          </div>
          <div className="cancel-btn" onClick={this.onCancel}>
            cancel
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
