// import { createTheme } from '@mui/material/styles';
import {lime,blue, grey, lightBlue ,purple} from '@mui/material/colors';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: blue[500]
//         },
//         secondary: {
//             main: lightBlue[800],
//             midNightBlue: "black"
//         }
//     }
// });

export const themeColors = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: purple[400],
                    white: "#black"
                },
                secondary: {
                    main: 	"#eeeeee",
                    midNightBlue:  			"#eeeeee "//jaw lina
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    main: "green",
                    white: "black"
                },
                secondary: {
                    main: "purple",
                    midNightBlue: "black"
                },
                background: {
                    default: "black",
                },
                text: {
                    primary: 'black',
                    secondary: 'black',
                },
            }),
    },
});
