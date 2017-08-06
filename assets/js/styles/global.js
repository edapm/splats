import { injectGlobal } from 'styled-components'

injectGlobal`
    @font-face {
        font-family: 'badaboom';
        src: url('/fonts/badaboom.ttf');
    }

    body {
        margin: 0;
    }

    .root-background {
        background-image: url("/images/background.jpg");
        background-position: center center;
        background-size: cover;
        height: 100%;
        position: fixed;
        width: 100%;
        z-index: 0;
    }
`
