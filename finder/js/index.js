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
