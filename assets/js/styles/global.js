import { injectGlobal } from 'styled-components'

import badaboom from '../../fonts/badaboom.ttf'

injectGlobal`
    @font-face {
        font-family: 'badaboom';
        src: url('${badaboom}');
    }

    body {
        margin: 0;
    }
`
