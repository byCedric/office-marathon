import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { App } from './src/app';
import config from './src/aws-exports';

Amplify.configure(config)

export default withAuthenticator(App); 

//export { App as default } from './src/app';

