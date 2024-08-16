import { EmbeddedZupassProvider } from "./hooks/useEmbeddedZupass";
import { Navbar } from "./components/Navbar";
import { GPC } from "./apis/GPC";
import { FileSystem } from "./apis/FileSystem";
import { ZUPASS_URL } from "./constants";
import { Identity } from "./apis/Identity";

const zapp = {
  name: "test-client",
  permissions: ["read", "write"],
};

function App() {
  const zupassUrl = localStorage.getItem("zupassUrl") || ZUPASS_URL;

  return (
    <EmbeddedZupassProvider zapp={zapp} zupassUrl={zupassUrl}>
      <Navbar />
      <div className="container mx-auto my-4 p-4">
        <p>You can use this page to test the embedded Zupass API.</p>
        <div className="flex flex-col gap-4 my-4">
          <FileSystem />
          <GPC />
          <Identity />
        </div>
      </div>
    </EmbeddedZupassProvider>
  );
}

export default App;
