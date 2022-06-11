//generate random number
function getRandomValue(min,max) {
    return  Math.floor(Math.random() * (max-min)) + 5;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth:100,
            monsterHealth:200,
        }
    },
    methods: {
        attackMonster(){
            const attackValue = getRandomValue(24,10);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(15,8);
            this.playerHealth -= attackValue;
        }
    }
});