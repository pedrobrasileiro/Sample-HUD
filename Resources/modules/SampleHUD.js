function SampleHUD(win, path) {
    Ti.API.info('init');
    path = path || '';
    var t1 = Titanium.UI.create2DMatrix();
    t1 = t1.scale(2);
    var t2 = Titanium.UI.create2DMatrix();
    t2 = t2.scale(0);
    
    this.parentWin = win;

    this.veil = Ti.UI.createView({
        opacity : 1
    });

    this._HUD = Ti.UI.createView({
        height : 100,
        width : 200,
        backgroundColor : '#333',
        borderRadius : 13,
        top : 'auto',
        left : 'auto',
        opacity : 0,
        transform : t1
    });

    this._HUD_activity = Ti.UI.createActivityIndicator({
        top : 'auto',
        left : 'auto',
        width : 175,
        height : 75,
        message : '',
        color : 'white',
        style : (Ti.Platform.name == 'android') ? null : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
    });

    this._HUD.add(this._HUD_activity);

    win.add(this.veil);
    win.add(this._HUD);
}

SampleHUD.prototype.show = function(msg) {
    Ti.API.info(msg);
    this._HUD_activity.message = msg;
    this._HUD_activity.show();
    this._HUD.animate({
        opacity : 1,
        duration : 200,
        transform : Titanium.UI.create2DMatrix().scale(1.0)
    });
};

SampleHUD.prototype.hide = function(callb) {
    Ti.API.info('Hiding HUD');
    
    var parent = this;
    
    this._HUD.animate({
            opacity : 0,
            duration : 200,
            transform : Titanium.UI.create2DMatrix().scale(0)
        }, 
        function() {
            parent._HUD_activity.hide();
            parent.parentWin.remove(parent._HUD);
            parent.parentWin.remove(parent.veil);
            parent._HUD = null;

            if(callb){callb();}
        }
    );
};

module.exports = SampleHUD;
