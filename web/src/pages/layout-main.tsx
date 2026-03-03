import { Outlet } from "react-router";
import LogoIcon from "../assets/LogoIcon.svg?react";

export function LayoutMain() {
	return (
		<>
		<div className="mx-auto max-md:flex max-md:justify-center max-w-6xl px-6 py-10">
			<header>
				<LogoIcon/>
			</header>
		</div>

			<main className="mx-auto max-w-6xl px-2 md:px-6">
				<Outlet />
			</main>
		</>


	);
}
