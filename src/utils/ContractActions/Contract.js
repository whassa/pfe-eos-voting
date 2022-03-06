import setupContract from "../../../contracts/contract";

export const formTemplate = {
    primaryKey: "",
    title: "",
    summary: "",
    content: "",
    category: "",
    expiredAt: "",
    status: "open",
    integrity: true,
    author: {
        publicKey: "",
        userName: "",
    },
    news: {
        singleNews: [],
    },
    votes: {
        actualVote: 0,
        totalVote: 0,
        vote: [],
    },
};

export const voteTemplate = {
    proposalID: "",
    argumentID:"",
    publicKey: "",
    value: null,
};

export const argumentTemplate = {
    proposalID: "",
    argumentID:"",
    title: "",
    content: "",
    author: {
        publicKey: "",
        userName: "",
    },
    value: null,
};

export const newsTemplate = {
    proposalID: "",
    title: "",
    content: "",
};

export async function getProposals( privateKey, eosAccountName){
    let contract = await setup(privateKey, eosAccountName);
    const proposals = await contract.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        limit: 10,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
      }).catch((e) => { console.log(e); throw  'Error fetching the proposals'});
    return proposals;
}


export async function getProposal( primaryKey, privateKey, eosAccountName){
    let contract = await setup(privateKey, eosAccountName);

    const proposals = await contract.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,     // Account that owns the data
        table: 'proposals',        // Table name
        lower_bound: parseInt(primaryKey),
        limit: 1,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
      }).catch((e) => { console.log(e); throw  'Error fetching the proposals'});
    return proposals;
}

export async function createProposal(
    ual,
    formInformations,
    privateKey,
    eosAccountName
) {
    let contract = await setup(privateKey, eosAccountName);
    console.log(contract);
    try {
        const response = await contract.api
            .transact(
                {
                    actions: [
                        {
                            account: ual.activeUser.accountName, //env variable
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
                                status: formInformations.status,
                                author: formInformations.author,
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
                console.log("error :", error);
                throw "Error creating the proposal";
            });
    } catch (e) {
        throw e;
    }
}

export async function createVote(
    ual,
    voteInformation,
    privateKey,
    eosAccountName
) {
    let contract = await setup(privateKey, eosAccountName);
    console.log(contract);
    try {
        const response = await contract.api
            .transact(
                {
                    actions: [
                        {
                            account: ual.activeUser.accountName, //env variable
                            name: "makevote",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                proposalID: voteInformation.proposalID,
                                argumentID: voteInformation.argumentID,
                                publicKey: voteInformation.publicKey,
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
                console.log("error :", error);
                throw "Error creating the vote";
            });
    } catch (e) {
        throw e;
    }
}

export async function createArgument(
    ual,
    argumentInformations,
    privateKey,
    eosAccountName
) {
    let contract = await setup(privateKey, eosAccountName);
    console.log(contract);
    try {
        const response = await contract.api
            .transact(
                {
                    actions: [
                        {
                            account: ual.activeUser.accountName, //env variable
                            name: "crtargument",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                argumentID:ual.activeUser.argumentID,
                                from: ual.activeUser.accountName,
                                title: argumentInformations.title,
                                content: argumentInformations.content,
                                proposalID: argumentInformations.proposalID,
                                author: argumentInformations.author,
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
                console.log("error :", error);
                throw "Error creating the vote";
            });
    } catch (e) {
        throw e;
    }
}

export async function createSingleNews(
    ual,
    singleNewsInformation,
    privateKey,
    eosAccountName
) {
    let contract = await setup(privateKey, eosAccountName);
    console.log(contract);
    try {
        const response = await contract.api
            .transact(
                {
                    actions: [
                        {
                            account: ual.activeUser.accountName, //env variable
                            name: "crtproposalsinglenews",
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: "active",
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                proposalID: singleNewsInformation.proposalID,
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
                console.log("error :", error);
                throw "Error creating the vote";
            });
    } catch (e) {
        throw e;
    }
}

async function setup(privateKey, eosAccountName) {
    let contract;
    await setupContract(privateKey, eosAccountName)
        .then((value) => {
            console.log(value);
            contract = value;
        })
        .catch((error) => console.log("YO" + error));
    return contract;
}
