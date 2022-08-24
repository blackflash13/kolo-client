import React, { FC, useContext, useState } from "react";
import {Context} from "react";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // @ts-ignore
    const { store } = useContext(Context);

  return (
    <div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setLogin(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => store.login(login, password)}
        >
          Login
        </button>

        {/* <button
          type="submit"
          className="btn btn-primary"
          onClick={() => store.registration(login, password, name)}
        >
          Sing up
        </button> */}
    </div>
  );
};

export default LoginForm;
