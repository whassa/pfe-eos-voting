import {Api, JsonRpc, RpcError, Serialize} from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
// const fs = require('fs')
//TODO: mettre ca dans une variable d'environnement

export default async function setupContract(privateKey, eosAccountName) {
    //https://developers.eos.io/manuals/eosjs/v21.0/basic-usage/commonjs
    //initialisation
    const signatureProvider = new JsSignatureProvider([privateKey])

    const link = `${process.env.NEXT_PUBLIC_RPC_PROTOCOL}://${process.env.NEXT_PUBLIC_RPC_HOST}:${process.env.NEXT_PUBLIC_RPC_PORT}`;

    const rpc = new JsonRpc(link, {fetch})
    const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});

    //https://developers.eos.io/manuals/eosjs/v21.0/how-to-guides/how-to-deploy-a-smart-contract
    // //prologue: setcode du vote contract
    // const wasmFilePath = 'contracts/eosvoting.wasm'
    // const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')
    //
    // //prologue: setabi du votecontract
    // const buffer = new Serialize.SerialBuffer({
    //     textEncoder: api.textEncoder,
    //     textDecoder: api.textDecoder,
    // })
    //
    // const abiFilePath = 'contracts/eosvoting.abi'
    // let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
    // const abiDefinitions = api.abiTypes.get('abi_def')
    //
    // abiJSON = abiDefinitions.fields.reduce(
    //     (acc, {name: fieldName}) =>
    //         Object.assign(acc, {[fieldName]: acc[fieldName] || []}),
    //     abiJSON
    // )
    // abiDefinitions.serialize(buffer, abiJSON)
    // var serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')
    //
    // // deploy the contract locally! On configure le contrat avec le wasm et abi généré.
    // await api.transact(
    //     {
    //         actions: [
    //             {
    //                 account: 'eosio', //env variable
    //                 name: 'setcode',
    //                 authorization: [
    //                     {
    //                         actor: eosAccountName,
    //                         permission: 'active',
    //                     },
    //                 ],
    //                 data: {
    //                     account: eosAccountName,
    //                     vmtype: '0',
    //                     vmversion: '0',
    //                     code: wasmHexString,
    //                 },
    //             },
    //             {
    //                 account: 'eosio',
    //                 name: 'setabi',
    //                 authorization: [
    //                     {
    //                         actor: eosAccountName,
    //                         permission: 'active',
    //                     },
    //                 ],
    //                 data: {
    //                     account: eosAccountName,
    //                     abi: serializedAbiHexString,
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         blocksBehind: 3,
    //         expireSeconds: 30,
    //     }
    // ).then((value) => console.log(value))
    return {rpc, api}
}