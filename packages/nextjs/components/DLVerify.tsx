import { useEffect, useState } from "react"
import { DLModal } from "~~/app/register/component/dl-modal"
import { IoMdCheckmark } from "react-icons/io"

export default function DLVerify () {
    let [ modalOpen, setModalOpen ] = useState(false)
    const [proof, setProof] = useState<any>();
    
    useEffect(() => {
        if (window.localStorage.getItem("dl_verif")) {
            setProof(JSON.parse(window.localStorage.getItem("dl_verif") || ""))
        }
    }, [])
    useEffect(() => {
        if (proof) {
            window.localStorage.setItem("dl_verif", JSON.stringify(proof))
            setModalOpen(false)
        }
    }, [proof])

   

    return (
        <>
        {
            proof ?
            <div className="border border-black rounded-lg flex justify-center items-center gap-1 py-2">
                <IoMdCheckmark className="text-green-500" size={25}/>
                DL Verification Done
            </div>
            :
            <button className="btn btn-secondary mt-4 w-full" onClick={() => setModalOpen(true)}>
                Verify with Driving License
            </button>
        }
        {modalOpen && (
            <dialog className="modal modal-open">
                <div className="modal-content bg-slate-50 p-2 rounded-lg">
                    <button onClick={() => setModalOpen(false)} className="close-button">
                        &times;
                    </button>
                    <DLModal proof = {proof} setProof = {setProof}/>
                </div>
            </dialog>
        )}
      </>
    )
}