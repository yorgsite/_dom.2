- [_dom](#tgt__dom) Create an HTMLElement
  - [_dom.addService](#tgt__dom_addService) (beta) adds a module service
  - [_dom.append](#tgt__dom_append) (deprecated,system) adds elements to target
  - [_dom.catchMethod](#tgt__dom_catchMethod) (beta) Hacks target native methods
  - [_dom.cssStatus](#tgt__dom_cssStatus) (beta) Use with model declaration to handle status binded css
  - [_dom.defaultCss](#tgt__dom_defaultCss) Get browser native element default css values.
  - [_dom.export](#tgt__dom_export) (beta) clone _dom module and obfuscate unreferenced models
  - [_dom.findParent](#tgt__dom_findParent) Finds **dom** parent if the condition is fullfilled
  - [_dom.has](#tgt__dom_has) Checks if a model is available in this module.
  - [_dom.import](#tgt__dom_import) (beta) import other modules
  - [_dom.instance](#tgt__dom_instance) Instanciates a declared model. …
  - [_dom.model](#tgt__dom_model) Add a custom element to this module. …
  - [_dom.modelShadow](#tgt__dom_modelShadow) renders your model intanciable via html by using dom shadow
  - [_dom.modelShadowed](#tgt__dom_modelShadowed) check if a model has allready been shadowed.
  - [_dom.module](#tgt__dom_module) (beta) returns an empty module. …
  - [_dom.rule](#tgt__dom_rule) Create a new js cssRule object;
  - [_dom.rules](#tgt__dom_rules) Create a collection of cssRule objects;
  - [_dom.scrollTo](#tgt__dom_scrollTo) scroll **container** to target element
  - [_dom.models](#tgt__dom_models)
  - [_dom.moduleName](#tgt__dom_moduleName)
  - [_dom.services](#tgt__dom_services)
  - [_dom.sheet](#tgt__dom_sheet)
  - [_dom.uid](#tgt__dom_uid)
<hr/>

## <a name="tgt__dom"></a> _dom

Create an HTMLElement
 - **parameter**  {string} tagName the element tagname
 - **parameter**  {object} [datas] element attributes.
 - **parameter**  {Array} [childs] element childs. can contain strings an html elements.
 - **parameter**  {string} [nameSpace] element namesapace if any.
 - **returns**  {HTMLElement} a new html element




## <a name="tgt__dom_addService"></a> _dom.addService

(beta) adds a module service
 - **param**  {string} name
 - **param**  {Class(proxy:DomServiceConstructorProxy)} constructor : service constructor
 - **param**  {array|function():array} args arguments for instanciation
 - **returns**  {any} service




## <a name="tgt__dom_append"></a> _dom.append

(deprecated,system) adds elements to target
 - **param**  {*} target
 - **param**  {html||text[]} childs




## <a name="tgt__dom_catchMethod"></a> _dom.catchMethod

(beta) Hacks target native methods
 - **param**  {object} target
 - **param**  {string} method
 - **param**  {function} callback
 - **returns**  {CatchMethod}




## <a name="tgt__dom_cssStatus"></a> _dom.cssStatus

(beta) Use with model declaration to handle status binded css
 - **param**  {string|object(prefix?:string,defaultValue?:string,initValue?:string)} options<br/>css prefix or options :<br/>- prefix?: the css prefixing status className<br/>- defaultValue?: the default status when unidentified<br/>- initValue?: the status when attaching dom.
 - **returns**  {DomCssStatus}




## <a name="tgt__dom_defaultCss"></a> _dom.defaultCss

Get browser native element default css values.
 - **parameter**  {string} tagName : tag name of the native element to test
 - **returns**  {Map} the default css values.




## <a name="tgt__dom_export"></a> _dom.export

(beta) clone _dom module and obfuscate unreferenced models
 - **param**  {string[]|string} models : reference public models.
 - **returns**  {_dom}




## <a name="tgt__dom_findParent"></a> _dom.findParent

Finds **dom** parent if the condition is fullfilled
 - **param**  {Htmlelement} dom : the starting element
 - **param**  {function():boolean} condition : checks if the element fullfills your conditions
 - **param**  {number>1} maxDeep : how deep in the parent pile you will search
 - **returns**  {Htmlelement}




## <a name="tgt__dom_has"></a> _dom.has

Checks if a model is available in this module.
 - **parameter**  {string} tagName : the name of the model
 - **return**  {boolean} true if tagName exists.




## <a name="tgt__dom_import"></a> _dom.import

(beta) import other modules
 - **param**  {Array<_dom|DomModule>} domModules




## <a name="tgt__dom_instance"></a> _dom.instance

Instanciates a declared model.<br/>Useful if you dont want of the **__dom** property in your html element.<br/>If not, you should instead use _dom and refer to the result **__dom** attribute.
 - **parameter**  {string} tagName
 - **parameter**  {...} ___ whatever arguments the model constructor uses
 - **returns**  {DomModelInstance} an object with the 'dom' property as the root HTMLElement.




## <a name="tgt__dom_model"></a> _dom.model

Add a custom element to this module.<br/>NB: the **__dom** property will be added to the element, pointing to it's interface (model instance).<br/>interface['dom'] : dom element;<br/>interface[tagName] : element tagName;
 - **parameter**  {string} tagName the custom element name. Should contain at least one "-" to avoid conflict with natives HTMLElements.
 - **parameter**  {function} constructor receive the arguments of <b>_dom(...args)</b> but the dont have to respect the nomenclature excepted 'tagName'.<br/>Must return an HTMLElement.<br/><b>NB</b> : constructor Must be a function and <b>NOT a lambda expression</b> because it is scoped to its interface.
 - **parameter**  {object|function} [cssRules] is or returns an object describing rules like _dom.rules,<br/>but the created collection will be instancied only once and shared among interfaces.<br/>Adds the 'rules' property to the interface.
 - **parameter**  {boolean|object} [shadowed] If true or object, your model is instanciable via html.<br/>See _dom.modelShadow.<br/>if object, shadowed is the arguments types by their name.




## <a name="tgt__dom_modelShadow"></a> _dom.modelShadow

renders your model intanciable via html by using dom shadow
 - **parameter**  {string} tagName the model name.
 - **parameter**  {object} [argTypes] argument types by their name.




## <a name="tgt__dom_modelShadowed"></a> _dom.modelShadowed

check if a model has allready been shadowed.
 - **parameter**  {string} tagName the model name.
 - **returns**  {boolean}




## <a name="tgt__dom_module"></a> _dom.module

(beta) returns an empty module.<br/>Use with **export** and **import** to modularise applications
 - **param**  {string} [name]
 - **returns**  {_dom}




## <a name="tgt__dom_rule"></a> _dom.rule

Create a new js cssRule object;
 - **parameter**  {string} selector the new rule css query.
 - **parameter**  {object} [datas] style datas.
 - **returns**  {CSSStyleRule}




## <a name="tgt__dom_rules"></a> _dom.rules

Create a collection of cssRule objects;
 - **parameter**  {object} datas sass like structured object
 - **parameter**  {CSSStyleSheet} [sheet] target stylesheet
 - **parameter**  {string} [uniquePrefix] if set, will encapsulate datas with a unique className.<br/>an object {className:string,rules:object([ruleName]:CSSStyleRule} will be returned.
 - **returns**  {object([ruleName]:CSSStyleRule)}




## <a name="tgt__dom_scrollTo"></a> _dom.scrollTo

scroll **container** to target element
 - **param**  {HtmlElement} container
 - **param**  {HtmlElement} target
 - **param**  {[number,number]} [offset] : position offset




## <a name="tgt__dom_models"></a> _dom.models


 - **property**  {string[]} _dom.models a list of available models in this module.




## <a name="tgt__dom_moduleName"></a> _dom.moduleName


 - **property**  {string} _dom.moduleName return the handling module name.




## <a name="tgt__dom_services"></a> _dom.services


 - **property**  {Proxy} _dom.services A proxy to the module services by their name.




## <a name="tgt__dom_sheet"></a> _dom.sheet


 - **property**  {CSSStyleSheet} _dom.sheet The last available CSSStyleSheet.




## <a name="tgt__dom_uid"></a> _dom.uid


 - **property**  {uid} _dom.uid a different unique id each time it is read.


