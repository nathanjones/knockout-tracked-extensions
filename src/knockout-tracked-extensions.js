(function(){

	var utils = {	  
		isArray: Array.isArray || function(obj) {
		  	  return Object.prototype.toString.call(obj) == '[object Array]';
		},
		forEach: function(obj, fn) {
			if (utils.isArray(obj)) {
				bj.forEach(fn, this);
			} else {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						fn(prop, obj[prop]);
					}
				}
			}
		}
	}
	 
	var extendSubscribable = function(requestedExtenders) {
	    var target = this;
	    var extensions = {};
	 
	    if (requestedExtenders) {
	        if (ko.isObservable(this.extensions)) {
	            extensions = this.extensions();
	        } else {
	            this.extensions = ko.observable(extensions);
	        }
	        
	        utils.forEach(requestedExtenders, function(key, value) {
	            var extenderHandler = ko.extenders[key];
	 
	            extensions[key] = value;
	 
	            if (typeof extenderHandler == 'function') {
	                target = extenderHandler(target, value);
	            }
	        });
	        this.extensions(extensions);
	    }
	 
	    return target;
	} // extendSubscribable
	    
	ko.subscribable.fn.extend = extendSubscribable;
	 
})();