describe('knockout-tracked-extensions',function(){
	
	ko.extenders.testing = function(target, option){		
		target.extendedProperly = true;
		return target;
	};
	
	it('should extend an observable', function(){
		var myProp = ko.observable().extend({ testing: true });
		
		expect(myProp.extendedProperly).toBe(true);
	});
	
	describe('when an observable is extended when first declared', function(){
	
		it('should add an extensions observable to any extended observable', function(){
			var myProp = ko.observable().extend({ testing: true });
			
			expect(ko.isObservable(myProp.extensions)).toBe(true);
		});
		
		it('should set the extensions observable to an object representing an extension', function(){
	
			var myProp = ko.observable().extend({ testing: true });
			
			var myExtensions = myProp.extensions();			
			var extensionObj = { testing: true };		
			
			expect(myExtensions).toEqual(extensionObj);
		});	
	});
	
	describe('when an observable is extended after it has been declared', function(){
	
		it('should add an extensions observable to any extended observable', function(){
			var myProp = ko.observable()
			
			myProp.extend({ testing: true });
			
			expect(ko.isObservable(myProp.extensions)).toBe(true);
		});
		
		it('should set the extensions observable to an object representing an extension', function(){
	
			var myProp = ko.observable()
			myProp.extend({ testing: true });		
			
			var myExtensions = myProp.extensions();			
			var extensionObj = { testing: true };		
			
			expect(myExtensions).toEqual(extensionObj);
		});	
	});
	
	
	
}); // knockout-referencedObservable