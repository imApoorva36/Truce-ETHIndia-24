"use client";

import React from "react";
import { generateInput } from "../anon-digilocker";
import revealSelectors from "../reveal-selectors.json";
import { groth16 } from "snarkjs";

export const DLModal = () => {
  const [xmlContent, setXmlContent] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [revealStart, setRevealStart] = React.useState("");
  const [revealEnd, setRevealEnd] = React.useState("");
  const [proof, setProof] = React.useState<any>();

  function handleXMLChange(newXml: any) {
    setXmlContent(newXml);

    const hasMatch = revealSelectors.some(selector => {
      const searchKey = `<CertificateData><${selector.documentType}`;

      if (!newXml.includes(searchKey)) {
        return false;
      }

      setRevealStart(selector.revealStart);
      setRevealEnd(selector.revealEnd);
      return true;
    });

    if (!hasMatch) {
      setRevealStart("");
      setRevealEnd("");
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

      const startTime = performance.now();
      const fullProof = await groth16.fullProve(
        inputs,
        `https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/digilocker/digilocker-verifier.wasm`,
        `circuit_final1.zkey`,
        console,
      );
      const result = await groth16.verify(
        await fetch(`https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/digilocker/vkey.json`).then(res =>
          res.json(),
        ),
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

        <form onSubmit={handleSubmit}>
          <label htmlFor="xml">DigiLocker DL XML (Paste here)</label>
          <textarea
            value={xmlContent}
            onChange={e => handleXMLChange(e.target.value)}
            className="text-black"
            style={{
              backgroundColor: "#f5f5f5",
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              height: "200px",
              overflowY: "scroll",
              marginTop: "10px",
              padding: 10,
              width: "100%",
            }}
          />

          <hr />

          <div className="form-row row">
            <div className="col-md-6 mb-3">
              <label htmlFor="revealStart">Reveal Start</label>

              <input
                type="text"
                className="form-control border"
                id="revealStart"
                value={revealStart}
                onChange={e => setRevealStart(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="revealEnd">Reveal End</label>
              <input
                type="text"
                className="form-control border"
                id="revealEnd"
                value={revealEnd}
                onChange={e => setRevealEnd(e.target.value)}
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

          <div className="form-group mb-3">
            <label htmlFor="nullifierSeed">Nullifier Seed (a random number for generating unique nullifier)</label>
            <input
              type="number"
              defaultValue="1"
              maxLength={30}
              className="form-control border"
              name="nullifierSeed"
              id="nullifierSeed"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="signal">Signal (any message you want to sign as part of the proof)</label>
            <input type="text" className="form-control border" name="signal" id="signal" />
          </div>

          <button className="btn btn-submit btn-primary mt-4" type="submit">
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
};
