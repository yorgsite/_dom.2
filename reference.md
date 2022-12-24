- [_dom](#tgt__dom)
  - [_dom.addService](#tgt__dom.addService)
  - [_dom.append](#tgt__dom.append)
  - [_dom.cssStatus](#tgt__dom.cssStatus)
  - [_dom.defaultCss](#tgt__dom.defaultCss)
  - [_dom.export](#tgt__dom.export)
  - [_dom.findParent](#tgt__dom.findParent)
  - [_dom.has](#tgt__dom.has)
  - [_dom.import](#tgt__dom.import)
  - [_dom.instance](#tgt__dom.instance)
  - [_dom.model](#tgt__dom.model)
  - [_dom.modelShadow](#tgt__dom.modelShadow)
  - [_dom.modelShadowed](#tgt__dom.modelShadowed)
  - [_dom.module](#tgt__dom.module)
  - [_dom.rule](#tgt__dom.rule)
  - [_dom.rules](#tgt__dom.rules)
  - [_dom.scrollTo](#tgt__dom.scrollTo)
  - [models](#tgt_models)
  - [moduleName](#tgt_moduleName)
  - [services](#tgt_services)
  - [sheet](#tgt_sheet)
  - [uid](#tgt_uid)
<hr/>

## <a name="tgt__dom"></a> _dom

Create an HTMLElement
 - **parameter**  {string} tagName the element tagname
 - **parameter**  {object} [datas] element attributes.
 - **parameter**  {Array} [childs] element childs. can contain strings an html elements.
 - **parameter**  {string} [nameSpace] element namesapace if any.
 - **returns**  {HTMLElement} a new html element




## <a name="tgt__dom.addService"></a> _dom.addService

(beta)<br/>adds a module service
 - **param**  {string} name
 - **param**  {Class(proxy:DomServiceConstructorProxy)} constructor : service constructor
 - **param**  {array|function():array} args arguments for instanciation
 - **returns**  service




## <a name="tgt__dom.append"></a> _dom.append

(deprecated,system) adds elements to target
 - **param**  {*} target
 - **param**  {html||text[]} childs




## <a name="tgt__dom.cssStatus"></a> _dom.cssStatus


 - **param**  {*} options
 - **@** @returns




## <a name="tgt__dom.defaultCss"></a> _dom.defaultCss

Get browser native element default css values.
 - **parameter**  {string} tagName : tag name of the native element to test
 - **returns**  {Map} the default css values.




## <a name="tgt__dom.export"></a> _dom.export

(beta)<br/>clone _dom module and obfuscate unreferenced models
 - **param**  {string[]|string} models : reference public models.
 - **returns**  {_dom}




## <a name="tgt__dom.findParent"></a> _dom.findParent

Finds**dom** parent if the condition is fullfilled
 - **param**  {Htmlelement} dom : the starting element
 - **param**  {function():boolean} condition : checks if the element fullfills your conditions
 - **param**  {number>1} maxDeep : how deep in the parent pile you will search
 - **returns**  {Htmlelement}




## <a name="tgt__dom.has"></a> _dom.has

Checks if a model is available in this module.
 - **parameter**  {string} tagName : the name of the model
 - **return**  {boolean} true if tagName exists.




## <a name="tgt__dom.import"></a> _dom.import

(beta)<br/>import other modules
 - **param**  {Array<_dom|DomModule>} domModules




## <a name="tgt__dom.instance"></a> _dom.instance

Instanciates a declared model.<br/>Useful if you dont want of the**__dom** property in your html element.<br/>If not, you should instead use _dom and refer to the result**__dom** attribute.
 - **parameter**  {string} tagName
 - **parameter**  {...} ___ whatever arguments the model constructor uses
 - **returns**  {DomModelInstance} an object with the 'dom' property as the root HTMLElement.




## <a name="tgt__dom.model"></a> _dom.model

Add a custom element to this module.<br/>NB: the**__dom** property will be added to the element, pointing to it's interface (model instance).<br/>interface['dom'] : dom element;<br/>interface[tagName] : element tagName;
 - **parameter**  {string} tagName the custom element name. Should contain at least one "-" to avoid conflict with natives HTMLElements.
 - **parameter**  {function} constructor receive the arguments of <b>_dom(...args)</b> but the dont have to respect the nomenclature excepted 'tagName'.<br/>Must return an HTMLElement.<br/><b>NB</b> : constructor Must be a function and <b>NOT a lambda expression</b> because it is scoped to its interface.
 - **parameter**  {object|function} [cssRules] is or returns an object describing rules like _dom.rules,<br/>but the created collection will be instancied only once and shared among interfaces.<br/>Adds the 'rules' property to the interface.
 - **parameter**  {boolean|object} [shadowed] If true or object, your model is instanciable via html.<br/>See _dom.modelShadow.<br/>if object, shadowed is the arguments types by their name.




## <a name="tgt__dom.modelShadow"></a> _dom.modelShadow

renders your model intanciable via html by using dom shadow
 - **parameter**  {string} tagName the model name.
 - **parameter**  {object} [argTypes] argument types by their name.




## <a name="tgt__dom.modelShadowed"></a> _dom.modelShadowed

check if a model has allready been shadowed.
 - **parameter**  {string} tagName the model name.
 - **returns**  {boolean}




## <a name="tgt__dom.module"></a> _dom.module

(beta)<br/>returns an empty module.<br/>Use with**export** and **import** to modularise applications
 - **param**  {string} [name]
 - **returns**  {_dom}




## <a name="tgt__dom.rule"></a> _dom.rule

Create a new js cssRule object;
 - **parameter**  {string} selector the new rule css query.
 - **parameter**  {object} [datas] style datas.
 - **returns**  {CSSStyleRule}




## <a name="tgt__dom.rules"></a> _dom.rules

Create a collection of cssRule objects;
 - **parameter**  {object} datas sass like structured object
 - **parameter**  {CSSStyleSheet} [sheet] target stylesheet
 - **parameter**  {string} [uniquePrefix] if set, will encapsulate datas with a unique className.<br/>an object {className:string,rules:object([ruleName]:CSSStyleRule} will be returned.
 - **returns**  {object([ruleName]:CSSStyleRule)}




## <a name="tgt__dom.scrollTo"></a> _dom.scrollTo


 - **param**  {*} container
 - **param**  {*} target
 - **param**  {*} offset
 - **@** @returns




## <a name="tgt_models"></a> models


 - **property**  {string[]} _dom.models a list of available models in this module.




## <a name="tgt_moduleName"></a> moduleName


 - **property**  {string} _dom.moduleName return the handling module name.




## <a name="tgt_services"></a> services


 - **property**  {Proxy} _dom.services A proxy to the module services by their name.




## <a name="tgt_sheet"></a> sheet


 - **property**  {CSSStyleSheet} _dom.sheet The last available CSSStyleSheet.




## <a name="tgt_uid"></a> uid


 - **property**  {uid} _dom.uid a new generated unique id each time you read.


