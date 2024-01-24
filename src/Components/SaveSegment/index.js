import React, { useRef } from "react";
import "./index.css";
import SegmentModel from "../SegmentModel";

const SaveSegment = () => {
  const modelRef = useRef(null);

  const onClickSaveSegmentHandler = () => {
    if (modelRef.current) {
      modelRef.current.showModal();
    }
  };

  return (
    <>
      <button
        className="save-segment-button"
        onClick={onClickSaveSegmentHandler}
      >
        Save segment
      </button>
      <SegmentModel ref={modelRef} />
    </>
  );
};

export default SaveSegment;
