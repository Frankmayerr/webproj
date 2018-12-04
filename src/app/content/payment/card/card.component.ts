import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: number;
  cvvNumber: string;
  summary: number;
  comment: string;
  email: string;
  props: Map<string, boolean>;

  constructor() {
    this.props = new Map([['cardNumber', false], ['cvv', false], ['summary', false], ['comment', false], ['email', false]]);
  }

  get_confirm_actual() {
    let valid = true;
    this.props.forEach(function(key) {
      if (!key) { valid = false; }
    });
    if (!valid && !$('#confirm-purchase').hasClass('disabled')) {
      console.log('added_disabled');
      $('#confirm-purchase').addClass('disabled');
    }
    if (valid && $('#confirm-purchase').hasClass('disabled')) {
      $('#confirm-purchase').removeClass('disabled');
    }
  }

  inputValidation(objName, filterString, out_class) {
    let obj = $('#' + objName);
    let objFormClass = obj.closest('.form-group');

    obj.keypress(function(e) {
      e = e || event;
      let chr = '';
      if (e.ctrlKey || e.altKey || e.metaKey) { chr = null; } else { chr = getChar(e); }
      if (chr == null) {
        chr='';
      }
      const res = check(obj, filterString, chr);
      out_class.props.set(objName, res);
      out_class.get_confirm_actual();
  });

    obj.keyup(function(e) {out_class.props.set(objName, check(obj, filterString, '')); out_class.get_confirm_actual(); });
    obj.click(function(e) {out_class.props.set(objName, check(obj, filterString, '')); out_class.get_confirm_actual(); });

    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) { return null; }
            return String.fromCharCode(event.keyCode); // IE
        }
        if (event.which !== 0 && event.charCode !== 0) {
            if (event.which < 32) { return null; }
            return String.fromCharCode(event.which); // остальные
        }
        return null; // специальная клавиша
    }

    function check(obj, filterString, chr) {
      if (filterString(obj.val() + chr)) {
        obj.removeClass('alert-warning');
        obj.addClass('alert-success');
        objFormClass.removeClass('has-error');
        objFormClass.addClass('has-success');
        return true;
      }
      obj.removeClass('alert-success');
      obj.addClass('alert-warning');
      objFormClass.removeClass('has-success');
      objFormClass.addClass('has-error');
      return false;
    }
  }

  check_chars(str, filter) {
    for (let i = 0; i < str.length; i++) {
      if (!filter(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  validate_all() {
    this.inputValidation('cardNumber', (str) => (str.length === 16) && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')), this);
    this.inputValidation('cvv', (str) => str.length === 3 && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')), this);
    this.inputValidation('summary', (str) => Number(str) >= 1000 && Number(str) <= 75000, this);
    this.inputValidation('comment', (str) => str.length <= 150 && str.length > 0, this);
    this.inputValidation('email', (str) => {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    }, this);
  }

  ngOnInit() {
    this.validate_all();
  }
  }

