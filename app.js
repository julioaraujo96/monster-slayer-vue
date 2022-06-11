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
        }
    },
    computed:{
        monsterBar(){
            return {width: this.monsterHealth + '%'};  
        },
        playerBar(){
            return {width: this.playerHealth + '%'};
        },
        checkSpecialAttack(){
            return this.roundsCount % 3 !== 0;
        }
    },
    methods: {
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.roundsCount++;
        },
        attackPlayer(){
            const attackValue = getRandomValue(10,20);
            this.playerHealth -= attackValue;
        },
        specialAttack(){
            this.roundsCount++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            healValue = getRandomValue(5,20);
            if (this.playerHealth + healValue > 100) {
             return this.playerHealth = 100;
            }
            this.playerHealth += healValue;
        }
    }
});

app.mount(game);