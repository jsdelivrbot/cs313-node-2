import React from 'react';

class Party extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatches: [],
    };
  }
  componentDidMount() {
    fetch(`/dispatchesByParty/${this.props.match.params.partyid}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        dispatches: res.data,
      })
    })
    console.log("mounted party")
    // this.setState({
    //   dispatches: [
    //     {dispatchtext: "hello how are you today?", accountid: 2, accountname: "Jol", dispatchcreated: new Date()},
    //     {dispatchtext: "I am doing well how are you?", accountid: 1, accountname: "Matt", dispatchcreated: new Date()},
    //     {dispatchtext: "It was a bit snowy today.", accountid: 2, accountname: "Jol", dispatchcreated: new Date()},
    //     {dispatchtext: "I enjoyed going to the movies last night.", accountid: 1, accountname: "Matt", dispatchcreated: new Date()},
    //   ],
    // });
  }
  render() {
    return (
      <article className="col--8 col--mdm--9 col--lrg--10 bg-theme-blue">
        <div className="dispatch__container">
          { this.state.dispatches.map((dispatch, index) => {
            return(<Dispatch dispatch={dispatch} key={index} accountInfo={this.props.accountInfo} />)
          })}
          <form>
            <fieldset className="field btn-pair">
              <div className="field--btn-pair">
                <input type="text" className="input full btn-pair" />
                <button className="btn--input">Send</button>
              </div>
            </fieldset>
          </form>
        </div>
      </article>
    );
  }
}

export default Party;

const Dispatch = (props) => {
  let display = "dispatch";
  if(props.dispatch.accountid === props.accountInfo.accountid) {
    display = "dispatch self";
  }
  return (
    <div className={display}>
      <p className="dispatch__account">{props.dispatch.accountname} <span className="dispatch__time">{props.dispatch.dispatchcreated.toDateString()}</span></p>
      <p className="dispatch__message">{props.dispatch.dispatchtext}</p>
    </div>
  );
};