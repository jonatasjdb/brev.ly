import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { LayoutMain } from "./pages/layout-main";
import { PageHome } from "./pages/page-home";
import { PageNotFound } from "./pages/page-not-found";
import { PageRedirect } from "./pages/page-redirect";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutMain />}>
					<Route index element={<PageHome />} />
					<Route path="/:code" element={<PageRedirect />} />
					<Route path="/page-not-found" element={<PageNotFound />} />
				</Route>
			</Routes>
			<Toaster richColors />
		</BrowserRouter>
	);
}
export default App;
