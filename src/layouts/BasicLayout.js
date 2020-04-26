import React from "react";
import { withRouter} from "react-router-dom";

const BasicLayout = (props) => {
  // console.log(props)
  const { children, history, location: { pathname } } = props;
  
  return (
    <>
      <header onClick={() => { pathname === '/' ? history.push('/2') : history.push('/') }}>header</header>
      <div>{children}</div>
      <footer>footer</footer>
    </>
  );
};

export default withRouter(BasicLayout);
