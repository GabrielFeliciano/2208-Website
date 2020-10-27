export default class Switch {
    constructor (button) {
        this._stateObservers = [];
        this._state = false;

        this.button = (button && $(button)) || $('<button class="waves-effect waves-light btn-large switch"></button>');
        this.button.on('click', function (e) {
            this.toggleState();
            this.button.prop('disabled', true);
            setTimeout(() => this.button.prop('disabled', false), 10000);
        }.bind(this));

        this.button.prop('disabled', true);
        setTimeout(() => this.button.prop('disabled', false), 10000);
    }

    toggleState () { 
        this._state = !this._state;
        this.processState();
    }

    setState (val) { 
        this._state = Boolean(val);
        this.processState();
    }

    subscribeObserverState (...observers) { 
        this._stateObservers.push(...observers.flat());
    }

    on (eType, ...observers) {
        const callbacks = [...observers.flat()];
        callbacks.forEach(callback => {
            this.button.on(eType, function (e) { return callback(this._state, this.button, e) }.bind(this));
        })
    }

    processState () {
        this._stateObservers.forEach(function (func) { 
            func(this.button, this._state) 
        }.bind(this));
    }
}