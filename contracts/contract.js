import {Api, JsonRpc, RpcError} from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import {Button, Container, Grid, Icon, Paper} from "@mui/material";

//TODO: mettre ca dans une variable d'environnement

export default function setupContract(privateKey){
    const signatureProvider = new JsSignatureProvider([privateKey])
    const rpc = new JsonRpc('http://127.0.0.1:8888', {fetch})
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    return {rpc, api}
}