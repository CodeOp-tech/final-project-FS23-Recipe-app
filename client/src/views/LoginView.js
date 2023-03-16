import { useState } from "react";
import InputBox from "../components/InputBox";
import { useNavigate } from "react-router-dom";

const INIT_LOGINFORM = {
  email: "",
  password: "",
};

const LoginView = (props) => {
  const [loginInput, setLoginInput] = useState(INIT_LOGINFORM);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.inputLoginCb(loginInput);
    setLoginInput(INIT_LOGINFORM);
    console.log("someone want to log in... oh lala", loginInput);
  };

  return (
    <div>
      <button onClick={(m) => navigate("/register")}>Register</button>
      {/* this button takes us to register page */}

      <form onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        {/* Label and placeholder can have the value of your choice */}
        <InputBox
          id="email"
          type="text"
          placeholder="nugget@example.com"
          name="email"
          value={loginInput.email}
          label="Email"
          onChange={handleChange}
        />
        <InputBox
          id="password"
          type="password"
          name="password"
          value={loginInput.password}
          label="Password"
          onChange={handleChange}
        />

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
