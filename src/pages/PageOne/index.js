import React, { useEffect } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import CoolIcon from "@/components/CoolIcon";
import styles from "./index.less";

const PageOne = props => {
  // console.log(props)
  const {
    dispatch,
    state: {
      global: { number },
      app
    }
  } = props;

  const handleClick = () => {
    dispatch({
      type: "global/delay",
      payload: "我的天"
    });
  };

  return (
    <div className={styles.page}>
      <div style={{ width: 100, height: 100, backgroundColor: '#ddd' }}>
        <CoolIcon name="loading" />
      </div>
      {number}
      <Button onClick={handleClick} type="danger">
        Button
      </Button>
    </div>
  );
};

export default connect(state => ({ state }))(PageOne);
