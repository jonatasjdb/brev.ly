import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { LayoutMain } from "./pages/layout-main";
import { NotFound } from "./pages/not-found";
import { PageHome } from "./pages/page-home";
import { Redirect } from "./pages/redirect";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutMain />}>
					<Route index element={<PageHome />} />
					<Route path="/:code" element={<Redirect />} />
					<Route path="/not-found" element={<NotFound />} />
				</Route>
			</Routes>
			<Toaster richColors />
		</BrowserRouter>
	);
}

export default App;
