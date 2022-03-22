import React from "react";
import Navbar from "../components/navbar/Navbar";
import * as BsIcons from "react-icons/bs";
import "./styles/Home.css";
import Chat from "../components/chat/Chat"

const Home = () => {

  const user = {
    icon: <BsIcons.BsAward/>,
    username: 'user',
    password: '',
    type: '',
  }

  return (
    <div className="Home">
      <Navbar />
      <section className="intro">
        <div className="intro-logo">
          <BsIcons.BsChatSquareTextFill
            style={{ fontSize: "7rem", color: "black" }}
          />
          <BsIcons.BsTranslate style={{ fontSize: "7rem", color: "black" }} />
        </div>

        <div className="intro-aside">
          <span className="intro-title">
            A Online Lexical Learning Platform for Languages Learners
            <br />
          </span>
          <ul className="intro-features">
            <li>Real Time Text Translation</li>
            <li>Flashcards</li>
          </ul>
          <a href="login" className="intro-getstarted">
            Get Started
          </a>
        </div>
      </section>

      <section className="features">
        <ul>
          <li>
            <span className="features-title">Real Time Text Translation</span>
            <span>Translates to hundred of languages</span>
            <span>Powered by Google Translate</span>
            <BsIcons.BsImages style={{ fontSize: "15rem", margin: "0 auto" }} />
          </li>
          <li>
            <span className="features-title">Flashcards</span>
            <span>Convert cards to quizes / tests</span>
            <span>Fully Customizable</span>
            <span>Games</span>
            <BsIcons.BsImages style={{ fontSize: "15rem", margin: "0 auto" }} />
          </li>
        </ul>
      </section>
      <section className="quickdemo">
        {user.username !== "" ? 
          <Chat user={user} />
          :
          <Chat user={{
            icon: <BsIcons.BsExclamationDiamond/>,
            username: 'demo',
          }}/>
        }
      </section>
      <footer>
        <span>Lexical Leaner</span>
      </footer>
    </div>
  );
};

export default Home;
