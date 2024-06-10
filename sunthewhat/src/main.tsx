import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './pages/homePage';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/index';
import { LandingPage } from './pages/landingPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/home',
		element: <Homepage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider theme={theme}>
		<RouterProvider router={router} />
	</ChakraProvider>
);

//
