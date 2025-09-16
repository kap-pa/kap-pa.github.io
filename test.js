// archivo de prueba con secretos falsos para trufflehog / jshunter

const config = {
  AWS_ACCESS_KEY_ID: "AKIA1234567890ABCDE",
  AWS_SECRET_ACCESS_KEY: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  test: "ghp_1234567890abcdefghijklmnopqrstuvwx"
};
const GITHUB_PAT = "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";

function connectToAWS() {
  console.log("Conectando con AWS usando credenciales de prueba...");
  console.log("AccessKey:", config.AWS_ACCESS_KEY_ID);
}
          , d = function() {
            return "/_/oh-noes"
        }
          , m = function(e) {
            var t = e.authDomain
              , n = e.autoplay
              , r = void 0 === n || n;
            return "https://".concat(t, "/about").concat(r ? "?autoplay=1" : "")
        }
          , p = function(e, t) {
            return "https://".concat(e, "/new-story") + (t && t.inResponseToQuoteId ? "?inResponseToQuoteId=".concat(t.inResponseToQuoteId) : "")
        }
          , f = function(e) {
            return "https://".concat(e, "/membership")
        }
          , g = function(e, t) {
            return "https://".concat(e, "/_/admin/users/").concat(t)
        }
          , h = function(e, t, n) {
            var o = {};
            return t && (o.giftCode = t),
            (0,
            r.b4)(n) && (o.giftType = n),
            (0,
            c.ST)("https://".concat(e, "/").concat(a.G), o)
        }
          , v = function(e) {
            return "https://".concat(e, "/me/readinghistory")
        }
          , b = function(e, t) {
            return "Medium" === t ? "https://about.".concat(e, "/earn/") : "https://".concat(e, "/earn")
        }
          , E = function(e) {
            return e ? "/p/".concat(e.id, "/edit") : ""
        }
          , S = function(e, t) {
            return e ? e.mediumUrl || (t ? "/".concat(e.id) : "/p/".concat(e.id)) : ""
        }
          , y = function(e, t) {
            return "https://".concat(e, "/p/").concat(t, "/edit")
        }
          , k = function(e, t) {
            return "https://".concat(e, "/p/").concat(t, "/settings")
        }
          , w = function(e, t) {
            return "https://".concat(e, "/p/").concat(t)
        }
          , O = function(e) {
            var t = e.params.postId
              , n = /^(?:[^/]*-)?([0-9a-f]+)$/.exec(t || "");
            return n && n[1] || null
        }
          , P = function(e, t) {
            return "https://".concat(e, "/_/p/").concat(t, "/quotes/create")
        }
          , N = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , t = e.category
              , n = e.queryParam
              , r = e.collectionSlug
              , a = r ? "/".concat(r) : "";
            return "".concat(a, "/search").concat(t ? "/".concat(t) : "").concat(n || "")
        }
          , T = function(e) {
            return "/s/".concat(e)
        }
          , C = function(e) {
            return "/series/".concat(e)
        }
          , A = function(e) {
            return "https://".concat(e, "/m/signin")
        }
          , _ = function(e, t) {
            return "https://".concat(e, "/_/subscribe/collection/").concat(t)
        }
          , I = function(e, t, n) {
            return "https://".concat(e, "/_/subscribe/collection/").concat(t, "/").concat(n)
        }
          , R = function(e, t) {
            return "https://".concat(e, "/_/subscribe/user/").concat(t)
        }
          , M = function(e, t, n) {
            return "https://".concat(e, "/_/subscribe/user/").concat(t, "/").concat(n)
        }
          , x = function(e) {
            return "/_/api/subscriptions/newsletters/".concat(e)
        }
          , L = function(e) {
            return "/_/api/users/".concat(e, "/lazily-enable-writer-subscription")
        }
          , D = function(e) {
            return "/_/api/newsletters/".concat(e, "/import/process-unvalidated-files")
          }

connectToAWS();
