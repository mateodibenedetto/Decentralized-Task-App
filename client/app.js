App = {
    contracts: {},

    init: async () => {
        await App.loadEthereum()
        await App.loadAccount()
        await App.loadContracts()
        App.render()
        await App.renderTasks()
    },

    loadEthereum: async () => {
        if (window.ethereum) {
            App.web3provider = window.ethereum // si existe la wallet la vamos a guardar en una propiedad
            await window.ethereum.request({method: 'eth_requestAccounts'}) // conexion a la wallet
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('No Ethereum browser')
        }
    },

    loadAccount: async () => {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        App.account = accounts[0]
    },

    loadContracts: async () => {
        const res = await fetch("TasksContracts.json") // hacemos fetch a la carpeta build donde estan los archivos json con toda la informacion
        const tasksContractJSON = await res.json()
        
        App.contracts.tasksContract = TruffleContract(tasksContractJSON)

        App.contracts.tasksContract.setProvider(App.web3provider)

        App.tasksContract = await App.contracts.tasksContract.deployed()
    },

    render: () => {
        document.getElementById('account').innerText = App.account // inserta el numero de la cuenta de metamask
    },

    renderTasks: async () => {
        const taskCounter = await App.tasksContract.taskCounter()
        const taskCounterNumber = taskCounter.toNumber()
        
        let html = ''

        for (let i = 1; i <= taskCounterNumber; i++) {
            const task = await App.tasksContract.tasks(i)

            const taskId =  task[0]
            const taskTitle =  task[1]
            const taskDescription =  task[2]
            const taskDone =  task[3]
            const taskCreated =  task[4]

            let taskElement = `
                <div class="card bg-dark mb-2">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>${taskTitle}</span> 
                        <div class="form-check form-switch">
                            <input 
                                class="form-check-input" 
                                data-id="${taskId}" 
                                type="checkbox" 
                                ${taskDone && "checked"} 
                                onchange="App.toggleDone(this)" 
                            /> 
                        </div>
                    </div>
                    <div class="card-body">
                        <span>${taskDescription}</span>
                        <p class="text-muted mt-2 mb-0">Task was created ${new Date(taskCreated * 1000).toLocaleString()}</p>
                    </div>
                </div>
            `

            html += taskElement;
        }

        document.querySelector("#taskList").innerHTML = html;
    },

    createTask: async (title, description) => {
        const result = await App.tasksContract.createTask(title, description, {
            from: App.account
        })
    },

    toggleDone: async (element) => {
        const taskId = element.dataset.id

        await App.tasksContract.toggleDone(taskId, {
            from: App.account
        })

        window.location.reload()
    }

}
