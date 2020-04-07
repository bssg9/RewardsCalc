class AmountTransaction {
    constructor(amount) {
        this.amount = amount;
        this.rewards = rewardsCal(amount);
        this.amtTransactionDate = new Date();
    }
}

class ListOfTransactions {
    constructor() {
        this.list = [];
    }

    getLast3MonthsTransList() {
        var currDate = new Date();
        const threeDaysOldDate = currDate.setMonth(currDate.getMonth() - 3);
        let filteredTransList = this.list.filter(trans => trans.amtTransactionDate > threeDaysOldDate);
        return filteredTransList.sort((a,b) => b.amtTransactionDate - a.amtTransactionDate);
    }

    retrieveTransactionsList() {
        return this.list.sort((a,b) => b.amtTransactionDate-a.amtTransactionDate);
    }

    addTransaction(amount) {
        const amountTransaction = new AmountTransaction(amount);
        this.list.push(amountTransaction);
    }

    removeTransaction(amount){
        let arr = this.list;
        arr.splice(arr.findIndex(v => v.amount === amount), 1); //Remove Object from Array
        return arr;
    }

    retrieveTotalRewards() {
        return this.list.length ? this.list.reduce((acc,key)=>key.rewards+acc, 0) : 0;
    }

    rewardPerMonth() {
        let last3MonthRewards = []; //variable of last 3 months Rewards in descending order
        for(let i=0; i<3; i++) {
            let filteredTransList = this.list.filter(trans => trans.amtTransactionDate.getMonth() == (new Date).getMonth() - i );
            last3MonthRewards[i] = filteredTransList.reduce((acc,key)=>key.rewards+acc,0);
        }
        return last3MonthRewards;
    }
}

function rewardsCal(amount) { //Function calculates the Rewards
    if (amount >=50 && amount < 100) {
        return amount-50;
    } else if (amount >100){
        return (2*(amount-100) + 50);
    }
    return 0;
}

let myTransactions = new ListOfTransactions(); //Creating new Object
myTransactions.addTransaction(375); //Calling addTransaction method
myTransactions.addTransaction(200);
myTransactions.addTransaction(34);
myTransactions.addTransaction(2111);
myTransactions.addTransaction(310);
myTransactions.addTransaction(15);
myTransactions.addTransaction(18);
let arrList = myTransactions.getLast3MonthsTransList();
console.log(arrList);
