import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
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
                  : "0QClJ-zo8bI2P-svR7Gpc-i8o6TWnARnEg7yQXZjMQXf2ROv"),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
  );
}
