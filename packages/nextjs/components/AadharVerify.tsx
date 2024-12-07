"use client"

import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react"
import { useAccount } from "wagmi"
import { IoMdCheckmark } from "react-icons/io";

export default function AadharVerify () {
    const [anonAadhaar] = useAnonAadhaar();
    let { address } = useAccount()

    return (
        anonAadhaar.status == "logged-in" ?
        <div className="border border-black rounded-lg flex justify-center items-center gap-1 py-2">
            <IoMdCheckmark className="text-green-500" size={25}/>
            Aadhaar Verification Done
        </div>
        :
        <LaunchProveModal
            nullifierSeed={Math.floor(Math.random() * 1983248)}
            signal={address}
            buttonStyle={{
            borderRadius: "8px",
            border: "solid",
            borderWidth: "1px",
            boxShadow: "none",
            fontWeight: 500,
            borderColor: "#009A08",
            color: "#009A08",
            fontFamily: "rajdhani",
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            }}
        />
    )
}