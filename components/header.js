import Link from "next/link";
import { useUser } from "../lib/hooks";
import ReactTooltip from "react-tooltip";

const Header = () => {
  const user = useUser();

  return (
    <header>
      <nav>
        <ul>
          <div data-tip="Toggle this to enable Developer Mode, <br /> which will show you Magic code snippets <br /> that power each action.">
            DEVELOPERS
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="nav-links-container">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
      <ReactTooltip place="bottom" effect="solid" type="dark" multiline={true} />
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          justify-content: space-between;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        .nav-links-container {
          display: flex;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          color: #ccc;
          background-color: #333;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 38px;
          height: 23px;
          margin-left: 10px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #555;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        input:checked + .slider {
          background-color: #999;
        }
        input:focus + .slider {
          box-shadow: 0 0 1px #999;
        }
        input:checked + .slider:before {
          -webkit-transform: translateX(14px);
          -ms-transform: translateX(14px);
          transform: translateX(14px);
        }
        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </header>
  );
};

export default Header;
