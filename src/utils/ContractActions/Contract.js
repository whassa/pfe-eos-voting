import setupContract from "../../../contracts/contract";

export const formTemplate = {
    primaryKey: "",
    title: "",
    summary: "",
    content: "",
    category: "",
    voteMargin: 0,
    expiredAt: "",
    status: "open",
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

export async function getProposals( eosAccountName, upperBound){
    let contract = await setup();
    const proposals = await contract.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        limit: 3,                // Maximum number of rows that we want to get
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

export async function getProposalsByUser( userName, eosAccountName, ){
    let contract = await setup();
    const proposals = await contract.rpc.get_table_rows({
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        key_type: 'name',
        index_position: 2,
        lower_bound: userName,
        upper_bound: userName,
        reverse: true,
        limit: 6,                // Maximum number of rows that we want to ge
      }).catch((e) => { throw  'Error fetching the proposals'});
    console.log(proposals);
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
