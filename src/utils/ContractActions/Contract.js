import setupContract from "../../../contracts/contract";
import getTableBoundsForName from './ContractHelperFunction';

export const formTemplate = {
    primaryKey: "",
    title: "",
    summary: "",
    content: "",
    category: "",
    voteMargin: 0,
    expiredAt: "",
    author: "",
    news: {
        singleNews: [],
    },
    votes: {
        actualVote: 0,
        totalVote: 0,
        vote: [],
    },
    whiteList: [],
};

export const voteTemplate = {
    proposalID: "",
    value: null,
};

export const argumentVoteTemplate = {
    proposalID: "",
    argumentID: "",
    value: null,
};

export const argumentTemplate = {
    proposalID: "",
    title: "",
    content: "",
    value: null,
};

export const newsTemplate = {
    primaryKey: "",
    title: "",
    content: "",
};


const numberToFetch = 12;

export async function getProposals( eosAccountName, upperBound){
    let contract = await setup();
    const proposals = await contract.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        limit: numberToFetch,                // Maximum number of rows that we want to get
        ...(upperBound && { upper_bound: upperBound}),
        reverse: true,           // Optional: Get reversed data
      }).catch((e) => { throw  'Error fetching the proposals'});
    return proposals;
}


export async function getProposal( primaryKey, eosAccountName){
    let contract = await setup();

    const proposals = await contract.rpc
        .get_table_rows({
            json: true, // Get the response as json
            code: eosAccountName, // Contract that we target
            scope: eosAccountName, // Account that owns the data
            table: "proposals", // Table name
            lower_bound: parseInt(primaryKey),
            limit: 1, // Maximum number of rows that we want to get
            reverse: false, // Optional: Get reversed data
        })
        .catch((e) => {
            throw "Error fetching the proposals";
        });
    return proposals;
}

export async function getProposalsByUser( userName, eosAccountName, nextKey = null){
    let contract = await setup();

    const user = getTableBoundsForName(userName);
 
    const lowerBound = BigInt(`0x${user.lower_bound}${`0`.repeat(16)}`).toString();
    const upperBound = ( nextKey ? nextKey : BigInt(`0x${user.upper_bound}${`0`.repeat(16)}`).toString());
    const bounds = {
        lower_bound: lowerBound,
        upper_bound: upperBound,
    }
    
    const proposals = await contract.rpc.get_table_rows({
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        key_type: 'i128',
        index_position: 2,
        limit: numberToFetch,      // Maximum number of rows that we want to ge
        reverse: true,
        ...bounds
      }).catch((e) => { throw  'Error fetching the proposals'});

    return proposals;
}

export async function getProposalsByVoteCount( eosAccountName, upperBound ){
    let contract = await setup();
    const proposals = await contract.rpc.get_table_rows({
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        index_position: 3,
        key_type: 'i128',
        ...(upperBound && { upper_bound: upperBound}),
        reverse: true,
        limit: numberToFetch,                // Maximum number of rows that we want to ge
      }).catch((e) => { throw  'Error fetching the proposals'});
    return proposals;
}



export async function getEdenMember( userName ){
    let contract = await setup();
    const proposals = await contract.rpc.get_table_rows({
        code: process.env.NEXT_PUBLIC_EDEN_TABLE_NAME,      // Contract that we target
        table: 'member',        // Table name
        lower_bound: userName,
        upper_bound: userName,
        limit: 1,                // Maximum number of rows that we want to ge
      }).catch((e) => { throw  'Error fetching the proposals'});
    return proposals;
}


export async function createProposal(
    ual,
    formInformations,
    eosAccountName
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "crtproposal",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                title: formInformations.title,
                                summary: formInformations.summary,
                                content: formInformations.content,
                                category: formInformations.category,
                                voteMargin: formInformations.voteMargin,
                                whitelist: formInformations.whiteList,
                                expiredAt: formInformations.expiredAt,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function updateProposal(
    ual,
    formInformations,
    eosAccountName
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "upproposal",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: formInformations.primaryKey,
                                title: formInformations.title,
                                summary: formInformations.summary,
                                content: formInformations.content,
                                category: formInformations.category,
                                voteMargin: formInformations.voteMargin,
                                status: formInformations.status,
                                whitelist: formInformations.whiteList,
                                expiredAt: formInformations.expiredAt,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function vote(
    ual,
    voteInformation,
    eosAccountName
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "makevote",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: voteInformation.proposalID,
                                value: voteInformation.value,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function createArgument(
    ual,
    argumentInformations,
    eosAccountName
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "crtargument",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: argumentInformations.proposalID,
                                title: argumentInformations.title,
                                content: argumentInformations.content,
                                value: argumentInformations.value,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function updateArgument(
    ual,
    argument,
    eosAccountName,
    proposalId
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "upargument",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: proposalId,
                                argumentKey: argument.primaryKey,
                                title: argument.title,
                                content: argument.content,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function voteArgument(
    ual,
    argumentVote,
    eosAccountName
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "voteargument",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: argumentVote.proposalID,
                                argumentKey: argumentVote.argumentID,
                                value: argumentVote.value,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function createSingleNews(
    ual,
    singleNewsInformation,
    eosAccountName
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "crtnews",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: parseInt(
                                    singleNewsInformation.primaryKey
                                ),
                                title: singleNewsInformation.title,
                                content: singleNewsInformation.content,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

export async function updateSingleNews(
    ual,
    singleNewsInformation,
    eosAccountName, oldTitle
) {
    try {
        const response = await ual.activeUser
            .signTransaction(
                {
                    actions: [
                        {
                            account: eosAccountName, //env variable
                            name: "upnews",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: parseInt(
                                    singleNewsInformation.primaryKey
                                ),
                                oldTitle: singleNewsInformation.oldTitle,
                                title: singleNewsInformation.title,
                                content: singleNewsInformation.content,
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            .catch((error) => {
                throw error;
            });
    } catch (e) {
        throw e;
    }
}

async function setup() {
    let contract;
    await setupContract()
        .then((value) => {
            contract = value;
        })
        .catch((error) => {
            throw "Error setting up contract";
        });
    return contract;
}
