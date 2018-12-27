import Head from 'next/head';
import Button from '@material-ui/core/Button';

import withLayout from '../lib/withLayout';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Home Page</title>
      <meta name="description" content="This is the description of the Index page" />
    </Head>
    <p>Content on Index page</p>
    <Button variant="contained">MUI button</Button>
  </div>
);

export default withLayout(Index);
