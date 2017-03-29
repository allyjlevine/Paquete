function FileList() {
  this.finderFileListElements = document.getElementsByClassName('finder-file-list');
  this.bindInteractions();
}

FileList.prototype.bindInteractions = function() {
  var that = this;

  for (var i = 0; i < this.finderFileListElements.length; i++) {
    this.finderFileListElements[i].addEventListener('mouseup', function(e) {
      var clickedElement = e.target;
      var parentElement = clickedElement.parentNode;
      var childElements = parentElement.children;
      var modifierKey = e.metaKey || e.shiftKey || e.ctrlKey;

      if (!modifierKey) {
        for (var i = 0; i < childElements.length; i++) {
          childElements[i].classList.remove('is-active');
        }
      }

      if (!e.shiftKey && !clickedElement.classList.contains('is-active') || e.metaKey) {
        clickedElement.classList.toggle('is-active');
      }
    });
  }

  for (var j = 0; j < this.finderFileListElements.length; j++) {
    this.finderFileListElements[j].addEventListener('mousedown', function(e) {
      var clickedElement = e.target;
      var parentElement = clickedElement.parentNode;
      var childElements = parentElement.children;
      var clickedIndex = that.getElementIndex(clickedElement);

      if (parentElement.querySelector('.is-active') === null) {
        referenceIndex = 0;
      } else {
        referenceIndex = that.getElementIndex(parentElement.querySelector('.is-active'));
      }

      if (referenceIndex > clickedIndex) {
        var temp = clickedIndex;
        clickedIndex = referenceIndex;
        referenceIndex = temp;
      }

      if (e.shiftKey) {
        for (var i = referenceIndex; i <= clickedIndex; i++) {
          childElements[i].classList.add('is-active');
        }
      }
    });
  }
}

FileList.prototype.getElementIndex = function(element) {
  var index = 0;

  while (element = element.previousElementSibling) {
    index++;
  }

  return index;
}

function Finder() {
  this.fileList = new FileList;
}

var finder = new Finder;


//clickable file structure
var DirectoryRoot = React.createClass({
  getInitialState: function(){
    var sample_dir = {
  		"id": 1,
  		"name":"P1",
  		"children": [
    		{
      		"id": 2,
      		"name": "C1_P1",
      		"children":[
        		{
            	"id":3,
            	"name": "C1_C1_P1"
          	},
          	{
            	"id": 4,
            	"name": "C2_C1_P1",
            	"children": [
                {
                  "id": 5,
                  "name": "C1_C2_C1_P1"
                },
                {
                  "id": 9,
                  "name": "C2_C2_C1_P1"
                }
              ]
          	}
        	]
    		},
    		{
      		"id": 6,
      		"name": "C2_P1"
    		},
    		{
      		"id": 7,
      		"name": "C3_P1",
      		"children": [
          	{
            	"id": 8,
            	"name": "C1_C3_P1",
            	"children": [
                {
                  "id": 10,
                  "name": "C1_C1_C3_P1",
                  "children":[{
                    "name": "C1_C1_C1_C3_P1"
                  }]
                }
              ]
          }
        ]
    	}
    	]
		}
    return {dirs: sample_dir, clicked: false};
  },
  handleClick: function(){
  	this.setState({clicked: !this.state.clicked});
  },
  render: function() {
  	var sub_dirs = this.state.dirs.children.map(function(dir){
    	return <Directory dirs={dir}/>
    }.bind(this));
 		console.log(this.state.dirs)
    return (<div onClick={this.handleClick}>
    	<div>Root {this.state.dirs.name} </div>
      {this.state.clicked ?
    		<div style={{marginLeft:10}}> {sub_dirs} </div> : null
      }

    </div>)
    //return <div> {this.recursiveDirRender(this.state.dirs)}</div>;
  }
});

var Directory = React.createClass({
  getInitialState: function(){
  	return {clicked: false}
  },
  handleClick: function(event){
  	event.stopPropagation();
  	this.setState({clicked: !this.state.clicked})
  },
  render: function(){
  	console.log(this.props.dirs)
    var sub_dirs = this.props.dirs.children ?this.props.dirs.children.map(function(dir){
    	return (<div key={dir.key}>
          <Directory dirs={dir}/>
      </div>)
    }.bind(this)) : null;


  	return (
    	<div onClick={this.handleClick}>
      	{this.props.dirs.name}
    		<div style={{marginLeft: 20, display: (this.state.clicked ? null: "none")}}> {sub_dirs} </div>
     	</div>
    )
  }
});

ReactDOM.render(
  <DirectoryRoot/>,
  document.getElementById('container')
);
