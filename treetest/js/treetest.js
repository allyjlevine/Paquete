Vue.component("tree-view-item", Vue.extend({
	name: "tree-view-item",
  props: ["data", "max-depth", "current-depth"],
  data: function(){
  	return {
    	open: this.currentDepth < this.maxDepth
    }
  },
  methods: {
  	isOpen: function(){
    	return this.isRootObject(this.data) || this.open;
    },
    toggleOpen:function(){
    	this.open = !this.open;
    },
  	isObject: function(value){
    	return value.type === 'object';
    },
  	isArray: function(value){
    	return value.type === 'array';
    },
    isValue: function(value){
    	return value.type === 'value';
    },
    getKey: function(value){
    	if (_.isInteger(value.key)) {
      	return value.key+":";
      } else {
	      return "\""+ value.key + "\":";
      }
    },
    getValue: function(value){
    	if (_.isNumber(value.value)) {
      	return value.value
      }
      if (_.isNull(value.value)) {
      	return "null"
      }
      if (_.isString(value.value)) {}
    	return "\""+value.value+"\"";
    },
    isRootObject: function(value){
    	return value.isRoot;
    }
  },
  template:`
  	<div class="tree-view-item">
    	<div v-if="isObject(data)" class="tree-view-item-leaf">
      	<div class="tree-view-item-node" @click.stop="toggleOpen()">
       		<span :class="{opened: isOpen()}" v-if="!isRootObject(data)" class="tree-view-item-key tree-view-item-key-with-chevron">{{getKey(data)}}</span>
          <span class="tree-view-item-hint" v-show="!isOpen() && data.children.length === 1">{{data.children.length}} property</span>
          <span class="tree-view-item-hint" v-show="!isOpen() && data.children.length !== 1">{{data.children.length}} properties</span>
        </div>
				<tree-view-item :max-depth="maxDepth" :current-depth="currentDepth+1" v-show="isOpen()" v-for="child in data.children" :data="child"></tree-view-item>
      </div>
    	<div v-if="isArray(data)" class="tree-view-item-leaf">
      	<div class="tree-view-item-node" @click.stop="toggleOpen()">
       		<span :class="{opened: isOpen()}" v-if="!isRootObject(data)" class="tree-view-item-key tree-view-item-key-with-chevron">{{getKey(data)}}</span>
          <span class="tree-view-item-hint" v-show="!isOpen() && data.children.length === 1">{{data.children.length}} item</span>
          <span class="tree-view-item-hint" v-show="!isOpen() && data.children.length !== 1">{{data.children.length}} items</span>
        </div>
				<tree-view-item :max-depth="maxDepth" :current-depth="currentDepth+1" v-show="isOpen()" v-for="child in data.children" :data="child"></tree-view-item>
      </div>
    	<div class="tree-view-item-leaf" v-if="isValue(data)">
        <span class="tree-view-item-key">{{getKey(data)}}</span>
        <span class="tree-view-item-value">{{getValue(data)}}
			</div>
    </div>
  `
}));

Vue.component("tree-view", Vue.extend({
	name: "tree-view",
  props: ["data", "max-depth"],
  template: `
  	<div class="tree-view-wrapper">
    	<tree-view-item class="tree-view-item-root" :data="parsedData" :max-depth="maxDepth" :currentDepth="0"></tree-view-item>
    </div>`,
   methods: {

  	// Transformer for the non-Collection types,
    // like String, Integer of Float
    transformValue: function(valueToTransform, keyForValue){
    	return {
      	key: keyForValue,
        type: "value",
        value: valueToTransform
      }
    },

  	// Since we use lodash, the _.map method will work on
    // both Objects and Arrays, returning either the Key as
    // a string or the Index as an integer
  	generateChildrenFromCollection: function(collection){
			return _.map(collection, (value, keyOrIndex)=>{
          if (this.isObject(value)) {
            return this.transformObject(value, keyOrIndex);
          }
          if (this.isArray(value)) {
            return this.transformArray(value, keyOrIndex);
          }
          if (this.isValue(value)) {
            return this.transformValue(value, keyOrIndex);
          }
        }) ;
    },

  	// Transformer for the Array type
    transformArray: function(arrayToTransform, keyForArray){
    	return {
      	key: keyForArray,
        type: "array",
        children: this.generateChildrenFromCollection(arrayToTransform)
      }
    },

    // Transformer for the Object type
  	transformObject: function(objectToTransform, keyForObject, isRootObject = false){
      return {
      	key: keyForObject,
      	type: "object",
        isRoot: isRootObject,
        children: this.generateChildrenFromCollection(objectToTransform)
      }
    },

    // Helper Methods for value type detection
    isObject: function(value){
    	return _.isPlainObject(value);
    },

    isArray: function(value){
    	return _.isArray(value);
    },

    isValue: function(value){
    	return !this.isObject(value) && !this.isArray(value);
    }
  },
  computed: {
  	parsedData: function(){
    	// Take the JSON data and transform
      // it into the Tree View DSL
	    return this.transformObject(this.data, "root", true);
    }
  }
}));

new Vue({
	el: "#vue-root",
  methods: {
  	// return pretty-printed JSON
  	formatJSON: function(theJSON){
    	return JSON.stringify(theJSON, true, 2);
    }
  },
  data: function(){
  	return {
    	// Returns a JSON object with common
      // data structures, such as Arrays,
      // Objects and raw Values
    	sampleData: ["test"],
     	//sampleData: {"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}},
      sampleData1: {"medications":[{"aceInhibitors":[{"name":"lisinopril","strength":"10 mg Tab","dose":"1 tab","route":"PO","sig":"daily","pillCount":"#90","refills":"Refill 3"}],"antianginal":[{"name":"nitroglycerin","strength":"0.4 mg Sublingual Tab","dose":"1 tab","route":"SL","sig":"q15min PRN","pillCount":"#30","refills":"Refill 1"}],"anticoagulants":[{"name":"warfarin sodium","strength":"3 mg Tab","dose":"1 tab","route":"PO","sig":"daily","pillCount":"#90","refills":"Refill 3"}],"betaBlocker":[{"name":"metoprolol tartrate","strength":"25 mg Tab","dose":"1 tab","route":"PO","sig":"daily","pillCount":"#90","refills":"Refill 3"}],"diuretic":[{"name":"furosemide","strength":"40 mg Tab","dose":"1 tab","route":"PO","sig":"daily","pillCount":"#90","refills":"Refill 3"}],"mineral":[{"name":"potassium chloride ER","strength":"10 mEq Tab","dose":"1 tab","route":"PO","sig":"daily","pillCount":"#90","refills":"Refill 3"}]}],"labs":[{"name":"Arterial Blood Gas","time":"Today","location":"Main Hospital Lab"},{"name":"BMP","time":"Today","location":"Primary Care Clinic"},{"name":"BNP","time":"3 Weeks","location":"Primary Care Clinic"},{"name":"BUN","time":"1 Year","location":"Primary Care Clinic"},{"name":"Cardiac Enzymes","time":"Today","location":"Primary Care Clinic"},{"name":"CBC","time":"1 Year","location":"Primary Care Clinic"},{"name":"Creatinine","time":"1 Year","location":"Main Hospital Lab"},{"name":"Electrolyte Panel","time":"1 Year","location":"Primary Care Clinic"},{"name":"Glucose","time":"1 Year","location":"Main Hospital Lab"},{"name":"PT/INR","time":"3 Weeks","location":"Primary Care Clinic"},{"name":"PTT","time":"3 Weeks","location":"Coumadin Clinic"},{"name":"TSH","time":"1 Year","location":"Primary Care Clinic"}],"imaging":[{"name":"Chest X-Ray","time":"Today","location":"Main Hospital Radiology"},{"name":"Chest X-Ray","time":"Today","location":"Main Hospital Radiology"},{"name":"Chest X-Ray","time":"Today","location":"Main Hospital Radiology"}]}
    }
  }
})
