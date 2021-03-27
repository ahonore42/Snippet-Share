import React from 'react';

const EditorOptions = ({title, name, selections, onChange, value}) => {
  return (
    <div className="field">
      <label style={{fontWeight: 'bold'}}>{title}:</label>
      <p className="control">
        <span className="select">
          <select
            className={'form-select'}
            name={name}
            onChange={onChange}
            value={value}
          >
            {selections.map(choice => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </span>
      </p>
    </div>
  );
}

export default EditorOptions;