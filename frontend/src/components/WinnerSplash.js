import React from "react";
import '../index.css'

import Confetti from "react-confetti";

export function WinnerSplash () {
    return (
        <div className="splash">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                opacity={0.6}
                gravity={0.07}
            />
        </div>
      );
}
  