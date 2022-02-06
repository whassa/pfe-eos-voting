import {Api, JsonRpc, RpcError} from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import {Button, Container, Grid, Icon, Paper} from "@mui/material";

//TODO: mettre ca dans une variable d'environnement
const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://127.0.0.1:8888', {fetch})
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

export const RPC = rpc
export const CONTRACT_API = api

