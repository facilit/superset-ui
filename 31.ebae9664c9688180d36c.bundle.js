(window.webpackJsonp=window.webpackJsonp||[]).push([[31,39],{1283:function(module,exports,__webpack_require__){var api=__webpack_require__(269),content=__webpack_require__(1284);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1},exported=(api(content,options),content.locals?content.locals:{});module.exports=exported},1284:function(module,exports,__webpack_require__){(exports=__webpack_require__(270)(!1)).push([module.i,'/**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n.mapbox .slice_container div {\n  padding-top: 0px;\n}\n',""]),module.exports=exports},1536:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"DEFAULT_MAX_ZOOM",(function(){return DEFAULT_MAX_ZOOM})),__webpack_require__.d(__webpack_exports__,"DEFAULT_POINT_RADIUS",(function(){return DEFAULT_POINT_RADIUS}));__webpack_require__(41);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),prop_types=__webpack_require__(4),prop_types_default=__webpack_require__.n(prop_types),esm=__webpack_require__(1270),immutable=__webpack_require__(1254),immutable_default=__webpack_require__.n(immutable),web_mercator_viewport=__webpack_require__(2086);__webpack_require__(40);function roundDecimal(number,precision){let roundedNumber,p=precision;return roundedNumber=precision?Math.round(number*(p=10**p))/p:Math.round(number),roundedNumber}function kmToPixels(kilometers,latitude,zoomLevel){const latitudeRad=latitude*(Math.PI/180);return roundDecimal(kilometers/(40075.16*Math.cos(latitudeRad)/2**(zoomLevel+9)),2)}__webpack_require__(1325);const propTypes={aggregation:prop_types_default.a.string,compositeOperation:prop_types_default.a.string,dotRadius:prop_types_default.a.number,lngLatAccessor:prop_types_default.a.func,locations:prop_types_default.a.instanceOf(immutable_default.a.List).isRequired,pointRadiusUnit:prop_types_default.a.string,renderWhileDragging:prop_types_default.a.bool,rgb:prop_types_default.a.arrayOf(prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.number])),zoom:prop_types_default.a.number};class ScatterPlotGlowOverlay_ScatterPlotGlowOverlay extends react_default.a.PureComponent{constructor(props){super(props),this.redraw=this.redraw.bind(this)}drawText(ctx,pixel,options={}){const{fontHeight:fontHeight=0,label:label="",radius:radius=0,rgb:rgb=[0,0,0],shadow:shadow=!1}=options,maxWidth=1.8*radius,luminance=function luminanceFromRGB(r,g,b){return.2126*r+.7152*g+.0722*b}(rgb[1],rgb[2],rgb[3]);ctx.globalCompositeOperation="source-over",ctx.fillStyle=luminance<=110?"white":"black",ctx.font="".concat(fontHeight,"px sans-serif"),ctx.textAlign="center",ctx.textBaseline="middle",shadow&&(ctx.shadowBlur=15,ctx.shadowColor=luminance<=110?"black":"");const textWidth=ctx.measureText(label).width;textWidth>maxWidth&&(ctx.font="".concat(fontHeight/textWidth*maxWidth,"px sans-serif"));const{compositeOperation:compositeOperation}=this.props;ctx.fillText(label,pixel[0],pixel[1]),ctx.globalCompositeOperation=compositeOperation,ctx.shadowBlur=0,ctx.shadowColor=""}redraw({width:width,height:height,ctx:ctx,isDragging:isDragging,project:project}){const{aggregation:aggregation,compositeOperation:compositeOperation,dotRadius:dotRadius,lngLatAccessor:lngLatAccessor,locations:locations,pointRadiusUnit:pointRadiusUnit,renderWhileDragging:renderWhileDragging,rgb:rgb,zoom:zoom}=this.props,radius=dotRadius,clusterLabelMap=[];locations.forEach((location,i)=>{location.get("properties").get("cluster")&&(clusterLabelMap[i]=((properties,aggregation)=>{const count=properties.get("point_count");if(!aggregation)return count;if("sum"===aggregation||"min"===aggregation||"max"===aggregation)return properties.get(aggregation);const sum=properties.get("sum");if("mean"===aggregation)return Math.round(sum/count*100)/100;const variance=properties.get("squaredSum")/count-(sum/count)**2;return"var"===aggregation?Math.round(100*variance)/100:"stdev"===aggregation?Math.round(100*Math.sqrt(variance))/100:count})(location.get("properties"),aggregation))},this);const maxLabel=Math.max(...clusterLabelMap.filter(v=>!Number.isNaN(v)));ctx.clearRect(0,0,width,height),ctx.globalCompositeOperation=compositeOperation,!renderWhileDragging&&isDragging||!locations||locations.forEach((function(location,i){const pixel=project(lngLatAccessor(location)),pixelRounded=[roundDecimal(pixel[0],1),roundDecimal(pixel[1],1)];if(0<=pixelRounded[0]+radius&&pixelRounded[0]-radius<width&&0<=pixelRounded[1]+radius&&pixelRounded[1]-radius<height)if(ctx.beginPath(),location.get("properties").get("cluster")){let clusterLabel=clusterLabelMap[i];const scaledRadius=roundDecimal((clusterLabel/maxLabel)**.5*radius,1),fontHeight=roundDecimal(.5*scaledRadius,1),[x,y]=pixelRounded,gradient=ctx.createRadialGradient(x,y,scaledRadius,x,y,0);gradient.addColorStop(1,"rgba(".concat(rgb[1],", ").concat(rgb[2],", ").concat(rgb[3],", 0.8)")),gradient.addColorStop(0,"rgba(".concat(rgb[1],", ").concat(rgb[2],", ").concat(rgb[3],", 0)")),ctx.arc(pixelRounded[0],pixelRounded[1],scaledRadius,0,2*Math.PI),ctx.fillStyle=gradient,ctx.fill(),Number.isFinite(parseFloat(clusterLabel))&&(1e4<=clusterLabel?clusterLabel="".concat(Math.round(clusterLabel/1e3),"k"):1e3<=clusterLabel&&(clusterLabel="".concat(Math.round(clusterLabel/100)/10,"k")),this.drawText(ctx,pixelRounded,{fontHeight:fontHeight,label:clusterLabel,radius:scaledRadius,rgb:rgb,shadow:!0}))}else{const defaultRadius=radius/6,radiusProperty=location.get("properties").get("radius"),pointMetric=location.get("properties").get("metric");let pointLabel,pointRadius=null===radiusProperty?defaultRadius:radiusProperty;if(null!==radiusProperty){const pointLatitude=lngLatAccessor(location)[1];"Kilometers"===pointRadiusUnit?(pointLabel="".concat(roundDecimal(pointRadius,2),"km"),pointRadius=kmToPixels(pointRadius,pointLatitude,zoom)):"Miles"===pointRadiusUnit&&(pointLabel="".concat(roundDecimal(pointRadius,2),"mi"),pointRadius=kmToPixels(1.60934*pointRadius,pointLatitude,zoom))}null!==pointMetric&&(pointLabel=Number.isFinite(parseFloat(pointMetric))?roundDecimal(pointMetric,2):pointMetric),pointRadius||(pointRadius=defaultRadius),ctx.arc(pixelRounded[0],pixelRounded[1],roundDecimal(pointRadius,1),0,2*Math.PI),ctx.fillStyle="rgb(".concat(rgb[1],", ").concat(rgb[2],", ").concat(rgb[3],")"),ctx.fill(),void 0!==pointLabel&&this.drawText(ctx,pixelRounded,{fontHeight:roundDecimal(pointRadius,1),label:pointLabel,radius:pointRadius,rgb:rgb,shadow:!1})}}),this)}render(){return react_default.a.createElement(esm.a,{redraw:this.redraw})}}ScatterPlotGlowOverlay_ScatterPlotGlowOverlay.displayName="ScatterPlotGlowOverlay",ScatterPlotGlowOverlay_ScatterPlotGlowOverlay.propTypes=propTypes,ScatterPlotGlowOverlay_ScatterPlotGlowOverlay.defaultProps={compositeOperation:"source-over",dotRadius:4,lngLatAccessor:location=>[location.get(0),location.get(1)],renderWhileDragging:!0},ScatterPlotGlowOverlay_ScatterPlotGlowOverlay.__docgenInfo={description:"",methods:[{name:"drawText",docblock:null,modifiers:[],params:[{name:"ctx",type:null},{name:"pixel",type:null},{name:"options",type:null}],returns:null},{name:"redraw",docblock:null,modifiers:[],params:[{name:"{ width, height, ctx, isDragging, project }",type:null}],returns:null}],displayName:"ScatterPlotGlowOverlay",props:{compositeOperation:{defaultValue:{value:"'source-over'",computed:!1},type:{name:"string"},required:!1,description:""},dotRadius:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""},lngLatAccessor:{defaultValue:{value:"location => [location.get(0), location.get(1)]",computed:!1},type:{name:"func"},required:!1,description:""},renderWhileDragging:{defaultValue:{value:"true",computed:!1},type:{name:"bool"},required:!1,description:""},aggregation:{type:{name:"string"},required:!1,description:""},locations:{type:{name:"instanceOf",value:"Immutable.List"},required:!0,description:""},pointRadiusUnit:{type:{name:"string"},required:!1,description:""},rgb:{type:{name:"arrayOf",value:{name:"union",value:[{name:"string"},{name:"number"}]}},required:!1,description:""},zoom:{type:{name:"number"},required:!1,description:""}}};var src_ScatterPlotGlowOverlay=ScatterPlotGlowOverlay_ScatterPlotGlowOverlay;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../../plugins/legacy-plugin-chart-map-box/src/ScatterPlotGlowOverlay.jsx"]={name:"ScatterPlotGlowOverlay",docgenInfo:ScatterPlotGlowOverlay_ScatterPlotGlowOverlay.__docgenInfo,path:"../../plugins/legacy-plugin-chart-map-box/src/ScatterPlotGlowOverlay.jsx"});__webpack_require__(1283);function _extends(){return(_extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i])Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target}).apply(this,arguments)}const DEFAULT_MAX_ZOOM=16,DEFAULT_POINT_RADIUS=60,MapBox_propTypes={width:prop_types_default.a.number,height:prop_types_default.a.number,aggregatorName:prop_types_default.a.string,clusterer:prop_types_default.a.object,globalOpacity:prop_types_default.a.number,hasCustomMetric:prop_types_default.a.bool,mapStyle:prop_types_default.a.string,mapboxApiKey:prop_types_default.a.string.isRequired,onViewportChange:prop_types_default.a.func,pointRadius:prop_types_default.a.number,pointRadiusUnit:prop_types_default.a.string,renderWhileDragging:prop_types_default.a.bool,rgb:prop_types_default.a.array,bounds:prop_types_default.a.array},MapBox_defaultProps={width:400,height:400,globalOpacity:1,onViewportChange:()=>{},pointRadius:60,pointRadiusUnit:"Pixels"};class MapBox_MapBox extends react_default.a.Component{constructor(props){super(props);const{width:width,height:height,bounds:bounds}=this.props,mercator=new web_mercator_viewport.a({width:width,height:height}).fitBounds(bounds),{latitude:latitude,longitude:longitude,zoom:zoom}=mercator;this.state={viewport:{longitude:longitude,latitude:latitude,zoom:zoom}},this.handleViewportChange=this.handleViewportChange.bind(this)}handleViewportChange(viewport){this.setState({viewport:viewport});const{onViewportChange:onViewportChange}=this.props;onViewportChange(viewport)}render(){const{width:width,height:height,aggregatorName:aggregatorName,clusterer:clusterer,globalOpacity:globalOpacity,mapStyle:mapStyle,mapboxApiKey:mapboxApiKey,pointRadius:pointRadius,pointRadiusUnit:pointRadiusUnit,renderWhileDragging:renderWhileDragging,rgb:rgb,hasCustomMetric:hasCustomMetric,bounds:bounds}=this.props,{viewport:viewport}=this.state,isDragging=void 0!==viewport.isDragging&&viewport.isDragging,bbox=[bounds[0][0],bounds[0][1],bounds[1][0],bounds[1][1]],clusters=clusterer.getClusters(bbox,Math.round(viewport.zoom));return react_default.a.createElement(esm.b,_extends({},viewport,{mapStyle:mapStyle,width:width,height:height,mapboxApiAccessToken:mapboxApiKey,onViewportChange:this.handleViewportChange}),react_default.a.createElement(src_ScatterPlotGlowOverlay,_extends({},viewport,{isDragging:isDragging,locations:immutable_default.a.fromJS(clusters),dotRadius:pointRadius,pointRadiusUnit:pointRadiusUnit,rgb:rgb,globalOpacity:globalOpacity,compositeOperation:"screen",renderWhileDragging:renderWhileDragging,aggregation:hasCustomMetric?aggregatorName:null,lngLatAccessor:location=>{const coordinates=location.get("geometry").get("coordinates");return[coordinates.get(0),coordinates.get(1)]}})))}}MapBox_MapBox.displayName="MapBox",MapBox_MapBox.propTypes=MapBox_propTypes,MapBox_MapBox.defaultProps=MapBox_defaultProps,MapBox_MapBox.__docgenInfo={description:"",methods:[{name:"handleViewportChange",docblock:null,modifiers:[],params:[{name:"viewport",type:null}],returns:null}],displayName:"MapBox",props:{width:{defaultValue:{value:"400",computed:!1},type:{name:"number"},required:!1,description:""},height:{defaultValue:{value:"400",computed:!1},type:{name:"number"},required:!1,description:""},globalOpacity:{defaultValue:{value:"1",computed:!1},type:{name:"number"},required:!1,description:""},onViewportChange:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},pointRadius:{defaultValue:{value:"60",computed:!1},type:{name:"number"},required:!1,description:""},pointRadiusUnit:{defaultValue:{value:"'Pixels'",computed:!1},type:{name:"string"},required:!1,description:""},aggregatorName:{type:{name:"string"},required:!1,description:""},clusterer:{type:{name:"object"},required:!1,description:""},hasCustomMetric:{type:{name:"bool"},required:!1,description:""},mapStyle:{type:{name:"string"},required:!1,description:""},mapboxApiKey:{type:{name:"string"},required:!0,description:""},renderWhileDragging:{type:{name:"bool"},required:!1,description:""},rgb:{type:{name:"array"},required:!1,description:""},bounds:{type:{name:"array"},required:!1,description:""}}};__webpack_exports__.default=MapBox_MapBox;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../../plugins/legacy-plugin-chart-map-box/src/MapBox.jsx"]={name:"MapBox",docgenInfo:MapBox_MapBox.__docgenInfo,path:"../../plugins/legacy-plugin-chart-map-box/src/MapBox.jsx"})},2123:function(module,__webpack_exports__,__webpack_require__){"use strict";function sortKD(ids,coords,nodeSize,left,right,depth){if(!(right-left<=nodeSize)){var m=Math.floor((left+right)/2);!function sort_select(ids,coords,k,left,right,inc){for(;right>left;){if(right-left>600){var n=right-left+1,m=k-left+1,z=Math.log(n),s=.5*Math.exp(2*z/3),sd=.5*Math.sqrt(z*s*(n-s)/n)*(m-n/2<0?-1:1),newLeft=Math.max(left,Math.floor(k-m*s/n+sd)),newRight=Math.min(right,Math.floor(k+(n-m)*s/n+sd));sort_select(ids,coords,k,newLeft,newRight,inc)}var t=coords[2*k+inc],i=left,j=right;for(swapItem(ids,coords,left,k),coords[2*right+inc]>t&&swapItem(ids,coords,left,right);i<j;){for(swapItem(ids,coords,i,j),i++,j--;coords[2*i+inc]<t;)i++;for(;coords[2*j+inc]>t;)j--}coords[2*left+inc]===t?swapItem(ids,coords,left,j):(j++,swapItem(ids,coords,j,right)),j<=k&&(left=j+1),k<=j&&(right=j-1)}}(ids,coords,m,left,right,depth%2),sortKD(ids,coords,nodeSize,left,m-1,depth+1),sortKD(ids,coords,nodeSize,m+1,right,depth+1)}}function swapItem(ids,coords,i,j){swap(ids,i,j),swap(coords,2*i,2*j),swap(coords,2*i+1,2*j+1)}function swap(arr,i,j){var tmp=arr[i];arr[i]=arr[j],arr[j]=tmp}function sqDist(ax,ay,bx,by){var dx=ax-bx,dy=ay-by;return dx*dx+dy*dy}function kdbush(points,getX,getY,nodeSize,ArrayType){return new KDBush(points,getX,getY,nodeSize,ArrayType)}function KDBush(points,getX,getY,nodeSize,ArrayType){getX=getX||defaultGetX,getY=getY||defaultGetY,ArrayType=ArrayType||Array,this.nodeSize=nodeSize||64,this.points=points,this.ids=new ArrayType(points.length),this.coords=new ArrayType(2*points.length);for(var i=0;i<points.length;i++)this.ids[i]=i,this.coords[2*i]=getX(points[i]),this.coords[2*i+1]=getY(points[i]);sortKD(this.ids,this.coords,this.nodeSize,0,this.ids.length-1,0)}function defaultGetX(p){return p[0]}function defaultGetY(p){return p[1]}function SuperCluster(options){this.options=extend(Object.create(this.options),options),this.trees=new Array(this.options.maxZoom+1)}function createCluster(x,y,id,numPoints,properties){return{x:x,y:y,zoom:1/0,id:id,parentId:-1,numPoints:numPoints,properties:properties}}function getClusterJSON(cluster){return{type:"Feature",id:cluster.id,properties:getClusterProperties(cluster),geometry:{type:"Point",coordinates:[(x=cluster.x,360*(x-.5)),(y=cluster.y,y2=(180-360*y)*Math.PI/180,360*Math.atan(Math.exp(y2))/Math.PI-90)]}};var y,y2,x}function getClusterProperties(cluster){var count=cluster.numPoints,abbrev=count>=1e4?Math.round(count/1e3)+"k":count>=1e3?Math.round(count/100)/10+"k":count;return extend(extend({},cluster.properties),{cluster:!0,cluster_id:cluster.id,point_count:count,point_count_abbreviated:abbrev})}function lngX(lng){return lng/360+.5}function latY(lat){var sin=Math.sin(lat*Math.PI/180),y=.5-.25*Math.log((1+sin)/(1-sin))/Math.PI;return y<0?0:y>1?1:y}function extend(dest,src){for(var id in src)dest[id]=src[id];return dest}function supercluster_getX(p){return p.x}function supercluster_getY(p){return p.y}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"default",(function(){return transformProps})),KDBush.prototype={range:function(minX,minY,maxX,maxY){return function range(ids,coords,minX,minY,maxX,maxY,nodeSize){for(var x,y,stack=[0,ids.length-1,0],result=[];stack.length;){var axis=stack.pop(),right=stack.pop(),left=stack.pop();if(right-left<=nodeSize)for(var i=left;i<=right;i++)x=coords[2*i],y=coords[2*i+1],x>=minX&&x<=maxX&&y>=minY&&y<=maxY&&result.push(ids[i]);else{var m=Math.floor((left+right)/2);x=coords[2*m],y=coords[2*m+1],x>=minX&&x<=maxX&&y>=minY&&y<=maxY&&result.push(ids[m]);var nextAxis=(axis+1)%2;(0===axis?minX<=x:minY<=y)&&(stack.push(left),stack.push(m-1),stack.push(nextAxis)),(0===axis?maxX>=x:maxY>=y)&&(stack.push(m+1),stack.push(right),stack.push(nextAxis))}}return result}(this.ids,this.coords,minX,minY,maxX,maxY,this.nodeSize)},within:function(x,y,r){return function within(ids,coords,qx,qy,r,nodeSize){for(var stack=[0,ids.length-1,0],result=[],r2=r*r;stack.length;){var axis=stack.pop(),right=stack.pop(),left=stack.pop();if(right-left<=nodeSize)for(var i=left;i<=right;i++)sqDist(coords[2*i],coords[2*i+1],qx,qy)<=r2&&result.push(ids[i]);else{var m=Math.floor((left+right)/2),x=coords[2*m],y=coords[2*m+1];sqDist(x,y,qx,qy)<=r2&&result.push(ids[m]);var nextAxis=(axis+1)%2;(0===axis?qx-r<=x:qy-r<=y)&&(stack.push(left),stack.push(m-1),stack.push(nextAxis)),(0===axis?qx+r>=x:qy+r>=y)&&(stack.push(m+1),stack.push(right),stack.push(nextAxis))}}return result}(this.ids,this.coords,x,y,r,this.nodeSize)}},SuperCluster.prototype={options:{minZoom:0,maxZoom:16,radius:40,extent:512,nodeSize:64,log:!1,reduce:null,initial:function(){return{}},map:function(props){return props}},load:function(points){var log=this.options.log;log&&console.time("total time");var timerId="prepare "+points.length+" points";log&&console.time(timerId),this.points=points;for(var p,id,coords,clusters=[],i=0;i<points.length;i++)points[i].geometry&&clusters.push((p=points[i],id=i,coords=void 0,{x:lngX((coords=p.geometry.coordinates)[0]),y:latY(coords[1]),zoom:1/0,index:id,parentId:-1}));this.trees[this.options.maxZoom+1]=kdbush(clusters,supercluster_getX,supercluster_getY,this.options.nodeSize,Float32Array),log&&console.timeEnd(timerId);for(var z=this.options.maxZoom;z>=this.options.minZoom;z--){var now=+Date.now();clusters=this._cluster(clusters,z),this.trees[z]=kdbush(clusters,supercluster_getX,supercluster_getY,this.options.nodeSize,Float32Array),log&&console.log("z%d: %d clusters in %dms",z,clusters.length,+Date.now()-now)}return log&&console.timeEnd("total time"),this},getClusters:function(bbox,zoom){var minLng=((bbox[0]+180)%360+360)%360-180,minLat=Math.max(-90,Math.min(90,bbox[1])),maxLng=180===bbox[2]?180:((bbox[2]+180)%360+360)%360-180,maxLat=Math.max(-90,Math.min(90,bbox[3]));if(bbox[2]-bbox[0]>=360)minLng=-180,maxLng=180;else if(minLng>maxLng){var easternHem=this.getClusters([minLng,minLat,180,maxLat],zoom),westernHem=this.getClusters([-180,minLat,maxLng,maxLat],zoom);return easternHem.concat(westernHem)}for(var tree=this.trees[this._limitZoom(zoom)],ids=tree.range(lngX(minLng),latY(maxLat),lngX(maxLng),latY(minLat)),clusters=[],i=0;i<ids.length;i++){var c=tree.points[ids[i]];clusters.push(c.numPoints?getClusterJSON(c):this.points[c.index])}return clusters},getChildren:function(clusterId){var originId=clusterId>>5,originZoom=clusterId%32,errorMsg="No cluster with the specified id.",index=this.trees[originZoom];if(!index)throw new Error(errorMsg);var origin=index.points[originId];if(!origin)throw new Error(errorMsg);for(var r=this.options.radius/(this.options.extent*Math.pow(2,originZoom-1)),ids=index.within(origin.x,origin.y,r),children=[],i=0;i<ids.length;i++){var c=index.points[ids[i]];c.parentId===clusterId&&children.push(c.numPoints?getClusterJSON(c):this.points[c.index])}if(0===children.length)throw new Error(errorMsg);return children},getLeaves:function(clusterId,limit,offset){limit=limit||10,offset=offset||0;var leaves=[];return this._appendLeaves(leaves,clusterId,limit,offset,0),leaves},getTile:function(z,x,y){var tree=this.trees[this._limitZoom(z)],z2=Math.pow(2,z),extent=this.options.extent,p=this.options.radius/extent,top=(y-p)/z2,bottom=(y+1+p)/z2,tile={features:[]};return this._addTileFeatures(tree.range((x-p)/z2,top,(x+1+p)/z2,bottom),tree.points,x,y,z2,tile),0===x&&this._addTileFeatures(tree.range(1-p/z2,top,1,bottom),tree.points,z2,y,z2,tile),x===z2-1&&this._addTileFeatures(tree.range(0,top,p/z2,bottom),tree.points,-1,y,z2,tile),tile.features.length?tile:null},getClusterExpansionZoom:function(clusterId){for(var clusterZoom=clusterId%32-1;clusterZoom<this.options.maxZoom;){var children=this.getChildren(clusterId);if(clusterZoom++,1!==children.length)break;clusterId=children[0].properties.cluster_id}return clusterZoom},_appendLeaves:function(result,clusterId,limit,offset,skipped){for(var children=this.getChildren(clusterId),i=0;i<children.length;i++){var props=children[i].properties;if(props&&props.cluster?skipped+props.point_count<=offset?skipped+=props.point_count:skipped=this._appendLeaves(result,props.cluster_id,limit,offset,skipped):skipped<offset?skipped++:result.push(children[i]),result.length===limit)break}return skipped},_addTileFeatures:function(ids,points,x,y,z2,tile){for(var i=0;i<ids.length;i++){var c=points[ids[i]],f={type:1,geometry:[[Math.round(this.options.extent*(c.x*z2-x)),Math.round(this.options.extent*(c.y*z2-y))]],tags:c.numPoints?getClusterProperties(c):this.points[c.index].properties},id=c.numPoints?c.id:this.points[c.index].id;void 0!==id&&(f.id=id),tile.features.push(f)}},_limitZoom:function(z){return Math.max(this.options.minZoom,Math.min(z,this.options.maxZoom+1))},_cluster:function(points,zoom){for(var clusters=[],r=this.options.radius/(this.options.extent*Math.pow(2,zoom)),i=0;i<points.length;i++){var p=points[i];if(!(p.zoom<=zoom)){p.zoom=zoom;var tree=this.trees[zoom+1],neighborIds=tree.within(p.x,p.y,r),numPoints=p.numPoints||1,wx=p.x*numPoints,wy=p.y*numPoints,clusterProperties=null;this.options.reduce&&(clusterProperties=this.options.initial(),this._accumulate(clusterProperties,p));for(var id=(i<<5)+(zoom+1),j=0;j<neighborIds.length;j++){var b=tree.points[neighborIds[j]];if(!(b.zoom<=zoom)){b.zoom=zoom;var numPoints2=b.numPoints||1;wx+=b.x*numPoints2,wy+=b.y*numPoints2,numPoints+=numPoints2,b.parentId=id,this.options.reduce&&this._accumulate(clusterProperties,b)}}1===numPoints?clusters.push(p):(p.parentId=id,clusters.push(createCluster(wx/numPoints,wy/numPoints,id,numPoints,clusterProperties)))}}return clusters},_accumulate:function(clusterProperties,point){var properties=point.numPoints?point.properties:this.options.map(this.points[point.index].properties);this.options.reduce(clusterProperties,properties)}};var MapBox=__webpack_require__(1536);const NOOP=()=>{};function transformProps(chartProps){const{width:width,height:height,formData:formData,hooks:hooks,queryData:queryData}=chartProps,{onError:onError=NOOP,setControlValue:setControlValue=NOOP}=hooks,{bounds:bounds,geoJSON:geoJSON,hasCustomMetric:hasCustomMetric,mapboxApiKey:mapboxApiKey}=queryData.data,{clusteringRadius:clusteringRadius,globalOpacity:globalOpacity,mapboxColor:mapboxColor,mapboxStyle:mapboxStyle,pandasAggfunc:pandasAggfunc,pointRadius:pointRadius,pointRadiusUnit:pointRadiusUnit,renderWhileDragging:renderWhileDragging}=formData,rgb=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(mapboxColor);if(null===rgb)return onError("Color field must be of form 'rgb(%d, %d, %d)'"),{};const opts={maxZoom:MapBox.DEFAULT_MAX_ZOOM,radius:clusteringRadius};hasCustomMetric&&(opts.initial=()=>({sum:0,squaredSum:0,min:1/0,max:-1/0}),opts.map=prop=>({sum:prop.metric,squaredSum:prop.metric**2,min:prop.metric,max:prop.metric}),opts.reduce=(accu,prop)=>{accu.sum+=prop.sum,accu.squaredSum+=prop.squaredSum,accu.min=Math.min(accu.min,prop.min),accu.max=Math.max(accu.max,prop.max)});const clusterer=function supercluster(options){return new SuperCluster(options)}(opts);return clusterer.load(geoJSON.features),{width:width,height:height,aggregatorName:pandasAggfunc,bounds:bounds,clusterer:clusterer,globalOpacity:globalOpacity,hasCustomMetric:hasCustomMetric,mapboxApiKey:mapboxApiKey,mapStyle:mapboxStyle,onViewportChange({latitude:latitude,longitude:longitude,zoom:zoom}){setControlValue("viewport_longitude",longitude),setControlValue("viewport_latitude",latitude),setControlValue("viewport_zoom",zoom)},pointRadius:"Auto"===pointRadius?MapBox.DEFAULT_POINT_RADIUS:pointRadius,pointRadiusUnit:pointRadiusUnit,renderWhileDragging:renderWhileDragging,rgb:rgb}}}}]);
//# sourceMappingURL=31.ebae9664c9688180d36c.bundle.js.map