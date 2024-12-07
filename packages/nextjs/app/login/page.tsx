"use client"

import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth"

export default function Page () {
    let router = useRouter()
    let { address } = useAccount()

    let { data, isError } = useScaffoldReadContract({
        contractName: "Backend",
        functionName: "getUserDetailsByAddress",
        args: [address]
    })
    
    
    if (isError) router.push("/register")
    else if (data) {
        let [ name, vehicleRegistrationNumber ] = data
        window.localStorage.setItem("user", JSON.stringify({name, vehicleRegistrationNumber}))
        router.push("/dashboard")
    }


    return <></>
}