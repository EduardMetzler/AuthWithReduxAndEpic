import React, { useEffect } from "react";
import { AppState } from "../../store/model";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoading, logoutSuccess } from "../../store/auth/auth.actions";

interface ConnectedState {
  isAuthenticated: boolean;
  firstName: String;
  token?: String | null;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,

  firstName: state.auth.firstName,
  token: state.auth.token,
});

export const NavbarComponent: React.FC<ConnectedState> = ({
  isAuthenticated,
  firstName,
  token,
}) => {
  const dispatch = useDispatch();

  if (token && !isAuthenticated) {
    dispatch(userLoading(token));
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo" style={{ marginLeft: "20px" }}>
            Muster
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              {!isAuthenticated ? <Link to="login">Anmelden </Link> : null}
            </li>

            <li>
              {isAuthenticated ? (
                <Link onClick={() => dispatch(logoutSuccess())} to="/">
                  Abmelden{" "}
                </Link>
              ) : null}
            </li>
            <li>
              {!isAuthenticated ? (
                <Link to="register">Registrieren</Link>
              ) : null}
            </li>
            <li>
              {isAuthenticated && firstName ? (
                <div style={{}}>
                  <Link to="myProfile"> Hallo {firstName} ! </Link>
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export const Navbar = connect(mapStateToProps)(NavbarComponent);
