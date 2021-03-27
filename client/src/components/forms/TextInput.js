import React from 'react';

const TextInput = ({name, type, value="", onChange}) => {
  return (
    <input
      className={'text-input'}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={name}
      autoComplete=''
    />
  );
}

export default TextInput;