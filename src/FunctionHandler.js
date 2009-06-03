/*------------------------------------------------------------------------------
Function:       FunctionHandler()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  2009-04-02
Version:        0.1
Homepage:       http://github.com/easy-designs/FunctionHandler.js
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
(function(){
  
  var
  FunctionHandler = {
    'version': '0.1'
  },
  pages = {};
  
  function initialize()
  {
    var body_id = document.getElementsByTagName('body')[0].getAttribute('id');
    if ( body_id != false &&
         typeof( pages[body_id] ) != 'undefined' ){
      run( pages[body_id] );
    }
    if ( typeof( pages['*'] ) != 'undefined' )
    {
      run( pages['*'] );
    }
  }

  /**
   * FunctionHandler::register()
   * registers a callback for a given page
   *
   * @param mixed id - either an array or a string; strings can be single IDs, *, 
   *                   or a comma-separated list
   * @param function callback - the function to call on the page
   * 
   * @return bool - true for success, false for failure
   */
  FunctionHandler.register = function( id, callback ){
    
    // fail if we don't get the right stuff
    if ( ( typeof( id ) != 'string' &&
           typeof( id ) != 'array' ) ||
         typeof( callback ) != 'function' )
    {
      return false;
    }
    
    // create the page array if need be
    if ( typeof( id ) == 'string' &&
         id.indexOf( ', ' ) != -1 )
         {
      id = id.split(', ');
    }
    
    // id is an array?
    if ( typeof( id ) == 'array' )
    {
      for ( var i=arr.length-1; i >= 0; i-- )
      {
        add( id[i], callback );
      }
    }
    
    // id is a string
    else
    {
      add( id, callback );
    }
    
    return true;
  };
  
  function add( id, callback )
  {
    if ( typeof( pages[id] ) == 'undefined' ){
      pages[id] = [];
    }
    pages[id].push( callback );
  }
  
  function run( arr )
  {
    if ( typeof( arr ) != 'object' )
    {
      return;
    }
    for ( var i=arr.length-1; i >= 0; i-- )
    {
      arr[i]();
    }
  }
  
  /*-------------------------------------*
   * DOM Loaded Trigger                  *
   * Based on the work of Jesse Skinner, *
   * Dean Edwards, Matthias Miller,      *
   * John Resig, and Dan Webb            *
   *-------------------------------------*/
  var __load_timer = false, __old_onload;
  // for Mozilla/Opera9
  if ( document.addEventListener ){
    document.addEventListener( 'DOMContentLoaded', function(){
      document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
      initialize();
    }, false );
  }
  // for Internet Explorer
  /*@cc_on @*/
  /*@if (@_win32)
    document.write("<script id=__ie_onload defer src=//0><\/scr"+"ipt>");
    script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
      if (this.readyState == "complete"){ initialize(); } // call the onload handler
    };
  /*@end @*/
  // for Safari
  if ( /WebKit/i.test( navigator.userAgent ) ) // sniff
  {
    __load_timer = setInterval( function(){
      if ( /loaded|complete/.test( document.readyState ) )
      {
        clearInterval( __load_timer );
        initialize();
      }
    }, 10 );
  }
  // for other browsers set the window.onload, but also execute the old window.onload
  __old_onload = window.onload;
  window.onload = function(){
    initialize();
    if ( __old_onload ){ old_onload(); }
  };
  
  // set the global object
  window.FunctionHandler = FunctionHandler;
})();