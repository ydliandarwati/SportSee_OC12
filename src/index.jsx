import ReactDOM from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import { Provider } from './context/Context'
import App from "./App";
import './style.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<HashRouter>
		<Provider>
			<App />
		</Provider>
	</HashRouter>
);



