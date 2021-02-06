import React from 'react'
import video from './sludge-sm.mp4';

class BirthdayList extends React.Component {
  state = {
    isLoading: true,
    users: [],
    err: null,
    numBirthdays: null,
  }

  componentDidMount() {
    const numUsers = (new Date().getUTCHours() % 5) + 1;

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
    }
    return (
      <React.Fragment>
        <React.Fragment>
          {!isLoading ? (
            <video muted autoPlay src={video} className='video'> </video>

          ) : null
          }
        </React.Fragment>
        <section className='container'>
          <h1> {!numBirthdays ? null : numBirthdays} Birthdays Today</h1>
          {err ? <p>{err.message}</p> : null}
          {
            !isLoading ? (
              users.map(user => {
                const { name, dob, id, picture } = user;
                return (
                  <article className='user' key={id.value}>
                    <img src={picture.large} alt={"picture of" + name.first} />
                    <div className="details">
                      <h2>{`${name.first} ${name.last}`}</h2>
                      <h4>{dob.age} Years Old</h4>
                    </div>
                  </article>
                );
              })
            ) : (
                <h3>Loading...</h3>
              )
          }
          < button className='clear' type='button' onClick={clearUsers}>Clear All</button>
        </section >
      </React.Fragment>
    )
  }
}
export default BirthdayList
