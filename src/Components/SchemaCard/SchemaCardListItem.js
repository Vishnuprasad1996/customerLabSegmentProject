import React, { useState } from "react";
import AddNewSchema from "../AddNewSchema";
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
  } = props;

  const [editIconClicked, setEditButtonClicked] = useState(false);
  const [editListItem, setEditListItem] = useState("");
  const [deleteListItem, setDeleteListItem] = useState("");

  const onClickEditIcon = () => {
    setEditButtonClicked(true);
    setEditListItem(Object.keys(eachSchema));
  };

  const onClickDeleteIcon = () => {
    setDeleteListItem(Object.keys(eachSchema));
  };

  const onClickSaveButtonHandler = (event) => {
    event.preventDefault();
    onEditSchemaCardHanlder(event, editListItem);
    setEditButtonClicked(false);
  };

  return (
    <>
      {!editIconClicked ? (
        <li className="card-list-item">
          <p>{Object.values(eachSchema)}</p>
          <div className="icon-cont">
            <MdEdit className="edit-icon" onClick={onClickEditIcon} />
            <MdDelete className="delete-icon" onClick={onClickDeleteIcon} />
          </div>
        </li>
      ) : (
        <li className="card-list-item">
          {/* <AddNewSchema
            schemaValue={schemaValue}
            setSchemaValue={setSchemaValue}
            setSchemaLabel={setSchemaLabel}
          /> */}
          <EditSchema
            editListItem={editListItem}
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
