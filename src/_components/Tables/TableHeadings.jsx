import React from 'react'
import PropTypes from 'prop-types'

TableHeadings.propTypes = {
  headingNames: PropTypes.array.isRequired
}

TableHeadings.defaultProps = {
  headingNames: []
}

function TableHeadings(props) {
  const { tableHeadingNames } = props
  return (
    <thead>
      <tr>
        {tableHeadingNames && tableHeadingNames.map((headingName, index) => (
          <th key={index}>
            {headingName}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export { TableHeadings }

