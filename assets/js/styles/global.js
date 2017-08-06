import { injectGlobal } from 'styled-components'

import background from '../../images/background.jpg'
import badaboom from '../../fonts/badaboom.ttf'

injectGlobal`
    @font-face {
        font-family: 'badaboom';
        src: url('${badaboom}');
    }

    body {
        margin: 0;
    }

    .root-background {
        background-image: url(${background});
        background-position: center center;
        background-size: cover;
        height: 100%;
        position: fixed;
        width: 100%;
        z-index: 0;
    }
`
