const getAccount = async (web3) => {
    try {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    } catch (err) {
        console.log(err);
    }
}

const getAllTask = async (contract) => {
    try {
        const taskArr = await contract.getTaskIds();
        const res = taskArr.map(async(id) => await getTask(contract, id));
        return await Promise.all(res);
    } catch (err) {
        console.log(err);
    }
}

const getTask = async (contract, id) => {
    try {
        const task = await contract.getTask(Number(id));
        return task;
    } catch (err) {
        console.log(err);
    }
}

export {
    getAccount,
    getAllTask,
    getTask
}