import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AlertPromise } from 'selenium-webdriver';
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
   alert(this.props);
  }

  get_confirm_actual()
  {
    var valid = true;
    for (var key in this.props)
      if (!this.props[key])
        {
          alert(key)
          valid = false;
          break;
        }
    if (valid)
      $('#confirm-purchase').addClass('disabled')
    else if ($('#confirm-purchase').hasClass('disabled'))
      $('#confirm-purchase').removeClass('disabled')
  }

  inputValidation(objName, filterString) {
    var obj = $('#' + objName);
    var objFormClass = obj.closest('.form-group');

    obj.keypress(function(e) {
      e = e || event;
      var chr = '';
      if (e.ctrlKey || e.altKey || e.metaKey) chr = null;
      else chr = getChar(e);
      if (chr == null) 
        chr='';
      var res = check(obj, filterString, chr);
      alert(this);
      this.props.set(objName, res);
      this.get_confirm_actual();
  });
    obj.keyup(function(e) {var res = check(obj, filterString, ''); this.props.set(objName, res); this.get_confirm_actual();});
    obj.click(function(e) {var res = check(obj, filterString, ''); this.props.set(objName, res); this.get_confirm_actual();});

    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode) // IE
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which) // остальные
        }
        return null; // специальная клавиша
    }

    function check(obj, filterString, chr){
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
    for (var i = 0; i < str.length; i++) 
      if (!filter(str.charAt(i)))
        return false;
    return true;
  }

  validate_all() {
    this.inputValidation('cardNumber', (str) => (str.length == 16) && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')));
    this.inputValidation('cvv', (str) => str.length ==3 && this.check_chars(str, (chr) => (chr >= '0' && chr <= '9')));
    this.inputValidation('summary', (str) => Number(str) >= 1000 && Number(str) <= 75000);
    this.inputValidation('comment', (str) => str.length <= 150);
    this.inputValidation('email', (str) => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    });
    return;
  }

  ngOnInit() {
    this.validate_all();
  }
    // $(document).ready(function() {
    //     var owner = $('#owner');
    //     var cardNumber = $('#cardNumber');
    //     var cardNumberField = $('#card-number-field');
    //     var CVV = $("#cvv");
    //     var mastercard = $("#mastercard");
    //     var confirmButton = $('#confirm-purchase');
    //     alert($('#confirm-purchase'));
    //     var visa = $("#visa");
    //     var amex = $("#amex");

    //     // Use the payform library to format and validate
    //     // the payment fields.

    //     cardNumber.payform('formatCardNumber');
    //     CVV.payform('formatCardCVC');


    //     cardNumber.keyup(function() {

    //         amex.removeClass('transparent');
    //         visa.removeClass('transparent');
    //         mastercard.removeClass('transparent');

    //         if ($.payform.validateCardNumber(cardNumber.val()) == false) {
    //             cardNumberField.addClass('has-error');
    //         } else {
    //             cardNumberField.removeClass('has-error');
    //             cardNumberField.addClass('has-success');
    //         }

    //         if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
    //             mastercard.addClass('transparent');
    //             amex.addClass('transparent');
    //         } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
    //             mastercard.addClass('transparent');
    //             visa.addClass('transparent');
    //         } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
    //             amex.addClass('transparent');
    //             visa.addClass('transparent');
    //         }
    //     });

    //     confirmButton.click(function(e) {
    //         alert("begin")
    //         e.preventDefault();
    //         alert("end")
    //         var isCardValid = $.payform.validateCardNumber(cardNumber.val());
    //         var isCvvValid = $.payform.validateCardCVC(CVV.val());

    //         if (owner.val().length < 5) {
    //             alert("Wrong owner name");
    //         } else if (!isCardValid) {
    //             alert("Wrong card number");
    //         } else if (!isCvvValid) {
    //             alert("Wrong CVV");
    //         } else {
    //             // Everything is correct. Add your form submission code here.
    //             alert("Everything is correct");
    //         }
    //     });
    // });
  }

