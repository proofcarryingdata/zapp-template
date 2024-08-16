import { ReactNode, useState } from "react";
import { useEmbeddedZupass } from "../hooks/useEmbeddedZupass";
import { PODPCDTypeName } from "@pcd/pod-pcd";
import { SerializedPCD } from "@pcd/pcd-types";

export function FileSystem(): ReactNode {
  const { z, connected } = useEmbeddedZupass();
  const [rawList, setRawList] = useState<SerializedPCD[]>([]);
  const [niceList, setNiceList] = useState<SerializedPCD[]>([]);

  return !connected ? null : (
    <div>
      <h1 className="text-xl font-bold mb-2">File system</h1>
      <div className="prose">
        <div>
          <p>Get your 0xPODs displayed in a raw format 🛠️</p>
          <button
            className="btn btn-primary"
            onClick={async () => {
              if (rawList.length) {
                setRawList([]);
                return;
              }
              try {
                const pcdIds = (await z.fs.list("0xPODs"))
                  .filter(
                    (l) => l.type === "pcd" && l.pcdType === PODPCDTypeName
                  )
                  // @ts-expect-error type
                  .map((l) => l.id);
                const pods = await Promise.all(
                  pcdIds.map((id) => z.fs.get(id))
                );
                setRawList(pods);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {rawList.length ? "Hide me" : "Show me!"}
          </button>
          {rawList.length > 0 && (
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(rawList, null, 2)}
            </pre>
          )}

          <p>Get your 0xPODs displayed in a nice gallery format ✨ 🖼 ️✨</p>
          <button
            className="btn btn-primary"
            onClick={async () => {
              try {
                if (niceList.length) {
                  setNiceList([]);
                  return;
                }
                const pcdIds = (await z.fs.list("0xPODs"))
                  .filter(
                    (l) => l.type === "pcd" && l.pcdType === PODPCDTypeName
                  )
                  // @ts-expect-error type
                  .map((l) => l.id);
                const pods = await Promise.all(
                  pcdIds.map((id) => z.fs.get(id))
                );
                setNiceList(pods);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {niceList.length ? "Hide me" : "Show me!"}
          </button>
          {niceList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {niceList.map((serializedPCD, index) => (
                <div key={index} className="aspect-square  rounded-lg">
                  <img
                    src={
                      JSON.parse(serializedPCD.pcd)?.claim?.entries
                        ?.zupass_image_url?.value
                    }
                    alt={`0xPOD ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
