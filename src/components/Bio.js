import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <p>
          Software Engineer. {' '} Python. {' '} Js. {' '} Scala. {' '} Go. {' '} Father. {' '}
          <a href="https://twitter.com/aslamhadi">@aslamhadi</a>
        </p>
      </div>
    )
  }
}

export default Bio
