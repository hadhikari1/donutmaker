const localData = JSON.parse(localStorage.getItem('donut'))

export default class DonutMaker {

    constructor() {
        this.donutClick = localData.donutClick ?? 0;
        this.donutCount = localData.donutCount ?? 1;

        this.autoClicker = localData.autoClicker ?? 0;
        this.autoClickerCost = localData.autoClickerCost ?? 100;

        this.multiplier = localData.multiplier ?? 0;
        this.multiplierCost = localData.multiplierCost ?? 10;
        this.donutEarnedPerClick = localData.donutEarnedPerClick ?? 1;

        this.autoClickerEnabled = localData.autoClickerEnabled ?? false;
        this.clickMultiplierEnabled = localData.clickMultiplierEnabled ?? false; 
    }

    resetGame() {
        this.donutClick = 0;
        this.donutCount = 1;

        this.autoClicker = 0;
        this.autoClickerCost = 100;

        this.multiplier = 0;
        this.multiplierCost = 10;
        this.donutEarnedPerClick = 1;

        this.autoClickerEnabled = false;
        this.clickMultiplierEnabled = false; 
    }

    addDonut() {
        if(this.multiplier > 0){
            if (this.donutClick == 0) {
                this.donutClick++;
            } else {
                this.donutClick = this.donutClick + (this.donutClick * .2);
            }
        } else {
            this.donutClick++;
        }
       this.updateAutoClicker();
       this.updateMultiplier();
    }

    getDonutCount(){
        return Math.round(this.donutClick); 
    }

    //autoclicker
    addAutoClicker(){
        this.autoClicker++; 
    }

    getAutoClickerCost(){
        return this.autoClickerCost;
    }

    increaseAutoClickerCost() {
        this.autoClickerCost = this.autoClickerCost + (this.autoClickerCost * 0.1);
    }

    purchaseAutoClicker(){
        if(this.getDonutCount() >= this.autoClickerCost) {
            this.donutClick = this.donutClick - this.autoClickerCost; 
            this.autoClicker++; 
            this.autoClickerCost = this.autoClickerCost + (this.autoClickerCost * 0.1);
            return { autoClicker: this.autoClicker, 
                autoClickerCost: Math.round(this.autoClickerCost), 
                donutClick: this.donutClick, count: this.getDonutCount(),
            };
        }
    }

    updateAutoClicker() {
        if(this.getDonutCount() >= this.autoClickerCost){
            this.autoClickerEnabled = true;
        } 
        else{
            this.autoClickerEnabled = false;
        }
    }
    
    //multipler

    addMultiplier() {
        this.multiplier++; 
    }
    getMultiplierCost(){
        return this.multiplierCost;
    }
    increaseMultiplierCost() {
        this.multiplierCost = this.multiplierCost + (this.multiplierCost * 0.1)
    }

    donutEarnedPerClickWithMultiplier() {
        this.donutEarnedPerClick = Math.pow(1.2, this.multiplier);
    }
    
    purchaseMultiplier() {
        if(this.getDonutCount() >= this.multiplierCost){
            this.donutClick = this.donutClick - this.multiplierCost;
            this.multiplier++;
            this.multiplierCost = this.multiplierCost + (this.multiplierCost * 0.1);
            this.donutEarnedPerClick = Math.pow(1.2, this.multiplier);
        }
        return {donutCount: this.donutClick, addMultiplier: this.multiplier,
            costMultiplier: this.multiplierCost, earnedPerClick: this.donutEarnedPerClick
        }
    }

    updateMultiplier() {
        if(this.getDonutCount() >= this.multiplierCost){
            this.clickMultiplierEnabled = true;
        } 
        else{
            this.clickMultiplierEnabled = false;
        }
    }
    
    
}
