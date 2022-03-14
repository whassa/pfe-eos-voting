import {Api, JsonRpc, RpcError, Serialize} from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
// const fs = require('fs')
//TODO: mettre ca dans une variable d'environnement

export default async function setupContract(privateKey, eosAccountName) {
    //https://developers.eos.io/manuals/eosjs/v21.0/basic-usage/commonjs
    //initialisation

    const link = `${process.env.NEXT_PUBLIC_RPC_PROTOCOL}://${process.env.NEXT_PUBLIC_RPC_HOST}:${process.env.NEXT_PUBLIC_RPC_PORT}`;

    const rpc = new JsonRpc(link, {fetch})

    return {rpc}
}