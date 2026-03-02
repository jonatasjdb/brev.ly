import { CopyIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";

function App() {
	return (
		<>
    <div className="flex flex-col p-2 gap-2">
      <Button>Label</Button>
      <Button structure="secondary" icon={<CopyIcon size={30} />}>Label</Button>
      Disabled
      <Button disabled>Label</Button>

      <Button structure="secondary" icon={<CopyIcon size={30} />} disabled>Label</Button>
    </div>

		</>
	);
}

export default App;
