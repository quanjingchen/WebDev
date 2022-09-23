import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisable, setDisable] = useState(false);
  const [text, setText] = useState("Gimme gimme");


  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setText(await authenticatedCanister.payOut());
    

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🎰 Lottery
        </span>
         
      </h2>
      <label>Get your free PANG tokens here! Claim up to 100,000,000 PANG coins to your account: {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisable} 
        >
          {text}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
