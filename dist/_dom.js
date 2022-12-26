const _dom = (function(){
	const _y_minilib_manager_	= {};
	(function(){
		class CatchMethodHandler{
			constructor(catcher,args){
				this._catcher	= catcher;
				this._args		= args;
				this._data		= null;
			}
			get result(){
				return this._data?this._data.value:undefined;
			}
			set result(v){
				this.touch();
				this._data.value=v;
			}
			get method(){		return this._catcher.method}
			get arguments(){	return this._args.slice(0)}
			get args(){			return this._args.slice(0)}
			get untouched(){	return !this._data;	}
			touch(){
				if(!this._data)this._data={};
			}
			apply(args){
				return this.result=this._catcher.callMethod(args);
			}
			flush(){
				return this.apply(this.arguments);
			}
			pipe(target){
				return this.result=target[this.method].apply(target,this.args);
			}
		}
		class CatchMethod{
			constructor(target,method,callback){
				if(!target.constructor||!target.constructor.prototype
					||typeof(target.constructor.prototype[method])!=='function'
				){
					console.error('----------_dom.catchMethod Error');
					console.log('target:',target);
					throw(['',
						'_dom.catchMethod Error:',
						'The target dont have a constructor prototype with a method "'+method+'".'
					].join('\n'));
				}
				this.target		= target;
				this.method		= method;
				this.callback	= callback;
				this.proto		= target.constructor.prototype;
				this.attached	= false;
			}
			callMethod(args){
				return this.proto[this.method].apply(this.target,args);
			}
			fork(target){
			}
			attach(){
				if(!this.attached){
					this.attached=true;
					const scope=this;
					this.target[this.method]=(...args)=>{
						const handler=new CatchMethodHandler(scope,args);
						let result=scope.callback(handler);
						if(result===undefined){
							if(handler.untouched)handler.flush();
							result=handler.result;
						}
						return result;
					};
				}
				return this;
			}
			detach(){
				if(this.attached){
					this.attached=false;
					this.target[this.method]=this.proto[this.method].bind(this.target);
				}
				return this;
			}
		}
		_y_minilib_manager_['CatchMethod.js']={CatchMethod};
	})();
	(function(){
		class DomCore{
			constructor(){}
			static get uid(){
				return Date.now().toString(16)+'-'+Math.floor(Math.random()*1E12).toString(16);
			}
			/**
			 * Create a native HTMLElement
			 * @parameter {string} tagName the element tagname (natives only)
			 * @parameter {object} [datas] element attributes.
			 * @parameter {Array} [childs] element childs. can contain strings an html elements.
			 * @parameter {string} [nameSpace] element namesapace if any.
			 * @returns {HTMLElement} a new html element
			 */
			 static dom(tagName,datas,childs,nameSpace){
				let args=arguments,node;
				try{
					node = typeof(nameSpace)==="string"?
						document.createElementNS(nameSpace,tagName):
						document.createElement(tagName);
					if(!childs && (datas instanceof Array)){
						childs=datas;
						datas={};
					}
					let dataAssign=function(tgt,src,dataname){
						if(typeof(tgt)==="undefined")throw("property '"+dataname+"' doesn't exist.");
						for(let i in src){
							if(typeof(src[i])==="object")
							dataAssign(tgt[i],src[i],dataname+"."+i)
							else tgt[i] = src[i];
						}
					 };
					dataAssign(node,datas,(""+tagName).toUpperCase());
					this.append(node,childs);
			   }catch(err){
				   console.error('----------_dom Error');
				   console.log('arguments=',args);
				   console.log('error=',err);
				   throw("_dom Error:\n"+err+"");
			   }
			   return node;
			}
			static append(target,childs){
				if(!(target instanceof HTMLElement)){
					throw("_dom.append Error:\nparameter dom must be a dom element.");
				}
				if(childs && typeof(childs.length)==='number'){
					if(typeof(childs)==='string')target.innerHTML+=childs;
					else for(let i=0;i<childs.length;i++){
						if(typeof(childs[i])==="string")target.appendChild(document.createTextNode(childs[i]));
						else try{target.appendChild(childs[i]);}catch(e){
							console.error('-----------------------');
							console.log('childs['+i+']=',childs[i]);
							console.log('error=',e);
							throw("_dom.append Error:\nparameter childs["+i+"] must be string or dom element.");}
					}
				}
			}
			static findParent(dom,condition,maxDeep=10){
				let errs=[];
				if(!(dom instanceof HTMLElement))errs.push('arg[0] "dom" is not an HTMLElement.');
				if(typeof(condition)!=='function')errs.push('arg[1] "condition" is not a function.');
				if(typeof(maxDeep)!=='number'||maxDeep<2)errs.push('arg[2] "maxDeep" is not a number with a value > 1 ."');
				if(errs.length){
					console.error('----------_dom.findParent Error');
					console.log('arguments=',arguments);
					throw('\n_dom.findParent Error:\n'+errs.map(e=>'	- '+e).join('\n'));
				}
				for(let i=0;i<maxDeep&&dom.parentNode;i++){
					if(condition(dom))return dom;
					dom=dom.parentNode;
				}
			}
			static events(dom,events){
				(events instanceof Array?events:[events])
				.forEach(evt=>{
					(evt.type instanceof Array?evt.type:[evt.type])
					.forEach(t=>dom.addEventListener(evt.type,evt.callback));
				});
			}
			static objName2tagName(objName){
				return objName.split(/([A-Z])/).map((v,i)=>i%2?'-'+v.toLowerCase():v).join('');
			}
			static tagName2objName(tagName){
				return tagName.split(/-([a-zA-Z])/).map((v,i)=>i%2?v.toUpperCase():v).join('');
				// return tagName.split('-').map(v=>v.charAt(0).toUpperCase()+v.substr(1)).join('');
			}
			static pre_thow(method,message,data={}){
				message=message instanceof Array ? message : [message];
				let dk=Object.keys(data);
				console.error('----------_dom.'+method+' Error');
				Object.keys(data).forEach(k=>{
					console.log(k+' = ',data[k]);
				});
				return ['',
					'_dom.'+method+' Error:',
					...message
				].join('\n');
			}
		}
		_y_minilib_manager_['DomCore.js']={DomCore};
	})();
	(function(){
		const {DomCore} = _y_minilib_manager_['DomCore.js'];
		class DomRules{
			constructor(){}
		}
		class DomCss{
			constructor(){}
			static defaultCssRef=new Map();
			/**
			*
			* @property {CSSStyleSheet} _dom.sheet The last available CSSStyleSheet.
			*/
			static get sheet(){
				if (document.styleSheets.length == 0) {
					document.documentElement.appendChild(DomCore.dom('style',[""]));
				}
			   return document.styleSheets[document.styleSheets.length - 1];
			}
			/**
			 * Create a new js cssRule object;
			 * @parameter {string} selector the new rule css query.
			 * @parameter {object} [datas] style datas.
			 * @returns {CSSStyleRule}
			 */
			 static rule(selector, datas, sheet,rootRules,aliases) {
				if(typeof(selector)!=='string'||!selector.length){
					console.error('----------_dom.rule Error');
					console.log('selector=',selector);
					throw('\n_dom.rule Error:\nselector is not a valid css query.');
				}
				if(!(sheet instanceof CSSStyleSheet))sheet = this.sheet;
				// if(debug)console.log('insert rule %c'+selector,'color:#086');
				sheet.insertRule(selector + "{\n\n}", sheet.cssRules.length);
				let rule = sheet.cssRules[sheet.cssRules.length - 1];
				if (datas) {
					let iterRules=(dat,tgt)=>{
						for (let name in dat) {
							// if(debug)console.log('add style',name,dat[name]);
							if(typeof(dat[name])==='object'){
								rule.appendRule(name+'{\n\n}');
								iterRules(dat[name],rule.cssRules[rule.cssRules.length-1]);
							}else{
								tgt.style[name] = dat[name];
							}
							if(rootRules&&name in aliases)rootRules[aliases[name]]=rootRules[name];
						}
					};
					iterRules(datas,rule);
				}
				return rule;
			}
			/**
			 * Create a collection of cssRule objects;
			 * @parameter {object} datas sass like structured object
			 * @parameter {CSSStyleSheet} [sheet] target stylesheet
			 * @parameter {string} [uniquePrefix] if set, will encapsulate datas with a unique className.
			 * an object {className:string,rules:object([ruleName]:CSSStyleRule} will be returned.
			 * @returns {object([ruleName]:CSSStyleRule)}
			 */
			 static rules(data,sheet,uniquePrefix=''){
				let className='';
				if(uniquePrefix){
					className=uniquePrefix+'-'+DomTools.uid;
					data={['.'+className]:data};
				}
				let rules={},rdata=this.getRulesData(data);
				if(!(sheet instanceof CSSStyleSheet))sheet = this.sheet;
				for(let k in rdata.rules){
					try{rules[k]=this.rule(k,rdata.rules[k],sheet,rules,rdata.alias);}catch(e){
						console.warn('_dom.rules Warning:\nInsertion of rule "'+k+'" failed!\n\n'+e);
					}
					if(k in rdata.alias)rules[rdata.alias[k]]=rules[k];
				}
				return className?{className,rules}:rules;
		 	}
			/**
			* Transforms sass like data to css like data.
			* @parameter {object} datas sass like structured object
			* @returns {object(rules:object,alias:object)} data with css rules and aliases.
			*/
			static getRulesData(data){
				let res={rules:{},alias:{}};
				let collect=function(dat,vars,pile,qres){
					let obj={},rname;
					if(pile.length)rname=pile.join('');
					for(let prop in dat){
						let c=prop.charAt(0);
						if(c==='$'){// vars
							vars[prop.substr(1)]=dat[prop];
						}else if(c==='@'){// media query,animation,fonts etc..
							let sres={rules:{}};
							collect(dat[prop],Object.assign({},vars),[],sres);
							qres.rules[prop]=sres.rules;
						}else if(!pile.length||c==='&'){// sub queries
							(pile.length?prop.substr(1):prop).split(',').forEach(name=>{
								collect(dat[prop],Object.assign({},vars),pile.concat([name]),qres||res);
							});
						}else if(prop==='alias'){
							res.alias[rname]=dat[prop];
						}else{
							let tmp=dat[prop]+'';
							Object.keys(vars).forEach(k=>{
								tmp=tmp.indexOf(k)>-1?tmp.split(k).join(vars[k]):tmp;
							});
							obj[prop]=tmp;
						}
					}
					if(rname){
						if(qres.rules[rname])Object.assign(res.rules[rname],obj);
						else qres.rules[rname]=obj;
					}
				};
				collect(data,{},[]);
				return res;
			}
			/**
			* Get browser native element default css values.
			* @parameter {string} tagName : tag name of the native element to test
			* @returns {Map} the default css values.
			*/
			static defaultCss(tagName,force=false){
				let tgt,map;
				if(tagName instanceof HTMLElement){
					tgt=tagName;
					tagName=tagName.tagName;
				}
				tagName=tagName.toLowerCase();
				if(force||tgt||!this.defaultCssRef.has(tagName)){
					let dom,body=document.documentElement;
					try {
						dom=document.createElement(tagName);
						body.appendChild(dom);
						let cs=window.getComputedStyle(dom);
						map=new Map();
						Object.keys(cs)
						.map(id=>cs[id])
						.filter(k=>k.charAt(0)!=='-'&&cs[k]!=='')
						.forEach(k=>map.set(k,cs[k]));
						if(!tgt)this.defaultCssRef.set(tagName,map);
						body.removeChild(dom);
					}catch(e){//in case of other catch
						if(dom&&dom.parentNode)body.removeChild(dom);
						throw('\n_dom.properties Error:\n'+e);
					}
				}else {
					map=this.defaultCssRef.get(tagName);
				}
				return map;
			}
		}
		_y_minilib_manager_['DomCss.js']={DomRules, DomCss};
	})();
	(function(){
		class DomCssStatus_Priv{
			constructor(scope,data=''){
				if(typeof(data)!=='object'){
					data={prefix:(data||'')+''};
				}
				this.prefix=data.prefix||'',
				this.defaultValue=data.defaultValue||'',
				this.initValue=data.initValue||'',
				this.map=new Map();
			}
			get themes(){
				return Array.from(this.map.keys());
			}
			clone(){
				const clone=new DomCssStatus({
					prefix:this.prefix,
					defaultValue:this.defaultValue,
					initValue:this.initValue
				});
				clone._priv.map=new Map(this.map);
				return clone;
			}
			get(status){
				return this.map.get(status);
			}
			add(status,cssobj={}){
				this.map.set(status,cssobj);
			}
			addData(statusData){
				for(let k in statusData){
					this.add(k,statusData[k]);
				}
			}
			extract(){
				const obj={};
				this.themes
				.forEach(status=>{
					obj['&.'+this.prefix+status]=this.map.get(status);
				});
				return obj;
			}
			extractRoot(cssPath){
				return {[cssPath]:this.extract()};
			}
			filterStatus(status,doInit=false){
				if(this.map.has(status))return status;
				if(doInit&&this.map.has(this.initValue))return this.initValue;
				if(this.map.has(this.defaultValue))return this.defaultValue;
				return '';
			}
			attach(target,status=''){
				return new DomCssStatusAttached(this,target,this.filterStatus(status,true));
			}
		}
		class DomCssStatusAttached{
			constructor(domstat,target,status=''){
				this.domstat=domstat;
				this.target=target;
				this.prefix=domstat.prefix,
				this._current=
				this._status=status;
				this.update();
			}
			get status(){
				return this._status;
			}
			set status(s){
				this.select(s);
			}
			update(){
				this.domstat.themes
				.forEach(status=>{
					if(status===this._status){
						this.target.classList.add(this.prefix+status);
					}else{
						this.target.classList.remove(this.prefix+status);
					}
				});
			}
			select(status,force=false){
				status=this.domstat.filterStatus(status);
				const doUp=force||this._status!==status;
				this._status=status;
				if(doUp)this.update();
			}
		}
		/**
		* 
		* @param {string|{prefix?:string,defaultValue?:string,initValue?:string}} data 
		css prefix or options :
		- prefix?: the css prefixing status className
		- defaultValue?: the default status when unidentified
		- initValue?: the status when attaching dom.
		*/
		class DomCssStatus{
			constructor(data=''){
				this._priv=new DomCssStatus_Priv(this,data);
			}
			get themes(){
				return this._priv.themes;
			}
			clone(){
				return this._priv.clone();
			}
			get(status){
				return this._priv.get(status)
			}
			add(status,cssobj={}){
				this._priv.add(status,cssobj);
				return this;
			}
			addData(statusData){
				this._priv.addData(statusData);
				return this;
			}
			extract(){
				return this._priv.extract();
			}
			extractRoot(cssPath){
				return this._priv.extractRoot(cssPath);
			}
			attach(target,status=''){
				return this._priv.attach(target,status);
			}
		}
		_y_minilib_manager_['DomCssStatus.js']={DomCssStatus};
	})();
	(function(){
		const settings={
			debug:false,
			modelref:'__dom',
			moduleref:'__module__',
		};
		_y_minilib_manager_['settings.js']=settings;
	})();
	(function(){
		const {modelref,debug} = _y_minilib_manager_['settings.js'];
		const {DomCss} = _y_minilib_manager_['DomCss.js'];
		class DomModel{
			constructor(module,tagName,constructor,cssRules){
				let rules;
				this.module		= module;
				this.tagName	= tagName;
				this.constructor= constructor;
				this.cssRules	= typeof(cssRules)==='function'?cssRules:(typeof(cssRules)==='object'?function(){return cssRules;}:0);
				this.getRules	= function(args){
					if(this.cssRules&&!rules){
						rules=DomCss.rules(this.cssRules());
					}
					return rules;
				};
			}
			build(args){
				var inst=this.instance(args);
				Object.defineProperty(inst.dom,modelref,{get:function(){return inst;},configurable:true});
				return inst.dom;
			}
			instance(args){
				return new DomModelInstance(this,args);
			}
		}
		class DomModelInstance{
			constructor(model,args){
				Object.defineProperty(this,'tagName',{get:function(){return model.tagName;}});
				if(model.cssRules){
					var rules=model.getRules();
					Object.defineProperty(this,'rules',{get:function(){return rules;}});
				}
				Object.defineProperty(this,'services',{get:function(){return model.module.servicesProxy;}});
				var dom=model.constructor.apply(this,args);
				if(!(dom instanceof HTMLElement)){
					console.error('-----------------------');
					console.log('tagName=',model.tagName);
					console.log('constructor=',model.constructor);
					console.log('this.dom=',dom);
					throw('\n_dom.model Error:\nconstructor must return an HTMLElement.');
				}
				if(dom[modelref]){
					this._super=dom[modelref];
				}
				if(!('dom' in this)){
					Object.defineProperty(this,'dom',{get:function(){return dom;}});
				}	
			}
		}
		_y_minilib_manager_['DomModel.js']={DomModel};
	})();
	(function(){
		// let _modelref='__dom';
		// const debug=false;
		class DomService{
			constructor(domModule,name,constructor,args){
				this.domModule	= domModule;
				this.name		= name;
				this._constructor=constructor;
				this.args		= args;
				this._instance	= null;
				this._services	= null;
			}
			get instance(){
				if(!this._instance){
					let args;
					if(this.args instanceof Array){
						args=this.args;
					}else if(typeof(this.args)==='function'){
						args=this.args();
					}
					if(!(args instanceof Array)){
						console.error('----------_dom.service["'+this.name+'"] Error');
						console.log('args =',this.args);
						console.log('result =',args);
						throw('\n_dom.service Error:\n "args" must be an array or a function returning an array.');
					}
					this._instance	= new this._constructor(new DomServiceConstructorProxy(this.domModule,args));
				}
				return this._instance;
			}
		}
		class DomServiceConstructorProxy{
			constructor(service,args){
				this._priv={service,args};
			}
			get module(){
				return this._priv.service.domModule;
			}
			get arguments(){
				return this._priv.args;
			}
			get services(){
				return this._priv.service.domModule.servicesProxy;
			}
		}
		class DomServicesProxy{
			constructor(domModule){
				this._priv={services:null};
				this.module		= domModule;
			}
			get services(){
				if(!this._services){
					this._priv.services=new Proxy({},{
						get:(tgt,prop)=>{
							const srv=this.module.getService(prop,true);
							if(srv)return srv;
							console.error('-----------------------');
							console.log('tagName	=',tagName);
							console.log('service name	=',prop);
							throw('\n_dom.model.services Error:\nservice "'+prop+'" not found.');
						}
					});
				}
				return this._priv.services;
			}
		}
		// class DomServiceModelProxy{
		// 	constructor(service,args){
		// 		this._priv={service,args};
		// 	}
		// 	get module(){
		// 		return this._priv.service.domModule;
		// 	}
		// }
		_y_minilib_manager_['DomService.js']={DomService,DomServicesProxy};
	})();
	(function(){
		const {DomCore} = _y_minilib_manager_['DomCore.js'];
		const {modelref,debug} = _y_minilib_manager_['settings.js'];
		const shadowedModels=new Map();
		class DomShadow{
			constructor(scope,tagName,args,argTypes){
				let shadow = scope.attachShadow({mode: 'open'});
				argTypes=argTypes||[];
				let values = args.slice(1)
				.map((a,si)=>{
					let attr,i=si+1;
					if(scope.hasAttribute(a)){
						attr=scope.getAttribute(a);
						if(typeof(argTypes[i])==='function'){
							attr=argTypes[i](attr);
						}else if(argTypes[i]==='boolean'){
							attr=['false','0','off'].includes(attr)?false:!!attr.length;
						}else if(argTypes[i]==='int'){
							attr=parseInt(attr);
						}else if(argTypes[i]==='number'){
							attr=parseFloat(attr);
						}else if(argTypes[i]==='function'){
							attr=new Function(''+attr).bind(scope);
						}else if(argTypes[i]!=='string'){
							try {attr=JSON.parse(attr);} catch (e) {}
						}
					}
					return attr;
				});
				args=[tagName]
				.concat(values);
				const wrapper=_dom.apply(null,args);
				shadow.appendChild(wrapper);
				let rhtml=[],rules=wrapper[modelref].rules;
				for(let r in rules)rhtml.push(rules[r].cssText);
				shadow.appendChild(_dom('style',{type:'text/css',textContent:rhtml.join('\n')}));
			}
			/**
			check if a model has allready been shadowed.
			* @parameter {string} tagName the model name.
			* @returns {boolean}
			*/
			static modelShadowed(tagName) {
				return shadowedModels.has(tagName);
			}
			/**
			renders your model intanciable via html by using dom shadow
			* @parameter {string} tagName the model name.
			* @parameter {object} [argTypes] argument types by their name.
			*/
			static modelShadow(domModule,tagName,argTypes) {
				if(this.modelShadowed(tagName))return;
				if(domModule.hasModel(tagName)){
					const root=domModule.rootModule;
					const model=domModule.getModel(tagName);
					let name=DomCore.tagName2objName(tagName);
					let args=(_models[tagName].constructor+'').split(')',2)[0].split('(')[1].split(',');
					let atl=args.map(a=>argTypes.hasOwnProperty(a)?argTypes[a]:0);
					class _class_ extends HTMLElement {
						constructor() {
							super();
							new DomShadow(this,tagName,args,atl);
						}
					}
					const shadowData={name,[name]:class extends _class_ {}};
					shadowedModels.set(tagName,shadowData);
					customElements.define(tagName, shadowData[name]);
					// let args=(model.constructor+'').split('(').slice(1);
					// let ares=[];
					// for(let i=0,ps,lv=1;i<args.length&&lv;i++){
					// 	ps=args[i].split(')');
					// 	lv+=1-ps.length;
					// 	if(lv){
					// 		ares.push(ps.join(')'));
					// 		lv++;
					// 	}
					// }
				}else{
					throw(['',
						'_dom.modelShadow Error:',
						'argument[0] "tagName"="'+tagName+'" has no model declared.'
					].join('\n'))
				}
			}
		}
		_y_minilib_manager_['DomShadow.js']={DomShadow};
	})();
	(function(){
		class DomUtils{}
		DomUtils.scroll={
			offset:function(container,target,offset){
				if(container.contains(target)){
					if(typeof(offset)==='number')offset=[offset,offset];
					else if(offset instanceof Array)offset=[0,1].map(i=>offset[i]||0);
					else offset=[0,0];
					const ofs=[0,0];
					let tmp=target;
					while (tmp!==container) {
						ofs[0]+=tmp.offsetWidth;
						ofs[1]+=tmp.offsetHeight;
						tmp=tmp.parentNode;
					}
					const value = ofs.map((v,i)=>v-offset[i]);
					return value;
				}else{
					console.error('----------_dom.scrollTo Error');
					console.log('container=',container);
					console.log('target=',target);
					throw('_dom.scrollOffset Error: target not found in container');
				}
			},
			value:function(container,target,offset){
				const prev=[container.scrollLeft,container.scrollTop];
				return this.offset(container,target,offset)
				.map((v,i)=>Math.max(0,v-prev[i]));
			},
			to:function(container,target,offset){
				const ofs=this.value(container,target,offset);
				container.scrollTop=ofs[0];
				container.scrollLeft=ofs[1];
			}
		};
		_y_minilib_manager_['DomUtils.js']={DomUtils};
	})();
	(function(){
		const {moduleref,debug} = _y_minilib_manager_['settings.js'];
		const {DomCss} = _y_minilib_manager_['DomCss.js'];
		const {DomShadow} = _y_minilib_manager_['DomShadow.js'];
		const {DomCssStatus} = _y_minilib_manager_['DomCssStatus.js'];
		const {DomCore} = _y_minilib_manager_['DomCore.js'];
		const {DomUtils} = _y_minilib_manager_['DomUtils.js'];
		const {CatchMethod} = _y_minilib_manager_['CatchMethod.js'];
		_y_minilib_manager_['_dom.builder.js']=function(domModule){
			/**
			* Create an HTMLElement
			* @parameter {string} tagName the element tagname
			* @parameter {object} [datas] element attributes.
			* @parameter {Array} [childs] element childs. can contain strings an html elements.
			* @parameter {string} [nameSpace] element namesapace if any.
			* @returns {HTMLElement} a new html element
			*/
			const _dom=function(tagName,datas,childs,nameSpace){
				return domModule.make(...arguments);
			};
			/**
			* (system) reference to the linked module
			*/
			Object.defineProperty(_dom,moduleref,{value:domModule,writable:false,enumerable:false});
			/**
			* @property {string} _dom.moduleName return the handling module name.
			*/
			Object.defineProperty(_dom,'moduleName',{get:()=>domModule.name});
			/**
			* @property {uid} _dom.uid a different unique id each time it is read.
			*/
			Object.defineProperty(_dom,'uid',{get:()=>DomCore.uid});
			/**
			* @property {string[]} _dom.models a list of available models in this module.
			*/
			Object.defineProperty(_dom,'models',{get:()=>domModule.availableModels});
			/**
			* @property {CSSStyleSheet} _dom.sheet The last available CSSStyleSheet.
			*/
			Object.defineProperty(_dom,'sheet',{get:()=>DomCss.sheet});
			/**
			* @property {Proxy} _dom.services A proxy to the module services by their name.
			*/
			Object.defineProperty(_dom,'services',{get:()=>domModule.servicesProxy});
			// Object.defineProperty(this,'services',{get:function(){return model.module.servicesProxy;}});
			/**
			* (deprecated,system) adds elements to target
			* @param {*} target 
			* @param {html||text[]} childs 
			*/
			_dom.append=function(target,childs){
				DomCore.append(target,childs);
			}
			/**
			* Add a custom element to this module.
			* NB: the **__dom** property will be added to the element, pointing to it's interface (model instance).
			* interface['dom'] : dom element;
			* interface[tagName] : element tagName;
			* @parameter {string} tagName the custom element name. Should contain at least one "-" to avoid conflict with natives HTMLElements.
			* @parameter {function} constructor receive the arguments of <b>_dom(...args)</b> but the dont have to respect the nomenclature excepted 'tagName'.
			Must return an HTMLElement.
			<b>NB</b> : constructor Must be a function and <b>NOT a lambda expression</b> because it is scoped to its interface.
			* @parameter {object|function} [cssRules] is or returns an object describing rules like _dom.rules,
			but the created collection will be instancied only once and shared among interfaces.
			Adds the 'rules' property to the interface.
			* @parameter {boolean|object} [shadowed] If true or object, your model is instanciable via html.
			*	See _dom.modelShadow.
			*	if object, shadowed is the arguments types by their name.
			*/
			_dom.model=function(tagName,constructor,cssRules,shadowed){
				return domModule.model(tagName,constructor,cssRules,shadowed);
			}
			/** 
			* (beta) adds a module service
			* @param {string} name 
			* @param {Class(proxy:DomServiceConstructorProxy)} constructor : service constructor
			* @param {array|function():array} args arguments for instanciation
			* @returns {any} service
			*/
			_dom.addService=function(name,constructor,args){
				return domModule.addService(name,constructor,args);
			}
			/**
			Checks if a model is available in this module.
			* @parameter {string} tagName : the name of the model
			* @return {boolean} true if tagName exists.
			*/
			_dom.has=function(tagName){
				return domModule.hasModel(tagName);
			}
			/**
			* Instanciates a declared model.
			* Useful if you dont want of the **__dom** property in your html element.
			* If not, you should instead use _dom and refer to the result **__dom** attribute.
			* @parameter {string} tagName
			* @parameter {...} ___ whatever arguments the model constructor uses
			* @returns {DomModelInstance} an object with the 'dom' property as the root HTMLElement.
			*/
			 _dom.instance=function(tagName,whatever__){
				return domModule.instance(tagName,whatever__);
			}
			/**
			* Finds **dom** parent if the condition is fullfilled
			* @param {Htmlelement} dom : the starting element
			* @param {function():boolean} condition : checks if the element fullfills your conditions
			* @param {number>1} maxDeep : how deep in the parent pile you will search
			* @returns {Htmlelement}
			*/
			_dom.findParent=function(dom,condition,maxDeep=10){
				return DomCore.findParent(dom,condition,maxDeep);
			}
			_dom.events=function(dom,events){
				return DomCore.events(dom,events);
			}
			/**
			* Get browser native element default css values.
			* @parameter {string} tagName : tag name of the native element to test
			* @returns {Map} the default css values.
			*/
			_dom.defaultCss=function(tagName,force=false){
				return DomCss.defaultCss(tagName,force);
			}
			/**
			* Create a new js cssRule object;
			* @parameter {string} selector the new rule css query.
			* @parameter {object} [datas] style datas.
			* @returns {CSSStyleRule}
			*/
			_dom.rule=function(selector, datas, sheet){
				return DomCss.rule(selector, datas, sheet);
			};
			/**
			* Create a collection of cssRule objects;
			* @parameter {object} datas sass like structured object
			* @parameter {CSSStyleSheet} [sheet] target stylesheet
			* @parameter {string} [uniquePrefix] if set, will encapsulate datas with a unique className.
			* an object {className:string,rules:object([ruleName]:CSSStyleRule} will be returned.
			* @returns {object([ruleName]:CSSStyleRule)}
			*/
			_dom.rules=function(data,sheet,uniquePrefix=''){
				return DomCss.rules(data,sheet,uniquePrefix);
			};
			/**
			check if a model has allready been shadowed.
			* @parameter {string} tagName the model name.
			* @returns {boolean}
			*/
			_dom.modelShadowed=function(tagName){
				return DomShadow.modelShadowed(tagName);
			};
			/**
			renders your model intanciable via html by using dom shadow
			* @parameter {string} tagName the model name.
			* @parameter {object} [argTypes] argument types by their name.
			*/
			_dom.modelShadow = function (tagName,argTypes) {
				return DomShadow.modelShadow(domModule,tagName,argTypes);
			};
			/**
			* (beta) returns an empty module.
			* Use with **export** and **import** to modularise applications
			* @param {string} [name] 
			* @returns {_dom}
			*/
			_dom.module=function(name){
				return domModule.module(name)._dom;
			}
			/**
			* (beta) clone _dom module and obfuscate unreferenced models
			* @param {string[]|string} models : reference public models.
			* @returns {_dom}
			*/
			_dom.export=function(models){
				return domModule.export(models)._dom;
			}
			/**
			* (beta) import other modules
			* @param {Array<_dom|DomModule>} domModules 
			*/
			_dom.import=function(domModules){
				domModule.import(domModules);
			}
			/**
			* (beta) Use with model declaration to handle status binded css
			* @param {string|object(prefix?:string,defaultValue?:string,initValue?:string)} options
			* css prefix or options :
			* - prefix?: the css prefixing status className
			* - defaultValue?: the default status when unidentified
			* - initValue?: the status when attaching dom.
			* @returns {DomCssStatus}
			*/
			_dom.cssStatus=function(options=''){
				return new DomCssStatus(options);
			}
			/**
			* scroll **container** to target element
			* @param {HtmlElement} container 
			* @param {HtmlElement} target
			* @param {[number,number]} [offset] : position offset
			*/
			_dom.scrollTo=function(container,target,offset){
				DomUtils.scroll.to(container,target,offset);
			}
			/**
			 * (beta) Hacks target native methods
			 * @param {object} target 
			 * @param {string} method 
			 * @param {function} callback 
			 * @returns {CatchMethod}
			 */
			_dom.catchMethod=function(target,method,callback){
				return new CatchMethod(target,method,callback).attach();
			}
			return _dom;
		};
	})();
	(function(){
		// let _modelref='__dom';
		// const debug=false;
		const {moduleref,debug} = _y_minilib_manager_['settings.js'];
		const builder = _y_minilib_manager_['_dom.builder.js'];
		const {DomCore} = _y_minilib_manager_['DomCore.js'];
		const {DomModel} = _y_minilib_manager_['DomModel.js'];
		const {DomShadow} = _y_minilib_manager_['DomShadow.js'];
		const {DomService,DomServicesProxy} = _y_minilib_manager_['DomService.js'];
		let rootModule=null,idCnt=1;
		class DomModule{
			constructor(name){
				if(!rootModule)rootModule=this;
				this.id			= idCnt++;
				this.name		= name||('mod_module_'+this.id);
				this.models		= new Map();
				this.publicModels	= new Map();
				this.services	= new Map();
				this.publicServices	= new Map();
				this.modules	= [];
				this._dom		= builder(this);
				this.parent		= null;
				this._servicesProxy=new DomServicesProxy(this);
			}
			static get rootModule(){
				return rootModule;
			}
			get rootModule(){
				return rootModule;
			}
			get availableModels(){
				const list=[];
				this.modules.forEach(m=>list.push(...m.availableModels));
				return list.concat(Array.from(this.publicModels.keys()));
			}
			get availableServices(){
				const list=[];
				this.modules.forEach(m=>list.push(...m.availableServices));
				return list.concat(Array.from(this.publicServices.keys()));
			}
			get parentPile(){
				return this.parent?this.parent.pile:[];
			}
			get pile(){
				return this.parent?[this].concat(this.parent.pile):[this];
			}
			get servicesProxy(){
				return this._servicesProxy.services;
			}
			findModule(cb){
				if(cb(this))return this;
				for(let m of this.modules){
					let r=m.findModule(cb);
					if(r)return r;
				}
			}
			module(name){
				return new DomModule(name);
			}
			clone(data=null,parent=null){
				data=data||{};
				let dmod	= new DomModule();
				dmod.parent		= parent;
				dmod.models		= new Map(data.models||this.models);
				dmod.publicModels	= new Map(data.publics||this.publicModels);
				dmod.publicServices	= new Map(data.publicServices||this.publicServices);
				dmod.modules	= this.modules.map(m=>m.clone(null,this));
				return dmod;
			}
			export(models,services=[]){
				const xobj={models,services};
				for(let k in xobj){
					let v=xobj[k];
					console.log(v instanceof Array,v.every(v=>typeof(v)==='string'));
					if(!(v instanceof Array)||!v.every(v=>typeof(v)==='string')){
						throw(DomCore.pre_thow('export',[
							'argument "'+k+'" Must be an array of strings.'
						],{[k]:v}));
					}
				}
				if(!(models.length+services.length)){
					throw(DomCore.pre_thow('export',[
						'cant export a module with no public declarations.'
					],{models,services}));
				}
				let notFound;
				if((notFound=models.filter(n=>!this.hasModel(n))).length){
					throw(DomCore.pre_thow('export',[
						'Some models are not found.'
					],{models,'not found':notFound,availables:this.availableModels}));
				}
				if((notFound=services.filter(n=>!this.hasService(n))).length){
					throw(DomCore.pre_thow('export',[
						'Some services are not found.'
					],{services,'not found':notFound,availables:this.availableServices}));
				}
				let data={publics:new Map(),publicServices:new Map()};
				models.forEach(k=>data.publics.set(k,true));
				services.forEach(k=>data.publicServices.set(k,true));
				return this.clone(data);
				// const list = (models instanceof Array)?models:[models];
				// if((notFound=list.filter(n=>!this.has(n))).length){}
				// if(!list.length){
				// 	console.error('----------_dom.export Error');
				// 	console.log('models=',models);
				// 	throw('\n_dom.export Error:\nlist "models" is empty.');
				// }else if((notFound=list.filter(n=>!this.has(n))).length){
				// 	console.error('----------_dom.export Error');
				// 	console.log('models=',models);
				// 	console.log('not found=',notFound);
				// 	console.log('availables=',this.availableModels);
				// 	throw('\n_dom.export Error:\nSome models are not found.');
				// }else{
				// 	let data={publics:new Map()};
				// 	list.forEach(k=>data.publics.set(k,true));
				// 	return this.clone(data);
				// }
			}
			import(domModules){
				const nmi=[];
				const list = ((domModules instanceof Array)?domModules:[domModules])
				.map((dm,i)=>{
					if(dm instanceof DomModule)return dm;
					if(dm && (dm[moduleref] instanceof DomModule))return dm[moduleref];
					nmi.push(i);
				});
				if(nmi.length){
					console.error('----------_dom.import Error');
					console.log('domModules=',domModules);
					throw('\n_dom.import Error:\ndomModules not importables at indexes ('+nmi.join(' ,')+' ) .');
				}
				let pile=this.parentPile;
				list.map(added=>{
					if(this.id===added.id){
						throw('\n_dom.import Error:\nModule "'+fm.name+'" cant import Himself.');
					}
					if(this.modules.find((m)=>m.id===added.id)){
						throw('\n_dom.import Error:\nModule "'+fm.name+'" allready in "'+this.name+'" collection.');
					}
					pile.map(dm=>{
						if(added.findModule((m)=>m.id===dm.id)){
							console.error('----------_dom.import Error');
							console.log('domModules=',domModules);
							throw('\n_dom.import Error:\nCyclic reference for module "'+added.name+'".');
						}
					});
					this.modules.push(added.clone(null,this));
				});
			}
			addService(name,constructor,args){
				const srv=new DomService(this,name,constructor,args);
				this.services.set(name,srv);
				this.publicServices.set(name,true);
			}
			hasService(name){
				return !!(this.publicServices.has(name)||this.modules.find(m=>m.hasService(name)));
			}
			getService(name,force=false){
				if(this.publicServices.has(name)||(force&&this.services.has(name))){
					return this.services.get(name).instance;
				}else{
					return this.modules.find(m=>m.getService(tagName))||null;
				}
			}
			/**
			Checks if a model is available in this module.
			* @parameter {string} tagName : the name of the model
			* @return {boolean} true if tagName exists.
			*/
			hasModel(tagName){
				return !!(this.publicModels.has(tagName)||this.modules.find(m=>m.hasModel(tagName)));
			}
			/**
			* Finds a public model in this module and sub modules
			* @param {string} tagName 
			* @returns {DomModel|null}
			*/
			getModel(tagName){
				if(this.publicModels.has(tagName)){
					return this.models.get(tagName);
				}else{
					return this.modules.find(m=>m.getModel(tagName))||null;
				}
			}
			/**
			* Instanciates a declared model.
			* Useful if you dont want of the **__dom** property in your html element.
			* If not, you should instead use _dom and refer to the result **__dom** attribute.
			* @parameter {string} tagName
			* @parameter {...} ___ whatever arguments the model constructor uses
			* @returns {DomModelInstance} an object with the 'dom' property as the root HTMLElement.
			*/
			instance(tagName,whatever__){
				if(!this.hasModel(tagName)){
					console.error('----------_dom.instance Error');
					console.log('arguments=',arguments);
					throw('\n_dom.instance Error:\ntagName "'+tagName+'" not found in models.');
				}
				return this.getModel(tagName).instance(arguments);
			}
			/**
			* Create an HTMLElement
			* @parameter {string} tagName the element tagname
			* @parameter {object} [datas] element attributes.
			* @parameter {Array} [childs] element childs. can contain strings an html elements.
			* @parameter {string} [nameSpace] element namesapace if any.
			* @returns {HTMLElement} a new html element
			*/
			make(tagName,datas,childs,nameSpace){
				let args=arguments,node;
				if(this.hasModel(tagName)){
					return this.getModel(tagName).build(args);
				}
				return DomCore.dom(tagName,datas,childs,nameSpace);
			}
			/**
			* Add a custom element to _dom.
			* NB: the **__dom** property will be added to the element, pointing to it's interface (model instance).
			* interface['dom'] : dom element;
			* interface[tagName] : element tagName;
			* @parameter {string} tagName the custom element name. Should contain at least one "-" to avoid conflict with natives HTMLElements.
			* @parameter {function} constructor receive the arguments of <b>_dom(...args)</b> but the dont have to respect the nomenclature excepted 'tagName'.
			Must return an HTMLElement.
			<b>NB</b> : constructor Must be a function and <b>NOT a lambda expression</b> because it is scoped to its interface.
			* @parameter {object|function} [cssRules] is or returns an object describing rules like _dom.rules,
			but the created collection will be instancied only once and shared among interfaces.
			Adds the 'rules' property to the interface.
			* @parameter {boolean|object} [shadowed] If true or object, your model is instanciable via html.
			*	See _dom.modelShadow.
			*	if object, shadowed is the arguments types by their name.
			*/
			model(tagName,constructor,cssRules,shadowed){
				// console.log('add model',arguments);
				if(tagName.indexOf('-')===-1){
					console.warn('_dom.model suspect tagName "'+tagName+'" should contain at least one "-" to avoid conflict with natives HTMLElements.');
				}
				if(this.models.has(tagName)||this.hasModel(tagName)){
					throw('\n_dom.model Error:\ntagName "'+tagName+'" allready exists in this module.');
				}
				if(typeof(constructor)!=='function'){
					console.error('----------_dom.model Error');
					console.log('tagName=',tagName);
					console.log('constructor=',constructor);
					throw('\n_dom.model Error:\nconstructor must be a function.');
				}
				this.models.set(tagName,new DomModel(this,tagName,constructor,cssRules));
				this.publicModels.set(tagName,true);
				if(shadowed)DomShadow.modelShadow(this,tagName,shadowed);
			}
		}
		_y_minilib_manager_['DomModule.js']={DomModule};
	})();
	(function(){
		const {DomModule} = _y_minilib_manager_['DomModule.js'];
		_y_minilib_manager_['_dom.js']=(new DomModule())._dom;
		// _y_minilib_manager_['_dom.js']=(window._dom)||(new DomModule())._dom;
	})();
	return _y_minilib_manager_["_dom.js"];
})();
try {
	module.exports=_dom;
} catch (e) {}