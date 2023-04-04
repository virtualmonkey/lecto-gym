
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const CustomLink = (props) => {
  const {
    location,
    match,
    staticContext,
    to,
    onClick,
    history,
    ...rest
  } = props;
  
  return (
    <button
      data-test={"link"}
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

export default withRouter(CustomLink);