import React from 'react'
import ContentLoader from 'react-content-loader'
import propTypes from 'prop-types'

LoadingView.propTypes = {
  perPage: propTypes.number
}

LoadingView.defaultProps = {
  perPage: 20
}

function LoadingView({perPage}) {
  return (
    <React.Fragment>
    {Array(perPage)
      .fill("")
      .map((e, i) => (
        <Loader 
          key={i} 
          style={{ opacity: Number(2 / i).toFixed(1) }} 
        />
      ))}
    </React.Fragment>
  )
}

const Loader = () => (
  <ContentLoader
    height={50}
    width={1060}
    speed={10}
    primaryColor="#d9d9d9"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" />
    <rect x="34" y="13" rx="6" ry="6" width="200" height="12" />
    <rect x="200" y="13" rx="6" ry="6" width={23} height="12" />
    <rect x="400" y="13" rx="6" ry="6" width={78} height="12" />
    <rect x="600" y="13" rx="6" ry="6" width={117} height="12" />
    <rect x="800" y="13" rx="6" ry="6" width={83} height="12" />
    <rect x="950" y="13" rx="6" ry="6" width={83} height="12" />

    <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
  </ContentLoader>
)

export { LoadingView }
