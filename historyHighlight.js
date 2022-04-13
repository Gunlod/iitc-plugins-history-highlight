// ==UserScript==
// @id             HistoryHighlight
// @name           History Highlight
// @author         Gunlod
// @category       Highlighter
// @version        0.0.1
// @description    Adds highlighters for portal history information
// @match          *://intel.ingress.com/*
// @match          *://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==
 
 function wrapper(plugin_info) {
 
     // Make sure that window.plugin exists. IITC defines it as a no-op function,
     // and other plugins assume the same.
     if (typeof window.plugin !== "function") window.plugin = function () {};
 
     const KEY_SETTINGS = "iitc-plugins-history-highlight";
 
     window.plugin.HistoryHighlight = function () {};
 
     const thisPlugin = window.plugin.HistoryHighlight;
     // Name of the IITC build for first-party plugins
     plugin_info.buildName = "HistoryHighlight";
 
     // Datetime-derived version of the plugin
     plugin_info.dateTimeVersion = "202204131119";
 
     // ID/name of the plugin
     plugin_info.pluginId = "historyhighlight";
 
     thisPlugin.unvisitedHighlight = function(data){
         let style = {};
         if((data.portal.options.ent.length == 3 && data.portal.options.ent[2].length >= 18 && (data.portal.options.ent[2][18] & 0b1) === 1)){
             style.fillOpacity = 0;
             style.stroke = false;
         } else {
             style.fillOpacity = 0.5;
             style.stroke = true;
         }
         data.portal.setStyle(style);
     }
     thisPlugin.unvisitedHighlightThin = function(data){
         let style = {};
         if((data.portal.options.ent.length == 3 && data.portal.options.ent[2].length >= 18 && (data.portal.options.ent[2][18] & 0b1) === 1)){
             style.fillOpacity = 0.3;
             style.stroke = false;
         } else {
             style.fillOpacity = 0.5;
             style.stroke = true;
         }
         data.portal.setStyle(style);
     }
     thisPlugin.uncapturedHighlight = function(data){
         let style = {};
         if((data.portal.options.ent.length == 3 && data.portal.options.ent[2].length >= 18 && (data.portal.options.ent[2][18] & 0b10) === 2)){
             style.fillOpacity = 0;
             style.stroke = false;
         } else {
             style.fillOpacity = 0.5;
             style.stroke = true;
         }
         data.portal.setStyle(style);
     }
     thisPlugin.uncapturedHighlightThin = function(data){
         let style = {};
         if((data.portal.options.ent.length == 3 && data.portal.options.ent[2].length >= 18 && (data.portal.options.ent[2][18] & 0b10) === 2)){
             style.fillOpacity = 0.3;
             style.stroke = false;
         } else {
             style.fillOpacity = 0.5;
             style.stroke = true;
         }
         data.portal.setStyle(style);
     }
     thisPlugin.unscoutedHighlight = function(data){
         let style = {};
         if((data.portal.options.ent.length == 3 && data.portal.options.ent[2].length >= 18 && (data.portal.options.ent[2][18] & 0b100) === 4)){
             style.fillOpacity = 0;
             style.stroke = false;
         } else {
             style.fillOpacity = 0.5;
             style.stroke = true;
         }
         data.portal.setStyle(style);
     }
     thisPlugin.unscoutedHighlightThin = function(data){
         let style = {};
         if((data.portal.options.ent.length == 3 && data.portal.options.ent[2].length >= 18 && (data.portal.options.ent[2][18] & 0b100) === 4)){
             style.fillOpacity = 0.3;
             style.stroke = false;
         } else {
             style.fillOpacity = 0.5;
             style.stroke = true;
         }
         data.portal.setStyle(style);
     }
 
     function setup() {
         window.addPortalHighlighter("History: Unvisited", thisPlugin.unvisitedHighlight);
         window.addPortalHighlighter("History: Uncaptured", thisPlugin.uncapturedHighlight);
         window.addPortalHighlighter("History: Unscouted", thisPlugin.unscoutedHighlight);
         window.addPortalHighlighter("History: Unvisited (thin)", thisPlugin.unvisitedHighlightThin);
         window.addPortalHighlighter("History: Uncaptured (thin)", thisPlugin.uncapturedHighlightThin);
         window.addPortalHighlighter("History: Unscouted (thin)", thisPlugin.unscoutedHighlightThin);
         
         setup.info = plugin_info; //add the script info data to the function as a property
     // if IITC has already booted, immediately run the 'setup' function
     }
     if (window.iitcLoaded) {
         setup();
         } else {
             if (!window.bootPlugins) {
                 window.bootPlugins = [];
             }
         window.bootPlugins.push(setup);
     }
 }

 (function () {
     const plugin_info = {};
     if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
         plugin_info.script = {
             version: GM_info.script.version,
             name: GM_info.script.name,
             description: GM_info.script.description
         };
     }
     // Greasemonkey. It will be quite hard to debug
     if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {
     // inject code into site context
         const script = document.createElement('script');
         script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(plugin_info) + ');'));
         (document.body || document.head || document.documentElement).appendChild(script);
     } else {
         // Tampermonkey, run code directly
         wrapper(plugin_info);
     }
 })();
 
