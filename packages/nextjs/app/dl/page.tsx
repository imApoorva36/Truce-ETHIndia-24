'use client'
import React from "react";
import { groth16 } from "snarkjs";
import { generateInput } from "./anon-digilocker";
import revealSelectors from "./reveal-selectors.json";


export default function App() {
  const [xmlContent, setXmlContent] = React.useState('');
  const [status, setStatus] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [revealStart, setRevealStart] = React.useState('');
  const [revealEnd, setRevealEnd] = React.useState('');
  const [proof, setProof] = React.useState<any>();

  function handleXMLChange(newXml: any) {
    setXmlContent(newXml);

    const hasMatch = revealSelectors.some((selector) => {
      const searchKey = `<CertificateData><${selector.documentType}`;
      
      if (!newXml.includes(searchKey)) {
        return false;
      }

      setRevealStart(selector.revealStart);
      setRevealEnd(selector.revealEnd);
      return true;
    });

    if (!hasMatch) {
      setRevealStart('');
      setRevealEnd('');
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    (document.getElementsByClassName("btn-submit")[0] as HTMLButtonElement).disabled = true;

    try {
      const nullifierSeed = parseInt(e.target.nullifierSeed.value.trim());
      const signalStr = e.target.signal.value.trim();
      const signal = [...new TextEncoder().encode(signalStr)].reduce(
        (acc, byte, i) => acc + BigInt(byte) * BigInt(256) ** BigInt(i),
        BigInt(0),
      );

      setStatus("Generating input...");

      const cleanXml = xmlContent.replace("\n", "").trim();
      const inputs = await generateInput(cleanXml, {
        nullifierSeed,
        revealStart,
        revealEnd,
        signal: signal.toString(),
      });

      setStatus("Generating proof...");

      const startTime = performance.now()
      const fullProof = await groth16.fullProve(
        inputs,
        `https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/digilocker/digilocker-verifier.wasm`,
        `circuit_final1.zkey`,
        console,
      );
      const result = await groth16.verify(
        await fetch(`https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/digilocker/vkey.json`).then((res) => res.json()),
        fullProof.publicSignals,
        fullProof.proof,
      );
      const endTime = performance.now();
      const duration = Math.round((endTime - startTime) / 1000);

      setStatus(result ? `Proof generated and verified in ${duration}s` : "Proof failed");

      if (result) {
        setProof(fullProof);
      }
    } catch (e) {
      setStatus(`Error: ${e}`);
    } finally {
      (document.getElementsByClassName("btn-submit")[0] as HTMLButtonElement).disabled = false;
    }
  }

  let revealString = "";
  let revealError = "";
  if (xmlContent && revealStart && revealEnd) {
    const certificateDataIndex = xmlContent.indexOf("<CertificateData>");
    const revealStartIndex = xmlContent.indexOf(revealStart, certificateDataIndex);
    const revealEndIndex = xmlContent.indexOf(revealEnd, revealStartIndex + revealStart.length + 1);

    if (revealStartIndex === -1 || revealEndIndex === -1) {
      revealError = `Cannot find any data between ${revealStart} and ${revealEnd}`;
    } else {
      revealString = xmlContent.substring(revealStartIndex, revealEndIndex + 1);

      if (revealString.length > 31) {
        revealError = `Cannot reveal more than 31 characters`;
      }
    }
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="container pb-5">
      <div className="box" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="mt-3 mb-3">Anon DigiLocker</h1>
        <hr />

        <div className="mb-3">
          <h5>
            <span className="mr-3">Instructions </span>
          </h5>
          <ul>
            <li>
              Open DigiLocker app and go to the <code>Issued</code> tab.
            </li>
            <li>
              Click the three dot menu icon against the document you want to prove and select{" "}
              <code>Download XML</code>.
            </li>
            <li>Copy the XMl content and paste in the form below.</li>
          </ul>
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          <label htmlFor="xml">DigiLocker XML (Paste below)</label>
          <textarea
            value={xmlContent}
            onChange={(e) => handleXMLChange(e.target.value)}
            className="text-black"
            style={{
              backgroundColor: "#f5f5f5",
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              height: "400px",
              overflowY: "scroll",
              marginTop: "10px",
              padding: 10
            }}
          />

          <hr />

          <div className="form-row row">
            <div>
              <h5>Selective Disclosure</h5>
              <p>
                You can reveal some data from the <code>{"<CertificateData />"}</code> node of the
                XML, as part of the proof. Type of the Document (PAN, DirivingLicense, etc.) will always be revealed.
              </p>
              <p>
                Enter the text from which the reveal should start and end. For example, in a PAN
                Verification Record XML you can reveal your PAN number which is between{" "}
                <code>num="</code> and <code>"</code> in the XML
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="revealStart">Reveal Start</label>

              <input
                type="text"
                className="form-control"
                id="revealStart"
                value={revealStart}
                onChange={(e) => setRevealStart(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="revealEnd">Reveal End</label>
              <input
                type="text"
                className="form-control"
                id="revealEnd"
                value={revealEnd}
                onChange={(e) => setRevealEnd(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              {revealError && (
                <div className="alert alert-danger" role="alert">
                  {revealError}
                </div>
              )}
              {revealString && !revealError && (
                <div className="alert alert-success" role="alert">
                  You are revealing <code>{revealString}</code> as part of the proof.
                </div>
              )}
            </div>
          </div>

          <hr />

          <div className="form-group mb-3">
            <label htmlFor="nullifierSeed">
              Nullifier Seed (a random number for generating unique nullifier)
            </label>
            <input
              type="number"
              defaultValue="1"
              maxLength={30}
              className="form-control"
              name="nullifierSeed"
              id="nullifierSeed"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="signal">
              Signal (any message you want to sign as part of the proof)
            </label>
            <input type="text" className="form-control" name="signal" id="signal" />
          </div>

          <button
            className="btn btn-submit btn-primary mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>

        {status.length > 0 && <div className="alert alert-light mt-4">{status}</div>}

        {proof && (
          <div className="alert alert-light">
            <code>
              <pre>{JSON.stringify(proof, null, 2)}</pre>
            </code>
          </div>
        )}
      </div>
    </div>
  );
}