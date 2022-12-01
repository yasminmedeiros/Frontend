import React from 'react';
import { PropTypes } from 'prop-types';
import { components } from 'react-select';
import './styles.css';

const CustomOption = ({ children, ...props }) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  
  return (
    <components.Option {...newProps} className="custom-option">
      {children}
    </components.Option>
  );
};

CustomOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default CustomOption;