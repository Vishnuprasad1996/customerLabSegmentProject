import React from "react";

const EditSchema = (props) => {
  const {
    editListItem,
    editedSchemaValue,
    editedSchemaLabel,
    setEditedSchemaLabel,
    setEditedSchemaValue,
  } = props;

  const onChangeSelectEditSchemaHandler = (event) => {
    const label = event.target.options[event.target.selectedIndex].label;
    const value = event.target.value;
    setEditedSchemaValue(value);
    setEditedSchemaLabel(label);
  };

  return (
    <div className="add-new-schema-cont">
      <select
        onChange={onChangeSelectEditSchemaHandler}
        value={editedSchemaValue ? editedSchemaValue : editListItem}
        className="edit-box"
      >
        <option value="" disabled>
          Add schema to segment
        </option>
        <option label="First Name" value="first_name">
          First Name
        </option>
        <option label="Last Name" value="last_name">
          Last Name
        </option>
        <option label="Gender" value="gender">
          Gender
        </option>
        <option label="Age" value="age">
          Age
        </option>
        <option label="Account Name" value="account_name">
          Account Name
        </option>
        <option label="City" value="city">
          City
        </option>
        <option label="State" value="state">
          State
        </option>
      </select>
    </div>
  );
};

export default EditSchema;
