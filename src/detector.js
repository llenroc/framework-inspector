/**
 * Framework Inspector
 *
 * Detect apps run on current page and send back to background page.
 * Some part of this script was refered from Wappalyzer Firefox Addon.
 *
 * @author Bao Nguyen <b@nqbao.com>
 * @license GPLv3
 **/
import { EVENT_READY, META_TAG_ID } from './constants';
import detectByMetaTag from './detector/metaTag';
import detectByScriptTag from './detector/scriptTag';
import detectByHtmlContent from './detector/htmlContent';
import detectByJavascript from './detector/javascript';
import detectByCssClass from './detector/cssClass';

(function () {
  var _apps = {};
  var doc = document.documentElement;
  var name;
  var r;

  [
    detectByMetaTag,
    detectByScriptTag,
    detectByHtmlContent,
    detectByJavascript,
    detectByCssClass
  ].forEach(fn => {
    _apps = fn(doc, _apps);
  });

  // convert to array
  var jsonString = JSON.stringify(_apps);
  // send back to background page
  var meta = document.getElementById(META_TAG_ID);
  meta.content = jsonString;

  //Notify Background Page
  var done = document.createEvent('Event');
  done.initEvent(EVENT_READY, true, true);
  meta.dispatchEvent(done);
})();
