import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { useHistory } from "react-router-dom";

const CustomLink = (props) => {
  const {
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props;
  const history = useHistory();
  
  return (
    <button
      {...rest}
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(CustomLink)