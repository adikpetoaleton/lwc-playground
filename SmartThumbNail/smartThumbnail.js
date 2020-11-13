import { LightningElement, api, track } from 'lwc';
import { OmniscriptBaseMixin } from 'vlocityins2/omniscriptBaseMixin';

export default class SmartThumbnail extends OmniscriptBaseMixin(LightningElement) {

/**
 * GLOBAL SECTION
 */

    // This Property is used by the Tile itself so that its appearence is set to selected when its own Event Handler is called (see below)
    @track decoration = "slds-box slds-theme_shade slds-theme_alert-texture thumbnail-default";
    @track _message;
    @track _icon;
    @track _buttonCaption = "Select";
    @track selected = false;
    

/**
 * PUBLIC SECTION
 */

    // The Parent calls this Property in order to initialize each Tile's info (i.e. What needs to be displayed on the Card)  
    @api
    get message() {
        return this._message;
    }
    set message(value) {
        if(value){
            this._message = value;
        }        
    }
    
    // Thumbnail's icon can be defined
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
    get buttonCaption() {
        return this._buttonCaption;
    }
    set buttonCaption(value) {
        if(value){
            this._buttonCaption = value;
        }        
    }

    // This Property is used by the Parent to set the appearence of the Tile to the default value "slds-box lgc-bg" (not selected).
    @api
    changeDecoration(value){
        if(value){
            this.decoration = value;
            this.selected = false;
            this._buttonCaption = "Select";
        }        
    }   

/**
 * EVENTS SECTION
 */
    
    // This Event Handler is called when the user click on the Tile component
    tileClickEventHandler(){

        // This is a new Event to be sent to the Parent so that it can update what is needed (i.e de-selecting a Tile that was previously selected)
        const tileClickEvent = new CustomEvent('tileClickEvent', {detail: this.message, bubbles :true});

        // Current Tile appearence is changed so that user see it's been effectively selected
        this.decoration = "slds-box slds-theme_shade slds-theme_alert-texture thumbnail-selected";

        // Updating the Tile selected state here...
        if(this.selected === false){
            this.selected = true;
            this._buttonCaption = "Unselect";
        } else {
            this.selected = false;
            this._buttonCaption = "Select";
        }

        // The new Event is sent to the Parent
        this.dispatchEvent(tileClickEvent);
        
    }

}
