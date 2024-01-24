import React, { forwardRef, useState } from "react";
import "./index.css";
import AddNewSchema from "../AddNewSchema";
import SchemaCard from "../SchemaCard";

const SegmentModel = forwardRef(function SegmentModel(props, ref) {
  const { onClickCloseSegment } = props;

  const [segmentName, setSegmentName] = useState("");
  const [schemaValue, setSchemaValue] = useState("");
  const [schemaLabel, setSchemaLabel] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const [editedSchemaValue, setEditedSchemaValue] = useState("");
  const [editedSchemaLabel, setEditedSchemaLabel] = useState("");

  const onChangeSegmentNameHandler = (event) => {
    setSegmentName(event.target.value);
  };

  const onDeleteSchema = (deleteItem) => {
    console.log(...deleteItem);
    const filteredItems = selectedSchemas.filter(
      (eachItem) => !(Object.keys(eachItem)[0] === deleteItem[0])
    );
    setSelectedSchemas(filteredItems);
    console.log(filteredItems);
  };

  const onEditSchemaCardHanlder = (event, editListItem) => {
    event.preventDefault();

    setSelectedSchemas((prevState) =>
      prevState.map((eachItem) => {
        if (Object.keys(eachItem)[0] === editListItem) {
          return { [editedSchemaValue]: editedSchemaLabel };
        } else {
          return eachItem;
        }
      })
    );
    console.log(selectedSchemas);
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
    const webHookUrl =
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
      const response = await fetch(webHookUrl, options);

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

    if (segmentName === "" && selectedSchemas.length === 0) return;

    sendDataToWebHook();
    onClickCloseSegment();
    setSegmentName("");
    setSelectedSchemas([]);
  };

  const cancelTheSegmentHandler = (event) => {
    event.preventDefault();
    onClickCloseSegment();
  };

  return (
    <dialog ref={ref}>
      <header className="segment-header">
        <h1 className="segment-heading">Saving Segment</h1>
      </header>
      <form onSubmit={saveTheSegmentHandler}>
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
          onDeleteSchema={onDeleteSchema}
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
          <button type="submit" className="save-button">
            Save the Segment
          </button>
          <button onClick={cancelTheSegmentHandler} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default SegmentModel;
