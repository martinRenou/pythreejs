var _ = require('underscore');
require("../examples/controls/TrackballControls.js");
var TrackballControlsAutogen = require('./TrackballControls.autogen');

var TrackballControlsView = TrackballControlsAutogen.TrackballControlsView.extend({

});

var TrackballControlsModel = TrackballControlsAutogen.TrackballControlsModel.extend({

    constructThreeObject: function() {
        var controlling = this.get('controlling');
        obj = new THREE.TrackballControls(controlling);
        obj.dispose();  // Disconnect events, we need to (dis-)connect on freeze/thaw
        obj.noKeys = true; // turn off keyboard navigation

        return obj;
    },

    setupListeners: function() {
        TrackballControlsAutogen.TrackballControlsModel.prototype.setupListeners.call(this);
        var that = this;
        this.obj.addEventListener('end', function() {
            that.update_controlled();
        });
    },

    update_controlled: function() {
        // Since TrackballControlsView changes the position of the object, we update the position when we've stopped moving the object
        // it's probably prohibitive to update it in real-time
        var pos = this.controlled_view.obj.position;
        var qat = this.controlled_view.obj.quaternion;
        this.controlled_view.model.set('position', [pos.x, pos.y, pos.z]);
        this.controlled_view.model.set('quaternion', [qat._x, qat._y, qat._z, qat._w]);
        this.controlled_view.touch();
    },

});

module.exports = {
    TrackballControlsModel: TrackballControlsModel,
    TrackballControlsView: TrackballControlsView,
};
