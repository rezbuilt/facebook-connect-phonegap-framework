var BarcodeScanner = function(){};

BarcodeScanner.prototype.isBarcodeScannerAvailable = function(response){
    cordova.exec(response, null, "BarcodeScannerPlugin", "isBarcodeScannerAvailable", []);
};

BarcodeScanner.prototype.isBarcodeScannerSetup = function(response){
    cordova.exec(response, null, "BarcodeScannerPlugin", "isBarcodeScannerSetup", []);
};

//-------------------------------------------------------------------
BarcodeScanner.Encode = {
TEXT_TYPE:     "TEXT_TYPE",
EMAIL_TYPE:    "EMAIL_TYPE",
PHONE_TYPE:    "PHONE_TYPE",
SMS_TYPE:      "SMS_TYPE",
CONTACT_TYPE:  "CONTACT_TYPE",
LOCATION_TYPE: "LOCATION_TYPE"
}

//-------------------------------------------------------------------
BarcodeScanner.prototype.scan = function(success, fail, options) {
    function successWrapper(result) {
        result.cancelled = (result.cancelled == 1)
        success.call(null, result)
    }
    
    if (!fail) { fail = function() {}}
    
    if (typeof fail != "function")  {
        console.log("BarcodeScanner.scan failure: failure parameter not a function")
        return
    }
    
    if (typeof success != "function") {
        fail("success callback parameter must be a function")
        return
    }
    
    if ( null == options ) 
        options = []
        
        return PhoneGap.exec(successWrapper, fail, "com.cordova.barcodeScanner", "scan", options)
        }

//-------------------------------------------------------------------
BarcodeScanner.prototype.encode = function(type, data, success, fail, options) {
    if (!fail) { fail = function() {}}
    
    if (typeof fail != "function")  {
        console.log("BarcodeScanner.scan failure: failure parameter not a function")
        return
    }
    
    if (typeof success != "function") {
        fail("success callback parameter must be a function")
        return
    }
    
    return PhoneGap.exec(success, fail, "com.cordova.barcodeScanner", "encode", [{type: type, data: data, options: options}])
}

cordova.addConstructor(function() {
                       
                       /* shim to work in 1.5 and 1.6  */
                       if (!window.Cordova) {
                       window.Cordova = cordova;
                       };
                       
                       
                       if(!window.plugins) window.plugins = {};
                       window.plugins.barcodeScanner = new BarcodeScanner();
                       });