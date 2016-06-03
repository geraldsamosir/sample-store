import React, {Component} from 'react';
import classnames from 'classnames';

class NotifContentWrapper extends Component {

  render() {
    return (
      <div className={classnames('trans-status', this.props.className)}>
        {this.props.children}
        <div className="close" onClick={this.props.onClose}></div>
      </div>
    );
  }

}

class Notif extends Component {

  render() {
    if (!this.props.show)
      return null;

    let content;
    let contentProps = {
      onClose: this.props.onRequestClose
    };

    switch (this.props.type) {
      case 'success':
        contentProps.className = 'trans-success';
        content = (
          <NotifContentWrapper {...contentProps}>
            Thank you for your purchase.
            <br/>
            The bear is happy.
          </NotifContentWrapper>
        );
        break
      case 'pending':
        contentProps.className = 'trans-pending';
        content = (
          <NotifContentWrapper {...contentProps}>
            We've booked your payment.
            <br/>
            Please continue as instructed.
          </NotifContentWrapper>
        );
        break;
      case 'error':
        contentProps.className = 'trans-error';
        content = (
          <NotifContentWrapper {...contentProps}>
            Sorry, something went wrong.
            <br/>
            Please <a href="#">retry</a> your purchase.
          </NotifContentWrapper>
        );
        break;
      default:
        return null;
    }

    return (
      <div className="notification-wrapper">
        {content}
      </div>
    );
  }
}

export default Notif;