import React from 'react';
import Globals from '../../services/Globals';
import {Redirect} from 'react-router-dom';

class Party extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.createDispatch = this.createDispatch.bind(this);
    this.deleteParty = this.deleteParty.bind(this);
    this.showAccounts = this.showAccounts.bind(this);
    this.state = {
      dispatches: [],
      wasDeleted: false,
      dispatchtext: '',
      accounts: [],
      showAccounts: false,
    };
  }
  componentDidMount() {
    fetch(`/dispatchesByParty/${this.props.match.params.partyid}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        dispatches: res.data,
      });
    });
    fetch("/accounts")
    .then(res => res.json())
    .then(res => {
      this.setState({
        accounts: res.data
      });
    });
  }

  deleteParty() {
    let body = {
      partyId: this.props.match.params.partyid,
    }
    let req = Globals.createRequestBody(body);
    fetch('/deleteParty', req)
    .then(res => res.json())
    .then(res => {
      if(res.status === "success") {
        window.alert(res.message);
        this.setState({
          wasDeleted: true,
        })
      } else {
        window.alert(res.message);
      }
    })
  }

  createDispatch() {
    let data = {
      accountid: this.props.accountInfo.accountid,
      partyid: this.props.match.params.partyid,
      dispatchtext: this.state.dispatchtext
    }
    let req = Globals.createRequestBody(data);
    fetch('/createDispatch', req)
    .then(res => res.json())
    .then(res => {
      console.log(res.data);
      this.setState({
        dispatches: res.data,
      })
    });
  }

  showAccounts() {
    this.setState((prevState) => ({
      showAccounts: !prevState.showAccounts,
    }))
  }

  onChange(e) {
    this.setState({
      dispatchtext: e.target.value,
    });
  }
  render() {

    if (this.state.wasDeleted) {
      return (
        <Redirect to="/dashboard" />
        );
    } else {
      return (
        <article className="col--8 col--mdm--9 col--lrg--10 bg-theme-blue">
          <div className="dispatch__container">
            { this.state.dispatches.map((dispatch, index) => {
              return(<Dispatch dispatch={dispatch} key={index} accountInfo={this.props.accountInfo} />)
            })}
            <form>
              <fieldset className="field btn-pair">
                <div className="field--btn-pair">
                  <input type="text" className="input full btn-pair" onChange={this.onChange}/>
                  <button className="btn--input" type="button" onClick={this.createDispatch}>Send</button>
                </div>
              </fieldset>
              <fieldset className="field">
                <label className="label">Add Accounts to Party</label>
                {this.state.showAccounts 
                  ? <select name="accountName" className="input--select full breath">
                      {this.state.accounts.map((accounts, index) => {
                        return (
                          <option value={accounts.accountid}>{accounts.accountname}</option>
                        );
                      })}
                    </select>
                  : ''}
                { this.state.showAccounts ? <button type="button" className="btn breath success">Add selected account to party</button> : ''}
                <button onClick={this.showAccounts} type="button" className="btn breath primary">{this.state.showAccounts ? "Hide Acconts" : "Show accounts"}</button>
              </fieldset>
              <fieldset className="field">
                <button type="button" className="btn breath danger" onClick={this.deleteParty}>Delete Party</button>
              </fieldset>
            </form>
          </div>
        </article>
      );
    }
  }
}

export default Party;

const Dispatch = (props) => {
  let display = "dispatch";
  let date = new Date(props.dispatch.dispatchcreated);
  if(props.dispatch.accountid === props.accountInfo.accountid) {
    display = "dispatch self";
  }
  return (
    <div className={display}>
      <p className="dispatch__account">{props.dispatch.accountname} <span className="dispatch__time">{date.toDateString()}</span></p>
      <p className="dispatch__message">{props.dispatch.dispatchtext}</p>
    </div>
  );
};