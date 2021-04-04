import GoogleLogin from 'react-google-login';
import { GOOGLE_CLINET_ID } from '../constants';

const responseGoogle = (response) => {
  console.log(response.tokenId);
}

const Home = () => (
  <GoogleLogin
    clientId={GOOGLE_CLINET_ID}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    scope="openid"
  />
)

export default Home
