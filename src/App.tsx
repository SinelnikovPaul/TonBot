import "./App.css";
import {TonConnectButton} from "@tonconnect/ui-react";
import {Counter} from "./components/Counter";
import {Jetton} from "./components/Jetton";
import {TransferTon} from "./components/TransferTon";
import styled from "styled-components";
import {Button, Card, Ellipsis, FlexBoxCol, FlexBoxRow, Input} from "./components/styled/styled";
import {useTonConnect} from "./hooks/useTonConnect";
import {CHAIN} from "@tonconnect/protocol";
import "@twa-dev/sdk";
import {useInitData, useWebApp} from "@vkruglikov/react-telegram-web-app";
import {InitDataUnsafe} from "@vkruglikov/react-telegram-web-app/lib/useInitData";
import React, {useState} from "react";

const StyledApp = styled.div`
    background-color: #e8e8e8;
    color: black;

    @media (prefers-color-scheme: dark) {
        background-color: #222;
        color: white;
    }
    min-height: 100vh;
    padding: 20px 20px;
`;

const AppContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

function App() {
    const {network} = useTonConnect();
    const [initData] = useInitData()
    const app = useWebApp()
    console.log(initData)


    const [login, setLogin] = useState(
        ""
    );

    const [token, setToken] = useState(
        ""
    );

    const [isFetching, setIsFetching] = useState(
        false
    );


    return (
        <StyledApp>
            <AppContainer>
                <FlexBoxCol>
                    <Card>
                        <h3>Find Fragment username</h3>
                        <FlexBoxCol>
                            <FlexBoxRow>
                                <b>Username</b>
                                <Input
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                ></Input>
                            </FlexBoxRow>
                            <FlexBoxRow>
                                <b>Token</b>
                                <Input
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                ></Input>

                            </FlexBoxRow>


                            <FlexBoxRow>
                                <Button
                                    disabled={isFetching}
                                    onClick={
                                        async () => {
                                            setIsFetching(true)
                                            let b = {
                                                queryId: initData?.query_id,
                                                login: login,
                                                token: token
                                            }
                                            const a = JSON.stringify(b)
                                            fetch('http://localhost:8300/checkLogin', {
                                                mode: "cors",
                                                method: 'POST', // или 'PUT'
                                                body: a, // данные могут быть 'строкой' или {объектом}!
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            }).then(r => setIsFetching(false))
                                        }}
                                >
                                    Check
                                </Button>
                            </FlexBoxRow>
                        </FlexBoxCol>

                    </Card>
                    <Card>
                        <h3>Donate</h3>
                        <FlexBoxCol>
                            <FlexBoxRow>
                                <TonConnectButton/>
                                <Button>
                                    {network
                                        ? network === CHAIN.MAINNET
                                            ? "mainnet"
                                            : "testnet"
                                        : "N/A"}
                                </Button>

                            </FlexBoxRow>
                            <TransferTon/>
                        </FlexBoxCol>
                    </Card>
                </FlexBoxCol>
                {/* <Counter />

          <Jetton />*/}
            </AppContainer>
        </StyledApp>
    );
}

export default App;
