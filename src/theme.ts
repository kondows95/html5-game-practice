import { createMuiTheme } from '@material-ui/core/styles'
import secondary from '@material-ui/core/colors/yellow'
import primary from '@material-ui/core/colors/red'

export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1120, //changed 960 to 1120
      lg: 1280,
      xl: 1920
    }
  },
  typography: {
    fontSize: 15,
    button: {
      textTransform: "none"
    }
  },
  palette: {
    //primary: {main: primary["900"]},
    primary: primary,
    secondary: secondary,
  },
});