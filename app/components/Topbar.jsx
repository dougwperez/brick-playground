import React, { useEffect } from "react";

import Button from "components/Button";
import ColorPicker from "components/ColorPicker";
import BrickPicker from "components/BrickPicker";

import styles from "styles/components/topbar";

const Topbar = ({
  mode,
  onClickSetMode,
  color,
  onClickSetColor,
  grid,
  onClickToggleGrid,
  brickSize,
  onClickSetBrick,
  utilsOpen,
  onClickToggleUtils,
  children,
  brickBuilt,
  bricksAdded,
  setId,
}) => {
  console.log("Koca: brickBuilt in topbar", brickBuilt);

  // console.log("Koca: testing ", testing());

  // const getId = (event) => {
  //   console.log("event.target.textContent", event.target.textContent);
  //   setId(event.target.textContent);
  // };

  return (
    <div className={styles.topbar}>
      <div className={styles.section}>
        <div className={styles.rightSection}>
          <Button
            active={utilsOpen}
            onClick={onClickToggleUtils}
            icon="navicon-round"
            text="Utils"
          />
        </div>
        <div
          className={styles.title}
          onClick={(event) => setId(event.target.textContent)}
        >
          {/* NOTE: CAN MANUALLY TEST idCONFIGS BELOW */}
          {"IDCONFIG"}
        </div>

        <Button
          active={mode === "build"}
          onClick={() => onClickSetMode("build")}
          icon="hammer"
          text="Build"
        />
        <Button
          active={mode === "paint"}
          onClick={() =>
            mode !== "paint" ? onClickSetMode("paint") : onClickSetMode("build")
          }
          icon="paintbrush"
          text="Paint"
        />
        <Button
          active={mode === "delete"}
          onClick={() =>
            mode !== "delete"
              ? onClickSetMode("delete")
              : onClickSetMode("build")
          }
          icon="close"
          text="Delete"
        />
        <Button
          active={mode === "rotate"}
          onClick={() =>
            mode !== "rotate"
              ? onClickSetMode("rotate")
              : onClickSetMode("build")
          }
          icon="nuclear"
          text="Rotate"
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Color</div>
        <ColorPicker background={color} handleSetColor={onClickSetColor} />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Brick</div>
        <BrickPicker
          selectedSize={brickSize}
          handleSetBrick={onClickSetBrick}
        />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Scene</div>
        <Button
          active={grid}
          onClick={onClickToggleGrid}
          icon="grid"
          text="Grid"
        />
      </div>
      {/* <div className={styles.rightSection}>
        <Button
          active={utilsOpen}
          onClick={onClickToggleUtils}
          icon="navicon-round"
          text="Utils"
        />
      </div> */}
      {children}
    </div>
  );
};

export default Topbar;
