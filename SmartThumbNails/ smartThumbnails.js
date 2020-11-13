import { LightningElement, track, api } from 'lwc';
import { OmniscriptBaseMixin } from 'vlocityins2/omniscriptBaseMixin';

export default class SmartThumbnails extends OmniscriptBaseMixin(LightningElement) {

/**
 * GLOBAL SECTION
 */

    // These private variables are managed by the getters/setters of public properties
    @track _messages; // Data to be displayed on Tiles
    @track _icon; // Unique Tile's icon
    @track _border; // Componenty border presence
    @track _multiSelect; // Component multiple selection activation
    @track _title; // Component Title
    @track _jsonDataStack = []; // Data to be saved into Data JSON Omniscript (data selected)
    @track selectedId; // This is a private property to track the Tile that has been selected

    //@track _omniCustomState;

/**
 * PUBLIC SECTION
 */

    // The Parent stores an array of data corresponding to each Tile information; its pulled from the Data JSON of the Host Omniscript
    @api
    get messages() {
        return this._messages;
    }
    set messages(value) {
        if(value){
            this._messages = value;
        }        
    }
    
    @api
    get icon() {
        return this._icon;
    }
    set icon(value) {
        if(value){
            this._icon = value;
        }        
    }

    @api
    get title() {
        return this._title;
    }
    set title(value) {
        if(value){
            this._title = value;
        }        
    }

    @api
    get border(){
        return this._border;
    }
    set border(value){

        if(value === true){
            this._border = "slds-box";
        } else {
            this._border = "";
        }

    }       

    @api
    get multiSelect(){
        return this._multiSelect;
    }
    set multiSelect(value){
        this._multiSelect = value;
    }   

    // Component State (temp) is saved here when moving from step to step
    /*@api
    get omniCustomState() {
        return this._omniCustomState;
    }
    set omniCustomState(data){
        if(data) {
            this._omniCustomState = data;
            console.log(`Setting ${JSON.stringify(this._omniCustomState)}`);
        }
    }*/

    /*saveState(data){
        if(data) {
            this.omniSaveState(data);
            //const mySavedState = this.omniGetSaveState();
            //console.log(`savedData ${JSON.stringify(mySavedState)}`);
        }
    }*/

   
/**
 * EVENTS SECTION
 */

    connectedCallback(){
        this.template.addEventListener('tileClickEvent', this.tileClickEventHandler.bind(this));
    }

    // The Child notifies its Parent that he has just been clicked. The Parent need to Handle this event accordingly here
    tileClickEventHandler(event){

        // The Child has sent some information about himself (event.detail) so that the Parent knows exactely who fired the Event
        const message = event.detail;

        if(this.isItemCurrentlySelected(message.id)){

            this.removeItemFromStack(message.id);
            this.omniUpdateDataJson(this._jsonDataStack, true); 
            this.unselectChildComponent(message.id);
            this.selectedId = null; // The Parent need to track of the Tile that has been selected      

        } else {

            this.appendItemToStack(message);
            this.omniUpdateDataJson(this._jsonDataStack, true); 
            if(!this._multiSelect){
                this.unselectChildComponent(this.selectedId);
            }
            this.selectedId = message.id; // The Parent need to track of the Tile that has been selected

        }        

    }

/**
 * PRIVATE FUNCTIONS SECTION
 */
    
    // Adding selected item to the stack
    appendItemToStack(value){
        if(value){
            if(!this._multiSelect){
                this._jsonDataStack = value;
            } else {
                this._jsonDataStack.push(value);
            }            
        }
    }
    
    // Removing selected item from the Stack
    removeItemFromStack(value){
        if(value){
            if(!this._multiSelect){
                this._jsonDataStack = {};
            } else {
                this._jsonDataStack = this._jsonDataStack.filter(data => data.id != value);
            }
        }
    }

    // Checking weither the selected item is in the stack, in order to remove it or not
    isItemCurrentlySelected(value){
        if(value){

            if(!this._multiSelect){
                return (value == this.selectedId);
            } else {
                const item = this._jsonDataStack.filter(data => data.id == value);
                return !!item.length;
            }

        }
    }

    // We need to set back the default appearence (not selected) to a Tile that was previously selected.
    unselectChildComponent(id){
        if(id){

            // An instance of a Child Component is created based on it's identifier (data-id) and by using the QuerySelector Method over the DOM
            const childComponent = this.template.querySelector(`[data-id="${id}"]`);
            
            if(childComponent) {
                childComponent.changeDecoration("slds-box slds-theme_shade slds-theme_alert-texture thumbnail-default");
            }

        }
    }

}
