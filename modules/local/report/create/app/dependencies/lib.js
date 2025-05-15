var lib=(()=>{var Cm=Object.create;var xs=Object.defineProperty;var Rm=Object.getOwnPropertyDescriptor;var Pm=Object.getOwnPropertyNames;var Im=Object.getPrototypeOf,Lm=Object.prototype.hasOwnProperty;var It=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),Om=(n,e)=>{for(var t in e)xs(n,t,{get:e[t],enumerable:!0})},cu=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Pm(e))!Lm.call(n,r)&&r!==t&&xs(n,r,{get:()=>e[r],enumerable:!(i=Rm(e,r))||i.enumerable});return n};var uu=(n,e,t)=>(t=n!=null?Cm(Im(n)):{},cu(e||!n||!n.__esModule?xs(t,"default",{value:n,enumerable:!0}):t,n)),Dm=n=>cu(xs({},"__esModule",{value:!0}),n);var Fo=It((sT,Cd)=>{Cd.exports=function(e){Mb(e);var t=bb(e);return e.on=t.on,e.off=t.off,e.fire=t.fire,e};function bb(n){var e=Object.create(null);return{on:function(t,i,r){if(typeof i!="function")throw new Error("callback is expected to be a function");var s=e[t];return s||(s=e[t]=[]),s.push({callback:i,ctx:r}),n},off:function(t,i){var r=typeof t>"u";if(r)return e=Object.create(null),n;if(e[t]){var s=typeof i!="function";if(s)delete e[t];else for(var o=e[t],a=0;a<o.length;++a)o[a].callback===i&&o.splice(a,1)}return n},fire:function(t){var i=e[t];if(!i)return n;var r;arguments.length>1&&(r=Array.prototype.splice.call(arguments,1));for(var s=0;s<i.length;++s){var o=i[s];o.callback.apply(o.ctx,r)}return n}}}function Mb(n){if(!n)throw new Error("Eventify cannot use falsy object as events subject");for(var e=["on","fire","off"],t=0;t<e.length;++t)if(n.hasOwnProperty(e[t]))throw new Error("Subject cannot be eventified, since it already has property '"+e[t]+"'")}});var Ld=It((oT,Id)=>{Id.exports=wb;var Sb=Fo();function wb(n){if(n=n||{},"uniqueLinkId"in n&&(console.warn("ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n",`
`,`Note: there is also change in default behavior: From now on each graph
is considered to be not a multigraph by default (each edge is unique).`),n.multigraph=n.uniqueLinkId),n.multigraph===void 0&&(n.multigraph=!1),typeof Map!="function")throw new Error("ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph");var e=new Map,t=new Map,i={},r=0,s=n.multigraph?x:y,o=[],a=k,l=k,c=k,u=k,h={version:20,addNode:v,addLink:M,removeLink:R,removeNode:f,getNode:p,getNodeCount:A,getLinkCount:w,getEdgeCount:w,getLinksCount:w,getNodesCount:A,getLinks:T,forEachNode:ie,forEachLinkedNode:D,forEachLink:B,beginUpdate:c,endUpdate:u,clear:U,hasLink:b,hasNode:p,getLink:b};return Sb(h),d(),h;function d(){var G=h.on;h.on=Q;function Q(){return h.beginUpdate=c=te,h.endUpdate=u=W,a=m,l=g,h.on=G,G.apply(h,arguments)}}function m(G,Q){o.push({link:G,changeType:Q})}function g(G,Q){o.push({node:G,changeType:Q})}function v(G,Q){if(G===void 0)throw new Error("Invalid node identifier");c();var le=p(G);return le?(le.data=Q,l(le,"update")):(le=new Eb(G,Q),l(le,"add")),e.set(G,le),u(),le}function p(G){return e.get(G)}function f(G){var Q=p(G);if(!Q)return!1;c();var le=Q.links;return le&&(le.forEach(S),Q.links=null),e.delete(G),l(Q,"remove"),u(),!0}function M(G,Q,le){c();var xe=p(G)||v(G),z=p(Q)||v(Q),V=s(G,Q,le),J=t.has(V.id);return t.set(V.id,V),Rd(xe,V),G!==Q&&Rd(z,V),a(V,J?"update":"add"),u(),V}function y(G,Q,le){var xe=Bo(G,Q),z=t.get(xe);return z?(z.data=le,z):new Pd(G,Q,le,xe)}function x(G,Q,le){var xe=Bo(G,Q),z=i.hasOwnProperty(xe);if(z||b(G,Q)){z||(i[xe]=0);var V="@"+ ++i[xe];xe=Bo(G+V,Q+V)}return new Pd(G,Q,le,xe)}function A(){return e.size}function w(){return t.size}function T(G){var Q=p(G);return Q?Q.links:null}function R(G,Q){return Q!==void 0&&(G=b(G,Q)),S(G)}function S(G){if(!G||!t.get(G.id))return!1;c(),t.delete(G.id);var Q=p(G.fromId),le=p(G.toId);return Q&&Q.links.delete(G),le&&le.links.delete(G),a(G,"remove"),u(),!0}function b(G,Q){if(!(G===void 0||Q===void 0))return t.get(Bo(G,Q))}function U(){c(),ie(function(G){f(G.id)}),u()}function B(G){if(typeof G=="function")for(var Q=t.values(),le=Q.next();!le.done;){if(G(le.value))return!0;le=Q.next()}}function D(G,Q,le){var xe=p(G);if(xe&&xe.links&&typeof Q=="function")return le?O(xe.links,G,Q):I(xe.links,G,Q)}function I(G,Q,le){for(var xe,z=G.values(),V=z.next();!V.done;){var J=V.value,N=J.fromId===Q?J.toId:J.fromId;if(xe=le(e.get(N),J),xe)return!0;V=z.next()}}function O(G,Q,le){for(var xe,z=G.values(),V=z.next();!V.done;){var J=V.value;if(J.fromId===Q&&(xe=le(e.get(J.toId),J),xe))return!0;V=z.next()}}function k(){}function te(){r+=1}function W(){r-=1,r===0&&o.length>0&&(h.fire("changed",o),o.length=0)}function ie(G){if(typeof G!="function")throw new Error("Function is expected to iterate over graph nodes. You passed "+G);for(var Q=e.values(),le=Q.next();!le.done;){if(G(le.value))return!0;le=Q.next()}}}function Eb(n,e){this.id=n,this.links=null,this.data=e}function Rd(n,e){n.links?n.links.add(e):n.links=new Set([e])}function Pd(n,e,t,i){this.fromId=n,this.toId=e,this.data=t,this.id=i}function Bo(n,e){return n.toString()+"\u{1F449} "+e.toString()}});var dc=It((aT,Od)=>{Od.exports=function(e){return e===0?"x":e===1?"y":e===2?"z":"c"+(e+1)}});var Ei=It((lT,Dd)=>{var Ab=dc();Dd.exports=function(e){return t;function t(i,r){let s=r&&r.indent||0,o=r&&r.join!==void 0?r.join:`
`,a=Array(s+1).join(" "),l=[];for(let c=0;c<e;++c){let u=Ab(c),h=c===0?"":a;l.push(h+i.replace(/{var}/g,u))}return l.join(o)}}});var kd=It((cT,ss)=>{var Nd=Ei();ss.exports=Tb;ss.exports.generateCreateBodyFunctionBody=Ud;ss.exports.getVectorCode=Bd;ss.exports.getBodyCode=Fd;function Tb(n,e){let t=Ud(n,e),{Body:i}=new Function(t)();return i}function Ud(n,e){return`
${Bd(n,e)}
${Fd(n,e)}
return {Body: Body, Vector: Vector};
`}function Fd(n){let e=Nd(n),t=e("{var}",{join:", "});return`
function Body(${t}) {
  this.isPinned = false;
  this.pos = new Vector(${t});
  this.force = new Vector();
  this.velocity = new Vector();
  this.mass = 1;

  this.springCount = 0;
  this.springLength = 0;
}

Body.prototype.reset = function() {
  this.force.reset();
  this.springCount = 0;
  this.springLength = 0;
}

Body.prototype.setPosition = function (${t}) {
  ${e("this.pos.{var} = {var} || 0;",{indent:2})}
};`}function Bd(n,e){let t=Nd(n),i="";return e&&(i=`${t(`
   var v{var};
Object.defineProperty(this, '{var}', {
  set: function(v) { 
    if (!Number.isFinite(v)) throw new Error('Cannot set non-numbers to {var}');
    v{var} = v; 
  },
  get: function() { return v{var}; }
});`)}`),`function Vector(${t("{var}",{join:", "})}) {
  ${i}
    if (typeof arguments[0] === 'object') {
      // could be another vector
      let v = arguments[0];
      ${t('if (!Number.isFinite(v.{var})) throw new Error("Expected value is not a finite number at Vector constructor ({var})");',{indent:4})}
      ${t("this.{var} = v.{var};",{indent:4})}
    } else {
      ${t('this.{var} = typeof {var} === "number" ? {var} : 0;',{indent:4})}
    }
  }
  
  Vector.prototype.reset = function () {
    ${t("this.{var} = ",{join:""})}0;
  };`}});var Xd=It((uT,ei)=>{var pc=Ei(),Qn=dc();ei.exports=Cb;ei.exports.generateQuadTreeFunctionBody=zd;ei.exports.getInsertStackCode=jd;ei.exports.getQuadNodeCode=Wd;ei.exports.isSamePosition=Vd;ei.exports.getChildBodyCode=Gd;ei.exports.setChildBodyCode=Hd;function Cb(n){let e=zd(n);return new Function(e)()}function zd(n){let e=pc(n),t=Math.pow(2,n);return`
${jd()}
${Wd(n)}
${Vd(n)}
${Gd(n)}
${Hd(n)}

function createQuadTree(options, random) {
  options = options || {};
  options.gravity = typeof options.gravity === 'number' ? options.gravity : -1;
  options.theta = typeof options.theta === 'number' ? options.theta : 0.8;

  var gravity = options.gravity;
  var updateQueue = [];
  var insertStack = new InsertStack();
  var theta = options.theta;

  var nodesCache = [];
  var currentInCache = 0;
  var root = newNode();

  return {
    insertBodies: insertBodies,

    /**
     * Gets root node if it is present
     */
    getRoot: function() {
      return root;
    },

    updateBodyForce: update,

    options: function(newOptions) {
      if (newOptions) {
        if (typeof newOptions.gravity === 'number') {
          gravity = newOptions.gravity;
        }
        if (typeof newOptions.theta === 'number') {
          theta = newOptions.theta;
        }

        return this;
      }

      return {
        gravity: gravity,
        theta: theta
      };
    }
  };

  function newNode() {
    // To avoid pressure on GC we reuse nodes.
    var node = nodesCache[currentInCache];
    if (node) {
${o("      node.")}
      node.body = null;
      node.mass = ${e("node.mass_{var} = ",{join:""})}0;
      ${e("node.min_{var} = node.max_{var} = ",{join:""})}0;
    } else {
      node = new QuadNode();
      nodesCache[currentInCache] = node;
    }

    ++currentInCache;
    return node;
  }

  function update(sourceBody) {
    var queue = updateQueue;
    var v;
    ${e("var d{var};",{indent:4})}
    var r; 
    ${e("var f{var} = 0;",{indent:4})}
    var queueLength = 1;
    var shiftIdx = 0;
    var pushIdx = 1;

    queue[0] = root;

    while (queueLength) {
      var node = queue[shiftIdx];
      var body = node.body;

      queueLength -= 1;
      shiftIdx += 1;
      var differentBody = (body !== sourceBody);
      if (body && differentBody) {
        // If the current node is a leaf node (and it is not source body),
        // calculate the force exerted by the current node on body, and add this
        // amount to body's net force.
        ${e("d{var} = body.pos.{var} - sourceBody.pos.{var};",{indent:8})}
        r = Math.sqrt(${e("d{var} * d{var}",{join:" + "})});

        if (r === 0) {
          // Poor man's protection against zero distance.
          ${e("d{var} = (random.nextDouble() - 0.5) / 50;",{indent:10})}
          r = Math.sqrt(${e("d{var} * d{var}",{join:" + "})});
        }

        // This is standard gravitation force calculation but we divide
        // by r^3 to save two operations when normalizing force vector.
        v = gravity * body.mass * sourceBody.mass / (r * r * r);
        ${e("f{var} += v * d{var};",{indent:8})}
      } else if (differentBody) {
        // Otherwise, calculate the ratio s / r,  where s is the width of the region
        // represented by the internal node, and r is the distance between the body
        // and the node's center-of-mass
        ${e("d{var} = node.mass_{var} / node.mass - sourceBody.pos.{var};",{indent:8})}
        r = Math.sqrt(${e("d{var} * d{var}",{join:" + "})});

        if (r === 0) {
          // Sorry about code duplication. I don't want to create many functions
          // right away. Just want to see performance first.
          ${e("d{var} = (random.nextDouble() - 0.5) / 50;",{indent:10})}
          r = Math.sqrt(${e("d{var} * d{var}",{join:" + "})});
        }
        // If s / r < \u03B8, treat this internal node as a single body, and calculate the
        // force it exerts on sourceBody, and add this amount to sourceBody's net force.
        if ((node.max_${Qn(0)} - node.min_${Qn(0)}) / r < theta) {
          // in the if statement above we consider node's width only
          // because the region was made into square during tree creation.
          // Thus there is no difference between using width or height.
          v = gravity * node.mass * sourceBody.mass / (r * r * r);
          ${e("f{var} += v * d{var};",{indent:10})}
        } else {
          // Otherwise, run the procedure recursively on each of the current node's children.

          // I intentionally unfolded this loop, to save several CPU cycles.
${s()}
        }
      }
    }

    ${e("sourceBody.force.{var} += f{var};",{indent:4})}
  }

  function insertBodies(bodies) {
    ${e("var {var}min = Number.MAX_VALUE;",{indent:4})}
    ${e("var {var}max = Number.MIN_VALUE;",{indent:4})}
    var i = bodies.length;

    // To reduce quad tree depth we are looking for exact bounding box of all particles.
    while (i--) {
      var pos = bodies[i].pos;
      ${e("if (pos.{var} < {var}min) {var}min = pos.{var};",{indent:6})}
      ${e("if (pos.{var} > {var}max) {var}max = pos.{var};",{indent:6})}
    }

    // Makes the bounds square.
    var maxSideLength = -Infinity;
    ${e("if ({var}max - {var}min > maxSideLength) maxSideLength = {var}max - {var}min ;",{indent:4})}

    currentInCache = 0;
    root = newNode();
    ${e("root.min_{var} = {var}min;",{indent:4})}
    ${e("root.max_{var} = {var}min + maxSideLength;",{indent:4})}

    i = bodies.length - 1;
    if (i >= 0) {
      root.body = bodies[i];
    }
    while (i--) {
      insert(bodies[i], root);
    }
  }

  function insert(newBody) {
    insertStack.reset();
    insertStack.push(root, newBody);

    while (!insertStack.isEmpty()) {
      var stackItem = insertStack.pop();
      var node = stackItem.node;
      var body = stackItem.body;

      if (!node.body) {
        // This is internal node. Update the total mass of the node and center-of-mass.
        ${e("var {var} = body.pos.{var};",{indent:8})}
        node.mass += body.mass;
        ${e("node.mass_{var} += body.mass * {var};",{indent:8})}

        // Recursively insert the body in the appropriate quadrant.
        // But first find the appropriate quadrant.
        var quadIdx = 0; // Assume we are in the 0's quad.
        ${e("var min_{var} = node.min_{var};",{indent:8})}
        ${e("var max_{var} = (min_{var} + node.max_{var}) / 2;",{indent:8})}

${r(8)}

        var child = getChild(node, quadIdx);

        if (!child) {
          // The node is internal but this quadrant is not taken. Add
          // subnode to it.
          child = newNode();
          ${e("child.min_{var} = min_{var};",{indent:10})}
          ${e("child.max_{var} = max_{var};",{indent:10})}
          child.body = body;

          setChild(node, quadIdx, child);
        } else {
          // continue searching in this quadrant.
          insertStack.push(child, body);
        }
      } else {
        // We are trying to add to the leaf node.
        // We have to convert current leaf into internal node
        // and continue adding two nodes.
        var oldBody = node.body;
        node.body = null; // internal nodes do not cary bodies

        if (isSamePosition(oldBody.pos, body.pos)) {
          // Prevent infinite subdivision by bumping one node
          // anywhere in this quadrant
          var retriesCount = 3;
          do {
            var offset = random.nextDouble();
            ${e("var d{var} = (node.max_{var} - node.min_{var}) * offset;",{indent:12})}

            ${e("oldBody.pos.{var} = node.min_{var} + d{var};",{indent:12})}
            retriesCount -= 1;
            // Make sure we don't bump it out of the box. If we do, next iteration should fix it
          } while (retriesCount > 0 && isSamePosition(oldBody.pos, body.pos));

          if (retriesCount === 0 && isSamePosition(oldBody.pos, body.pos)) {
            // This is very bad, we ran out of precision.
            // if we do not return from the method we'll get into
            // infinite loop here. So we sacrifice correctness of layout, and keep the app running
            // Next layout iteration should get larger bounding box in the first step and fix this
            return;
          }
        }
        // Next iteration should subdivide node further.
        insertStack.push(node, oldBody);
        insertStack.push(node, body);
      }
    }
  }
}
return createQuadTree;

`;function r(a){let l=[],c=Array(a+1).join(" ");for(let u=0;u<n;++u)l.push(c+`if (${Qn(u)} > max_${Qn(u)}) {`),l.push(c+`  quadIdx = quadIdx + ${Math.pow(2,u)};`),l.push(c+`  min_${Qn(u)} = max_${Qn(u)};`),l.push(c+`  max_${Qn(u)} = node.max_${Qn(u)};`),l.push(c+"}");return l.join(`
`)}function s(){let a=Array(11).join(" "),l=[];for(let c=0;c<t;++c)l.push(a+`if (node.quad${c}) {`),l.push(a+`  queue[pushIdx] = node.quad${c};`),l.push(a+"  queueLength += 1;"),l.push(a+"  pushIdx += 1;"),l.push(a+"}");return l.join(`
`)}function o(a){let l=[];for(let c=0;c<t;++c)l.push(`${a}quad${c} = null;`);return l.join(`
`)}}function Vd(n){let e=pc(n);return`
  function isSamePosition(point1, point2) {
    ${e("var d{var} = Math.abs(point1.{var} - point2.{var});",{indent:2})}
  
    return ${e("d{var} < 1e-8",{join:" && "})};
  }  
`}function Hd(n){var e=Math.pow(2,n);return`
function setChild(node, idx, child) {
  ${t()}
}`;function t(){let i=[];for(let r=0;r<e;++r){let s=r===0?"  ":"  else ";i.push(`${s}if (idx === ${r}) node.quad${r} = child;`)}return i.join(`
`)}}function Gd(n){return`function getChild(node, idx) {
${e()}
  return null;
}`;function e(){let t=[],i=Math.pow(2,n);for(let r=0;r<i;++r)t.push(`  if (idx === ${r}) return node.quad${r};`);return t.join(`
`)}}function Wd(n){let e=pc(n),t=Math.pow(2,n);var i=`
function QuadNode() {
  // body stored inside this node. In quad tree only leaf nodes (by construction)
  // contain bodies:
  this.body = null;

  // Child nodes are stored in quads. Each quad is presented by number:
  // 0 | 1
  // -----
  // 2 | 3
${r("  this.")}

  // Total mass of current node
  this.mass = 0;

  // Center of mass coordinates
  ${e("this.mass_{var} = 0;",{indent:2})}

  // bounding box coordinates
  ${e("this.min_{var} = 0;",{indent:2})}
  ${e("this.max_{var} = 0;",{indent:2})}
}
`;return i;function r(s){let o=[];for(let a=0;a<t;++a)o.push(`${s}quad${a} = null;`);return o.join(`
`)}}function jd(){return`
/**
 * Our implementation of QuadTree is non-recursive to avoid GC hit
 * This data structure represent stack of elements
 * which we are trying to insert into quad tree.
 */
function InsertStack () {
    this.stack = [];
    this.popIdx = 0;
}

InsertStack.prototype = {
    isEmpty: function() {
        return this.popIdx === 0;
    },
    push: function (node, body) {
        var item = this.stack[this.popIdx];
        if (!item) {
            // we are trying to avoid memory pressure: create new element
            // only when absolutely necessary
            this.stack[this.popIdx] = new InsertStackElement(node, body);
        } else {
            item.node = node;
            item.body = body;
        }
        ++this.popIdx;
    },
    pop: function () {
        if (this.popIdx > 0) {
            return this.stack[--this.popIdx];
        }
    },
    reset: function () {
        this.popIdx = 0;
    }
};

function InsertStackElement(node, body) {
    this.node = node; // QuadTree node
    this.body = body; // physical body which needs to be inserted to node
}
`}});var Yd=It((hT,mc)=>{mc.exports=Pb;mc.exports.generateFunctionBody=qd;var Rb=Ei();function Pb(n){let e=qd(n);return new Function("bodies","settings","random",e)}function qd(n){let e=Rb(n);return`
  var boundingBox = {
    ${e("min_{var}: 0, max_{var}: 0,",{indent:4})}
  };

  return {
    box: boundingBox,

    update: updateBoundingBox,

    reset: resetBoundingBox,

    getBestNewPosition: function (neighbors) {
      var ${e("base_{var} = 0",{join:", "})};

      if (neighbors.length) {
        for (var i = 0; i < neighbors.length; ++i) {
          let neighborPos = neighbors[i].pos;
          ${e("base_{var} += neighborPos.{var};",{indent:10})}
        }

        ${e("base_{var} /= neighbors.length;",{indent:8})}
      } else {
        ${e("base_{var} = (boundingBox.min_{var} + boundingBox.max_{var}) / 2;",{indent:8})}
      }

      var springLength = settings.springLength;
      return {
        ${e("{var}: base_{var} + (random.nextDouble() - 0.5) * springLength,",{indent:8})}
      };
    }
  };

  function updateBoundingBox() {
    var i = bodies.length;
    if (i === 0) return; // No bodies - no borders.

    ${e("var max_{var} = -Infinity;",{indent:4})}
    ${e("var min_{var} = Infinity;",{indent:4})}

    while(i--) {
      // this is O(n), it could be done faster with quadtree, if we check the root node bounds
      var bodyPos = bodies[i].pos;
      ${e("if (bodyPos.{var} < min_{var}) min_{var} = bodyPos.{var};",{indent:6})}
      ${e("if (bodyPos.{var} > max_{var}) max_{var} = bodyPos.{var};",{indent:6})}
    }

    ${e("boundingBox.min_{var} = min_{var};",{indent:4})}
    ${e("boundingBox.max_{var} = max_{var};",{indent:4})}
  }

  function resetBoundingBox() {
    ${e("boundingBox.min_{var} = boundingBox.max_{var} = 0;",{indent:4})}
  }
`}});var Zd=It((fT,gc)=>{var Ib=Ei();gc.exports=Lb;gc.exports.generateCreateDragForceFunctionBody=$d;function Lb(n){let e=$d(n);return new Function("options",e)}function $d(n){return`
  if (!Number.isFinite(options.dragCoefficient)) throw new Error('dragCoefficient is not a finite number');

  return {
    update: function(body) {
      ${Ib(n)("body.force.{var} -= options.dragCoefficient * body.velocity.{var};",{indent:6})}
    }
  };
`}});var Kd=It((dT,vc)=>{var Ob=Ei();vc.exports=Db;vc.exports.generateCreateSpringForceFunctionBody=Jd;function Db(n){let e=Jd(n);return new Function("options","random",e)}function Jd(n){let e=Ob(n);return`
  if (!Number.isFinite(options.springCoefficient)) throw new Error('Spring coefficient is not a number');
  if (!Number.isFinite(options.springLength)) throw new Error('Spring length is not a number');

  return {
    /**
     * Updates forces acting on a spring
     */
    update: function (spring) {
      var body1 = spring.from;
      var body2 = spring.to;
      var length = spring.length < 0 ? options.springLength : spring.length;
      ${e("var d{var} = body2.pos.{var} - body1.pos.{var};",{indent:6})}
      var r = Math.sqrt(${e("d{var} * d{var}",{join:" + "})});

      if (r === 0) {
        ${e("d{var} = (random.nextDouble() - 0.5) / 50;",{indent:8})}
        r = Math.sqrt(${e("d{var} * d{var}",{join:" + "})});
      }

      var d = r - length;
      var coefficient = ((spring.coefficient > 0) ? spring.coefficient : options.springCoefficient) * d / r;

      ${e("body1.force.{var} += coefficient * d{var}",{indent:6})};
      body1.springCount += 1;
      body1.springLength += r;

      ${e("body2.force.{var} -= coefficient * d{var}",{indent:6})};
      body2.springCount += 1;
      body2.springLength += r;
    }
  };
`}});var ep=It((pT,yc)=>{var Nb=Ei();yc.exports=Ub;yc.exports.generateIntegratorFunctionBody=Qd;function Ub(n){let e=Qd(n);return new Function("bodies","timeStep","adaptiveTimeStepWeight",e)}function Qd(n){let e=Nb(n);return`
  var length = bodies.length;
  if (length === 0) return 0;

  ${e("var d{var} = 0, t{var} = 0;",{indent:2})}

  for (var i = 0; i < length; ++i) {
    var body = bodies[i];
    if (body.isPinned) continue;

    if (adaptiveTimeStepWeight && body.springCount) {
      timeStep = (adaptiveTimeStepWeight * body.springLength/body.springCount);
    }

    var coeff = timeStep / body.mass;

    ${e("body.velocity.{var} += coeff * body.force.{var};",{indent:4})}
    ${e("var v{var} = body.velocity.{var};",{indent:4})}
    var v = Math.sqrt(${e("v{var} * v{var}",{join:" + "})});

    if (v > 1) {
      // We normalize it so that we move within timeStep range. 
      // for the case when v <= 1 - we let velocity to fade out.
      ${e("body.velocity.{var} = v{var} / v;",{indent:6})}
    }

    ${e("d{var} = timeStep * body.velocity.{var};",{indent:4})}

    ${e("body.pos.{var} += d{var};",{indent:4})}

    ${e("t{var} += Math.abs(d{var});",{indent:4})}
  }

  return (${e("t{var} * t{var}",{join:" + "})})/length;
`}});var np=It((mT,tp)=>{tp.exports=Fb;function Fb(n,e,t,i){this.from=n,this.to=e,this.length=t,this.coefficient=i}});var sp=It((gT,rp)=>{rp.exports=ip;function ip(n,e){var t;if(n||(n={}),e){for(t in e)if(e.hasOwnProperty(t)){var i=n.hasOwnProperty(t),r=typeof e[t],s=!i||typeof n[t]!==r;s?n[t]=e[t]:r==="object"&&(n[t]=ip(n[t],e[t]))}}return n}});var lp=It((vT,ko)=>{ko.exports=_c;ko.exports.random=_c,ko.exports.randomIterator=Vb;function _c(n){var e=typeof n=="number"?n:+new Date;return new gr(e)}function gr(n){this.seed=n}gr.prototype.next=zb;gr.prototype.nextDouble=ap;gr.prototype.uniform=ap;gr.prototype.gaussian=Bb;function Bb(){var n,e,t;do e=this.nextDouble()*2-1,t=this.nextDouble()*2-1,n=e*e+t*t;while(n>=1||n===0);return e*Math.sqrt(-2*Math.log(n)/n)}gr.prototype.levy=kb;function kb(){var n=1.5,e=Math.pow(op(1+n)*Math.sin(Math.PI*n/2)/(op((1+n)/2)*n*Math.pow(2,(n-1)/2)),1/n);return this.gaussian()*e/Math.pow(Math.abs(this.gaussian()),1/n)}function op(n){return Math.sqrt(2*Math.PI/n)*Math.pow(1/Math.E*(n+1/(12*n-1/(10*n))),n)}function ap(){var n=this.seed;return n=n+2127912214+(n<<12)&4294967295,n=(n^3345072700^n>>>19)&4294967295,n=n+374761393+(n<<5)&4294967295,n=(n+3550635116^n<<9)&4294967295,n=n+4251993797+(n<<3)&4294967295,n=(n^3042594569^n>>>16)&4294967295,this.seed=n,(n&268435455)/268435456}function zb(n){return Math.floor(this.nextDouble()*n)}function Vb(n,e){var t=e||_c();if(typeof t.next!="function")throw new Error("customRandom does not match expected API: next() function is missing");return{forEach:r,shuffle:i};function i(){var s,o,a;for(s=n.length-1;s>0;--s)o=t.next(s+1),a=n[o],n[o]=n[s],n[s]=a;return n}function r(s){var o,a,l;for(o=n.length-1;o>0;--o)a=t.next(o+1),l=n[a],n[a]=n[o],n[o]=l,s(l);n.length&&s(n[0])}}});var xc=It((yT,up)=>{up.exports=Yb;var Hb=kd(),Gb=Xd(),Wb=Yd(),jb=Zd(),Xb=Kd(),qb=ep(),cp={};function Yb(n){var e=np(),t=sp(),i=Fo();if(n){if(n.springCoeff!==void 0)throw new Error("springCoeff was renamed to springCoefficient");if(n.dragCoeff!==void 0)throw new Error("dragCoeff was renamed to dragCoefficient")}n=t(n,{springLength:10,springCoefficient:.8,gravity:-12,theta:.8,dragCoefficient:.9,timeStep:.5,adaptiveTimeStepWeight:0,dimensions:2,debug:!1});var r=cp[n.dimensions];if(!r){var s=n.dimensions;r={Body:Hb(s,n.debug),createQuadTree:Gb(s),createBounds:Wb(s),createDragForce:jb(s),createSpringForce:Xb(s),integrate:qb(s)},cp[s]=r}var o=r.Body,a=r.createQuadTree,l=r.createBounds,c=r.createDragForce,u=r.createSpringForce,h=r.integrate,d=O=>new o(O),m=lp().random(42),g=[],v=[],p=a(n,m),f=l(g,n,m),M=u(n,m),y=c(n),x=0,A=[],w=new Map,T=0;b("nbody",D),b("spring",I);var R={bodies:g,quadTree:p,springs:v,settings:n,addForce:b,removeForce:U,getForces:B,step:function(){for(var O=0;O<A.length;++O)A[O](T);var k=h(g,n.timeStep,n.adaptiveTimeStepWeight);return T+=1,k},addBody:function(O){if(!O)throw new Error("Body is required");return g.push(O),O},addBodyAt:function(O){if(!O)throw new Error("Body position is required");var k=d(O);return g.push(k),k},removeBody:function(O){if(O){var k=g.indexOf(O);if(!(k<0))return g.splice(k,1),g.length===0&&f.reset(),!0}},addSpring:function(O,k,te,W){if(!O||!k)throw new Error("Cannot add null spring to force simulator");typeof te!="number"&&(te=-1);var ie=new e(O,k,te,W>=0?W:-1);return v.push(ie),ie},getTotalMovement:function(){return x},removeSpring:function(O){if(O){var k=v.indexOf(O);if(k>-1)return v.splice(k,1),!0}},getBestNewBodyPosition:function(O){return f.getBestNewPosition(O)},getBBox:S,getBoundingBox:S,invalidateBBox:function(){console.warn("invalidateBBox() is deprecated, bounds always recomputed on `getBBox()` call")},gravity:function(O){return O!==void 0?(n.gravity=O,p.options({gravity:O}),this):n.gravity},theta:function(O){return O!==void 0?(n.theta=O,p.options({theta:O}),this):n.theta},random:m};return $b(n,R),i(R),R;function S(){return f.update(),f.box}function b(O,k){if(w.has(O))throw new Error("Force "+O+" is already added");w.set(O,k),A.push(k)}function U(O){var k=A.indexOf(w.get(O));k<0||(A.splice(k,1),w.delete(O))}function B(){return w}function D(){if(g.length!==0){p.insertBodies(g);for(var O=g.length;O--;){var k=g[O];k.isPinned||(k.reset(),p.updateBodyForce(k),y.update(k))}}}function I(){for(var O=v.length;O--;)M.update(v[O])}}function $b(n,e){for(var t in n)Zb(n,e,t)}function Zb(n,e,t){if(n.hasOwnProperty(t)&&typeof e[t]!="function"){var i=Number.isFinite(n[t]);i?e[t]=function(r){if(r!==void 0){if(!Number.isFinite(r))throw new Error("Value of "+t+" should be a valid number.");return n[t]=r,e}return n[t]}:e[t]=function(r){return r!==void 0?(n[t]=r,e):n[t]}}}});var hp=It((_T,bc)=>{bc.exports=Kb;bc.exports.simulator=xc();var Jb=Fo();function Kb(n,e){if(!n)throw new Error("Graph structure cannot be undefined");var t=e&&e.createSimulator||xc(),i=t(e);if(Array.isArray(e))throw new Error("Physics settings is expected to be an object");var r=n.version>19?D:B;e&&typeof e.nodeMass=="function"&&(r=e.nodeMass);var s=new Map,o={},a=0,l=i.settings.springTransform||Qb;y(),p();var c=!1,u={step:function(){if(a===0)return h(!0),!0;var I=i.step();u.lastMove=I,u.fire("step");var O=I/a,k=O<=.01;return h(k),k},getNodePosition:function(I){return U(I).pos},setNodePosition:function(I){var O=U(I);O.setPosition.apply(O,Array.prototype.slice.call(arguments,1))},getLinkPosition:function(I){var O=o[I];if(O)return{from:O.from.pos,to:O.to.pos}},getGraphRect:function(){return i.getBBox()},forEachBody:d,pinNode:function(I,O){var k=U(I.id);k.isPinned=!!O},isNodePinned:function(I){return U(I.id).isPinned},dispose:function(){n.off("changed",M),u.fire("disposed")},getBody:v,getSpring:g,getForceVectorLength:m,simulator:i,graph:n,lastMove:0};return Jb(u),u;function h(I){c!==I&&(c=I,f(I))}function d(I){s.forEach(I)}function m(){var I=0,O=0;return d(function(k){I+=Math.abs(k.force.x),O+=Math.abs(k.force.y)}),Math.sqrt(I*I+O*O)}function g(I,O){var k;if(O===void 0)typeof I!="object"?k=I:k=I.id;else{var te=n.hasLink(I,O);if(!te)return;k=te.id}return o[k]}function v(I){return s.get(I)}function p(){n.on("changed",M)}function f(I){u.fire("stable",I)}function M(I){for(var O=0;O<I.length;++O){var k=I[O];k.changeType==="add"?(k.node&&x(k.node.id),k.link&&w(k.link)):k.changeType==="remove"&&(k.node&&A(k.node),k.link&&T(k.link))}a=n.getNodesCount()}function y(){a=0,n.forEachNode(function(I){x(I.id),a+=1}),n.forEachLink(w)}function x(I){var O=s.get(I);if(!O){var k=n.getNode(I);if(!k)throw new Error("initBody() was called with unknown node id");var te=k.position;if(!te){var W=R(k);te=i.getBestNewBodyPosition(W)}O=i.addBodyAt(te),O.id=I,s.set(I,O),S(I),b(k)&&(O.isPinned=!0)}}function A(I){var O=I.id,k=s.get(O);k&&(s.delete(O),i.removeBody(k))}function w(I){S(I.fromId),S(I.toId);var O=s.get(I.fromId),k=s.get(I.toId),te=i.addSpring(O,k,I.length);l(I,te),o[I.id]=te}function T(I){var O=o[I.id];if(O){var k=n.getNode(I.fromId),te=n.getNode(I.toId);k&&S(k.id),te&&S(te.id),delete o[I.id],i.removeSpring(O)}}function R(I){var O=[];if(!I.links)return O;for(var k=Math.min(I.links.length,2),te=0;te<k;++te){var W=I.links[te],ie=W.fromId!==I.id?s.get(W.fromId):s.get(W.toId);ie&&ie.pos&&O.push(ie)}return O}function S(I){var O=s.get(I);if(O.mass=r(I),Number.isNaN(O.mass))throw new Error("Node mass should be a number")}function b(I){return I&&(I.isPinned||I.data&&I.data.isPinned)}function U(I){var O=s.get(I);return O||(x(I),O=s.get(I)),O}function B(I){var O=n.getLinks(I);return O?1+O.length/3:1}function D(I){var O=n.getLinks(I);return O?1+O.size/3:1}}function Qb(){}});var U1={};Om(U1,{ForceGraph3D:()=>ym,SpriteText:()=>Sm});var $r="163",Yt={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Si={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Nm=0,hu=1,Um=2;var Wh=1,Fm=2,Tn=3,Zn=0,At=1,Cn=2,yn=0,Zi=1,fu=2,du=3,pu=4,Bm=5,pi=100,km=101,zm=102,Vm=103,Hm=104,Gm=200,Wm=201,jm=202,Xm=203,el=204,tl=205,qm=206,Ym=207,$m=208,Zm=209,Jm=210,Km=211,Qm=212,eg=213,tg=214,ng=0,ig=1,rg=2,$s=3,sg=4,og=5,ag=6,lg=7,Wl=0,cg=1,ug=2,Yn=0,hg=1,fg=2,dg=3,pg=4,mg=5,gg=6,vg=7;var jh=300,er=301,tr=302,nl=303,il=304,Eo=306,rl=1e3,gi=1001,sl=1002,en=1003,yg=1004;var bs=1005;var Xt=1006,va=1007;var vi=1008;var $n=1009,_g=1010,xg=1011,Xh=1012,qh=1013,nr=1014,qn=1015,ir=1016,Yh=1017,$h=1018,Zr=1020,bg=35902,Mg=1021,Sg=1022,vn=1023,wg=1024,Eg=1025,Ji=1026,Fr=1027,Ag=1028,Zh=1029,Tg=1030,Jh=1031,Kh=1033,ya=33776,_a=33777,xa=33778,ba=33779,mu=35840,gu=35841,vu=35842,yu=35843,Qh=36196,_u=37492,xu=37496,bu=37808,Mu=37809,Su=37810,wu=37811,Eu=37812,Au=37813,Tu=37814,Cu=37815,Ru=37816,Pu=37817,Iu=37818,Lu=37819,Ou=37820,Du=37821,Ma=36492,Nu=36494,Uu=36495,Cg=36283,Fu=36284,Bu=36285,ku=36286;var Zs=2300,Js=2301,Sa=2302,zu=2400,Vu=2401,Hu=2402;var Rg=3200,Pg=3201,ef=0,Ig=1,Xn="",Bt="srgb",Jn="srgb-linear",jl="display-p3",Ao="display-p3-linear",Ks="linear",et="srgb",Qs="rec709",eo="p3";var Ci=7680;var Gu=519,Lg=512,Og=513,Dg=514,tf=515,Ng=516,Ug=517,Fg=518,Bg=519,ol=35044;var Wu="300 es",Rn=2e3,to=2001,_t=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ju=1234567,Lr=Math.PI/180,Br=180/Math.PI;function In(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function vt(n,e,t){return Math.max(e,Math.min(t,n))}function Xl(n,e){return(n%e+e)%e}function kg(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function zg(n,e,t){return n!==e?(t-n)/(e-n):0}function Or(n,e,t){return(1-t)*n+t*e}function Vg(n,e,t,i){return Or(n,e,1-Math.exp(-t*i))}function Hg(n,e=1){return e-Math.abs(Xl(n,e*2)-e)}function Gg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Wg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function jg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Xg(n,e){return n+Math.random()*(e-n)}function qg(n){return n*(.5-Math.random())}function Yg(n){n!==void 0&&(ju=n);let e=ju+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $g(n){return n*Lr}function Zg(n){return n*Br}function Jg(n){return(n&n-1)===0&&n!==0}function Kg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Qg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function e0(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),d=o((e-i)/2),m=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*h,l*d,a*c);break;case"YZY":n.set(l*d,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*d,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*m,a*c);break;case"YXY":n.set(l*m,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*m,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function an(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ze(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Jr={DEG2RAD:Lr,RAD2DEG:Br,generateUUID:In,clamp:vt,euclideanModulo:Xl,mapLinear:kg,inverseLerp:zg,lerp:Or,damp:Vg,pingpong:Hg,smoothstep:Gg,smootherstep:Wg,randInt:jg,randFloat:Xg,randFloatSpread:qg,seededRandom:Yg,degToRad:$g,radToDeg:Zg,isPowerOfTwo:Jg,ceilPowerOfTwo:Kg,floorPowerOfTwo:Qg,setQuaternionFromProperEuler:e0,normalize:Ze,denormalize:an},se=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Be=class n{constructor(e,t,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],m=i[5],g=i[8],v=r[0],p=r[3],f=r[6],M=r[1],y=r[4],x=r[7],A=r[2],w=r[5],T=r[8];return s[0]=o*v+a*M+l*A,s[3]=o*p+a*y+l*w,s[6]=o*f+a*x+l*T,s[1]=c*v+u*M+h*A,s[4]=c*p+u*y+h*w,s[7]=c*f+u*x+h*T,s[2]=d*v+m*M+g*A,s[5]=d*p+m*y+g*w,s[8]=d*f+m*x+g*T,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,m=c*s-o*l,g=t*h+i*d+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=h*v,e[1]=(r*c-u*i)*v,e[2]=(a*i-r*o)*v,e[3]=d*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=m*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(wa.makeScale(e,t)),this}rotate(e){return this.premultiply(wa.makeRotation(-e)),this}translate(e,t){return this.premultiply(wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wa=new Be;function nf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function kr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function t0(){let n=kr("canvas");return n.style.display="block",n}var Xu={};function rf(n){n in Xu||(Xu[n]=!0,console.warn(n))}var qu=new Be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Yu=new Be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ms={[Jn]:{transfer:Ks,primaries:Qs,toReference:n=>n,fromReference:n=>n},[Bt]:{transfer:et,primaries:Qs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ao]:{transfer:Ks,primaries:eo,toReference:n=>n.applyMatrix3(Yu),fromReference:n=>n.applyMatrix3(qu)},[jl]:{transfer:et,primaries:eo,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Yu),fromReference:n=>n.applyMatrix3(qu).convertLinearToSRGB()}},n0=new Set([Jn,Ao]),Ke={enabled:!0,_workingColorSpace:Jn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!n0.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;let i=Ms[e].toReference,r=Ms[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ms[n].primaries},getTransfer:function(n){return n===Xn?Ks:Ms[n].transfer}};function Ki(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ea(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ri,al=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ri===void 0&&(Ri=kr("canvas")),Ri.width=e.width,Ri.height=e.height;let i=Ri.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ri}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=kr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ki(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ki(t[i]/255)*255):t[i]=Ki(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},i0=0,no=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Aa(r[o].image)):s.push(Aa(r[o]))}else s=Aa(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Aa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?al.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var r0=0,Ut=class n extends _t{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=gi,r=gi,s=Xt,o=vi,a=vn,l=$n,c=n.DEFAULT_ANISOTROPY,u=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=In(),this.name="",this.source=new no(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rl:e.x=e.x-Math.floor(e.x);break;case gi:e.x=e.x<0?0:1;break;case sl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rl:e.y=e.y-Math.floor(e.y);break;case gi:e.y=e.y<0?0:1;break;case sl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=jh;Ut.DEFAULT_ANISOTROPY=1;var yt=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],m=l[5],g=l[9],v=l[2],p=l[6],f=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,x=(m+1)/2,A=(f+1)/2,w=(u+d)/4,T=(h+v)/4,R=(g+p)/4;return y>x&&y>A?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=w/i,s=T/i):x>A?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=w/r,s=R/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=T/s,r=R/s),this.set(i,r,s,t),this}let M=Math.sqrt((p-g)*(p-g)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(h-v)/M,this.z=(d-u)/M,this.w=Math.acos((c+m+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ll=class extends _t{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);let s=new Ut(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new no(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends ll{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},io=class extends Ut{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cl=class extends Ut{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xt=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],d=s[o+0],m=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==d||c!==m||u!==g){let p=1-a,f=l*d+c*m+u*g+h*v,M=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){let A=Math.sqrt(y),w=Math.atan2(A,f*M);p=Math.sin(p*w)/A,a=Math.sin(a*w)/A}let x=a*M;if(l=l*p+d*x,c=c*p+m*x,u=u*p+g*x,h=h*p+v*x,p===1-a){let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],d=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*m-c*d,e[t+1]=l*g+u*d+c*h-a*m,e[t+2]=c*g+u*m+a*d-l*h,e[t+3]=u*g-a*h-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),d=l(i/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*m*g,this._y=c*m*h-d*u*g,this._z=c*u*g+d*m*h,this._w=c*u*h-d*m*g;break;case"YXZ":this._x=d*u*h+c*m*g,this._y=c*m*h-d*u*g,this._z=c*u*g-d*m*h,this._w=c*u*h+d*m*g;break;case"ZXY":this._x=d*u*h-c*m*g,this._y=c*m*h+d*u*g,this._z=c*u*g+d*m*h,this._w=c*u*h-d*m*g;break;case"ZYX":this._x=d*u*h-c*m*g,this._y=c*m*h+d*u*g,this._z=c*u*g-d*m*h,this._w=c*u*h+d*m*g;break;case"YZX":this._x=d*u*h+c*m*g,this._y=c*m*h+d*u*g,this._z=c*u*g-d*m*h,this._w=c*u*h-d*m*g;break;case"XZY":this._x=d*u*h-c*m*g,this._y=c*m*h-d*u*g,this._z=c*u*g+d*m*h,this._w=c*u*h+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+a+h;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>h){let m=2*Math.sqrt(1+i-a-h);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>h){let m=2*Math.sqrt(1+a-i-h);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{let m=2*Math.sqrt(1+h-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($u.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($u.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ta.copy(this).projectOnVector(e),this.sub(Ta)}reflect(e){return this.sub(Ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ta=new L,$u=new xt,cn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,rn):rn.fromBufferAttribute(s,o),rn.applyMatrix4(e.matrixWorld),this.expandByPoint(rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ss.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ss.copy(i.boundingBox)),Ss.applyMatrix4(e.matrixWorld),this.union(Ss)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,rn),rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),ws.subVectors(this.max,wr),Pi.subVectors(e.a,wr),Ii.subVectors(e.b,wr),Li.subVectors(e.c,wr),zn.subVectors(Ii,Pi),Vn.subVectors(Li,Ii),ai.subVectors(Pi,Li);let t=[0,-zn.z,zn.y,0,-Vn.z,Vn.y,0,-ai.z,ai.y,zn.z,0,-zn.x,Vn.z,0,-Vn.x,ai.z,0,-ai.x,-zn.y,zn.x,0,-Vn.y,Vn.x,0,-ai.y,ai.x,0];return!Ca(t,Pi,Ii,Li,ws)||(t=[1,0,0,0,1,0,0,0,1],!Ca(t,Pi,Ii,Li,ws))?!1:(Es.crossVectors(zn,Vn),t=[Es.x,Es.y,Es.z],Ca(t,Pi,Ii,Li,ws))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Mn=[new L,new L,new L,new L,new L,new L,new L,new L],rn=new L,Ss=new cn,Pi=new L,Ii=new L,Li=new L,zn=new L,Vn=new L,ai=new L,wr=new L,ws=new L,Es=new L,li=new L;function Ca(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){li.fromArray(n,s);let a=r.x*Math.abs(li.x)+r.y*Math.abs(li.y)+r.z*Math.abs(li.z),l=e.dot(li),c=t.dot(li),u=i.dot(li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var s0=new cn,Er=new L,Ra=new L,rr=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):s0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Er,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ra.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Ra)),this.expandByPoint(Er.copy(e.center).sub(Ra))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Sn=new L,Pa=new L,As=new L,Hn=new L,Ia=new L,Ts=new L,La=new L,_i=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Pa.copy(e).add(t).multiplyScalar(.5),As.copy(t).sub(e).normalize(),Hn.copy(this.origin).sub(Pa);let s=e.distanceTo(t)*.5,o=-this.direction.dot(As),a=Hn.dot(this.direction),l=-Hn.dot(As),c=Hn.lengthSq(),u=Math.abs(1-o*o),h,d,m,g;if(u>0)if(h=o*l-a,d=o*a-l,g=s*u,h>=0)if(d>=-g)if(d<=g){let v=1/u;h*=v,d*=v,m=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Pa).addScaledVector(As,d),m}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);let i=Sn.dot(this.direction),r=Sn.dot(Sn)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,i,r,s){Ia.subVectors(t,e),Ts.subVectors(i,e),La.crossVectors(Ia,Ts);let o=this.direction.dot(La),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hn.subVectors(this.origin,e);let l=a*this.direction.dot(Ts.crossVectors(Hn,Ts));if(l<0)return null;let c=a*this.direction.dot(Ia.cross(Hn));if(c<0||l+c>o)return null;let u=-a*Hn.dot(La);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qe=class n{constructor(e,t,i,r,s,o,a,l,c,u,h,d,m,g,v,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,d,m,g,v,p)}set(e,t,i,r,s,o,a,l,c,u,h,d,m,g,v,p){let f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=m,f[7]=g,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/Oi.setFromMatrixColumn(e,0).length(),s=1/Oi.setFromMatrixColumn(e,1).length(),o=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=o*u,m=o*h,g=a*u,v=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+g*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,m=l*h,g=c*u,v=c*h;t[0]=d+v*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,m=l*h,g=c*u,v=c*h;t[0]=d-v*a,t[4]=-o*h,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,m=o*h,g=a*u,v=a*h;t[0]=l*u,t[4]=g*c-m,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,m=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=v-d*h,t[8]=g*h+m,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*h+g,t[10]=d-v*h}else if(e.order==="XZY"){let d=o*l,m=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=o*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=a*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(o0,e,a0)}lookAt(e,t,i){let r=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Gn.crossVectors(i,Gt),Gn.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Gn.crossVectors(i,Gt)),Gn.normalize(),Cs.crossVectors(Gt,Gn),r[0]=Gn.x,r[4]=Cs.x,r[8]=Gt.x,r[1]=Gn.y,r[5]=Cs.y,r[9]=Gt.y,r[2]=Gn.z,r[6]=Cs.z,r[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],m=i[13],g=i[2],v=i[6],p=i[10],f=i[14],M=i[3],y=i[7],x=i[11],A=i[15],w=r[0],T=r[4],R=r[8],S=r[12],b=r[1],U=r[5],B=r[9],D=r[13],I=r[2],O=r[6],k=r[10],te=r[14],W=r[3],ie=r[7],G=r[11],Q=r[15];return s[0]=o*w+a*b+l*I+c*W,s[4]=o*T+a*U+l*O+c*ie,s[8]=o*R+a*B+l*k+c*G,s[12]=o*S+a*D+l*te+c*Q,s[1]=u*w+h*b+d*I+m*W,s[5]=u*T+h*U+d*O+m*ie,s[9]=u*R+h*B+d*k+m*G,s[13]=u*S+h*D+d*te+m*Q,s[2]=g*w+v*b+p*I+f*W,s[6]=g*T+v*U+p*O+f*ie,s[10]=g*R+v*B+p*k+f*G,s[14]=g*S+v*D+p*te+f*Q,s[3]=M*w+y*b+x*I+A*W,s[7]=M*T+y*U+x*O+A*ie,s[11]=M*R+y*B+x*k+A*G,s[15]=M*S+y*D+x*te+A*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],m=e[14],g=e[3],v=e[7],p=e[11],f=e[15];return g*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*m-i*l*m)+v*(+t*l*m-t*c*d+s*o*d-r*o*m+r*c*u-s*l*u)+p*(+t*c*h-t*a*m-s*o*h+i*o*m+s*a*u-i*c*u)+f*(-r*a*u-t*l*h+t*a*d+r*o*h-i*o*d+i*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],m=e[11],g=e[12],v=e[13],p=e[14],f=e[15],M=h*p*c-v*d*c+v*l*m-a*p*m-h*l*f+a*d*f,y=g*d*c-u*p*c-g*l*m+o*p*m+u*l*f-o*d*f,x=u*v*c-g*h*c+g*a*m-o*v*m-u*a*f+o*h*f,A=g*h*l-u*v*l-g*a*d+o*v*d+u*a*p-o*h*p,w=t*M+i*y+r*x+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/w;return e[0]=M*T,e[1]=(v*d*s-h*p*s-v*r*m+i*p*m+h*r*f-i*d*f)*T,e[2]=(a*p*s-v*l*s+v*r*c-i*p*c-a*r*f+i*l*f)*T,e[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*m-i*l*m)*T,e[4]=y*T,e[5]=(u*p*s-g*d*s+g*r*m-t*p*m-u*r*f+t*d*f)*T,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*f-t*l*f)*T,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*m+t*l*m)*T,e[8]=x*T,e[9]=(g*h*s-u*v*s-g*i*m+t*v*m+u*i*f-t*h*f)*T,e[10]=(o*v*s-g*a*s+g*i*c-t*v*c-o*i*f+t*a*f)*T,e[11]=(u*a*s-o*h*s-u*i*c+t*h*c+o*i*m-t*a*m)*T,e[12]=A*T,e[13]=(u*v*r-g*h*r+g*i*d-t*v*d-u*i*p+t*h*p)*T,e[14]=(g*a*r-o*v*r-g*i*l+t*v*l+o*i*p-t*a*p)*T,e[15]=(o*h*r-u*a*r+u*i*l-t*h*l-o*i*d+t*a*d)*T,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,m=s*u,g=s*h,v=o*u,p=o*h,f=a*h,M=l*c,y=l*u,x=l*h,A=i.x,w=i.y,T=i.z;return r[0]=(1-(v+f))*A,r[1]=(m+x)*A,r[2]=(g-y)*A,r[3]=0,r[4]=(m-x)*w,r[5]=(1-(d+f))*w,r[6]=(p+M)*w,r[7]=0,r[8]=(g+y)*T,r[9]=(p-M)*T,r[10]=(1-(d+v))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=Oi.set(r[0],r[1],r[2]).length(),o=Oi.set(r[4],r[5],r[6]).length(),a=Oi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],sn.copy(this);let c=1/s,u=1/o,h=1/a;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,t.setFromRotationMatrix(sn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Rn){let l=this.elements,c=2*s/(t-e),u=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r),m,g;if(a===Rn)m=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===to)m=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Rn){let l=this.elements,c=1/(t-e),u=1/(i-r),h=1/(o-s),d=(t+e)*c,m=(i+r)*u,g,v;if(a===Rn)g=(o+s)*h,v=-2*h;else if(a===to)g=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Oi=new L,sn=new Qe,o0=new L(0,0,0),a0=new L(1,1,1),Gn=new L,Cs=new L,Gt=new L,Zu=new Qe,Ju=new xt,_n=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ju.setFromEuler(this),this.setFromQuaternion(Ju,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER="XYZ";var zr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},l0=0,Ku=new L,Di=new xt,wn=new Qe,Rs=new L,Ar=new L,c0=new L,u0=new xt,Qu=new L(1,0,0),eh=new L(0,1,0),th=new L(0,0,1),nh={type:"added"},h0={type:"removed"},Ni={type:"childadded",child:null},Oa={type:"childremoved",child:null},Tt=class n extends _t{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new L,t=new _n,i=new xt,r=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Be}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis(Qu,e)}rotateY(e){return this.rotateOnAxis(eh,e)}rotateZ(e){return this.rotateOnAxis(th,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qu,e)}translateY(e){return this.translateOnAxis(eh,e)}translateZ(e){return this.translateOnAxis(th,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rs.copy(e):Rs.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(Ar,Rs,this.up):wn.lookAt(Rs,Ar,this.up),this.quaternion.setFromRotationMatrix(wn),r&&(wn.extractRotation(r.matrixWorld),Di.setFromRotationMatrix(wn),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nh),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(h0),Oa.child=e,this.dispatchEvent(Oa),Oa.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nh),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,c0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,u0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++){let s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++){let a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};Tt.DEFAULT_UP=new L(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=new L,En=new L,Da=new L,An=new L,Ui=new L,Fi=new L,ih=new L,Na=new L,Ua=new L,Fa=new L,yi=class n{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),on.subVectors(e,t),r.cross(on);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){on.subVectors(r,t),En.subVectors(i,t),Da.subVectors(e,t);let o=on.dot(on),a=on.dot(En),l=on.dot(Da),c=En.dot(En),u=En.dot(Da),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;let d=1/h,m=(c*l-a*u)*d,g=(o*u-a*l)*d;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,An.x),l.addScaledVector(o,An.y),l.addScaledVector(a,An.z),l)}static isFrontFacing(e,t,i,r){return on.subVectors(i,t),En.subVectors(e,t),on.cross(En).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),En.subVectors(this.a,this.b),on.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Ui.subVectors(r,i),Fi.subVectors(s,i),Na.subVectors(e,i);let l=Ui.dot(Na),c=Fi.dot(Na);if(l<=0&&c<=0)return t.copy(i);Ua.subVectors(e,r);let u=Ui.dot(Ua),h=Fi.dot(Ua);if(u>=0&&h<=u)return t.copy(r);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ui,o);Fa.subVectors(e,s);let m=Ui.dot(Fa),g=Fi.dot(Fa);if(g>=0&&m<=g)return t.copy(s);let v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Fi,a);let p=u*g-m*h;if(p<=0&&h-u>=0&&m-g>=0)return ih.subVectors(s,r),a=(h-u)/(h-u+(m-g)),t.copy(r).addScaledVector(ih,a);let f=1/(p+v+d);return o=v*f,a=d*f,t.copy(i).addScaledVector(Ui,o).addScaledVector(Fi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function Ba(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ne=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=Xl(e,1),t=vt(t,0,1),i=vt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ba(o,s,e+1/3),this.g=Ba(o,s,e),this.b=Ba(o,s,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,t=Bt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){let i=sf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}copyLinearToSRGB(e){return this.r=Ea(e.r),this.g=Ea(e.g),this.b=Ea(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return Ke.fromWorkingColorSpace(Et.copy(this),e),Math.round(vt(Et.r*255,0,255))*65536+Math.round(vt(Et.g*255,0,255))*256+Math.round(vt(Et.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Et.copy(this),t);let i=Et.r,r=Et.g,s=Et.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=Bt){Ke.fromWorkingColorSpace(Et.copy(this),e);let t=Et.r,i=Et.g,r=Et.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Wn),this.setHSL(Wn.h+e,Wn.s+t,Wn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(Ps);let i=Or(Wn.h,Ps.h,t),r=Or(Wn.s,Ps.s,t),s=Or(Wn.l,Ps.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Et=new Ne;Ne.NAMES=sf;var f0=0,Ln=class extends _t{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=In(),this.name="",this.type="Material",this.blending=Zi,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=tl,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(i.blending=this.blending),this.side!==Zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==el&&(i.blendSrc=this.blendSrc),this.blendDst!==tl&&(i.blendDst=this.blendDst),this.blendEquation!==pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},sr=class extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var ht=new L,Is=new se,Nt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ol,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return rf("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Is.fromBufferAttribute(this,t),Is.applyMatrix3(e),this.setXY(t,Is.x,Is.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ze(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),i=Ze(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),i=Ze(i,this.array),r=Ze(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),i=Ze(i,this.array),r=Ze(r,this.array),s=Ze(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ol&&(e.usage=this.usage),e}};var ro=class extends Nt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var so=class extends Nt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var at=class extends Nt{constructor(e,t,i){super(new Float32Array(e),t,i)}},d0=0,Qt=new Qe,ka=new Tt,Bi=new L,Wt=new cn,Tr=new cn,gt=new L,Ct=class n extends _t{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nf(e)?so:ro)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,i){return Qt.makeTranslation(e,t,i),this.applyMatrix4(Qt),this}scale(e,t,i){return Qt.makeScale(e,t,i),this.applyMatrix4(Qt),this}lookAt(e){return ka.lookAt(e),ka.updateMatrix(),this.applyMatrix4(ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){let t=[];for(let i=0,r=e.length;i<r;i++){let s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(Wt.min,Tr.min),Wt.expandByPoint(gt),gt.addVectors(Wt.max,Tr.max),Wt.expandByPoint(gt)):(Wt.expandByPoint(Tr.min),Wt.expandByPoint(Tr.max))}Wt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)gt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(gt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)gt.fromBufferAttribute(a,c),l&&(Bi.fromBufferAttribute(e,c),gt.add(Bi)),r=Math.max(r,i.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new L,l[R]=new L;let c=new L,u=new L,h=new L,d=new se,m=new se,g=new se,v=new L,p=new L;function f(R,S,b){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,S),h.fromBufferAttribute(i,b),d.fromBufferAttribute(s,R),m.fromBufferAttribute(s,S),g.fromBufferAttribute(s,b),u.sub(c),h.sub(c),m.sub(d),g.sub(d);let U=1/(m.x*g.y-g.x*m.y);isFinite(U)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-m.y).multiplyScalar(U),p.copy(h).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(U),a[R].add(v),a[S].add(v),a[b].add(v),l[R].add(p),l[S].add(p),l[b].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let R=0,S=M.length;R<S;++R){let b=M[R],U=b.start,B=b.count;for(let D=U,I=U+B;D<I;D+=3)f(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let y=new L,x=new L,A=new L,w=new L;function T(R){A.fromBufferAttribute(r,R),w.copy(A);let S=a[R];y.copy(S),y.sub(A.multiplyScalar(A.dot(S))).normalize(),x.crossVectors(w,S);let U=x.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,U)}for(let R=0,S=M.length;R<S;++R){let b=M[R],U=b.start,B=b.count;for(let D=U,I=U+B;D<I;D+=3)T(e.getX(D+0)),T(e.getX(D+1)),T(e.getX(D+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);let r=new L,s=new L,o=new L,a=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let d=0,m=e.count;d<m;d+=3){let g=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),m=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*u;for(let f=0;f<u;f++)d[g++]=c[m++]}return new Nt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],m=e(d,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,m=h.length;d<m;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},rh=new Qe,ci=new _i,Ls=new rr,sh=new L,ki=new L,zi=new L,Vi=new L,za=new L,Os=new L,Ds=new se,Ns=new se,Us=new se,oh=new L,ah=new L,lh=new L,Fs=new L,Bs=new L,Mt=class extends Tt{constructor(e=new Ct,t=new sr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Os.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],h=s[l];u!==0&&(za.fromBufferAttribute(h,e),o?Os.addScaledVector(za,u):Os.addScaledVector(za.sub(t),u))}t.add(Os)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(s),ci.copy(e.ray).recast(e.near),!(Ls.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Ls,sh)===null||ci.origin.distanceToSquared(sh)>(e.far-e.near)**2))&&(rh.copy(s).invert(),ci.copy(e.ray).applyMatrix4(rh),!(i.boundingBox!==null&&ci.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let p=d[g],f=o[p.materialIndex],M=Math.max(p.start,m.start),y=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let x=M,A=y;x<A;x+=3){let w=a.getX(x),T=a.getX(x+1),R=a.getX(x+2);r=ks(this,f,e,i,c,u,h,w,T,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){let M=a.getX(p),y=a.getX(p+1),x=a.getX(p+2);r=ks(this,o,e,i,c,u,h,M,y,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let p=d[g],f=o[p.materialIndex],M=Math.max(p.start,m.start),y=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let x=M,A=y;x<A;x+=3){let w=x,T=x+1,R=x+2;r=ks(this,f,e,i,c,u,h,w,T,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){let M=p,y=p+1,x=p+2;r=ks(this,o,e,i,c,u,h,M,y,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function p0(n,e,t,i,r,s,o,a){let l;if(e.side===At?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Zn,a),l===null)return null;Bs.copy(a),Bs.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Bs);return c<t.near||c>t.far?null:{distance:c,point:Bs.clone(),object:n}}function ks(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ki),n.getVertexPosition(l,zi),n.getVertexPosition(c,Vi);let u=p0(n,e,t,i,ki,zi,Vi,Fs);if(u){r&&(Ds.fromBufferAttribute(r,a),Ns.fromBufferAttribute(r,l),Us.fromBufferAttribute(r,c),u.uv=yi.getInterpolation(Fs,ki,zi,Vi,Ds,Ns,Us,new se)),s&&(Ds.fromBufferAttribute(s,a),Ns.fromBufferAttribute(s,l),Us.fromBufferAttribute(s,c),u.uv1=yi.getInterpolation(Fs,ki,zi,Vi,Ds,Ns,Us,new se)),o&&(oh.fromBufferAttribute(o,a),ah.fromBufferAttribute(o,l),lh.fromBufferAttribute(o,c),u.normal=yi.getInterpolation(Fs,ki,zi,Vi,oh,ah,lh,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new L,materialIndex:0};yi.getNormal(ki,zi,Vi,h.normal),u.face=h}return u}var Vr=class n extends Ct{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,m=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(h,2));function g(v,p,f,M,y,x,A,w,T,R,S){let b=x/T,U=A/R,B=x/2,D=A/2,I=w/2,O=T+1,k=R+1,te=0,W=0,ie=new L;for(let G=0;G<k;G++){let Q=G*U-D;for(let le=0;le<O;le++){let xe=le*b-B;ie[v]=xe*M,ie[p]=Q*y,ie[f]=I,c.push(ie.x,ie.y,ie.z),ie[v]=0,ie[p]=0,ie[f]=w>0?1:-1,u.push(ie.x,ie.y,ie.z),h.push(le/T),h.push(1-G/R),te+=1}}for(let G=0;G<R;G++)for(let Q=0;Q<T;Q++){let le=d+Q+O*G,xe=d+Q+O*(G+1),z=d+(Q+1)+O*(G+1),V=d+(Q+1)+O*G;l.push(le,xe,V),l.push(xe,z,V),W+=6}a.addGroup(m,W,S),m+=W,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function or(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ot(n){let e={};for(let t=0;t<n.length;t++){let i=or(n[t]);for(let r in i)e[r]=i[r]}return e}function m0(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function of(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}var ql={clone:or,merge:Ot},g0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,v0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qt=class extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=g0,this.fragmentShader=v0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=m0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},oo=class extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},jn=new L,ch=new se,uh=new se,Dt=class extends oo{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Br*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Br*2*Math.atan(Math.tan(Lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jn.x,jn.y).multiplyScalar(-e/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(jn.x,jn.y).multiplyScalar(-e/jn.z)}getViewSize(e,t){return this.getViewBounds(e,ch,uh),t.subVectors(uh,ch)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Lr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Hi=-90,Gi=1,ul=class extends Tt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Dt(Hi,Gi,e,t);r.layers=this.layers,this.add(r);let s=new Dt(Hi,Gi,e,t);s.layers=this.layers,this.add(s);let o=new Dt(Hi,Gi,e,t);o.layers=this.layers,this.add(o);let a=new Dt(Hi,Gi,e,t);a.layers=this.layers,this.add(a);let l=new Dt(Hi,Gi,e,t);l.layers=this.layers,this.add(l);let c=new Dt(Hi,Gi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===Rn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===to)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,d,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ao=class extends Ut{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:er,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},hl=class extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ao(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Xt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vr(5,5,5),s=new qt({name:"CubemapFromEquirect",uniforms:or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:At,blending:yn});s.uniforms.tEquirect.value=t;let o=new Mt(r,s),a=t.minFilter;return t.minFilter===vi&&(t.minFilter=Xt),new ul(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},Va=new L,y0=new L,_0=new Be,jt=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Va.subVectors(i,t).cross(y0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Va),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||_0.getNormalMatrix(e),r=this.coplanarPoint(Va).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ui=new rr,zs=new L,Hr=class{constructor(e=new jt,t=new jt,i=new jt,r=new jt,s=new jt,o=new jt){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Rn){let i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],m=r[8],g=r[9],v=r[10],p=r[11],f=r[12],M=r[13],y=r[14],x=r[15];if(i[0].setComponents(l-s,d-c,p-m,x-f).normalize(),i[1].setComponents(l+s,d+c,p+m,x+f).normalize(),i[2].setComponents(l+o,d+u,p+g,x+M).normalize(),i[3].setComponents(l-o,d-u,p-g,x-M).normalize(),i[4].setComponents(l-a,d-h,p-v,x-y).normalize(),t===Rn)i[5].setComponents(l+a,d+h,p+v,x+y).normalize();else if(t===to)i[5].setComponents(a,h,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(zs.x=r.normal.x>0?e.max.x:e.min.x,zs.y=r.normal.y>0?e.max.y:e.min.y,zs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function af(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function x0(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){let u=l.array,h=l._updateRange,d=l.updateRanges;if(n.bindBuffer(c,a),h.count===-1&&d.length===0&&n.bufferSubData(c,0,u),d.length!==0){for(let m=0,g=d.length;m<g;m++){let v=d[m];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}h.count!==-1&&(n.bufferSubData(c,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var lo=class n extends Ct{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=t/l,m=[],g=[],v=[],p=[];for(let f=0;f<u;f++){let M=f*d-o;for(let y=0;y<c;y++){let x=y*h-s;g.push(x,-M,0),v.push(0,0,1),p.push(y/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){let y=M+c*f,x=M+c*(f+1),A=M+1+c*(f+1),w=M+1+c*f;m.push(y,x,w),m.push(x,A,w)}this.setIndex(m),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},b0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,M0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,S0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,w0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,T0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,C0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,R0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,P0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,I0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,D0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,N0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,z0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,V0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,H0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,W0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,j0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,X0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,q0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Y0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Z0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,J0="gl_FragColor = linearToOutputTexel( gl_FragColor );",K0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Q0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ev=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ov=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,av=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,uv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,mv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_v=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ev=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Av=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Iv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ov=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Fv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Bv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,kv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$v=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ey=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ty=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ny=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,ry=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,oy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ay=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ly=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,py=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,my=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,by=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,My=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ay=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ty=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Ry=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Py=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ly=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ny=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Uy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,By=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ky=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$y=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ky=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:b0,alphahash_pars_fragment:M0,alphamap_fragment:S0,alphamap_pars_fragment:w0,alphatest_fragment:E0,alphatest_pars_fragment:A0,aomap_fragment:T0,aomap_pars_fragment:C0,batching_pars_vertex:R0,batching_vertex:P0,begin_vertex:I0,beginnormal_vertex:L0,bsdfs:O0,iridescence_fragment:D0,bumpmap_pars_fragment:N0,clipping_planes_fragment:U0,clipping_planes_pars_fragment:F0,clipping_planes_pars_vertex:B0,clipping_planes_vertex:k0,color_fragment:z0,color_pars_fragment:V0,color_pars_vertex:H0,color_vertex:G0,common:W0,cube_uv_reflection_fragment:j0,defaultnormal_vertex:X0,displacementmap_pars_vertex:q0,displacementmap_vertex:Y0,emissivemap_fragment:$0,emissivemap_pars_fragment:Z0,colorspace_fragment:J0,colorspace_pars_fragment:K0,envmap_fragment:Q0,envmap_common_pars_fragment:ev,envmap_pars_fragment:tv,envmap_pars_vertex:nv,envmap_physical_pars_fragment:pv,envmap_vertex:iv,fog_vertex:rv,fog_pars_vertex:sv,fog_fragment:ov,fog_pars_fragment:av,gradientmap_pars_fragment:lv,lightmap_fragment:cv,lightmap_pars_fragment:uv,lights_lambert_fragment:hv,lights_lambert_pars_fragment:fv,lights_pars_begin:dv,lights_toon_fragment:mv,lights_toon_pars_fragment:gv,lights_phong_fragment:vv,lights_phong_pars_fragment:yv,lights_physical_fragment:_v,lights_physical_pars_fragment:xv,lights_fragment_begin:bv,lights_fragment_maps:Mv,lights_fragment_end:Sv,logdepthbuf_fragment:wv,logdepthbuf_pars_fragment:Ev,logdepthbuf_pars_vertex:Av,logdepthbuf_vertex:Tv,map_fragment:Cv,map_pars_fragment:Rv,map_particle_fragment:Pv,map_particle_pars_fragment:Iv,metalnessmap_fragment:Lv,metalnessmap_pars_fragment:Ov,morphinstance_vertex:Dv,morphcolor_vertex:Nv,morphnormal_vertex:Uv,morphtarget_pars_vertex:Fv,morphtarget_vertex:Bv,normal_fragment_begin:kv,normal_fragment_maps:zv,normal_pars_fragment:Vv,normal_pars_vertex:Hv,normal_vertex:Gv,normalmap_pars_fragment:Wv,clearcoat_normal_fragment_begin:jv,clearcoat_normal_fragment_maps:Xv,clearcoat_pars_fragment:qv,iridescence_pars_fragment:Yv,opaque_fragment:$v,packing:Zv,premultiplied_alpha_fragment:Jv,project_vertex:Kv,dithering_fragment:Qv,dithering_pars_fragment:ey,roughnessmap_fragment:ty,roughnessmap_pars_fragment:ny,shadowmap_pars_fragment:iy,shadowmap_pars_vertex:ry,shadowmap_vertex:sy,shadowmask_pars_fragment:oy,skinbase_vertex:ay,skinning_pars_vertex:ly,skinning_vertex:cy,skinnormal_vertex:uy,specularmap_fragment:hy,specularmap_pars_fragment:fy,tonemapping_fragment:dy,tonemapping_pars_fragment:py,transmission_fragment:my,transmission_pars_fragment:gy,uv_pars_fragment:vy,uv_pars_vertex:yy,uv_vertex:_y,worldpos_vertex:xy,background_vert:by,background_frag:My,backgroundCube_vert:Sy,backgroundCube_frag:wy,cube_vert:Ey,cube_frag:Ay,depth_vert:Ty,depth_frag:Cy,distanceRGBA_vert:Ry,distanceRGBA_frag:Py,equirect_vert:Iy,equirect_frag:Ly,linedashed_vert:Oy,linedashed_frag:Dy,meshbasic_vert:Ny,meshbasic_frag:Uy,meshlambert_vert:Fy,meshlambert_frag:By,meshmatcap_vert:ky,meshmatcap_frag:zy,meshnormal_vert:Vy,meshnormal_frag:Hy,meshphong_vert:Gy,meshphong_frag:Wy,meshphysical_vert:jy,meshphysical_frag:Xy,meshtoon_vert:qy,meshtoon_frag:Yy,points_vert:$y,points_frag:Zy,shadow_vert:Jy,shadow_frag:Ky,sprite_vert:Qy,sprite_frag:e_},he={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},gn={basic:{uniforms:Ot([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ot([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ot([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ot([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ot([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ot([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ot([he.points,he.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ot([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ot([he.common,he.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ot([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ot([he.sprite,he.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Ot([he.common,he.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Ot([he.lights,he.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};gn.physical={uniforms:Ot([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};var Vs={r:0,b:0,g:0},hi=new _n,t_=new Qe;function n_(n,e,t,i,r,s,o){let a=new Ne(0),l=s===!0?0:1,c,u,h=null,d=0,m=null;function g(p,f){let M=!1,y=f.isScene===!0?f.background:null;y&&y.isTexture&&(y=(f.backgroundBlurriness>0?t:e).get(y)),y===null?v(a,l):y&&y.isColor&&(v(y,1),M=!0);let x=n.xr.getEnvironmentBlendMode();x==="additive"?i.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Eo)?(u===void 0&&(u=new Mt(new Vr(1,1,1),new qt({name:"BackgroundCubeMaterial",uniforms:or(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:At,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),hi.copy(f.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(t_.makeRotationFromEuler(hi)),u.material.toneMapped=Ke.getTransfer(y.colorSpace)!==et,(h!==y||d!==y.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,h=y,d=y.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Mt(new lo(2,2),new qt({name:"BackgroundMaterial",uniforms:or(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==et,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,m=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function v(p,f){p.getRGB(Vs,of(n)),i.buffers.color.setClear(Vs.r,Vs.g,Vs.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(p,f=1){a.set(p),l=f,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,v(a,l)},render:g}}function i_(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,o=!1;function a(b,U,B,D,I){let O=!1,k=h(D,B,U);s!==k&&(s=k,c(s.object)),O=m(b,D,B,I),O&&g(b,D,B,I),I!==null&&e.update(I,n.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,x(b,U,B,D),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function h(b,U,B){let D=B.wireframe===!0,I=i[b.id];I===void 0&&(I={},i[b.id]=I);let O=I[U.id];O===void 0&&(O={},I[U.id]=O);let k=O[D];return k===void 0&&(k=d(l()),O[D]=k),k}function d(b){let U=[],B=[],D=[];for(let I=0;I<t;I++)U[I]=0,B[I]=0,D[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:B,attributeDivisors:D,object:b,attributes:{},index:null}}function m(b,U,B,D){let I=s.attributes,O=U.attributes,k=0,te=B.getAttributes();for(let W in te)if(te[W].location>=0){let G=I[W],Q=O[W];if(Q===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),G===void 0||G.attribute!==Q||Q&&G.data!==Q.data)return!0;k++}return s.attributesNum!==k||s.index!==D}function g(b,U,B,D){let I={},O=U.attributes,k=0,te=B.getAttributes();for(let W in te)if(te[W].location>=0){let G=O[W];G===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(G=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(G=b.instanceColor));let Q={};Q.attribute=G,G&&G.data&&(Q.data=G.data),I[W]=Q,k++}s.attributes=I,s.attributesNum=k,s.index=D}function v(){let b=s.newAttributes;for(let U=0,B=b.length;U<B;U++)b[U]=0}function p(b){f(b,0)}function f(b,U){let B=s.newAttributes,D=s.enabledAttributes,I=s.attributeDivisors;B[b]=1,D[b]===0&&(n.enableVertexAttribArray(b),D[b]=1),I[b]!==U&&(n.vertexAttribDivisor(b,U),I[b]=U)}function M(){let b=s.newAttributes,U=s.enabledAttributes;for(let B=0,D=U.length;B<D;B++)U[B]!==b[B]&&(n.disableVertexAttribArray(B),U[B]=0)}function y(b,U,B,D,I,O,k){k===!0?n.vertexAttribIPointer(b,U,B,I,O):n.vertexAttribPointer(b,U,B,D,I,O)}function x(b,U,B,D){v();let I=D.attributes,O=B.getAttributes(),k=U.defaultAttributeValues;for(let te in O){let W=O[te];if(W.location>=0){let ie=I[te];if(ie===void 0&&(te==="instanceMatrix"&&b.instanceMatrix&&(ie=b.instanceMatrix),te==="instanceColor"&&b.instanceColor&&(ie=b.instanceColor)),ie!==void 0){let G=ie.normalized,Q=ie.itemSize,le=e.get(ie);if(le===void 0)continue;let xe=le.buffer,z=le.type,V=le.bytesPerElement,J=z===n.INT||z===n.UNSIGNED_INT||ie.gpuType===qh;if(ie.isInterleavedBufferAttribute){let N=ie.data,Z=N.stride,ae=ie.offset;if(N.isInstancedInterleavedBuffer){for(let fe=0;fe<W.locationSize;fe++)f(W.location+fe,N.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let fe=0;fe<W.locationSize;fe++)p(W.location+fe);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let fe=0;fe<W.locationSize;fe++)y(W.location+fe,Q/W.locationSize,z,G,Z*V,(ae+Q/W.locationSize*fe)*V,J)}else{if(ie.isInstancedBufferAttribute){for(let N=0;N<W.locationSize;N++)f(W.location+N,ie.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let N=0;N<W.locationSize;N++)p(W.location+N);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let N=0;N<W.locationSize;N++)y(W.location+N,Q/W.locationSize,z,G,Q*V,Q/W.locationSize*N*V,J)}}else if(k!==void 0){let G=k[te];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(W.location,G);break;case 3:n.vertexAttrib3fv(W.location,G);break;case 4:n.vertexAttrib4fv(W.location,G);break;default:n.vertexAttrib1fv(W.location,G)}}}}M()}function A(){R();for(let b in i){let U=i[b];for(let B in U){let D=U[B];for(let I in D)u(D[I].object),delete D[I];delete U[B]}delete i[b]}}function w(b){if(i[b.id]===void 0)return;let U=i[b.id];for(let B in U){let D=U[B];for(let I in D)u(D[I].object),delete D[I];delete U[B]}delete i[b.id]}function T(b){for(let U in i){let B=i[U];if(B[b.id]===void 0)continue;let D=B[b.id];for(let I in D)u(D[I].object),delete D[I];delete B[b.id]}}function R(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:p,disableUnusedAttributes:M}}function r_(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let d=0;d<u;d++)this.render(l[d],c[d]);else{h.multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let m=0;m<u;m++)d+=c[m];t.update(d,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function s_(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp",a=s(o);a!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",a,"instead."),o=a);let l=t.logarithmicDepthBuffer===!0,c=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_TEXTURE_SIZE),d=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),g=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),p=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),f=u>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:l,maxTextures:c,maxVertexTextures:u,maxTextureSize:h,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:p,vertexTextures:f,maxSamples:M}}function o_(n){let e=this,t=null,i=0,r=!1,s=!1,o=new jt,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let m=h.length!==0||d||i!==0||r;return r=d,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,m){let g=h.clippingPlanes,v=h.clipIntersection,p=h.clipShadows,f=n.get(h);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{let M=s?0:i,y=M*4,x=f.clippingState||null;l.value=x,x=u(g,d,y,m);for(let A=0;A!==y;++A)x[A]=t[A];f.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,m,g){let v=h!==null?h.length:0,p=null;if(v!==0){if(p=l.value,g!==!0||p===null){let f=m+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<f)&&(p=new Float32Array(f));for(let y=0,x=m;y!==v;++y,x+=4)o.copy(h[y]).applyMatrix4(M,a),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function a_(n){let e=new WeakMap;function t(o,a){return a===nl?o.mapping=er:a===il&&(o.mapping=tr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===nl||a===il)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new hl(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var ar=class extends oo{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},$i=4,hh=[.125,.215,.35,.446,.526,.582],mi=20,Ha=new ar,fh=new Ne,Ga=null,Wa=0,ja=0,Xa=!1,di=(1+Math.sqrt(5))/2,Wi=1/di,dh=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,di,Wi),new L(0,di,-Wi),new L(Wi,0,di),new L(-Wi,0,di),new L(di,Wi,0),new L(-di,Wi,0)],co=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ga,Wa,ja),this._renderer.xr.enabled=Xa,e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===er||e.mapping===tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:ir,format:vn,colorSpace:Jn,depthBuffer:!1},r=ph(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ph(e,t,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=l_(s)),this._blurMaterial=c_(s,e,t)}return r}_compileMaterial(e){let t=new Mt(this._lodPlanes[0],e);this._renderer.compile(t,Ha)}_sceneToCubeUV(e,t,i,r){let a=new Dt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(fh),u.toneMapping=Yn,u.autoClear=!1;let m=new sr({name:"PMREM.Background",side:At,depthWrite:!1,depthTest:!1}),g=new Mt(new Vr,m),v=!1,p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,v=!0):(m.color.copy(fh),v=!0);for(let f=0;f<6;f++){let M=f%3;M===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):M===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));let y=this._cubeSize;Hs(r,M*y,f>2?y:0,y,y),u.setRenderTarget(r),v&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===er||e.mapping===tr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mh());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Mt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Hs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Ha)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=dh[(r-1)%dh.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Mt(this._lodPlanes[r],c),d=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*mi-1),v=s/g,p=isFinite(s)?1+Math.floor(u*v):mi;p>mi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);let f=[],M=0;for(let T=0;T<mi;++T){let R=T/v,S=Math.exp(-R*R/2);f.push(S),T===0?M+=S:T<p&&(M+=2*S)}for(let T=0;T<f.length;T++)f[T]=f[T]/M;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-i;let x=this._sizeLods[r],A=3*x*(r>y-$i?r-y+$i:0),w=4*(this._cubeSize-x);Hs(t,A,w,3*x,2*x),l.setRenderTarget(t),l.render(h,Ha)}};function l_(n){let e=[],t=[],i=[],r=n,s=n-$i+1+hh.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>n-$i?l=hh[o-n+$i-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,v=3,p=2,f=1,M=new Float32Array(v*g*m),y=new Float32Array(p*g*m),x=new Float32Array(f*g*m);for(let w=0;w<m;w++){let T=w%3*2/3-1,R=w>2?0:-1,S=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];M.set(S,v*g*w),y.set(d,p*g*w);let b=[w,w,w,w,w,w];x.set(b,f*g*w)}let A=new Ct;A.setAttribute("position",new Nt(M,v)),A.setAttribute("uv",new Nt(y,p)),A.setAttribute("faceIndex",new Nt(x,f)),e.push(A),r>$i&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function ph(n,e,t){let i=new ln(n,e,t);return i.texture.mapping=Eo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function c_(n,e,t){let i=new Float32Array(mi),r=new L(0,1,0);return new qt({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function mh(){return new qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function gh(){return new qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Yl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function u_(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===nl||l===il,u=l===er||l===tr;if(c||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new co(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let m=a.image;return c&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new co(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function h_(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function f_(n,e,t,i){let r={},s=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let v=d.morphAttributes[g];for(let p=0,f=v.length;p<f;p++)e.remove(v[p])}d.removeEventListener("dispose",o),delete r[d.id];let m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let g in d)e.update(d[g],n.ARRAY_BUFFER);let m=h.morphAttributes;for(let g in m){let v=m[g];for(let p=0,f=v.length;p<f;p++)e.update(v[p],n.ARRAY_BUFFER)}}function c(h){let d=[],m=h.index,g=h.attributes.position,v=0;if(m!==null){let M=m.array;v=m.version;for(let y=0,x=M.length;y<x;y+=3){let A=M[y+0],w=M[y+1],T=M[y+2];d.push(A,w,w,T,T,A)}}else if(g!==void 0){let M=g.array;v=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){let A=y+0,w=y+1,T=y+2;d.push(A,w,w,T,T,A)}}else return;let p=new(nf(d)?so:ro)(d,1);p.version=v;let f=s.get(h);f&&e.remove(f),s.set(h,p)}function u(h){let d=s.get(h);if(d){let m=h.index;m!==null&&d.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function d_(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*o),t.update(d,i,1)}function c(h,d,m){m!==0&&(n.drawElementsInstanced(i,d,s,h*o,m),t.update(d,i,m))}function u(h,d,m){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let v=0;v<m;v++)this.render(h[v]/o,d[v]);else{g.multiDrawElementsWEBGL(i,d,0,s,h,0,m);let v=0;for(let p=0;p<m;p++)v+=d[p];t.update(v,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function p_(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function m_(n,e,t){let i=new WeakMap,r=new yt;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=i.get(a);if(d===void 0||d.count!==h){let S=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],y=0;m===!0&&(y=1),g===!0&&(y=2),v===!0&&(y=3);let x=a.attributes.position.count*y,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*A*4*h),T=new io(w,x,A,h);T.type=qn,T.needsUpdate=!0;let R=y*4;for(let b=0;b<h;b++){let U=p[b],B=f[b],D=M[b],I=x*A*4*b;for(let O=0;O<U.count;O++){let k=O*R;m===!0&&(r.fromBufferAttribute(U,O),w[I+k+0]=r.x,w[I+k+1]=r.y,w[I+k+2]=r.z,w[I+k+3]=0),g===!0&&(r.fromBufferAttribute(B,O),w[I+k+4]=r.x,w[I+k+5]=r.y,w[I+k+6]=r.z,w[I+k+7]=0),v===!0&&(r.fromBufferAttribute(D,O),w[I+k+8]=r.x,w[I+k+9]=r.y,w[I+k+10]=r.z,w[I+k+11]=D.itemSize===4?r.w:1)}}d={count:h,texture:T,size:new se(x,A)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];let g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function g_(n,e,t,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var uo=class extends Ut{constructor(e,t,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:Ji,u!==Ji&&u!==Fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ji&&(i=nr),i===void 0&&u===Fr&&(i=Zr),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:en,this.minFilter=l!==void 0?l:en,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},lf=new Ut,cf=new uo(1,1);cf.compareFunction=tf;var uf=new io,hf=new cl,ff=new ao,vh=[],yh=[],_h=new Float32Array(16),xh=new Float32Array(9),bh=new Float32Array(4);function dr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=vh[r];if(s===void 0&&(s=new Float32Array(r),vh[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function dt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function To(n,e){let t=yh[e];t===void 0&&(t=new Int32Array(e),yh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function v_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function y_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2fv(this.addr,e),dt(t,e)}}function __(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;n.uniform3fv(this.addr,e),dt(t,e)}}function x_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4fv(this.addr,e),dt(t,e)}}function b_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),dt(t,e)}else{if(ft(t,i))return;bh.set(i),n.uniformMatrix2fv(this.addr,!1,bh),dt(t,i)}}function M_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),dt(t,e)}else{if(ft(t,i))return;xh.set(i),n.uniformMatrix3fv(this.addr,!1,xh),dt(t,i)}}function S_(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),dt(t,e)}else{if(ft(t,i))return;_h.set(i),n.uniformMatrix4fv(this.addr,!1,_h),dt(t,i)}}function w_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function E_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2iv(this.addr,e),dt(t,e)}}function A_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3iv(this.addr,e),dt(t,e)}}function T_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4iv(this.addr,e),dt(t,e)}}function C_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function R_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2uiv(this.addr,e),dt(t,e)}}function P_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3uiv(this.addr,e),dt(t,e)}}function I_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4uiv(this.addr,e),dt(t,e)}}function L_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s=this.type===n.SAMPLER_2D_SHADOW?cf:lf;t.setTexture2D(e||s,r)}function O_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||hf,r)}function D_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ff,r)}function N_(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||uf,r)}function U_(n){switch(n){case 5126:return v_;case 35664:return y_;case 35665:return __;case 35666:return x_;case 35674:return b_;case 35675:return M_;case 35676:return S_;case 5124:case 35670:return w_;case 35667:case 35671:return E_;case 35668:case 35672:return A_;case 35669:case 35673:return T_;case 5125:return C_;case 36294:return R_;case 36295:return P_;case 36296:return I_;case 35678:case 36198:case 36298:case 36306:case 35682:return L_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return D_;case 36289:case 36303:case 36311:case 36292:return N_}}function F_(n,e){n.uniform1fv(this.addr,e)}function B_(n,e){let t=dr(e,this.size,2);n.uniform2fv(this.addr,t)}function k_(n,e){let t=dr(e,this.size,3);n.uniform3fv(this.addr,t)}function z_(n,e){let t=dr(e,this.size,4);n.uniform4fv(this.addr,t)}function V_(n,e){let t=dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function H_(n,e){let t=dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function G_(n,e){let t=dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function W_(n,e){n.uniform1iv(this.addr,e)}function j_(n,e){n.uniform2iv(this.addr,e)}function X_(n,e){n.uniform3iv(this.addr,e)}function q_(n,e){n.uniform4iv(this.addr,e)}function Y_(n,e){n.uniform1uiv(this.addr,e)}function $_(n,e){n.uniform2uiv(this.addr,e)}function Z_(n,e){n.uniform3uiv(this.addr,e)}function J_(n,e){n.uniform4uiv(this.addr,e)}function K_(n,e,t){let i=this.cache,r=e.length,s=To(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),dt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||lf,s[o])}function Q_(n,e,t){let i=this.cache,r=e.length,s=To(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),dt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||hf,s[o])}function ex(n,e,t){let i=this.cache,r=e.length,s=To(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),dt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ff,s[o])}function tx(n,e,t){let i=this.cache,r=e.length,s=To(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),dt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||uf,s[o])}function nx(n){switch(n){case 5126:return F_;case 35664:return B_;case 35665:return k_;case 35666:return z_;case 35674:return V_;case 35675:return H_;case 35676:return G_;case 5124:case 35670:return W_;case 35667:case 35671:return j_;case 35668:case 35672:return X_;case 35669:case 35673:return q_;case 5125:return Y_;case 36294:return $_;case 36295:return Z_;case 36296:return J_;case 35678:case 36198:case 36298:case 36306:case 35682:return K_;case 35679:case 36299:case 36307:return Q_;case 35680:case 36300:case 36308:case 36293:return ex;case 36289:case 36303:case 36311:case 36292:return tx}}var fl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=U_(t.type)}},dl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nx(t.type)}},pl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},qa=/(\w+)(\])?(\[|\.)?/g;function Mh(n,e){n.seq.push(e),n.map[e.id]=e}function ix(n,e,t){let i=n.name,r=i.length;for(qa.lastIndex=0;;){let s=qa.exec(i),o=qa.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Mh(t,c===void 0?new fl(a,n,e):new dl(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new pl(a),Mh(t,h)),t=h}}}var Qi=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);ix(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function Sh(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var rx=37297,sx=0;function ox(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function ax(n){let e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(n),i;switch(e===t?i="":e===eo&&t===Qs?i="LinearDisplayP3ToLinearSRGB":e===Qs&&t===eo&&(i="LinearSRGBToLinearDisplayP3"),n){case Jn:case Ao:return[i,"LinearTransferOETF"];case Bt:case jl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function wh(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+ox(n.getShaderSource(e),o)}else return r}function lx(n,e){let t=ax(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function cx(n,e){let t;switch(e){case hg:t="Linear";break;case fg:t="Reinhard";break;case dg:t="OptimizedCineon";break;case pg:t="ACESFilmic";break;case gg:t="AgX";break;case vg:t="Neutral";break;case mg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ux(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function hx(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function fx(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ir(n){return n!==""}function Eh(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ah(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var dx=/^[ \t]*#include +<([\w\d./]+)>/gm;function ml(n){return n.replace(dx,mx)}var px=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function mx(n,e){let t=Fe[e];if(t===void 0){let i=px.get(e);if(i!==void 0)t=Fe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ml(t)}var gx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Th(n){return n.replace(gx,vx)}function vx(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ch(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function yx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Wh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Fm?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Tn&&(e="SHADOWMAP_TYPE_VSM"),e}function _x(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case er:case tr:e="ENVMAP_TYPE_CUBE";break;case Eo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case tr:e="ENVMAP_MODE_REFRACTION";break}return e}function bx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wl:e="ENVMAP_BLENDING_MULTIPLY";break;case cg:e="ENVMAP_BLENDING_MIX";break;case ug:e="ENVMAP_BLENDING_ADD";break}return e}function Mx(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Sx(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=yx(t),c=_x(t),u=xx(t),h=bx(t),d=Mx(t),m=ux(t),g=hx(s),v=r.createProgram(),p,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),f.length>0&&(f+=`
`)):(p=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),f=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Yn?cx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,lx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),o=ml(o),o=Eh(o,t),o=Ah(o,t),a=ml(a),a=Eh(a,t),a=Ah(a,t),o=Th(o),a=Th(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let y=M+p+o,x=M+f+a,A=Sh(r,r.VERTEX_SHADER,y),w=Sh(r,r.FRAGMENT_SHADER,x);r.attachShader(v,A),r.attachShader(v,w),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function T(U){if(n.debug.checkShaderErrors){let B=r.getProgramInfoLog(v).trim(),D=r.getShaderInfoLog(A).trim(),I=r.getShaderInfoLog(w).trim(),O=!0,k=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,A,w);else{let te=wh(r,A,"vertex"),W=wh(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+te+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(D===""||I==="")&&(k=!1);k&&(U.diagnostics={runnable:O,programLog:B,vertexShader:{log:D,prefix:p},fragmentShader:{log:I,prefix:f}})}r.deleteShader(A),r.deleteShader(w),R=new Qi(r,v),S=fx(r,v)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(v,rx)),b},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=w,this}var wx=0,gl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new vl(e),t.set(e,i)),i}},vl=class{constructor(e){this.id=wx++,this.code=e,this.usedTimes=0}};function Ex(n,e,t,i,r,s,o){let a=new zr,l=new gl,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures,m=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,b,U,B,D){let I=B.fog,O=D.geometry,k=S.isMeshStandardMaterial?B.environment:null,te=(S.isMeshStandardMaterial?t:e).get(S.envMap||k),W=te&&te.mapping===Eo?te.image.height:null,ie=g[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));let G=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Q=G!==void 0?G.length:0,le=0;O.morphAttributes.position!==void 0&&(le=1),O.morphAttributes.normal!==void 0&&(le=2),O.morphAttributes.color!==void 0&&(le=3);let xe,z,V,J;if(ie){let pt=gn[ie];xe=pt.vertexShader,z=pt.fragmentShader}else xe=S.vertexShader,z=S.fragmentShader,l.update(S),V=l.getVertexShaderID(S),J=l.getFragmentShaderID(S);let N=n.getRenderTarget(),Z=D.isInstancedMesh===!0,ae=D.isBatchedMesh===!0,fe=!!S.map,F=!!S.matcap,ge=!!te,Se=!!S.aoMap,Ve=!!S.lightMap,we=!!S.bumpMap,ke=!!S.normalMap,P=!!S.displacementMap,E=!!S.emissiveMap,$=!!S.metalnessMap,ee=!!S.roughnessMap,ne=S.anisotropy>0,re=S.clearcoat>0,Ae=S.iridescence>0,oe=S.sheen>0,Ee=S.transmission>0,Te=ne&&!!S.anisotropyMap,ue=re&&!!S.clearcoatMap,pe=re&&!!S.clearcoatNormalMap,Pe=re&&!!S.clearcoatRoughnessMap,ve=Ae&&!!S.iridescenceMap,ye=Ae&&!!S.iridescenceThicknessMap,He=oe&&!!S.sheenColorMap,Ge=oe&&!!S.sheenRoughnessMap,qe=!!S.specularMap,Xe=!!S.specularColorMap,Ye=!!S.specularIntensityMap,be=Ee&&!!S.transmissionMap,_=Ee&&!!S.thicknessMap,j=!!S.gradientMap,K=!!S.alphaMap,ce=S.alphaTest>0,me=!!S.alphaHash,We=!!S.extensions,ze=Yn;S.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ze=n.toneMapping);let tt={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:xe,fragmentShader:z,defines:S.defines,customVertexShaderID:V,customFragmentShaderID:J,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:ae,instancing:Z,instancingColor:Z&&D.instanceColor!==null,instancingMorph:Z&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:N===null?n.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Jn,alphaToCoverage:!!S.alphaToCoverage,map:fe,matcap:F,envMap:ge,envMapMode:ge&&te.mapping,envMapCubeUVHeight:W,aoMap:Se,lightMap:Ve,bumpMap:we,normalMap:ke,displacementMap:d&&P,emissiveMap:E,normalMapObjectSpace:ke&&S.normalMapType===Ig,normalMapTangentSpace:ke&&S.normalMapType===ef,metalnessMap:$,roughnessMap:ee,anisotropy:ne,anisotropyMap:Te,clearcoat:re,clearcoatMap:ue,clearcoatNormalMap:pe,clearcoatRoughnessMap:Pe,iridescence:Ae,iridescenceMap:ve,iridescenceThicknessMap:ye,sheen:oe,sheenColorMap:He,sheenRoughnessMap:Ge,specularMap:qe,specularColorMap:Xe,specularIntensityMap:Ye,transmission:Ee,transmissionMap:be,thicknessMap:_,gradientMap:j,opaque:S.transparent===!1&&S.blending===Zi&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:ce,alphaHash:me,combine:S.combine,mapUv:fe&&v(S.map.channel),aoMapUv:Se&&v(S.aoMap.channel),lightMapUv:Ve&&v(S.lightMap.channel),bumpMapUv:we&&v(S.bumpMap.channel),normalMapUv:ke&&v(S.normalMap.channel),displacementMapUv:P&&v(S.displacementMap.channel),emissiveMapUv:E&&v(S.emissiveMap.channel),metalnessMapUv:$&&v(S.metalnessMap.channel),roughnessMapUv:ee&&v(S.roughnessMap.channel),anisotropyMapUv:Te&&v(S.anisotropyMap.channel),clearcoatMapUv:ue&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:pe&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:He&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&v(S.sheenRoughnessMap.channel),specularMapUv:qe&&v(S.specularMap.channel),specularColorMapUv:Xe&&v(S.specularColorMap.channel),specularIntensityMapUv:Ye&&v(S.specularIntensityMap.channel),transmissionMapUv:be&&v(S.transmissionMap.channel),thicknessMapUv:_&&v(S.thicknessMap.channel),alphaMapUv:K&&v(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ke||ne),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!O.attributes.uv&&(fe||K),fog:!!I,useFog:S.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:D.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:le,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,useLegacyLights:n._useLegacyLights,decodeVideoTexture:fe&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===et,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Cn,flipSided:S.side===At,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:We&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:We&&S.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return tt.vertexUv1s=c.has(1),tt.vertexUv2s=c.has(2),tt.vertexUv3s=c.has(3),c.clear(),tt}function f(S){let b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(let U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(M(b,S),y(b,S),b.push(n.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.alphaToCoverage&&a.enable(20),S.push(a.mask)}function x(S){let b=g[S.type],U;if(b){let B=gn[b];U=ql.clone(B.uniforms)}else U=S.uniforms;return U}function A(S,b){let U;for(let B=0,D=u.length;B<D;B++){let I=u[B];if(I.cacheKey===b){U=I,++U.usedTimes;break}}return U===void 0&&(U=new Sx(n,b,S,s),u.push(U)),U}function w(S){if(--S.usedTimes===0){let b=u.indexOf(S);u[b]=u[u.length-1],u.pop(),S.destroy()}}function T(S){l.remove(S)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:x,acquireProgram:A,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:R}}function Ax(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Tx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Rh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ph(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,d,m,g,v,p){let f=n[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:m,groupOrder:g,renderOrder:h.renderOrder,z:v,group:p},n[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=m,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=p),e++,f}function a(h,d,m,g,v,p){let f=o(h,d,m,g,v,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):t.push(f)}function l(h,d,m,g,v,p){let f=o(h,d,m,g,v,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):t.unshift(f)}function c(h,d){t.length>1&&t.sort(h||Tx),i.length>1&&i.sort(d||Rh),r.length>1&&r.sort(d||Rh)}function u(){for(let h=e,d=n.length;h<d;h++){let m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Cx(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Ph,n.set(i,[o])):r>=s.length?(o=new Ph,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Rx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ne};break;case"SpotLight":t={position:new L,direction:new L,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function Px(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var Ix=0;function Lx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Ox(n){let e=new Rx,t=Px(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let r=new L,s=new Qe,o=new Qe;function a(c,u){let h=0,d=0,m=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let g=0,v=0,p=0,f=0,M=0,y=0,x=0,A=0,w=0,T=0,R=0;c.sort(Lx);let S=u===!0?Math.PI:1;for(let U=0,B=c.length;U<B;U++){let D=c[U],I=D.color,O=D.intensity,k=D.distance,te=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=I.r*O*S,d+=I.g*O*S,m+=I.b*O*S;else if(D.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(D.sh.coefficients[W],O);R++}else if(D.isDirectionalLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity*S),D.castShadow){let ie=D.shadow,G=t.get(D);G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,i.directionalShadow[g]=G,i.directionalShadowMap[g]=te,i.directionalShadowMatrix[g]=D.shadow.matrix,y++}i.directional[g]=W,g++}else if(D.isSpotLight){let W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(I).multiplyScalar(O*S),W.distance=k,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,i.spot[p]=W;let ie=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,ie.updateMatrices(D),D.castShadow&&T++),i.spotLightMatrix[p]=ie.matrix,D.castShadow){let G=t.get(D);G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,i.spotShadow[p]=G,i.spotShadowMap[p]=te,A++}p++}else if(D.isRectAreaLight){let W=e.get(D);W.color.copy(I).multiplyScalar(O),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),i.rectArea[f]=W,f++}else if(D.isPointLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity*S),W.distance=D.distance,W.decay=D.decay,D.castShadow){let ie=D.shadow,G=t.get(D);G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,G.shadowCameraNear=ie.camera.near,G.shadowCameraFar=ie.camera.far,i.pointShadow[v]=G,i.pointShadowMap[v]=te,i.pointShadowMatrix[v]=D.shadow.matrix,x++}i.point[v]=W,v++}else if(D.isHemisphereLight){let W=e.get(D);W.skyColor.copy(D.color).multiplyScalar(O*S),W.groundColor.copy(D.groundColor).multiplyScalar(O*S),i.hemi[M]=W,M++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=m;let b=i.hash;(b.directionalLength!==g||b.pointLength!==v||b.spotLength!==p||b.rectAreaLength!==f||b.hemiLength!==M||b.numDirectionalShadows!==y||b.numPointShadows!==x||b.numSpotShadows!==A||b.numSpotMaps!==w||b.numLightProbes!==R)&&(i.directional.length=g,i.spot.length=p,i.rectArea.length=f,i.point.length=v,i.hemi.length=M,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=A+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,b.directionalLength=g,b.pointLength=v,b.spotLength=p,b.rectAreaLength=f,b.hemiLength=M,b.numDirectionalShadows=y,b.numPointShadows=x,b.numSpotShadows=A,b.numSpotMaps=w,b.numLightProbes=R,i.version=Ix++)}function l(c,u){let h=0,d=0,m=0,g=0,v=0,p=u.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){let y=c[f];if(y.isDirectionalLight){let x=i.directional[h];x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),h++}else if(y.isSpotLight){let x=i.spot[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),m++}else if(y.isRectAreaLight){let x=i.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),o.identity(),s.copy(y.matrixWorld),s.premultiply(p),o.extractRotation(s),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let x=i.point[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){let x=i.hemi[v];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:i}}function Ih(n){let e=new Ox(n),t=[],i=[];function r(){t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(u){e.setup(t,u)}function l(u){e.setupView(t,u)}return{init:r,state:{lightsArray:t,shadowsArray:i,lights:e,transmissionRenderTarget:null},setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Dx(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Ih(n),e.set(r,[a])):s>=o.length?(a=new Ih(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var yl=class extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_l=class extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ux=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Fx(n,e,t){let i=new Hr,r=new se,s=new se,o=new yt,a=new yl({depthPacking:Pg}),l=new _l,c={},u=t.maxTextureSize,h={[Zn]:At,[At]:Zn,[Cn]:Cn},d=new qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:Nx,fragmentShader:Ux}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let g=new Ct;g.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Mt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wh;let f=this.type;this.render=function(w,T,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;let S=n.getRenderTarget(),b=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),B=n.state;B.setBlending(yn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let D=f!==Tn&&this.type===Tn,I=f===Tn&&this.type!==Tn;for(let O=0,k=w.length;O<k;O++){let te=w[O],W=te.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let ie=W.getFrameExtents();if(r.multiply(ie),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,W.mapSize.y=s.y)),W.map===null||D===!0||I===!0){let Q=this.type!==Tn?{minFilter:en,magFilter:en}:{};W.map!==null&&W.map.dispose(),W.map=new ln(r.x,r.y,Q),W.map.texture.name=te.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let G=W.getViewportCount();for(let Q=0;Q<G;Q++){let le=W.getViewport(Q);o.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),B.viewport(o),W.updateMatrices(te,Q),i=W.getFrustum(),x(T,R,W.camera,te,this.type)}W.isPointLightShadow!==!0&&this.type===Tn&&M(W,R),W.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(S,b,U)};function M(w,T){let R=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ln(r.x,r.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(T,null,R,d,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(T,null,R,m,v,null)}function y(w,T,R,S){let b=null,U=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)b=U;else if(b=R.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let B=b.uuid,D=T.uuid,I=c[B];I===void 0&&(I={},c[B]=I);let O=I[D];O===void 0&&(O=b.clone(),I[D]=O,T.addEventListener("dispose",A)),b=O}if(b.visible=T.visible,b.wireframe=T.wireframe,S===Tn?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:h[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let B=n.properties.get(b);B.light=R}return b}function x(w,T,R,S,b){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Tn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let D=e.update(w),I=w.material;if(Array.isArray(I)){let O=D.groups;for(let k=0,te=O.length;k<te;k++){let W=O[k],ie=I[W.materialIndex];if(ie&&ie.visible){let G=y(w,ie,S,b);w.onBeforeShadow(n,w,T,R,D,G,W),n.renderBufferDirect(R,null,D,G,w,W),w.onAfterShadow(n,w,T,R,D,G,W)}}}else if(I.visible){let O=y(w,I,S,b);w.onBeforeShadow(n,w,T,R,D,O,null),n.renderBufferDirect(R,null,D,O,w,null),w.onAfterShadow(n,w,T,R,D,O,null)}}let B=w.children;for(let D=0,I=B.length;D<I;D++)x(B[D],T,R,S,b)}function A(w){w.target.removeEventListener("dispose",A);for(let R in c){let S=c[R],b=w.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function Bx(n){function e(){let _=!1,j=new yt,K=null,ce=new yt(0,0,0,0);return{setMask:function(me){K!==me&&!_&&(n.colorMask(me,me,me,me),K=me)},setLocked:function(me){_=me},setClear:function(me,We,ze,tt,pt){pt===!0&&(me*=tt,We*=tt,ze*=tt),j.set(me,We,ze,tt),ce.equals(j)===!1&&(n.clearColor(me,We,ze,tt),ce.copy(j))},reset:function(){_=!1,K=null,ce.set(-1,0,0,0)}}}function t(){let _=!1,j=null,K=null,ce=null;return{setTest:function(me){me?J(n.DEPTH_TEST):N(n.DEPTH_TEST)},setMask:function(me){j!==me&&!_&&(n.depthMask(me),j=me)},setFunc:function(me){if(K!==me){switch(me){case ng:n.depthFunc(n.NEVER);break;case ig:n.depthFunc(n.ALWAYS);break;case rg:n.depthFunc(n.LESS);break;case $s:n.depthFunc(n.LEQUAL);break;case sg:n.depthFunc(n.EQUAL);break;case og:n.depthFunc(n.GEQUAL);break;case ag:n.depthFunc(n.GREATER);break;case lg:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=me}},setLocked:function(me){_=me},setClear:function(me){ce!==me&&(n.clearDepth(me),ce=me)},reset:function(){_=!1,j=null,K=null,ce=null}}}function i(){let _=!1,j=null,K=null,ce=null,me=null,We=null,ze=null,tt=null,pt=null;return{setTest:function(Je){_||(Je?J(n.STENCIL_TEST):N(n.STENCIL_TEST))},setMask:function(Je){j!==Je&&!_&&(n.stencilMask(Je),j=Je)},setFunc:function(Je,ct,ut){(K!==Je||ce!==ct||me!==ut)&&(n.stencilFunc(Je,ct,ut),K=Je,ce=ct,me=ut)},setOp:function(Je,ct,ut){(We!==Je||ze!==ct||tt!==ut)&&(n.stencilOp(Je,ct,ut),We=Je,ze=ct,tt=ut)},setLocked:function(Je){_=Je},setClear:function(Je){pt!==Je&&(n.clearStencil(Je),pt=Je)},reset:function(){_=!1,j=null,K=null,ce=null,me=null,We=null,ze=null,tt=null,pt=null}}}let r=new e,s=new t,o=new i,a=new WeakMap,l=new WeakMap,c={},u={},h=new WeakMap,d=[],m=null,g=!1,v=null,p=null,f=null,M=null,y=null,x=null,A=null,w=new Ne(0,0,0),T=0,R=!1,S=null,b=null,U=null,B=null,D=null,I=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,k=0,te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(te)[1]),O=k>=1):te.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),O=k>=2);let W=null,ie={},G=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),le=new yt().fromArray(G),xe=new yt().fromArray(Q);function z(_,j,K,ce){let me=new Uint8Array(4),We=n.createTexture();n.bindTexture(_,We),n.texParameteri(_,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(_,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<K;ze++)_===n.TEXTURE_3D||_===n.TEXTURE_2D_ARRAY?n.texImage3D(j,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(j+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return We}let V={};V[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),V[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),V[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),J(n.DEPTH_TEST),s.setFunc($s),we(!1),ke(hu),J(n.CULL_FACE),Se(yn);function J(_){c[_]!==!0&&(n.enable(_),c[_]=!0)}function N(_){c[_]!==!1&&(n.disable(_),c[_]=!1)}function Z(_,j){return u[_]!==j?(n.bindFramebuffer(_,j),u[_]=j,_===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=j),_===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=j),!0):!1}function ae(_,j){let K=d,ce=!1;if(_){K=h.get(j),K===void 0&&(K=[],h.set(j,K));let me=_.textures;if(K.length!==me.length||K[0]!==n.COLOR_ATTACHMENT0){for(let We=0,ze=me.length;We<ze;We++)K[We]=n.COLOR_ATTACHMENT0+We;K.length=me.length,ce=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,ce=!0);ce&&n.drawBuffers(K)}function fe(_){return m!==_?(n.useProgram(_),m=_,!0):!1}let F={[pi]:n.FUNC_ADD,[km]:n.FUNC_SUBTRACT,[zm]:n.FUNC_REVERSE_SUBTRACT};F[Vm]=n.MIN,F[Hm]=n.MAX;let ge={[Gm]:n.ZERO,[Wm]:n.ONE,[jm]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[Jm]:n.SRC_ALPHA_SATURATE,[$m]:n.DST_COLOR,[qm]:n.DST_ALPHA,[Xm]:n.ONE_MINUS_SRC_COLOR,[tl]:n.ONE_MINUS_SRC_ALPHA,[Zm]:n.ONE_MINUS_DST_COLOR,[Ym]:n.ONE_MINUS_DST_ALPHA,[Km]:n.CONSTANT_COLOR,[Qm]:n.ONE_MINUS_CONSTANT_COLOR,[eg]:n.CONSTANT_ALPHA,[tg]:n.ONE_MINUS_CONSTANT_ALPHA};function Se(_,j,K,ce,me,We,ze,tt,pt,Je){if(_===yn){g===!0&&(N(n.BLEND),g=!1);return}if(g===!1&&(J(n.BLEND),g=!0),_!==Bm){if(_!==v||Je!==R){if((p!==pi||y!==pi)&&(n.blendEquation(n.FUNC_ADD),p=pi,y=pi),Je)switch(_){case Zi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fu:n.blendFunc(n.ONE,n.ONE);break;case du:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",_);break}else switch(_){case Zi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case du:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",_);break}f=null,M=null,x=null,A=null,w.set(0,0,0),T=0,v=_,R=Je}return}me=me||j,We=We||K,ze=ze||ce,(j!==p||me!==y)&&(n.blendEquationSeparate(F[j],F[me]),p=j,y=me),(K!==f||ce!==M||We!==x||ze!==A)&&(n.blendFuncSeparate(ge[K],ge[ce],ge[We],ge[ze]),f=K,M=ce,x=We,A=ze),(tt.equals(w)===!1||pt!==T)&&(n.blendColor(tt.r,tt.g,tt.b,pt),w.copy(tt),T=pt),v=_,R=!1}function Ve(_,j){_.side===Cn?N(n.CULL_FACE):J(n.CULL_FACE);let K=_.side===At;j&&(K=!K),we(K),_.blending===Zi&&_.transparent===!1?Se(yn):Se(_.blending,_.blendEquation,_.blendSrc,_.blendDst,_.blendEquationAlpha,_.blendSrcAlpha,_.blendDstAlpha,_.blendColor,_.blendAlpha,_.premultipliedAlpha),s.setFunc(_.depthFunc),s.setTest(_.depthTest),s.setMask(_.depthWrite),r.setMask(_.colorWrite);let ce=_.stencilWrite;o.setTest(ce),ce&&(o.setMask(_.stencilWriteMask),o.setFunc(_.stencilFunc,_.stencilRef,_.stencilFuncMask),o.setOp(_.stencilFail,_.stencilZFail,_.stencilZPass)),E(_.polygonOffset,_.polygonOffsetFactor,_.polygonOffsetUnits),_.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):N(n.SAMPLE_ALPHA_TO_COVERAGE)}function we(_){S!==_&&(_?n.frontFace(n.CW):n.frontFace(n.CCW),S=_)}function ke(_){_!==Nm?(J(n.CULL_FACE),_!==b&&(_===hu?n.cullFace(n.BACK):_===Um?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):N(n.CULL_FACE),b=_}function P(_){_!==U&&(O&&n.lineWidth(_),U=_)}function E(_,j,K){_?(J(n.POLYGON_OFFSET_FILL),(B!==j||D!==K)&&(n.polygonOffset(j,K),B=j,D=K)):N(n.POLYGON_OFFSET_FILL)}function $(_){_?J(n.SCISSOR_TEST):N(n.SCISSOR_TEST)}function ee(_){_===void 0&&(_=n.TEXTURE0+I-1),W!==_&&(n.activeTexture(_),W=_)}function ne(_,j,K){K===void 0&&(W===null?K=n.TEXTURE0+I-1:K=W);let ce=ie[K];ce===void 0&&(ce={type:void 0,texture:void 0},ie[K]=ce),(ce.type!==_||ce.texture!==j)&&(W!==K&&(n.activeTexture(K),W=K),n.bindTexture(_,j||V[_]),ce.type=_,ce.texture=j)}function re(){let _=ie[W];_!==void 0&&_.type!==void 0&&(n.bindTexture(_.type,null),_.type=void 0,_.texture=void 0)}function Ae(){try{n.compressedTexImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function oe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Ee(){try{n.texSubImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Te(){try{n.texSubImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function ue(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function pe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Pe(){try{n.texStorage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function ve(){try{n.texStorage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function ye(){try{n.texImage2D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function He(){try{n.texImage3D.apply(n,arguments)}catch(_){console.error("THREE.WebGLState:",_)}}function Ge(_){le.equals(_)===!1&&(n.scissor(_.x,_.y,_.z,_.w),le.copy(_))}function qe(_){xe.equals(_)===!1&&(n.viewport(_.x,_.y,_.z,_.w),xe.copy(_))}function Xe(_,j){let K=l.get(j);K===void 0&&(K=new WeakMap,l.set(j,K));let ce=K.get(_);ce===void 0&&(ce=n.getUniformBlockIndex(j,_.name),K.set(_,ce))}function Ye(_,j){let ce=l.get(j).get(_);a.get(j)!==ce&&(n.uniformBlockBinding(j,ce,_.__bindingPointIndex),a.set(j,ce))}function be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},W=null,ie={},u={},h=new WeakMap,d=[],m=null,g=!1,v=null,p=null,f=null,M=null,y=null,x=null,A=null,w=new Ne(0,0,0),T=0,R=!1,S=null,b=null,U=null,B=null,D=null,le.set(0,0,n.canvas.width,n.canvas.height),xe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:J,disable:N,bindFramebuffer:Z,drawBuffers:ae,useProgram:fe,setBlending:Se,setMaterial:Ve,setFlipSided:we,setCullFace:ke,setLineWidth:P,setPolygonOffset:E,setScissorTest:$,activeTexture:ee,bindTexture:ne,unbindTexture:re,compressedTexImage2D:Ae,compressedTexImage3D:oe,texImage2D:ye,texImage3D:He,updateUBOMapping:Xe,uniformBlockBinding:Ye,texStorage2D:Pe,texStorage3D:ve,texSubImage2D:Ee,texSubImage3D:Te,compressedTexSubImage2D:ue,compressedTexSubImage3D:pe,scissor:Ge,viewport:qe,reset:be}}function kx(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new se,u=new WeakMap,h,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,E){return m?new OffscreenCanvas(P,E):kr("canvas")}function v(P,E,$){let ee=1,ne=ke(P);if((ne.width>$||ne.height>$)&&(ee=$/Math.max(ne.width,ne.height)),ee<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let re=Math.floor(ee*ne.width),Ae=Math.floor(ee*ne.height);h===void 0&&(h=g(re,Ae));let oe=E?g(re,Ae):h;return oe.width=re,oe.height=Ae,oe.getContext("2d").drawImage(P,0,0,re,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+re+"x"+Ae+")."),oe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),P;return P}function p(P){return P.generateMipmaps&&P.minFilter!==en&&P.minFilter!==Xt}function f(P){n.generateMipmap(P)}function M(P,E,$,ee,ne=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let re=E;if(E===n.RED&&($===n.FLOAT&&(re=n.R32F),$===n.HALF_FLOAT&&(re=n.R16F),$===n.UNSIGNED_BYTE&&(re=n.R8)),E===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(re=n.R8UI),$===n.UNSIGNED_SHORT&&(re=n.R16UI),$===n.UNSIGNED_INT&&(re=n.R32UI),$===n.BYTE&&(re=n.R8I),$===n.SHORT&&(re=n.R16I),$===n.INT&&(re=n.R32I)),E===n.RG&&($===n.FLOAT&&(re=n.RG32F),$===n.HALF_FLOAT&&(re=n.RG16F),$===n.UNSIGNED_BYTE&&(re=n.RG8)),E===n.RG_INTEGER&&($===n.UNSIGNED_BYTE&&(re=n.RG8UI),$===n.UNSIGNED_SHORT&&(re=n.RG16UI),$===n.UNSIGNED_INT&&(re=n.RG32UI),$===n.BYTE&&(re=n.RG8I),$===n.SHORT&&(re=n.RG16I),$===n.INT&&(re=n.RG32I)),E===n.RGB&&$===n.UNSIGNED_INT_5_9_9_9_REV&&(re=n.RGB9_E5),E===n.RGBA){let Ae=ne?Ks:Ke.getTransfer(ee);$===n.FLOAT&&(re=n.RGBA32F),$===n.HALF_FLOAT&&(re=n.RGBA16F),$===n.UNSIGNED_BYTE&&(re=Ae===et?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function y(P,E){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==en&&P.minFilter!==Xt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function x(P){let E=P.target;E.removeEventListener("dispose",x),w(E),E.isVideoTexture&&u.delete(E)}function A(P){let E=P.target;E.removeEventListener("dispose",A),R(E)}function w(P){let E=i.get(P);if(E.__webglInit===void 0)return;let $=P.source,ee=d.get($);if(ee){let ne=ee[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&T(P),Object.keys(ee).length===0&&d.delete($)}i.remove(P)}function T(P){let E=i.get(P);n.deleteTexture(E.__webglTexture);let $=P.source,ee=d.get($);delete ee[E.__cacheKey],o.memory.textures--}function R(P){let E=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(E.__webglFramebuffer[ee]))for(let ne=0;ne<E.__webglFramebuffer[ee].length;ne++)n.deleteFramebuffer(E.__webglFramebuffer[ee][ne]);else n.deleteFramebuffer(E.__webglFramebuffer[ee]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[ee])}else{if(Array.isArray(E.__webglFramebuffer))for(let ee=0;ee<E.__webglFramebuffer.length;ee++)n.deleteFramebuffer(E.__webglFramebuffer[ee]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ee=0;ee<E.__webglColorRenderbuffer.length;ee++)E.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[ee]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let $=P.textures;for(let ee=0,ne=$.length;ee<ne;ee++){let re=i.get($[ee]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),o.memory.textures--),i.remove($[ee])}i.remove(P)}let S=0;function b(){S=0}function U(){let P=S;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),S+=1,P}function B(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function D(P,E){let $=i.get(P);if(P.isVideoTexture&&Ve(P),P.isRenderTargetTexture===!1&&P.version>0&&$.__version!==P.version){let ee=P.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le($,P,E);return}}t.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+E)}function I(P,E){let $=i.get(P);if(P.version>0&&$.__version!==P.version){le($,P,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+E)}function O(P,E){let $=i.get(P);if(P.version>0&&$.__version!==P.version){le($,P,E);return}t.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+E)}function k(P,E){let $=i.get(P);if(P.version>0&&$.__version!==P.version){xe($,P,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+E)}let te={[rl]:n.REPEAT,[gi]:n.CLAMP_TO_EDGE,[sl]:n.MIRRORED_REPEAT},W={[en]:n.NEAREST,[yg]:n.NEAREST_MIPMAP_NEAREST,[bs]:n.NEAREST_MIPMAP_LINEAR,[Xt]:n.LINEAR,[va]:n.LINEAR_MIPMAP_NEAREST,[vi]:n.LINEAR_MIPMAP_LINEAR},ie={[Lg]:n.NEVER,[Bg]:n.ALWAYS,[Og]:n.LESS,[tf]:n.LEQUAL,[Dg]:n.EQUAL,[Fg]:n.GEQUAL,[Ng]:n.GREATER,[Ug]:n.NOTEQUAL};function G(P,E){if(E.type===qn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Xt||E.magFilter===va||E.magFilter===bs||E.magFilter===vi||E.minFilter===Xt||E.minFilter===va||E.minFilter===bs||E.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,te[E.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,te[E.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,te[E.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,W[E.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,W[E.minFilter]),E.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,ie[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===en||E.minFilter!==bs&&E.minFilter!==vi||E.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){let $=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Q(P,E){let $=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",x));let ee=E.source,ne=d.get(ee);ne===void 0&&(ne={},d.set(ee,ne));let re=B(E);if(re!==P.__cacheKey){ne[re]===void 0&&(ne[re]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,$=!0),ne[re].usedTimes++;let Ae=ne[P.__cacheKey];Ae!==void 0&&(ne[P.__cacheKey].usedTimes--,Ae.usedTimes===0&&T(E)),P.__cacheKey=re,P.__webglTexture=ne[re].texture}return $}function le(P,E,$){let ee=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ee=n.TEXTURE_3D);let ne=Q(P,E),re=E.source;t.bindTexture(ee,P.__webglTexture,n.TEXTURE0+$);let Ae=i.get(re);if(re.version!==Ae.__version||ne===!0){t.activeTexture(n.TEXTURE0+$);let oe=Ke.getPrimaries(Ke.workingColorSpace),Ee=E.colorSpace===Xn?null:Ke.getPrimaries(E.colorSpace),Te=E.colorSpace===Xn||oe===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let ue=v(E.image,!1,r.maxTextureSize);ue=we(E,ue);let pe=s.convert(E.format,E.colorSpace),Pe=s.convert(E.type),ve=M(E.internalFormat,pe,Pe,E.colorSpace,E.isVideoTexture);G(ee,E);let ye,He=E.mipmaps,Ge=E.isVideoTexture!==!0&&ve!==Qh,qe=Ae.__version===void 0||ne===!0,Xe=re.dataReady,Ye=y(E,ue);if(E.isDepthTexture)ve=n.DEPTH_COMPONENT16,E.type===qn?ve=n.DEPTH_COMPONENT32F:E.type===nr?ve=n.DEPTH_COMPONENT24:E.type===Zr&&(ve=n.DEPTH24_STENCIL8),qe&&(Ge?t.texStorage2D(n.TEXTURE_2D,1,ve,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,ve,ue.width,ue.height,0,pe,Pe,null));else if(E.isDataTexture)if(He.length>0){Ge&&qe&&t.texStorage2D(n.TEXTURE_2D,Ye,ve,He[0].width,He[0].height);for(let be=0,_=He.length;be<_;be++)ye=He[be],Ge?Xe&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,ye.width,ye.height,pe,Pe,ye.data):t.texImage2D(n.TEXTURE_2D,be,ve,ye.width,ye.height,0,pe,Pe,ye.data);E.generateMipmaps=!1}else Ge?(qe&&t.texStorage2D(n.TEXTURE_2D,Ye,ve,ue.width,ue.height),Xe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue.width,ue.height,pe,Pe,ue.data)):t.texImage2D(n.TEXTURE_2D,0,ve,ue.width,ue.height,0,pe,Pe,ue.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ge&&qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ye,ve,He[0].width,He[0].height,ue.depth);for(let be=0,_=He.length;be<_;be++)ye=He[be],E.format!==vn?pe!==null?Ge?Xe&&t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,ye.width,ye.height,ue.depth,pe,ye.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,be,ve,ye.width,ye.height,ue.depth,0,ye.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?Xe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,ye.width,ye.height,ue.depth,pe,Pe,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,be,ve,ye.width,ye.height,ue.depth,0,pe,Pe,ye.data)}else{Ge&&qe&&t.texStorage2D(n.TEXTURE_2D,Ye,ve,He[0].width,He[0].height);for(let be=0,_=He.length;be<_;be++)ye=He[be],E.format!==vn?pe!==null?Ge?Xe&&t.compressedTexSubImage2D(n.TEXTURE_2D,be,0,0,ye.width,ye.height,pe,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,be,ve,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?Xe&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,ye.width,ye.height,pe,Pe,ye.data):t.texImage2D(n.TEXTURE_2D,be,ve,ye.width,ye.height,0,pe,Pe,ye.data)}else if(E.isDataArrayTexture)Ge?(qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ye,ve,ue.width,ue.height,ue.depth),Xe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,pe,Pe,ue.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,ue.width,ue.height,ue.depth,0,pe,Pe,ue.data);else if(E.isData3DTexture)Ge?(qe&&t.texStorage3D(n.TEXTURE_3D,Ye,ve,ue.width,ue.height,ue.depth),Xe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,pe,Pe,ue.data)):t.texImage3D(n.TEXTURE_3D,0,ve,ue.width,ue.height,ue.depth,0,pe,Pe,ue.data);else if(E.isFramebufferTexture){if(qe)if(Ge)t.texStorage2D(n.TEXTURE_2D,Ye,ve,ue.width,ue.height);else{let be=ue.width,_=ue.height;for(let j=0;j<Ye;j++)t.texImage2D(n.TEXTURE_2D,j,ve,be,_,0,pe,Pe,null),be>>=1,_>>=1}}else if(He.length>0){if(Ge&&qe){let be=ke(He[0]);t.texStorage2D(n.TEXTURE_2D,Ye,ve,be.width,be.height)}for(let be=0,_=He.length;be<_;be++)ye=He[be],Ge?Xe&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,pe,Pe,ye):t.texImage2D(n.TEXTURE_2D,be,ve,pe,Pe,ye);E.generateMipmaps=!1}else if(Ge){if(qe){let be=ke(ue);t.texStorage2D(n.TEXTURE_2D,Ye,ve,be.width,be.height)}Xe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Pe,ue)}else t.texImage2D(n.TEXTURE_2D,0,ve,pe,Pe,ue);p(E)&&f(ee),Ae.__version=re.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function xe(P,E,$){if(E.image.length!==6)return;let ee=Q(P,E),ne=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+$);let re=i.get(ne);if(ne.version!==re.__version||ee===!0){t.activeTexture(n.TEXTURE0+$);let Ae=Ke.getPrimaries(Ke.workingColorSpace),oe=E.colorSpace===Xn?null:Ke.getPrimaries(E.colorSpace),Ee=E.colorSpace===Xn||Ae===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let Te=E.isCompressedTexture||E.image[0].isCompressedTexture,ue=E.image[0]&&E.image[0].isDataTexture,pe=[];for(let _=0;_<6;_++)!Te&&!ue?pe[_]=v(E.image[_],!0,r.maxCubemapSize):pe[_]=ue?E.image[_].image:E.image[_],pe[_]=we(E,pe[_]);let Pe=pe[0],ve=s.convert(E.format,E.colorSpace),ye=s.convert(E.type),He=M(E.internalFormat,ve,ye,E.colorSpace),Ge=E.isVideoTexture!==!0,qe=re.__version===void 0||ee===!0,Xe=ne.dataReady,Ye=y(E,Pe);G(n.TEXTURE_CUBE_MAP,E);let be;if(Te){Ge&&qe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ye,He,Pe.width,Pe.height);for(let _=0;_<6;_++){be=pe[_].mipmaps;for(let j=0;j<be.length;j++){let K=be[j];E.format!==vn?ve!==null?Ge?Xe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j,0,0,K.width,K.height,ve,K.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j,He,K.width,K.height,0,K.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?Xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j,0,0,K.width,K.height,ve,ye,K.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j,He,K.width,K.height,0,ve,ye,K.data)}}}else{if(be=E.mipmaps,Ge&&qe){be.length>0&&Ye++;let _=ke(pe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ye,He,_.width,_.height)}for(let _=0;_<6;_++)if(ue){Ge?Xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,0,0,pe[_].width,pe[_].height,ve,ye,pe[_].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,He,pe[_].width,pe[_].height,0,ve,ye,pe[_].data);for(let j=0;j<be.length;j++){let ce=be[j].image[_].image;Ge?Xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j+1,0,0,ce.width,ce.height,ve,ye,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j+1,He,ce.width,ce.height,0,ve,ye,ce.data)}}else{Ge?Xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,0,0,ve,ye,pe[_]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,0,He,ve,ye,pe[_]);for(let j=0;j<be.length;j++){let K=be[j];Ge?Xe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j+1,0,0,ve,ye,K.image[_]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_,j+1,He,ve,ye,K.image[_])}}}p(E)&&f(n.TEXTURE_CUBE_MAP),re.__version=ne.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function z(P,E,$,ee,ne,re){let Ae=s.convert($.format,$.colorSpace),oe=s.convert($.type),Ee=M($.internalFormat,Ae,oe,$.colorSpace);if(!i.get(E).__hasExternalTextures){let ue=Math.max(1,E.width>>re),pe=Math.max(1,E.height>>re);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,re,Ee,ue,pe,E.depth,0,Ae,oe,null):t.texImage2D(ne,re,Ee,ue,pe,0,Ae,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Se(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,ne,i.get($).__webglTexture,0,ge(E)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,ne,i.get($).__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function V(P,E,$){if(n.bindRenderbuffer(n.RENDERBUFFER,P),E.depthBuffer&&!E.stencilBuffer){let ee=n.DEPTH_COMPONENT24;if($||Se(E)){let ne=E.depthTexture;ne&&ne.isDepthTexture&&(ne.type===qn?ee=n.DEPTH_COMPONENT32F:ne.type===nr&&(ee=n.DEPTH_COMPONENT24));let re=ge(E);Se(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,ee,E.width,E.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,re,ee,E.width,E.height)}else n.renderbufferStorage(n.RENDERBUFFER,ee,E.width,E.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,P)}else if(E.depthBuffer&&E.stencilBuffer){let ee=ge(E);$&&Se(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,n.DEPTH24_STENCIL8,E.width,E.height):Se(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,n.DEPTH24_STENCIL8,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,P)}else{let ee=E.textures;for(let ne=0;ne<ee.length;ne++){let re=ee[ne],Ae=s.convert(re.format,re.colorSpace),oe=s.convert(re.type),Ee=M(re.internalFormat,Ae,oe,re.colorSpace),Te=ge(E);$&&Se(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,Ee,E.width,E.height):Se(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te,Ee,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Ee,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function J(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),D(E.depthTexture,0);let ee=i.get(E.depthTexture).__webglTexture,ne=ge(E);if(E.depthTexture.format===Ji)Se(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,ne):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(E.depthTexture.format===Fr)Se(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,ne):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function N(P){let E=i.get(P),$=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");J(E.__webglFramebuffer,P)}else if($){E.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[ee]),E.__webglDepthbuffer[ee]=n.createRenderbuffer(),V(E.__webglDepthbuffer[ee],P,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=n.createRenderbuffer(),V(E.__webglDepthbuffer,P,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Z(P,E,$){let ee=i.get(P);E!==void 0&&z(ee.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&N(P)}function ae(P){let E=P.texture,$=i.get(P),ee=i.get(E);P.addEventListener("dispose",A);let ne=P.textures,re=P.isWebGLCubeRenderTarget===!0,Ae=ne.length>1;if(Ae||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=E.version,o.memory.textures++),re){$.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[oe]=[];for(let Ee=0;Ee<E.mipmaps.length;Ee++)$.__webglFramebuffer[oe][Ee]=n.createFramebuffer()}else $.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let oe=0;oe<E.mipmaps.length;oe++)$.__webglFramebuffer[oe]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let oe=0,Ee=ne.length;oe<Ee;oe++){let Te=i.get(ne[oe]);Te.__webglTexture===void 0&&(Te.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Se(P)===!1){$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let oe=0;oe<ne.length;oe++){let Ee=ne[oe];$.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[oe]);let Te=s.convert(Ee.format,Ee.colorSpace),ue=s.convert(Ee.type),pe=M(Ee.internalFormat,Te,ue,Ee.colorSpace,P.isXRRenderTarget===!0),Pe=ge(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,pe,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,$.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),V($.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),G(n.TEXTURE_CUBE_MAP,E);for(let oe=0;oe<6;oe++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)z($.__webglFramebuffer[oe][Ee],P,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee);else z($.__webglFramebuffer[oe],P,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);p(E)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let oe=0,Ee=ne.length;oe<Ee;oe++){let Te=ne[oe],ue=i.get(Te);t.bindTexture(n.TEXTURE_2D,ue.__webglTexture),G(n.TEXTURE_2D,Te),z($.__webglFramebuffer,P,Te,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,0),p(Te)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(oe=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ee.__webglTexture),G(oe,E),E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)z($.__webglFramebuffer[Ee],P,E,n.COLOR_ATTACHMENT0,oe,Ee);else z($.__webglFramebuffer,P,E,n.COLOR_ATTACHMENT0,oe,0);p(E)&&f(oe),t.unbindTexture()}P.depthBuffer&&N(P)}function fe(P){let E=P.textures;for(let $=0,ee=E.length;$<ee;$++){let ne=E[$];if(p(ne)){let re=P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Ae=i.get(ne).__webglTexture;t.bindTexture(re,Ae),f(re),t.unbindTexture()}}}function F(P){if(P.samples>0&&Se(P)===!1){let E=P.textures,$=P.width,ee=P.height,ne=n.COLOR_BUFFER_BIT,re=[],Ae=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(P),Ee=E.length>1;if(Ee)for(let Te=0;Te<E.length;Te++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Te=0;Te<E.length;Te++){re.push(n.COLOR_ATTACHMENT0+Te),P.depthBuffer&&re.push(Ae);let ue=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(ue===!1&&(P.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&oe.__isTransmissionRenderTarget!==!0&&(ne|=n.STENCIL_BUFFER_BIT)),Ee&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[Te]),ue===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ae]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ae])),Ee){let pe=i.get(E[Te]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pe,0)}n.blitFramebuffer(0,0,$,ee,0,0,$,ee,ne,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,re)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Ee)for(let Te=0;Te<E.length;Te++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,oe.__webglColorRenderbuffer[Te]);let ue=i.get(E[Te]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function ge(P){return Math.min(r.maxSamples,P.samples)}function Se(P){let E=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ve(P){let E=o.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function we(P,E){let $=P.colorSpace,ee=P.format,ne=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||$!==Jn&&$!==Xn&&(Ke.getTransfer($)===et?(ee!==vn||ne!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}function ke(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=b,this.setTexture2D=D,this.setTexture2DArray=I,this.setTexture3D=O,this.setTextureCube=k,this.rebindTextures=Z,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=N,this.setupFrameBufferTexture=z,this.useMultisampledRTT=Se}function zx(n,e){function t(i,r=Xn){let s,o=Ke.getTransfer(r);if(i===$n)return n.UNSIGNED_BYTE;if(i===Yh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$h)return n.UNSIGNED_SHORT_5_5_5_1;if(i===bg)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===_g)return n.BYTE;if(i===xg)return n.SHORT;if(i===Xh)return n.UNSIGNED_SHORT;if(i===qh)return n.INT;if(i===nr)return n.UNSIGNED_INT;if(i===qn)return n.FLOAT;if(i===ir)return n.HALF_FLOAT;if(i===Mg)return n.ALPHA;if(i===Sg)return n.RGB;if(i===vn)return n.RGBA;if(i===wg)return n.LUMINANCE;if(i===Eg)return n.LUMINANCE_ALPHA;if(i===Ji)return n.DEPTH_COMPONENT;if(i===Fr)return n.DEPTH_STENCIL;if(i===Ag)return n.RED;if(i===Zh)return n.RED_INTEGER;if(i===Tg)return n.RG;if(i===Jh)return n.RG_INTEGER;if(i===Kh)return n.RGBA_INTEGER;if(i===ya||i===_a||i===xa||i===ba)if(o===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ya)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ba)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ya)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_a)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ba)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===mu||i===gu||i===vu||i===yu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===mu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qh)return s=e.get("WEBGL_compressed_texture_etc1"),s!==null?s.COMPRESSED_RGB_ETC1_WEBGL:null;if(i===_u||i===xu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_u)return o===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===xu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===bu||i===Mu||i===Su||i===wu||i===Eu||i===Au||i===Tu||i===Cu||i===Ru||i===Pu||i===Iu||i===Lu||i===Ou||i===Du)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===bu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Mu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Su)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Eu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Au)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Tu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Cu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ru)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Pu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Iu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Lu)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ou)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Du)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ma||i===Nu||i===Uu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ma)return o===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Nu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Uu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cg||i===Fu||i===Bu||i===ku)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ma)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Fu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ku)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var xl=class extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Pn=class extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vx={type:"move"},Dr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,i),f=this._getHandJoint(c,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&d>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vx)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Pn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Hx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){let r=new Ut,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){let i=t.cameras[0].viewport,r=new qt({vertexShader:Hx,fragmentShader:Gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Mt(new lo(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}},Ml=class extends _t{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,m=null,g=null,v=new bl,p=t.getContextAttributes(),f=null,M=null,y=[],x=[],A=new se,w=null,T=new Dt;T.layers.enable(1),T.viewport=new yt;let R=new Dt;R.layers.enable(2),R.viewport=new yt;let S=[T,R],b=new xl;b.layers.enable(1),b.layers.enable(2);let U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let V=y[z];return V===void 0&&(V=new Dr,y[z]=V),V.getTargetRaySpace()},this.getControllerGrip=function(z){let V=y[z];return V===void 0&&(V=new Dr,y[z]=V),V.getGripSpace()},this.getHand=function(z){let V=y[z];return V===void 0&&(V=new Dr,y[z]=V),V.getHandSpace()};function D(z){let V=x.indexOf(z.inputSource);if(V===-1)return;let J=y[V];J!==void 0&&(J.update(z.inputSource,z.frame,c||o),J.dispatchEvent({type:z.type,data:z.inputSource}))}function I(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",I),r.removeEventListener("inputsourceschange",O);for(let z=0;z<y.length;z++){let V=x[z];V!==null&&(x[z]=null,y[z].disconnect(V))}U=null,B=null,v.reset(),e.setRenderTarget(f),m=null,d=null,h=null,r=null,M=null,xe.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",I),r.addEventListener("inputsourceschange",O),p.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),r.renderState.layers===void 0){let V={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,V),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new ln(m.framebufferWidth,m.framebufferHeight,{format:vn,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let V=null,J=null,N=null;p.depth&&(N=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=p.stencil?Fr:Ji,J=p.stencil?Zr:nr);let Z={colorFormat:t.RGBA8,depthFormat:N,scaleFactor:s};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(Z),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new ln(d.textureWidth,d.textureHeight,{format:vn,type:$n,depthTexture:new uo(d.textureWidth,d.textureHeight,J,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});let ae=e.properties.get(M);ae.__ignoreDepthValues=d.ignoreDepthValues}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),xe.setContext(r),xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function O(z){for(let V=0;V<z.removed.length;V++){let J=z.removed[V],N=x.indexOf(J);N>=0&&(x[N]=null,y[N].disconnect(J))}for(let V=0;V<z.added.length;V++){let J=z.added[V],N=x.indexOf(J);if(N===-1){for(let ae=0;ae<y.length;ae++)if(ae>=x.length){x.push(J),N=ae;break}else if(x[ae]===null){x[ae]=J,N=ae;break}if(N===-1)break}let Z=y[N];Z&&Z.connect(J)}}let k=new L,te=new L;function W(z,V,J){k.setFromMatrixPosition(V.matrixWorld),te.setFromMatrixPosition(J.matrixWorld);let N=k.distanceTo(te),Z=V.projectionMatrix.elements,ae=J.projectionMatrix.elements,fe=Z[14]/(Z[10]-1),F=Z[14]/(Z[10]+1),ge=(Z[9]+1)/Z[5],Se=(Z[9]-1)/Z[5],Ve=(Z[8]-1)/Z[0],we=(ae[8]+1)/ae[0],ke=fe*Ve,P=fe*we,E=N/(-Ve+we),$=E*-Ve;V.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX($),z.translateZ(E),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();let ee=fe+E,ne=F+E,re=ke-$,Ae=P+(N-$),oe=ge*F/ne*ee,Ee=Se*F/ne*ee;z.projectionMatrix.makePerspective(re,Ae,oe,Ee,ee,ne),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function ie(z,V){V===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(V.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;v.texture!==null&&(z.near=v.depthNear,z.far=v.depthFar),b.near=R.near=T.near=z.near,b.far=R.far=T.far=z.far,(U!==b.near||B!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),U=b.near,B=b.far,T.near=U,T.far=B,R.near=U,R.far=B,T.updateProjectionMatrix(),R.updateProjectionMatrix(),z.updateProjectionMatrix());let V=z.parent,J=b.cameras;ie(b,V);for(let N=0;N<J.length;N++)ie(J[N],V);J.length===2?W(b,T,R):b.projectionMatrix.copy(T.projectionMatrix),G(z,b,V)};function G(z,V,J){J===null?z.matrix.copy(V.matrixWorld):(z.matrix.copy(J.matrixWorld),z.matrix.invert(),z.matrix.multiply(V.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(V.projectionMatrix),z.projectionMatrixInverse.copy(V.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Br*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(z){l=z,d!==null&&(d.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)},this.hasDepthSensing=function(){return v.texture!==null};let Q=null;function le(z,V){if(u=V.getViewerPose(c||o),g=V,u!==null){let J=u.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let N=!1;J.length!==b.cameras.length&&(b.cameras.length=0,N=!0);for(let ae=0;ae<J.length;ae++){let fe=J[ae],F=null;if(m!==null)F=m.getViewport(fe);else{let Se=h.getViewSubImage(d,fe);F=Se.viewport,ae===0&&(e.setRenderTargetTextures(M,Se.colorTexture,d.ignoreDepthValues?void 0:Se.depthStencilTexture),e.setRenderTarget(M))}let ge=S[ae];ge===void 0&&(ge=new Dt,ge.layers.enable(ae),ge.viewport=new yt,S[ae]=ge),ge.matrix.fromArray(fe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(fe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(F.x,F.y,F.width,F.height),ae===0&&(b.matrix.copy(ge.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),N===!0&&b.cameras.push(ge)}let Z=r.enabledFeatures;if(Z&&Z.includes("depth-sensing")){let ae=h.getDepthInformation(J[0]);ae&&ae.isValid&&ae.texture&&v.init(e,ae,r.renderState)}}for(let J=0;J<y.length;J++){let N=x[J],Z=y[J];N!==null&&Z!==void 0&&Z.update(N,V,c||o)}v.render(e,b),Q&&Q(z,V),V.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:V}),g=null}let xe=new af;xe.setAnimationLoop(le),this.setAnimationLoop=function(z){Q=z},this.dispose=function(){}}},fi=new _n,Wx=new Qe;function jx(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,of(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,M,y,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),h(p,f)):f.isMeshPhongMaterial?(s(p,f),u(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,x)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),v(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,M,y):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===At&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===At&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let M=e.get(f),y=M.envMap,x=M.envMapRotation;if(y&&(p.envMap.value=y,fi.copy(x),fi.x*=-1,fi.y*=-1,fi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),p.envMapRotation.value.setFromMatrix4(Wx.makeRotationFromEuler(fi)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;let A=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*A,t(f.lightMap,p.lightMapTransform)}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,M,y){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*M,p.scale.value=y*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function h(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,M){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===At&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){let M=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Xx(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){let x=y.program;i.uniformBlockBinding(M,x)}function c(M,y){let x=r[M.id];x===void 0&&(g(M),x=u(M),r[M.id]=x,M.addEventListener("dispose",p));let A=y.program;i.updateUBOMapping(M,A);let w=e.render.frame;s[M.id]!==w&&(d(M),s[M.id]=w)}function u(M){let y=h();M.__bindingPointIndex=y;let x=n.createBuffer(),A=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,A,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let y=r[M.id],x=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let w=0,T=x.length;w<T;w++){let R=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,b=R.length;S<b;S++){let U=R[S];if(m(U,w,S,A)===!0){let B=U.__offset,D=Array.isArray(U.value)?U.value:[U.value],I=0;for(let O=0;O<D.length;O++){let k=D[O],te=v(k);typeof k=="number"||typeof k=="boolean"?(U.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,B+I,U.__data)):k.isMatrix3?(U.__data[0]=k.elements[0],U.__data[1]=k.elements[1],U.__data[2]=k.elements[2],U.__data[3]=0,U.__data[4]=k.elements[3],U.__data[5]=k.elements[4],U.__data[6]=k.elements[5],U.__data[7]=0,U.__data[8]=k.elements[6],U.__data[9]=k.elements[7],U.__data[10]=k.elements[8],U.__data[11]=0):(k.toArray(U.__data,I),I+=te.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(M,y,x,A){let w=M.value,T=y+"_"+x;if(A[T]===void 0)return typeof w=="number"||typeof w=="boolean"?A[T]=w:A[T]=w.clone(),!0;{let R=A[T];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return A[T]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(M){let y=M.uniforms,x=0,A=16;for(let T=0,R=y.length;T<R;T++){let S=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,U=S.length;b<U;b++){let B=S[b],D=Array.isArray(B.value)?B.value:[B.value];for(let I=0,O=D.length;I<O;I++){let k=D[I],te=v(k),W=x%A;W!==0&&A-W<te.boundary&&(x+=A-W),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=te.storage}}}let w=x%A;return w>0&&(x+=A-w),M.__size=x,M.__cache={},this}function v(M){let y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function p(M){let y=M.target;y.removeEventListener("dispose",p);let x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function f(){for(let M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}var ho=class{constructor(e={}){let{canvas:t=t0(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;let m=new Uint32Array(4),g=new Int32Array(4),v=null,p=null,f=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Bt,this._useLegacyLights=!1,this.toneMapping=Yn,this.toneMappingExposure=1;let y=this,x=!1,A=0,w=0,T=null,R=-1,S=null,b=new yt,U=new yt,B=null,D=new Ne(0),I=0,O=t.width,k=t.height,te=1,W=null,ie=null,G=new yt(0,0,O,k),Q=new yt(0,0,O,k),le=!1,xe=new Hr,z=!1,V=!1,J=new Qe,N=new se,Z=new L,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function fe(){return T===null?te:1}let F=i;function ge(C,H){let q=t.getContext(C,H);return q!==null?q:null}try{let C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$r}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",K,!1),t.addEventListener("webglcontextcreationerror",ce,!1),F===null){let H="webgl2";if(F=ge(H,C),F===null)throw ge(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Se,Ve,we,ke,P,E,$,ee,ne,re,Ae,oe,Ee,Te,ue,pe,Pe,ve,ye,He,Ge,qe,Xe,Ye;function be(){Se=new h_(F),Se.init(),Ve=new s_(F,Se,e),qe=new zx(F,Se),we=new Bx(F),ke=new p_(F),P=new Ax,E=new kx(F,Se,we,P,Ve,qe,ke),$=new a_(y),ee=new u_(y),ne=new x0(F),Xe=new i_(F,ne),re=new f_(F,ne,ke,Xe),Ae=new g_(F,re,ne,ke),ye=new m_(F,Ve,E),pe=new o_(P),oe=new Ex(y,$,ee,Se,Ve,Xe,pe),Ee=new jx(y,P),Te=new Cx,ue=new Dx(Se),ve=new n_(y,$,ee,we,Ae,d,l),Pe=new Fx(y,Ae,Ve),Ye=new Xx(F,ke,Ve,we),He=new r_(F,Se,ke),Ge=new d_(F,Se,ke),ke.programs=oe.programs,y.capabilities=Ve,y.extensions=Se,y.properties=P,y.renderLists=Te,y.shadowMap=Pe,y.state=we,y.info=ke}be();let _=new Ml(y,F);this.xr=_,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let C=Se.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=Se.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(C){C!==void 0&&(te=C,this.setSize(O,k,!1))},this.getSize=function(C){return C.set(O,k)},this.setSize=function(C,H,q=!0){if(_.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,k=H,t.width=Math.floor(C*te),t.height=Math.floor(H*te),q===!0&&(t.style.width=C+"px",t.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(O*te,k*te).floor()},this.setDrawingBufferSize=function(C,H,q){O=C,k=H,te=q,t.width=Math.floor(C*q),t.height=Math.floor(H*q),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(b)},this.getViewport=function(C){return C.copy(G)},this.setViewport=function(C,H,q,Y){C.isVector4?G.set(C.x,C.y,C.z,C.w):G.set(C,H,q,Y),we.viewport(b.copy(G).multiplyScalar(te).round())},this.getScissor=function(C){return C.copy(Q)},this.setScissor=function(C,H,q,Y){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,H,q,Y),we.scissor(U.copy(Q).multiplyScalar(te).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(C){we.setScissorTest(le=C)},this.setOpaqueSort=function(C){W=C},this.setTransparentSort=function(C){ie=C},this.getClearColor=function(C){return C.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor.apply(ve,arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha.apply(ve,arguments)},this.clear=function(C=!0,H=!0,q=!0){let Y=0;if(C){let X=!1;if(T!==null){let de=T.texture.format;X=de===Kh||de===Jh||de===Zh}if(X){let de=T.texture.type,Me=de===$n||de===nr||de===Xh||de===Zr||de===Yh||de===$h,Re=ve.getClearColor(),Ie=ve.getClearAlpha(),Oe=Re.r,Le=Re.g,De=Re.b;Me?(m[0]=Oe,m[1]=Le,m[2]=De,m[3]=Ie,F.clearBufferuiv(F.COLOR,0,m)):(g[0]=Oe,g[1]=Le,g[2]=De,g[3]=Ie,F.clearBufferiv(F.COLOR,0,g))}else Y|=F.COLOR_BUFFER_BIT}H&&(Y|=F.DEPTH_BUFFER_BIT),q&&(Y|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",K,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),Te.dispose(),ue.dispose(),P.dispose(),$.dispose(),ee.dispose(),Ae.dispose(),Xe.dispose(),Ye.dispose(),oe.dispose(),_.dispose(),_.removeEventListener("sessionstart",ct),_.removeEventListener("sessionend",ut),Vt.stop()};function j(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function K(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;let C=ke.autoReset,H=Pe.enabled,q=Pe.autoUpdate,Y=Pe.needsUpdate,X=Pe.type;be(),ke.autoReset=C,Pe.enabled=H,Pe.autoUpdate=q,Pe.needsUpdate=Y,Pe.type=X}function ce(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function me(C){let H=C.target;H.removeEventListener("dispose",me),We(H)}function We(C){ze(C),P.remove(C)}function ze(C){let H=P.get(C).programs;H!==void 0&&(H.forEach(function(q){oe.releaseProgram(q)}),C.isShaderMaterial&&oe.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,q,Y,X,de){H===null&&(H=ae);let Me=X.isMesh&&X.matrixWorld.determinant()<0,Re=wm(C,H,q,Y,X);we.setMaterial(Y,Me);let Ie=q.index,Oe=1;if(Y.wireframe===!0){if(Ie=re.getWireframeAttribute(q),Ie===void 0)return;Oe=2}let Le=q.drawRange,De=q.attributes.position,lt=Le.start*Oe,Ht=(Le.start+Le.count)*Oe;de!==null&&(lt=Math.max(lt,de.start*Oe),Ht=Math.min(Ht,(de.start+de.count)*Oe)),Ie!==null?(lt=Math.max(lt,0),Ht=Math.min(Ht,Ie.count)):De!=null&&(lt=Math.max(lt,0),Ht=Math.min(Ht,De.count));let mt=Ht-lt;if(mt<0||mt===1/0)return;Xe.setup(X,Y,Re,q,Ie);let bn,ot=He;if(Ie!==null&&(bn=ne.get(Ie),ot=Ge,ot.setIndex(bn)),X.isMesh)Y.wireframe===!0?(we.setLineWidth(Y.wireframeLinewidth*fe()),ot.setMode(F.LINES)):ot.setMode(F.TRIANGLES);else if(X.isLine){let Ue=Y.linewidth;Ue===void 0&&(Ue=1),we.setLineWidth(Ue*fe()),X.isLineSegments?ot.setMode(F.LINES):X.isLineLoop?ot.setMode(F.LINE_LOOP):ot.setMode(F.LINE_STRIP)}else X.isPoints?ot.setMode(F.POINTS):X.isSprite&&ot.setMode(F.TRIANGLES);if(X.isBatchedMesh)ot.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)ot.renderInstances(lt,mt,X.count);else if(q.isInstancedBufferGeometry){let Ue=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,da=Math.min(q.instanceCount,Ue);ot.renderInstances(lt,mt,da)}else ot.render(lt,mt)};function tt(C,H,q){C.transparent===!0&&C.side===Cn&&C.forceSinglePass===!1?(C.side=At,C.needsUpdate=!0,_s(C,H,q),C.side=Zn,C.needsUpdate=!0,_s(C,H,q),C.side=Cn):_s(C,H,q)}this.compile=function(C,H,q=null){q===null&&(q=C),p=ue.get(q),p.init(),M.push(p),q.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),C!==q&&C.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights(y._useLegacyLights);let Y=new Set;return C.traverse(function(X){let de=X.material;if(de)if(Array.isArray(de))for(let Me=0;Me<de.length;Me++){let Re=de[Me];tt(Re,q,X),Y.add(Re)}else tt(de,q,X),Y.add(de)}),M.pop(),p=null,Y},this.compileAsync=function(C,H,q=null){let Y=this.compile(C,H,q);return new Promise(X=>{function de(){if(Y.forEach(function(Me){P.get(Me).currentProgram.isReady()&&Y.delete(Me)}),Y.size===0){X(C);return}setTimeout(de,10)}Se.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let pt=null;function Je(C){pt&&pt(C)}function ct(){Vt.stop()}function ut(){Vt.start()}let Vt=new af;Vt.setAnimationLoop(Je),typeof self<"u"&&Vt.setContext(self),this.setAnimationLoop=function(C){pt=C,_.setAnimationLoop(C),C===null?Vt.stop():Vt.start()},_.addEventListener("sessionstart",ct),_.addEventListener("sessionend",ut),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),_.enabled===!0&&_.isPresenting===!0&&(_.cameraAutoUpdate===!0&&_.updateCamera(H),H=_.getCamera()),C.isScene===!0&&C.onBeforeRender(y,C,H,T),p=ue.get(C,M.length),p.init(),M.push(p),J.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),xe.setFromProjectionMatrix(J),V=this.localClippingEnabled,z=pe.init(this.clippingPlanes,V),v=Te.get(C,f.length),v.init(),f.push(v),Jt(C,H,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(W,ie),this.info.render.frame++,z===!0&&pe.beginShadows();let q=p.state.shadowsArray;if(Pe.render(q,C,H),z===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(_.enabled===!1||_.isPresenting===!1||_.hasDepthSensing()===!1)&&ve.render(v,C),p.setupLights(y._useLegacyLights),H.isArrayCamera){let Y=H.cameras;for(let X=0,de=Y.length;X<de;X++){let Me=Y[X];Bn(v,C,Me,Me.viewport)}}else Bn(v,C,H);T!==null&&(E.updateMultisampleRenderTarget(T),E.updateRenderTargetMipmap(T)),C.isScene===!0&&C.onAfterRender(y,C,H),Xe.resetDefaultState(),R=-1,S=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function Jt(C,H,q,Y){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||xe.intersectsSprite(C)){Y&&Z.setFromMatrixPosition(C.matrixWorld).applyMatrix4(J);let Me=Ae.update(C),Re=C.material;Re.visible&&v.push(C,Me,Re,q,Z.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||xe.intersectsObject(C))){let Me=Ae.update(C),Re=C.material;if(Y&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Z.copy(C.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Z.copy(Me.boundingSphere.center)),Z.applyMatrix4(C.matrixWorld).applyMatrix4(J)),Array.isArray(Re)){let Ie=Me.groups;for(let Oe=0,Le=Ie.length;Oe<Le;Oe++){let De=Ie[Oe],lt=Re[De.materialIndex];lt&&lt.visible&&v.push(C,Me,lt,q,Z.z,De)}}else Re.visible&&v.push(C,Me,Re,q,Z.z,null)}}let de=C.children;for(let Me=0,Re=de.length;Me<Re;Me++)Jt(de[Me],H,q,Y)}function Bn(C,H,q,Y){let X=C.opaque,de=C.transmissive,Me=C.transparent;p.setupLightsView(q),z===!0&&pe.setGlobalState(y.clippingPlanes,q),de.length>0&&Ti(X,de,H,q),Y&&we.viewport(b.copy(Y)),X.length>0&&si(X,H,q),de.length>0&&si(de,H,q),Me.length>0&&si(Me,H,q),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Ti(C,H,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(p.state.transmissionRenderTarget===null){p.state.transmissionRenderTarget=new ln(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float")?ir:$n,minFilter:vi,samples:4,stencilBuffer:s});let Oe=P.get(p.state.transmissionRenderTarget);Oe.__isTransmissionRenderTarget=!0}let de=p.state.transmissionRenderTarget;y.getDrawingBufferSize(N),de.setSize(N.x,N.y);let Me=y.getRenderTarget();y.setRenderTarget(de),y.getClearColor(D),I=y.getClearAlpha(),I<1&&y.setClearColor(16777215,.5),y.clear();let Re=y.toneMapping;y.toneMapping=Yn,si(C,q,Y),E.updateMultisampleRenderTarget(de),E.updateRenderTargetMipmap(de);let Ie=!1;for(let Oe=0,Le=H.length;Oe<Le;Oe++){let De=H[Oe],lt=De.object,Ht=De.geometry,mt=De.material,bn=De.group;if(mt.side===Cn&&lt.layers.test(Y.layers)){let ot=mt.side;mt.side=At,mt.needsUpdate=!0,ru(lt,q,Y,Ht,mt,bn),mt.side=ot,mt.needsUpdate=!0,Ie=!0}}Ie===!0&&(E.updateMultisampleRenderTarget(de),E.updateRenderTargetMipmap(de)),y.setRenderTarget(Me),y.setClearColor(D,I),y.toneMapping=Re}function si(C,H,q){let Y=H.isScene===!0?H.overrideMaterial:null;for(let X=0,de=C.length;X<de;X++){let Me=C[X],Re=Me.object,Ie=Me.geometry,Oe=Y===null?Me.material:Y,Le=Me.group;Re.layers.test(q.layers)&&ru(Re,H,q,Ie,Oe,Le)}}function ru(C,H,q,Y,X,de){C.onBeforeRender(y,H,q,Y,X,de),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(y,H,q,Y,C,de),X.transparent===!0&&X.side===Cn&&X.forceSinglePass===!1?(X.side=At,X.needsUpdate=!0,y.renderBufferDirect(q,H,Y,X,C,de),X.side=Zn,X.needsUpdate=!0,y.renderBufferDirect(q,H,Y,X,C,de),X.side=Cn):y.renderBufferDirect(q,H,Y,X,C,de),C.onAfterRender(y,H,q,Y,X,de)}function _s(C,H,q){H.isScene!==!0&&(H=ae);let Y=P.get(C),X=p.state.lights,de=p.state.shadowsArray,Me=X.state.version,Re=oe.getParameters(C,X.state,de,H,q),Ie=oe.getProgramCacheKey(Re),Oe=Y.programs;Y.environment=C.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(C.isMeshStandardMaterial?ee:$).get(C.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,Oe===void 0&&(C.addEventListener("dispose",me),Oe=new Map,Y.programs=Oe);let Le=Oe.get(Ie);if(Le!==void 0){if(Y.currentProgram===Le&&Y.lightsStateVersion===Me)return ou(C,Re),Le}else Re.uniforms=oe.getUniforms(C),C.onBuild(q,Re,y),C.onBeforeCompile(Re,y),Le=oe.acquireProgram(Re,Ie),Oe.set(Ie,Le),Y.uniforms=Re.uniforms;let De=Y.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(De.clippingPlanes=pe.uniform),ou(C,Re),Y.needsLights=Am(C),Y.lightsStateVersion=Me,Y.needsLights&&(De.ambientLightColor.value=X.state.ambient,De.lightProbe.value=X.state.probe,De.directionalLights.value=X.state.directional,De.directionalLightShadows.value=X.state.directionalShadow,De.spotLights.value=X.state.spot,De.spotLightShadows.value=X.state.spotShadow,De.rectAreaLights.value=X.state.rectArea,De.ltc_1.value=X.state.rectAreaLTC1,De.ltc_2.value=X.state.rectAreaLTC2,De.pointLights.value=X.state.point,De.pointLightShadows.value=X.state.pointShadow,De.hemisphereLights.value=X.state.hemi,De.directionalShadowMap.value=X.state.directionalShadowMap,De.directionalShadowMatrix.value=X.state.directionalShadowMatrix,De.spotShadowMap.value=X.state.spotShadowMap,De.spotLightMatrix.value=X.state.spotLightMatrix,De.spotLightMap.value=X.state.spotLightMap,De.pointShadowMap.value=X.state.pointShadowMap,De.pointShadowMatrix.value=X.state.pointShadowMatrix),Y.currentProgram=Le,Y.uniformsList=null,Le}function su(C){if(C.uniformsList===null){let H=C.currentProgram.getUniforms();C.uniformsList=Qi.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function ou(C,H){let q=P.get(C);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function wm(C,H,q,Y,X){H.isScene!==!0&&(H=ae),E.resetTextureUnits();let de=H.fog,Me=Y.isMeshStandardMaterial?H.environment:null,Re=T===null?y.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Jn,Ie=(Y.isMeshStandardMaterial?ee:$).get(Y.envMap||Me),Oe=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Le=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),De=!!q.morphAttributes.position,lt=!!q.morphAttributes.normal,Ht=!!q.morphAttributes.color,mt=Yn;Y.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(mt=y.toneMapping);let bn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ot=bn!==void 0?bn.length:0,Ue=P.get(Y),da=p.state.lights;if(z===!0&&(V===!0||C!==S)){let Kt=C===S&&Y.id===R;pe.setState(Y,C,Kt)}let nt=!1;Y.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==da.state.version||Ue.outputColorSpace!==Re||X.isBatchedMesh&&Ue.batching===!1||!X.isBatchedMesh&&Ue.batching===!0||X.isInstancedMesh&&Ue.instancing===!1||!X.isInstancedMesh&&Ue.instancing===!0||X.isSkinnedMesh&&Ue.skinning===!1||!X.isSkinnedMesh&&Ue.skinning===!0||X.isInstancedMesh&&Ue.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ue.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ue.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ue.instancingMorph===!1&&X.morphTexture!==null||Ue.envMap!==Ie||Y.fog===!0&&Ue.fog!==de||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==pe.numPlanes||Ue.numIntersection!==pe.numIntersection)||Ue.vertexAlphas!==Oe||Ue.vertexTangents!==Le||Ue.morphTargets!==De||Ue.morphNormals!==lt||Ue.morphColors!==Ht||Ue.toneMapping!==mt||Ue.morphTargetsCount!==ot)&&(nt=!0):(nt=!0,Ue.__version=Y.version);let oi=Ue.currentProgram;nt===!0&&(oi=_s(Y,H,X));let au=!1,Sr=!1,pa=!1,St=oi.getUniforms(),kn=Ue.uniforms;if(we.useProgram(oi.program)&&(au=!0,Sr=!0,pa=!0),Y.id!==R&&(R=Y.id,Sr=!0),au||S!==C){St.setValue(F,"projectionMatrix",C.projectionMatrix),St.setValue(F,"viewMatrix",C.matrixWorldInverse);let Kt=St.map.cameraPosition;Kt!==void 0&&Kt.setValue(F,Z.setFromMatrixPosition(C.matrixWorld)),Ve.logarithmicDepthBuffer&&St.setValue(F,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&St.setValue(F,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,Sr=!0,pa=!0)}if(X.isSkinnedMesh){St.setOptional(F,X,"bindMatrix"),St.setOptional(F,X,"bindMatrixInverse");let Kt=X.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),St.setValue(F,"boneTexture",Kt.boneTexture,E))}X.isBatchedMesh&&(St.setOptional(F,X,"batchingTexture"),St.setValue(F,"batchingTexture",X._matricesTexture,E));let ma=q.morphAttributes;if((ma.position!==void 0||ma.normal!==void 0||ma.color!==void 0)&&ye.update(X,q,oi),(Sr||Ue.receiveShadow!==X.receiveShadow)&&(Ue.receiveShadow=X.receiveShadow,St.setValue(F,"receiveShadow",X.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(kn.envMap.value=Ie,kn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&H.environment!==null&&(kn.envMapIntensity.value=H.environmentIntensity),Sr&&(St.setValue(F,"toneMappingExposure",y.toneMappingExposure),Ue.needsLights&&Em(kn,pa),de&&Y.fog===!0&&Ee.refreshFogUniforms(kn,de),Ee.refreshMaterialUniforms(kn,Y,te,k,p.state.transmissionRenderTarget),Qi.upload(F,su(Ue),kn,E)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Qi.upload(F,su(Ue),kn,E),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&St.setValue(F,"center",X.center),St.setValue(F,"modelViewMatrix",X.modelViewMatrix),St.setValue(F,"normalMatrix",X.normalMatrix),St.setValue(F,"modelMatrix",X.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let Kt=Y.uniformsGroups;for(let ga=0,Tm=Kt.length;ga<Tm;ga++){let lu=Kt[ga];Ye.update(lu,oi),Ye.bind(lu,oi)}}return oi}function Em(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function Am(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(C,H,q){P.get(C.texture).__webglTexture=H,P.get(C.depthTexture).__webglTexture=q;let Y=P.get(C);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,H){let q=P.get(C);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(C,H=0,q=0){T=C,A=H,w=q;let Y=!0,X=null,de=!1,Me=!1;if(C){let Ie=P.get(C);Ie.__useDefaultFramebuffer!==void 0?(we.bindFramebuffer(F.FRAMEBUFFER,null),Y=!1):Ie.__webglFramebuffer===void 0?E.setupRenderTarget(C):Ie.__hasExternalTextures&&E.rebindTextures(C,P.get(C.texture).__webglTexture,P.get(C.depthTexture).__webglTexture);let Oe=C.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Me=!0);let Le=P.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Le[H])?X=Le[H][q]:X=Le[H],de=!0):C.samples>0&&E.useMultisampledRTT(C)===!1?X=P.get(C).__webglMultisampledFramebuffer:Array.isArray(Le)?X=Le[q]:X=Le,b.copy(C.viewport),U.copy(C.scissor),B=C.scissorTest}else b.copy(G).multiplyScalar(te).floor(),U.copy(Q).multiplyScalar(te).floor(),B=le;if(we.bindFramebuffer(F.FRAMEBUFFER,X)&&Y&&we.drawBuffers(C,X),we.viewport(b),we.scissor(U),we.setScissorTest(B),de){let Ie=P.get(C.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ie.__webglTexture,q)}else if(Me){let Ie=P.get(C.texture),Oe=H||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ie.__webglTexture,q||0,Oe)}R=-1},this.readRenderTargetPixels=function(C,H,q,Y,X,de,Me){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=P.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Me!==void 0&&(Re=Re[Me]),Re){we.bindFramebuffer(F.FRAMEBUFFER,Re);try{let Ie=C.texture,Oe=Ie.format,Le=Ie.type;if(Oe!==vn&&qe.convert(Oe)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let De=Le===ir&&(Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float"));if(Le!==$n&&qe.convert(Le)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&Le!==qn&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-Y&&q>=0&&q<=C.height-X&&F.readPixels(H,q,Y,X,qe.convert(Oe),qe.convert(Le),de)}finally{let Ie=T!==null?P.get(T).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(C,H,q=0){let Y=Math.pow(2,-q),X=Math.floor(H.image.width*Y),de=Math.floor(H.image.height*Y);E.setTexture2D(H,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,C.x,C.y,X,de),we.unbindTexture()},this.copyTextureToTexture=function(C,H,q,Y=0){let X=H.image.width,de=H.image.height,Me=qe.convert(q.format),Re=qe.convert(q.type);E.setTexture2D(q,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,q.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,q.unpackAlignment),H.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Y,C.x,C.y,X,de,Me,Re,H.image.data):H.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Y,C.x,C.y,H.mipmaps[0].width,H.mipmaps[0].height,Me,H.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,Y,C.x,C.y,Me,Re,H.image),Y===0&&q.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),we.unbindTexture()},this.copyTextureToTexture3D=function(C,H,q,Y,X=0){let de=Math.round(C.max.x-C.min.x),Me=Math.round(C.max.y-C.min.y),Re=C.max.z-C.min.z+1,Ie=qe.convert(Y.format),Oe=qe.convert(Y.type),Le;if(Y.isData3DTexture)E.setTexture3D(Y,0),Le=F.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)E.setTexture2DArray(Y,0),Le=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,Y.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,Y.unpackAlignment);let De=F.getParameter(F.UNPACK_ROW_LENGTH),lt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ht=F.getParameter(F.UNPACK_SKIP_PIXELS),mt=F.getParameter(F.UNPACK_SKIP_ROWS),bn=F.getParameter(F.UNPACK_SKIP_IMAGES),ot=q.isCompressedTexture?q.mipmaps[X]:q.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,ot.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ot.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,C.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,C.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,C.min.z),q.isDataTexture||q.isData3DTexture?F.texSubImage3D(Le,X,H.x,H.y,H.z,de,Me,Re,Ie,Oe,ot.data):Y.isCompressedArrayTexture?F.compressedTexSubImage3D(Le,X,H.x,H.y,H.z,de,Me,Re,Ie,ot.data):F.texSubImage3D(Le,X,H.x,H.y,H.z,de,Me,Re,Ie,Oe,ot),F.pixelStorei(F.UNPACK_ROW_LENGTH,De),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,lt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ht),F.pixelStorei(F.UNPACK_SKIP_ROWS,mt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,bn),X===0&&Y.generateMipmaps&&F.generateMipmap(Le),we.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?E.setTextureCube(C,0):C.isData3DTexture?E.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?E.setTexture2DArray(C,0):E.setTexture2D(C,0),we.unbindTexture()},this.resetState=function(){A=0,w=0,T=null,we.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===jl?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Ao?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}};var fo=class extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ol,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return rf("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Lt=new L,po=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ze(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),i=Ze(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),i=Ze(i,this.array),r=Ze(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),i=Ze(i,this.array),r=Ze(r,this.array),s=Ze(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Gr=class extends Ln{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ji,Cr=new L,Xi=new L,qi=new L,Yi=new se,Rr=new se,df=new Qe,Gs=new L,Pr=new L,Ws=new L,Lh=new se,Ya=new se,Oh=new se,mo=class extends Tt{constructor(e=new Gr){if(super(),this.isSprite=!0,this.type="Sprite",ji===void 0){ji=new Ct;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Sl(t,5);ji.setIndex([0,1,2,0,2,3]),ji.setAttribute("position",new po(i,3,0,!1)),ji.setAttribute("uv",new po(i,2,3,!1))}this.geometry=ji,this.material=e,this.center=new se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xi.setFromMatrixScale(this.matrixWorld),df.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xi.multiplyScalar(-qi.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;js(Gs.set(-.5,-.5,0),qi,o,Xi,r,s),js(Pr.set(.5,-.5,0),qi,o,Xi,r,s),js(Ws.set(.5,.5,0),qi,o,Xi,r,s),Lh.set(0,0),Ya.set(1,0),Oh.set(1,1);let a=e.ray.intersectTriangle(Gs,Pr,Ws,!1,Cr);if(a===null&&(js(Pr.set(-.5,.5,0),qi,o,Xi,r,s),Ya.set(0,1),a=e.ray.intersectTriangle(Gs,Ws,Pr,!1,Cr),a===null))return;let l=e.ray.origin.distanceTo(Cr);l<e.near||l>e.far||t.push({distance:l,point:Cr.clone(),uv:yi.getInterpolation(Cr,Gs,Pr,Ws,Lh,Ya,Oh,new se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function js(n,e,t,i,r,s){Yi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Rr.x=s*Yi.x-r*Yi.y,Rr.y=r*Yi.x+s*Yi.y):Rr.copy(Yi),n.copy(e),n.x+=Rr.x,n.y+=Rr.y,n.applyMatrix4(df)}var Wr=class extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Dh=new L,Nh=new L,Uh=new Qe,$a=new _i,Xs=new rr,go=class extends Tt{constructor(e=new Ct,t=new Wr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Dh.fromBufferAttribute(t,r-1),Nh.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Dh.distanceTo(Nh);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xs.copy(i.boundingSphere),Xs.applyMatrix4(r),Xs.radius+=s,e.ray.intersectsSphere(Xs)===!1)return;Uh.copy(r).invert(),$a.copy(e.ray).applyMatrix4(Uh);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new L,u=new L,h=new L,d=new L,m=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){let f=Math.max(0,o.start),M=Math.min(g.count,o.start+o.count);for(let y=f,x=M-1;y<x;y+=m){let A=g.getX(y),w=g.getX(y+1);if(c.fromBufferAttribute(p,A),u.fromBufferAttribute(p,w),$a.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);let R=e.ray.origin.distanceTo(d);R<e.near||R>e.far||t.push({distance:R,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,o.start),M=Math.min(p.count,o.start+o.count);for(let y=f,x=M-1;y<x;y+=m){if(c.fromBufferAttribute(p,y),u.fromBufferAttribute(p,y+1),$a.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);let w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);let u=i[r],d=i[r+1]-u,m=(o-u)/d;return(r+m)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new se:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){let i=new L,r=[],s=[],o=[],a=new L,l=new Qe;for(let m=0;m<=e;m++){let g=m/e;r[m]=this.getTangentAt(g,new L)}s[0]=new L,o[0]=new L;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(r[m-1],r[m]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(vt(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(l.makeRotationAxis(a,g))}o[m].crossVectors(r[m],s[m])}if(t===!0){let m=Math.acos(vt(s[0].dot(s[e]),-1,1));m/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(m=-m);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],m*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vo=class extends un{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new se){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,m=c-this.aY;l=d*u-m*h+this.aX,c=d*h+m*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},wl=class extends vo{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function $l(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,m=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,m*=u,r(o,a,d,m)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var qs=new L,Za=new $l,Ja=new $l,Ka=new $l,El=class extends un{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new L){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(qs.subVectors(r[0],r[1]).add(r[0]),c=qs);let h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(qs.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=qs),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(h),m),v=Math.pow(h.distanceToSquared(d),m),p=Math.pow(d.distanceToSquared(u),m);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),Za.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,v,p),Ja.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,v,p),Ka.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,v,p)}else this.curveType==="catmullrom"&&(Za.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Ja.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Ka.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(Za.calc(l),Ja.calc(l),Ka.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Fh(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function qx(n,e){let t=1-n;return t*t*e}function Yx(n,e){return 2*(1-n)*n*e}function $x(n,e){return n*n*e}function Nr(n,e,t,i){return qx(n,e)+Yx(n,t)+$x(n,i)}function Zx(n,e){let t=1-n;return t*t*t*e}function Jx(n,e){let t=1-n;return 3*t*t*n*e}function Kx(n,e){return 3*(1-n)*n*n*e}function Qx(n,e){return n*n*n*e}function Ur(n,e,t,i,r){return Zx(n,e)+Jx(n,t)+Kx(n,i)+Qx(n,r)}var Al=class extends un{constructor(e=new se,t=new se,i=new se,r=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new se){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Ur(e,r.x,s.x,o.x,a.x),Ur(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},jr=class extends un{constructor(e=new L,t=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new L){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Ur(e,r.x,s.x,o.x,a.x),Ur(e,r.y,s.y,o.y,a.y),Ur(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Tl=class extends un{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cl=class extends un{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rl=class extends un{constructor(e=new se,t=new se,i=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new se){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Nr(e,r.x,s.x,o.x),Nr(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lr=class extends un{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Nr(e,r.x,s.x,o.x),Nr(e,r.y,s.y,o.y),Nr(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Pl=class extends un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Fh(a,l.x,c.x,u.x,h.x),Fh(a,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new se().fromArray(r))}return this}},eb=Object.freeze({__proto__:null,ArcCurve:wl,CatmullRomCurve3:El,CubicBezierCurve:Al,CubicBezierCurve3:jr,EllipseCurve:vo,LineCurve:Tl,LineCurve3:Cl,QuadraticBezierCurve:Rl,QuadraticBezierCurve3:lr,SplineCurve:Pl});var Xr=class n extends Ct{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],d=[],m=[],g=0,v=[],p=i/2,f=0;M(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new at(h,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(m,2));function M(){let x=new L,A=new L,w=0,T=(t-e)/i;for(let R=0;R<=s;R++){let S=[],b=R/s,U=b*(t-e)+e;for(let B=0;B<=r;B++){let D=B/r,I=D*l+a,O=Math.sin(I),k=Math.cos(I);A.x=U*O,A.y=-b*i+p,A.z=U*k,h.push(A.x,A.y,A.z),x.set(O,T,k).normalize(),d.push(x.x,x.y,x.z),m.push(D,1-b),S.push(g++)}v.push(S)}for(let R=0;R<r;R++)for(let S=0;S<s;S++){let b=v[S][R],U=v[S+1][R],B=v[S+1][R+1],D=v[S][R+1];u.push(b,U,D),u.push(U,B,D),w+=6}c.addGroup(f,w,0),f+=w}function y(x){let A=g,w=new se,T=new L,R=0,S=x===!0?e:t,b=x===!0?1:-1;for(let B=1;B<=r;B++)h.push(0,p*b,0),d.push(0,b,0),m.push(.5,.5),g++;let U=g;for(let B=0;B<=r;B++){let I=B/r*l+a,O=Math.cos(I),k=Math.sin(I);T.x=S*k,T.y=p*b,T.z=S*O,h.push(T.x,T.y,T.z),d.push(0,b,0),w.x=O*.5+.5,w.y=k*.5*b+.5,m.push(w.x,w.y),g++}for(let B=0;B<r;B++){let D=A+B,I=U+B;x===!0?u.push(I,I+1,D):u.push(I+1,I,D),R+=3}c.addGroup(f,R,x===!0?1:2),f+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},yo=class n extends Xr{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var cr=class n extends Ct{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,u=[],h=new L,d=new L,m=[],g=[],v=[],p=[];for(let f=0;f<=i;f++){let M=[],y=f/i,x=0;f===0&&o===0?x=.5/t:f===i&&l===Math.PI&&(x=-.5/t);for(let A=0;A<=t;A++){let w=A/t;h.x=-e*Math.cos(r+w*s)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(r+w*s)*Math.sin(o+y*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),p.push(w+x,1-y),M.push(c++)}u.push(M)}for(let f=0;f<i;f++)for(let M=0;M<t;M++){let y=u[f][M+1],x=u[f][M],A=u[f+1][M],w=u[f+1][M+1];(f!==0||o>0)&&m.push(y,x,w),(f!==i-1||l<Math.PI)&&m.push(x,A,w)}this.setIndex(m),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var _o=class n extends Ct{constructor(e=new lr(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new L,l=new L,c=new se,u=new L,h=[],d=[],m=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new at(h,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(m,2));function v(){for(let y=0;y<t;y++)p(y);p(s===!1?t:0),M(),f()}function p(y){u=e.getPointAt(y/t,u);let x=o.normals[y],A=o.binormals[y];for(let w=0;w<=r;w++){let T=w/r*Math.PI*2,R=Math.sin(T),S=-Math.cos(T);l.x=S*x.x+R*A.x,l.y=S*x.y+R*A.y,l.z=S*x.z+R*A.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,h.push(a.x,a.y,a.z)}}function f(){for(let y=1;y<=t;y++)for(let x=1;x<=r;x++){let A=(r+1)*(y-1)+(x-1),w=(r+1)*y+(x-1),T=(r+1)*y+x,R=(r+1)*(y-1)+x;g.push(A,w,R),g.push(w,T,R)}}function M(){for(let y=0;y<=t;y++)for(let x=0;x<=r;x++)c.x=y/t,c.y=x/r,m.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new eb[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var xo=class extends Ln{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ef,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Ys(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function tb(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ur=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Il=class extends ur{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zu,endingEnd:zu}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Vu:s=e,a=2*t-i;break;case Hu:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Vu:o=e,l=2*i-t;break;case Hu:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,m=this._weightNext,g=(i-t)/(r-t),v=g*g,p=v*g,f=-d*p+2*d*v-d*g,M=(1+d)*p+(-1.5-2*d)*v+(-.5+d)*g+1,y=(-1-m)*p+(1.5+m)*v+.5*g,x=m*p-m*v;for(let A=0;A!==a;++A)s[A]=f*o[u+A]+M*o[c+A]+y*o[l+A]+x*o[h+A];return s}},Ll=class extends ur{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(r-t),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}},Ol=class extends ur{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},hn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ys(t,this.TimeBufferType),this.values=Ys(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ys(e.times,Array),values:Ys(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Il(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Zs:t=this.InterpolantFactoryMethodDiscrete;break;case Js:t=this.InterpolantFactoryMethodLinear;break;case Sa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Zs;case this.InterpolantFactoryMethodLinear:return Js;case this.InterpolantFactoryMethodSmooth:return Sa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&tb(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Sa,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let h=a*i,d=h-i,m=h+i;for(let g=0;g!==i;++g){let v=t[h+g];if(v!==t[d+g]||v!==t[m+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*i,d=o*i;for(let m=0;m!==i;++m)t[d+m]=t[h+m]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=Js;var xi=class extends hn{};xi.prototype.ValueTypeName="bool";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Zs;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Dl=class extends hn{};Dl.prototype.ValueTypeName="color";var Nl=class extends hn{};Nl.prototype.ValueTypeName="number";var Ul=class extends ur{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)xt.slerpFlat(s,0,o,c-a,o,c,l);return s}},qr=class extends hn{InterpolantFactoryMethodLinear(e){return new Ul(this.times,this.values,this.getValueSize(),e)}};qr.prototype.ValueTypeName="quaternion";qr.prototype.DefaultInterpolation=Js;qr.prototype.InterpolantFactoryMethodSmooth=void 0;var bi=class extends hn{};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=Zs;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Fl=class extends hn{};Fl.prototype.ValueTypeName="vector";var Bh={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},Bl=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let m=c[h],g=c[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return g}return null}}},nb=new Bl,Yr=class{constructor(e){this.manager=e!==void 0?e:nb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Yr.DEFAULT_MATERIAL_NAME="__DEFAULT";var kl=class extends Yr{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Bh.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;let a=kr("img");function l(){u(),Bh.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}};var bo=class extends Yr{constructor(e){super(e)}load(e,t,i,r){let s=new Ut,o=new kl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}},Mo=class extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var Qa=new Qe,kh=new L,zh=new L,zl=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hr,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;kh.setFromMatrixPosition(e.matrixWorld),t.position.copy(kh),zh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zh),t.updateMatrixWorld(),Qa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Vl=class extends zl{constructor(){super(new ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},So=class extends Mo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new Vl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wo=class extends Mo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var hr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Vh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Vh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Vh(){return(typeof performance>"u"?Date:performance).now()}var Zl="\\[\\]\\.:\\/",ib=new RegExp("["+Zl+"]","g"),Jl="[^"+Zl+"]",rb="[^"+Zl.replace("\\.","")+"]",sb=/((?:WC+[\/:])*)/.source.replace("WC",Jl),ob=/(WCOD+)?/.source.replace("WCOD",rb),ab=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jl),lb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jl),cb=new RegExp("^"+sb+ob+ab+lb+"$"),ub=["material","materials","bones","map"],Hl=class{constructor(e,t,i){let r=i||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},it=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ib,"")}static parseTrackName(e){let t=cb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);ub.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};it.Composite=Hl;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var B1=new Float32Array(1);var Hh=new Qe,fr=class{constructor(e,t,i=0,r=1/0){this.ray=new _i(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new zr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hh),this}intersectObject(e,t=!0,i=[]){return Gl(e,this,i,t),i.sort(Gh),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Gl(e[r],this,i,t);return i.sort(Gh),i}};function Gh(n,e){return n.distance-e.distance}function Gl(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){let r=n.children;for(let s=0,o=r.length;s<o;s++)Gl(r[s],e,t,!0)}}var Mi=class{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$r}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$r);var pr=new jt,Kn=new fr,On=new se,pf=new L,Kl=new se,Co=new se,Ro=new L,Ql=new L,mf=new Qe,gf=new L,vf=new L,Po=class extends _t{constructor(e,t,i){super(),i.style.touchAction="none";let r=null,s=null,o=[];this.mode="translate",this.rotateSpeed=1;let a=this;function l(){i.addEventListener("pointermove",g),i.addEventListener("pointerdown",v),i.addEventListener("pointerup",p),i.addEventListener("pointerleave",p)}function c(){i.removeEventListener("pointermove",g),i.removeEventListener("pointerdown",v),i.removeEventListener("pointerup",p),i.removeEventListener("pointerleave",p),i.style.cursor=""}function u(){c()}function h(){return e}function d(y){e=y}function m(){return Kn}function g(y){if(a.enabled!==!1){if(f(y),Kn.setFromCamera(On,t),r)a.mode==="translate"?Kn.ray.intersectPlane(pr,Ro)&&r.position.copy(Ro.sub(pf).applyMatrix4(mf)):a.mode==="rotate"&&(Kl.subVectors(On,Co).multiplyScalar(a.rotateSpeed),r.rotateOnWorldAxis(gf,Kl.x),r.rotateOnWorldAxis(vf.normalize(),-Kl.y)),a.dispatchEvent({type:"drag",object:r}),Co.copy(On);else if(y.pointerType==="mouse"||y.pointerType==="pen")if(o.length=0,Kn.setFromCamera(On,t),Kn.intersectObjects(e,a.recursive,o),o.length>0){let x=o[0].object;pr.setFromNormalAndCoplanarPoint(t.getWorldDirection(pr.normal),Ql.setFromMatrixPosition(x.matrixWorld)),s!==x&&s!==null&&(a.dispatchEvent({type:"hoveroff",object:s}),i.style.cursor="auto",s=null),s!==x&&(a.dispatchEvent({type:"hoveron",object:x}),i.style.cursor="pointer",s=x)}else s!==null&&(a.dispatchEvent({type:"hoveroff",object:s}),i.style.cursor="auto",s=null);Co.copy(On)}}function v(y){a.enabled!==!1&&(f(y),o.length=0,Kn.setFromCamera(On,t),Kn.intersectObjects(e,a.recursive,o),o.length>0&&(a.transformGroup===!0?r=M(o[0].object):r=o[0].object,pr.setFromNormalAndCoplanarPoint(t.getWorldDirection(pr.normal),Ql.setFromMatrixPosition(r.matrixWorld)),Kn.ray.intersectPlane(pr,Ro)&&(a.mode==="translate"?(mf.copy(r.parent.matrixWorld).invert(),pf.copy(Ro).sub(Ql.setFromMatrixPosition(r.matrixWorld))):a.mode==="rotate"&&(gf.set(0,1,0).applyQuaternion(t.quaternion).normalize(),vf.set(1,0,0).applyQuaternion(t.quaternion).normalize())),i.style.cursor="move",a.dispatchEvent({type:"dragstart",object:r})),Co.copy(On))}function p(){a.enabled!==!1&&(r&&(a.dispatchEvent({type:"dragend",object:r}),r=null),i.style.cursor=s?"pointer":"auto")}function f(y){let x=i.getBoundingClientRect();On.x=(y.clientX-x.left)/x.width*2-1,On.y=-(y.clientY-x.top)/x.height*2+1}function M(y,x=null){return y.isGroup&&(x=y),y.parent===null?x:M(y.parent,x)}l(),this.enabled=!0,this.recursive=!0,this.transformGroup=!1,this.activate=l,this.deactivate=c,this.dispose=u,this.getObjects=h,this.getRaycaster=m,this.setObjects=d}};function ec(n,e,t){var i,r=1;n==null&&(n=0),e==null&&(e=0),t==null&&(t=0);function s(){var o,a=i.length,l,c=0,u=0,h=0;for(o=0;o<a;++o)l=i[o],c+=l.x||0,u+=l.y||0,h+=l.z||0;for(c=(c/a-n)*r,u=(u/a-e)*r,h=(h/a-t)*r,o=0;o<a;++o)l=i[o],c&&(l.x-=c),u&&(l.y-=u),h&&(l.z-=h)}return s.initialize=function(o){i=o},s.x=function(o){return arguments.length?(n=+o,s):n},s.y=function(o){return arguments.length?(e=+o,s):e},s.z=function(o){return arguments.length?(t=+o,s):t},s.strength=function(o){return arguments.length?(r=+o,s):r},s}function yf(n){let e=+this._x.call(null,n);return _f(this.cover(e),e,n)}function _f(n,e,t){if(isNaN(e))return n;var i,r=n._root,s={data:t},o=n._x0,a=n._x1,l,c,u,h,d;if(!r)return n._root=s,n;for(;r.length;)if((u=e>=(l=(o+a)/2))?o=l:a=l,i=r,!(r=r[h=+u]))return i[h]=s,n;if(c=+n._x.call(null,r.data),e===c)return s.next=r,i?i[h]=s:n._root=s,n;do i=i?i[h]=new Array(2):n._root=new Array(2),(u=e>=(l=(o+a)/2))?o=l:a=l;while((h=+u)==(d=+(c>=l)));return i[d]=r,i[h]=s,n}function xf(n){Array.isArray(n)||(n=Array.from(n));let e=n.length,t=new Float64Array(e),i=1/0,r=-1/0;for(let s=0,o;s<e;++s)isNaN(o=+this._x.call(null,n[s]))||(t[s]=o,o<i&&(i=o),o>r&&(r=o));if(i>r)return this;this.cover(i).cover(r);for(let s=0;s<e;++s)_f(this,t[s],n[s]);return this}function bf(n){if(isNaN(n=+n))return this;var e=this._x0,t=this._x1;if(isNaN(e))t=(e=Math.floor(n))+1;else{for(var i=t-e||1,r=this._root,s,o;e>n||n>=t;)switch(o=+(n<e),s=new Array(2),s[o]=r,r=s,i*=2,o){case 0:t=e+i;break;case 1:e=t-i;break}this._root&&this._root.length&&(this._root=r)}return this._x0=e,this._x1=t,this}function Mf(){var n=[];return this.visit(function(e){if(!e.length)do n.push(e.data);while(e=e.next)}),n}function Sf(n){return arguments.length?this.cover(+n[0][0]).cover(+n[1][0]):isNaN(this._x0)?void 0:[[this._x0],[this._x1]]}function tn(n,e,t){this.node=n,this.x0=e,this.x1=t}function wf(n,e){var t,i=this._x0,r,s,o=this._x1,a=[],l=this._root,c,u;for(l&&a.push(new tn(l,i,o)),e==null?e=1/0:(i=n-e,o=n+e);c=a.pop();)if(!(!(l=c.node)||(r=c.x0)>o||(s=c.x1)<i))if(l.length){var h=(r+s)/2;a.push(new tn(l[1],h,s),new tn(l[0],r,h)),(u=+(n>=h))&&(c=a[a.length-1],a[a.length-1]=a[a.length-1-u],a[a.length-1-u]=c)}else{var d=Math.abs(n-+this._x.call(null,l.data));d<e&&(e=d,i=n-d,o=n+d,t=l.data)}return t}function Ef(n){if(isNaN(l=+this._x.call(null,n)))return this;var e,t=this._root,i,r,s,o=this._x0,a=this._x1,l,c,u,h,d;if(!t)return this;if(t.length)for(;;){if((u=l>=(c=(o+a)/2))?o=c:a=c,e=t,!(t=t[h=+u]))return this;if(!t.length)break;e[h+1&1]&&(i=e,d=h)}for(;t.data!==n;)if(r=t,!(t=t.next))return this;return(s=t.next)&&delete t.next,r?(s?r.next=s:delete r.next,this):e?(s?e[h]=s:delete e[h],(t=e[0]||e[1])&&t===(e[1]||e[0])&&!t.length&&(i?i[d]=t:this._root=t),this):(this._root=s,this)}function Af(n){for(var e=0,t=n.length;e<t;++e)this.remove(n[e]);return this}function Tf(){return this._root}function Cf(){var n=0;return this.visit(function(e){if(!e.length)do++n;while(e=e.next)}),n}function Rf(n){var e=[],t,i=this._root,r,s,o;for(i&&e.push(new tn(i,this._x0,this._x1));t=e.pop();)if(!n(i=t.node,s=t.x0,o=t.x1)&&i.length){var a=(s+o)/2;(r=i[1])&&e.push(new tn(r,a,o)),(r=i[0])&&e.push(new tn(r,s,a))}return this}function Pf(n){var e=[],t=[],i;for(this._root&&e.push(new tn(this._root,this._x0,this._x1));i=e.pop();){var r=i.node;if(r.length){var s,o=i.x0,a=i.x1,l=(o+a)/2;(s=r[0])&&e.push(new tn(s,o,l)),(s=r[1])&&e.push(new tn(s,l,a))}t.push(i)}for(;i=t.pop();)n(i.node,i.x0,i.x1);return this}function If(n){return n[0]}function Lf(n){return arguments.length?(this._x=n,this):this._x}function Kr(n,e){var t=new tc(e??If,NaN,NaN);return n==null?t:t.addAll(n)}function tc(n,e,t){this._x=n,this._x0=e,this._x1=t,this._root=void 0}function Of(n){for(var e={data:n.data},t=e;n=n.next;)t=t.next={data:n.data};return e}var kt=Kr.prototype=tc.prototype;kt.copy=function(){var n=new tc(this._x,this._x0,this._x1),e=this._root,t,i;if(!e)return n;if(!e.length)return n._root=Of(e),n;for(t=[{source:e,target:n._root=new Array(2)}];e=t.pop();)for(var r=0;r<2;++r)(i=e.source[r])&&(i.length?t.push({source:i,target:e.target[r]=new Array(2)}):e.target[r]=Of(i));return n};kt.add=yf;kt.addAll=xf;kt.cover=bf;kt.data=Mf;kt.extent=Sf;kt.find=wf;kt.remove=Ef;kt.removeAll=Af;kt.root=Tf;kt.size=Cf;kt.visit=Rf;kt.visitAfter=Pf;kt.x=Lf;function Df(n){let e=+this._x.call(null,n),t=+this._y.call(null,n);return Nf(this.cover(e,t),e,t,n)}function Nf(n,e,t,i){if(isNaN(e)||isNaN(t))return n;var r,s=n._root,o={data:i},a=n._x0,l=n._y0,c=n._x1,u=n._y1,h,d,m,g,v,p,f,M;if(!s)return n._root=o,n;for(;s.length;)if((v=e>=(h=(a+c)/2))?a=h:c=h,(p=t>=(d=(l+u)/2))?l=d:u=d,r=s,!(s=s[f=p<<1|v]))return r[f]=o,n;if(m=+n._x.call(null,s.data),g=+n._y.call(null,s.data),e===m&&t===g)return o.next=s,r?r[f]=o:n._root=o,n;do r=r?r[f]=new Array(4):n._root=new Array(4),(v=e>=(h=(a+c)/2))?a=h:c=h,(p=t>=(d=(l+u)/2))?l=d:u=d;while((f=p<<1|v)===(M=(g>=d)<<1|m>=h));return r[M]=s,r[f]=o,n}function Uf(n){var e,t,i=n.length,r,s,o=new Array(i),a=new Array(i),l=1/0,c=1/0,u=-1/0,h=-1/0;for(t=0;t<i;++t)isNaN(r=+this._x.call(null,e=n[t]))||isNaN(s=+this._y.call(null,e))||(o[t]=r,a[t]=s,r<l&&(l=r),r>u&&(u=r),s<c&&(c=s),s>h&&(h=s));if(l>u||c>h)return this;for(this.cover(l,c).cover(u,h),t=0;t<i;++t)Nf(this,o[t],a[t],n[t]);return this}function Ff(n,e){if(isNaN(n=+n)||isNaN(e=+e))return this;var t=this._x0,i=this._y0,r=this._x1,s=this._y1;if(isNaN(t))r=(t=Math.floor(n))+1,s=(i=Math.floor(e))+1;else{for(var o=r-t||1,a=this._root,l,c;t>n||n>=r||i>e||e>=s;)switch(c=(e<i)<<1|n<t,l=new Array(4),l[c]=a,a=l,o*=2,c){case 0:r=t+o,s=i+o;break;case 1:t=r-o,s=i+o;break;case 2:r=t+o,i=s-o;break;case 3:t=r-o,i=s-o;break}this._root&&this._root.length&&(this._root=a)}return this._x0=t,this._y0=i,this._x1=r,this._y1=s,this}function Bf(){var n=[];return this.visit(function(e){if(!e.length)do n.push(e.data);while(e=e.next)}),n}function kf(n){return arguments.length?this.cover(+n[0][0],+n[0][1]).cover(+n[1][0],+n[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function bt(n,e,t,i,r){this.node=n,this.x0=e,this.y0=t,this.x1=i,this.y1=r}function zf(n,e,t){var i,r=this._x0,s=this._y0,o,a,l,c,u=this._x1,h=this._y1,d=[],m=this._root,g,v;for(m&&d.push(new bt(m,r,s,u,h)),t==null?t=1/0:(r=n-t,s=e-t,u=n+t,h=e+t,t*=t);g=d.pop();)if(!(!(m=g.node)||(o=g.x0)>u||(a=g.y0)>h||(l=g.x1)<r||(c=g.y1)<s))if(m.length){var p=(o+l)/2,f=(a+c)/2;d.push(new bt(m[3],p,f,l,c),new bt(m[2],o,f,p,c),new bt(m[1],p,a,l,f),new bt(m[0],o,a,p,f)),(v=(e>=f)<<1|n>=p)&&(g=d[d.length-1],d[d.length-1]=d[d.length-1-v],d[d.length-1-v]=g)}else{var M=n-+this._x.call(null,m.data),y=e-+this._y.call(null,m.data),x=M*M+y*y;if(x<t){var A=Math.sqrt(t=x);r=n-A,s=e-A,u=n+A,h=e+A,i=m.data}}return i}function Vf(n){if(isNaN(u=+this._x.call(null,n))||isNaN(h=+this._y.call(null,n)))return this;var e,t=this._root,i,r,s,o=this._x0,a=this._y0,l=this._x1,c=this._y1,u,h,d,m,g,v,p,f;if(!t)return this;if(t.length)for(;;){if((g=u>=(d=(o+l)/2))?o=d:l=d,(v=h>=(m=(a+c)/2))?a=m:c=m,e=t,!(t=t[p=v<<1|g]))return this;if(!t.length)break;(e[p+1&3]||e[p+2&3]||e[p+3&3])&&(i=e,f=p)}for(;t.data!==n;)if(r=t,!(t=t.next))return this;return(s=t.next)&&delete t.next,r?(s?r.next=s:delete r.next,this):e?(s?e[p]=s:delete e[p],(t=e[0]||e[1]||e[2]||e[3])&&t===(e[3]||e[2]||e[1]||e[0])&&!t.length&&(i?i[f]=t:this._root=t),this):(this._root=s,this)}function Hf(n){for(var e=0,t=n.length;e<t;++e)this.remove(n[e]);return this}function Gf(){return this._root}function Wf(){var n=0;return this.visit(function(e){if(!e.length)do++n;while(e=e.next)}),n}function jf(n){var e=[],t,i=this._root,r,s,o,a,l;for(i&&e.push(new bt(i,this._x0,this._y0,this._x1,this._y1));t=e.pop();)if(!n(i=t.node,s=t.x0,o=t.y0,a=t.x1,l=t.y1)&&i.length){var c=(s+a)/2,u=(o+l)/2;(r=i[3])&&e.push(new bt(r,c,u,a,l)),(r=i[2])&&e.push(new bt(r,s,u,c,l)),(r=i[1])&&e.push(new bt(r,c,o,a,u)),(r=i[0])&&e.push(new bt(r,s,o,c,u))}return this}function Xf(n){var e=[],t=[],i;for(this._root&&e.push(new bt(this._root,this._x0,this._y0,this._x1,this._y1));i=e.pop();){var r=i.node;if(r.length){var s,o=i.x0,a=i.y0,l=i.x1,c=i.y1,u=(o+l)/2,h=(a+c)/2;(s=r[0])&&e.push(new bt(s,o,a,u,h)),(s=r[1])&&e.push(new bt(s,u,a,l,h)),(s=r[2])&&e.push(new bt(s,o,h,u,c)),(s=r[3])&&e.push(new bt(s,u,h,l,c))}t.push(i)}for(;i=t.pop();)n(i.node,i.x0,i.y0,i.x1,i.y1);return this}function qf(n){return n[0]}function Yf(n){return arguments.length?(this._x=n,this):this._x}function $f(n){return n[1]}function Zf(n){return arguments.length?(this._y=n,this):this._y}function Qr(n,e,t){var i=new nc(e??qf,t??$f,NaN,NaN,NaN,NaN);return n==null?i:i.addAll(n)}function nc(n,e,t,i,r,s){this._x=n,this._y=e,this._x0=t,this._y0=i,this._x1=r,this._y1=s,this._root=void 0}function Jf(n){for(var e={data:n.data},t=e;n=n.next;)t=t.next={data:n.data};return e}var Ft=Qr.prototype=nc.prototype;Ft.copy=function(){var n=new nc(this._x,this._y,this._x0,this._y0,this._x1,this._y1),e=this._root,t,i;if(!e)return n;if(!e.length)return n._root=Jf(e),n;for(t=[{source:e,target:n._root=new Array(4)}];e=t.pop();)for(var r=0;r<4;++r)(i=e.source[r])&&(i.length?t.push({source:i,target:e.target[r]=new Array(4)}):e.target[r]=Jf(i));return n};Ft.add=Df;Ft.addAll=Uf;Ft.cover=Ff;Ft.data=Bf;Ft.extent=kf;Ft.find=zf;Ft.remove=Vf;Ft.removeAll=Hf;Ft.root=Gf;Ft.size=Wf;Ft.visit=jf;Ft.visitAfter=Xf;Ft.x=Yf;Ft.y=Zf;function Kf(n){let e=+this._x.call(null,n),t=+this._y.call(null,n),i=+this._z.call(null,n);return Qf(this.cover(e,t,i),e,t,i,n)}function Qf(n,e,t,i,r){if(isNaN(e)||isNaN(t)||isNaN(i))return n;var s,o=n._root,a={data:r},l=n._x0,c=n._y0,u=n._z0,h=n._x1,d=n._y1,m=n._z1,g,v,p,f,M,y,x,A,w,T,R;if(!o)return n._root=a,n;for(;o.length;)if((x=e>=(g=(l+h)/2))?l=g:h=g,(A=t>=(v=(c+d)/2))?c=v:d=v,(w=i>=(p=(u+m)/2))?u=p:m=p,s=o,!(o=o[T=w<<2|A<<1|x]))return s[T]=a,n;if(f=+n._x.call(null,o.data),M=+n._y.call(null,o.data),y=+n._z.call(null,o.data),e===f&&t===M&&i===y)return a.next=o,s?s[T]=a:n._root=a,n;do s=s?s[T]=new Array(8):n._root=new Array(8),(x=e>=(g=(l+h)/2))?l=g:h=g,(A=t>=(v=(c+d)/2))?c=v:d=v,(w=i>=(p=(u+m)/2))?u=p:m=p;while((T=w<<2|A<<1|x)===(R=(y>=p)<<2|(M>=v)<<1|f>=g));return s[R]=o,s[T]=a,n}function ed(n){Array.isArray(n)||(n=Array.from(n));let e=n.length,t=new Float64Array(e),i=new Float64Array(e),r=new Float64Array(e),s=1/0,o=1/0,a=1/0,l=-1/0,c=-1/0,u=-1/0;for(let h=0,d,m,g,v;h<e;++h)isNaN(m=+this._x.call(null,d=n[h]))||isNaN(g=+this._y.call(null,d))||isNaN(v=+this._z.call(null,d))||(t[h]=m,i[h]=g,r[h]=v,m<s&&(s=m),m>l&&(l=m),g<o&&(o=g),g>c&&(c=g),v<a&&(a=v),v>u&&(u=v));if(s>l||o>c||a>u)return this;this.cover(s,o,a).cover(l,c,u);for(let h=0;h<e;++h)Qf(this,t[h],i[h],r[h],n[h]);return this}function td(n,e,t){if(isNaN(n=+n)||isNaN(e=+e)||isNaN(t=+t))return this;var i=this._x0,r=this._y0,s=this._z0,o=this._x1,a=this._y1,l=this._z1;if(isNaN(i))o=(i=Math.floor(n))+1,a=(r=Math.floor(e))+1,l=(s=Math.floor(t))+1;else{for(var c=o-i||1,u=this._root,h,d;i>n||n>=o||r>e||e>=a||s>t||t>=l;)switch(d=(t<s)<<2|(e<r)<<1|n<i,h=new Array(8),h[d]=u,u=h,c*=2,d){case 0:o=i+c,a=r+c,l=s+c;break;case 1:i=o-c,a=r+c,l=s+c;break;case 2:o=i+c,r=a-c,l=s+c;break;case 3:i=o-c,r=a-c,l=s+c;break;case 4:o=i+c,a=r+c,s=l-c;break;case 5:i=o-c,a=r+c,s=l-c;break;case 6:o=i+c,r=a-c,s=l-c;break;case 7:i=o-c,r=a-c,s=l-c;break}this._root&&this._root.length&&(this._root=u)}return this._x0=i,this._y0=r,this._z0=s,this._x1=o,this._y1=a,this._z1=l,this}function nd(){var n=[];return this.visit(function(e){if(!e.length)do n.push(e.data);while(e=e.next)}),n}function id(n){return arguments.length?this.cover(+n[0][0],+n[0][1],+n[0][2]).cover(+n[1][0],+n[1][1],+n[1][2]):isNaN(this._x0)?void 0:[[this._x0,this._y0,this._z0],[this._x1,this._y1,this._z1]]}function $e(n,e,t,i,r,s,o){this.node=n,this.x0=e,this.y0=t,this.z0=i,this.x1=r,this.y1=s,this.z1=o}function rd(n,e,t,i){var r,s=this._x0,o=this._y0,a=this._z0,l,c,u,h,d,m,g=this._x1,v=this._y1,p=this._z1,f=[],M=this._root,y,x;for(M&&f.push(new $e(M,s,o,a,g,v,p)),i==null?i=1/0:(s=n-i,o=e-i,a=t-i,g=n+i,v=e+i,p=t+i,i*=i);y=f.pop();)if(!(!(M=y.node)||(l=y.x0)>g||(c=y.y0)>v||(u=y.z0)>p||(h=y.x1)<s||(d=y.y1)<o||(m=y.z1)<a))if(M.length){var A=(l+h)/2,w=(c+d)/2,T=(u+m)/2;f.push(new $e(M[7],A,w,T,h,d,m),new $e(M[6],l,w,T,A,d,m),new $e(M[5],A,c,T,h,w,m),new $e(M[4],l,c,T,A,w,m),new $e(M[3],A,w,u,h,d,T),new $e(M[2],l,w,u,A,d,T),new $e(M[1],A,c,u,h,w,T),new $e(M[0],l,c,u,A,w,T)),(x=(t>=T)<<2|(e>=w)<<1|n>=A)&&(y=f[f.length-1],f[f.length-1]=f[f.length-1-x],f[f.length-1-x]=y)}else{var R=n-+this._x.call(null,M.data),S=e-+this._y.call(null,M.data),b=t-+this._z.call(null,M.data),U=R*R+S*S+b*b;if(U<i){var B=Math.sqrt(i=U);s=n-B,o=e-B,a=t-B,g=n+B,v=e+B,p=t+B,r=M.data}}return r}function sd(n){if(isNaN(d=+this._x.call(null,n))||isNaN(m=+this._y.call(null,n))||isNaN(g=+this._z.call(null,n)))return this;var e,t=this._root,i,r,s,o=this._x0,a=this._y0,l=this._z0,c=this._x1,u=this._y1,h=this._z1,d,m,g,v,p,f,M,y,x,A,w;if(!t)return this;if(t.length)for(;;){if((M=d>=(v=(o+c)/2))?o=v:c=v,(y=m>=(p=(a+u)/2))?a=p:u=p,(x=g>=(f=(l+h)/2))?l=f:h=f,e=t,!(t=t[A=x<<2|y<<1|M]))return this;if(!t.length)break;(e[A+1&7]||e[A+2&7]||e[A+3&7]||e[A+4&7]||e[A+5&7]||e[A+6&7]||e[A+7&7])&&(i=e,w=A)}for(;t.data!==n;)if(r=t,!(t=t.next))return this;return(s=t.next)&&delete t.next,r?(s?r.next=s:delete r.next,this):e?(s?e[A]=s:delete e[A],(t=e[0]||e[1]||e[2]||e[3]||e[4]||e[5]||e[6]||e[7])&&t===(e[7]||e[6]||e[5]||e[4]||e[3]||e[2]||e[1]||e[0])&&!t.length&&(i?i[w]=t:this._root=t),this):(this._root=s,this)}function od(n){for(var e=0,t=n.length;e<t;++e)this.remove(n[e]);return this}function ad(){return this._root}function ld(){var n=0;return this.visit(function(e){if(!e.length)do++n;while(e=e.next)}),n}function cd(n){var e=[],t,i=this._root,r,s,o,a,l,c,u;for(i&&e.push(new $e(i,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));t=e.pop();)if(!n(i=t.node,s=t.x0,o=t.y0,a=t.z0,l=t.x1,c=t.y1,u=t.z1)&&i.length){var h=(s+l)/2,d=(o+c)/2,m=(a+u)/2;(r=i[7])&&e.push(new $e(r,h,d,m,l,c,u)),(r=i[6])&&e.push(new $e(r,s,d,m,h,c,u)),(r=i[5])&&e.push(new $e(r,h,o,m,l,d,u)),(r=i[4])&&e.push(new $e(r,s,o,m,h,d,u)),(r=i[3])&&e.push(new $e(r,h,d,a,l,c,m)),(r=i[2])&&e.push(new $e(r,s,d,a,h,c,m)),(r=i[1])&&e.push(new $e(r,h,o,a,l,d,m)),(r=i[0])&&e.push(new $e(r,s,o,a,h,d,m))}return this}function ud(n){var e=[],t=[],i;for(this._root&&e.push(new $e(this._root,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));i=e.pop();){var r=i.node;if(r.length){var s,o=i.x0,a=i.y0,l=i.z0,c=i.x1,u=i.y1,h=i.z1,d=(o+c)/2,m=(a+u)/2,g=(l+h)/2;(s=r[0])&&e.push(new $e(s,o,a,l,d,m,g)),(s=r[1])&&e.push(new $e(s,d,a,l,c,m,g)),(s=r[2])&&e.push(new $e(s,o,m,l,d,u,g)),(s=r[3])&&e.push(new $e(s,d,m,l,c,u,g)),(s=r[4])&&e.push(new $e(s,o,a,g,d,m,h)),(s=r[5])&&e.push(new $e(s,d,a,g,c,m,h)),(s=r[6])&&e.push(new $e(s,o,m,g,d,u,h)),(s=r[7])&&e.push(new $e(s,d,m,g,c,u,h))}t.push(i)}for(;i=t.pop();)n(i.node,i.x0,i.y0,i.z0,i.x1,i.y1,i.z1);return this}function hd(n){return n[0]}function fd(n){return arguments.length?(this._x=n,this):this._x}function dd(n){return n[1]}function pd(n){return arguments.length?(this._y=n,this):this._y}function md(n){return n[2]}function gd(n){return arguments.length?(this._z=n,this):this._z}function es(n,e,t,i){var r=new ic(e??hd,t??dd,i??md,NaN,NaN,NaN,NaN,NaN,NaN);return n==null?r:r.addAll(n)}function ic(n,e,t,i,r,s,o,a,l){this._x=n,this._y=e,this._z=t,this._x0=i,this._y0=r,this._z0=s,this._x1=o,this._y1=a,this._z1=l,this._root=void 0}function vd(n){for(var e={data:n.data},t=e;n=n.next;)t=t.next={data:n.data};return e}var Rt=es.prototype=ic.prototype;Rt.copy=function(){var n=new ic(this._x,this._y,this._z,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1),e=this._root,t,i;if(!e)return n;if(!e.length)return n._root=vd(e),n;for(t=[{source:e,target:n._root=new Array(8)}];e=t.pop();)for(var r=0;r<8;++r)(i=e.source[r])&&(i.length?t.push({source:i,target:e.target[r]=new Array(8)}):e.target[r]=vd(i));return n};Rt.add=Kf;Rt.addAll=ed;Rt.cover=td;Rt.data=nd;Rt.extent=id;Rt.find=rd;Rt.remove=sd;Rt.removeAll=od;Rt.root=ad;Rt.size=ld;Rt.visit=cd;Rt.visitAfter=ud;Rt.x=fd;Rt.y=pd;Rt.z=gd;function nn(n){return function(){return n}}function fn(n){return(n()-.5)*1e-6}function hb(n){return n.index}function yd(n,e){var t=n.get(e);if(!t)throw new Error("node not found: "+e);return t}function rc(n){var e=hb,t=d,i,r=nn(30),s,o,a,l,c,u,h=1;n==null&&(n=[]);function d(f){return 1/Math.min(l[f.source.index],l[f.target.index])}function m(f){for(var M=0,y=n.length;M<h;++M)for(var x=0,A,w,T,R=0,S=0,b=0,U,B;x<y;++x)A=n[x],w=A.source,T=A.target,R=T.x+T.vx-w.x-w.vx||fn(u),a>1&&(S=T.y+T.vy-w.y-w.vy||fn(u)),a>2&&(b=T.z+T.vz-w.z-w.vz||fn(u)),U=Math.sqrt(R*R+S*S+b*b),U=(U-s[x])/U*f*i[x],R*=U,S*=U,b*=U,T.vx-=R*(B=c[x]),a>1&&(T.vy-=S*B),a>2&&(T.vz-=b*B),w.vx+=R*(B=1-B),a>1&&(w.vy+=S*B),a>2&&(w.vz+=b*B)}function g(){if(o){var f,M=o.length,y=n.length,x=new Map(o.map((w,T)=>[e(w,T,o),w])),A;for(f=0,l=new Array(M);f<y;++f)A=n[f],A.index=f,typeof A.source!="object"&&(A.source=yd(x,A.source)),typeof A.target!="object"&&(A.target=yd(x,A.target)),l[A.source.index]=(l[A.source.index]||0)+1,l[A.target.index]=(l[A.target.index]||0)+1;for(f=0,c=new Array(y);f<y;++f)A=n[f],c[f]=l[A.source.index]/(l[A.source.index]+l[A.target.index]);i=new Array(y),v(),s=new Array(y),p()}}function v(){if(o)for(var f=0,M=n.length;f<M;++f)i[f]=+t(n[f],f,n)}function p(){if(o)for(var f=0,M=n.length;f<M;++f)s[f]=+r(n[f],f,n)}return m.initialize=function(f,...M){o=f,u=M.find(y=>typeof y=="function")||Math.random,a=M.find(y=>[1,2,3].includes(y))||2,g()},m.links=function(f){return arguments.length?(n=f,g(),m):n},m.id=function(f){return arguments.length?(e=f,m):e},m.iterations=function(f){return arguments.length?(h=+f,m):h},m.strength=function(f){return arguments.length?(t=typeof f=="function"?f:nn(+f),v(),m):t},m.distance=function(f){return arguments.length?(r=typeof f=="function"?f:nn(+f),p(),m):r},m}var fb={value:()=>{}};function xd(){for(var n=0,e=arguments.length,t={},i;n<e;++n){if(!(i=arguments[n]+"")||i in t||/[\s.]/.test(i))throw new Error("illegal type: "+i);t[i]=[]}return new Io(t)}function Io(n){this._=n}function db(n,e){return n.trim().split(/^|\s+/).map(function(t){var i="",r=t.indexOf(".");if(r>=0&&(i=t.slice(r+1),t=t.slice(0,r)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:i}})}Io.prototype=xd.prototype={constructor:Io,on:function(n,e){var t=this._,i=db(n+"",t),r,s=-1,o=i.length;if(arguments.length<2){for(;++s<o;)if((r=(n=i[s]).type)&&(r=pb(t[r],n.name)))return r;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(r=(n=i[s]).type)t[r]=_d(t[r],n.name,e);else if(e==null)for(r in t)t[r]=_d(t[r],n.name,null);return this},copy:function(){var n={},e=this._;for(var t in e)n[t]=e[t].slice();return new Io(n)},call:function(n,e){if((r=arguments.length-2)>0)for(var t=new Array(r),i=0,r,s;i<r;++i)t[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],i=0,r=s.length;i<r;++i)s[i].value.apply(e,t)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],r=0,s=i.length;r<s;++r)i[r].value.apply(e,t)}};function pb(n,e){for(var t=0,i=n.length,r;t<i;++t)if((r=n[t]).name===e)return r.value}function _d(n,e,t){for(var i=0,r=n.length;i<r;++i)if(n[i].name===e){n[i]=fb,n=n.slice(0,i).concat(n.slice(i+1));break}return t!=null&&n.push({name:e,value:t}),n}var sc=xd;var mr=0,ns=0,ts=0,Md=1e3,Lo,is,Oo=0,wi=0,Do=0,rs=typeof performance=="object"&&performance.now?performance:Date,Sd=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function lc(){return wi||(Sd(mb),wi=rs.now()+Do)}function mb(){wi=0}function oc(){this._call=this._time=this._next=null}oc.prototype=No.prototype={constructor:oc,restart:function(n,e,t){if(typeof n!="function")throw new TypeError("callback is not a function");t=(t==null?lc():+t)+(e==null?0:+e),!this._next&&is!==this&&(is?is._next=this:Lo=this,is=this),this._call=n,this._time=t,ac()},stop:function(){this._call&&(this._call=null,this._time=1/0,ac())}};function No(n,e,t){var i=new oc;return i.restart(n,e,t),i}function wd(){lc(),++mr;for(var n=Lo,e;n;)(e=wi-n._time)>=0&&n._call.call(void 0,e),n=n._next;--mr}function bd(){wi=(Oo=rs.now())+Do,mr=ns=0;try{wd()}finally{mr=0,vb(),wi=0}}function gb(){var n=rs.now(),e=n-Oo;e>Md&&(Do-=e,Oo=n)}function vb(){for(var n,e=Lo,t,i=1/0;e;)e._call?(i>e._time&&(i=e._time),n=e,e=e._next):(t=e._next,e._next=null,e=n?n._next=t:Lo=t);is=n,ac(i)}function ac(n){if(!mr){ns&&(ns=clearTimeout(ns));var e=n-wi;e>24?(n<1/0&&(ns=setTimeout(bd,n-rs.now()-Do)),ts&&(ts=clearInterval(ts))):(ts||(Oo=rs.now(),ts=setInterval(gb,Md)),mr=1,Sd(bd))}}function Ed(){let n=1;return()=>(n=(1664525*n+1013904223)%4294967296)/4294967296}var Ad=3;function Uo(n){return n.x}function cc(n){return n.y}function Td(n){return n.z}var yb=10,_b=Math.PI*(3-Math.sqrt(5)),xb=Math.PI*20/(9+Math.sqrt(221));function uc(n,e){e=e||2;var t=Math.min(Ad,Math.max(1,Math.round(e))),i,r=1,s=.001,o=1-Math.pow(s,1/300),a=0,l=.6,c=new Map,u=No(m),h=sc("tick","end"),d=Ed();n==null&&(n=[]);function m(){g(),h.call("tick",i),r<s&&(u.stop(),h.call("end",i))}function g(f){var M,y=n.length,x;f===void 0&&(f=1);for(var A=0;A<f;++A)for(r+=(a-r)*o,c.forEach(function(w){w(r)}),M=0;M<y;++M)x=n[M],x.fx==null?x.x+=x.vx*=l:(x.x=x.fx,x.vx=0),t>1&&(x.fy==null?x.y+=x.vy*=l:(x.y=x.fy,x.vy=0)),t>2&&(x.fz==null?x.z+=x.vz*=l:(x.z=x.fz,x.vz=0));return i}function v(){for(var f=0,M=n.length,y;f<M;++f){if(y=n[f],y.index=f,y.fx!=null&&(y.x=y.fx),y.fy!=null&&(y.y=y.fy),y.fz!=null&&(y.z=y.fz),isNaN(y.x)||t>1&&isNaN(y.y)||t>2&&isNaN(y.z)){var x=yb*(t>2?Math.cbrt(.5+f):t>1?Math.sqrt(.5+f):f),A=f*_b,w=f*xb;t===1?y.x=x:t===2?(y.x=x*Math.cos(A),y.y=x*Math.sin(A)):(y.x=x*Math.sin(A)*Math.cos(w),y.y=x*Math.cos(A),y.z=x*Math.sin(A)*Math.sin(w))}(isNaN(y.vx)||t>1&&isNaN(y.vy)||t>2&&isNaN(y.vz))&&(y.vx=0,t>1&&(y.vy=0),t>2&&(y.vz=0))}}function p(f){return f.initialize&&f.initialize(n,d,t),f}return v(),i={tick:g,restart:function(){return u.restart(m),i},stop:function(){return u.stop(),i},numDimensions:function(f){return arguments.length?(t=Math.min(Ad,Math.max(1,Math.round(f))),c.forEach(p),i):t},nodes:function(f){return arguments.length?(n=f,v(),c.forEach(p),i):n},alpha:function(f){return arguments.length?(r=+f,i):r},alphaMin:function(f){return arguments.length?(s=+f,i):s},alphaDecay:function(f){return arguments.length?(o=+f,i):+o},alphaTarget:function(f){return arguments.length?(a=+f,i):a},velocityDecay:function(f){return arguments.length?(l=1-f,i):1-l},randomSource:function(f){return arguments.length?(d=f,c.forEach(p),i):d},force:function(f,M){return arguments.length>1?(M==null?c.delete(f):c.set(f,p(M)),i):c.get(f)},find:function(){var f=Array.prototype.slice.call(arguments),M=f.shift()||0,y=(t>1?f.shift():null)||0,x=(t>2?f.shift():null)||0,A=f.shift()||1/0,w=0,T=n.length,R,S,b,U,B,D;for(A*=A,w=0;w<T;++w)B=n[w],R=M-B.x,S=y-(B.y||0),b=x-(B.z||0),U=R*R+S*S+b*b,U<A&&(D=B,A=U);return D},on:function(f,M){return arguments.length>1?(h.on(f,M),i):h.on(f)}}}function hc(){var n,e,t,i,r,s=nn(-30),o,a=1,l=1/0,c=.81;function u(g){var v,p=n.length,f=(e===1?Kr(n,Uo):e===2?Qr(n,Uo,cc):e===3?es(n,Uo,cc,Td):null).visitAfter(d);for(r=g,v=0;v<p;++v)t=n[v],f.visit(m)}function h(){if(n){var g,v=n.length,p;for(o=new Array(v),g=0;g<v;++g)p=n[g],o[p.index]=+s(p,g,n)}}function d(g){var v=0,p,f,M=0,y,x,A,w,T=g.length;if(T){for(y=x=A=w=0;w<T;++w)(p=g[w])&&(f=Math.abs(p.value))&&(v+=p.value,M+=f,y+=f*(p.x||0),x+=f*(p.y||0),A+=f*(p.z||0));v*=Math.sqrt(4/T),g.x=y/M,e>1&&(g.y=x/M),e>2&&(g.z=A/M)}else{p=g,p.x=p.data.x,e>1&&(p.y=p.data.y),e>2&&(p.z=p.data.z);do v+=o[p.data.index];while(p=p.next)}g.value=v}function m(g,v,p,f,M){if(!g.value)return!0;var y=[p,f,M][e-1],x=g.x-t.x,A=e>1?g.y-t.y:0,w=e>2?g.z-t.z:0,T=y-v,R=x*x+A*A+w*w;if(T*T/c<R)return R<l&&(x===0&&(x=fn(i),R+=x*x),e>1&&A===0&&(A=fn(i),R+=A*A),e>2&&w===0&&(w=fn(i),R+=w*w),R<a&&(R=Math.sqrt(a*R)),t.vx+=x*g.value*r/R,e>1&&(t.vy+=A*g.value*r/R),e>2&&(t.vz+=w*g.value*r/R)),!0;if(g.length||R>=l)return;(g.data!==t||g.next)&&(x===0&&(x=fn(i),R+=x*x),e>1&&A===0&&(A=fn(i),R+=A*A),e>2&&w===0&&(w=fn(i),R+=w*w),R<a&&(R=Math.sqrt(a*R)));do g.data!==t&&(T=o[g.data.index]*r/R,t.vx+=x*T,e>1&&(t.vy+=A*T),e>2&&(t.vz+=w*T));while(g=g.next)}return u.initialize=function(g,...v){n=g,i=v.find(p=>typeof p=="function")||Math.random,e=v.find(p=>[1,2,3].includes(p))||2,h()},u.strength=function(g){return arguments.length?(s=typeof g=="function"?g:nn(+g),h(),u):s},u.distanceMin=function(g){return arguments.length?(a=g*g,u):Math.sqrt(a)},u.distanceMax=function(g){return arguments.length?(l=g*g,u):Math.sqrt(l)},u.theta=function(g){return arguments.length?(c=g*g,u):Math.sqrt(c)},u}function fc(n,e,t,i){var r,s,o=nn(.1),a,l;typeof n!="function"&&(n=nn(+n)),e==null&&(e=0),t==null&&(t=0),i==null&&(i=0);function c(h){for(var d=0,m=r.length;d<m;++d){var g=r[d],v=g.x-e||1e-6,p=(g.y||0)-t||1e-6,f=(g.z||0)-i||1e-6,M=Math.sqrt(v*v+p*p+f*f),y=(l[d]-M)*a[d]*h/M;g.vx+=v*y,s>1&&(g.vy+=p*y),s>2&&(g.vz+=f*y)}}function u(){if(r){var h,d=r.length;for(a=new Array(d),l=new Array(d),h=0;h<d;++h)l[h]=+n(r[h],h,r),a[h]=isNaN(l[h])?0:+o(r[h],h,r)}}return c.initialize=function(h,...d){r=h,s=d.find(m=>[1,2,3].includes(m))||2,u()},c.strength=function(h){return arguments.length?(o=typeof h=="function"?h:nn(+h),u(),c):o},c.radius=function(h){return arguments.length?(n=typeof h=="function"?h:nn(+h),u(),c):n},c.x=function(h){return arguments.length?(e=+h,c):e},c.y=function(h){return arguments.length?(t=+h,c):t},c.z=function(h){return arguments.length?(i=+h,c):i},c}var $p=uu(Ld(),1),Zp=uu(hp(),1);function eM(n){var e=typeof n;return n!=null&&(e=="object"||e=="function")}var os=eM;var tM=typeof global=="object"&&global&&global.Object===Object&&global,fp=tM;var nM=typeof self=="object"&&self&&self.Object===Object&&self,iM=fp||nM||Function("return this")(),zo=iM;var rM=function(){return zo.Date.now()},Vo=rM;var sM=/\s/;function oM(n){for(var e=n.length;e--&&sM.test(n.charAt(e)););return e}var dp=oM;var aM=/^\s+/;function lM(n){return n&&n.slice(0,dp(n)+1).replace(aM,"")}var pp=lM;var cM=zo.Symbol,vr=cM;var mp=Object.prototype,uM=mp.hasOwnProperty,hM=mp.toString,as=vr?vr.toStringTag:void 0;function fM(n){var e=uM.call(n,as),t=n[as];try{n[as]=void 0;var i=!0}catch{}var r=hM.call(n);return i&&(e?n[as]=t:delete n[as]),r}var gp=fM;var dM=Object.prototype,pM=dM.toString;function mM(n){return pM.call(n)}var vp=mM;var gM="[object Null]",vM="[object Undefined]",yp=vr?vr.toStringTag:void 0;function yM(n){return n==null?n===void 0?vM:gM:yp&&yp in Object(n)?gp(n):vp(n)}var _p=yM;function _M(n){return n!=null&&typeof n=="object"}var xp=_M;var xM="[object Symbol]";function bM(n){return typeof n=="symbol"||xp(n)&&_p(n)==xM}var bp=bM;var Mp=NaN,MM=/^[-+]0x[0-9a-f]+$/i,SM=/^0b[01]+$/i,wM=/^0o[0-7]+$/i,EM=parseInt;function AM(n){if(typeof n=="number")return n;if(bp(n))return Mp;if(os(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=os(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=pp(n);var t=SM.test(n);return t||wM.test(n)?EM(n.slice(2),t?2:8):MM.test(n)?Mp:+n}var Mc=AM;var TM="Expected a function",CM=Math.max,RM=Math.min;function PM(n,e,t){var i,r,s,o,a,l,c=0,u=!1,h=!1,d=!0;if(typeof n!="function")throw new TypeError(TM);e=Mc(e)||0,os(t)&&(u=!!t.leading,h="maxWait"in t,s=h?CM(Mc(t.maxWait)||0,e):s,d="trailing"in t?!!t.trailing:d);function m(w){var T=i,R=r;return i=r=void 0,c=w,o=n.apply(R,T),o}function g(w){return c=w,a=setTimeout(f,e),u?m(w):o}function v(w){var T=w-l,R=w-c,S=e-T;return h?RM(S,s-R):S}function p(w){var T=w-l,R=w-c;return l===void 0||T>=e||T<0||h&&R>=s}function f(){var w=Vo();if(p(w))return M(w);a=setTimeout(f,v(w))}function M(w){return a=void 0,d&&i?m(w):(i=r=void 0,o)}function y(){a!==void 0&&clearTimeout(a),c=0,i=l=r=a=void 0}function x(){return a===void 0?o:M(Vo())}function A(){var w=Vo(),T=p(w);if(i=arguments,r=this,l=w,T){if(a===void 0)return g(l);if(h)return clearTimeout(a),a=setTimeout(f,e),m(l)}return a===void 0&&(a=setTimeout(f,e)),o}return A.cancel=y,A.flush=x,A}var Sp=PM;function IM(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function LM(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function wp(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,kM(i.key),i)}}function OM(n,e,t){return e&&wp(n.prototype,e),t&&wp(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function DM(n,e){return NM(n)||IM(n,e)||UM(n,e)||FM()}function NM(n){if(Array.isArray(n))return n}function UM(n,e){if(n){if(typeof n=="string")return Ep(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Ep(n,e)}}function Ep(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function FM(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function BM(n,e){if(typeof n!="object"||n===null)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function kM(n){var e=BM(n,"string");return typeof e=="symbol"?e:String(e)}var zM=OM(function n(e,t){var i=t.default,r=i===void 0?null:i,s=t.triggerUpdate,o=s===void 0?!0:s,a=t.onChange,l=a===void 0?function(c,u){}:a;LM(this,n),this.name=e,this.defaultVal=r,this.triggerUpdate=o,this.onChange=l});function yr(n){var e=n.stateInit,t=e===void 0?function(){return{}}:e,i=n.props,r=i===void 0?{}:i,s=n.methods,o=s===void 0?{}:s,a=n.aliases,l=a===void 0?{}:a,c=n.init,u=c===void 0?function(){}:c,h=n.update,d=h===void 0?function(){}:h,m=Object.keys(r).map(function(g){return new zM(g,r[g])});return function(){var g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},v=Object.assign({},t instanceof Function?t(g):t,{initialised:!1}),p={};function f(x){return M(x,g),y(),f}var M=function(A,w){u.call(f,A,v,w),v.initialised=!0},y=Sp(function(){v.initialised&&(d.call(f,v,p),p={})},1);return m.forEach(function(x){f[x.name]=A(x);function A(w){var T=w.name,R=w.triggerUpdate,S=R===void 0?!1:R,b=w.onChange,U=b===void 0?function(I,O){}:b,B=w.defaultVal,D=B===void 0?null:B;return function(I){var O=v[T];if(!arguments.length)return O;var k=I===void 0?D:I;return v[T]=k,U.call(f,k,v,O),!p.hasOwnProperty(T)&&(p[T]=O),S&&y(),f}}}),Object.keys(o).forEach(function(x){f[x]=function(){for(var A,w=arguments.length,T=new Array(w),R=0;R<w;R++)T[R]=arguments[R];return(A=o[x]).call.apply(A,[f,v].concat(T))}}),Object.entries(l).forEach(function(x){var A=DM(x,2),w=A[0],T=A[1];return f[w]=f[T]}),f.resetProps=function(){return m.forEach(function(x){f[x.name](x.defaultVal)}),f},f.resetProps(),v._rerender=y,f}}var je=function(n){return typeof n=="function"?n:typeof n=="string"?function(e){return e[n]}:function(e){return n}};var _r=class extends Map{constructor(e,t=GM){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),e!=null)for(let[i,r]of e)this.set(i,r)}get(e){return super.get(Ap(this,e))}has(e){return super.has(Ap(this,e))}set(e,t){return super.set(VM(this,e),t)}delete(e){return super.delete(HM(this,e))}};function Ap({_intern:n,_key:e},t){let i=e(t);return n.has(i)?n.get(i):t}function VM({_intern:n,_key:e},t){let i=e(t);return n.has(i)?n.get(i):(n.set(i,t),t)}function HM({_intern:n,_key:e},t){let i=e(t);return n.has(i)&&(t=n.get(i),n.delete(i)),t}function GM(n){return n!==null&&typeof n=="object"?n.valueOf():n}function Ho(n,e){let t;if(e===void 0)for(let i of n)i!=null&&(t<i||t===void 0&&i>=i)&&(t=i);else{let i=-1;for(let r of n)(r=e(r,++i,n))!=null&&(t<r||t===void 0&&r>=r)&&(t=r)}return t}function Go(n,e){let t;if(e===void 0)for(let i of n)i!=null&&(t>i||t===void 0&&i>=i)&&(t=i);else{let i=-1;for(let r of n)(r=e(r,++i,n))!=null&&(t>r||t===void 0&&r>=r)&&(t=r)}return t}function WM(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function jM(n,e){if(n==null)return{};var t={},i=Object.keys(n),r,s;for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&(t[r]=n[r]);return t}function XM(n,e){if(n==null)return{};var t=jM(n,e),i,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(r=0;r<s.length;r++)i=s[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(n,i)&&(t[i]=n[i])}return t}function qM(n,e){return ZM(n)||WM(n,e)||Tp(n,e)||QM()}function YM(n){return $M(n)||JM(n)||Tp(n)||KM()}function $M(n){if(Array.isArray(n))return Sc(n)}function ZM(n){if(Array.isArray(n))return n}function JM(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Tp(n,e){if(n){if(typeof n=="string")return Sc(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Sc(n,e)}}function Sc(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function KM(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function QM(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function eS(n,e){if(typeof n!="object"||n===null)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function tS(n){var e=eS(n,"string");return typeof e=="symbol"?e:String(e)}var wc=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1,r=(e instanceof Array?e.length?e:[void 0]:[e]).map(function(a){return{keyAccessor:a,isProp:!(a instanceof Function)}}),s=n.reduce(function(a,l){var c=a,u=l;return r.forEach(function(h,d){var m=h.keyAccessor,g=h.isProp,v;if(g){var p=u,f=p[m],M=XM(p,[m].map(tS));v=f,u=M}else v=m(u,d);d+1<r.length?(c.hasOwnProperty(v)||(c[v]={}),c=c[v]):t?(c.hasOwnProperty(v)||(c[v]=[]),c[v].push(u)):c[v]=u}),a},{});t instanceof Function&&function a(l){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;c===r.length?Object.keys(l).forEach(function(u){return l[u]=t(l[u])}):Object.values(l).forEach(function(u){return a(u,c+1)})}(s);var o=s;return i&&(o=[],function a(l){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];c.length===r.length?o.push({keys:c,vals:l}):Object.entries(l).forEach(function(u){var h=qM(u,2),d=h[0],m=h[1];return a(m,[].concat(YM(c),[d]))})}(s),e instanceof Array&&e.length===0&&o.length===1&&(o[0].keys=[])),o};function nS(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function Cp(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function iS(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Cp(Object(t),!0).forEach(function(i){Rp(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Cp(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function Rp(n,e,t){return e=fS(e),e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function rS(n,e){if(n==null)return{};var t={},i=Object.keys(n),r,s;for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&(t[r]=n[r]);return t}function sS(n,e){if(n==null)return{};var t=rS(n,e),i,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(r=0;r<s.length;r++)i=s[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(n,i)&&(t[i]=n[i])}return t}function Pp(n,e){return aS(n)||nS(n,e)||Ip(n,e)||uS()}function Wo(n){return oS(n)||lS(n)||Ip(n)||cS()}function oS(n){if(Array.isArray(n))return Ec(n)}function aS(n){if(Array.isArray(n))return n}function lS(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Ip(n,e){if(n){if(typeof n=="string")return Ec(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Ec(n,e)}}function Ec(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function cS(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function uS(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function hS(n,e){if(typeof n!="object"||n===null)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function fS(n){var e=hS(n,"string");return typeof e=="symbol"?e:String(e)}var dS=["createObj","updateObj","exitObj","objBindAttr","dataBindAttr"];function pS(n,e,t){var i={enter:[],update:[],exit:[]};if(t){var o=wc(n,t,!1),a=wc(e,t,!1),l=Object.assign({},o,a);Object.entries(l).forEach(function(c){var u=Pp(c,2),h=u[0],d=u[1],m=o.hasOwnProperty(h)?a.hasOwnProperty(h)?"update":"exit":"enter";i[m].push(m==="update"?[o[h],a[h]]:d)})}else{var r=new Set(n),s=new Set(e);new Set([].concat(Wo(r),Wo(s))).forEach(function(c){var u=r.has(c)?s.has(c)?"update":"exit":"enter";i[u].push(u==="update"?[c,c]:c)})}return i}function mS(n,e,t){var i=t.objBindAttr,r=i===void 0?"__obj":i,s=t.dataBindAttr,o=s===void 0?"__data":s,a=t.idAccessor,l=t.purge,c=l===void 0?!1:l,u=function(p){return p.hasOwnProperty(o)},h=e.filter(function(v){return!u(v)}),d=e.filter(u).map(function(v){return v[o]}),m=n,g=c?{enter:m,exit:d,update:[]}:pS(d,m,a);return g.update=g.update.map(function(v){var p=Pp(v,2),f=p[0],M=p[1];return f!==M&&(M[r]=f[r],M[r][o]=M),M}),g.exit=g.exit.concat(h.map(function(v){return Rp({},r,v)})),g}function Lp(n,e,t,i,r){var s=r.createObj,o=s===void 0?function(R){return{}}:s,a=r.updateObj,l=a===void 0?function(R,S){}:a,c=r.exitObj,u=c===void 0?function(R){}:c,h=r.objBindAttr,d=h===void 0?"__obj":h,m=r.dataBindAttr,g=m===void 0?"__data":m,v=sS(r,dS),p=mS(n,e,iS({objBindAttr:d,dataBindAttr:g},v)),f=p.enter,M=p.update,y=p.exit;y.forEach(function(R){var S=R[d];delete R[d],u(S),i(S)});var x=w(f),A=[].concat(Wo(f),Wo(M));T(A),x.forEach(t);function w(R){var S=[];return R.forEach(function(b){var U=o(b);U&&(U[g]=b,b[d]=U,S.push(U))}),S}function T(R){R.forEach(function(S){var b=S[d];b&&(b[g]=S,l(b,S))})}}function Op(n,e){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(e).domain(n);break}return this}var Ac=Symbol("implicit");function ls(){var n=new _r,e=[],t=[],i=Ac;function r(s){let o=n.get(s);if(o===void 0){if(i!==Ac)return i;n.set(s,o=e.push(s)-1)}return t[o%t.length]}return r.domain=function(s){if(!arguments.length)return e.slice();e=[],n=new _r;for(let o of s)n.has(o)||n.set(o,e.push(o)-1);return r},r.range=function(s){return arguments.length?(t=Array.from(s),r):t.slice()},r.unknown=function(s){return arguments.length?(i=s,r):i},r.copy=function(){return ls(e,t).unknown(i)},Op.apply(r,arguments),r}function Dp(n){for(var e=n.length/6|0,t=new Array(e),i=0;i<e;)t[i]="#"+n.slice(i*6,++i*6);return t}var Tc=Dp("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");function jo(n){"@babel/helpers - typeof";return jo=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},jo(n)}var gS=/^\s+/,vS=/\s+$/;function _e(n,e){if(n=n||"",e=e||{},n instanceof _e)return n;if(!(this instanceof _e))return new _e(n,e);var t=yS(n);this._originalInput=n,this._r=t.r,this._g=t.g,this._b=t.b,this._a=t.a,this._roundA=Math.round(100*this._a)/100,this._format=e.format||t.format,this._gradientType=e.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=t.ok}_e.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3},getLuminance:function(){var e=this.toRgb(),t,i,r,s,o,a;return t=e.r/255,i=e.g/255,r=e.b/255,t<=.03928?s=t/12.92:s=Math.pow((t+.055)/1.055,2.4),i<=.03928?o=i/12.92:o=Math.pow((i+.055)/1.055,2.4),r<=.03928?a=r/12.92:a=Math.pow((r+.055)/1.055,2.4),.2126*s+.7152*o+.0722*a},setAlpha:function(e){return this._a=Vp(e),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var e=Up(this._r,this._g,this._b);return{h:e.h*360,s:e.s,v:e.v,a:this._a}},toHsvString:function(){var e=Up(this._r,this._g,this._b),t=Math.round(e.h*360),i=Math.round(e.s*100),r=Math.round(e.v*100);return this._a==1?"hsv("+t+", "+i+"%, "+r+"%)":"hsva("+t+", "+i+"%, "+r+"%, "+this._roundA+")"},toHsl:function(){var e=Np(this._r,this._g,this._b);return{h:e.h*360,s:e.s,l:e.l,a:this._a}},toHslString:function(){var e=Np(this._r,this._g,this._b),t=Math.round(e.h*360),i=Math.round(e.s*100),r=Math.round(e.l*100);return this._a==1?"hsl("+t+", "+i+"%, "+r+"%)":"hsla("+t+", "+i+"%, "+r+"%, "+this._roundA+")"},toHex:function(e){return Fp(this._r,this._g,this._b,e)},toHexString:function(e){return"#"+this.toHex(e)},toHex8:function(e){return MS(this._r,this._g,this._b,this._a,e)},toHex8String:function(e){return"#"+this.toHex8(e)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return this._a==1?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(rt(this._r,255)*100)+"%",g:Math.round(rt(this._g,255)*100)+"%",b:Math.round(rt(this._b,255)*100)+"%",a:this._a}},toPercentageRgbString:function(){return this._a==1?"rgb("+Math.round(rt(this._r,255)*100)+"%, "+Math.round(rt(this._g,255)*100)+"%, "+Math.round(rt(this._b,255)*100)+"%)":"rgba("+Math.round(rt(this._r,255)*100)+"%, "+Math.round(rt(this._g,255)*100)+"%, "+Math.round(rt(this._b,255)*100)+"%, "+this._roundA+")"},toName:function(){return this._a===0?"transparent":this._a<1?!1:DS[Fp(this._r,this._g,this._b,!0)]||!1},toFilter:function(e){var t="#"+Bp(this._r,this._g,this._b,this._a),i=t,r=this._gradientType?"GradientType = 1, ":"";if(e){var s=_e(e);i="#"+Bp(s._r,s._g,s._b,s._a)}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+t+",endColorstr="+i+")"},toString:function(e){var t=!!e;e=e||this._format;var i=!1,r=this._a<1&&this._a>=0,s=!t&&r&&(e==="hex"||e==="hex6"||e==="hex3"||e==="hex4"||e==="hex8"||e==="name");return s?e==="name"&&this._a===0?this.toName():this.toRgbString():(e==="rgb"&&(i=this.toRgbString()),e==="prgb"&&(i=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(i=this.toHexString()),e==="hex3"&&(i=this.toHexString(!0)),e==="hex4"&&(i=this.toHex8String(!0)),e==="hex8"&&(i=this.toHex8String()),e==="name"&&(i=this.toName()),e==="hsl"&&(i=this.toHslString()),e==="hsv"&&(i=this.toHsvString()),i||this.toHexString())},clone:function(){return _e(this.toString())},_applyModification:function(e,t){var i=e.apply(null,[this].concat([].slice.call(t)));return this._r=i._r,this._g=i._g,this._b=i._b,this.setAlpha(i._a),this},lighten:function(){return this._applyModification(AS,arguments)},brighten:function(){return this._applyModification(TS,arguments)},darken:function(){return this._applyModification(CS,arguments)},desaturate:function(){return this._applyModification(SS,arguments)},saturate:function(){return this._applyModification(wS,arguments)},greyscale:function(){return this._applyModification(ES,arguments)},spin:function(){return this._applyModification(RS,arguments)},_applyCombination:function(e,t){return e.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(LS,arguments)},complement:function(){return this._applyCombination(PS,arguments)},monochromatic:function(){return this._applyCombination(OS,arguments)},splitcomplement:function(){return this._applyCombination(IS,arguments)},triad:function(){return this._applyCombination(kp,[3])},tetrad:function(){return this._applyCombination(kp,[4])}};_e.fromRatio=function(n,e){if(jo(n)=="object"){var t={};for(var i in n)n.hasOwnProperty(i)&&(i==="a"?t[i]=n[i]:t[i]=cs(n[i]));n=t}return _e(n,e)};function yS(n){var e={r:0,g:0,b:0},t=1,i=null,r=null,s=null,o=!1,a=!1;return typeof n=="string"&&(n=BS(n)),jo(n)=="object"&&(Dn(n.r)&&Dn(n.g)&&Dn(n.b)?(e=_S(n.r,n.g,n.b),o=!0,a=String(n.r).substr(-1)==="%"?"prgb":"rgb"):Dn(n.h)&&Dn(n.s)&&Dn(n.v)?(i=cs(n.s),r=cs(n.v),e=bS(n.h,i,r),o=!0,a="hsv"):Dn(n.h)&&Dn(n.s)&&Dn(n.l)&&(i=cs(n.s),s=cs(n.l),e=xS(n.h,i,s),o=!0,a="hsl"),n.hasOwnProperty("a")&&(t=n.a)),t=Vp(t),{ok:o,format:n.format||a,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:t}}function _S(n,e,t){return{r:rt(n,255)*255,g:rt(e,255)*255,b:rt(t,255)*255}}function Np(n,e,t){n=rt(n,255),e=rt(e,255),t=rt(t,255);var i=Math.max(n,e,t),r=Math.min(n,e,t),s,o,a=(i+r)/2;if(i==r)s=o=0;else{var l=i-r;switch(o=a>.5?l/(2-i-r):l/(i+r),i){case n:s=(e-t)/l+(e<t?6:0);break;case e:s=(t-n)/l+2;break;case t:s=(n-e)/l+4;break}s/=6}return{h:s,s:o,l:a}}function xS(n,e,t){var i,r,s;n=rt(n,360),e=rt(e,100),t=rt(t,100);function o(c,u,h){return h<0&&(h+=1),h>1&&(h-=1),h<1/6?c+(u-c)*6*h:h<1/2?u:h<2/3?c+(u-c)*(2/3-h)*6:c}if(e===0)i=r=s=t;else{var a=t<.5?t*(1+e):t+e-t*e,l=2*t-a;i=o(l,a,n+1/3),r=o(l,a,n),s=o(l,a,n-1/3)}return{r:i*255,g:r*255,b:s*255}}function Up(n,e,t){n=rt(n,255),e=rt(e,255),t=rt(t,255);var i=Math.max(n,e,t),r=Math.min(n,e,t),s,o,a=i,l=i-r;if(o=i===0?0:l/i,i==r)s=0;else{switch(i){case n:s=(e-t)/l+(e<t?6:0);break;case e:s=(t-n)/l+2;break;case t:s=(n-e)/l+4;break}s/=6}return{h:s,s:o,v:a}}function bS(n,e,t){n=rt(n,360)*6,e=rt(e,100),t=rt(t,100);var i=Math.floor(n),r=n-i,s=t*(1-e),o=t*(1-r*e),a=t*(1-(1-r)*e),l=i%6,c=[t,o,s,s,a,t][l],u=[a,t,t,o,s,s][l],h=[s,s,a,t,t,o][l];return{r:c*255,g:u*255,b:h*255}}function Fp(n,e,t,i){var r=[pn(Math.round(n).toString(16)),pn(Math.round(e).toString(16)),pn(Math.round(t).toString(16))];return i&&r[0].charAt(0)==r[0].charAt(1)&&r[1].charAt(0)==r[1].charAt(1)&&r[2].charAt(0)==r[2].charAt(1)?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function MS(n,e,t,i,r){var s=[pn(Math.round(n).toString(16)),pn(Math.round(e).toString(16)),pn(Math.round(t).toString(16)),pn(Hp(i))];return r&&s[0].charAt(0)==s[0].charAt(1)&&s[1].charAt(0)==s[1].charAt(1)&&s[2].charAt(0)==s[2].charAt(1)&&s[3].charAt(0)==s[3].charAt(1)?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")}function Bp(n,e,t,i){var r=[pn(Hp(i)),pn(Math.round(n).toString(16)),pn(Math.round(e).toString(16)),pn(Math.round(t).toString(16))];return r.join("")}_e.equals=function(n,e){return!n||!e?!1:_e(n).toRgbString()==_e(e).toRgbString()};_e.random=function(){return _e.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})};function SS(n,e){e=e===0?0:e||10;var t=_e(n).toHsl();return t.s-=e/100,t.s=Xo(t.s),_e(t)}function wS(n,e){e=e===0?0:e||10;var t=_e(n).toHsl();return t.s+=e/100,t.s=Xo(t.s),_e(t)}function ES(n){return _e(n).desaturate(100)}function AS(n,e){e=e===0?0:e||10;var t=_e(n).toHsl();return t.l+=e/100,t.l=Xo(t.l),_e(t)}function TS(n,e){e=e===0?0:e||10;var t=_e(n).toRgb();return t.r=Math.max(0,Math.min(255,t.r-Math.round(255*-(e/100)))),t.g=Math.max(0,Math.min(255,t.g-Math.round(255*-(e/100)))),t.b=Math.max(0,Math.min(255,t.b-Math.round(255*-(e/100)))),_e(t)}function CS(n,e){e=e===0?0:e||10;var t=_e(n).toHsl();return t.l-=e/100,t.l=Xo(t.l),_e(t)}function RS(n,e){var t=_e(n).toHsl(),i=(t.h+e)%360;return t.h=i<0?360+i:i,_e(t)}function PS(n){var e=_e(n).toHsl();return e.h=(e.h+180)%360,_e(e)}function kp(n,e){if(isNaN(e)||e<=0)throw new Error("Argument to polyad must be a positive number");for(var t=_e(n).toHsl(),i=[_e(n)],r=360/e,s=1;s<e;s++)i.push(_e({h:(t.h+s*r)%360,s:t.s,l:t.l}));return i}function IS(n){var e=_e(n).toHsl(),t=e.h;return[_e(n),_e({h:(t+72)%360,s:e.s,l:e.l}),_e({h:(t+216)%360,s:e.s,l:e.l})]}function LS(n,e,t){e=e||6,t=t||30;var i=_e(n).toHsl(),r=360/t,s=[_e(n)];for(i.h=(i.h-(r*e>>1)+720)%360;--e;)i.h=(i.h+r)%360,s.push(_e(i));return s}function OS(n,e){e=e||6;for(var t=_e(n).toHsv(),i=t.h,r=t.s,s=t.v,o=[],a=1/e;e--;)o.push(_e({h:i,s:r,v:s})),s=(s+a)%1;return o}_e.mix=function(n,e,t){t=t===0?0:t||50;var i=_e(n).toRgb(),r=_e(e).toRgb(),s=t/100,o={r:(r.r-i.r)*s+i.r,g:(r.g-i.g)*s+i.g,b:(r.b-i.b)*s+i.b,a:(r.a-i.a)*s+i.a};return _e(o)};_e.readability=function(n,e){var t=_e(n),i=_e(e);return(Math.max(t.getLuminance(),i.getLuminance())+.05)/(Math.min(t.getLuminance(),i.getLuminance())+.05)};_e.isReadable=function(n,e,t){var i=_e.readability(n,e),r,s;switch(s=!1,r=kS(t),r.level+r.size){case"AAsmall":case"AAAlarge":s=i>=4.5;break;case"AAlarge":s=i>=3;break;case"AAAsmall":s=i>=7;break}return s};_e.mostReadable=function(n,e,t){var i=null,r=0,s,o,a,l;t=t||{},o=t.includeFallbackColors,a=t.level,l=t.size;for(var c=0;c<e.length;c++)s=_e.readability(n,e[c]),s>r&&(r=s,i=_e(e[c]));return _e.isReadable(n,i,{level:a,size:l})||!o?i:(t.includeFallbackColors=!1,_e.mostReadable(n,["#fff","#000"],t))};var Cc=_e.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},DS=_e.hexNames=NS(Cc);function NS(n){var e={};for(var t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function Vp(n){return n=parseFloat(n),(isNaN(n)||n<0||n>1)&&(n=1),n}function rt(n,e){US(n)&&(n="100%");var t=FS(n);return n=Math.min(e,Math.max(0,parseFloat(n))),t&&(n=parseInt(n*e,10)/100),Math.abs(n-e)<1e-6?1:n%e/parseFloat(e)}function Xo(n){return Math.min(1,Math.max(0,n))}function $t(n){return parseInt(n,16)}function US(n){return typeof n=="string"&&n.indexOf(".")!=-1&&parseFloat(n)===1}function FS(n){return typeof n=="string"&&n.indexOf("%")!=-1}function pn(n){return n.length==1?"0"+n:""+n}function cs(n){return n<=1&&(n=n*100+"%"),n}function Hp(n){return Math.round(parseFloat(n)*255).toString(16)}function zp(n){return $t(n)/255}var dn=function(){var n="[-\\+]?\\d+%?",e="[-\\+]?\\d*\\.\\d+%?",t="(?:"+e+")|(?:"+n+")",i="[\\s|\\(]+("+t+")[,|\\s]+("+t+")[,|\\s]+("+t+")\\s*\\)?",r="[\\s|\\(]+("+t+")[,|\\s]+("+t+")[,|\\s]+("+t+")[,|\\s]+("+t+")\\s*\\)?";return{CSS_UNIT:new RegExp(t),rgb:new RegExp("rgb"+i),rgba:new RegExp("rgba"+r),hsl:new RegExp("hsl"+i),hsla:new RegExp("hsla"+r),hsv:new RegExp("hsv"+i),hsva:new RegExp("hsva"+r),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();function Dn(n){return!!dn.CSS_UNIT.exec(n)}function BS(n){n=n.replace(gS,"").replace(vS,"").toLowerCase();var e=!1;if(Cc[n])n=Cc[n],e=!0;else if(n=="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var t;return(t=dn.rgb.exec(n))?{r:t[1],g:t[2],b:t[3]}:(t=dn.rgba.exec(n))?{r:t[1],g:t[2],b:t[3],a:t[4]}:(t=dn.hsl.exec(n))?{h:t[1],s:t[2],l:t[3]}:(t=dn.hsla.exec(n))?{h:t[1],s:t[2],l:t[3],a:t[4]}:(t=dn.hsv.exec(n))?{h:t[1],s:t[2],v:t[3]}:(t=dn.hsva.exec(n))?{h:t[1],s:t[2],v:t[3],a:t[4]}:(t=dn.hex8.exec(n))?{r:$t(t[1]),g:$t(t[2]),b:$t(t[3]),a:zp(t[4]),format:e?"name":"hex8"}:(t=dn.hex6.exec(n))?{r:$t(t[1]),g:$t(t[2]),b:$t(t[3]),format:e?"name":"hex"}:(t=dn.hex4.exec(n))?{r:$t(t[1]+""+t[1]),g:$t(t[2]+""+t[2]),b:$t(t[3]+""+t[3]),a:zp(t[4]+""+t[4]),format:e?"name":"hex8"}:(t=dn.hex3.exec(n))?{r:$t(t[1]+""+t[1]),g:$t(t[2]+""+t[2]),b:$t(t[3]+""+t[3]),format:e?"name":"hex"}:!1}function kS(n){var e,t;return n=n||{level:"AA",size:"small"},e=(n.level||"AA").toUpperCase(),t=(n.size||"small").toLowerCase(),e!=="AA"&&e!=="AAA"&&(e="AA"),t!=="small"&&t!=="large"&&(t="small"),{level:e,size:t}}function zS(n,e,t){return e=Yo(e),$S(n,Oc()?Reflect.construct(e,t||[],Yo(n).constructor):e.apply(n,t))}function VS(n,e,t){if(Oc())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,e);var r=new(n.bind.apply(n,i));return t&&$o(r,t.prototype),r}function Oc(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Oc=function(){return!!n})()}function HS(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function Gp(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function Jp(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Gp(Object(t),!0).forEach(function(i){Dc(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Gp(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function GS(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function Kp(n){var e=GS(n,"string");return typeof e=="symbol"?e:String(e)}function Pc(n){"@babel/helpers - typeof";return Pc=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pc(n)}function WS(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function Wp(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,Kp(i.key),i)}}function jS(n,e,t){return e&&Wp(n.prototype,e),t&&Wp(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function Dc(n,e,t){return e=Kp(e),e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function XS(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),e&&$o(n,e)}function Yo(n){return Yo=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},Yo(n)}function $o(n,e){return $o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},$o(n,e)}function qS(n,e){if(n==null)return{};var t={},i=Object.keys(n),r,s;for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&(t[r]=n[r]);return t}function YS(n,e){if(n==null)return{};var t=qS(n,e),i,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(r=0;r<s.length;r++)i=s[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(n,i)&&(t[i]=n[i])}return t}function Qp(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function $S(n,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Qp(n)}function jp(n,e){return JS(n)||HS(n,e)||em(n,e)||ew()}function mn(n){return ZS(n)||KS(n)||em(n)||QS()}function ZS(n){if(Array.isArray(n))return Ic(n)}function JS(n){if(Array.isArray(n))return n}function KS(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function em(n,e){if(n){if(typeof n=="string")return Ic(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Ic(n,e)}}function Ic(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function QS(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ew(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var tw=function n(e){e instanceof Array?e.forEach(n):(e.map&&e.map.dispose(),e.dispose())},nw=function n(e){e.geometry&&e.geometry.dispose(),e.material&&tw(e.material),e.texture&&e.texture.dispose(),e.children&&e.children.forEach(n)},Lc=function(e){for(;e.children.length;){var t=e.children[0];e.remove(t),nw(t)}},iw=["objFilter"];function us(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=t.objFilter,r=i===void 0?function(){return!0}:i,s=YS(t,iw);return Lp(n,e.children.filter(r),function(o){return e.add(o)},function(o){e.remove(o),Lc(o)},Jp({objBindAttr:"__threeObj"},s))}var hs=function(e){return isNaN(e)?parseInt(_e(e).toHex(),16):e},Rc=function(e){return isNaN(e)?_e(e).getAlpha():1},rw=ls(Tc);function Xp(n,e,t){!e||typeof t!="string"||n.filter(function(i){return!i[t]}).forEach(function(i){i[t]=rw(e(i))})}function sw(n,e){var t=n.nodes,i=n.links,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=r.nodeFilter,o=s===void 0?function(){return!0}:s,a=r.onLoopError,l=a===void 0?function(m){throw"Invalid DAG structure! Found cycle in node path: ".concat(m.join(" -> "),".")}:a,c={};t.forEach(function(m){return c[e(m)]={data:m,out:[],depth:-1,skip:!o(m)}}),i.forEach(function(m){var g=m.source,v=m.target,p=x(g),f=x(v);if(!c.hasOwnProperty(p))throw"Missing source node with id: ".concat(p);if(!c.hasOwnProperty(f))throw"Missing target node with id: ".concat(f);var M=c[p],y=c[f];M.out.push(y);function x(A){return Pc(A)==="object"?e(A):A}});var u=[];d(Object.values(c));var h=Object.assign.apply(Object,[{}].concat(mn(Object.entries(c).filter(function(m){var g=jp(m,2),v=g[1];return!v.skip}).map(function(m){var g=jp(m,2),v=g[0],p=g[1];return Dc({},v,p.depth)}))));return h;function d(m){for(var g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],v=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,p=function(){var x=m[f];if(g.indexOf(x)!==-1){var A=[].concat(mn(g.slice(g.indexOf(x))),[x]).map(function(w){return e(w.data)});return u.some(function(w){return w.length===A.length&&w.every(function(T,R){return T===A[R]})})||(u.push(A),l(A)),1}v>x.depth&&(x.depth=v,d(x.out,[].concat(mn(g),[x]),v+(x.skip?0:1)))},f=0,M=m.length;f<M;f++)p()}}var Ce=window.THREE?window.THREE:{Group:Pn,Mesh:Mt,MeshLambertMaterial:xo,Color:Ne,BufferGeometry:Ct,BufferAttribute:Nt,Matrix4:Qe,Vector3:L,SphereGeometry:cr,CylinderGeometry:Xr,TubeGeometry:_o,ConeGeometry:yo,Line:go,LineBasicMaterial:Wr,QuadraticBezierCurve3:lr,CubicBezierCurve3:jr,Box3:cn},qp={graph:$p.default,forcelayout:Zp.default},ow=2,Yp=new Ce.BufferGeometry().setAttribute?"setAttribute":"addAttribute",qo=new Ce.BufferGeometry().applyMatrix4?"applyMatrix4":"applyMatrix",aw=yr({props:{jsonUrl:{onChange:function(e,t){var i=this;e&&!t.fetchingJson&&(t.fetchingJson=!0,t.onLoading(),fetch(e).then(function(r){return r.json()}).then(function(r){t.fetchingJson=!1,t.onFinishLoading(r),i.graphData(r)}))},triggerUpdate:!1},graphData:{default:{nodes:[],links:[]},onChange:function(e,t){t.engineRunning=!1}},numDimensions:{default:3,onChange:function(e,t){var i=t.d3ForceLayout.force("charge");i&&i.strength(e>2?-60:-30),e<3&&r(t.graphData.nodes,"z"),e<2&&r(t.graphData.nodes,"y");function r(s,o){s.forEach(function(a){delete a[o],delete a["v".concat(o)]})}}},dagMode:{onChange:function(e,t){!e&&t.forceEngine==="d3"&&(t.graphData.nodes||[]).forEach(function(i){return i.fx=i.fy=i.fz=void 0})}},dagLevelDistance:{},dagNodeFilter:{default:function(e){return!0}},onDagError:{triggerUpdate:!1},nodeRelSize:{default:4},nodeId:{default:"id"},nodeVal:{default:"val"},nodeResolution:{default:8},nodeColor:{default:"color"},nodeAutoColorBy:{},nodeOpacity:{default:.75},nodeVisibility:{default:!0},nodeThreeObject:{},nodeThreeObjectExtend:{default:!1},nodePositionUpdate:{triggerUpdate:!1},linkSource:{default:"source"},linkTarget:{default:"target"},linkVisibility:{default:!0},linkColor:{default:"color"},linkAutoColorBy:{},linkOpacity:{default:.2},linkWidth:{},linkResolution:{default:6},linkCurvature:{default:0,triggerUpdate:!1},linkCurveRotation:{default:0,triggerUpdate:!1},linkMaterial:{},linkThreeObject:{},linkThreeObjectExtend:{default:!1},linkPositionUpdate:{triggerUpdate:!1},linkDirectionalArrowLength:{default:0},linkDirectionalArrowColor:{},linkDirectionalArrowRelPos:{default:.5,triggerUpdate:!1},linkDirectionalArrowResolution:{default:8},linkDirectionalParticles:{default:0},linkDirectionalParticleSpeed:{default:.01,triggerUpdate:!1},linkDirectionalParticleWidth:{default:.5},linkDirectionalParticleColor:{},linkDirectionalParticleResolution:{default:4},forceEngine:{default:"d3"},d3AlphaMin:{default:0},d3AlphaDecay:{default:.0228,triggerUpdate:!1,onChange:function(e,t){t.d3ForceLayout.alphaDecay(e)}},d3AlphaTarget:{default:0,triggerUpdate:!1,onChange:function(e,t){t.d3ForceLayout.alphaTarget(e)}},d3VelocityDecay:{default:.4,triggerUpdate:!1,onChange:function(e,t){t.d3ForceLayout.velocityDecay(e)}},ngraphPhysics:{default:{timeStep:20,gravity:-1.2,theta:.8,springLength:30,springCoefficient:8e-4,dragCoefficient:.02}},warmupTicks:{default:0,triggerUpdate:!1},cooldownTicks:{default:1/0,triggerUpdate:!1},cooldownTime:{default:15e3,triggerUpdate:!1},onLoading:{default:function(){},triggerUpdate:!1},onFinishLoading:{default:function(){},triggerUpdate:!1},onUpdate:{default:function(){},triggerUpdate:!1},onFinishUpdate:{default:function(){},triggerUpdate:!1},onEngineTick:{default:function(){},triggerUpdate:!1},onEngineStop:{default:function(){},triggerUpdate:!1}},methods:{refresh:function(e){return e._flushObjects=!0,e._rerender(),this},d3Force:function(e,t,i){return i===void 0?e.d3ForceLayout.force(t):(e.d3ForceLayout.force(t,i),this)},d3ReheatSimulation:function(e){return e.d3ForceLayout.alpha(1),this.resetCountdown(),this},resetCountdown:function(e){return e.cntTicks=0,e.startTickTime=new Date,e.engineRunning=!0,this},tickFrame:function(e){var t=e.forceEngine!=="ngraph";return e.engineRunning&&i(),r(),s(),this;function i(){++e.cntTicks>e.cooldownTicks||new Date-e.startTickTime>e.cooldownTime||t&&e.d3AlphaMin>0&&e.d3ForceLayout.alpha()<e.d3AlphaMin?(e.engineRunning=!1,e.onEngineStop()):(e.layout[t?"tick":"step"](),e.onEngineTick());var o=je(e.nodeThreeObjectExtend);e.graphData.nodes.forEach(function(d){var m=d.__threeObj;if(m){var g=t?d:e.layout.getNodePosition(d[e.nodeId]),v=o(d);(!e.nodePositionUpdate||!e.nodePositionUpdate(v?m.children[0]:m,{x:g.x,y:g.y,z:g.z},d)||v)&&(m.position.x=g.x,m.position.y=g.y||0,m.position.z=g.z||0)}});var a=je(e.linkWidth),l=je(e.linkCurvature),c=je(e.linkCurveRotation),u=je(e.linkThreeObjectExtend);e.graphData.links.forEach(function(d){var m=d.__lineObj;if(m){var g=t?d:e.layout.getLinkPosition(e.layout.graph.getLink(d.source,d.target).id),v=g[t?"source":"from"],p=g[t?"target":"to"];if(!(!v||!p||!v.hasOwnProperty("x")||!p.hasOwnProperty("x"))){h(d);var f=u(d);if(!(e.linkPositionUpdate&&e.linkPositionUpdate(f?m.children[1]:m,{start:{x:v.x,y:v.y,z:v.z},end:{x:p.x,y:p.y,z:p.z}},d)&&!f)){var M=30,y=d.__curve,x=m.children.length?m.children[0]:m;if(x.type==="Line"){if(y)x.geometry.setFromPoints(y.getPoints(M));else{var A=x.geometry.getAttribute("position");(!A||!A.array||A.array.length!==6)&&x.geometry[Yp]("position",A=new Ce.BufferAttribute(new Float32Array(2*3),3)),A.array[0]=v.x,A.array[1]=v.y||0,A.array[2]=v.z||0,A.array[3]=p.x,A.array[4]=p.y||0,A.array[5]=p.z||0,A.needsUpdate=!0}x.geometry.computeBoundingSphere()}else if(x.type==="Mesh")if(y){x.geometry.type.match(/^Tube(Buffer)?Geometry$/)||(x.position.set(0,0,0),x.rotation.set(0,0,0),x.scale.set(1,1,1));var B=Math.ceil(a(d)*10)/10,D=B/2,I=new Ce.TubeGeometry(y,M,D,e.linkResolution,!1);x.geometry.dispose(),x.geometry=I}else{if(!x.geometry.type.match(/^Cylinder(Buffer)?Geometry$/)){var w=Math.ceil(a(d)*10)/10,T=w/2,R=new Ce.CylinderGeometry(T,T,1,e.linkResolution,1,!1);R[qo](new Ce.Matrix4().makeTranslation(0,1/2,0)),R[qo](new Ce.Matrix4().makeRotationX(Math.PI/2)),x.geometry.dispose(),x.geometry=R}var S=new Ce.Vector3(v.x,v.y||0,v.z||0),b=new Ce.Vector3(p.x,p.y||0,p.z||0),U=S.distanceTo(b);x.position.x=S.x,x.position.y=S.y,x.position.z=S.z,x.scale.z=U,x.parent.localToWorld(b),x.lookAt(b)}}}}});function h(d){var m=t?d:e.layout.getLinkPosition(e.layout.graph.getLink(d.source,d.target).id),g=m[t?"source":"from"],v=m[t?"target":"to"];if(!(!g||!v||!g.hasOwnProperty("x")||!v.hasOwnProperty("x"))){var p=l(d);if(!p)d.__curve=null;else{var f=new Ce.Vector3(g.x,g.y||0,g.z||0),M=new Ce.Vector3(v.x,v.y||0,v.z||0),y=f.distanceTo(M),x,A=c(d);if(y>0){var w=v.x-g.x,T=v.y-g.y||0,R=new Ce.Vector3().subVectors(M,f),S=R.clone().multiplyScalar(p).cross(w!==0||T!==0?new Ce.Vector3(0,0,1):new Ce.Vector3(0,1,0)).applyAxisAngle(R.normalize(),A).add(new Ce.Vector3().addVectors(f,M).divideScalar(2));x=new Ce.QuadraticBezierCurve3(f,S,M)}else{var b=p*70,U=-A,B=U+Math.PI/2;x=new Ce.CubicBezierCurve3(f,new Ce.Vector3(b*Math.cos(B),b*Math.sin(B),0).add(f),new Ce.Vector3(b*Math.cos(U),b*Math.sin(U),0).add(f),M)}d.__curve=x}}}}function r(){var o=je(e.linkDirectionalArrowRelPos),a=je(e.linkDirectionalArrowLength),l=je(e.nodeVal);e.graphData.links.forEach(function(c){var u=c.__arrowObj;if(u){var h=t?c:e.layout.getLinkPosition(e.layout.graph.getLink(c.source,c.target).id),d=h[t?"source":"from"],m=h[t?"target":"to"];if(!(!d||!m||!d.hasOwnProperty("x")||!m.hasOwnProperty("x"))){var g=Math.cbrt(Math.max(0,l(d)||1))*e.nodeRelSize,v=Math.cbrt(Math.max(0,l(m)||1))*e.nodeRelSize,p=a(c),f=o(c),M=c.__curve?function(R){return c.__curve.getPoint(R)}:function(R){var S=function(U,B,D,I){return B[U]+(D[U]-B[U])*I||0};return{x:S("x",d,m,R),y:S("y",d,m,R),z:S("z",d,m,R)}},y=c.__curve?c.__curve.getLength():Math.sqrt(["x","y","z"].map(function(R){return Math.pow((m[R]||0)-(d[R]||0),2)}).reduce(function(R,S){return R+S},0)),x=g+p+(y-g-v-p)*f,A=M(x/y),w=M((x-p)/y);["x","y","z"].forEach(function(R){return u.position[R]=w[R]});var T=VS(Ce.Vector3,mn(["x","y","z"].map(function(R){return A[R]})));u.parent.localToWorld(T),u.lookAt(T)}}})}function s(){var o=je(e.linkDirectionalParticleSpeed);e.graphData.links.forEach(function(a){var l=a.__photonsObj&&a.__photonsObj.children,c=a.__singleHopPhotonsObj&&a.__singleHopPhotonsObj.children;if(!((!c||!c.length)&&(!l||!l.length))){var u=t?a:e.layout.getLinkPosition(e.layout.graph.getLink(a.source,a.target).id),h=u[t?"source":"from"],d=u[t?"target":"to"];if(!(!h||!d||!h.hasOwnProperty("x")||!d.hasOwnProperty("x"))){var m=o(a),g=a.__curve?function(p){return a.__curve.getPoint(p)}:function(p){var f=function(y,x,A,w){return x[y]+(A[y]-x[y])*w||0};return{x:f("x",h,d,p),y:f("y",h,d,p),z:f("z",h,d,p)}},v=[].concat(mn(l||[]),mn(c||[]));v.forEach(function(p,f){var M=p.parent.__linkThreeObjType==="singleHopPhotons";if(p.hasOwnProperty("__progressRatio")||(p.__progressRatio=M?0:f/l.length),p.__progressRatio+=m,p.__progressRatio>=1)if(!M)p.__progressRatio=p.__progressRatio%1;else{p.parent.remove(p),Lc(p);return}var y=p.__progressRatio,x=g(y);["x","y","z"].forEach(function(A){return p.position[A]=x[A]})})}}})}},emitParticle:function(e,t){if(t&&e.graphData.links.includes(t)){if(!t.__singleHopPhotonsObj){var i=new Ce.Group;i.__linkThreeObjType="singleHopPhotons",t.__singleHopPhotonsObj=i,e.graphScene.add(i)}var r=je(e.linkDirectionalParticleWidth),s=Math.ceil(r(t)*10)/10/2,o=e.linkDirectionalParticleResolution,a=new Ce.SphereGeometry(s,o,o),l=je(e.linkColor),c=je(e.linkDirectionalParticleColor),u=c(t)||l(t)||"#f0f0f0",h=new Ce.Color(hs(u)),d=e.linkOpacity*3,m=new Ce.MeshLambertMaterial({color:h,transparent:!0,opacity:d});t.__singleHopPhotonsObj.add(new Ce.Mesh(a,m))}return this},getGraphBbox:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:function(){return!0};if(!e.initialised)return null;var i=function r(s){var o=[];if(s.geometry){s.geometry.computeBoundingBox();var a=new Ce.Box3;a.copy(s.geometry.boundingBox).applyMatrix4(s.matrixWorld),o.push(a)}return o.concat.apply(o,mn((s.children||[]).filter(function(l){return!l.hasOwnProperty("__graphObjType")||l.__graphObjType==="node"&&t(l.__data)}).map(r)))}(e.graphScene);return i.length?Object.assign.apply(Object,mn(["x","y","z"].map(function(r){return Dc({},r,[Go(i,function(s){return s.min[r]}),Ho(i,function(s){return s.max[r]})])}))):null}},stateInit:function(){return{d3ForceLayout:uc().force("link",rc()).force("charge",hc()).force("center",ec()).force("dagRadial",null).stop(),engineRunning:!1}},init:function(e,t){t.graphScene=e},update:function(e,t){var i=function(V){return V.some(function(J){return t.hasOwnProperty(J)})};if(e.engineRunning=!1,e.onUpdate(),e.nodeAutoColorBy!==null&&i(["nodeAutoColorBy","graphData","nodeColor"])&&Xp(e.graphData.nodes,je(e.nodeAutoColorBy),e.nodeColor),e.linkAutoColorBy!==null&&i(["linkAutoColorBy","graphData","linkColor"])&&Xp(e.graphData.links,je(e.linkAutoColorBy),e.linkColor),e._flushObjects||i(["graphData","nodeThreeObject","nodeThreeObjectExtend","nodeVal","nodeColor","nodeVisibility","nodeRelSize","nodeResolution","nodeOpacity"])){var r=je(e.nodeThreeObject),s=je(e.nodeThreeObjectExtend),o=je(e.nodeVal),a=je(e.nodeColor),l=je(e.nodeVisibility),c={},u={};us(e.graphData.nodes.filter(l),e.graphScene,{purge:e._flushObjects||i(["nodeThreeObject","nodeThreeObjectExtend"]),objFilter:function(V){return V.__graphObjType==="node"},createObj:function(V){var J=r(V),N=s(V);J&&e.nodeThreeObject===J&&(J=J.clone());var Z;return J&&!N?Z=J:(Z=new Ce.Mesh,Z.__graphDefaultObj=!0,J&&N&&Z.add(J)),Z.__graphObjType="node",Z},updateObj:function(V,J){if(V.__graphDefaultObj){var N=o(J)||1,Z=Math.cbrt(N)*e.nodeRelSize,ae=e.nodeResolution;(!V.geometry.type.match(/^Sphere(Buffer)?Geometry$/)||V.geometry.parameters.radius!==Z||V.geometry.parameters.widthSegments!==ae)&&(c.hasOwnProperty(N)||(c[N]=new Ce.SphereGeometry(Z,ae,ae)),V.geometry.dispose(),V.geometry=c[N]);var fe=a(J),F=new Ce.Color(hs(fe||"#ffffaa")),ge=e.nodeOpacity*Rc(fe);(V.material.type!=="MeshLambertMaterial"||!V.material.color.equals(F)||V.material.opacity!==ge)&&(u.hasOwnProperty(fe)||(u[fe]=new Ce.MeshLambertMaterial({color:F,transparent:!0,opacity:ge})),V.material.dispose(),V.material=u[fe])}}})}if(e._flushObjects||i(["graphData","linkThreeObject","linkThreeObjectExtend","linkMaterial","linkColor","linkWidth","linkVisibility","linkResolution","linkOpacity","linkDirectionalArrowLength","linkDirectionalArrowColor","linkDirectionalArrowResolution","linkDirectionalParticles","linkDirectionalParticleWidth","linkDirectionalParticleColor","linkDirectionalParticleResolution"])){var h=je(e.linkThreeObject),d=je(e.linkThreeObjectExtend),m=je(e.linkMaterial),g=je(e.linkVisibility),v=je(e.linkColor),p=je(e.linkWidth),f={},M={},y={},x=e.graphData.links.filter(g);if(us(x,e.graphScene,{objBindAttr:"__lineObj",purge:e._flushObjects||i(["linkThreeObject","linkThreeObjectExtend","linkWidth"]),objFilter:function(V){return V.__graphObjType==="link"},exitObj:function(V){var J=V.__data&&V.__data.__singleHopPhotonsObj;J&&(J.parent.remove(J),Lc(J),delete V.__data.__singleHopPhotonsObj)},createObj:function(V){var J=h(V),N=d(V);J&&e.linkThreeObject===J&&(J=J.clone());var Z;if(!J||N){var ae=!!p(V);if(ae)Z=new Ce.Mesh;else{var fe=new Ce.BufferGeometry;fe[Yp]("position",new Ce.BufferAttribute(new Float32Array(2*3),3)),Z=new Ce.Line(fe)}}var F;return J?N?(F=new Ce.Group,F.__graphDefaultObj=!0,F.add(Z),F.add(J)):F=J:(F=Z,F.__graphDefaultObj=!0),F.renderOrder=10,F.__graphObjType="link",F},updateObj:function(V,J){if(V.__graphDefaultObj){var N=V.children.length?V.children[0]:V,Z=Math.ceil(p(J)*10)/10,ae=!!Z;if(ae){var fe=Z/2,F=e.linkResolution;if(!N.geometry.type.match(/^Cylinder(Buffer)?Geometry$/)||N.geometry.parameters.radiusTop!==fe||N.geometry.parameters.radialSegments!==F){if(!f.hasOwnProperty(Z)){var ge=new Ce.CylinderGeometry(fe,fe,1,F,1,!1);ge[qo](new Ce.Matrix4().makeTranslation(0,1/2,0)),ge[qo](new Ce.Matrix4().makeRotationX(Math.PI/2)),f[Z]=ge}N.geometry.dispose(),N.geometry=f[Z]}}var Se=m(J);if(Se)N.material=Se;else{var Ve=v(J),we=new Ce.Color(hs(Ve||"#f0f0f0")),ke=e.linkOpacity*Rc(Ve),P=ae?"MeshLambertMaterial":"LineBasicMaterial";if(N.material.type!==P||!N.material.color.equals(we)||N.material.opacity!==ke){var E=ae?M:y;E.hasOwnProperty(Ve)||(E[Ve]=new Ce[P]({color:we,transparent:ke<1,opacity:ke,depthWrite:ke>=1})),N.material.dispose(),N.material=E[Ve]}}}}}),e.linkDirectionalArrowLength||t.hasOwnProperty("linkDirectionalArrowLength")){var A=je(e.linkDirectionalArrowLength),w=je(e.linkDirectionalArrowColor);us(x.filter(A),e.graphScene,{objBindAttr:"__arrowObj",objFilter:function(V){return V.__linkThreeObjType==="arrow"},createObj:function(){var V=new Ce.Mesh(void 0,new Ce.MeshLambertMaterial({transparent:!0}));return V.__linkThreeObjType="arrow",V},updateObj:function(V,J){var N=A(J),Z=e.linkDirectionalArrowResolution;if(!V.geometry.type.match(/^Cone(Buffer)?Geometry$/)||V.geometry.parameters.height!==N||V.geometry.parameters.radialSegments!==Z){var ae=new Ce.ConeGeometry(N*.25,N,Z);ae.translate(0,N/2,0),ae.rotateX(Math.PI/2),V.geometry.dispose(),V.geometry=ae}var fe=w(J)||v(J)||"#f0f0f0";V.material.color=new Ce.Color(hs(fe)),V.material.opacity=e.linkOpacity*3*Rc(fe)}})}if(e.linkDirectionalParticles||t.hasOwnProperty("linkDirectionalParticles")){var T=je(e.linkDirectionalParticles),R=je(e.linkDirectionalParticleWidth),S=je(e.linkDirectionalParticleColor),b={},U={};us(x.filter(T),e.graphScene,{objBindAttr:"__photonsObj",objFilter:function(V){return V.__linkThreeObjType==="photons"},createObj:function(){var V=new Ce.Group;return V.__linkThreeObjType="photons",V},updateObj:function(V,J){var N=Math.round(Math.abs(T(J))),Z=!!V.children.length&&V.children[0],ae=Math.ceil(R(J)*10)/10/2,fe=e.linkDirectionalParticleResolution,F;Z&&Z.geometry.parameters.radius===ae&&Z.geometry.parameters.widthSegments===fe?F=Z.geometry:(U.hasOwnProperty(ae)||(U[ae]=new Ce.SphereGeometry(ae,fe,fe)),F=U[ae],Z&&Z.geometry.dispose());var ge=S(J)||v(J)||"#f0f0f0",Se=new Ce.Color(hs(ge)),Ve=e.linkOpacity*3,we;Z&&Z.material.color.equals(Se)&&Z.material.opacity===Ve?we=Z.material:(b.hasOwnProperty(ge)||(b[ge]=new Ce.MeshLambertMaterial({color:Se,transparent:!0,opacity:Ve})),we=b[ge],Z&&Z.material.dispose()),us(mn(new Array(N)).map(function(ke,P){return{idx:P}}),V,{idAccessor:function(P){return P.idx},createObj:function(){return new Ce.Mesh(F,we)},updateObj:function(P){P.geometry=F,P.material=we}})}})}}if(e._flushObjects=!1,i(["graphData","nodeId","linkSource","linkTarget","numDimensions","forceEngine","dagMode","dagNodeFilter","dagLevelDistance"])){e.engineRunning=!1,e.graphData.links.forEach(function(z){z.source=z[e.linkSource],z.target=z[e.linkTarget]});var B=e.forceEngine!=="ngraph",D;if(B){(D=e.d3ForceLayout).stop().alpha(1).numDimensions(e.numDimensions).nodes(e.graphData.nodes);var I=e.d3ForceLayout.force("link");I&&I.id(function(z){return z[e.nodeId]}).links(e.graphData.links);var O=e.dagMode&&sw(e.graphData,function(z){return z[e.nodeId]},{nodeFilter:e.dagNodeFilter,onLoopError:e.onDagError||void 0}),k=Math.max.apply(Math,mn(Object.values(O||[]))),te=e.dagLevelDistance||e.graphData.nodes.length/(k||1)*ow*(["radialin","radialout"].indexOf(e.dagMode)!==-1?.7:1);if(e.dagMode){var W=function(V,J){return function(N){return V?(O[N[e.nodeId]]-k/2)*te*(J?-1:1):void 0}},ie=W(["lr","rl"].indexOf(e.dagMode)!==-1,e.dagMode==="rl"),G=W(["td","bu"].indexOf(e.dagMode)!==-1,e.dagMode==="td"),Q=W(["zin","zout"].indexOf(e.dagMode)!==-1,e.dagMode==="zout");e.graphData.nodes.filter(e.dagNodeFilter).forEach(function(z){z.fx=ie(z),z.fy=G(z),z.fz=Q(z)})}e.d3ForceLayout.force("dagRadial",["radialin","radialout"].indexOf(e.dagMode)!==-1?fc(function(z){var V=O[z[e.nodeId]]||-1;return(e.dagMode==="radialin"?k-V:V)*te}).strength(function(z){return e.dagNodeFilter(z)?1:0}):null)}else{var le=qp.graph();e.graphData.nodes.forEach(function(z){le.addNode(z[e.nodeId])}),e.graphData.links.forEach(function(z){le.addLink(z.source,z.target)}),D=qp.forcelayout(le,Jp({dimensions:e.numDimensions},e.ngraphPhysics)),D.graph=le}for(var xe=0;xe<e.warmupTicks&&!(B&&e.d3AlphaMin>0&&e.d3ForceLayout.alpha()<e.d3AlphaMin);xe++)D[B?"tick":"step"]();e.layout=D,this.resetCountdown()}e.engineRunning=!0,e.onFinishUpdate()}});function lw(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Object,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,i=function(r){XS(s,r);function s(){var o;WS(this,s);for(var a=arguments.length,l=new Array(a),c=0;c<a;c++)l[c]=arguments[c];return o=zS(this,s,[].concat(l)),o.__kapsuleInstance=n().apply(void 0,[].concat(mn(t?[Qp(o)]:[]),l)),o}return jS(s)}(e);return Object.keys(n()).forEach(function(r){return i.prototype[r]=function(){var s,o=(s=this.__kapsuleInstance)[r].apply(s,arguments);return o===this.__kapsuleInstance?this:o}}),i}var cw=window.THREE?window.THREE:{Group:Pn},Nc=lw(aw,cw.Group,!0);var Uc={type:"change"},Fc={type:"start"},Bc={type:"end"},Zo=class extends _t{constructor(e,t){super();let i=this,r={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4};this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.keys=["KeyA","KeyS","KeyD"],this.mouseButtons={LEFT:Yt.ROTATE,MIDDLE:Yt.DOLLY,RIGHT:Yt.PAN},this.target=new L;let s=1e-6,o=new L,a=1,l=r.NONE,c=r.NONE,u=0,h=0,d=0,m=new L,g=new se,v=new se,p=new L,f=new se,M=new se,y=new se,x=new se,A=[],w={};this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone(),this.zoom0=this.object.zoom,this.handleResize=function(){let N=i.domElement.getBoundingClientRect(),Z=i.domElement.ownerDocument.documentElement;i.screen.left=N.left+window.pageXOffset-Z.clientLeft,i.screen.top=N.top+window.pageYOffset-Z.clientTop,i.screen.width=N.width,i.screen.height=N.height};let T=function(){let N=new se;return function(ae,fe){return N.set((ae-i.screen.left)/i.screen.width,(fe-i.screen.top)/i.screen.height),N}}(),R=function(){let N=new se;return function(ae,fe){return N.set((ae-i.screen.width*.5-i.screen.left)/(i.screen.width*.5),(i.screen.height+2*(i.screen.top-fe))/i.screen.width),N}}();this.rotateCamera=function(){let N=new L,Z=new xt,ae=new L,fe=new L,F=new L,ge=new L;return function(){ge.set(v.x-g.x,v.y-g.y,0);let Ve=ge.length();Ve?(m.copy(i.object.position).sub(i.target),ae.copy(m).normalize(),fe.copy(i.object.up).normalize(),F.crossVectors(fe,ae).normalize(),fe.setLength(v.y-g.y),F.setLength(v.x-g.x),ge.copy(fe.add(F)),N.crossVectors(ge,m).normalize(),Ve*=i.rotateSpeed,Z.setFromAxisAngle(N,Ve),m.applyQuaternion(Z),i.object.up.applyQuaternion(Z),p.copy(N),d=Ve):!i.staticMoving&&d&&(d*=Math.sqrt(1-i.dynamicDampingFactor),m.copy(i.object.position).sub(i.target),Z.setFromAxisAngle(p,d),m.applyQuaternion(Z),i.object.up.applyQuaternion(Z)),g.copy(v)}}(),this.zoomCamera=function(){let N;l===r.TOUCH_ZOOM_PAN?(N=u/h,u=h,i.object.isPerspectiveCamera?m.multiplyScalar(N):i.object.isOrthographicCamera?(i.object.zoom=Jr.clamp(i.object.zoom/N,i.minZoom,i.maxZoom),a!==i.object.zoom&&i.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")):(N=1+(M.y-f.y)*i.zoomSpeed,N!==1&&N>0&&(i.object.isPerspectiveCamera?m.multiplyScalar(N):i.object.isOrthographicCamera?(i.object.zoom=Jr.clamp(i.object.zoom/N,i.minZoom,i.maxZoom),a!==i.object.zoom&&i.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")),i.staticMoving?f.copy(M):f.y+=(M.y-f.y)*this.dynamicDampingFactor)},this.panCamera=function(){let N=new se,Z=new L,ae=new L;return function(){if(N.copy(x).sub(y),N.lengthSq()){if(i.object.isOrthographicCamera){let F=(i.object.right-i.object.left)/i.object.zoom/i.domElement.clientWidth,ge=(i.object.top-i.object.bottom)/i.object.zoom/i.domElement.clientWidth;N.x*=F,N.y*=ge}N.multiplyScalar(m.length()*i.panSpeed),ae.copy(m).cross(i.object.up).setLength(N.x),ae.add(Z.copy(i.object.up).setLength(N.y)),i.object.position.add(ae),i.target.add(ae),i.staticMoving?y.copy(x):y.add(N.subVectors(x,y).multiplyScalar(i.dynamicDampingFactor))}}}(),this.checkDistances=function(){(!i.noZoom||!i.noPan)&&(m.lengthSq()>i.maxDistance*i.maxDistance&&(i.object.position.addVectors(i.target,m.setLength(i.maxDistance)),f.copy(M)),m.lengthSq()<i.minDistance*i.minDistance&&(i.object.position.addVectors(i.target,m.setLength(i.minDistance)),f.copy(M)))},this.update=function(){m.subVectors(i.object.position,i.target),i.noRotate||i.rotateCamera(),i.noZoom||i.zoomCamera(),i.noPan||i.panCamera(),i.object.position.addVectors(i.target,m),i.object.isPerspectiveCamera?(i.checkDistances(),i.object.lookAt(i.target),o.distanceToSquared(i.object.position)>s&&(i.dispatchEvent(Uc),o.copy(i.object.position))):i.object.isOrthographicCamera?(i.object.lookAt(i.target),(o.distanceToSquared(i.object.position)>s||a!==i.object.zoom)&&(i.dispatchEvent(Uc),o.copy(i.object.position),a=i.object.zoom)):console.warn("THREE.TrackballControls: Unsupported camera type")},this.reset=function(){l=r.NONE,c=r.NONE,i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.up.copy(i.up0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),m.subVectors(i.object.position,i.target),i.object.lookAt(i.target),i.dispatchEvent(Uc),o.copy(i.object.position),a=i.object.zoom};function S(N){i.enabled!==!1&&(A.length===0&&(i.domElement.setPointerCapture(N.pointerId),i.domElement.addEventListener("pointermove",b),i.domElement.addEventListener("pointerup",U)),xe(N),N.pointerType==="touch"?ie(N):O(N))}function b(N){i.enabled!==!1&&(N.pointerType==="touch"?G(N):k(N))}function U(N){i.enabled!==!1&&(N.pointerType==="touch"?Q(N):te(),z(N),A.length===0&&(i.domElement.releasePointerCapture(N.pointerId),i.domElement.removeEventListener("pointermove",b),i.domElement.removeEventListener("pointerup",U)))}function B(N){z(N)}function D(N){i.enabled!==!1&&(window.removeEventListener("keydown",D),c===r.NONE&&(N.code===i.keys[r.ROTATE]&&!i.noRotate?c=r.ROTATE:N.code===i.keys[r.ZOOM]&&!i.noZoom?c=r.ZOOM:N.code===i.keys[r.PAN]&&!i.noPan&&(c=r.PAN)))}function I(){i.enabled!==!1&&(c=r.NONE,window.addEventListener("keydown",D))}function O(N){if(l===r.NONE)switch(N.button){case i.mouseButtons.LEFT:l=r.ROTATE;break;case i.mouseButtons.MIDDLE:l=r.ZOOM;break;case i.mouseButtons.RIGHT:l=r.PAN;break}let Z=c!==r.NONE?c:l;Z===r.ROTATE&&!i.noRotate?(v.copy(R(N.pageX,N.pageY)),g.copy(v)):Z===r.ZOOM&&!i.noZoom?(f.copy(T(N.pageX,N.pageY)),M.copy(f)):Z===r.PAN&&!i.noPan&&(y.copy(T(N.pageX,N.pageY)),x.copy(y)),i.dispatchEvent(Fc)}function k(N){let Z=c!==r.NONE?c:l;Z===r.ROTATE&&!i.noRotate?(g.copy(v),v.copy(R(N.pageX,N.pageY))):Z===r.ZOOM&&!i.noZoom?M.copy(T(N.pageX,N.pageY)):Z===r.PAN&&!i.noPan&&x.copy(T(N.pageX,N.pageY))}function te(){l=r.NONE,i.dispatchEvent(Bc)}function W(N){if(i.enabled!==!1&&i.noZoom!==!0){switch(N.preventDefault(),N.deltaMode){case 2:f.y-=N.deltaY*.025;break;case 1:f.y-=N.deltaY*.01;break;default:f.y-=N.deltaY*25e-5;break}i.dispatchEvent(Fc),i.dispatchEvent(Bc)}}function ie(N){switch(V(N),A.length){case 1:l=r.TOUCH_ROTATE,v.copy(R(A[0].pageX,A[0].pageY)),g.copy(v);break;default:l=r.TOUCH_ZOOM_PAN;let Z=A[0].pageX-A[1].pageX,ae=A[0].pageY-A[1].pageY;h=u=Math.sqrt(Z*Z+ae*ae);let fe=(A[0].pageX+A[1].pageX)/2,F=(A[0].pageY+A[1].pageY)/2;y.copy(T(fe,F)),x.copy(y);break}i.dispatchEvent(Fc)}function G(N){switch(V(N),A.length){case 1:g.copy(v),v.copy(R(N.pageX,N.pageY));break;default:let Z=J(N),ae=N.pageX-Z.x,fe=N.pageY-Z.y;h=Math.sqrt(ae*ae+fe*fe);let F=(N.pageX+Z.x)/2,ge=(N.pageY+Z.y)/2;x.copy(T(F,ge));break}}function Q(N){switch(A.length){case 0:l=r.NONE;break;case 1:l=r.TOUCH_ROTATE,v.copy(R(N.pageX,N.pageY)),g.copy(v);break;case 2:l=r.TOUCH_ZOOM_PAN;for(let Z=0;Z<A.length;Z++)if(A[Z].pointerId!==N.pointerId){let ae=w[A[Z].pointerId];v.copy(R(ae.x,ae.y)),g.copy(v);break}break}i.dispatchEvent(Bc)}function le(N){i.enabled!==!1&&N.preventDefault()}function xe(N){A.push(N)}function z(N){delete w[N.pointerId];for(let Z=0;Z<A.length;Z++)if(A[Z].pointerId==N.pointerId){A.splice(Z,1);return}}function V(N){let Z=w[N.pointerId];Z===void 0&&(Z=new se,w[N.pointerId]=Z),Z.set(N.pageX,N.pageY)}function J(N){let Z=N.pointerId===A[0].pointerId?A[1]:A[0];return w[Z.pointerId]}this.dispose=function(){i.domElement.removeEventListener("contextmenu",le),i.domElement.removeEventListener("pointerdown",S),i.domElement.removeEventListener("pointercancel",B),i.domElement.removeEventListener("wheel",W),i.domElement.removeEventListener("pointermove",b),i.domElement.removeEventListener("pointerup",U),window.removeEventListener("keydown",D),window.removeEventListener("keyup",I)},this.domElement.addEventListener("contextmenu",le),this.domElement.addEventListener("pointerdown",S),this.domElement.addEventListener("pointercancel",B),this.domElement.addEventListener("wheel",W,{passive:!1}),window.addEventListener("keydown",D),window.addEventListener("keyup",I),this.handleResize(),this.update()}};var tm={type:"change"},kc={type:"start"},nm={type:"end"},Jo=new _i,im=new jt,uw=Math.cos(70*Jr.DEG2RAD),Ko=class extends _t{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yt.ROTATE,MIDDLE:Yt.DOLLY,RIGHT:Yt.PAN},this.touches={ONE:Si.ROTATE,TWO:Si.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(_){_.addEventListener("keydown",pe),this._domElementKeyEvents=_},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",pe),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(tm),i.update(),s=r.NONE},this.update=function(){let _=new L,j=new xt().setFromUnitVectors(e.up,new L(0,1,0)),K=j.clone().invert(),ce=new L,me=new xt,We=new L,ze=2*Math.PI;return function(pt=null){let Je=i.object.position;_.copy(Je).sub(i.target),_.applyQuaternion(j),a.setFromVector3(_),i.autoRotate&&s===r.NONE&&B(b(pt)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let ct=i.minAzimuthAngle,ut=i.maxAzimuthAngle;isFinite(ct)&&isFinite(ut)&&(ct<-Math.PI?ct+=ze:ct>Math.PI&&(ct-=ze),ut<-Math.PI?ut+=ze:ut>Math.PI&&(ut-=ze),ct<=ut?a.theta=Math.max(ct,Math.min(ut,a.theta)):a.theta=a.theta>(ct+ut)/2?Math.max(ct,a.theta):Math.min(ut,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let Vt=!1;if(i.zoomToCursor&&w||i.object.isOrthographicCamera)a.radius=G(a.radius);else{let Jt=a.radius;a.radius=G(a.radius*c),Vt=Jt!=a.radius}if(_.setFromSpherical(a),_.applyQuaternion(K),Je.copy(i.target).add(_),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),i.zoomToCursor&&w){let Jt=null;if(i.object.isPerspectiveCamera){let Bn=_.length();Jt=G(Bn*c);let Ti=Bn-Jt;i.object.position.addScaledVector(x,Ti),i.object.updateMatrixWorld(),Vt=!!Ti}else if(i.object.isOrthographicCamera){let Bn=new L(A.x,A.y,0);Bn.unproject(i.object);let Ti=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Vt=Ti!==i.object.zoom;let si=new L(A.x,A.y,0);si.unproject(i.object),i.object.position.sub(si).add(Bn),i.object.updateMatrixWorld(),Jt=_.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Jt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Jt).add(i.object.position):(Jo.origin.copy(i.object.position),Jo.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Jo.direction))<uw?e.lookAt(i.target):(im.setFromNormalAndCoplanarPoint(i.object.up,i.target),Jo.intersectPlane(im,i.target))))}else if(i.object.isOrthographicCamera){let Jt=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),Jt!==i.object.zoom&&(i.object.updateProjectionMatrix(),Vt=!0)}return c=1,w=!1,Vt||ce.distanceToSquared(i.object.position)>o||8*(1-me.dot(i.object.quaternion))>o||We.distanceToSquared(i.target)>o?(i.dispatchEvent(tm),ce.copy(i.object.position),me.copy(i.object.quaternion),We.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ye),i.domElement.removeEventListener("pointerdown",$),i.domElement.removeEventListener("pointercancel",ne),i.domElement.removeEventListener("wheel",oe),i.domElement.removeEventListener("pointermove",ee),i.domElement.removeEventListener("pointerup",ne),i.domElement.getRootNode().removeEventListener("keydown",Te,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",pe),i._domElementKeyEvents=null)};let i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=r.NONE,o=1e-6,a=new Mi,l=new Mi,c=1,u=new L,h=new se,d=new se,m=new se,g=new se,v=new se,p=new se,f=new se,M=new se,y=new se,x=new L,A=new se,w=!1,T=[],R={},S=!1;function b(_){return _!==null?2*Math.PI/60*i.autoRotateSpeed*_:2*Math.PI/60/60*i.autoRotateSpeed}function U(_){let j=Math.abs(_*.01);return Math.pow(.95,i.zoomSpeed*j)}function B(_){l.theta-=_}function D(_){l.phi-=_}let I=function(){let _=new L;return function(K,ce){_.setFromMatrixColumn(ce,0),_.multiplyScalar(-K),u.add(_)}}(),O=function(){let _=new L;return function(K,ce){i.screenSpacePanning===!0?_.setFromMatrixColumn(ce,1):(_.setFromMatrixColumn(ce,0),_.crossVectors(i.object.up,_)),_.multiplyScalar(K),u.add(_)}}(),k=function(){let _=new L;return function(K,ce){let me=i.domElement;if(i.object.isPerspectiveCamera){let We=i.object.position;_.copy(We).sub(i.target);let ze=_.length();ze*=Math.tan(i.object.fov/2*Math.PI/180),I(2*K*ze/me.clientHeight,i.object.matrix),O(2*ce*ze/me.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(I(K*(i.object.right-i.object.left)/i.object.zoom/me.clientWidth,i.object.matrix),O(ce*(i.object.top-i.object.bottom)/i.object.zoom/me.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function te(_){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=_:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function W(_){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=_:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ie(_,j){if(!i.zoomToCursor)return;w=!0;let K=i.domElement.getBoundingClientRect(),ce=_-K.left,me=j-K.top,We=K.width,ze=K.height;A.x=ce/We*2-1,A.y=-(me/ze)*2+1,x.set(A.x,A.y,1).unproject(i.object).sub(i.object.position).normalize()}function G(_){return Math.max(i.minDistance,Math.min(i.maxDistance,_))}function Q(_){h.set(_.clientX,_.clientY)}function le(_){ie(_.clientX,_.clientX),f.set(_.clientX,_.clientY)}function xe(_){g.set(_.clientX,_.clientY)}function z(_){d.set(_.clientX,_.clientY),m.subVectors(d,h).multiplyScalar(i.rotateSpeed);let j=i.domElement;B(2*Math.PI*m.x/j.clientHeight),D(2*Math.PI*m.y/j.clientHeight),h.copy(d),i.update()}function V(_){M.set(_.clientX,_.clientY),y.subVectors(M,f),y.y>0?te(U(y.y)):y.y<0&&W(U(y.y)),f.copy(M),i.update()}function J(_){v.set(_.clientX,_.clientY),p.subVectors(v,g).multiplyScalar(i.panSpeed),k(p.x,p.y),g.copy(v),i.update()}function N(_){ie(_.clientX,_.clientY),_.deltaY<0?W(U(_.deltaY)):_.deltaY>0&&te(U(_.deltaY)),i.update()}function Z(_){let j=!1;switch(_.code){case i.keys.UP:_.ctrlKey||_.metaKey||_.shiftKey?D(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,i.keyPanSpeed),j=!0;break;case i.keys.BOTTOM:_.ctrlKey||_.metaKey||_.shiftKey?D(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,-i.keyPanSpeed),j=!0;break;case i.keys.LEFT:_.ctrlKey||_.metaKey||_.shiftKey?B(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(i.keyPanSpeed,0),j=!0;break;case i.keys.RIGHT:_.ctrlKey||_.metaKey||_.shiftKey?B(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(-i.keyPanSpeed,0),j=!0;break}j&&(_.preventDefault(),i.update())}function ae(_){if(T.length===1)h.set(_.pageX,_.pageY);else{let j=Ye(_),K=.5*(_.pageX+j.x),ce=.5*(_.pageY+j.y);h.set(K,ce)}}function fe(_){if(T.length===1)g.set(_.pageX,_.pageY);else{let j=Ye(_),K=.5*(_.pageX+j.x),ce=.5*(_.pageY+j.y);g.set(K,ce)}}function F(_){let j=Ye(_),K=_.pageX-j.x,ce=_.pageY-j.y,me=Math.sqrt(K*K+ce*ce);f.set(0,me)}function ge(_){i.enableZoom&&F(_),i.enablePan&&fe(_)}function Se(_){i.enableZoom&&F(_),i.enableRotate&&ae(_)}function Ve(_){if(T.length==1)d.set(_.pageX,_.pageY);else{let K=Ye(_),ce=.5*(_.pageX+K.x),me=.5*(_.pageY+K.y);d.set(ce,me)}m.subVectors(d,h).multiplyScalar(i.rotateSpeed);let j=i.domElement;B(2*Math.PI*m.x/j.clientHeight),D(2*Math.PI*m.y/j.clientHeight),h.copy(d)}function we(_){if(T.length===1)v.set(_.pageX,_.pageY);else{let j=Ye(_),K=.5*(_.pageX+j.x),ce=.5*(_.pageY+j.y);v.set(K,ce)}p.subVectors(v,g).multiplyScalar(i.panSpeed),k(p.x,p.y),g.copy(v)}function ke(_){let j=Ye(_),K=_.pageX-j.x,ce=_.pageY-j.y,me=Math.sqrt(K*K+ce*ce);M.set(0,me),y.set(0,Math.pow(M.y/f.y,i.zoomSpeed)),te(y.y),f.copy(M);let We=(_.pageX+j.x)*.5,ze=(_.pageY+j.y)*.5;ie(We,ze)}function P(_){i.enableZoom&&ke(_),i.enablePan&&we(_)}function E(_){i.enableZoom&&ke(_),i.enableRotate&&Ve(_)}function $(_){i.enabled!==!1&&(T.length===0&&(i.domElement.setPointerCapture(_.pointerId),i.domElement.addEventListener("pointermove",ee),i.domElement.addEventListener("pointerup",ne)),!qe(_)&&(He(_),_.pointerType==="touch"?Pe(_):re(_)))}function ee(_){i.enabled!==!1&&(_.pointerType==="touch"?ve(_):Ae(_))}function ne(_){switch(Ge(_),T.length){case 0:i.domElement.releasePointerCapture(_.pointerId),i.domElement.removeEventListener("pointermove",ee),i.domElement.removeEventListener("pointerup",ne),i.dispatchEvent(nm),s=r.NONE;break;case 1:let j=T[0],K=R[j];Pe({pointerId:j,pageX:K.x,pageY:K.y});break}}function re(_){let j;switch(_.button){case 0:j=i.mouseButtons.LEFT;break;case 1:j=i.mouseButtons.MIDDLE;break;case 2:j=i.mouseButtons.RIGHT;break;default:j=-1}switch(j){case Yt.DOLLY:if(i.enableZoom===!1)return;le(_),s=r.DOLLY;break;case Yt.ROTATE:if(_.ctrlKey||_.metaKey||_.shiftKey){if(i.enablePan===!1)return;xe(_),s=r.PAN}else{if(i.enableRotate===!1)return;Q(_),s=r.ROTATE}break;case Yt.PAN:if(_.ctrlKey||_.metaKey||_.shiftKey){if(i.enableRotate===!1)return;Q(_),s=r.ROTATE}else{if(i.enablePan===!1)return;xe(_),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(kc)}function Ae(_){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;z(_);break;case r.DOLLY:if(i.enableZoom===!1)return;V(_);break;case r.PAN:if(i.enablePan===!1)return;J(_);break}}function oe(_){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(_.preventDefault(),i.dispatchEvent(kc),N(Ee(_)),i.dispatchEvent(nm))}function Ee(_){let j=_.deltaMode,K={clientX:_.clientX,clientY:_.clientY,deltaY:_.deltaY};switch(j){case 1:K.deltaY*=16;break;case 2:K.deltaY*=100;break}return _.ctrlKey&&!S&&(K.deltaY*=10),K}function Te(_){_.key==="Control"&&(S=!0,i.domElement.getRootNode().addEventListener("keyup",ue,{passive:!0,capture:!0}))}function ue(_){_.key==="Control"&&(S=!1,i.domElement.getRootNode().removeEventListener("keyup",ue,{passive:!0,capture:!0}))}function pe(_){i.enabled===!1||i.enablePan===!1||Z(_)}function Pe(_){switch(Xe(_),T.length){case 1:switch(i.touches.ONE){case Si.ROTATE:if(i.enableRotate===!1)return;ae(_),s=r.TOUCH_ROTATE;break;case Si.PAN:if(i.enablePan===!1)return;fe(_),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Si.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ge(_),s=r.TOUCH_DOLLY_PAN;break;case Si.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Se(_),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(kc)}function ve(_){switch(Xe(_),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ve(_),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;we(_),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;P(_),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;E(_),i.update();break;default:s=r.NONE}}function ye(_){i.enabled!==!1&&_.preventDefault()}function He(_){T.push(_.pointerId)}function Ge(_){delete R[_.pointerId];for(let j=0;j<T.length;j++)if(T[j]==_.pointerId){T.splice(j,1);return}}function qe(_){for(let j=0;j<T.length;j++)if(T[j]==_.pointerId)return!0;return!1}function Xe(_){let j=R[_.pointerId];j===void 0&&(j=new se,R[_.pointerId]=j),j.set(_.pageX,_.pageY)}function Ye(_){let j=_.pointerId===T[0]?T[1]:T[0];return R[j]}i.domElement.addEventListener("contextmenu",ye),i.domElement.addEventListener("pointerdown",$),i.domElement.addEventListener("pointercancel",ne),i.domElement.addEventListener("wheel",oe,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",Te,{passive:!0,capture:!0}),this.update()}};var hw={type:"change"},Qo=class extends _t{constructor(e,t){super(),this.object=e,this.domElement=t,this.enabled=!0,this.movementSpeed=1,this.rollSpeed=.005,this.dragToLook=!1,this.autoForward=!1;let i=this,r=1e-6,s=new xt,o=new L;this.tmpQuaternion=new xt,this.status=0,this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0},this.moveVector=new L(0,0,0),this.rotationVector=new L(0,0,0),this.keydown=function(g){if(!(g.altKey||this.enabled===!1)){switch(g.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=.1;break;case"KeyW":this.moveState.forward=1;break;case"KeyS":this.moveState.back=1;break;case"KeyA":this.moveState.left=1;break;case"KeyD":this.moveState.right=1;break;case"KeyR":this.moveState.up=1;break;case"KeyF":this.moveState.down=1;break;case"ArrowUp":this.moveState.pitchUp=1;break;case"ArrowDown":this.moveState.pitchDown=1;break;case"ArrowLeft":this.moveState.yawLeft=1;break;case"ArrowRight":this.moveState.yawRight=1;break;case"KeyQ":this.moveState.rollLeft=1;break;case"KeyE":this.moveState.rollRight=1;break}this.updateMovementVector(),this.updateRotationVector()}},this.keyup=function(g){if(this.enabled!==!1){switch(g.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=1;break;case"KeyW":this.moveState.forward=0;break;case"KeyS":this.moveState.back=0;break;case"KeyA":this.moveState.left=0;break;case"KeyD":this.moveState.right=0;break;case"KeyR":this.moveState.up=0;break;case"KeyF":this.moveState.down=0;break;case"ArrowUp":this.moveState.pitchUp=0;break;case"ArrowDown":this.moveState.pitchDown=0;break;case"ArrowLeft":this.moveState.yawLeft=0;break;case"ArrowRight":this.moveState.yawRight=0;break;case"KeyQ":this.moveState.rollLeft=0;break;case"KeyE":this.moveState.rollRight=0;break}this.updateMovementVector(),this.updateRotationVector()}},this.pointerdown=function(g){if(this.enabled!==!1)if(this.dragToLook)this.status++;else{switch(g.button){case 0:this.moveState.forward=1;break;case 2:this.moveState.back=1;break}this.updateMovementVector()}},this.pointermove=function(g){if(this.enabled!==!1&&(!this.dragToLook||this.status>0)){let v=this.getContainerDimensions(),p=v.size[0]/2,f=v.size[1]/2;this.moveState.yawLeft=-(g.pageX-v.offset[0]-p)/p,this.moveState.pitchDown=(g.pageY-v.offset[1]-f)/f,this.updateRotationVector()}},this.pointerup=function(g){if(this.enabled!==!1){if(this.dragToLook)this.status--,this.moveState.yawLeft=this.moveState.pitchDown=0;else{switch(g.button){case 0:this.moveState.forward=0;break;case 2:this.moveState.back=0;break}this.updateMovementVector()}this.updateRotationVector()}},this.pointercancel=function(){this.enabled!==!1&&(this.dragToLook?(this.status=0,this.moveState.yawLeft=this.moveState.pitchDown=0):(this.moveState.forward=0,this.moveState.back=0,this.updateMovementVector()),this.updateRotationVector())},this.contextMenu=function(g){this.enabled!==!1&&g.preventDefault()},this.update=function(g){if(this.enabled===!1)return;let v=g*i.movementSpeed,p=g*i.rollSpeed;i.object.translateX(i.moveVector.x*v),i.object.translateY(i.moveVector.y*v),i.object.translateZ(i.moveVector.z*v),i.tmpQuaternion.set(i.rotationVector.x*p,i.rotationVector.y*p,i.rotationVector.z*p,1).normalize(),i.object.quaternion.multiply(i.tmpQuaternion),(o.distanceToSquared(i.object.position)>r||8*(1-s.dot(i.object.quaternion))>r)&&(i.dispatchEvent(hw),s.copy(i.object.quaternion),o.copy(i.object.position))},this.updateMovementVector=function(){let g=this.moveState.forward||this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right,this.moveVector.y=-this.moveState.down+this.moveState.up,this.moveVector.z=-g+this.moveState.back},this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp,this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft,this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft},this.getContainerDimensions=function(){return this.domElement!=document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}},this.dispose=function(){this.domElement.removeEventListener("contextmenu",a),this.domElement.removeEventListener("pointerdown",c),this.domElement.removeEventListener("pointermove",l),this.domElement.removeEventListener("pointerup",u),this.domElement.removeEventListener("pointercancel",h),window.removeEventListener("keydown",d),window.removeEventListener("keyup",m)};let a=this.contextMenu.bind(this),l=this.pointermove.bind(this),c=this.pointerdown.bind(this),u=this.pointerup.bind(this),h=this.pointercancel.bind(this),d=this.keydown.bind(this),m=this.keyup.bind(this);this.domElement.addEventListener("contextmenu",a),this.domElement.addEventListener("pointerdown",c),this.domElement.addEventListener("pointermove",l),this.domElement.addEventListener("pointerup",u),this.domElement.addEventListener("pointercancel",h),window.addEventListener("keydown",d),window.addEventListener("keyup",m),this.updateMovementVector(),this.updateRotationVector()}};var rm={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Nn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},fw=new ar(-1,1,1,-1,0,1),zc=class extends Ct{constructor(){super(),this.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new at([0,2,0,0,2,0],2))}},dw=new zc,ea=class{constructor(e){this._mesh=new Mt(dw,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,fw)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ta=class extends Nn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof qt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ql.clone(e.uniforms),this.material=new qt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ea(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var fs=class extends Nn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},na=class extends Nn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var ia=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new se);this._width=i.width,this._height=i.height,t=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ir}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ta(rm),this.copyPass.material.blending=yn,this.clock=new hr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}fs!==void 0&&(o instanceof fs?i=!0:o instanceof na&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ra=class extends Nn{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ne}render(e,t,i){let r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}};function Pt(){return Pt=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n},Pt.apply(this,arguments)}function Vc(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Un(n,e){return Un=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},Un(n,e)}function Hc(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,Un(n,e)}function ds(n){return ds=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},ds(n)}function Gc(n){try{return Function.toString.call(n).indexOf("[native code]")!==-1}catch{return typeof n=="function"}}function sa(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(sa=function(){return!!n})()}function Wc(n,e,t){if(sa())return Reflect.construct.apply(null,arguments);var i=[null];i.push.apply(i,e);var r=new(n.bind.apply(n,i));return t&&Un(r,t.prototype),r}function ps(n){var e=typeof Map=="function"?new Map:void 0;return ps=function(i){if(i===null||!Gc(i))return i;if(typeof i!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e<"u"){if(e.has(i))return e.get(i);e.set(i,r)}function r(){return Wc(i,arguments,ds(this).constructor)}return r.prototype=Object.create(i.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),Un(r,i)},ps(n)}var zt=function(n){Hc(e,n);function e(t){var i;if(1)i=n.call(this,"An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#"+t+" for more information.")||this;else for(var r,s,o;o<r;o++);return Vc(i)}return e}(ps(Error));function sm(n,e){return n.substr(-e.length)===e}var pw=/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;function om(n){if(typeof n!="string")return n;var e=n.match(pw);return e?parseFloat(n):n}var mw=function(e){return function(t,i){i===void 0&&(i="16px");var r=t,s=i;if(typeof t=="string"){if(!sm(t,"px"))throw new zt(69,e,t);r=om(t)}if(typeof i=="string"){if(!sm(i,"px"))throw new zt(70,e,i);s=om(i)}if(typeof r=="string")throw new zt(71,t,e);if(typeof s=="string")throw new zt(72,i,e);return""+r/s+e}},lm=mw,wR=lm("em");var ER=lm("rem");function jc(n){return Math.round(n*255)}function gw(n,e,t){return jc(n)+","+jc(e)+","+jc(t)}function ms(n,e,t,i){if(i===void 0&&(i=gw),e===0)return i(t,t,t);var r=(n%360+360)%360/60,s=(1-Math.abs(2*t-1))*e,o=s*(1-Math.abs(r%2-1)),a=0,l=0,c=0;r>=0&&r<1?(a=s,l=o):r>=1&&r<2?(a=o,l=s):r>=2&&r<3?(l=s,c=o):r>=3&&r<4?(l=o,c=s):r>=4&&r<5?(a=o,c=s):r>=5&&r<6&&(a=s,c=o);var u=t-s/2,h=a+u,d=l+u,m=c+u;return i(h,d,m)}var am={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function vw(n){if(typeof n!="string")return n;var e=n.toLowerCase();return am[e]?"#"+am[e]:n}var yw=/^#[a-fA-F0-9]{6}$/,_w=/^#[a-fA-F0-9]{8}$/,xw=/^#[a-fA-F0-9]{3}$/,bw=/^#[a-fA-F0-9]{4}$/,Xc=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,Mw=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,Sw=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,ww=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function ti(n){if(typeof n!="string")throw new zt(3);var e=vw(n);if(e.match(yw))return{red:parseInt(""+e[1]+e[2],16),green:parseInt(""+e[3]+e[4],16),blue:parseInt(""+e[5]+e[6],16)};if(e.match(_w)){var t=parseFloat((parseInt(""+e[7]+e[8],16)/255).toFixed(2));return{red:parseInt(""+e[1]+e[2],16),green:parseInt(""+e[3]+e[4],16),blue:parseInt(""+e[5]+e[6],16),alpha:t}}if(e.match(xw))return{red:parseInt(""+e[1]+e[1],16),green:parseInt(""+e[2]+e[2],16),blue:parseInt(""+e[3]+e[3],16)};if(e.match(bw)){var i=parseFloat((parseInt(""+e[4]+e[4],16)/255).toFixed(2));return{red:parseInt(""+e[1]+e[1],16),green:parseInt(""+e[2]+e[2],16),blue:parseInt(""+e[3]+e[3],16),alpha:i}}var r=Xc.exec(e);if(r)return{red:parseInt(""+r[1],10),green:parseInt(""+r[2],10),blue:parseInt(""+r[3],10)};var s=Mw.exec(e.substring(0,50));if(s)return{red:parseInt(""+s[1],10),green:parseInt(""+s[2],10),blue:parseInt(""+s[3],10),alpha:parseFloat(""+s[4])>1?parseFloat(""+s[4])/100:parseFloat(""+s[4])};var o=Sw.exec(e);if(o){var a=parseInt(""+o[1],10),l=parseInt(""+o[2],10)/100,c=parseInt(""+o[3],10)/100,u="rgb("+ms(a,l,c)+")",h=Xc.exec(u);if(!h)throw new zt(4,e,u);return{red:parseInt(""+h[1],10),green:parseInt(""+h[2],10),blue:parseInt(""+h[3],10)}}var d=ww.exec(e.substring(0,50));if(d){var m=parseInt(""+d[1],10),g=parseInt(""+d[2],10)/100,v=parseInt(""+d[3],10)/100,p="rgb("+ms(m,g,v)+")",f=Xc.exec(p);if(!f)throw new zt(4,e,p);return{red:parseInt(""+f[1],10),green:parseInt(""+f[2],10),blue:parseInt(""+f[3],10),alpha:parseFloat(""+d[4])>1?parseFloat(""+d[4])/100:parseFloat(""+d[4])}}throw new zt(5)}function Ew(n){var e=n.red/255,t=n.green/255,i=n.blue/255,r=Math.max(e,t,i),s=Math.min(e,t,i),o=(r+s)/2;if(r===s)return n.alpha!==void 0?{hue:0,saturation:0,lightness:o,alpha:n.alpha}:{hue:0,saturation:0,lightness:o};var a,l=r-s,c=o>.5?l/(2-r-s):l/(r+s);switch(r){case e:a=(t-i)/l+(t<i?6:0);break;case t:a=(i-e)/l+2;break;default:a=(e-t)/l+4;break}return a*=60,n.alpha!==void 0?{hue:a,saturation:c,lightness:o,alpha:n.alpha}:{hue:a,saturation:c,lightness:o}}function ni(n){return Ew(ti(n))}var Aw=function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},Yc=Aw;function Ai(n){var e=n.toString(16);return e.length===1?"0"+e:e}function qc(n){return Ai(Math.round(n*255))}function Tw(n,e,t){return Yc("#"+qc(n)+qc(e)+qc(t))}function oa(n,e,t){return ms(n,e,t,Tw)}function Cw(n,e,t){if(typeof n=="number"&&typeof e=="number"&&typeof t=="number")return oa(n,e,t);if(typeof n=="object"&&e===void 0&&t===void 0)return oa(n.hue,n.saturation,n.lightness);throw new zt(1)}function Rw(n,e,t,i){if(typeof n=="number"&&typeof e=="number"&&typeof t=="number"&&typeof i=="number")return i>=1?oa(n,e,t):"rgba("+ms(n,e,t)+","+i+")";if(typeof n=="object"&&e===void 0&&t===void 0&&i===void 0)return n.alpha>=1?oa(n.hue,n.saturation,n.lightness):"rgba("+ms(n.hue,n.saturation,n.lightness)+","+n.alpha+")";throw new zt(2)}function $c(n,e,t){if(typeof n=="number"&&typeof e=="number"&&typeof t=="number")return Yc("#"+Ai(n)+Ai(e)+Ai(t));if(typeof n=="object"&&e===void 0&&t===void 0)return Yc("#"+Ai(n.red)+Ai(n.green)+Ai(n.blue));throw new zt(6)}function aa(n,e,t,i){if(typeof n=="string"&&typeof e=="number"){var r=ti(n);return"rgba("+r.red+","+r.green+","+r.blue+","+e+")"}else{if(typeof n=="number"&&typeof e=="number"&&typeof t=="number"&&typeof i=="number")return i>=1?$c(n,e,t):"rgba("+n+","+e+","+t+","+i+")";if(typeof n=="object"&&e===void 0&&t===void 0&&i===void 0)return n.alpha>=1?$c(n.red,n.green,n.blue):"rgba("+n.red+","+n.green+","+n.blue+","+n.alpha+")"}throw new zt(7)}var Pw=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},Iw=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},Lw=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},Ow=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"};function ii(n){if(typeof n!="object")throw new zt(8);if(Iw(n))return aa(n);if(Pw(n))return $c(n);if(Ow(n))return Rw(n);if(Lw(n))return Cw(n);throw new zt(8)}function cm(n,e,t){return function(){var r=t.concat(Array.prototype.slice.call(arguments));return r.length>=e?n.apply(this,r):cm(n,e,r)}}function Zt(n){return cm(n,n.length,[])}function Dw(n,e){if(e==="transparent")return e;var t=ni(e);return ii(Pt({},t,{hue:t.hue+parseFloat(n)}))}var AR=Zt(Dw);function xr(n,e,t){return Math.max(n,Math.min(e,t))}function Nw(n,e){if(e==="transparent")return e;var t=ni(e);return ii(Pt({},t,{lightness:xr(0,1,t.lightness-parseFloat(n))}))}var TR=Zt(Nw);function Uw(n,e){if(e==="transparent")return e;var t=ni(e);return ii(Pt({},t,{saturation:xr(0,1,t.saturation-parseFloat(n))}))}var CR=Zt(Uw);function Fw(n,e){if(e==="transparent")return e;var t=ni(e);return ii(Pt({},t,{lightness:xr(0,1,t.lightness+parseFloat(n))}))}var RR=Zt(Fw);function Bw(n,e,t){if(e==="transparent")return t;if(t==="transparent")return e;if(n===0)return t;var i=ti(e),r=Pt({},i,{alpha:typeof i.alpha=="number"?i.alpha:1}),s=ti(t),o=Pt({},s,{alpha:typeof s.alpha=="number"?s.alpha:1}),a=r.alpha-o.alpha,l=parseFloat(n)*2-1,c=l*a===-1?l:l+a,u=1+l*a,h=(c/u+1)/2,d=1-h,m={red:Math.floor(r.red*h+o.red*d),green:Math.floor(r.green*h+o.green*d),blue:Math.floor(r.blue*h+o.blue*d),alpha:r.alpha*parseFloat(n)+o.alpha*(1-parseFloat(n))};return aa(m)}var kw=Zt(Bw),um=kw;function zw(n,e){if(e==="transparent")return e;var t=ti(e),i=typeof t.alpha=="number"?t.alpha:1,r=Pt({},t,{alpha:xr(0,1,(i*100+parseFloat(n)*100)/100)});return aa(r)}var Vw=Zt(zw),hm=Vw;function Hw(n,e){if(e==="transparent")return e;var t=ni(e);return ii(Pt({},t,{saturation:xr(0,1,t.saturation+parseFloat(n))}))}var PR=Zt(Hw);function Gw(n,e){return e==="transparent"?e:ii(Pt({},ni(e),{hue:parseFloat(n)}))}var IR=Zt(Gw);function Ww(n,e){return e==="transparent"?e:ii(Pt({},ni(e),{lightness:parseFloat(n)}))}var LR=Zt(Ww);function jw(n,e){return e==="transparent"?e:ii(Pt({},ni(e),{saturation:parseFloat(n)}))}var OR=Zt(jw);function Xw(n,e){return e==="transparent"?e:um(parseFloat(n),"rgb(0, 0, 0)",e)}var DR=Zt(Xw);function qw(n,e){return e==="transparent"?e:um(parseFloat(n),"rgb(255, 255, 255)",e)}var NR=Zt(qw);function Yw(n,e){if(e==="transparent")return e;var t=ti(e),i=typeof t.alpha=="number"?t.alpha:1,r=Pt({},t,{alpha:xr(0,1,+(i*100-parseFloat(n)*100).toFixed(2)/100)});return aa(r)}var UR=Zt(Yw);var ri=Object.freeze({Linear:Object.freeze({None:function(n){return n},In:function(n){return this.None(n)},Out:function(n){return this.None(n)},InOut:function(n){return this.None(n)}}),Quadratic:Object.freeze({In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}}),Cubic:Object.freeze({In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}}),Quartic:Object.freeze({In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}}),Quintic:Object.freeze({In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}}),Sinusoidal:Object.freeze({In:function(n){return 1-Math.sin((1-n)*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return .5*(1-Math.sin(Math.PI*(.5-n)))}}),Exponential:Object.freeze({In:function(n){return n===0?0:Math.pow(1024,n-1)},Out:function(n){return n===1?1:1-Math.pow(2,-10*n)},InOut:function(n){return n===0?0:n===1?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}}),Circular:Object.freeze({In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}}),Elastic:Object.freeze({In:function(n){return n===0?0:n===1?1:-Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI)},Out:function(n){return n===0?0:n===1?1:Math.pow(2,-10*n)*Math.sin((n-.1)*5*Math.PI)+1},InOut:function(n){return n===0?0:n===1?1:(n*=2,n<1?-.5*Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin((n-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(n){var e=1.70158;return n===1?1:n*n*((e+1)*n-e)},Out:function(n){var e=1.70158;return n===0?0:--n*n*((e+1)*n+e)+1},InOut:function(n){var e=2.5949095;return(n*=2)<1?.5*(n*n*((e+1)*n-e)):.5*((n-=2)*n*((e+1)*n+e)+2)}}),Bounce:Object.freeze({In:function(n){return 1-ri.Bounce.Out(1-n)},Out:function(n){return n<.36363636363636365?7.5625*n*n:n<.7272727272727273?7.5625*(n-=.5454545454545454)*n+.75:n<.9090909090909091?7.5625*(n-=.8181818181818182)*n+.9375:7.5625*(n-=.9545454545454546)*n+.984375},InOut:function(n){return n<.5?ri.Bounce.In(n*2)*.5:ri.Bounce.Out(n*2-1)*.5+.5}}),generatePow:function(n){return n===void 0&&(n=4),n=n<Number.EPSILON?Number.EPSILON:n,n=n>1e4?1e4:n,{In:function(e){return Math.pow(e,n)},Out:function(e){return 1-Math.pow(1-e,n)},InOut:function(e){return e<.5?Math.pow(e*2,n)/2:(1-Math.pow(2-e*2,n))/2+.5}}}}),gs=function(){return performance.now()},$w=function(){function n(){this._tweens={},this._tweensAddedDuringUpdate={}}return n.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},n.prototype.removeAll=function(){this._tweens={}},n.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},n.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},n.prototype.update=function(e,t){e===void 0&&(e=gs()),t===void 0&&(t=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<i.length;r++){var s=this._tweens[i[r]],o=!t;s&&s.update(e,o)===!1&&!t&&delete this._tweens[i[r]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},n}(),br={Linear:function(n,e){var t=n.length-1,i=t*e,r=Math.floor(i),s=br.Utils.Linear;return e<0?s(n[0],n[1],i):e>1?s(n[t],n[t-1],t-i):s(n[r],n[r+1>t?t:r+1],i-r)},Bezier:function(n,e){for(var t=0,i=n.length-1,r=Math.pow,s=br.Utils.Bernstein,o=0;o<=i;o++)t+=r(1-e,i-o)*r(e,o)*n[o]*s(i,o);return t},CatmullRom:function(n,e){var t=n.length-1,i=t*e,r=Math.floor(i),s=br.Utils.CatmullRom;return n[0]===n[t]?(e<0&&(r=Math.floor(i=t*(1+e))),s(n[(r-1+t)%t],n[r],n[(r+1)%t],n[(r+2)%t],i-r)):e<0?n[0]-(s(n[0],n[0],n[1],n[1],-i)-n[0]):e>1?n[t]-(s(n[t],n[t],n[t-1],n[t-1],i-t)-n[t]):s(n[r?r-1:0],n[r],n[t<r+1?t:r+1],n[t<r+2?t:r+2],i-r)},Utils:{Linear:function(n,e,t){return(e-n)*t+n},Bernstein:function(n,e){var t=br.Utils.Factorial;return t(n)/t(e)/t(n-e)},Factorial:function(){var n=[1];return function(e){var t=1;if(n[e])return n[e];for(var i=e;i>1;i--)t*=i;return n[e]=t,t}}(),CatmullRom:function(n,e,t,i,r){var s=(t-n)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*t+s+o)*l+(-3*e+3*t-2*s-o)*a+s*r+e}}},fm=function(){function n(){}return n.nextId=function(){return n._nextId++},n._nextId=0,n}(),Zc=new $w,Jc=function(){function n(e,t){t===void 0&&(t=Zc),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=ri.Linear.None,this._interpolationFunction=br.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=fm.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return n.prototype.getId=function(){return this._id},n.prototype.isPlaying=function(){return this._isPlaying},n.prototype.isPaused=function(){return this._isPaused},n.prototype.getDuration=function(){return this._duration},n.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t<0?0:t,this},n.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},n.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},n.prototype.start=function(e,t){if(e===void 0&&(e=gs()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var s in this._valuesEnd)r[s]=this._valuesEnd[s];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},n.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},n.prototype._setupProperties=function(e,t,i,r,s){for(var o in i){var a=e[o],l=Array.isArray(a),c=l?"array":typeof a,u=!l&&Array.isArray(i[o]);if(!(c==="undefined"||c==="function")){if(u){var h=i[o];if(h.length===0)continue;for(var d=[a],m=0,g=h.length;m<g;m+=1){var v=this._handleRelativeValue(a,h[m]);if(isNaN(v)){u=!1,console.warn("Found invalid interpolation list. Skipping.");break}d.push(v)}u&&(i[o]=d)}if((c==="object"||l)&&a&&!u){t[o]=l?[]:{};var p=a;for(var f in p)t[o][f]=p[f];r[o]=l?[]:{};var h=i[o];if(!this._isDynamic){var M={};for(var f in h)M[f]=h[f];i[o]=h=M}this._setupProperties(p,t[o],h,r[o],s)}else(typeof t[o]>"u"||s)&&(t[o]=a),l||(t[o]*=1),u?r[o]=i[o].slice().reverse():r[o]=t[o]||0}}},n.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},n.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},n.prototype.pause=function(e){return e===void 0&&(e=gs()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},n.prototype.resume=function(e){return e===void 0&&(e=gs()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},n.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},n.prototype.group=function(e){return e===void 0&&(e=Zc),this._group=e,this},n.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},n.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},n.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},n.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},n.prototype.easing=function(e){return e===void 0&&(e=ri.Linear.None),this._easingFunction=e,this},n.prototype.interpolation=function(e){return e===void 0&&(e=br.Linear),this._interpolationFunction=e,this},n.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},n.prototype.onStart=function(e){return this._onStartCallback=e,this},n.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},n.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},n.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},n.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},n.prototype.onStop=function(e){return this._onStopCallback=e,this},n.prototype.update=function(e,t){var i=this,r;if(e===void 0&&(e=gs()),t===void 0&&(t=!0),this._isPaused)return!0;var s,o=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>o)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=e-this._startTime,l=this._duration+((r=this._repeatDelayTime)!==null&&r!==void 0?r:this._delayTime),c=this._duration+this._repeat*l,u=function(){if(i._duration===0||a>c)return 1;var p=Math.trunc(a/l),f=a-p*l,M=Math.min(f/i._duration,1);return M===0&&a===i._duration?1:M},h=u(),d=this._easingFunction(h);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,d),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),this._duration===0||a>=this._duration)if(this._repeat>0){var m=Math.min(Math.trunc((a-this._duration)/l)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=m);for(s in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[s]=="string"&&(this._valuesStartRepeat[s]=this._valuesStartRepeat[s]+parseFloat(this._valuesEnd[s])),this._yoyo&&this._swapEndStartRepeatValues(s),this._valuesStart[s]=this._valuesStartRepeat[s];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=l*m,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var g=0,v=this._chainedTweens.length;g<v;g++)this._chainedTweens[g].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},n.prototype._updateProperties=function(e,t,i,r){for(var s in i)if(t[s]!==void 0){var o=t[s]||0,a=i[s],l=Array.isArray(e[s]),c=Array.isArray(a),u=!l&&c;u?e[s]=this._interpolationFunction(a,r):typeof a=="object"&&a?this._updateProperties(e[s],o,a,r):(a=this._handleRelativeValue(o,a),typeof a=="number"&&(e[s]=o+(a-o)*r))}},n.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},n.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},n}();var BR=fm.nextId,xn=Zc,kR=xn.getAll.bind(xn),zR=xn.removeAll.bind(xn),VR=xn.add.bind(xn),HR=xn.remove.bind(xn),dm=xn.update.bind(xn);function Jw(n,e){e===void 0&&(e={});var t=e.insertAt;if(!(!n||typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",t==="top"&&i.firstChild?i.insertBefore(r,i.firstChild):i.appendChild(r),r.styleSheet?r.styleSheet.cssText=n:r.appendChild(document.createTextNode(n))}}var Kw=`.scene-nav-info {
  bottom: 5px;
  width: 100%;
  text-align: center;
  color: slategrey;
  opacity: 0.7;
  font-size: 10px;
}

.scene-tooltip {
  top: 0;
  color: lavender;
  font-size: 15px;
}

.scene-nav-info, .scene-tooltip {
  position: absolute;
  font-family: sans-serif;
  pointer-events: none;
  user-select: none;
}

.scene-container canvas:focus {
  outline: none;
}`;Jw(Kw);function Qw(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function e1(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function t1(n){var e=e1(n,"string");return typeof e=="symbol"?e:String(e)}function n1(n,e,t){return e=t1(e),e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i1(n,e){return s1(n)||Qw(n,e)||pm(n,e)||l1()}function vs(n){return r1(n)||o1(n)||pm(n)||a1()}function r1(n){if(Array.isArray(n))return Kc(n)}function s1(n){if(Array.isArray(n))return n}function o1(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function pm(n,e){if(n){if(typeof n=="string")return Kc(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Kc(n,e)}}function Kc(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function a1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function l1(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var st=window.THREE?window.THREE:{WebGLRenderer:ho,Scene:fo,PerspectiveCamera:Dt,Raycaster:fr,SRGBColorSpace:Bt,TextureLoader:bo,Vector2:se,Vector3:L,Box3:cn,Color:Ne,Mesh:Mt,SphereGeometry:cr,MeshBasicMaterial:sr,BackSide:At,EventDispatcher:_t,MOUSE:Yt,Quaternion:xt,Spherical:Mi,Clock:hr},Qc=yr({props:{width:{default:window.innerWidth,onChange:function(e,t,i){isNaN(e)&&(t.width=i)}},height:{default:window.innerHeight,onChange:function(e,t,i){isNaN(e)&&(t.height=i)}},backgroundColor:{default:"#000011"},backgroundImageUrl:{},onBackgroundImageLoaded:{},showNavInfo:{default:!0},skyRadius:{default:5e4},objects:{default:[]},lights:{default:[]},enablePointerInteraction:{default:!0,onChange:function(e,t){t.hoverObj=null,t.toolTipElem&&(t.toolTipElem.innerHTML="")},triggerUpdate:!1},lineHoverPrecision:{default:1,triggerUpdate:!1},hoverOrderComparator:{default:function(){return-1},triggerUpdate:!1},hoverFilter:{default:function(){return!0},triggerUpdate:!1},tooltipContent:{triggerUpdate:!1},hoverDuringDrag:{default:!1,triggerUpdate:!1},clickAfterDrag:{default:!1,triggerUpdate:!1},onHover:{default:function(){},triggerUpdate:!1},onClick:{default:function(){},triggerUpdate:!1},onRightClick:{triggerUpdate:!1}},methods:{tick:function(e){if(e.initialised){if(e.controls.update&&e.controls.update(e.clock.getDelta()),e.postProcessingComposer?e.postProcessingComposer.render():e.renderer.render(e.scene,e.camera),e.extraRenderers.forEach(function(s){return s.render(e.scene,e.camera)}),e.enablePointerInteraction){var t=null;if(e.hoverDuringDrag||!e.isPointerDragging){var i=this.intersectingObjects(e.pointerPos.x,e.pointerPos.y).filter(function(s){return e.hoverFilter(s.object)}).sort(function(s,o){return e.hoverOrderComparator(s.object,o.object)}),r=i.length?i[0]:null;t=r?r.object:null,e.intersectionPoint=r?r.point:null}t!==e.hoverObj&&(e.onHover(t,e.hoverObj),e.toolTipElem.innerHTML=t&&je(e.tooltipContent)(t)||"",e.hoverObj=t)}dm()}return this},getPointerPos:function(e){var t=e.pointerPos,i=t.x,r=t.y;return{x:i,y:r}},cameraPosition:function(e,t,i,r){var s=e.camera;if(t&&e.initialised){var o=t,a=i||{x:0,y:0,z:0};if(!r)u(o),h(a);else{var l=Object.assign({},s.position),c=d();new Jc(l).to(o,r).easing(ri.Quadratic.Out).onUpdate(u).start(),new Jc(c).to(a,r/3).easing(ri.Quadratic.Out).onUpdate(h).start()}return this}return Object.assign({},s.position,{lookAt:d()});function u(m){var g=m.x,v=m.y,p=m.z;g!==void 0&&(s.position.x=g),v!==void 0&&(s.position.y=v),p!==void 0&&(s.position.z=p)}function h(m){var g=new st.Vector3(m.x,m.y,m.z);e.controls.target?e.controls.target=g:s.lookAt(g)}function d(){return Object.assign(new st.Vector3(0,0,-1e3).applyQuaternion(s.quaternion).add(s.position))}},zoomToFit:function(e){for(var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:10,r=arguments.length,s=new Array(r>3?r-3:0),o=3;o<r;o++)s[o-3]=arguments[o];return this.fitToBbox(this.getBbox.apply(this,s),t,i)},fitToBbox:function(e,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:10,s=e.camera;if(t){var o=new st.Vector3(0,0,0),a=Math.max.apply(Math,vs(Object.entries(t).map(function(m){var g=i1(m,2),v=g[0],p=g[1];return Math.max.apply(Math,vs(p.map(function(f){return Math.abs(o[v]-f)})))})))*2,l=(1-r*2/e.height)*s.fov,c=a/Math.atan(l*Math.PI/180),u=c/s.aspect,h=Math.max(c,u);if(h>0){var d=o.clone().sub(s.position).normalize().multiplyScalar(-h);this.cameraPosition(d,o,i)}}return this},getBbox:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:function(){return!0},i=new st.Box3(new st.Vector3(0,0,0),new st.Vector3(0,0,0)),r=e.objects.filter(t);return r.length?(r.forEach(function(s){return i.expandByObject(s)}),Object.assign.apply(Object,vs(["x","y","z"].map(function(s){return n1({},s,[i.min[s],i.max[s]])})))):null},getScreenCoords:function(e,t,i,r){var s=new st.Vector3(t,i,r);return s.project(this.camera()),{x:(s.x+1)*e.width/2,y:-(s.y-1)*e.height/2}},getSceneCoords:function(e,t,i){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,s=new st.Vector2(t/e.width*2-1,-(i/e.height)*2+1),o=new st.Raycaster;return o.setFromCamera(s,e.camera),Object.assign({},o.ray.at(r,new st.Vector3))},intersectingObjects:function(e,t,i){var r=new st.Vector2(t/e.width*2-1,-(i/e.height)*2+1),s=new st.Raycaster;return s.params.Line.threshold=e.lineHoverPrecision,s.setFromCamera(r,e.camera),s.intersectObjects(e.objects,!0)},renderer:function(e){return e.renderer},scene:function(e){return e.scene},camera:function(e){return e.camera},postProcessingComposer:function(e){return e.postProcessingComposer},controls:function(e){return e.controls},tbControls:function(e){return e.controls}},stateInit:function(){return{scene:new st.Scene,camera:new st.PerspectiveCamera,clock:new st.Clock}},init:function(e,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=i.controlType,s=r===void 0?"trackball":r,o=i.rendererConfig,a=o===void 0?{}:o,l=i.extraRenderers,c=l===void 0?[]:l,u=i.waitForLoadComplete,h=u===void 0?!0:u;e.innerHTML="",e.appendChild(t.container=document.createElement("div")),t.container.className="scene-container",t.container.style.position="relative",t.container.appendChild(t.navInfo=document.createElement("div")),t.navInfo.className="scene-nav-info",t.navInfo.textContent={orbit:"Left-click: rotate, Mouse-wheel/middle-click: zoom, Right-click: pan",trackball:"Left-click: rotate, Mouse-wheel/middle-click: zoom, Right-click: pan",fly:"WASD: move, R|F: up | down, Q|E: roll, up|down: pitch, left|right: yaw"}[s]||"",t.navInfo.style.display=t.showNavInfo?null:"none",t.toolTipElem=document.createElement("div"),t.toolTipElem.classList.add("scene-tooltip"),t.container.appendChild(t.toolTipElem),t.pointerPos=new st.Vector2,t.pointerPos.x=-2,t.pointerPos.y=-2,["pointermove","pointerdown"].forEach(function(d){return t.container.addEventListener(d,function(m){if(d==="pointerdown"&&(t.isPointerPressed=!0),!t.isPointerDragging&&m.type==="pointermove"&&(m.pressure>0||t.isPointerPressed)&&(m.pointerType!=="touch"||m.movementX===void 0||[m.movementX,m.movementY].some(function(p){return Math.abs(p)>1}))&&(t.isPointerDragging=!0),t.enablePointerInteraction){var g=v(t.container);t.pointerPos.x=m.pageX-g.left,t.pointerPos.y=m.pageY-g.top,t.toolTipElem.style.top="".concat(t.pointerPos.y,"px"),t.toolTipElem.style.left="".concat(t.pointerPos.x,"px"),t.toolTipElem.style.transform="translate(-".concat(t.pointerPos.x/t.width*100,"%, ").concat(t.height-t.pointerPos.y<100?"calc(-100% - 8px)":"21px",")")}function v(p){var f=p.getBoundingClientRect(),M=window.pageXOffset||document.documentElement.scrollLeft,y=window.pageYOffset||document.documentElement.scrollTop;return{top:f.top+y,left:f.left+M}}},{passive:!0})}),t.container.addEventListener("pointerup",function(d){t.isPointerPressed=!1,!(t.isPointerDragging&&(t.isPointerDragging=!1,!t.clickAfterDrag))&&requestAnimationFrame(function(){d.button===0&&t.onClick(t.hoverObj||null,d,t.intersectionPoint),d.button===2&&t.onRightClick&&t.onRightClick(t.hoverObj||null,d,t.intersectionPoint)})},{passive:!0,capture:!0}),t.container.addEventListener("contextmenu",function(d){t.onRightClick&&d.preventDefault()}),t.renderer=new st.WebGLRenderer(Object.assign({antialias:!0,alpha:!0},a)),t.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio)),t.container.appendChild(t.renderer.domElement),t.extraRenderers=c,t.extraRenderers.forEach(function(d){d.domElement.style.position="absolute",d.domElement.style.top="0px",d.domElement.style.pointerEvents="none",t.container.appendChild(d.domElement)}),t.postProcessingComposer=new ia(t.renderer),t.postProcessingComposer.addPass(new ra(t.scene,t.camera)),t.controls=new{trackball:Zo,orbit:Ko,fly:Qo}[s](t.camera,t.renderer.domElement),s==="fly"&&(t.controls.movementSpeed=300,t.controls.rollSpeed=Math.PI/6,t.controls.dragToLook=!0),(s==="trackball"||s==="orbit")&&(t.controls.minDistance=.1,t.controls.maxDistance=t.skyRadius,t.controls.addEventListener("start",function(){t.controlsEngaged=!0}),t.controls.addEventListener("change",function(){t.controlsEngaged&&(t.controlsDragging=!0)}),t.controls.addEventListener("end",function(){t.controlsEngaged=!1,t.controlsDragging=!1})),[t.renderer,t.postProcessingComposer].concat(vs(t.extraRenderers)).forEach(function(d){return d.setSize(t.width,t.height)}),t.camera.aspect=t.width/t.height,t.camera.updateProjectionMatrix(),t.camera.position.z=1e3,t.scene.add(t.skysphere=new st.Mesh),t.skysphere.visible=!1,t.loadComplete=t.scene.visible=!h,window.scene=t.scene},update:function(e,t){if(e.width&&e.height&&(t.hasOwnProperty("width")||t.hasOwnProperty("height"))&&(e.container.style.width="".concat(e.width,"px"),e.container.style.height="".concat(e.height,"px"),[e.renderer,e.postProcessingComposer].concat(vs(e.extraRenderers)).forEach(function(s){return s.setSize(e.width,e.height)}),e.camera.aspect=e.width/e.height,e.camera.updateProjectionMatrix()),t.hasOwnProperty("skyRadius")&&e.skyRadius&&(e.controls.hasOwnProperty("maxDistance")&&t.skyRadius&&(e.controls.maxDistance=Math.min(e.controls.maxDistance,e.skyRadius)),e.camera.far=e.skyRadius*2.5,e.camera.updateProjectionMatrix(),e.skysphere.geometry=new st.SphereGeometry(e.skyRadius)),t.hasOwnProperty("backgroundColor")){var i=ti(e.backgroundColor).alpha;i===void 0&&(i=1),e.renderer.setClearColor(new st.Color(hm(1,e.backgroundColor)),i)}t.hasOwnProperty("backgroundImageUrl")&&(e.backgroundImageUrl?new st.TextureLoader().load(e.backgroundImageUrl,function(s){s.colorSpace=st.SRGBColorSpace,e.skysphere.material=new st.MeshBasicMaterial({map:s,side:st.BackSide}),e.skysphere.visible=!0,e.onBackgroundImageLoaded&&setTimeout(e.onBackgroundImageLoaded),!e.loadComplete&&r()}):(e.skysphere.visible=!1,e.skysphere.material.map=null,!e.loadComplete&&r())),t.hasOwnProperty("showNavInfo")&&(e.navInfo.style.display=e.showNavInfo?null:"none"),t.hasOwnProperty("lights")&&((t.lights||[]).forEach(function(s){return e.scene.remove(s)}),e.lights.forEach(function(s){return e.scene.add(s)})),t.hasOwnProperty("objects")&&((t.objects||[]).forEach(function(s){return e.scene.remove(s)}),e.objects.forEach(function(s){return e.scene.add(s)}));function r(){e.loadComplete=e.scene.visible=!0}}});function c1(n,e){e===void 0&&(e={});var t=e.insertAt;if(!(!n||typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",t==="top"&&i.firstChild?i.insertBefore(r,i.firstChild):i.appendChild(r),r.styleSheet?r.styleSheet.cssText=n:r.appendChild(document.createTextNode(n))}}var u1=`.graph-info-msg {
  top: 50%;
  width: 100%;
  text-align: center;
  color: lavender;
  opacity: 0.7;
  font-size: 22px;
  position: absolute;
  font-family: Sans-serif;
}

.scene-container .clickable {
  cursor: pointer;
}

.scene-container .grabbable {
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.scene-container .grabbable:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}`;c1(u1);function mm(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function la(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?mm(Object(t),!0).forEach(function(i){ys(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):mm(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function h1(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function f1(n){var e=h1(n,"string");return typeof e=="symbol"?e:e+""}function ys(n,e,t){return e=f1(e),e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function ua(n){return d1(n)||p1(n)||m1(n)||g1()}function d1(n){if(Array.isArray(n))return tu(n)}function p1(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function m1(n,e){if(n){if(typeof n=="string")return tu(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return tu(n,e)}}function tu(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function g1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gm(n,e){var t=new e;return t._destructor&&t._destructor(),{linkProp:function(r){return{default:t[r](),onChange:function(o,a){a[n][r](o)},triggerUpdate:!1}},linkMethod:function(r){return function(s){for(var o=s[n],a=arguments.length,l=new Array(a>1?a-1:0),c=1;c<a;c++)l[c-1]=arguments[c];var u=o[r].apply(o,l);return u===o?this:u}}}}var eu=window.THREE?window.THREE:{AmbientLight:wo,DirectionalLight:So,Vector3:L,REVISION:$r},v1=170,vm=gm("forceGraph",Nc),y1=Object.assign.apply(Object,ua(["jsonUrl","graphData","numDimensions","dagMode","dagLevelDistance","dagNodeFilter","onDagError","nodeRelSize","nodeId","nodeVal","nodeResolution","nodeColor","nodeAutoColorBy","nodeOpacity","nodeVisibility","nodeThreeObject","nodeThreeObjectExtend","linkSource","linkTarget","linkVisibility","linkColor","linkAutoColorBy","linkOpacity","linkWidth","linkResolution","linkCurvature","linkCurveRotation","linkMaterial","linkThreeObject","linkThreeObjectExtend","linkPositionUpdate","linkDirectionalArrowLength","linkDirectionalArrowColor","linkDirectionalArrowRelPos","linkDirectionalArrowResolution","linkDirectionalParticles","linkDirectionalParticleSpeed","linkDirectionalParticleWidth","linkDirectionalParticleColor","linkDirectionalParticleResolution","forceEngine","d3AlphaDecay","d3VelocityDecay","d3AlphaMin","ngraphPhysics","warmupTicks","cooldownTicks","cooldownTime","onEngineTick","onEngineStop"].map(function(n){return ys({},n,vm.linkProp(n))}))),_1=Object.assign.apply(Object,ua(["refresh","getGraphBbox","d3Force","d3ReheatSimulation","emitParticle"].map(function(n){return ys({},n,vm.linkMethod(n))}))),ca=gm("renderObjs",Qc),x1=Object.assign.apply(Object,ua(["width","height","backgroundColor","showNavInfo","enablePointerInteraction"].map(function(n){return ys({},n,ca.linkProp(n))}))),b1=Object.assign.apply(Object,ua(["lights","cameraPosition","postProcessingComposer"].map(function(n){return ys({},n,ca.linkMethod(n))})).concat([{graph2ScreenCoords:ca.linkMethod("getScreenCoords"),screen2GraphCoords:ca.linkMethod("getSceneCoords")}])),ym=yr({props:la(la({nodeLabel:{default:"name",triggerUpdate:!1},linkLabel:{default:"name",triggerUpdate:!1},linkHoverPrecision:{default:1,onChange:function(e,t){return t.renderObjs.lineHoverPrecision(e)},triggerUpdate:!1},enableNavigationControls:{default:!0,onChange:function(e,t){var i=t.renderObjs.controls();i&&(i.enabled=e,e&&i.domElement&&i.domElement.dispatchEvent(new PointerEvent("pointerup")))},triggerUpdate:!1},enableNodeDrag:{default:!0,triggerUpdate:!1},onNodeDrag:{default:function(){},triggerUpdate:!1},onNodeDragEnd:{default:function(){},triggerUpdate:!1},onNodeClick:{triggerUpdate:!1},onNodeRightClick:{triggerUpdate:!1},onNodeHover:{triggerUpdate:!1},onLinkClick:{triggerUpdate:!1},onLinkRightClick:{triggerUpdate:!1},onLinkHover:{triggerUpdate:!1},onBackgroundClick:{triggerUpdate:!1},onBackgroundRightClick:{triggerUpdate:!1}},y1),x1),methods:la(la({zoomToFit:function(e,t,i){for(var r,s=arguments.length,o=new Array(s>3?s-3:0),a=3;a<s;a++)o[a-3]=arguments[a];return e.renderObjs.fitToBbox((r=e.forceGraph).getGraphBbox.apply(r,o),t,i),this},pauseAnimation:function(e){return e.animationFrameRequestId!==null&&(cancelAnimationFrame(e.animationFrameRequestId),e.animationFrameRequestId=null),this},resumeAnimation:function(e){return e.animationFrameRequestId===null&&this._animationCycle(),this},_animationCycle:function(e){e.enablePointerInteraction&&(this.renderer().domElement.style.cursor=null),e.forceGraph.tickFrame(),e.renderObjs.tick(),e.animationFrameRequestId=requestAnimationFrame(this._animationCycle)},scene:function(e){return e.renderObjs.scene()},camera:function(e){return e.renderObjs.camera()},renderer:function(e){return e.renderObjs.renderer()},controls:function(e){return e.renderObjs.controls()},tbControls:function(e){return e.renderObjs.tbControls()},_destructor:function(){this.pauseAnimation(),this.graphData({nodes:[],links:[]})}},_1),b1),stateInit:function(e){var t=e.controlType,i=e.rendererConfig,r=e.extraRenderers,s=new Nc;return{forceGraph:s,renderObjs:Qc({controlType:t,rendererConfig:i,extraRenderers:r}).objects([s]).lights([new eu.AmbientLight(13421772,Math.PI),new eu.DirectionalLight(16777215,.6*Math.PI)])}},init:function(e,t){e.innerHTML="",e.appendChild(t.container=document.createElement("div")),t.container.style.position="relative";var i=document.createElement("div");t.container.appendChild(i),t.renderObjs(i);var r=t.renderObjs.camera(),s=t.renderObjs.renderer(),o=t.renderObjs.controls();o.enabled=!!t.enableNavigationControls,t.lastSetCameraZ=r.position.z;var a;t.container.appendChild(a=document.createElement("div")),a.className="graph-info-msg",a.textContent="",t.forceGraph.onLoading(function(){a.textContent="Loading..."}).onFinishLoading(function(){a.textContent=""}).onUpdate(function(){t.graphData=t.forceGraph.graphData(),r.position.x===0&&r.position.y===0&&r.position.z===t.lastSetCameraZ&&t.graphData.nodes.length&&(r.lookAt(t.forceGraph.position),t.lastSetCameraZ=r.position.z=Math.cbrt(t.graphData.nodes.length)*v1)}).onFinishUpdate(function(){if(t._dragControls){var l=t.graphData.nodes.find(function(u){return u.__initialFixedPos&&!u.__disposeControlsAfterDrag});l?l.__disposeControlsAfterDrag=!0:t._dragControls.dispose(),t._dragControls=void 0}if(t.enableNodeDrag&&t.enablePointerInteraction&&t.forceEngine==="d3"){var c=t._dragControls=new Po(t.graphData.nodes.map(function(u){return u.__threeObj}).filter(function(u){return u}),r,s.domElement);c.addEventListener("dragstart",function(u){o.enabled=!1,u.object.__initialPos=u.object.position.clone(),u.object.__prevPos=u.object.position.clone();var h=Fn(u.object).__data;!h.__initialFixedPos&&(h.__initialFixedPos={fx:h.fx,fy:h.fy,fz:h.fz}),!h.__initialPos&&(h.__initialPos={x:h.x,y:h.y,z:h.z}),["x","y","z"].forEach(function(d){return h["f".concat(d)]=h[d]}),s.domElement.classList.add("grabbable")}),c.addEventListener("drag",function(u){var h=Fn(u.object);if(!u.object.hasOwnProperty("__graphObjType")){var d=u.object.__initialPos,m=u.object.__prevPos,g=u.object.position;h.position.add(g.clone().sub(m)),m.copy(g),g.copy(d)}var v=h.__data,p=h.position,f={x:p.x-v.x,y:p.y-v.y,z:p.z-v.z};["x","y","z"].forEach(function(M){return v["f".concat(M)]=v[M]=p[M]}),t.forceGraph.d3AlphaTarget(.3).resetCountdown(),v.__dragged=!0,t.onNodeDrag(v,f)}),c.addEventListener("dragend",function(u){delete u.object.__initialPos,delete u.object.__prevPos;var h=Fn(u.object).__data;h.__disposeControlsAfterDrag&&(c.dispose(),delete h.__disposeControlsAfterDrag);var d=h.__initialFixedPos,m=h.__initialPos,g={x:m.x-h.x,y:m.y-h.y,z:m.z-h.z};d&&(["x","y","z"].forEach(function(v){var p="f".concat(v);d[p]===void 0&&delete h[p]}),delete h.__initialFixedPos,delete h.__initialPos,h.__dragged&&(delete h.__dragged,t.onNodeDragEnd(h,g))),t.forceGraph.d3AlphaTarget(0).resetCountdown(),t.enableNavigationControls&&(o.enabled=!0,o.domElement&&o.domElement.ownerDocument&&o.domElement.ownerDocument.dispatchEvent(new PointerEvent("pointerup",{pointerType:"touch"}))),s.domElement.classList.remove("grabbable")})}}),eu.REVISION<155&&(t.renderObjs.renderer().useLegacyLights=!1),t.renderObjs.hoverOrderComparator(function(l,c){var u=Fn(l);if(!u)return 1;var h=Fn(c);if(!h)return-1;var d=function(g){return g.__graphObjType==="node"};return d(h)-d(u)}).tooltipContent(function(l){var c=Fn(l);return c&&je(t["".concat(c.__graphObjType,"Label")])(c.__data)||""}).hoverDuringDrag(!1).onHover(function(l){var c=Fn(l);if(c!==t.hoverObj){var u=t.hoverObj?t.hoverObj.__graphObjType:null,h=t.hoverObj?t.hoverObj.__data:null,d=c?c.__graphObjType:null,m=c?c.__data:null;if(u&&u!==d){var g=t["on".concat(u==="node"?"Node":"Link","Hover")];g&&g(null,h)}if(d){var v=t["on".concat(d==="node"?"Node":"Link","Hover")];v&&v(m,u===d?h:null)}s.domElement.classList[c&&t["on".concat(d==="node"?"Node":"Link","Click")]||!c&&t.onBackgroundClick?"add":"remove"]("clickable"),t.hoverObj=c}}).clickAfterDrag(!1).onClick(function(l,c){var u=Fn(l);if(u){var h=t["on".concat(u.__graphObjType==="node"?"Node":"Link","Click")];h&&h(u.__data,c)}else t.onBackgroundClick&&t.onBackgroundClick(c)}).onRightClick(function(l,c){var u=Fn(l);if(u){var h=t["on".concat(u.__graphObjType==="node"?"Node":"Link","RightClick")];h&&h(u.__data,c)}else t.onBackgroundRightClick&&t.onBackgroundRightClick(c)}),this._animationCycle()}});function Fn(n){for(var e=n;e&&!e.hasOwnProperty("__graphObjType");)e=e.parent;return e}function M1(n,e,t){return e=fa(e),P1(n,bm()?Reflect.construct(e,t||[],fa(n).constructor):e.apply(n,t))}function bm(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(bm=function(){return!!n})()}function S1(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function w1(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function E1(n){var e=w1(n,"string");return typeof e=="symbol"?e:String(e)}function A1(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _m(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,E1(i.key),i)}}function T1(n,e,t){return e&&_m(n.prototype,e),t&&_m(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function C1(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),e&&nu(n,e)}function fa(n){return fa=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},fa(n)}function nu(n,e){return nu=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},nu(n,e)}function R1(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function P1(n,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R1(n)}function xm(n,e){return L1(n)||S1(n,e)||Mm(n,e)||N1()}function ha(n){return I1(n)||O1(n)||Mm(n)||D1()}function I1(n){if(Array.isArray(n))return iu(n)}function L1(n){if(Array.isArray(n))return n}function O1(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Mm(n,e){if(n){if(typeof n=="string")return iu(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);if(t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set")return Array.from(n);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return iu(n,e)}}function iu(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}function D1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N1(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Mr=typeof window<"u"&&window.THREE?window.THREE:{LinearFilter:Xt,Sprite:mo,SpriteMaterial:Gr,SRGBColorSpace:Bt,Texture:Ut},Sm=function(n){C1(e,n);function e(){var t,i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:10,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"rgba(255, 255, 255, 1)";return A1(this,e),t=M1(this,e,[new Mr.SpriteMaterial]),t._text="".concat(i),t._textHeight=r,t._color=s,t._backgroundColor=!1,t._padding=0,t._borderWidth=0,t._borderRadius=0,t._borderColor="white",t._strokeWidth=0,t._strokeColor="white",t._fontFace="system-ui",t._fontSize=90,t._fontWeight="normal",t._canvas=document.createElement("canvas"),t._genCanvas(),t}return T1(e,[{key:"text",get:function(){return this._text},set:function(i){this._text=i,this._genCanvas()}},{key:"textHeight",get:function(){return this._textHeight},set:function(i){this._textHeight=i,this._genCanvas()}},{key:"color",get:function(){return this._color},set:function(i){this._color=i,this._genCanvas()}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(i){this._backgroundColor=i,this._genCanvas()}},{key:"padding",get:function(){return this._padding},set:function(i){this._padding=i,this._genCanvas()}},{key:"borderWidth",get:function(){return this._borderWidth},set:function(i){this._borderWidth=i,this._genCanvas()}},{key:"borderRadius",get:function(){return this._borderRadius},set:function(i){this._borderRadius=i,this._genCanvas()}},{key:"borderColor",get:function(){return this._borderColor},set:function(i){this._borderColor=i,this._genCanvas()}},{key:"fontFace",get:function(){return this._fontFace},set:function(i){this._fontFace=i,this._genCanvas()}},{key:"fontSize",get:function(){return this._fontSize},set:function(i){this._fontSize=i,this._genCanvas()}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(i){this._fontWeight=i,this._genCanvas()}},{key:"strokeWidth",get:function(){return this._strokeWidth},set:function(i){this._strokeWidth=i,this._genCanvas()}},{key:"strokeColor",get:function(){return this._strokeColor},set:function(i){this._strokeColor=i,this._genCanvas()}},{key:"_genCanvas",value:function(){var i=this,r=this._canvas,s=r.getContext("2d"),o=Array.isArray(this.borderWidth)?this.borderWidth:[this.borderWidth,this.borderWidth],a=o.map(function(T){return T*i.fontSize*.1}),l=Array.isArray(this.borderRadius)?this.borderRadius:[this.borderRadius,this.borderRadius,this.borderRadius,this.borderRadius],c=l.map(function(T){return T*i.fontSize*.1}),u=Array.isArray(this.padding)?this.padding:[this.padding,this.padding],h=u.map(function(T){return T*i.fontSize*.1}),d=this.text.split(`
`),m="".concat(this.fontWeight," ").concat(this.fontSize,"px ").concat(this.fontFace);s.font=m;var g=Math.max.apply(Math,ha(d.map(function(T){return s.measureText(T).width}))),v=this.fontSize*d.length;if(r.width=g+a[0]*2+h[0]*2,r.height=v+a[1]*2+h[1]*2,this.borderWidth){if(s.strokeStyle=this.borderColor,a[0]){var p=a[0]/2;s.lineWidth=a[0],s.beginPath(),s.moveTo(p,c[0]),s.lineTo(p,r.height-c[3]),s.moveTo(r.width-p,c[1]),s.lineTo(r.width-p,r.height-c[2]),s.stroke()}if(a[1]){var f=a[1]/2;s.lineWidth=a[1],s.beginPath(),s.moveTo(Math.max(a[0],c[0]),f),s.lineTo(r.width-Math.max(a[0],c[1]),f),s.moveTo(Math.max(a[0],c[3]),r.height-f),s.lineTo(r.width-Math.max(a[0],c[2]),r.height-f),s.stroke()}if(this.borderRadius){var M=Math.max.apply(Math,ha(a)),y=M/2;s.lineWidth=M,s.beginPath(),[!!c[0]&&[c[0],y,y,c[0]],!!c[1]&&[r.width-c[1],r.width-y,y,c[1]],!!c[2]&&[r.width-c[2],r.width-y,r.height-y,r.height-c[2]],!!c[3]&&[c[3],y,r.height-y,r.height-c[3]]].filter(function(T){return T}).forEach(function(T){var R=xm(T,4),S=R[0],b=R[1],U=R[2],B=R[3];s.moveTo(S,U),s.quadraticCurveTo(b,U,b,B)}),s.stroke()}}this.backgroundColor&&(s.fillStyle=this.backgroundColor,this.borderRadius?(s.beginPath(),s.moveTo(a[0],c[0]),[[a[0],c[0],r.width-c[1],a[1],a[1],a[1]],[r.width-a[0],r.width-a[0],r.width-a[0],a[1],c[1],r.height-c[2]],[r.width-a[0],r.width-c[2],c[3],r.height-a[1],r.height-a[1],r.height-a[1]],[a[0],a[0],a[0],r.height-a[1],r.height-c[3],c[0]]].forEach(function(T){var R=xm(T,6),S=R[0],b=R[1],U=R[2],B=R[3],D=R[4],I=R[5];s.quadraticCurveTo(S,B,b,D),s.lineTo(U,I)}),s.closePath(),s.fill()):s.fillRect(a[0],a[1],r.width-a[0]*2,r.height-a[1]*2)),s.translate.apply(s,ha(a)),s.translate.apply(s,ha(h)),s.font=m,s.fillStyle=this.color,s.textBaseline="bottom";var x=this.strokeWidth>0;x&&(s.lineWidth=this.strokeWidth*this.fontSize/10,s.strokeStyle=this.strokeColor),d.forEach(function(T,R){var S=(g-s.measureText(T).width)/2,b=(R+1)*i.fontSize;x&&s.strokeText(T,S,b),s.fillText(T,S,b)}),this.material.map&&this.material.map.dispose();var A=this.material.map=new Mr.Texture(r);A.minFilter=Mr.LinearFilter,A.colorSpace=Mr.SRGBColorSpace,A.needsUpdate=!0;var w=this.textHeight*d.length+o[1]*2+u[1]*2;this.scale.set(w*r.width/r.height,w,0)}},{key:"clone",value:function(){return new this.constructor(this.text,this.textHeight,this.color).copy(this)}},{key:"copy",value:function(i){return Mr.Sprite.prototype.copy.call(this,i),this.color=i.color,this.backgroundColor=i.backgroundColor,this.padding=i.padding,this.borderWidth=i.borderWidth,this.borderColor=i.borderColor,this.fontFace=i.fontFace,this.fontSize=i.fontSize,this.fontWeight=i.fontWeight,this.strokeWidth=i.strokeWidth,this.strokeColor=i.strokeColor,this}}]),e}(Mr.Sprite);return Dm(U1);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
