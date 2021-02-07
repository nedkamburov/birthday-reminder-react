import React from 'react'


class BirthdayList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      users: [],
      err: null,
      numBirthdays: null,
      setDisplayBirthdays: this.props.setDisplayBirthdays
    }
  }


  componentDidMount() {
    const numUsers = (new Date().getUTCHours() % 5) + 1; // a hack to be more interesting
    fetch(`https://randomuser.me/api/?results=${numUsers}`,
      {
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors'
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          users: [...data.results],
          numBirthdays: numUsers
        })
      }).catch(err => {
        this.setState({ err, isLoading: false })
      })
  }

  render() {
    const { isLoading, users, err, numBirthdays } = this.state;

    const clearUsers = () => {
      this.setState({
        users: [],
        numBirthdays: null
      })
      this.state.setDisplayBirthdays(false);
    }

    return (
      <article className="birthdayCard" style={this.props.style}>
        { numBirthdays && isLoading ? <h1>Loading Birthdays Today</h1> : numBirthdays ? <h1>{numBirthdays} Birthdays Today</h1> : !isLoading ? <h1> No More Birthdays Today</h1> : <h1>Loading Birthdays Today</h1>}
        { err ? <p>{err.message}</p> : null}
        {
          !isLoading ? (
            users.map((user, index) => {
              const { name, dob, login, picture } = user;
              return (
                <article className='user' key={login.uuid}>
                  <img src={picture.large} alt={"picture of" + name.first} />
                  <div className="details">
                    <h2>{`${name.first} ${name.last}`}</h2>
                    <h4>{dob.age} Years Old</h4>
                  </div>
                </article>
              );
            })) : (<h3>Loading...</h3>)
        }
        { numBirthdays && <button className='clear' type='button' onClick={clearUsers}>Clear All</button>}
      </article >)
  }
}
export default BirthdayList
