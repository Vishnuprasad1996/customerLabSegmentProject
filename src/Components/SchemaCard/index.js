import React from "react";
import "./index.css";

import SchemaCardListItem from "./SchemaCardListItem";

const SchemaCard = (props) => {
  const {
    selectedSchemas,
    editedSchemaValue,
    editedSchemaLabel,
    setEditedSchemaValue,
    setEditedSchemaLabel,
    onEditSchemaCardHanlder,
  } = props;

  return (
    <div className="schema-card-cont">
      <ul className="list-cont">
        {selectedSchemas.map((eachSchema, index) => (
          <SchemaCardListItem
            key={index}
            eachSchema={eachSchema}
            editedSchemaValue={editedSchemaValue}
            editedSchemaLabel={editedSchemaLabel}
            setEditedSchemaValue={setEditedSchemaValue}
            setEditedSchemaLabel={setEditedSchemaLabel}
            onEditSchemaCardHanlder={onEditSchemaCardHanlder}
          />
        ))}
      </ul>
    </div>
  );
};

export default SchemaCard;
