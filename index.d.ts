

interface _domIt {
	(tagName:string,datas:object|Array,childs:Array,nameSpace:string|undefined):HTMLElement;
	model: function(tagName,construct,cssRules,shadowed):void;
}

declare const _dom:_domIt;
export default _dom;