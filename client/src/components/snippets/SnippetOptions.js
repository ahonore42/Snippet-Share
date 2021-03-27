import React from 'react';

const SnippetOptions = ({selections, title, name, onChange, value}) => {
  return (
    <div className="field">
      <label style={{fontWeight: 'bold'}}>{title}:</label>
      <p className="control">
        <span className="select">
          <select
            className={'form-select'}
            name={value.name}
            onChange={onChange}
            value={value}
          >
            {selections.map(choice => (
              <option key={choice.name} value={choice}>
                {choice.name}
              </option>
            ))}
          </select>
        </span>
      </p>
    </div>
  );
}

export default SnippetOptions;