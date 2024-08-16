import {
  EmbeddedZupassProvider,
  useEmbeddedZupass,
} from "./hooks/useEmbeddedZupass";
import { Navbar } from "./components/Navbar";
import { GPC } from "./apis/GPC";
import { FileSystem } from "./apis/FileSystem";
import { ZUPASS_URL } from "./constants";

const zapp = {
  name: "test-client",
  permissions: ["read", "write"],
};

function App() {
  const { connected } = useEmbeddedZupass();
  const zupassUrl = window.localStorage.getItem("zupassUrl") || ZUPASS_URL;

  return (
    <EmbeddedZupassProvider zapp={zapp} zupassUrl={zupassUrl}>
      <Navbar connecting={!connected} />
      <div className="container mx-auto my-4 p-4">
        <p>You can use this page to test the embedded Zupass API.</p>
        <div className="flex flex-col gap-4 my-4">
          <FileSystem />
          <GPC />
          {/* <Identity /> */}
        </div>
      </div>
    </EmbeddedZupassProvider>
  );
}

export default App;
