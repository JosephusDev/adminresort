import { BrowserRouter } from 'react-router-dom';


import { AppThemeProvider, DrawerProvider, Auth } from './shared/contexts';
import { MenuLateral } from './shared/components';
import { AppRoutes } from './routes';
import Login from './shared/components/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  return (
    
    <BrowserRouter>
      <Auth>
        <Login>
          <AppThemeProvider>
            <DrawerProvider>
                  <MenuLateral>
                    <AppRoutes />
                  </MenuLateral>
            </DrawerProvider>
          </AppThemeProvider>
        </Login>
        <ToastContainer />
      </Auth>
    </BrowserRouter>
  );
};
