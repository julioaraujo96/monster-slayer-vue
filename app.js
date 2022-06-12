//generate random number
function getRandomValue(min,max) {
    return  Math.floor(Math.random() * (max-min)) + 5;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth:100,
            monsterHealth:100,
            roundsCount:0,
            winner:null,
            logMessages: [],
        }
    },
    watch:{
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if(value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if(value <= 0){
                this.winner = 'player';
            }
        }
    },
    computed:{
        monsterBar(){
            if (this.monsterHealth <= 0) {
                return {width:'0%'};
            }
            return {width: this.monsterHealth + '%'};  
        },
        playerBar(){
            if (this.playerHealth <= 0) {
                return {width:'0%'};
            } 
            return {width: this.playerHealth + '%'};
        },
        checkSpecialAttack(){
            return this.roundsCount % 3 !== 0;
        },
    },
    methods: {
        startNewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.roundsCount = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender(){
            this.winner = 'monster';
        },
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
            this.roundsCount++;
        },
        attackPlayer(){
            const attackValue = getRandomValue(10,20);
            this.addLogMessage('monster', 'attack', attackValue);
            this.playerHealth -= attackValue;
        },
        specialAttack(){
            this.roundsCount++;
            const attackValue = getRandomValue(10,25);
            this.addLogMessage('player','special-attack', attackValue);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.roundsCount++;
            healValue = getRandomValue(8,20);
            this.addLogMessage('player','heal',healValue);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else{
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            });
        }
    }
});

app.mount(game);