import { useState } from "react";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import {CHAIN} from "@tonconnect/protocol";

export function TransferTon() {
  const { sender, connected, network } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0.01");

  return (
      <FlexBoxCol>

        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
{/*        <FlexBoxRow>
          <label>To </label>
          <Input
            style={{ marginRight: 8 }}
            value={tonRecipient}
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>*/}
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            sender.send({
              to: Address.parse(network === CHAIN.MAINNET
                  ? "UQDiTm-jnqNF3JuRtawetXQPsqwL20MHLPIKUqLDIyAjx00m"
                  : "0QDs0-tS6jquWmZM6qJsS6ZEsBE-FOr2qTjaZS631N-rsqp2"),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
  );
}
