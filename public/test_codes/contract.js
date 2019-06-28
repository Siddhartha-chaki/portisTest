import Portis from "@portis/web3";
import Web3 from "web3";
import toDoListArtifact from "../build/contracts/TodoList.json"

var contract = require("truffle-contract")
const portis = new Portis("61f1e9b2-488e-4a59-a3e3-24e855799d8d", "ropsten");
const web3 = new Web3(portis.provider)
var text=""
//alert("hello1");

var abi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Signature",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "Issuer",
				"type": "address"
			}
		],
		"name": "getCounter",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "num",
				"type": "uint256"
			},
			{
				"name": "issuer",
				"type": "address"
			}
		],
		"name": "getSignature",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "signatures",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var interactor

web3.eth.getAccounts().then(accounts => {
  interactor = accounts[0]
  document.getElementById("app").innerHTML = `<p>Wallet Address: ${
    accounts[0]
  }</p>`
  console.log("Interactor" + interactor)
  showList()
})
var toDoList
var apptaskCount

var todoList= new web3.eth.Contract(abi ,"0x6c9151f24e1c17c08246a38e0488baf0eb032c30" )

function gettaskCount() {
  return todoList.methods.taskCount().call()
}
// async function loadContract () {
//   const accounts = await web3.eth.getAccounts()
//   console.log(accounts[0])
//   toDoList = await TruffleContract(toDoListArtifact);
//   console.log("Gangnum")
//   console.log( toDoList)
//   var a
//   toDoList.setProvider(web3.currentProvider)
//   toDoList.defaults({from: web3.eth.accounts[0]})
//   toDoList.deployed().then((abc)=>{
//      a= abc.taskCount()
//   }).then((a)=>{
//     console.log("taskCount is  ")
//     console.log(JSON.stringify(a))
//   })

//To Get Task Count
gettaskCount().then(function(result){
  apptaskCount=Number(result)
  console.log(result) 
})

async function test(){
  var test1= await gettaskCount()
  console.log(typeof(test2)+ " test 1 :"+ test2)
}
// web3.eth.getAccounts().then(accounts => {
//   todoList.methods.createTask("text").send({
//     from: accounts[0]
//   })
//   gettaskCount().then(function(result){
//     apptaskCount=result
//     console.log(JSON.stringify(result))
//   })   
// })  
  // todoList = await toDoList.deployed()
 
  // console.log("try This")
  // console.log(todoList)
  // var address=todoList.address
  // console("address")
  // console.log(address)
  // const taskCount = await todoList.methods.taskCount()
  //   console.log("Task Count")
  // loadContract();


// Hydrate the smart contract with values from the blockchain
//TodoList.deployed();

// var networkId;
//  web3.eth.net.getId().then(networkId);
// const deployedNetwork = toDoListArtifact.networks[networkId];
//   toDo = new web3.eth.Contract(
//     toDoListArtifact.abi,
//     deployedNetwork.address,
//   );
//   console.log("deployed Network"+deployedNetwork)
//   console.log("Meta"+toDo);
//   console.log("NetworkId"+networkId)

document.getElementById("showPortis").onclick = () =>{
   portis.showPortis()
}
 
document.getElementById("submitTask").onclick=() =>{
  text=  document.getElementById("list").value;
  createList(text)
}

async function showList(){

  for(var i=0;i<apptaskCount; i++){
    const task = await todoList.methods.tasks(i).call()
    console.log(task)
    const taskId =  Number(task[0])
    const taskContent =  task[1]
    const taskCompleted = task[2]
    console.log(taskId + taskContent + taskCompleted)
    document.getElementById("taskList").innerHTML +="<li>" + taskId + taskContent + "</li>" 
 }
}

async function shownewTask(){
  // Render out each task with a new task template
    apptaskCount= await todoList.methods.taskCount().call()
    // Fetch the task data from the blockchain
    const task = await todoList.methods.tasks(apptaskCount).call()
    console.log(task)
    const taskId =  Number(task[0])
    const taskContent =  task[1]
    const taskCompleted = task[2]
    console.log(taskId + taskContent + taskCompleted)
    document.getElementById("taskList").innerHTML +="<li>" + taskId + taskContent  +  "</li>"
}

 function createList(text){
  if(text!=""){
    console.log("Inside Create List Before Adding Task "+apptaskCount)
    web3.eth.getAccounts().then(accounts => {
      return todoList.methods.createTask(text).send({
        from: accounts[0]
      }).then((result)=>{
        console.log(result)
        shownewTask()
      }).then(()=>{
        gettaskCount().then(function(result){
          apptaskCount=result
          console.log(result)
        })
      })
         
    }).catch((err)=>{
      console.log(err)
    })

    // await todoList.methods.createTask(text).send({
    //   from: web3.eth.accounts[0]
    // })
    
    // console.log(todoList.createTask("hell")({
    //   from: web3.eth.accounts[0]
    // }))
  
  }
}






//document.getElementById("")
