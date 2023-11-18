import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-content">
        <h1>Sign up</h1>
        <form>
          <div className="name">
            <input
              className="first-name"
              placeholder="first name"
              type="text"
              name="firstname"
              required
            />
            <input
              className="last-name"
              placeholder="last name"
              type="text"
              name="lastname"
              required
            />
            <input
              className="middle-name"
              placeholder="middle name (optional)"
              type="text"
              name="middlename"
            />
          </div>
          <div className="info">
            <input
              className="ssn"
              placeholder="ssn"
              type="text"
              name="ssn"
              required
            />
            <input
              className="Age"
              placeholder="age"
              type="number"
              name="age"
              required
            />
            <input
              className="gender"
              placeholder="gender"
              type="text"
              name="gender"
            />
          </div>
          <div className="info">
            <input
              className="race"
              placeholder="race"
              type="text"
              name="radce"
              required
            />
            <input
              className="occupation"
              placeholder="occupation (optional)"
              type="text"
              name="occupation"
            />
            <input
              className="phone"
              placeholder="phone number"
              type="number"
              name="phone"
            />
          </div>
          <input
            className="address"
            placeholder="address (optional)"
            type="text"
          ></input>
          <input
            className="medical-history"
            placeholder="medical-history (optional)"
            type="text"
          ></input>

          <div className="account">
            <input placeholder="username" type="text" name="username" />
            <input placeholder="password" type="password" name="password" />
          </div>

          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <div className="sign-up">
          <div>Already have an account?</div>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
