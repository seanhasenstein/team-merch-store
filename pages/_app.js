import { OrderProvider } from '../context/OrderContext';
import '../styles/global.css';

const MerchOrderApp = ({ Component, pageProps }) => {
  return (
    <OrderProvider>
      <Component {...pageProps} />
    </OrderProvider>
  );
};

export default MerchOrderApp;
