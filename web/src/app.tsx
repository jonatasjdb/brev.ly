import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutMain } from "./pages/layout-main";
import { NotFound } from "./pages/not-found";
import { PageHome } from "./pages/page-home";
import { Redirect } from "./pages/redirect";

function App() {
	return (
		<BrowserRouter>
			{/* <nav>
          <Link to="/">Home</Link>
          <Link to="/redirect">Red</Link>
        </nav> */}
			<Routes>
				<Route path="/" element={<LayoutMain />}>
					<Route index element={<PageHome />} />
					<Route path="/:code" element={<Redirect />} />
          <Route path="/not-found" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
