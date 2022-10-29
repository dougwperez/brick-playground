import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  getMode,
  getColor,
  getIsGridVisible,
  getBrickDimensions,
  getAreUtilsOpen,
  getBricks,
} from "selectors";
import {
  setMode,
  setColor,
  toggleGrid,
  setBrick,
  toggleUtils,
  addBrick,
  removeBrick,
  updateBrick,
  resetScene,
  setScene,
} from "actions";
import Scene from "components/engine/Scene";
import Topbar from "components/Topbar";
import Help from "components/Help";
import Sidebar from "components/Sidebar";

import styles from "styles/containers/builder";
import Brick from "components/engine/Brick";

class Builder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brickBuilt: false, bricksAdded: 0, idConfig: "" };

    // this.brickBuiltFunc = this.brickBuiltFunc.bind(this);
  }

  // console.log("this.state.idConfig", this.state.idConfig)

  brickBuiltFunc = (bool) => {
    console.log("brickBuiltFunc Called!!!");
    this.setState({
      brickBuilt: bool,
    });
  };

  // incrementBricks = (prevState) => {
  //   console.log("brickBuiltFunc Called!!!");
  //   this.setState({
  //     bricksAdded: +1
  //   });
  // };

  incrementBricks = () => {
    this.setState((prevState) => {
      return { bricksAdded: prevState.bricksAdded + 1 };
    });
  };

  loadDataModel = () => {
    console.log("IMPORT CALLED");
    return fetch(
      `https://pqsds8ch8k.execute-api.us-west-1.amazonaws.com/default/getDataFromSavedModels`,
      {
        method: "GET",
      }
    )
      .then(function (response) {
        if (!response.ok) {
          return Promise.reject("some reason");
        }

        console.log("response", response);

        return response.json();
      })
      .then((data) => {
        // FILTER THROUGH FOR ITEM WITH CORRECT ID, THEN LOAD THAT ONE
        console.log("ALL DATA MODELS", data.Items);
        console.log("Koca: data ", data.Items[0].dataModel);
        console.log("idConfig to be Matched:", this.state.idConfig);
        const { importScene } = this.props;

        const allData = data.Items;
        const targetDataModel = allData.filter(
          (model) => model.modelId === "7d931aad-e47a-417a-abf6-91083198af70"
        );
        console.log("Koca: targetDataModel ", targetDataModel);
        const objectifiedData = JSON.parse(targetDataModel[0].dataModel);
        console.log("Koca: selectedData ", typeof objectifiedData);
        const bricks = objectifiedData?.map(
          (o) =>
            new Brick(
              o.intersect,
              o.color,
              o.dimensions,
              o.rotation,
              o.translation
            )
        );
        console.log("Koca: bricks ", bricks);
        this.props.setScene(bricks);
      })
      .catch((err) => console.log("err", err));
  };

  setId = (stringVal) => {
    this.setState({ idConfig: stringVal });
    console.log("importScene", setScene);
    this.loadDataModel();
  };

  render() {
    const {
      mode,
      setMode,
      color,
      setColor,
      gridVisible,
      toggleGrid,
      dimensions,
      setBrick,
      utilsOpen,
      toggleUtils,
      removeBrick,
      addBrick,
      bricks,
      updateBrick,
      resetScene,
      setScene,
      foobles,
      feed,
    } = this.props;
    console.log("Koca: bricksAdded ", this.state.bricksAdded);

    // function brickBuiltFunc() {
    //   console.log("brickBuiltFunc Called!!!");
    //   this.setState({
    //     brickBuilt: true,
    //   });
    // }

    return (
      <div className={styles.builder}>
        <Topbar
          onClickSetMode={setMode}
          onClickSetColor={setColor}
          onClickToggleGrid={toggleGrid}
          mode={mode}
          color={color}
          grid={gridVisible}
          brickSize={dimensions}
          onClickSetBrick={setBrick}
          utilsOpen={utilsOpen}
          onClickToggleUtils={toggleUtils}
          brickBuilt={this.state.brickBuilt}
          bricksAdded={this.state.bricksAdded}
          setId={this.setId}
        >
          <Sidebar
            utilsOpen={utilsOpen}
            resetScene={resetScene}
            objects={bricks}
            importScene={setScene}
          />
        </Topbar>
        <Scene
          brickColor={color}
          objects={bricks}
          mode={mode}
          grid={gridVisible}
          dimensions={dimensions}
          // shifted={utilsOpen}
          removeObject={removeBrick}
          addObject={addBrick}
          updateObject={updateBrick}
          brickBuilt={this.state.brickBuilt}
          brickBuiltFunc={this.brickBuiltFunc}
          incrementBricks={this.incrementBricks}
          idConfig={this.state.idConfig}
        />
        <Help inversed={utilsOpen} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: getMode(state),
  color: getColor(state),
  gridVisible: getIsGridVisible(state),
  dimensions: getBrickDimensions(state),
  utilsOpen: getAreUtilsOpen(state),
  bricks: getBricks(state),
});

const mapDispatchToProps = {
  setMode,
  setColor,
  toggleGrid,
  setBrick,
  toggleUtils,
  removeBrick,
  addBrick,
  updateBrick,
  resetScene,
  setScene,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Builder);
