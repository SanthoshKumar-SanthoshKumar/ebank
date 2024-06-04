import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './style.css'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          className="digital-card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </>
  )
}

export default Home
