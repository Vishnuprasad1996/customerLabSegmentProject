import React, { forwardRef, useState } from "react";
import "./index.css";
import AddNewSchema from "../AddNewSchema";
import SchemaCard from "../SchemaCard";

const SegmentModel = forwardRef(function SegmentModel(props, ref) {
  const [segmentName, setSegmentName] = useState("");
  const [schemaValue, setSchemaValue] = useState("");
  const [schemaLabel, setSchemaLabel] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const [editedSchemaValue, setEditedSchemaValue] = useState("");
  const [editedSchemaLabel, setEditedSchemaLabel] = useState("");

  const onChangeSegmentNameHandler = (event) => {
    setSegmentName(event.target.value);
  };

  const onEditSchemaCardHanlder = (event, editListItem) => {
    event.preventDefault();
    // console.log(selectedSchemas, "selectedSchemas");

    selectedSchemas.map((eachItem) => {
      if (Object.keys(eachItem) === editListItem) {
        console.log(Object.keys(eachItem), "same");
      } else {
        console.log(Object.keys(eachItem), editListItem, "same");
      }
    });

    // setSelectedSchemas((prevState) => {
    //   prevState.map((eachItem) => {
    //     if (Object.keys(eachItem) === editListItem) {
    //       return { ...eachItem, [editedSchemaValue]: editedSchemaLabel };
    //     } else {
    //       return eachItem;
    //     }
    //   });
    // });
  };

  const onClickAddNewSchemaHandler = (event) => {
    event.preventDefault();

    if (schemaLabel === "") return;

    setSelectedSchemas((prevState) => [
      ...prevState,
      { [schemaValue]: schemaLabel },
    ]);
    setSchemaValue("");
    setSchemaLabel("");
  };

  const sendDataToWebHook = async () => {
    const serverUrl =
      "https://webhook.site/ad0396e2-0c2e-49b2-806a-4551cc34da03";

    const data = {
      segment_name: segmentName,
      schema: selectedSchemas,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(serverUrl, options);

      if (response.ok) {
        console.log("Data send successfully");
      } else {
        console.error(
          "Failed to send data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const saveTheSegmentHandler = (event) => {
    event.preventDefault();

    sendDataToWebHook();
  };

  return (
    <dialog ref={ref}>
      <header className="segment-header">
        <h1 className="segment-heading">Saving Segment</h1>
      </header>
      <form>
        <div className="container">
          <label className="labels" htmlFor="segment_name">
            Enter the name of the Segment
          </label>
          <input
            placeholder="Name of the Segment"
            className="inputs"
            id="segment_name"
            value={segmentName}
            onChange={onChangeSegmentNameHandler}
          />
        </div>
        <p className="p-texts">
          To save the segment, you need to add the schemas to build the query
        </p>
        <SchemaCard
          selectedSchemas={selectedSchemas}
          editedSchemaValue={editedSchemaValue}
          editedSchemaLabel={editedSchemaLabel}
          setEditedSchemaValue={setEditedSchemaValue}
          setEditedSchemaLabel={setEditedSchemaLabel}
          onEditSchemaCardHanlder={onEditSchemaCardHanlder}
        />
        <AddNewSchema
          schemaValue={schemaValue}
          setSchemaValue={setSchemaValue}
          setSchemaLabel={setSchemaLabel}
        />
        <button
          className="add-new-schema-button"
          onClick={onClickAddNewSchemaHandler}
        >
          +Add new schema
        </button>
        <div>
          <button onClick={saveTheSegmentHandler} className="save-button">
            Save the Segment
          </button>
          <button className="cancel-button">Cancel</button>
        </div>
      </form>
    </dialog>
  );
});

export default SegmentModel;
