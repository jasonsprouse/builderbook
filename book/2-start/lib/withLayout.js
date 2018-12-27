// CH. LAYOUT W/O MATERIAL SSR
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../components/Header';

function withLayout(BaseComponent) {
  class App extends React.Component {
    render() {
      return (
        <div>
          <CssBaseline />
          <Header {...this.props} />
          <BaseComponent {...this.props} />
        </div>
      );
    }
  }

  App.getInitialProps = (ctx) => {
    if (BaseComponent.getInitialProps) {
      return BaseComponent.getInitialProps(ctx);
    }

    return {};
  };

  return App;
}

export default withLayout;

// // CH.1 SETUP FOR MATERIAL SSR & CH.2 EXPRESS SERVER
// import React from 'react';
// // import PropTypes from 'prop-types';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Button from '@material-ui/core/Button';

// import getContext from './context';
// import Header from '../components/Header';

// function withLayout(BaseComponent) {
//   class App extends React.Component {
//     constructor(props) {
//       super(props);
//       const { pageContext } = this.props;
//       this.pageContext = pageContext || getContext();
//     }

//     componentDidMount() {
//       const jssStyles = document.querySelector('#jss-server-side');
//       if (jssStyles && jssStyles.parentNode) {
//         jssStyles.parentNode.removeChild(jssStyles);
//       }
//     }

//     render() {
//       return (
//         <MuiThemeProvider
//           theme={this.pageContext.theme}
//           sheetsManager={this.pageContext.sheetsManager}
//         >
//           <CssBaseline />
//           <div>
//             <Header {...this.props} />
//             <BaseComponent {...this.props} />
//             <Button variant="outlined">Button</Button>
//           </div>
//         </MuiThemeProvider>
//       );
//     }
//   }

//   App.getInitialProps = (ctx) => {
//     if (BaseComponent.getInitialProps) {
//       return BaseComponent.getInitialProps(ctx);
//     }

//     return {};
//   };

//   return App;
// }

// // App.propTypes = {
// //   pageContext: PropTypes.object, // eslint-disable-line
// // };

// // App.defaultProps = {
// //   pageContext: null,
// // };

// // return App;
// // }

// export default withLayout;
