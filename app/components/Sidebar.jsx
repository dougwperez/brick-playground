import React from "react";
import { saveAs } from "file-saver";
import autobind from "autobind-decorator";

import FileUploader from "./FileUploader";
import Brick from "components/engine/Brick";

import styles from "../styles/components/sidebar";

class Sidebar extends React.Component {
  saveDataModel = () => {
    const { objects } = this.props;
    const fileName = "scene.json";
    const simplified = objects.map((o) => ({
      intersect: o._intersect,
      color: o._color,
      dimensions: o._dimensions,
      rotation: o._rotation,
      translation: o._translation,
    }));
    const stringifiedSimplified = JSON.stringify(simplified);
    console.log("simplified", JSON.stringify(simplified));

    return fetch(
      "https://pqsds8ch8k.execute-api.us-west-1.amazonaws.com/default/postDataToSavedModels",
      {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          // key1: "fc5c1aa6-4258-4cde-abca-2d082bf158f4",
          key1: stringifiedSimplified,
        }),
      }
    ).then((response) => response.json());
  };

  loadDataModel = () => {
    console.log("IMPORT CALLED");

    return fetch(
      "https://pqsds8ch8k.execute-api.us-west-1.amazonaws.com/default/getDataFromSavedModels",
      {
        method: "GET",
        // body: JSON.stringify({
        //   key1: "fc5c1aa6-4258-4cde-abca-2d082bf158f4",
        //   // key1: `${idConfig}`,
        // }),
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
        const { importScene } = this.props;
        const objectifiedData = JSON.parse(data.Item.dataModel);
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
        importScene(bricks);
      });
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
            <div onClick={this.loadDataModel}>
              <div className={styles.text}>
                <i className="ion-log-in" />
                <span>Import from Dynamo</span>
              </div>
            </div>
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
