import React from "react";
import { saveAs } from "file-saver";
import autobind from "autobind-decorator";

import FileUploader from "./FileUploader";
import Brick from "components/engine/Brick";

import styles from "../styles/components/sidebar";

class Sidebar extends React.Component {
  saveDataModel = () => {
    console.log("WE HIT savedatamodel func");
    // axios
    //   .post(
    //     " https://6xo1uwhbg0.execute-api.us-west-1.amazonaws.com/default/serverlessAppFunctionIncrement",
    //     JSON.stringify({ key1: "json Stringify to the rescue" })
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });

    return fetch(
      "https://pqsds8ch8k.execute-api.us-west-1.amazonaws.com/default/postDataToSavedModels",
      {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          // key1: "fc5c1aa6-4258-4cde-abca-2d082bf158f4",
          key1: "testing from dataModel",
        }),
      }
    ).then((response) => response.json());
  };

  render() {
    const { utilsOpen, resetScene } = this.props;
    return (
      <div className={utilsOpen ? styles.visible : styles.sidebar}>
        <div className={styles.content}>
          <div className={styles.row} onClick={resetScene}>
            <div className={styles.text}>
              <i className="ion-trash-a" />
              <span>Reset scene</span>
            </div>
          </div>
          <div className={styles.row} onClick={this.saveDataModel}>
            <div className={styles.text}>
              <i className="ion-log-out" />
              <span>Export to Dynamo</span>
            </div>
          </div>
          <div className={styles.row}>
            <FileUploader onFinish={this._importFile}>
              <div className={styles.text}>
                <i className="ion-log-in" />
                <span>Import scene</span>
              </div>
            </FileUploader>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  _exportFile() {
    saveDataModel();
    // const { objects } = this.props;
    // const fileName = 'scene.json';
    // const simplified = objects.map((o) => ({
    //   intersect: o._intersect,
    //   color: o._color,
    //   dimensions: o._dimensions,
    //   rotation: o._rotation,
    //   translation: o._translation,
    // }));
    // var fileToSave = new Blob([JSON.stringify(simplified)], {
    //   type: 'application/json',
    //   name: fileName,
    // });
    // saveAs(fileToSave, fileName);
  }

  // TODO: bad, do this in epic/saga/thunk but not here
  @autobind
  _importFile(objects) {
    const { importScene } = this.props;
    const bricks = objects.map(
      (o) =>
        new Brick(o.intersect, o.color, o.dimensions, o.rotation, o.translation)
    );
    importScene(bricks);
  }
}

export default Sidebar;
