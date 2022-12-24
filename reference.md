- [_dom](#_dom) Create an HTMLElement
  - [_dom.addService](#_dom.add-service) (beta) adds a module service
  - [_dom.append](#_dom.append) (deprecated,system) adds elements to target
  - [_dom.catchMethod](#_dom.catch-method) (beta) Hacks target native methods
  - [_dom.cssStatus](#_dom.css-status) (beta) Use with model declaration to handle status binded css
  - [_dom.defaultCss](#_dom.default-css) Get browser native element default css values.
  - [_dom.export](#_dom.export) (beta) clone _dom module and obfuscate unreferenced models
  - [_dom.findParent](#_dom.find-parent) Finds **dom** parent if the condition is fullfilled
  - [_dom.has](#_dom.has) Checks if a model is available in this module.
  - [_dom.import](#_dom.import) (beta) import other modules
  - [_dom.instance](#_dom.instance) Instanciates a declared model. …
  - [_dom.model](#_dom.model) Add a custom element to this module. …
  - [_dom.modelShadow](#_dom.model-shadow) renders your model intanciable via html by using dom shadow
  - [_dom.modelShadowed](#_dom.model-shadowed) check if a model has allready been shadowed.
  - [_dom.module](#_dom.module) (beta) returns an empty module. …
  - [_dom.rule](#_dom.rule) Create a new js cssRule object;
  - [_dom.rules](#_dom.rules) Create a collection of cssRule objects;
  - [_dom.scrollTo](#_dom.scroll-to) scroll **container** to target element
  - [_dom.models](#_dom.models)
  - [_dom.moduleName](#_dom.module-name)
  - [_dom.services](#_dom.services)
  - [_dom.sheet](#_dom.sheet)
  - [_dom.uid](#_dom.uid)
<hr/>

## <a name="_dom"></a> _dom

Create an HTMLElement
 - **parameter**  {string} tagName the element tagname
 - **parameter**  {object} [datas] element attributes.
 - **parameter**  {Array} [childs] element childs. can contain strings an html elements.
 - **parameter**  {string} [nameSpace] element namesapace if any.
 - **returns**  {HTMLElement} a new html element




## <a name="_dom.add-service"></a> _dom.addService

(beta) adds a module service
 - **param**  {string} name
 - **param**  {Class(proxy:DomServiceConstructorProxy)} constructor : service constructor
 - **param**  {array|function():array} args arguments for instanciation
 - **returns**  {any} service




## <a name="_dom.append"></a> _dom.append

(deprecated,system) adds elements to target
 - **param**  {*} target
 - **param**  {html||text[]} childs




## <a name="_dom.catch-method"></a> _dom.catchMethod

(beta) Hacks target native methods
 - **param**  {object} target
 - **param**  {string} method
 - **param**  {function} callback
 - **returns**  {CatchMethod}




## <a name="_dom.css-status"></a> _dom.cssStatus

(beta) Use with model declaration to handle status binded css
 - **param**  {string|object(prefix?:string,defaultValue?:string,initValue?:string)} options<br/>css prefix or options :<br/>- prefix?: the css prefixing status className<br/>- defaultValue?: the default status when unidentified<br/>- initValue?: the status when attaching dom.
 - **returns**  {DomCssStatus}




## <a name="_dom.default-css"></a> _dom.defaultCss

Get browser native element default css values.
 - **parameter**  {string} tagName : tag name of the native element to test
 - **returns**  {Map} the default css values.




## <a name="_dom.export"></a> _dom.export

(beta) clone _dom module and obfuscate unreferenced models
 - **param**  {string[]|string} models : reference public models.
 - **returns**  {_dom}




## <a name="_dom.find-parent"></a> _dom.findParent

Finds **dom** parent if the condition is fullfilled
 - **param**  {Htmlelement} dom : the starting element
 - **param**  {function():boolean} condition : checks if the element fullfills your conditions
 - **param**  {number>1} maxDeep : how deep in the parent pile you will search
 - **returns**  {Htmlelement}




## <a name="_dom.has"></a> _dom.has

Checks if a model is available in this module.
 - **parameter**  {string} tagName : the name of the model
 - **return**  {boolean} true if tagName exists.




## <a name="_dom.import"></a> _dom.import

(beta) import other modules
 - **param**  {Array<_dom|DomModule>} domModules




## <a name="_dom.instance"></a> _dom.instance

Instanciates a declared model.<br/>Useful if you dont want of the **__dom** property in your html element.<br/>If not, you should instead use _dom and refer to the result **__dom** attribute.
 - **parameter**  {string} tagName
 - **parameter**  {...} ___ whatever arguments the model constructor uses
 - **returns**  {DomModelInstance} an object with the 'dom' property as the root HTMLElement.




## <a name="_dom.model"></a> _dom.model

Add a custom element to this module.<br/>NB: the **__dom** property will be added to the element, pointing to it's interface (model instance).<br/>interface['dom'] : dom element;<br/>interface[tagName] : element tagName;
 - **parameter**  {string} tagName the custom element name. Should contain at least one "-" to avoid conflict with natives HTMLElements.
 - **parameter**  {function} constructor receive the arguments of <b>_dom(...args)</b> but the dont have to respect the nomenclature excepted 'tagName'.<br/>Must return an HTMLElement.<br/><b>NB</b> : constructor Must be a function and <b>NOT a lambda expression</b> because it is scoped to its interface.
 - **parameter**  {object|function} [cssRules] is or returns an object describing rules like _dom.rules,<br/>but the created collection will be instancied only once and shared among interfaces.<br/>Adds the 'rules' property to the interface.
 - **parameter**  {boolean|object} [shadowed] If true or object, your model is instanciable via html.<br/>See _dom.modelShadow.<br/>if object, shadowed is the arguments types by their name.




## <a name="_dom.model-shadow"></a> _dom.modelShadow

renders your model intanciable via html by using dom shadow
 - **parameter**  {string} tagName the model name.
 - **parameter**  {object} [argTypes] argument types by their name.




## <a name="_dom.model-shadowed"></a> _dom.modelShadowed

check if a model has allready been shadowed.
 - **parameter**  {string} tagName the model name.
 - **returns**  {boolean}




## <a name="_dom.module"></a> _dom.module

(beta) returns an empty module.<br/>Use with **export** and **import** to modularise applications
 - **param**  {string} [name]
 - **returns**  {_dom}




## <a name="_dom.rule"></a> _dom.rule

Create a new js cssRule object;
 - **parameter**  {string} selector the new rule css query.
 - **parameter**  {object} [datas] style datas.
 - **returns**  {CSSStyleRule}




## <a name="_dom.rules"></a> _dom.rules

Create a collection of cssRule objects;
 - **parameter**  {object} datas sass like structured object
 - **parameter**  {CSSStyleSheet} [sheet] target stylesheet
 - **parameter**  {string} [uniquePrefix] if set, will encapsulate datas with a unique className.<br/>an object {className:string,rules:object([ruleName]:CSSStyleRule} will be returned.
 - **returns**  {object([ruleName]:CSSStyleRule)}




## <a name="_dom.scroll-to"></a> _dom.scrollTo

scroll **container** to target element
 - **param**  {HtmlElement} container
 - **param**  {HtmlElement} target
 - **param**  {[number,number]} [offset] : position offset




## <a name="_dom.models"></a> _dom.models


 - **property**  {string[]} _dom.models a list of available models in this module.




## <a name="_dom.module-name"></a> _dom.moduleName


 - **property**  {string} _dom.moduleName return the handling module name.




## <a name="_dom.services"></a> _dom.services


 - **property**  {Proxy} _dom.services A proxy to the module services by their name.




## <a name="_dom.sheet"></a> _dom.sheet


 - **property**  {CSSStyleSheet} _dom.sheet The last available CSSStyleSheet.




## <a name="_dom.uid"></a> _dom.uid


 - **property**  {uid} _dom.uid a different unique id each time it is read.


