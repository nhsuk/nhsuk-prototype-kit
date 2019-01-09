(function() {
  'use strict';

  window.storeForms = function(storageType) {
    this.setStorage(storageType);
    return this.init();
  };

  storeForms.prototype.setStorage = function(storageType) {
    this.storageType = storageType ? storageType : 'sessionStorage';
  };

  storeForms.prototype.init = function() {
    if (this.storageAvailable()) {
      this.forms = document.querySelector('form');
      this.placeholders = document.querySelectorAll('[data-name]');
      this.formFields = document.querySelectorAll('form [name]');

      this.bindEvents();
      this.populatePlaceholders();
      this.populateFormFields();
    }
  };

  storeForms.prototype.storageAvailable = function() {
    try {
      var x = '__storage_test__';
      this.storage = window[this.storageType];
      this.storage.setItem(x, x);
      this.storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  };

  storeForms.prototype.bindEvents = function() {
    if (this.forms) {
      this.forms.addEventListener('submit', this.processForm.bind(this));
    }
  };

  storeForms.prototype.populatePlaceholders = function() {
    for (var i = 0; i < this.placeholders.length; i++) {
      var placeholder = this.placeholders[i],
          name = placeholder.getAttribute('data-name'),
          value = this.getItem(name) || '',
          showIf = placeholder.getAttribute('data-show-if'),
          hideIf = placeholder.getAttribute('data-hide-if');

      if (name) {
        if (showIf) {
          if (showIf === ':empty') {
            if (value) {
              placeholder.style.display = 'none';
            }
          }
          else if (showIf !== value) {
            placeholder.style.display = 'none';
          }
        }
        else if (hideIf) {
          if (hideIf === ':empty') {
            if (!value) {
              placeholder.style.display = 'none';
            }
          }
          else if (hideIf === value) {
            placeholder.style.display = 'none';
          }
        }
        else {
          placeholder.innerHTML = value.replace(/\n\r?/g, '<br />');
        }
      }
    }
  };

  storeForms.prototype.populateFormFields = function() {
    var processed = [];

    if (this.formFields) {
      for (var i = 0; i < this.formFields.length; i++) {
        var field = this.formFields[i],
            name = field.getAttribute('name'),
            value = this.getItem(name);

        if (name && processed.indexOf(name) === -1) {
          switch(field.type) {
            case 'radio':
            case 'checkbox':
            var fieldToCheck = document.querySelector('[name="' + name + '"][value="' + value + '"]');
              if (fieldToCheck) {
                fieldToCheck.checked = true;
              }
              break;
            default:
              if (value) {
                field.value = value;
              }
              break;
          }

          processed.push(name);
        }
      }
    }
  };

  storeForms.prototype.saveItem = function(key, value) {
    this.storage.setItem(key, value);
  };

  storeForms.prototype.removeItem = function(key) {
    this.storage.removeItem(key);
  };

  storeForms.prototype.getItem = function(key) {
    return this.storage.getItem(key);
  };

  storeForms.prototype.processForm = function(event) {
    var processed = [];

    for (var i = 0; i < event.target.elements.length; i++) {
      var field = event.target.elements[i],
          name = field.getAttribute('name'),
          value;

      if (name && processed.indexOf(name) === -1) {
        value = this.getFieldValue(field);

        if (value) {
          this.saveItem(name, value);
        }
        else {
          this.removeItem(name);
        }
        processed.push(name);
      }
    }
  };

  storeForms.prototype.getFieldValue = function(field) {
    if (!field) return;

    switch(field.type) {
      case 'radio':
        var name = field.getAttribute('name'),
            checked = document.querySelector('[name="' + name + '"]:checked');
        return checked ? checked.getAttribute('value') : '';
      case 'checkbox':
        return field.checked ? field.value : '';
      default:
        return field.value.trim();
    }
  };
}());
