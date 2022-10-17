import React, { useEffect } from "react";

import Button from "components/Button";
import ColorPicker from "components/ColorPicker";
import BrickPicker from "components/BrickPicker";

import styles from "styles/components/topbar";

// useEffect(() => {
//   //Runs only on the first render
//   console.log("fucskd");
// }, []);

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
}) => {
  console.log("Koca: brickBuilt in topbar", brickBuilt);
  return (
    <div className={styles.topbar}>
      <div className={styles.section}>
        <div className={styles.title}>{bricksAdded}</div>
        <Button
          active={mode === "build"}
          onClick={() => onClickSetMode("build")}
          icon="hammer"
          text="Build"
        />
        <Button
          active={mode === "paint"}
          onClick={() => onClickSetMode("paint")}
          icon="paintbrush"
          text="Paint"
        />
        <Button
          active={mode === "build"}
          onClick={() => onClickSetMode("build")}
          icon="paintbrush"
          text="Delete"
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
      <div className={styles.rightSection}>
        <Button
          active={utilsOpen}
          onClick={onClickToggleUtils}
          icon="navicon-round"
          text="Utils"
        />
      </div>
      {children}
    </div>
  );
};

export default Topbar;
