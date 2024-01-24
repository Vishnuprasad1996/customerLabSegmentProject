import React, { useState } from "react";
import "./index.css";

import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditSchema from "./EditSchema";

const SchemaCardListItem = (props) => {
  const {
    eachSchema,
    editedSchemaValue,
    editedSchemaLabel,
    setEditedSchemaValue,
    setEditedSchemaLabel,
    onEditSchemaCardHanlder,
    onDeleteSchema,
  } = props;

  const [editIconClicked, setEditButtonClicked] = useState(false);
  const [editItem, setEditItem] = useState("");

  const onClickEditIcon = () => {
    setEditButtonClicked(true);
    setEditItem(Object.keys(eachSchema)[0]);
  };

  const onClickDeleteIcon = () => {
    onDeleteSchema(Object.keys(eachSchema));
  };

  const onClickSaveButtonHandler = (event) => {
    event.preventDefault();
    onEditSchemaCardHanlder(event, editItem);
    setEditButtonClicked(false);
    setEditedSchemaValue("");
    setEditedSchemaLabel("");
  };

  return (
    <>
      {!editIconClicked ? (
        <li className="card-list-item">
          <p>{Object.values(eachSchema)[0]}</p>
          <div className="icon-cont">
            <MdEdit className="edit-icon" onClick={onClickEditIcon} />
            <MdDelete className="delete-icon" onClick={onClickDeleteIcon} />
          </div>
        </li>
      ) : (
        <li className="card-list-item">
          <EditSchema
            editedSchemaValue={editedSchemaValue}
            editedSchemaLabel={editedSchemaLabel}
            setEditedSchemaValue={setEditedSchemaValue}
            setEditedSchemaLabel={setEditedSchemaLabel}
          />
          <FaSave className="save-icon" onClick={onClickSaveButtonHandler} />
        </li>
      )}
    </>
  );
};

export default SchemaCardListItem;
