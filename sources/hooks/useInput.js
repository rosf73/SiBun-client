import React, { useState } from 'react';

const useInput = (initialValue) => {
  const [ value, setValue ] = useState(initialValue);
  const onChangeText = (text) => {
    setValue(text);
  }
  return { value, onChangeText };
};

export const useNumInput = (initialValue) => {
  const [ value, setValue ] = useState(parseInt(initialValue));
  const onChangeText = (text) => {
    text *= 1;
    setValue(text);
  }
  return { value, onChangeText };
};

export default useInput;